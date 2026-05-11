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


def _send_statut_email(
    to_email: str,
    prenom: str,
    nom: str,
    reference_dossier: str,
    nom_document: str,
    statut: str,  # "valide" ou "rejete"
) -> Optional[str]:
    """Fonction interne partagée pour les emails de changement de statut."""
    if not resend.api_key:
        print("[EMAIL] RESEND_API_KEY non configuré — email ignoré.")
        return None

    suivi_url = f"{PORTAL_URL}/suivi"
    is_valide = statut == "valide"

    header_color = "#1a6b3a" if is_valide else "#6b1a1a"
    badge_color  = "#e6f4ec" if is_valide else "#fce8e8"
    badge_text   = "#1a6b3a" if is_valide else "#6b1a1a"
    icon         = "✅" if is_valide else "❌"
    statut_label = "VALIDÉ" if is_valide else "REJETÉ"
    subject      = f"{icon} Document {statut_label} — Dossier {reference_dossier}"

    action_message = (
        "<p>Aucune action n'est requise de votre part pour ce document.</p>"
        if is_valide else
        f"""<p>Votre document a été <strong>rejeté</strong> par l'administration.
        Vous pouvez <strong>le remplacer</strong> directement depuis la page de suivi :</p>
        <a href="{suivi_url}" style="display:inline-block;background:#6b1a1a;color:#fff;padding:12px 28px;border-radius:6px;text-decoration:none;font-weight:bold;margin-top:8px;">
          Remplacer le document →
        </a>"""
    )

    html_body = f"""
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <style>
        body {{ font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }}
        .container {{ max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }}
        .header {{ background: {header_color}; padding: 32px; text-align: center; }}
        .header h1 {{ color: #ffffff; margin: 0; font-size: 22px; }}
        .header p {{ color: rgba(255,255,255,0.7); margin: 8px 0 0; font-size: 14px; }}
        .body {{ padding: 32px; color: #333; }}
        .doc-box {{ background: {badge_color}; border-left: 4px solid {badge_text}; padding: 16px 24px; margin: 24px 0; border-radius: 4px; }}
        .doc-box .label {{ font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 1px; }}
        .doc-box .doc-name {{ font-size: 18px; font-weight: bold; color: {badge_text}; margin-top: 4px; }}
        .doc-box .badge {{ display: inline-block; background: {badge_text}; color: #fff; font-size: 11px; font-weight: bold; padding: 2px 10px; border-radius: 99px; margin-top: 8px; letter-spacing: 1px; }}
        .ref {{ font-family: monospace; font-size: 13px; color: #888; margin-top: 16px; }}
        .footer {{ background: #f4f4f4; padding: 16px 32px; text-align: center; font-size: 12px; color: #999; }}
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>{icon} Document {statut_label}</h1>
          <p>Faculté des Sciences — Université d'État d'Haïti</p>
        </div>
        <div class="body">
          <p>Bonjour <strong>{prenom} {nom}</strong>,</p>
          <p>L'administration a mis à jour le statut d'un de vos documents :</p>
          <div class="doc-box">
            <div class="label">Document concerné</div>
            <div class="doc-name">{nom_document}</div>
            <span class="badge">{statut_label}</span>
          </div>
          {action_message}
          <p class="ref">Référence dossier : {reference_dossier}</p>
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
            "subject": subject,
            "html": html_body,
        })
        print(f"[EMAIL] Statut '{statut}' notifié à {to_email} — ID: {response.get('id')}")
        return response.get("id")
    except Exception as e:
        print(f"[EMAIL] Erreur lors de l'envoi statut : {e}")
        return None


def send_document_validated_email(
    to_email: str, prenom: str, nom: str,
    reference_dossier: str, nom_document: str,
) -> Optional[str]:
    """Notifie le candidat qu'un de ses documents a été validé."""
    return _send_statut_email(to_email, prenom, nom, reference_dossier, nom_document, "valide")


def send_document_rejected_email(
    to_email: str, prenom: str, nom: str,
    reference_dossier: str, nom_document: str,
) -> Optional[str]:
    """Notifie le candidat qu'un de ses documents a été rejeté."""
    return _send_statut_email(to_email, prenom, nom, reference_dossier, nom_document, "rejete")
