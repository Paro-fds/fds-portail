"""
Middleware de Logging Structuré — OWASP A09:2025 (Security Logging & Alerting Failures)

Log chaque requête HTTP au format JSON structuré avec :
- timestamp ISO 8601
- méthode + path + code de réponse
- durée en ms
- IP du client (réelle, supporte proxies)
- userId extrait du JWT (si présent et valide)

Règles de sécurité :
- Ne logue JAMAIS les corps de requête (mots de passe, tokens)
- Ne logue JAMAIS les headers Authorization
- Ne logue JAMAIS les données personnelles (email, nom)
- Alerte sur les codes 401/403/429 (patterns suspects)
"""

import time
import json
import logging
import sys
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response
from jose import jwt, JWTError
from core.security import SECRET_KEY, ALGORITHM

# Configuration du logger structuré (JSON sur stdout pour Railway/Vercel logs)
_logger = logging.getLogger("fds_access")
_logger.setLevel(logging.INFO)

if not _logger.handlers:
    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(logging.Formatter("%(message)s"))
    _logger.addHandler(handler)
    _logger.propagate = False

# Paths à ne pas logger (health checks, assets)
_SKIP_PATHS = {"/", "/docs", "/openapi.json", "/redoc"}

# Seuil d'alerte pour les durées anormalement longues (ms)
_SLOW_REQUEST_THRESHOLD_MS = 5000


def _get_client_ip(request: Request) -> str:
    """Récupère l'IP réelle du client (supporte les proxies Vercel/Railway)."""
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def _extract_user_id(request: Request) -> str | None:
    """
    Tente d'extraire le userId depuis le JWT Authorization header.
    Retourne None si absent ou invalide — jamais d'exception levée.
    Note : seul le 'sub' (email) est loggé, jamais le token complet.
    """
    auth_header = request.headers.get("authorization", "")
    if not auth_header.startswith("Bearer "):
        return None
    token = auth_header[len("Bearer "):]
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload.get("sub")  # email de l'admin
    except JWTError:
        return None


class AccessLoggingMiddleware(BaseHTTPMiddleware):
    """
    Middleware Starlette/FastAPI qui logue chaque requête HTTP au format JSON.
    
    Format de log :
    {
        "ts": "2026-05-26T13:45:00.123Z",   # timestamp ISO
        "method": "POST",
        "path": "/api/auth/token",
        "status": 200,
        "duration_ms": 42,
        "ip": "198.51.100.1",
        "user": "admin@fds.ueh.ht",          # null si non authentifié
        "alert": "AUTH_FAILURE"              # présent si événement suspect
    }
    """

    async def dispatch(self, request: Request, call_next) -> Response:
        path = request.url.path

        # Ne pas logger les paths non pertinents
        if path in _SKIP_PATHS:
            return await call_next(request)

        start = time.perf_counter()
        user_id = _extract_user_id(request)

        # Appel du prochain middleware/handler
        response: Response = await call_next(request)

        duration_ms = int((time.perf_counter() - start) * 1000)
        status = response.status_code

        log_entry: dict = {
            "ts": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
            "method": request.method,
            "path": path,
            "status": status,
            "duration_ms": duration_ms,
            "ip": _get_client_ip(request),
            "user": user_id,
        }

        # Détection des événements suspects → champ "alert"
        alert = None
        if status == 401:
            alert = "AUTH_FAILURE"
        elif status == 403:
            alert = "ACCESS_DENIED"
        elif status == 429:
            alert = "RATE_LIMITED"
        elif duration_ms > _SLOW_REQUEST_THRESHOLD_MS:
            alert = f"SLOW_REQUEST_{duration_ms}ms"

        if alert:
            log_entry["alert"] = alert

        # Log au niveau WARNING si événement suspect, INFO sinon
        log_json = json.dumps(log_entry, ensure_ascii=False)
        if alert:
            _logger.warning(log_json)
        else:
            _logger.info(log_json)

        return response
