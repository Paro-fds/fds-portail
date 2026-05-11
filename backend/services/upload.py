import cloudinary
import cloudinary.uploader
import os
import uuid
from dotenv import load_dotenv

load_dotenv()

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True
)

def upload_file_to_cloudinary(file_bytes: bytes, filename: str) -> str:
    """
    Téléverse un fichier vers Cloudinary et retourne l'URL sécurisée.
    Les PDFs sont uploadés avec resource_type='image' pour permettre
    l'affichage inline dans le navigateur via la visionneuse Cloudinary.
    """
    is_pdf = filename.lower().endswith(".pdf")

    # Identifiant unique pour éviter les collisions de fichiers
    unique_id = str(uuid.uuid4())[:8]
    base_name = filename.rsplit(".", 1)[0] if "." in filename else filename
    public_id = f"{base_name}_{unique_id}"

    response = cloudinary.uploader.upload(
        file_bytes,
        resource_type="image" if is_pdf else "auto",
        public_id=public_id,
        folder="fds_candidatures",
        # Pour les PDFs : page 1 seulement en aperçu, format original conservé
        **({"format": "jpg", "pages": True} if is_pdf else {})
    )
    return response.get("secure_url")

