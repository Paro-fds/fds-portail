import uuid
from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, Text, Uuid, UniqueConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base

class Candidat(Base):
    __tablename__ = "candidats"

    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    prenom = Column(String(100), nullable=False)
    nom = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    reference_dossier = Column(String(20), unique=True, index=True, nullable=True)
    statut_paiement = Column(String(20), default="non_paye")
    methode_paiement = Column(String(50), nullable=True)
    reference_paiement = Column(String(100), nullable=True)
    notifications_actives = Column(Boolean, default=True)
    deplacement_physique = Column(Boolean, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    documents_soumis = relationship("DocumentSoumis", back_populates="candidat", cascade="all, delete-orphan")


class DocumentRequis(Base):
    __tablename__ = "documents_requis"

    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    nom = Column(String(255), unique=True, nullable=False)
    description = Column(Text, nullable=True)
    format_accepte = Column(String(100), nullable=False)
    est_obligatoire = Column(Boolean, default=True)
    mis_a_jour_le = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    documents_soumis = relationship("DocumentSoumis", back_populates="document_requis")


class DocumentSoumis(Base):
    __tablename__ = "documents_soumis"
    __table_args__ = (
        UniqueConstraint(
            "candidat_id",
            "document_requis_id",
            name="uq_document_soumis_candidat_requis",
        ),
    )

    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    candidat_id = Column(Uuid(as_uuid=True), ForeignKey("candidats.id", ondelete="CASCADE"), nullable=False)
    document_requis_id = Column(Uuid(as_uuid=True), ForeignKey("documents_requis.id", ondelete="RESTRICT"), nullable=False)
    fichier_url = Column(Text, nullable=False)
    statut_validation = Column(String(20), default='en_attente')
    soumis_le = Column(DateTime(timezone=True), server_default=func.now())
    valide_par = Column(Uuid(as_uuid=True), ForeignKey("utilisateurs.id", ondelete="SET NULL"), nullable=True)
    date_validation = Column(DateTime(timezone=True), nullable=True)

    candidat = relationship("Candidat", back_populates="documents_soumis")
    document_requis = relationship("DocumentRequis", back_populates="documents_soumis")
    validateur = relationship("Utilisateur", foreign_keys=[valide_par])

class Utilisateur(Base):
    __tablename__ = "utilisateurs"

    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), unique=True, index=True, nullable=False)
    mot_de_passe_hash = Column(String(255), nullable=False)
    role = Column(String(50), default="admin")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

