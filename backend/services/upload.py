import cloudinary
import cloudinary.uploader
import os
from dotenv import load_dotenv

load_dotenv()

# Cloudinary s'auto-configure avec la variable d'environnement CLOUDINARY_URL
# Mais on peut aussi forcer la conf si besoin:
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True
)

def upload_file_to_cloudinary(file_bytes: bytes, filename: str) -> str:
    """
    Téléverse un fichier vers Cloudinary et retourne l'URL sécurisée.
    """
    res_type = "raw" if filename.lower().endswith(".pdf") else "auto"
    
    response = cloudinary.uploader.upload(
        file_bytes,
        resource_type=res_type,
        public_id=filename.split('.')[0] if '.' in filename else filename,
        folder="fds_candidatures"
    )
    return response.get("secure_url")
