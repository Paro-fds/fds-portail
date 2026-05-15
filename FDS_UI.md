# FDS UI — Design System
## Conventions visuelles et composants partagés de la Plateforme FDS
### Cours GL-EN3-2026 — Faculté des Sciences, UEH

> Ce document est la référence officielle du design system `fds-ui`. Tous les modules (FDS Akademi, FDS Portail, FDS Admin, FDS Pay) doivent respecter ces conventions pour que la plateforme soit visuellement cohérente. Les valeurs ci-dessous sont extraites directement des prototypes Stitch du projet.

---

## 1. Philosophie de design : "The Digital Curator"

Le design system FDS rejette l'esthétique surchargée des LMS traditionnels. L'expérience doit ressembler à une revue technique de qualité : sobre, structurée, et où chaque élément d'information a sa place. On parle d'**asymétrie éditoriale** : une grille mathématique stricte combinée à une typographie généreuse et beaucoup d'espace blanc pour guider l'attention vers le contenu, pas vers l'interface.

Deux principes fondamentaux à garder en tête tout au long du développement :

**Pas de bordures de séparation.** Les lignes `1px solid` sont interdites pour délimiter des sections. La structure se crée par des changements de couleur de fond entre les niveaux de surface. Si vous avez envie de tracer une ligne, ajoutez `1.5rem` d'espace à la place.

**Pas de noir pur.** La couleur `#000000` n'existe pas dans ce design. Tout le texte utilise `on-surface` (`#111c2d`), ce qui donne un rendu "encre sur papier" plus doux et plus premium.

---

## 2. Couleurs : architecture tonale

Le système de couleurs est organisé en tokens nommés. On n'utilise jamais une valeur hexadécimale directement dans le code : on utilise le token. Cela permet de maintenir la cohérence sur toute la plateforme.

### Palette principale

| Token | Valeur | Usage |
|---|---|---|
| `primary` | `#0040a1` | Actions principales, liens actifs, icônes de navigation |
| `primary-container` | `#0056d2` | Hover sur les boutons primary, gradient hero |
| `on-primary` | `#ffffff` | Texte sur fond primary |
| `on-primary-container` | `#ccd8ff` | Texte sur fond primary-container |
| `primary-fixed` | `#dae2ff` | Badges académiques, tags "En cours" |
| `primary-fixed-dim` | `#b2c5ff` | Version atténuée du fixed |
| `on-primary-fixed-variant` | `#0040a1` | Texte sur primary-fixed |

### Couleur secondaire (métadonnées et navigation)

| Token | Valeur | Usage |
|---|---|---|
| `secondary` | `#515f74` | Texte secondaire, métadonnées, labels inactifs |
| `secondary-container` | `#d5e3fc` | Fond des éléments secondaires |
| `on-secondary` | `#ffffff` | Texte sur fond secondary |
| `on-secondary-container` | `#57657a` | Texte sur fond secondary-container |

### Couleur tertiaire : le vert technique

| Token | Valeur | Usage |
|---|---|---|
| `tertiary` | `#00514a` | Progression de cours, états "Complété", barres de progression |
| `tertiary-container` | `#006b62` | Fond des indicateurs de succès technique |
| `on-tertiary` | `#ffffff` | Texte sur fond tertiary |
| `on-tertiary-container` | `#7fecde` | Texte sur fond tertiary-container |

Le vert `tertiary` est réservé exclusivement aux états de succès technique et de complétion. Ne pas l'utiliser comme couleur décorative.

### Surfaces : le système de niveaux

La profondeur visuelle est créée par des niveaux de surface, pas par des ombres. Plus un élément est "important" ou "actif", plus sa surface est contrastée par rapport au fond.

