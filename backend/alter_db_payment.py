import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./fds_portail.db")
engine = create_engine(DATABASE_URL)

with engine.connect() as conn:
    print("Ajout des colonnes de paiement à la table candidats...")
    
    try:
        # SQLite doesn't support adding multiple columns in one statement easily, 
        # but PostgreSQL does. To be safe, we do it one by one.
        conn.execute(text("ALTER TABLE candidats ADD COLUMN statut_paiement VARCHAR(20) DEFAULT 'non_paye'"))
        conn.commit()
        print("Colonne statut_paiement ajoutée.")
    except Exception as e:
        print(f"Colonne statut_paiement non ajoutée (peut-être existe-t-elle déjà): {e}")

    try:
        conn.execute(text("ALTER TABLE candidats ADD COLUMN methode_paiement VARCHAR(50)"))
        conn.commit()
        print("Colonne methode_paiement ajoutée.")
    except Exception as e:
        print(f"Colonne methode_paiement non ajoutée: {e}")

    try:
        conn.execute(text("ALTER TABLE candidats ADD COLUMN reference_paiement VARCHAR(100)"))
        conn.commit()
        print("Colonne reference_paiement ajoutée.")
    except Exception as e:
        print(f"Colonne reference_paiement non ajoutée: {e}")

print("Migration terminée.")
