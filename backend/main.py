from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
import uuid
import random
import filetype
from datetime import datetime, timezone

from database import engine, get_db, Base
from models import Candidat, DocumentRequis, DocumentSoumis, Utilisateur
from services.upload import upload_file_to_cloudinary
from core.security import verify_password, create_access_token, SECRET_KEY, ALGORITHM
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

app = FastAPI(title="API FDS Portail", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- SCHEMAS (Pydantic) ---
class CandidatCreate(BaseModel):
    nom: str
    prenom: str
    email: str
    notifications_actives: bool = True

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
def get_documents_requis(db: Session = Depends(get_db)):
    docs = db.query(DocumentRequis).all()
    if not docs:
        docs_init = [
            DocumentRequis(nom="Acte de Naissance", format_accepte="PDF", est_obligatoire=True),
            DocumentRequis(nom="Certificat Baccalauréat", format_accepte="PDF", est_obligatoire=True),
            DocumentRequis(nom="Relevés de Notes (NS4)", format_accepte="PDF", est_obligatoire=True),
            DocumentRequis(nom="Pièce d'identité (CIN/NIF)", format_accepte="PDF", est_obligatoire=True),
            DocumentRequis(nom="Photo d'Identité", format_accepte="JPG/PNG", est_obligatoire=True),
        ]
        db.add_all(docs_init)
        db.commit()
        docs = db.query(DocumentRequis).all()
    return docs

@app.post("/api/candidature")
def create_candidature(candidat: CandidatCreate, db: Session = Depends(get_db)):
    db_candidat = db.query(Candidat).filter(Candidat.email == candidat.email).first()
    if db_candidat:
        return {"id": db_candidat.id, "reference_dossier": db_candidat.reference_dossier, "message": "Candidat existant"}
    
    # Génération d'une référence unique
    ref = f"CAN-2026-{random.randint(10000, 99999)}"
    
    new_candidat = Candidat(
        nom=candidat.nom,
        prenom=candidat.prenom,
        email=candidat.email,
        reference_dossier=ref,
        notifications_actives=candidat.notifications_actives
    )
    db.add(new_candidat)
    db.commit()
    db.refresh(new_candidat)
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
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur Cloudinary: {str(e)}")

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
            "nom_document": doc.document_requis.nom,
            "statut_validation": doc.statut_validation,
            "soumis_le": doc.soumis_le
        })
        
    return {
        "reference_dossier": candidat.reference_dossier,
        "prenom": candidat.prenom,
        "nom": candidat.nom,
        "documents": docs_soumis
    }

# --- ROUTES ADMIN SECURISEES ---

@app.post("/api/auth/token")
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(Utilisateur).filter(Utilisateur.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.mot_de_passe_hash):
        raise HTTPException(status_code=400, detail="Email ou mot de passe incorrect")
    
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/api/admin/candidatures")
def get_all_candidatures(db: Session = Depends(get_db), admin: Utilisateur = Depends(get_current_admin)):
    candidats = db.query(Candidat).order_by(Candidat.created_at.desc()).all()
    result = []
    for c in candidats:
        docs_soumis = []
        for doc in c.documents_soumis:
            docs_soumis.append({
                "id": doc.id,
                "nom_document": doc.document_requis.nom,
                "fichier_url": doc.fichier_url,
                "statut_validation": doc.statut_validation,
                "soumis_le": doc.soumis_le
            })
        result.append({
            "id": c.id,
            "reference_dossier": c.reference_dossier,
            "prenom": c.prenom,
            "nom": c.nom,
            "email": c.email,
            "created_at": c.created_at,
            "documents": docs_soumis
        })
    return result

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
    return {"message": "Statut mis à jour et audité"}