| Token | Valeur | Niveau | Usage |
|---|---|---|---|
| `background` / `surface` | `#f9f9ff` | 0 : fond de page | Le canvas principal |
| `surface-bright` | `#f9f9ff` | 0 : navigation active | État actif dans la sidebar |
| `surface-container-low` | `#f0f3ff` | 1 : blocs de contenu | Sections, listes de cours |
| `surface-container` | `#e7eeff` | 2 : éléments interactifs | Cards, panels |
| `surface-container-high` | `#dee8ff` | 3 : éléments en relief | Badges de date, éléments sélectionnés |
| `surface-container-highest` | `#d8e3fb` | 4 : très contrasté | Rarement utilisé |
| `surface-container-lowest` | `#ffffff` | Blanc pur | Cards individuelles, champs de formulaire |
| `surface-dim` | `#cfdaf2` | Atténué | Fond des overlays et états désactivés |

### Texte et contour

| Token | Valeur | Usage |
|---|---|---|
| `on-surface` | `#111c2d` | Texte principal, titres |
| `on-surface-variant` | `#424654` | Texte de contenu légèrement atténué |
| `outline` | `#737785` | Placeholder dans les inputs |
| `outline-variant` | `#c3c6d6` | Bordure ghost (15% opacité), séparateurs discrets |

### États d'erreur

| Token | Valeur | Usage |
|---|---|---|
| `error` | `#ba1a1a` | Texte d'erreur, badge haute priorité, point de notification |
| `error-container` | `#ffdad6` | Fond des messages d'erreur |
| `on-error` | `#ffffff` | Texte sur fond error |
| `on-error-container` | `#93000a` | Texte sur fond error-container |

### Couleurs de thème inversé (dark mode, banners)

| Token | Valeur | Usage |
|---|---|---|
| `inverse-surface` | `#263143` | Fond des snackbars et toasts |
| `inverse-on-surface` | `#ecf1ff` | Texte sur fond inverse-surface |
| `inverse-primary` | `#b2c5ff` | Accent sur fond sombre |

---

## 3. Typographie : l'échelle éditoriale

Deux polices uniquement, importées depuis Google Fonts :

```html
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet"/>
```

### Manrope : titres et headlines

Manrope s'utilise pour tout ce qui structure la hiérarchie visuelle : titres de page, noms de cours, labels de navigation principaux. Elle apporte l'autorité et le caractère technique du design.

| Classe Tailwind | Taille | Graisse | Contexte d'usage |
|---|---|---|---|
| `font-headline text-5xl font-extrabold` | 3rem | 800 | Titre hero, welcome message |
| `font-headline text-2xl font-bold` | 1.5rem | 700 | Titre de page, titre de card major |
| `font-headline text-xl font-bold` | 1.25rem | 700 | Titre de section |
| `font-headline text-lg font-bold` | 1.125rem | 700 | Titre de card standard |
| `font-headline text-sm font-semibold` | 0.875rem | 600 | Navigation, liens de section |

### Inter : corps de texte et labels

Inter s'utilise pour tout le contenu lisible en continu : descriptions, métadonnées, labels de formulaire, corps d'article.

| Classe Tailwind | Taille | Graisse | Contexte d'usage |
|---|---|---|---|
| `font-body text-lg` | 1.125rem | 400 | Corps de texte principal, descriptions longues |
| `font-body text-base` (défaut) | 1rem | 400 | Corps de texte standard |
| `font-body text-sm` | 0.875rem | 400 | Texte secondaire, contenu de card |
| `font-label text-xs font-semibold uppercase tracking-wider` | 0.75rem | 600 | Labels de formulaire, catégories |
| `text-[10px] font-bold uppercase tracking-widest` | 0.625rem | 700 | Micro-labels : codes de cours, tags urgents |

**Line height obligatoire pour les longs textes :** `leading-relaxed` (1.625). Ne pas laisser le line height par défaut sur un paragraphe de plus de deux lignes.

---

## 4. Border radius : minimal et professionnel

Le design utilise des coins légèrement arrondis, pas des "pills". Les boutons entièrement ronds sont interdits car ils donnent un aspect trop décontracté pour une interface académique.

| Token Tailwind | Valeur | Usage |
|---|---|---|
| `rounded` (défaut) | `0.125rem` | Très rare, pour des micro-éléments |
| `rounded-md` | `0.375rem` | **Boutons, inputs, badges** : le standard |
| `rounded-lg` | `0.25rem` | Variante légèrement plus douce (override local) |
| `rounded-xl` | `0.5rem` | Cards, sections, panels |
| `rounded-full` | `0.75rem` | Avatars uniquement |

