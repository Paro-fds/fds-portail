from database import SessionLocal, engine, Base
from models import Utilisateur
from core.security import get_password_hash
import uuid

# Crée toutes les tables si elles n'existent pas
Base.metadata.create_all(bind=engine)

def create_default_admin():
    db = SessionLocal()
    try:
        # Vérifier si l'admin existe déjà
        admin_email = "admin@fds.edu.ht"
        existing_admin = db.query(Utilisateur).filter(Utilisateur.email == admin_email).first()
        
        if existing_admin:
            print("L'administrateur existe déjà.")
            return

        # Création du nouvel administrateur
        new_admin = Utilisateur(
            email=admin_email,
            mot_de_passe_hash=get_password_hash("adminfds2026"),
            role="admin"
        )
        db.add(new_admin)
        db.commit()
        print("Administrateur créé avec succès !")
        print("Email : admin@fds.edu.ht")
        print("Mot de passe : adminfds2026")
    except Exception as e:
        print(f"Erreur : {e}")
    finally:
        db.close()

if __name__ == "__main__":
    create_default_admin()
