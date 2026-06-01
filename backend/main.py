from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, Form, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.responses import Response as StarletteResponse
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
import uuid
import random
import filetype
import logging
from datetime import datetime, timezone
import requests as http_requests

from database import engine, get_db, Base
from models import Candidat, DocumentRequis, DocumentSoumis, Utilisateur
from services.upload import upload_file_to_cloudinary
from services.email import send_confirmation_email, send_document_validated_email, send_document_rejected_email
from core.security import verify_password, create_access_token, SECRET_KEY, ALGORITHM
from core.rate_limiter import (
    check_rate_limit,
    record_failed_attempt,
    reset_attempts,
    check_candidature_rate_limit,
    record_candidature_attempt,
)
from core.logging_middleware import AccessLoggingMiddleware
from jose import JWTError, jwt

# Dépendance d'authentification
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/token")

def get_current_admin(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(status_code=401, detail="Identifiants invalides", headers={"WWW-Authenticate": "Bearer"})
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
        
    user = db.query(Utilisateur).filter(Utilisateur.email == email).first()
    if user is None or user.role != "admin":
        raise credentials_exception
    return user

# Création des tables dans la BDD
Base.metadata.create_all(bind=engine)

logger = logging.getLogger(__name__)

app = FastAPI(title="API FDS Portail", version="1.0.0")

# ─────────────────────────────────────────────────────────────────────────────
# MIDDLEWARES DE SÉCURITÉ
# L'ordre est important : les middlewares s'appliquent de bas en haut (LIFO).
# ─────────────────────────────────────────────────────────────────────────────

# 1. CORS — doit rester en premier pour gérer les preflight OPTIONS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Security Headers Middleware — OWASP A02:2025 (Security Misconfiguration)
# Ajoute les en-têtes HTTP de sécurité sur toutes les réponses.
class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next) -> Response:
        response = await call_next(request)
        # Empêche le clickjacking
        response.headers["X-Frame-Options"] = "DENY"
        # Empêche le MIME-type sniffing
        response.headers["X-Content-Type-Options"] = "nosniff"
        # Force HTTPS pour les 1 an à venir (incluSubDomains)
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        # Contrôle des sources de contenu (CSP restrictive)
        response.headers["Content-Security-Policy"] = (
            "default-src 'self'; "
            "script-src 'self'; "
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
            "font-src 'self' https://fonts.gstatic.com; "
            "img-src 'self' data: https://res.cloudinary.com; "
            "connect-src 'self'; "
            "frame-ancestors 'none'"
        )
        # Limite les informations exposées dans le header Referer
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        # Contrôle les fonctionnalités browser (désactiver caméra, micro, géoloc)
        response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
        return response

app.add_middleware(SecurityHeadersMiddleware)

# 3. Access Logging Middleware — OWASP A09:2025 (Security Logging & Alerting)
# Log chaque requête en JSON structuré avec alerte sur 401/403/429.
app.add_middleware(AccessLoggingMiddleware)

# --- SCHEMAS (Pydantic) ---
class CandidatCreate(BaseModel):
    nom: str
    prenom: str
    email: str
    notifications_actives: bool = True
    methode_paiement: Optional[str] = None
    reference_paiement: Optional[str] = None
    deplacement_physique: bool

class DocumentRequisResponse(BaseModel):
    id: uuid.UUID
    nom: str
    description: Optional[str] = None
    format_accepte: str
    est_obligatoire: bool

    class Config:
        from_attributes = True

# --- ROUTES ---

@app.get("/")
def read_root():
    return {"message": "Bienvenue sur l'API FDS Portail"}

@app.get("/api/documents-requis", response_model=List[DocumentRequisResponse])
def get_documents_requis(response: Response, db: Session = Depends(get_db)):
    docs = db.query(DocumentRequis).all()
    if not docs:
        docs_init = [
            DocumentRequis(nom="Acte de Naissance", format_accepte="PDF", est_obligatoire=True),
            DocumentRequis(nom="Certificat Baccalauréat", format_accepte="PDF", est_obligatoire=True),
            DocumentRequis(nom="Relevés de Notes (NS4)", format_accepte="PDF", est_obligatoire=True),
            DocumentRequis(nom="Pièce d'identité (CIN/NIF)", format_accepte="PDF", est_obligatoire=True),
            DocumentRequis(nom="Photo d'Identité", format_accepte="JPG/JPEG", est_obligatoire=True),
        ]
        db.add_all(docs_init)
        db.commit()
        docs = db.query(DocumentRequis).all()
    else:
        for doc in docs:
            if "Photo" in doc.nom and "PNG" in (doc.format_accepte or ""):
                doc.format_accepte = "JPG/JPEG"
        db.commit()

    response.headers["Cache-Control"] = "public, max-age=300"
    return docs