Note : la valeur `rounded-full` en Tailwind correspond ici à `0.75rem` (pas `9999px`). Les avatars ont des coins très légèrement arrondis, pas un cercle parfait.

---

## 5. Élévation et profondeur : le Tonal Layering

On ne représente pas la profondeur avec des ombres lourdes. On la représente avec des niveaux de surface. Un élément "au-dessus" du fond est plus clair ou plus contrasté, pas plus ombré.

### Les 3 niveaux de base

```
Niveau 0 : background (#f9f9ff)    → le fond de la page
Niveau 1 : surface-container-low   → blocs de contenu, listes
Niveau 2 : surface-container-lowest (#ffffff) → cards individuelles, inputs
```

### Ombres autorisées (très rares)

Seuls les éléments qui "flottent" vraiment peuvent avoir une ombre. Le style est toujours ambiant, jamais un drop-shadow dur :

```css
/* Shadow pour cards interactives au hover */
box-shadow: 0 8px 24px rgba(17, 28, 45, 0.06);

/* Tailwind équivalent utilisé dans les prototypes */
shadow-[0_8px_24px_rgba(17,28,45,0.06)]
```

### Ghost border (accessibilité)

Pour les environnements à fort contraste, on peut ajouter une bordure fantôme sur les cards blanches :

```css
border: 1px solid rgba(195, 198, 214, 0.15);  /* outline-variant à 15% */
/* Tailwind : border border-outline-variant/15 */
```

Elle doit être "sentie, pas vue" selon le principe du design system.

---

## 6. Composants : spécifications techniques

### 6.1 Bouton Primary

Le bouton d'action principal. Fond `primary`, texte `on-primary`, radius `rounded-md`.

```html
<button class="px-6 py-4 bg-primary text-on-primary font-headline font-bold rounded-md
               hover:bg-primary-container active:scale-[0.98]
               transition-all flex items-center justify-center gap-2 shadow-sm">
  Libellé de l'action
  <span class="material-symbols-outlined text-lg">arrow_forward</span>
</button>
```

Règles : toujours un libellé d'action précis (pas "OK", pas "Valider" générique), icône optionnelle à droite, taille minimale du touch target 44x44px.

### 6.2 Bouton Secondary

Pour les actions secondaires, intégré visuellement dans la page sans attirer autant l'attention.

```html
<button class="px-6 py-3 bg-surface-container-high text-primary font-bold rounded-md
               hover:bg-surface-container transition-colors">
  Action secondaire
</button>
```

### 6.3 Bouton Ghost (sur fond coloré)

Sur les sections hero à fond `primary`, on utilise un bouton transparent avec bordure blanche :

```html
<button class="px-6 py-2.5 bg-white/10 backdrop-blur-md text-white
               border border-white/20 font-bold rounded-md
               hover:bg-white/20 transition-all">
  Voir le calendrier
</button>
```

### 6.4 Bouton Outline (liste, calendrier)

Pour les actions tertiaires ou les boutons dans des zones de fond clair :

```html
<button class="w-full py-3 bg-slate-50 border border-slate-200 text-slate-600
               font-bold text-xs rounded-md hover:bg-slate-100 transition-colors
               uppercase tracking-widest">
  Voir tout
</button>
```

### 6.5 Input text : le bottom-bar

Les champs de formulaire n'ont pas de bordure complète. Seule la bordure basse est visible, qui passe de `outline-variant` à `primary` au focus.

```html
<div class="space-y-2">
  <label class="font-label text-xs font-semibold uppercase tracking-wider text-secondary">
    Libellé du champ
  </label>
  <div class="relative group">
    <span class="absolute left-0 bottom-3 text-secondary group-focus-within:text-primary transition-colors">
      <span class="material-symbols-outlined text-lg">alternate_email</span>
    </span>
    <input
      class="w-full pl-8 py-2 bg-transparent border-0 border-b-2 border-outline-variant/30
             focus:ring-0 focus:border-primary transition-all
             font-body text-on-surface placeholder:text-outline"
      type="email"
      placeholder="nom@universite.edu"
    />
  </div>
</div>
```

