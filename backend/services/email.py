import os
import resend
from typing import Optional

resend.api_key = os.getenv("RESEND_API_KEY", "")

PORTAL_URL = os.getenv("PORTAL_URL", "https://fds-portail.vercel.app")
FROM_EMAIL = os.getenv("FROM_EMAIL", "FDS Portail <no-reply@fds.edu.ht>")


def send_confirmation_email(
    to_email: str,
    prenom: str,
    nom: str,
    reference_dossier: str,
) -> Optional[str]:
    """
    Envoie un email de confirmation de candidature au candidat.
    Retourne l'ID de l'email envoyé, ou None si RESEND_API_KEY n'est pas configuré.
    """
    if not resend.api_key:
        print("[EMAIL] RESEND_API_KEY non configuré — email ignoré.")
        return None

    suivi_url = f"{PORTAL_URL}/suivi"

    html_body = f"""
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <style>
        body {{ font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }}
        .container {{ max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }}
        .header {{ background: #1a3a6b; padding: 32px; text-align: center; }}
        .header h1 {{ color: #ffffff; margin: 0; font-size: 22px; }}
        .header p {{ color: #a0b4d0; margin: 8px 0 0; font-size: 14px; }}
        .body {{ padding: 32px; color: #333; }}
        .ref-box {{ background: #f0f4ff; border-left: 4px solid #1a3a6b; padding: 16px 24px; margin: 24px 0; border-radius: 4px; }}
        .ref-box .label {{ font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 1px; }}
        .ref-box .ref {{ font-size: 28px; font-weight: bold; color: #1a3a6b; letter-spacing: 2px; }}
        .btn {{ display: inline-block; background: #1a3a6b; color: #ffffff; padding: 12px 28px; border-radius: 6px; text-decoration: none; font-weight: bold; margin-top: 16px; }}
        .footer {{ background: #f4f4f4; padding: 16px 32px; text-align: center; font-size: 12px; color: #999; }}
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Candidature enregistrée</h1>
          <p>Faculté des Sciences — Université d'État d'Haïti</p>
        </div>
        <div class="body">
          <p>Bonjour <strong>{prenom} {nom}</strong>,</p>
          <p>Votre dossier de candidature a été <strong>soumis avec succès</strong>. Conservez précieusement votre numéro de référence :</p>
          <div class="ref-box">
            <div class="label">Numéro de référence</div>
            <div class="ref">{reference_dossier}</div>
          </div>
          <p>Vous pouvez suivre l'état de votre dossier à tout moment en utilisant ce numéro sur notre portail :</p>
          <a href="{suivi_url}" class="btn">Suivre mon dossier →</a>
          <p style="margin-top: 32px; font-size: 13px; color: #666;">
            Si vous n'avez pas soumis cette candidature, ignorez ce message.<br>
            Pour toute question, contactez le secrétariat de la FDS.
          </p>
        </div>
        <div class="footer">
          FDS Portail · Faculté des Sciences, UEH · Port-au-Prince, Haïti
        </div>
      </div>
    </body>
    </html>
    """

    try:
        response = resend.Emails.send({
            "from": FROM_EMAIL,
            "to": [to_email],
            "subject": f"✅ Candidature FDS reçue — Réf : {reference_dossier}",
            "html": html_body,
        })
        print(f"[EMAIL] Envoyé à {to_email} — ID: {response.get('id')}")
        return response.get("id")
    except Exception as e:
        print(f"[EMAIL] Erreur lors de l'envoi : {e}")
        return None