@app.post("/api/candidature")
def create_candidature(
    request: Request,
    candidat: CandidatCreate,
    db: Session = Depends(get_db),
):
    check_candidature_rate_limit(request)

    db_candidat = db.query(Candidat).filter(Candidat.email == candidat.email).first()
    if db_candidat:
        record_candidature_attempt(request)
        return {"id": db_candidat.id, "reference_dossier": db_candidat.reference_dossier, "message": "Candidat existant"}
    
    # Génération d'une référence unique
    ref = f"CAN-2026-{random.randint(10000, 99999)}"
    
    new_candidat = Candidat(
        nom=candidat.nom,
        prenom=candidat.prenom,
        email=candidat.email,
        reference_dossier=ref,
        notifications_actives=candidat.notifications_actives,
        statut_paiement="paye" if candidat.reference_paiement else "non_paye",
        methode_paiement=candidat.methode_paiement,
        reference_paiement=candidat.reference_paiement,
        deplacement_physique=candidat.deplacement_physique,
    )
    db.add(new_candidat)
    db.commit()
    db.refresh(new_candidat)
    record_candidature_attempt(request)

    # Envoi de l'email de confirmation (non bloquant)
    if new_candidat.notifications_actives:
        send_confirmation_email(
            to_email=new_candidat.email,
            prenom=new_candidat.prenom,
            nom=new_candidat.nom,
            reference_dossier=new_candidat.reference_dossier,
        )

    return {"id": new_candidat.id, "reference_dossier": new_candidat.reference_dossier, "message": "Candidat créé avec succès"}