**État d'erreur :** texte helper en `text-error`, fond du champ en `bg-surface-container-high` pour que le champ "vibre" visuellement contre le fond blanc.

### 6.6 Card standard

```html
<div class="bg-white rounded-xl overflow-hidden border border-outline-variant/15
            hover:shadow-xl transition-all duration-300">
  <!-- contenu -->
</div>
```

Pour une card sans hover effect (informative uniquement) :

```html
<div class="p-6 bg-surface-container-low rounded-xl">
  <!-- contenu -->
</div>
```

**Règle absolue :** pas de ligne `<hr>` ou de `border-b` pour séparer les sections internes d'une card. On utilise `space-y-6` (1.5rem) entre les éléments.

### 6.7 Card avec accent de bordure gauche (annonces)

Pour les annonces urgentes ou les éléments à distinguer visuellement sans fond coloré :

```html
<div class="p-6 bg-surface-container-low rounded-xl border-l-4 border-primary">
  <span class="text-[10px] font-bold text-primary uppercase tracking-widest mb-2 block">
    Urgent • Faculté des Sciences
  </span>
  <h3 class="font-bold text-lg mb-2">Titre de l'annonce</h3>
  <p class="text-secondary text-sm leading-relaxed">Description.</p>
</div>
```

### 6.8 Badge / Tag

```html
<!-- Badge académique (fond clair, texte primary) -->
<span class="text-[10px] font-bold text-primary uppercase tracking-widest
             bg-primary-fixed px-2 py-0.5 rounded">
  En cours
</span>

<!-- Badge urgent (fond error-container, texte error) -->
<span class="text-[10px] font-bold text-error uppercase tracking-tighter
             bg-error-container/30 px-2 py-0.5 rounded">
  Haute priorité
</span>

<!-- Badge succès (fond tertiary, texte white) -->
<span class="text-[10px] font-bold text-tertiary uppercase tracking-widest">
  Complété
</span>
```

### 6.9 Barre de progression

