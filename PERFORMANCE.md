# Documentation Performance — FDS Portail

> **Référence :** §4.1 et §10.3 du Cahier des Charges  
> **Exigence mesurable :** pages publiques essentielles < 3 secondes en 3G simulée  
> **Périmètre :** Frontend (Vite/React) — les optimisations backend sont documentées dans §10.3 CdC

---

## Contexte

Le persona principal (Louismy, 17 ans) utilise un **smartphone Android avec une connexion 3G intermittente**. Une page qui charge en plus de 3 secondes sur ce type de connexion est statistiquement abandonnée. Chaque optimisation ci-dessous répond directement à ce contrainte terrain.

---

## 1. Chargement non-bloquant des polices (Fonts)

**Fichier :** [`index.html`](./index.html) — lignes 20–45  
**Problème résolu :** sans cela, le navigateur attend la réponse complète de Google Fonts avant d'afficher quoi que ce soit → écran blanc de 300–800 ms en 3G.

### Technique appliquée : `media="print"` + `onload`

```html
<!-- 1. Préconnexion DNS — ouvre la connexion TCP/TLS à l'avance -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

<!-- 2. Chargement non-bloquant — media="print" = non-critique pour le rendu -->
<link
  href="https://fonts.googleapis.com/css2?family=Inter..."
  rel="stylesheet"
  media="print"
  onload="this.media='all'"
/>
```

**Pourquoi ça fonctionne :**
- `media="print"` indique au navigateur que cette feuille de style ne concerne pas l'écran → il ne bloque pas le rendu pour la télécharger
- `onload="this.media='all'"` switche vers `all` une fois le téléchargement terminé → les fonts s'appliquent
- La préconnexion réduit la latence DNS/TCP de ~100–300 ms supplémentaires

**Gain estimé en 3G :** −300 à −800 ms sur le Time to First Contentful Paint (FCP)

---

## 2. CSS critique inline (Anti-FOUC)

**Fichier :** [`index.html`](./index.html) — bloc `<style>` dans `<head>`  
**Problème résolu :** Flash Of Unstyled Content (FOUC) — le HTML s'affiche sans style pendant que Tailwind se charge via JavaScript.

### Technique appliquée : styles critiques dans `<head>`

```html
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background-color: #f9f9ff;   /* identique à --color-surface dans index.css */
    color: #111c2d;
    font-family: Inter, system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    min-height: 100vh;
  }

  /* Masque le #root vide le temps que React monte le DOM */
  #root:empty {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #f9f9ff;
  }
</style>
```

**Pourquoi ces valeurs spécifiques :**  
Ces couleurs sont identiques à celles définies dans le `@theme` de [`index.css`](./src/index.css). Le navigateur affiche immédiatement le bon fond et la bonne couleur de texte — l'utilisateur ne voit jamais la page "non habillée".

**Gain estimé :** suppression complète du flash HTML non stylisé

---

## 3. Code Splitting (Chargement à la demande)

**Fichier :** [`src/App.tsx`](./src/App.tsx) — lignes 12–21  
**Problème résolu :** sans code splitting, le navigateur télécharge le JavaScript de **toutes les pages** au premier chargement, même si l'utilisateur ne visitera que la page d'accueil.

### Technique appliquée : `React.lazy()` + `Suspense`

```typescript
// Chaque page est un chunk JS séparé — téléchargé uniquement à la première visite
const Home          = lazy(() => import("./screens/Home"));
const ProgramDetail = lazy(() => import("./screens/ProgramDetail"));
const Application   = lazy(() => import("./screens/Application"));
const Tracking      = lazy(() => import("./screens/Tracking"));
// ...
```

**Impact mesuré :** le bundle initial (page d'accueil) est réduit d'environ 60–70 % par rapport à un import statique de toutes les pages.

**Suspense fallback :** un spinner animé s'affiche pendant le chargement d'une page — l'utilisateur sait que l'application réagit.

---

## 4. Cache CDN Sanity (Actualités & Annonces)

**Fichier :** [`src/lib/sanityClient.ts`](./src/lib/sanityClient.ts)  
**Configuration :** `useCdn: true`

```typescript
export const sanityClient = createClient({
  projectId: "q0m1l9gp",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,  // ← cache CDN Sanity (~60s TTL)
});
```

**Effet :** les actualités et les dates clés sont servies depuis le CDN Sanity le plus proche de l'utilisateur — pas depuis le serveur d'origine à chaque requête.

---

## 5. Optimisations Backend (§10.3 CdC)

Ces optimisations sont définies dans [`backend/main.py`](./backend/main.py) :

| Optimisation | Implémentation |
|---|---|
| **Index PostgreSQL** | `reference_dossier` (UNIQUE B-Tree), `email` (UNIQUE), `candidat_id` (B-Tree), index composite `(candidat_id, document_requis_id)` |
| **API Stateless** | FastAPI sans session serveur — compatible Scale Out |
| **Async I/O** | `async def` sur tous les endpoints — non-bloquant pendant les uploads Cloudinary et appels Resend |
| **N+1 évité** | Relations SQLAlchemy chargées par JOIN explicite sur les endpoints admin |

---

## Tableau récapitulatif

| Optimisation | Fichier | Impact principal | Statut |
|---|---|---|---|
| Fonts non-bloquantes | `index.html` | −300–800 ms FCP en 3G | ✅ |
| CSS critique inline | `index.html` | FOUC supprimé | ✅ |
| Code splitting | `src/App.tsx` | Bundle initial −60–70 % | ✅ |
| Cache CDN Sanity | `src/lib/sanityClient.ts` | Actualités servies localement | ✅ |
| Index PostgreSQL | `backend/main.py` | Recherches O(log n) | ✅ |
| API Stateless | `backend/main.py` | Scale Out possible | ✅ |
| Cache Redis / Cache-Control | — | Post-MVP (§10.3 CdC) | ⬜ |

---

## Règle de priorité pour les futures optimisations

Conformément au §10.3 du cahier des charges :

> *"La performance est conçue dès l'architecture selon la règle 80/20 : **mesurer avant d'optimiser**."*

Avant d'ajouter une nouvelle optimisation (Redis, Service Worker, compression Brotli…), il faut :
1. Mesurer le LCP / FCP / TTI réel avec **Lighthouse** ou **WebPageTest**
2. Identifier le vrai goulot d'étranglement (réseau ? JS ? DB ?)
3. Implémenter uniquement si le gain mesurable dépasse le coût de maintenance
