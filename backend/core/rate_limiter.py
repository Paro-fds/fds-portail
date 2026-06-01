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

# Structures de données en mémoire (auth)
_attempts: dict[str, deque] = defaultdict(deque)   # IP -> timestamps des tentatives
_blocked_until: dict[str, float] = {}               # IP -> timestamp de déblocage

# Rate limiting candidature (scope séparé — OWASP A06)
CANDIDATURE_WINDOW_SECONDS = 60
CANDIDATURE_MAX_ATTEMPTS = 10
CANDIDATURE_BLOCK_DURATION = 300
_candidature_attempts: dict[str, deque] = defaultdict(deque)
_candidature_blocked_until: dict[str, float] = {}


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


def _check_sliding_window(
    request: Request,
    attempts: dict[str, deque],
    blocked_until: dict[str, float],
    window_seconds: int,
    max_attempts: int,
    block_duration: int,
    key_prefix: str,
) -> None:
    """Fenêtre glissante générique par IP et scope."""
    ip = _get_client_ip(request)
    key = f"{key_prefix}:{ip}"
    now = time.time()

    if key in blocked_until:
        remaining = blocked_until[key] - now
        if remaining > 0:
            raise HTTPException(
                status_code=429,
                detail=f"Trop de requêtes. Réessayez dans {int(remaining)} secondes.",
                headers={"Retry-After": str(int(remaining))},
            )
        del blocked_until[key]
        attempts[key].clear()

    window_start = now - window_seconds
    while attempts[key] and attempts[key][0] < window_start:
        attempts[key].popleft()

    if len(attempts[key]) >= max_attempts:
        blocked_until[key] = now + block_duration
        raise HTTPException(
            status_code=429,
            detail=f"Trop de requêtes. Réessayez dans {block_duration // 60} minute(s).",
            headers={"Retry-After": str(block_duration)},
        )


def check_candidature_rate_limit(request: Request) -> None:
    """Limite les soumissions de candidature par IP (POST /api/candidature)."""
    _check_sliding_window(
        request,
        _candidature_attempts,
        _candidature_blocked_until,
        CANDIDATURE_WINDOW_SECONDS,
        CANDIDATURE_MAX_ATTEMPTS,
        CANDIDATURE_BLOCK_DURATION,
        "candidature",
    )


def record_candidature_attempt(request: Request) -> None:
    """Enregistre une soumission de candidature dans la fenêtre glissante."""
    ip = _get_client_ip(request)
    key = f"candidature:{ip}"
    _candidature_attempts[key].append(time.time())