Toujours en `tertiary` (#00514a). Fond en `bg-slate-100`. Hauteur `h-1.5`.

```html
<div class="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
  <div class="h-full bg-tertiary" style="width: 68%;"></div>
</div>
```

### 6.10 Sidebar de navigation

```html
<aside class="fixed left-0 top-0 flex flex-col h-full p-4 overflow-y-auto
              bg-slate-50 border-r border-slate-200/50 w-64 z-50">
  <!-- Logo -->
  <div class="mb-8 px-2">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 bg-primary rounded flex items-center justify-center text-white">
        <span class="material-symbols-outlined">school</span>
      </div>
      <div>
        <h2 class="text-lg font-extrabold text-blue-800 leading-tight">FDS Akademi</h2>
        <p class="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
          Plateforme FDS
        </p>
      </div>
    </div>
  </div>

  <!-- Liens de navigation -->
  <nav class="flex-1 space-y-1.5">
    <!-- État actif -->
    <a class="flex items-center gap-3 px-3 py-2.5 bg-white text-blue-700
              font-bold rounded-md shadow-sm transition-all" href="#">
      <span class="material-symbols-outlined">dashboard</span>
      <span class="text-sm">Tableau de bord</span>
    </a>
    <!-- État inactif -->
    <a class="flex items-center gap-3 px-3 py-2.5 text-slate-600
              hover:bg-slate-100 hover:translate-x-1 transition-all rounded-md" href="#">
      <span class="material-symbols-outlined">inventory_2</span>
      <span class="text-sm">Modules</span>
    </a>
  </nav>
</aside>
```

### 6.11 Header / Top App Bar

```html
<header class="sticky top-0 z-40 flex justify-between items-center w-full
               px-8 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
  <!-- contenu -->
</header>
```

Le glassmorphism (`bg-white/80 backdrop-blur-md`) est réservé au header et aux overlays mobiles. Ne pas en abuser ailleurs.

### 6.12 Section Hero avec gradient

```html
<section class="relative overflow-hidden rounded-xl
                bg-gradient-to-br from-primary to-primary-container
                p-12 text-on-primary shadow-lg">
  <!-- Décoration de fond -->
  <div class="absolute top-[-20%] right-[-10%] w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
  <div class="absolute bottom-[-10%] right-[10%] w-64 h-64 bg-tertiary/20 rounded-full blur-2xl"></div>
  <!-- Contenu -->
  <div class="relative z-10 max-w-2xl">
    <h1 class="text-5xl font-extrabold font-headline mb-4 tracking-tight">Titre</h1>
    <p class="text-lg opacity-90 font-body leading-relaxed mb-8">Description.</p>
  </div>
</section>
```

---

## 7. Icônes : Material Symbols Outlined

La seule bibliothèque d'icônes autorisée sur la plateforme. Import :

```html
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
```

Style de base à appliquer globalement :

```css
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
```

Usage :

```html
<span class="material-symbols-outlined text-primary text-lg">arrow_forward</span>
```

Tailles standard : `text-sm` (petites icônes dans badges), `text-lg` (icônes dans boutons), `text-2xl` (icônes dans navigation), `text-4xl` (icônes de section ou décoratives).

---

## 8. Grille et layout

### Layout principal (avec sidebar)

```html
<div class="flex">
  <aside class="w-64 fixed"><!-- sidebar --></aside>
  <main class="ml-64 min-h-screen bg-surface"><!-- contenu --></main>
</div>
```

### Grille de contenu (12 colonnes)

Le contenu principal utilise une grille 12 colonnes pour permettre l'asymétrie éditoriale :

```html
<div class="grid grid-cols-12 gap-8">
  <div class="col-span-8"><!-- contenu principal --></div>
  <div class="col-span-4"><!-- sidebar droite --></div>
</div>
```

### Page de connexion (split screen)

```html
<main class="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-12 items-center gap-12">
  <div class="md:col-span-6"><!-- branding gauche --></div>
  <div class="md:col-span-6 flex justify-end"><!-- formulaire droit --></div>
</main>
```

### Espacement

On utilise les multiples de `spacing-6` (1.5rem) pour séparer les sections. Entre les éléments d'une même section : `spacing-4` (1rem). Pour les séparations majeures entre sections : `spacing-12` (3rem).

---

## 9. Effets spéciaux

### Gradient de fond ambiant (pages de connexion)

```html
<div class="absolute -top-24 -right-24 w-96 h-96 bg-primary-container opacity-5 rounded-full blur-3xl"></div>
<div class="absolute top-1/2 -left-48 w-[32rem] h-[32rem] bg-tertiary opacity-5 rounded-full blur-[100px]"></div>
```

Ces décors de fond sont en `z-0` avec `pointer-events-none`. Ils créent une atmosphère sans interférer avec le contenu.

### Glassmorphism (header, overlays mobiles)

```css
background: rgba(255, 255, 255, 0.95);
backdrop-filter: blur(20px);

/* Tailwind : bg-white/80 backdrop-blur-md */
```

### Gradient hero

```css
background: linear-gradient(135deg, #0040a1 0%, #0056d2 100%);
/* Tailwind : bg-gradient-to-br from-primary to-primary-container */
/* Ou classe custom : .bg-academic-gradient */
```

---

## 10. Règles absolues (Do / Don't)

### Faire

- Utiliser les tokens nommés, jamais les valeurs hex directement dans les classes Tailwind
- Adopter l'asymétrie : headline à gauche, CTA à droite avec de l'espace entre les deux
- Respecter un touch target minimum de 44x44px sur tous les éléments interactifs
- Utiliser `surface-bright` pour l'état actif des éléments de navigation
- Mettre `leading-relaxed` sur tout texte de plus d'une ligne

### Ne pas faire

- Ne pas utiliser `#000000`. Toujours `text-on-surface` (`#111c2d`)
- Ne pas tracer de lignes `border-b` ou `<hr>` pour séparer des sections : utiliser l'espace et les niveaux de surface
- Ne pas utiliser des boutons entièrement arrondis (`rounded-full` sur des boutons) : `rounded-md` uniquement
- Ne pas empiler des ombres lourdes sur les cards : l'ombre est réservée aux éléments flottants et au hover
- Ne pas surcharger un écran : si ça paraît "busy", augmenter l'espacement entre les containers
- Ne pas utiliser `bg-white` comme fond de page : toujours `bg-surface` (`#f9f9ff`)

---

## 11. Configuration Tailwind de référence

Cette configuration est identique dans tous les fichiers HTML du projet Stitch. À reprendre telle quelle dans votre `tailwind.config.js` ou `tailwind.config.ts`.

```javascript
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary":                    "#0040a1",
        "primary-container":          "#0056d2",
        "on-primary":                 "#ffffff",
        "on-primary-container":       "#ccd8ff",
        "on-primary-fixed-variant":   "#0040a1",
        "primary-fixed":              "#dae2ff",
        "primary-fixed-dim":          "#b2c5ff",
        "on-primary-fixed":           "#001847",
        "secondary":                  "#515f74",
        "secondary-container":        "#d5e3fc",
        "on-secondary":               "#ffffff",
        "on-secondary-container":     "#57657a",
        "secondary-fixed":            "#d5e3fc",
        "secondary-fixed-dim":        "#b9c7df",
        "on-secondary-fixed":         "#0d1c2e",
        "on-secondary-fixed-variant": "#3a485b",
        "tertiary":                   "#00514a",
        "tertiary-container":         "#006b62",
        "on-tertiary":                "#ffffff",
        "on-tertiary-container":      "#7fecde",
        "tertiary-fixed":             "#89f5e7",
        "tertiary-fixed-dim":         "#6bd8cb",
        "on-tertiary-fixed":          "#00201d",
        "on-tertiary-fixed-variant":  "#005049",
        "error":                      "#ba1a1a",
        "error-container":            "#ffdad6",
        "on-error":                   "#ffffff",
        "on-error-container":         "#93000a",
        "surface":                    "#f9f9ff",
        "surface-bright":             "#f9f9ff",
        "surface-dim":                "#cfdaf2",
        "surface-container-lowest":   "#ffffff",
        "surface-container-low":      "#f0f3ff",
        "surface-container":          "#e7eeff",
        "surface-container-high":     "#dee8ff",
        "surface-container-highest":  "#d8e3fb",
        "surface-variant":            "#d8e3fb",
        "surface-tint":               "#0056d2",
        "on-surface":                 "#111c2d",
        "on-surface-variant":         "#424654",
        "on-background":              "#111c2d",
        "background":                 "#f9f9ff",
        "outline":                    "#737785",
        "outline-variant":            "#c3c6d6",
        "inverse-surface":            "#263143",
        "inverse-on-surface":         "#ecf1ff",
        "inverse-primary":            "#b2c5ff",
      },
      fontFamily: {
        "headline": ["Manrope"],
        "body":     ["Inter"],
        "label":    ["Inter"],
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg":      "0.25rem",
        "xl":      "0.5rem",
        "full":    "0.75rem",
      },
    },
  },
}
```

---

## 12. Checklist d'intégration pour chaque groupe

Avant de soumettre votre MVP en code review, vérifiez ces points :

- [ ] Configuration Tailwind identique à la section 11
- [ ] Polices Manrope et Inter importées depuis Google Fonts
- [ ] Material Symbols Outlined importé pour les icônes
- [ ] Fond de page : `bg-surface` (`#f9f9ff`), pas `bg-white`
- [ ] Texte principal : `text-on-surface` (`#111c2d`), pas `text-black`
- [ ] Aucune ligne `border-b` utilisée pour séparer des sections
- [ ] Tous les boutons en `rounded-md`, pas en `rounded-full`
- [ ] Barres de progression en `bg-tertiary`
- [ ] Aucune couleur hex hardcodée dans les classes Tailwind
- [ ] Touch targets : minimum 44x44px sur mobile
- [ ] Contraste `primary` sur `surface` : ratio 4.5:1 minimum (vérifié)

---

*GL-EN3-2026 — Faculté des Sciences, UEH*
*Source : prototypes Stitch FDS Akademi, répertoire `stitch_fds_akademi/`*
*Références croisées : `MVP_PLATFORM.md` §5, `FDS_PLATFORM.md` §6*