@app.post("/api/upload")
async def upload_document(
    candidat_id: str = Form(...),
    document_requis_id: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    candidat = db.query(Candidat).filter(Candidat.id == candidat_id).first()
    if not candidat:
        raise HTTPException(status_code=404, detail="Candidat introuvable")

    doc_requis = db.query(DocumentRequis).filter(DocumentRequis.id == document_requis_id).first()
    if not doc_requis:
        raise HTTPException(status_code=404, detail="Document requis introuvable")

    file_bytes = await file.read()
    
    # 1. Limitation de taille (5 Mo)
    MAX_SIZE_BYTES = 5 * 1024 * 1024
    if len(file_bytes) > MAX_SIZE_BYTES:
        raise HTTPException(status_code=400, detail="Fichier trop volumineux. La taille maximale est de 5 Mo.")

    # 2. Validation de l'extension
    allowed_extensions = {".pdf", ".jpg", ".jpeg"}
    filename_lower = file.filename.lower() if file.filename else ""
    if not any(filename_lower.endswith(ext) for ext in allowed_extensions):
        raise HTTPException(status_code=400, detail="Format de fichier non autorisé. Seuls les PDF, JPG et JPEG sont acceptés.")

    # 3. Contrôle du type MIME réel (Magic Bytes)
    kind = filetype.guess(file_bytes)
    if kind is None or kind.mime not in ["application/pdf", "image/jpeg"]:
        raise HTTPException(status_code=400, detail="Type de fichier invalide. Le contenu ne correspond pas à l'extension.")

    try:
        secure_url = upload_file_to_cloudinary(file_bytes, file.filename)
    except Exception:
        logger.exception("Échec upload Cloudinary")
        raise HTTPException(
            status_code=500,
            detail="Impossible de téléverser le fichier. Veuillez réessayer.",
        )

    # Upsert : si ce type de document existe déjà pour ce candidat, on le remplace
    existing_doc = db.query(DocumentSoumis).filter(
        DocumentSoumis.candidat_id == candidat.id,
        DocumentSoumis.document_requis_id == doc_requis.id
    ).first()

    if existing_doc:
        existing_doc.fichier_url = secure_url
        existing_doc.statut_validation = "en_attente"
        existing_doc.valide_par = None
        existing_doc.date_validation = None
        db.commit()
        db.refresh(existing_doc)
        return {"id": existing_doc.id, "url": secure_url, "message": "Document remplacé avec succès"}

    doc_soumis = DocumentSoumis(
        candidat_id=candidat.id,
        document_requis_id=doc_requis.id,
        fichier_url=secure_url
    )
    db.add(doc_soumis)
    db.commit()
    db.refresh(doc_soumis)

    return {"id": doc_soumis.id, "url": secure_url, "message": "Fichier sauvegardé avec succès"}

@app.get("/api/candidature/{reference_dossier}")
def get_candidature_tracking(reference_dossier: str, db: Session = Depends(get_db)):
    candidat = db.query(Candidat).filter(Candidat.reference_dossier == reference_dossier).first()
    if not candidat:
        raise HTTPException(status_code=404, detail="Dossier introuvable. Vérifiez votre référence.")
    
    docs_soumis = []
    for doc in candidat.documents_soumis:
        docs_soumis.append({
            "id": doc.id,
            "document_requis_id": doc.document_requis_id,
            "nom_document": doc.document_requis.nom,
            "statut_validation": doc.statut_validation,
            "soumis_le": doc.soumis_le
        })
        
    return {
        "reference_dossier": candidat.reference_dossier,
        "candidat_id": candidat.id,
        "prenom": candidat.prenom,
        "nom": candidat.nom,
        "statut_paiement": candidat.statut_paiement,
        "documents": docs_soumis
    }

# --- ROUTES ADMIN SECURISEES ---

@app.post("/api/auth/token")
def login_for_access_token(
    request: Request,
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    """
    Authentification administrateur avec protection contre le brute-force.
    - OWASP A07:2025 : Rate limiting (5 tentatives / 60s, blocage 5 min)
    - OWASP A04:2025 : Mots de passe hashés bcrypt
    - OWASP A01:2025 : Vérification du rôle 'admin' obligatoire
    """
    # 1. Vérifier le rate limit AVANT toute vérification de credentials
    # (pour ne pas révéler si l'email existe via le timing)
    check_rate_limit(request)

    user = db.query(Utilisateur).filter(Utilisateur.email == form_data.username).first()

    # 2. Authentification — message générique pour éviter l'énumération d'utilisateurs
    if not user or not verify_password(form_data.password, user.mot_de_passe_hash):
        record_failed_attempt(request)  # Comptabiliser l'échec
        raise HTTPException(
            status_code=401,
            detail="Email ou mot de passe incorrect.",
            headers={"WWW-Authenticate": "Bearer"}
        )

    # 3. Vérification du rôle (Least Privilege — A01)
    if user.role != "admin":
        record_failed_attempt(request)
        raise HTTPException(
            status_code=403,
            detail="Accès réservé aux administrateurs."
        )

    # 4. Succès — réinitialiser le compteur de l'IP
    reset_attempts(request)
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

def _serialize_candidature(c: Candidat) -> dict:
    docs_soumis = []
    for doc in c.documents_soumis:
        docs_soumis.append({
            "id": doc.id,
            "nom_document": doc.document_requis.nom,
            "fichier_url": doc.fichier_url,
            "statut_validation": doc.statut_validation,
            "soumis_le": doc.soumis_le,
        })
    return {
        "id": c.id,
        "reference_dossier": c.reference_dossier,
        "prenom": c.prenom,
        "nom": c.nom,
        "email": c.email,
        "statut_paiement": c.statut_paiement,
        "methode_paiement": c.methode_paiement,
        "reference_paiement": c.reference_paiement,
        "deplacement_physique": c.deplacement_physique,
        "created_at": c.created_at,
        "documents": docs_soumis,
    }


@app.get("/api/admin/candidatures")
def get_all_candidatures(
    page: int = 1,
    limit: int = 20,
    db: Session = Depends(get_db),
    admin: Utilisateur = Depends(get_current_admin),
):
    page = max(1, page)
    limit = min(max(1, limit), 100)

    query = db.query(Candidat).order_by(Candidat.created_at.desc())
    total = query.count()
    candidats = query.offset((page - 1) * limit).limit(limit).all()

    return {
        "total": total,
        "page": page,
        "limit": limit,
        "items": [_serialize_candidature(c) for c in candidats],
    }

class StatutUpdate(BaseModel):
    statut: str

@app.put("/api/admin/documents/{doc_id}/statut")
def update_document_statut(doc_id: str, payload: StatutUpdate, db: Session = Depends(get_db), admin: Utilisateur = Depends(get_current_admin)):
    doc = db.query(DocumentSoumis).filter(DocumentSoumis.id == doc_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document non trouvé")
    
    if payload.statut not in ["en_attente", "valide", "rejete"]:
        raise HTTPException(status_code=400, detail="Statut invalide")
        
    doc.statut_validation = payload.statut
    # Enregistrement de l'audit
    doc.valide_par = admin.id
    doc.date_validation = datetime.now(timezone.utc)
    
    db.commit()

    # Notification email au candidat selon le nouveau statut
    candidat = doc.candidat
    nom_document = doc.document_requis.nom
    if payload.statut == "valide" and candidat.notifications_actives:
        send_document_validated_email(
            to_email=candidat.email,
            prenom=candidat.prenom,
            nom=candidat.nom,
            reference_dossier=candidat.reference_dossier,
            nom_document=nom_document,
        )
    elif payload.statut == "rejete" and candidat.notifications_actives:
        send_document_rejected_email(
            to_email=candidat.email,
            prenom=candidat.prenom,
            nom=candidat.nom,
            reference_dossier=candidat.reference_dossier,
            nom_document=nom_document,
        )

    return {"message": "Statut mis à jour et audité"}


@app.get("/api/admin/proxy-document")
def proxy_document(url: str, admin: Utilisateur = Depends(get_current_admin)):
    """
    Proxy sécurisé pour afficher les documents Cloudinary inline dans le navigateur.
    Corrige le problème de Content-Type: application/octet-stream des fichiers 'raw'.
    Accessible uniquement aux administrateurs authentifiés.
    """
    try:
        resp = http_requests.get(url, timeout=30)
        resp.raise_for_status()
    except Exception:
        logger.exception("Échec proxy document")
        raise HTTPException(status_code=502, detail="Impossible de récupérer le document.")

    is_pdf = url.lower().endswith(".pdf") or "/raw/" in url.lower()
    content_type = "application/pdf" if is_pdf else resp.headers.get("content-type", "image/jpeg")

    return StarletteResponse(
        content=resp.content,
        media_type=content_type,
        headers={"Content-Disposition": "inline; filename=document.pdf" if is_pdf else "inline"}
    )
