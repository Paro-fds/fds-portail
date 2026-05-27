"""
Rate Limiter en mémoire — Protection contre le brute-force (OWASP A07:2025)

Stratégie : sliding window (fenêtre glissante de 60 secondes).
- Bloque après MAX_ATTEMPTS tentatives par IP dans la fenêtre.
- Délai progressif : après le blocage, l'IP doit attendre BLOCK_DURATION secondes.

Note : solution in-process adaptée au MVP (monolithe 1 instance).
Pour une architecture multi-instances, migrer vers Redis + lua scripts.
"""

import time
from collections import defaultdict, deque
from fastapi import Request, HTTPException

# Paramètres de la fenêtre glissante
WINDOW_SECONDS = 60       # Fenêtre d'observation : 60 secondes
MAX_ATTEMPTS = 5          # Maximum de tentatives dans la fenêtre
BLOCK_DURATION = 300      # Durée de blocage après dépassement : 5 minutes

# Structures de données en mémoire
_attempts: dict[str, deque] = defaultdict(deque)   # IP -> timestamps des tentatives
_blocked_until: dict[str, float] = {}               # IP -> timestamp de déblocage


def _get_client_ip(request: Request) -> str:
    """Récupère l'IP réelle du client (supporte les proxies Vercel/Railway)."""
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def check_rate_limit(request: Request) -> None:
    """
    Vérifie si la requête dépasse la limite de tentatives.
    Doit être appelé AVANT la vérification du mot de passe.
    Lève HTTPException 429 si bloqué.
    """
    ip = _get_client_ip(request)
    now = time.time()

    # 1. Vérifier si l'IP est encore bloquée
    if ip in _blocked_until:
        remaining = _blocked_until[ip] - now
        if remaining > 0:
            raise HTTPException(
                status_code=429,
                detail=f"Trop de tentatives. Réessayez dans {int(remaining)} secondes.",
                headers={"Retry-After": str(int(remaining))}
            )
        else:
            # Déblocage expiré — nettoyer
            del _blocked_until[ip]
            _attempts[ip].clear()

    # 2. Nettoyer les tentatives hors fenêtre glissante
    window_start = now - WINDOW_SECONDS
    while _attempts[ip] and _attempts[ip][0] < window_start:
        _attempts[ip].popleft()

    # 3. Vérifier si le seuil est atteint
    if len(_attempts[ip]) >= MAX_ATTEMPTS:
        _blocked_until[ip] = now + BLOCK_DURATION
        raise HTTPException(
            status_code=429,
            detail=f"Trop de tentatives de connexion. Compte temporairement bloqué pendant {BLOCK_DURATION // 60} minutes.",
            headers={"Retry-After": str(BLOCK_DURATION)}
        )


def record_failed_attempt(request: Request) -> None:
    """
    Enregistre une tentative ÉCHOUÉE (mauvais mot de passe ou utilisateur inconnu).
    Doit être appelé APRÈS un échec d'authentification.
    """
    ip = _get_client_ip(request)
    _attempts[ip].append(time.time())


def reset_attempts(request: Request) -> None:
    """
    Réinitialise le compteur après une connexion RÉUSSIE (anti-false-positive).
    Doit être appelé APRÈS une authentification réussie.
    """
    ip = _get_client_ip(request)
    _attempts.pop(ip, None)
    _blocked_until.pop(ip, None)
