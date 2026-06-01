"""
Migration CdC — colonne deplacement_physique + contrainte unique documents.
Exécuter : python alter_db_cdc.py (depuis backend/)
"""
import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./fds_portail.db")
engine = create_engine(DATABASE_URL)
is_sqlite = DATABASE_URL.startswith("sqlite")

with engine.connect() as conn:
    print("Migration CdC : deplacement_physique...")
    try:
        conn.execute(
            text("ALTER TABLE candidats ADD COLUMN deplacement_physique BOOLEAN")
        )
        conn.commit()
        print("  Colonne deplacement_physique ajoutée.")
    except Exception as e:
        print(f"  deplacement_physique (peut déjà exister) : {e}")

    print("Migration CdC : format Photo d'Identité...")
    try:
        conn.execute(
            text(
                "UPDATE documents_requis SET format_accepte = 'JPG/JPEG' "
                "WHERE nom LIKE '%Photo%' AND format_accepte LIKE '%PNG%'"
            )
        )
        conn.commit()
        print("  Formats photo mis à jour.")
    except Exception as e:
        print(f"  Mise à jour formats : {e}")

    print("Migration CdC : index unique (candidat_id, document_requis_id)...")
    index_name = "uq_document_soumis_candidat_requis"
    try:
        if is_sqlite:
            conn.execute(
                text(
                    f"CREATE UNIQUE INDEX IF NOT EXISTS {index_name} "
                    "ON documents_soumis (candidat_id, document_requis_id)"
                )
            )
        else:
            conn.execute(
                text(
                    f"CREATE UNIQUE INDEX IF NOT EXISTS {index_name} "
                    "ON documents_soumis (candidat_id, document_requis_id)"
                )
            )
        conn.commit()
        print("  Index unique créé.")
    except Exception as e:
        print(f"  Index unique : {e}")

print("Migration CdC terminée.")
