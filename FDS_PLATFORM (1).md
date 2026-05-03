# PLATFORM BRIEF — Plateforme Numérique de la Faculté des Sciences
## Université d'État d'Haïti

> **Document de vision stratégique**
> Cours : GL-EN3-2026 — Faculté des Sciences, UEH
> Auteur : Jean Fritz SAINT-PAUL — avec Edgar Etienne
> Version : 0.2 — Mars 2026
> Statut : DRAFT — Vision initiale à développer en collaboration
>
> *Philosophie directrice : "Start from Complexity and craft Certainty." — [Konprann](https://konprann.com)*

---

## Table des matières

1. [Pourquoi ce projet ?](#1-pourquoi-ce-projet-)
2. [Mission de la Faculté des Sciences](#2-mission-de-la-faculté-des-sciences)
3. [Personas — Qui sont les utilisateurs ?](#3-personas--qui-sont-les-utilisateurs-)
4. [Vision du système — Les 4 modules](#4-vision-du-système--les-4-modules)
5. [Architecture globale de la plateforme](#5-architecture-globale-de-la-plateforme)
6. [Roadmap — Par phase](#6-roadmap--par-phase)
7. [Module 1 — FDS Akademi (LMS + Skills)](#7-module-1--fds-akademi-lms--skills)
8. [Module 2 — FDS Portail (Vitrine & Cursus)](#8-module-2--fds-portail-vitrine--cursus)
9. [Module 3 — FDS Admin (Suivi des demandes)](#9-module-3--fds-admin-suivi-des-demandes)
10. [Module 4 — FDS Pay (Paiements)](#10-module-4--fds-pay-paiements)
11. [Services partagés](#11-services-partagés)
12. [Stack technique cible](#12-stack-technique-cible)
13. [Exigences non fonctionnelles](#13-exigences-non-fonctionnelles)
14. [Prochaines étapes](#14-prochaines-étapes)

---

## 1. Pourquoi ce projet ?

### 1.1 Le point de départ — la complexité

Haïti est un pays d'une complexité extraordinaire. Complexité géographique, historique, sociale, économique. Une complexité qui n'est pas un défaut — c'est la réalité du terrain. C'est le matériau brut.

Et c'est précisément là que commence le travail de l'ingénieur.

> *"Start from Complexity and craft Certainty."*
> — Konprann

Cette fresque résume ce que les ingénieurs font pour nous — pour Haïti, pour le monde. Ils partent de la complexité, ils appliquent leur craft, et ils produisent de la certitude : des systèmes qui fonctionnent, des infrastructures qui tiennent, des solutions sur lesquelles on peut compter.

La Faculté des Sciences est l'endroit où on apprend à faire ça. Pas en théorie — en pratique, sur de vrais problèmes.

### 1.2 Le constat — la FDS face à sa propre complexité

Il y a une ironie douloureuse dans la situation actuelle : la faculté qui forme les ingénieurs chargés de structurer la complexité haïtienne n'a pas encore appliqué ce principe à elle-même.

Son interaction avec le monde extérieur reste artisanale : informations éparpillées ou introuvables en ligne, démarches administratives entièrement manuelles, paiements en espèces sans traçabilité, aucune trace numérique de ce qui se construit dans ses murs.

Un candidat à l'inscription qui cherche des informations sur la FDS ne trouve rien d'officiel. Un étudiant qui dépose une demande administrative ne sait pas où elle en est. Un diplômé qui veut faire valoir ses compétences auprès d'un employeur n'a aucune preuve numérique à partager.

**Ce n'est pas un problème d'ambition. C'est un problème d'outils — et un manque à combler par ses propres ingénieurs.**

### 1.3 La réponse — la plateforme comme acte d'ingénierie

Le cours GL-EN3-2026 est l'occasion de corriger cela — en direct, avec les étudiants qui en sont à la fois les artisans et les bénéficiaires.

La Plateforme FDS n'est pas un projet académique fictif. C'est la FDS qui applique à elle-même ce qu'elle enseigne : prendre la complexité de son fonctionnement réel (informations éparpillées, processus manuels, paiements en espèces) et la transformer en certitude — un système numérique fiable, traçable, accessible, qui donne à la faculté les outils qu'elle mérite.

> **La Plateforme FDS, c'est *Complexity → Certainty* appliqué à la FDS elle-même.**

### 1.4 L'ambition — Haïti acteur du monde

Mais l'horizon ne s'arrête pas à la FDS.

Quand un diplômé de la FDS peut partager un lien de certification de ses compétences vérifié par sa faculté, quand il peut prouver ce qu'il sait faire à un employeur à Paris, Miami ou Montréal, quand la FDS est visible, crédible et fonctionnelle aux yeux du monde — c'est Haïti qui prend sa place.

Pas une place subie. Une place méritée, construite, certaine.

> **L'objectif final n'est pas seulement de numériser la FDS. C'est de donner à Haïti les ingénieurs et les outils pour être pleinement acteur du monde — et pourquoi pas, pour en façonner une partie.**

### 1.5 Le principe de conception

> **Un seul projet de plateforme, plusieurs modules indépendants, un impact immédiat et réel.**

Chaque module prend un morceau de complexité institutionnelle et le transforme en certitude opérationnelle. Ensemble, ils forment la **Plateforme FDS** — l'infrastructure numérique que la faculté construit pour elle-même, par ses propres étudiants, selon ses propres besoins.

---

## 2. Mission de la Faculté des Sciences

> *À valider avec Monsieur Edgar Etienne et la direction de la FDS.*
> *Deux formulations sont proposées : l'une ancrée dans la philosophie Konprann (recommandée), l'autre plus institutionnelle.*

---

### 2.1 Mission — Formulation Konprann ⭐ *(recommandée)*

> **La Faculté des Sciences forme ceux qui partent de la complexité pour créer de la certitude.**
>
> Des ingénieurs, des scientifiques, des techniciens — des artisans du réel — qui prennent la complexité haïtienne et la complexité du monde, y appliquent la rigueur du craft scientifique et technique, et en font quelque chose de sûr, de fonctionnel, de durable.
>
> Des femmes et des hommes capables de construire ce qu'Haïti a besoin, et de prendre leur place dans le monde — pas comme spectateurs, mais comme bâtisseurs.

---

### 2.2 Le cadre — *Start from Complexity and craft Certainty*

Cette formule, tirée de la philosophie Konprann, décrit précisément ce que la FDS apprend à faire. Elle tient en deux gestes : **partir de la complexité**, et **fabriquer de la certitude**.

```
        COMPLEXITY                              CERTAINTY
        ──────────────────────────────────────────────────
        La réalité haïtienne                  Ce qu'on produit
        telle qu'elle est :                   pour Haïti et le monde :

        • Infrastructure fragile              • Systèmes fiables
        • Ressources limitées                 • Infrastructure sûre
        • Connectivité réduite                • Logiciels robustes
        • Isolement institutionnel            • Services accessibles
        • Déficit de confiance                • Certifications crédibles
          dans les institutions               • Décisions éclairées

                            │
                            │  craft
                            │  ──────────────────────────────
                            │  Les sciences de l'ingénierie :
                            │  mathématiques, physique,
                            │  électronique, génie logiciel,
                            │  méthodes, outils, rigueur
                            │
                            ▼
```

Le mot clé est **craft** — verbe et substance à la fois. Ce n'est pas juste une transformation technique. C'est un acte artisanal qui demande rigueur, intention et maîtrise. L'ingénieur ne subit pas la complexité — il la travaille, comme un artisan travaille la matière.

La FDS est le lieu où ce geste s'apprend. Pas sur des problèmes fictifs — sur les vrais problèmes d'Haïti.

---

### 2.3 Mission — Formulation institutionnelle *(alternative)*

> **La Faculté des Sciences de l'UEH forme des ingénieurs, des scientifiques et des techniciens capables de comprendre, analyser et résoudre les défis techniques et scientifiques auxquels Haïti fait face. Elle est un pôle de savoir ouvert, accessible et ancré dans les réalités du pays.**

---

### 2.4 Valeurs fondatrices

| Valeur                   | Ce qu'elle signifie dans le cadre *Complexity → Certainty*                       |
| ------------------------ | -------------------------------------------------------------------------------- |
| **Ancrage dans le réel** | On part de la complexité haïtienne — pas d'abstractions déconnectées du terrain  |
| **Craft & Rigueur**      | Le savoir ne suffit pas — le geste technique doit être précis, exigeant, solide  |
| **Certitude**            | Ce qu'on construit doit être fiable — les gens peuvent compter dessus            |
| **Ouverture**            | La certitude haïtienne doit être reconnue dans le monde entier                   |
| **Transmission**         | Chaque ingénieur formé est un multiplicateur — il transmet le craft aux suivants |

### 2.6 La plateforme comme démonstration de la formule

> La Plateforme FDS n'est pas seulement un outil pour la FDS. Elle est la preuve vivante que la formule fonctionne.

Les étudiants EN3 qui la construisent vivent en temps réel *"Start from Complexity and craft Certainty"* :

| Geste | Ce qu'ils vivent |
|---|---|
| **Start from Complexity** | Ils observent les vrais problèmes de leur faculté — processus manuels, informations introuvables, paiements en espèces, absence de visibilité numérique |
| **craft** | Ils apprennent les outils de l'ingénieur — FastAPI, React, PostgreSQL, CI/CD, sécurité, accessibilité, tests — et ils les appliquent avec rigueur sur un vrai système |
| **Certainty** | Ils livrent — un système déployé, testé, documenté, que leurs camarades utilisent vraiment |

C'est la pédagogie la plus honnête : on n'apprend pas à résoudre des problèmes fictifs — on résout de vrais problèmes, pour de vraies personnes, avec de vraies conséquences.

### 2.7 Problèmes identifiés que la plateforme adresse

Chaque ligne représente un morceau de complexité institutionnelle que la plateforme transforme en certitude opérationnelle.

| #   | La complexité aujourd'hui                                                      | La certitude demain                                        | Module                 |
| --- | ------------------------------------------------------------------------------ | ---------------------------------------------------------- | ---------------------- |
| P1  | La FDS est invisible en ligne — cursus introuvable, aucune présence structurée | Un portail officiel, accessible, mis à jour par le staff   | FDS Portail (M2)       |
| P2  | Cours gérés par WhatsApp, Teams, email — aucune cohérence                      | Un espace de cours centralisé, structuré par semaine       | FDS Akademi (M1)       |
| P3  | Les diplômés ne peuvent pas prouver leurs compétences                          | Un portfolio certifié FDS, vérifiable par un employeur     | Skills Manager (M1)    |
| P4  | Les demandes administratives sont des boîtes noires — aucun suivi              | Un système de tickets avec statut en temps réel            | FDS Admin (M3)         |
| P5  | Paiements en espèces uniquement — risques et aucune traçabilité                | Paiements digitaux (MonCash, Natcom) avec reçu automatique | FDS Pay (M4)           |
| P6  | Aucune connexion entre les différents espaces de la FDS                        | Un compte unique, un profil, une identité FDS partagée     | SSO (Services communs) |

---

## 3. Personas — Qui sont les utilisateurs ?

### 👩‍🎓 Persona 1 — L'Étudiante inscrite

**Profil type :** Marie-Claire, 20 ans, étudiante EN3 à la FDS, Port-au-Prince

**Ses besoins :**
- Accéder aux ressources de ses cours depuis son téléphone (connexion mobile intermittente)
- Savoir à quel stade est sa demande de relevé de notes
- Payer ses frais d'inscription sans se déplacer au bureau de la FDS
- Construire un portfolio de compétences valorisable à l'emploi

**Ses frustrations :**
- Pour avoir le planning d'un cours, elle doit appeler un ami ou aller au département
- Sa demande de document est "en traitement" depuis 3 semaines — sans aucune mise à jour
- Elle doit payer en espèces et garder un reçu papier comme seule preuve

---

### 🔍 Persona 2 — Le Candidat à l'inscription

**Profil type :** Réginald, 18 ans, bachelier à Jacmel, envisage des études à la FDS

**Ses besoins :**
- Comprendre les formations offertes par la FDS sans devoir se déplacer à Port-au-Prince
- Connaître les dates et conditions d'inscription
- Télécharger les formulaires nécessaires
- Contacter la faculté facilement

**Ses frustrations :**
- Le site web de la FDS (s'il existe) ne contient pas d'informations à jour
- Il ne sait pas si ses prérequis correspondent aux formations
- Il ne sait pas comment envoyer sa demande depuis Jacmel

---

### 👨‍🏫 Persona 3 — Le Professeur

**Profil type :** Jean Fritz, professeur GL2026, département EN

**Ses besoins :**
- Publier ses ressources de cours en ligne et recevoir les soumissions des étudiants
- Valider les compétences acquises par ses étudiants
- Avoir une vue consolidée de ses cours et de l'avancement des étudiants

**Frustrations :** *Voir PRODUCT_BRIEF.md (FDS Akademi) §2 — Persona 1*

---

### 🏢 Persona 4 — L'Administrateur de la FDS

**Profil type :** Responsable scolarité ou secrétariat, Faculté des Sciences

**Ses besoins :**
- Recevoir, tracer et répondre aux demandes administratives des étudiants
- Avoir un tableau de bord des demandes en cours
- Recevoir les paiements de manière traçable et sécurisée
- Publier les informations officielles (calendrier, annonces) sur le portail

**Ses frustrations :**
- Les demandes arrivent par papier, par WhatsApp, par email — aucune centralisation
- Aucun moyen de prouver qu'une demande a été traitée ou non
- Les paiements en espèces génèrent des risques et des erreurs de traçabilité

---

### 💼 Persona 5 — L'Employeur / Recruteur

**Profil type :** DRH d'une entreprise tech haïtienne ou d'une ONG internationale

**Ses besoins :**
- Vérifier rapidement les compétences déclarées d'un candidat diplômé de la FDS
- Avoir confiance dans les certifications délivrées par l'institution

**Frustrations :**
- Impossible de vérifier un diplôme ou une compétence FDS de manière officielle
- Doit se fier au document papier, facilement falsifiable

---

## 4. Vision du système — Les 4 modules

```
┌──────────────────────────────────────────────────────────────────────┐
│                    PLATEFORME FDS                                     │
│            Faculté des Sciences — UEH                                │
│                                                                      │
├──────────────┬──────────────────┬──────────────────┬─────────────────┤
│              │                  │                  │                 │
│  MODULE 1    │    MODULE 2      │    MODULE 3      │   MODULE 4      │
│              │                  │                  │                 │
│ FDS Akademi  │  FDS Portail     │  FDS Admin       │  FDS Pay        │
│              │                  │                  │                 │
│  LMS + Skills│  Vitrine &       │  Suivi des       │  Paiements      │
│  Manager     │  Cursus & Blog   │  demandes        │  MonCash,       │
│              │                  │  admin           │  Natcom,        │
│  GL-EN3-2026 │  Public —        │                  │  International  │
│  + FDS Cert  │  Accessible sans │  Étudiant ←→     │                 │
│              │  compte          │  Secrétariat     │  Service        │
│              │                  │                  │  transversal    │
├──────────────┴──────────────────┴──────────────────┴─────────────────┤
│                    SERVICES PARTAGÉS                                  │
│  Authentification SSO │ Notifications (email / SMS) │ Profil unique  │
└──────────────────────────────────────────────────────────────────────┘
```

### 4.1 Vue par périmètre

| Module          | Audience principale                    | Accès                                      | Priorité |
| --------------- | -------------------------------------- | ------------------------------------------ | -------- |
| **FDS Akademi** | Étudiants inscrits, professeurs        | Compte requis                              | Phase 1  |
| **FDS Portail** | Public général, candidats, partenaires | Public + compte optionnel                  | Phase 1  |
| **FDS Admin**   | Étudiants + staff FDS                  | Compte requis                              | Phase 2  |
| **FDS Pay**     | Tous les utilisateurs                  | Transversal — utilisé par Admin et Akademi | Phase 2  |

---

## 5. Architecture globale de la plateforme

### 5.1 Approche — Monorepo modulaire

La plateforme FDS est construite comme un **monorepo à modules indépendants** : chaque module a son propre frontend et son propre domaine de backend, mais ils partagent une base de données commune pour l'identité des utilisateurs et des services techniques communs.

```
┌────────────────────────────────────────────────────────────────────┐
│                         UTILISATEURS                                │
│         Étudiants │ Candidats │ Professeurs │ Staff FDS            │
└───────────────────────────────┬────────────────────────────────────┘
                                │ HTTPS
┌───────────────────────────────▼────────────────────────────────────┐
│                    VERCEL — Frontend(s)                             │
│  fds-akademi.vercel.app  │  fds-portail.vercel.app                 │
│  fds-admin.vercel.app    │  (ou sous-domaines : *.fds.edu.ht)      │
└─────────────────┬─────────────────────────────┬────────────────────┘
                  │ REST API                     │ REST API
┌─────────────────▼──────┐          ┌────────────▼───────────────────┐
│  API Akademi (Railway)  │          │  API Portail / Admin (Railway) │
│  FastAPI — Module LMS   │          │  FastAPI — Module Portail      │
│  + Skills               │          │  + Module Admin                │
└─────────────────┬───────┘          └────────────┬───────────────────┘
                  │                               │
┌─────────────────▼───────────────────────────────▼───────────────────┐
│                   PostgreSQL — Railway (partagé)                      │
│   Schema `akademi` │ Schema `portail` │ Schema `admin` │ Schema `pay` │
│                    Shared: `users`, `payments`, `notifications`       │
└──────────────────────────────────────────────────────────────────────┘
                  │
┌─────────────────▼──────────────────────────────────────────────────┐
│  SERVICES EXTERNES                                                   │
│  Cloudinary (fichiers) │ MonCash API │ Natcom API │ Sentry          │
│  PostHog (analytics)   │ Email SMTP  │ SMS Gateway                  │
└────────────────────────────────────────────────────────────────────┘
```

### 5.2 Identité partagée — SSO

Un seul compte pour tous les modules. Un étudiant crée son compte une fois et accède à FDS Akademi, à l'historique de ses demandes administratives, et à son historique de paiements avec les mêmes identifiants.

```
Compte FDS unique (users)
  ├── Rôle : student | professor | staff_fds | admin | public
  ├── Profil partagé : nom, email, numéro étudiant, département
  ├── Accès Akademi : inscriptions aux cours, skills
  ├── Accès Admin : demandes administratives
  └── Accès Pay : historique des paiements
```

---

### 5.3 Principes d'unification — le fil conducteur

La plateforme est multi-modules, mais elle doit être ressentie comme **un seul produit**. Pour cela, trois règles s'appliquent sans exception à tous les modules.

---

#### Règle 1 — Une seule stack technique (autant que possible)

Chaque module est un nouveau contexte, mais **pas une nouvelle technologie**. Multiplier les stacks crée une dette de maintenance invisible et rend la collaboration entre modules impossible.

| Couche | Choix unique pour toute la plateforme | Raison |
|---|---|---|
| **Frontend** | React 18 + Vite + TypeScript | Déjà maîtrisé sur FDS Akademi — pas de courbe d'apprentissage par module |
| **Styling** | TailwindCSS | Classes utilitaires partageables — le Design System FDS est construit dessus |
| **Backend** | Python 3.12 + FastAPI | Même approche que FDS Akademi — un seul standard de code |
| **Base de données** | PostgreSQL 15 | Un seul moteur — schemas séparés par module (pas de bases multiples) |
| **Auth** | JWT partagé (python-jose + bcrypt) | Le token est valide sur tous les modules — SSO natif |
| **Fichiers** | Cloudinary | Même intégration, même logique d'upload pour tous |
| **Monitoring** | Sentry | Une seule organisation Sentry — visibilité plateforme complète |
| **Analytics** | PostHog EU | Un seul projet PostHog — funnels cross-modules possibles |
| **CI/CD** | GitHub Actions | Un pipeline par module dans le même monorepo |

> **Exception documentée — FDS Portail :** Le portail public a des contraintes SEO que React SPA ne couvre pas bien (pages non indexées par Google). En Phase 1, on accepte ce compromis. En Phase 2, le Portail peut migrer vers **Next.js** (React + SSR) ou **Astro** (SSG) — même écosystème React, même développeurs, mais rendu serveur pour l'indexation. Cette décision sera documentée en ADR-P02.

---

#### Règle 2 — Un seul Design System (zéro fragmentation UX)

L'utilisateur ne doit pas sentir qu'il change d'application. Un étudiant qui passe de FDS Akademi à FDS Admin voit les mêmes composants, les mêmes couleurs, le même comportement des boutons et des formulaires.

**Le FDS Design System est un package partagé :**

```
packages/
└── fds-ui/                    # Package npm interne
    ├── tokens/
    │   ├── colors.ts           # Palette officielle FDS — primaire, secondaire, états
    │   ├── typography.ts       # Familles de polices, tailles, graisses
    │   └── spacing.ts          # Grille d'espacement (4px base)
    ├── components/
    │   ├── Button/             # Variantes : primary, secondary, ghost, danger
    │   ├── Input/              # Texte, email, password, avec états error/success
    │   ├── Card/               # Conteneur avec ombre et coins arrondis FDS
    │   ├── Badge/              # Statuts, niveaux L1/L2/L3, rôles
    │   ├── Modal/              # Dialogue + backdrop
    │   ├── Toast/              # Notifications success/error/info
    │   ├── Navbar/             # Navigation principale avec logo FDS
    │   └── PageLayout/         # Mise en page commune (sidebar + contenu)
    └── index.ts                # Export centralisé
```

**Ce que ça interdit :**
- Utiliser des composants Shadcn, MUI ou Bootstrap dans un module sans les avoir intégrés dans `fds-ui`
- Créer un style local dans un module qui contredit les tokens (ex. : couleur primaire différente)
- Avoir un comportement de bouton différent entre FDS Akademi et FDS Admin

**Ce que ça autorise :**
- Chaque module ajoute ses composants *métier* (ex. : `SkillCard`, `DemandForm`, `PaymentWidget`) dans son propre dossier — mais ils sont construits *sur* les tokens et composants de `fds-ui`

> **Décision à prendre (Phase 1) :** Construire `fds-ui` dès la v1 de FDS Akademi — les composants génériques (Button, Input, Card, Toast) sont extraits dans le package partagé au lieu d'être copiés dans chaque module.

---

#### Règle 3 — Des déploiements indépendants (zéro couplage opérationnel)

Les modules partagent le code et l'identité — mais **pas le destin opérationnel**. Chaque module peut être déployé, mis à jour, restarté ou mis en maintenance sans affecter les autres.

Pourquoi c'est essentiel : les profils de trafic sont radicalement différents.

```
MODULE          PROFIL DE TRAFIC                    CONSÉQUENCE
────────────────────────────────────────────────────────────────────────
FDS Portail     Public — pics forts aux périodes    CDN + SSG/SSR obligatoire
                d'inscription (centaines de         Pages pré-rendues, pas de
                visiteurs simultanés inconnus)       serveur actif en permanence

FDS Akademi     Authentifié — trafic régulier       SPA standard — Railway auto-scale
                modéré (13 → ~200 étudiants)        selon charge

FDS Admin       Interne — faible volume             SPA légère — Railway minimal
                (staff FDS uniquement, ~10          Pas besoin d'auto-scale
                utilisateurs simultanés max)

FDS Pay         Critique — transactionnel           Haute disponibilité requise
                Faible volume, zéro tolérance       Railway + health checks + alertes
                aux pannes                          Déploiement séparé obligatoire
```

**Règle pratique :** une panne de FDS Portail ne doit pas empêcher un étudiant de soumettre son devoir sur FDS Akademi. Une migration de FDS Admin ne doit pas interrompre FDS Pay.

---

### 5.4 Décisions d'architecture plateforme (ADR-P)

Les ADRs plateforme documentent les choix qui s'appliquent à l'ensemble des modules — à distinguer des ADRs module-spécifiques (voir `CLAUDE.md` pour FDS Akademi).

| # | Décision | Choix retenu | Alternative écartée | Raison |
|---|---|---|---|---|
| **ADR-P01** | Organisation du code | Monorepo (un seul repo GitHub avec `packages/`, `apps/`) | Polyrepo (un repo par module) | Partage de `fds-ui` et des types TypeScript communs sans publish npm externe |
| **ADR-P02** | Rendu FDS Portail | React SPA en Phase 1 → migration Next.js/Astro en Phase 2 si SEO critique | Next.js dès Phase 1 | Évite de complexifier en Phase 1 — priorité au LMS ; la migration est planifiée et documentée |
| **ADR-P03** | Design System | Package interne `fds-ui` dans le monorepo | Bibliothèque externe (MUI, Shadcn) | Identité visuelle FDS contrôlée ; pas de dépendance sur une lib tierce pour le look and feel |
| **ADR-P04** | Base de données | Un seul PostgreSQL, schemas séparés par module | Une base par module | Transactions cross-modules possibles (ex. : paiement → demande) ; complexité raisonnable pour l'échelle v1 |
| **ADR-P05** | Déploiement | Un service Railway par module (frontends sur Vercel séparés) | Tout sur un seul service | Indépendance opérationnelle — un module peut redémarrer sans impact sur les autres |
| **ADR-P06** | Communication inter-modules | Appels API REST directs (synchrones) en Phase 1 | Message queue (RabbitMQ, Redis Streams) | Évite la complexité des queues en Phase 1 — suffisant pour l'échelle actuelle ; migration en Phase 3 si besoin |

> **Convention :** Toute décision qui remet en question un ADR-P doit faire l'objet d'un nouveau ADR-P — pas d'une modification silencieuse. La trace des choix *et de leurs raisons* est aussi importante que le choix lui-même.

---

## 6. Roadmap — Par phase

> **Principe :** Chaque phase livre un module utilisable. On ne bloque pas le déploiement de FDS Akademi en attendant que FDS Admin soit terminé.

### Phase 1 — Fondations (Modules 1 & 2) — GL-EN3-2026, Semaines 1–14

| Livrable                                                  | Module         | Statut                                                  |
| --------------------------------------------------------- | -------------- | ------------------------------------------------------- |
| FDS Akademi v1 — LMS complet                              | Module 1       | 📋 Conception terminée (voir PRODUCT_BRIEF.md)           |
| Skills Manager v1 — Déclaration avec preuves et niveaux   | Module 1       | 📋 Conception terminée (voir SKILLS_MANAGER_PROPOSAL.md) |
| FDS Portail v1 — Pages statiques (cursus, dates, contact) | Module 2       | ⬜ À concevoir                                           |
| Auth SSO partagée                                         | Service commun | ⬜ À concevoir                                           |

### Phase 2 — Extension (Modules 3 & 4) — GL-EN3-2026, Semaines 15–22

| Livrable                                                  | Module         | Statut                                    |
| --------------------------------------------------------- | -------------- | ----------------------------------------- |
| FDS Admin v1 — Dépôt et suivi de demandes administratives | Module 3       | ⬜ À concevoir                             |
| FDS Pay v1 — Intégration MonCash + Natcom                 | Module 4       | ⬜ À concevoir                             |
| Notifications unifiées (email + SMS)                      | Service commun | ⬜ À concevoir                             |
| Analytics plateforme (PostHog)                            | Service commun | 📋 Conception (voir ANALYTICS_PROPOSAL.md) |

### Phase 3 — Maturité — GL-EN3-2026, Semaines 23–28

| Livrable                                                        | Module   | Statut        |
| --------------------------------------------------------------- | -------- | ------------- |
| FDS Akademi v2 — IA, feedback automatique                       | Module 1 | ⬜ À concevoir |
| Skills Manager v2 — Workflow validation, export portfolio       | Module 1 | ⬜ À concevoir |
| FDS Portail v2 — Blog, actualités, formulaires dynamiques       | Module 2 | ⬜ À concevoir |
| FDS Pay v2 — Paiements internationaux (transferts, Zelle, etc.) | Module 4 | ⬜ À concevoir |
| FDS Certification — Open Badges, lien de vérification public    | Module 1 | ⬜ À concevoir |

---

## 7. Module 1 — FDS Akademi (LMS + Skills)

> **Document de référence complet :** `PRODUCT_BRIEF.md` (v1.9)
> **Skills Manager :** `SKILLS_MANAGER_PROPOSAL.md`

### Résumé

FDS Akademi est la plateforme d'apprentissage de la Faculté des Sciences. Elle permet aux professeurs de gérer leurs cours (ressources, devoirs, équipes) et aux étudiants de soumettre leurs travaux et de construire un portfolio de compétences certifié par la FDS.

### Ce que ce module résout

| Problème                                         | Solution                                                        |
| ------------------------------------------------ | --------------------------------------------------------------- |
| Ressources éparpillées (WhatsApp, Teams, email)  | Espace de cours centralisé par semaine                          |
| Aucun suivi structuré des soumissions            | Upload + historique par devoir                                  |
| Aucun portfolio de compétences pour les diplômés | Skills Manager avec niveaux L1/L2/L3 + preuves + validation FDS |

### Statut

Conception complète — version v1 prête à être développée.

---

## 8. Module 2 — FDS Portail (Vitrine & Cursus)

> **Document de référence :** À créer — `PORTAIL_BRIEF.md`
> **Statut :** Vision initiale — à approfondir

### 8.1 Vision

Le FDS Portail est **la porte d'entrée numérique de la Faculté des Sciences**. C'est le premier point de contact pour tout le monde : un candidat à l'inscription, un partenaire international, un employeur, une famille. Accessible sans compte, responsive, rapide, multilingue (FR, ht).

### 8.2 Fonctionnalités identifiées

| Fonctionnalité               | Description                                                                                                     | Priorité |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------- | -------- |
| **Pages de cursus**          | Présentation de chaque filière (EN, Math, Physique, Chimie, Bio…) : durée, prérequis, débouchés, liste de cours | v1       |
| **Calendrier académique**    | Dates d'inscriptions, rentrée, examens, vacances — mis à jour par le staff FDS                                  | v1       |
| **Actualités & Blog**        | Annonces officielles, articles de la FDS, succès des étudiants, partenariats                                    | v1       |
| **Téléchargements**          | Formulaires d'inscription, syllabus, règlements intérieurs — PDF téléchargeables                                | v1       |
| **Formulaire de contact**    | Contact général + demande d'information spécifique par filière                                                  | v1       |
| **FAQ**                      | Questions fréquentes : admission, frais, logement, équivalences                                                 | v1       |
| **Galerie / Événements**     | Photos de cérémonies, conférences, projets étudiants                                                            | v2       |
| **Annuaire des professeurs** | Profils publics des enseignants (spécialité, publications, contact)                                             | v2       |
| **Portail candidats**        | Pré-inscription en ligne, upload de documents, suivi du dossier                                                 | v2       |

### 8.3 Caractéristiques techniques

- **Accès public** — aucun compte requis pour la navigation
- **CMS léger** — le staff FDS met à jour le contenu sans toucher au code (ex. : Sanity.io, Directus, ou simple admin FastAPI)
- **SEO optimisé** — la FDS doit apparaître dans Google quand on cherche "faculté sciences Haiti"
- **Mobile-first** — majorité des visiteurs haïtiens naviguent sur mobile

### 8.4 Questions ouvertes

- Quelles filières sont à présenter en v1 ?
- Qui est responsable de la mise à jour du contenu (staff FDS désigné) ?
- Y a-t-il des informations confidentielles à ne pas publier en ligne ?
- Quel domaine officiel ? (`fds.edu.ht` ?)

---

## 9. Module 3 — FDS Admin (Suivi des demandes)

> **Document de référence :** À créer — `ADMIN_BRIEF.md`
> **Statut :** Problème identifié — conception à démarrer

### 9.1 Vision

FDS Admin est le **système de ticketing administratif** de la Faculté des Sciences. Chaque demande administrative (relevé de notes, attestation d'inscription, équivalence, certificat de scolarité…) est tracée du dépôt à la remise, avec une communication transparente entre l'étudiant et le service concerné.

### 9.2 Le problème actuel

```
Aujourd'hui :
  Étudiant ──► bureau secrétariat (en personne ou WhatsApp)
             ──► "Revenez dans 2 semaines"
             ──► 2 semaines plus tard : "Pas encore prêt"
             ──► Aucune visibilité, aucune traçabilité

Avec FDS Admin :
  Étudiant ──► Crée une demande en ligne (type + justificatifs)
             ──► Reçoit un numéro de ticket + accusé de réception
             ──► Suit l'avancement en temps réel (Reçue → En traitement → Prête → Remise)
             ──► Notifié par email/SMS à chaque changement de statut
             ──► Télécharge le document final quand prêt
```

### 9.3 Types de demandes identifiés (liste initiale)

| Type de demande           | Pièces justificatives | Délai standard  | Frais     |
| ------------------------- | --------------------- | --------------- | --------- |
| Relevé de notes           | Carte étudiante       | 5 jours ouvrés  | À définir |
| Attestation d'inscription | —                     | 2 jours ouvrés  | À définir |
| Certificat de scolarité   | —                     | 2 jours ouvrés  | À définir |
| Lettre de recommandation  | Formulaire de demande | 7 jours ouvrés  | —         |
| Équivalence de diplôme    | Diplôme + transcripts | 15 jours ouvrés | À définir |
| Demande de dérogation     | Lettre de motivation  | Variable        | —         |

> *Liste à compléter avec le secrétariat de la FDS.*

### 9.4 Workflow d'une demande

```
États : brouillon → soumise → reçue → en_traitement → en_attente_paiement
        → payée → prête → remise → clôturée
        ou : rejetée (avec motif)
```

### 9.5 Lien avec FDS Pay

Certaines demandes nécessitent un paiement (relevé de notes, équivalence…). FDS Admin déclenche une demande de paiement vers FDS Pay. La demande ne passe à "En traitement" qu'une fois le paiement confirmé.

### 9.6 Questions ouvertes

- Quels types de demandes traiter en priorité en v1 ?
- Quel(s) département(s) pilote(s) pour la Phase 2 ?
- Comment gérer les demandes qui nécessitent plusieurs approbations (ex. : équivalence) ?
- Y a-t-il un ERP ou système existant à ne pas dupliquer ?

---

## 10. Module 4 — FDS Pay (Paiements)

> **Document de référence :** À créer — `PAY_BRIEF.md`
> **Statut :** Besoin identifié — conception à démarrer

### 10.1 Vision

FDS Pay est le **service de paiement transversal** de la Plateforme FDS. Il permet à la Faculté des Sciences de recevoir des paiements de manière traçable, sécurisée et adaptée au contexte haïtien — qu'il s'agisse de frais d'inscription, de frais de demandes administratives ou de futurs services.

### 10.2 Le problème actuel

Les paiements à la FDS se font entièrement en espèces. Aucune traçabilité numérique, risque de fraude, obligation de se déplacer physiquement, impossible pour les étudiants en province ou à l'étranger.

### 10.3 Méthodes de paiement cibles

| Méthode                     | Opérateur                                           | Marché                                  | Priorité |
| --------------------------- | --------------------------------------------------- | --------------------------------------- | -------- |
| **MonCash**                 | Digicel Haïti                                       | Paiement mobile local — leader en Haïti | v1 ⭐     |
| **Natcom Pay**              | Natcom                                              | Paiement mobile local — 2e opérateur    | v1       |
| **Transfert international** | MoneyGram, Western Union, CAM Transfer, Unitransfer | Diaspora haïtienne                      | v2       |
| **Virement bancaire**       | Banques haïtiennes (BNC, BUH, Sogebank…)            | Entreprises, partenaires                | v2       |
| **Zelle / PayPal**          | Américain                                           | Diaspora USA                            | v3       |
| **Carte bancaire**          | Visa/Mastercard via Stripe                          | International                           | v3       |

### 10.4 Fonctionnalités core

| Fonctionnalité               | Description                                                              |
| ---------------------------- | ------------------------------------------------------------------------ |
| **Initiation de paiement**   | FDS Admin ou FDS Akademi génère un lien / QR code de paiement            |
| **Confirmation automatique** | Webhook MonCash/Natcom → statut de la demande mis à jour automatiquement |
| **Reçu numérique**           | PDF généré automatiquement et envoyé par email à l'étudiant              |
| **Tableau de bord FDS**      | Récapitulatif des paiements reçus, par type de demande, par période      |
| **Remboursement**            | Workflow de remboursement en cas d'annulation (v2)                       |

### 10.5 Contraintes spécifiques à Haïti

- **Instabilité réseau** — le webhook de confirmation peut arriver avec délai ou ne pas arriver. Système de réconciliation manuelle nécessaire en v1.
- **Bimodalité HTG / USD** — la FDS peut facturer en gourdes ou en dollars. Le système doit gérer les deux devises et les taux de change.
- **Faible bancarisation** — la majorité des étudiants n'ont pas de carte bancaire. MonCash est le chemin principal.
- **Conformité** — les transactions doivent être conformes à la réglementation de la Banque de la République d'Haïti (BRH).

### 10.6 Questions ouvertes

- Quel opérateur intégrer en priorité absolue — MonCash ou Natcom ?
- La FDS a-t-elle déjà un compte marchand MonCash ou Natcom ?
- Quels sont les montants typiques des transactions (frais de demandes) ?
- Qui est responsable de la comptabilité et de la réconciliation au niveau de la FDS ?
- Y a-t-il des contraintes légales ou institutionnelles sur la réception de paiements électroniques ?

---

## 11. Services partagés

### 11.1 Authentification unifiée (SSO)

Un seul système d'authentification pour tous les modules. JWT avec rôles étendus.

```python
class FDSRole(str, Enum):
    student       = "student"       # étudiant inscrit
    professor     = "professor"     # enseignant
    staff_fds     = "staff_fds"     # secrétariat / administration
    admin         = "admin"         # super-admin plateforme
    candidate     = "candidate"     # candidat à l'inscription (compte léger)
    public        = "public"        # accès portail sans compte
```

### 11.2 Notifications

Service central qui envoie des notifications par email et SMS selon les événements de chaque module.

| Événement                      | Canal       | Module               |
| ------------------------------ | ----------- | -------------------- |
| Demande administrative soumise | Email + SMS | FDS Admin            |
| Demande prête à récupérer      | Email + SMS | FDS Admin            |
| Paiement confirmé              | Email       | FDS Pay              |
| Devoir à remettre dans 24h     | Email       | FDS Akademi          |
| Compétence validée             | Email       | FDS Akademi / Skills |
| Nouvelle annonce du cours      | Email       | FDS Akademi          |

**Stack proposée :**
- Email : SendGrid (Free tier — 100 emails/jour) ou SMTP self-hosted
- SMS : Digicel API ou Natcom API (haïtien) — à investiguer la disponibilité

### 11.3 Profil utilisateur unique

La table `users` est partagée entre tous les modules. Elle est enrichie pour couvrir les besoins de la plateforme complète.

```
users (profil FDS unifié)
 ├── Identité : first_name, last_name, email, phone, username
 ├── Académique : student_id (numéro d'étudiant FDS), department, year_of_entry
 ├── Plateforme : role, is_active, analytics_consent, language_preference
 ├── RGPD : anonymized_at
 └── Finances : (pas de données financières dans le profil — dans FDS Pay séparé)
```

---

## 12. Stack technique cible

> La stack de FDS Akademi est la base — elle s'étend naturellement à toute la plateforme.

| Couche              | Technologie                                                       | Notes                                                     |
| ------------------- | ----------------------------------------------------------------- | --------------------------------------------------------- |
| **Frontend**        | React 18 + Vite + TypeScript + TailwindCSS                        | Un repo frontend par module (ou monorepo avec workspaces) |
| **Backend**         | Python 3.12 + FastAPI                                             | Un service FastAPI par module — APIs distinctes           |
| **Base de données** | PostgreSQL 15 (Railway)                                           | Un seul cluster — schemas séparés par module              |
| **Auth**            | JWT (python-jose + bcrypt) + refresh tokens                       | Token valide sur tous les modules (SSO)                   |
| **Design System**   | `packages/fds-ui` (TailwindCSS + composants React)               | Package interne — identité visuelle FDS unifiée           |
| **Fichiers**        | Cloudinary                                                        | Upload mutualisé — même logique dans tous les modules     |
| **Email**           | SendGrid (Free) ou SMTP                                           | 100 emails/jour gratuits                                  |
| **SMS**             | Digicel API / Natcom API                                          | À investiguer disponibilité                               |
| **Analytics**       | PostHog EU                                                        | Open source — RGPD — 1M events/mois gratuits              |
| **Monitoring**      | Sentry                                                            | Une organisation Sentry pour toute la plateforme          |
| **CI/CD**           | GitHub Actions                                                    | Un workflow par module dans le monorepo                   |
| **Hébergement**     | Railway (backends) + Vercel (frontends)                           | Un service Railway par module — frontends séparés         |
| **Paiements**       | MonCash API + Natcom Pay API                                      | Phase 1 — intégrations locales haïtiennes                 |

---

## 13. Exigences non fonctionnelles

| Exigence             | Cible                                                                                               |
| -------------------- | --------------------------------------------------------------------------------------------------- |
| **Performance**      | Temps de chargement < 3 secondes sur réseau 3G haïtien — optimisation images, lazy loading          |
| **Disponibilité**    | 99 % uptime pour FDS Akademi et FDS Pay — Railway auto-restart + health checks                     |
| **Mobile-first**     | 100 % des interfaces responsives — la majorité des utilisateurs haïtiens naviguent sur mobile       |
| **Sécurité**         | OWASP Top 10 — UUID v7 (anti-IDOR), HTTPS partout, JWT expiration courte + refresh                 |
| **RGPD**             | Consentement analytics, anonymisation sur demande, données hébergées en Europe (Railway EU)         |
| **Accessibilité**    | Interfaces lisibles sur appareils low-end — pas de dépendance sur JS avancé pour les pages clés    |
| **Internationalisation** | FR en v1, ht (créole) en v2 — système i18n intégré dès la conception                          |
| **Résilience réseau**| Gestion des pannes réseau (retry, messages d'erreur clairs) — contexte haïtien : instabilité fréquente |

---

## 14. Prochaines étapes

### Documents à créer (Priorité Phase 1)

| Document               | Contenu                                                                             | Statut        |
| ---------------------- | ----------------------------------------------------------------------------------- | ------------- |
| `PORTAIL_BRIEF.md`     | Conception complète FDS Portail — CMS, SEO, pages, workflow staff                  | ⬜ À créer    |
| `ADMIN_BRIEF.md`       | Conception FDS Admin — types de demandes, workflow, notifications                   | ⬜ À créer    |
| `PAY_BRIEF.md`         | Conception FDS Pay — intégrations MonCash/Natcom, réconciliation, reçus             | ⬜ À créer    |
| `DESIGN_SYSTEM.md`     | Spécifications `fds-ui` — tokens, composants, guide de contribution                | ⬜ À créer    |

### Actions techniques immédiates

| Action                                       | Responsable | Timing   |
| -------------------------------------------- | ----------- | -------- |
| Créer le monorepo GitHub (`fds-platform`)    | Dev lead    | Semaine 1 |
| Initialiser `packages/fds-ui` (tokens seuls) | Dev lead    | Semaine 1 |
| Déployer FDS Akademi v1 (Railway + Vercel)   | Dev lead    | Semaine 3 |
| Ouvrir le compte MonCash marchand FDS        | Edgar / FDS | Semaine 4 |
| Désigner le responsable contenu FDS Portail  | Edgar / FDS | Semaine 2 |

### Questions ouvertes — à trancher avec Edgar Etienne

- **Domaine officiel :** `fds.edu.ht` est-il disponible et configurable ?
- **MonCash :** La FDS a-t-elle déjà un compte marchand, ou doit-on en créer un ?
- **CMS :** Qui sera responsable de la mise à jour du contenu du Portail ?
- **Phase 2 :** Quel département pilote pour FDS Admin — secrétariat central ou un département spécifique ?
- **Financement :** Y a-t-il un budget alloué à l'hébergement (Railway, Cloudinary, SendGrid) ?

---

## 15. Sécurité & Qualité — Standards Plateforme

> Ces standards s'appliquent à **tous les modules** de la Plateforme FDS sans exception. Chaque module hérite de ces règles et y ajoute ses contraintes spécifiques (voir §Sécurité dans chaque brief module).
>
> Support pédagogique : ces concepts sont traités en Semaine 8 du cours GL-EN3-2026 — *Conception pour la sécurité et la qualité*.

---

### 15.1 Principe directeur — Security by Design

La sécurité n'est pas une couche ajoutée après développement. Elle est intégrée dès la conception, documentée dans chaque ADR, et vérifiée à chaque milestone.

> **Règle plateforme :** Tout nouveau endpoint, toute nouvelle fonctionnalité, tout nouveau flux de données doit être accompagné d'une analyse de menace minimale — *Qui peut accéder à quoi ? Qu'est-ce qui se passe si un acteur malveillant manipule cette entrée ?*

---

### 15.2 UUID v7 — Identifiants sécurisés sur toute la plateforme

**Tous les identifiants primaires de la Plateforme FDS sont des UUID v7 (RFC 9562).**

#### Pourquoi pas des entiers auto-incrémentés ?

| Problème avec `id = 1, 2, 3...` | Solution avec UUID v7 |
|---|---|
| **IDOR (OWASP A01)** : `/users/42` révèle qu'il y a au moins 42 users — un attaquant peut énumérer `/users/1` à `/users/1000` | UUID v7 : `019584ab-3f2c-7e1a-...` — impossible à deviner ou à énumérer |
| Révèle le volume de données (combien d'étudiants, de cours, de transactions) | Aucune information sur le volume |
| Impossible de fusionner deux bases sans collisions d'IDs | UUID universel — fusion possible |
| Mauvaise expérience en logs : "demande 42" → ambigu | "demande 019584ab..." → unique et traçable globalement |

#### Pourquoi UUID v7 plutôt que UUID v4 ?

```
UUID v4 : complètement aléatoire
  → Bon pour la sécurité, mais mauvais pour les index B-tree PostgreSQL
  → Les insertions aléatoires fragmentent l'index → dégradation des performances

UUID v7 : time-ordered (les 48 premiers bits = timestamp ms)
  → Aussi sécurisé que v4 pour la non-prédictibilité
  → Insertions séquentielles dans le temps → index B-tree efficace
  → Ordre naturel = ordre chronologique de création
  → Compatible RFC 9562 (standard IETF 2024)
```

#### Implémentation Python

```python
# pip install uuid6
from uuid6 import uuid7

# SQLAlchemy model
class User(Base):
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid7)

# FastAPI — jamais d'ID séquentiel exposé dans les URLs
# ✅  GET /api/users/019584ab-3f2c-7e1a-b8d4-2e5f9c1a0347
# ❌  GET /api/users/42
```

---

### 15.3 OWASP Top 10 — Couverture Plateforme

Le OWASP Top 10 est la référence mondiale des risques de sécurité web. Voici comment la Plateforme FDS adresse chaque risque au niveau architectural :

| # | Risque OWASP | Menace concrète pour FDS | Mesure plateforme |
|---|---|---|---|
| **A01** | Broken Access Control | Un étudiant accède aux devoirs d'un autre cours ; un utilisateur non-admin modifie le catalogue skills | `require_role()` sur chaque endpoint FastAPI ; RBAC strict ; **UUID v7 anti-IDOR** ; ownership checks (un étudiant ne peut accéder qu'à ses propres données) |
| **A02** | Cryptographic Failures | Mots de passe stockés en clair ou avec MD5 ; tokens interceptés en HTTP | `bcrypt` cost 12 sur tous les mots de passe ; **HTTPS obligatoire** en production ; JWT signé HS256 ; données sensibles jamais dans les logs |
| **A03** | Injection | SQL injection via champ de recherche ; injection dans les noms de fichiers uploadés | **SQLAlchemy ORM uniquement** — zéro SQL brut ; validation **Pydantic** sur tous les inputs ; noms de fichiers sanitisés avant stockage Cloudinary |
| **A04** | Insecure Design | Fonctionnalités conçues sans modèle de menace ; flux de paiement contournable | Modèle de menace documenté par module dans les briefs et `ARCHITECTURE.md` ; revue de sécurité à chaque milestone ; **les transitions d'état critiques (paiement → traitement) sont enforced côté backend** |
| **A05** | Security Misconfiguration | `.env` avec secrets commité sur GitHub ; CORS trop permissif | Variables d'environnement dans Railway/Vercel env vars — jamais dans le code ; **CORS whitelist stricte** par module ; headers de sécurité (HSTS, X-Content-Type-Options) |
| **A06** | Vulnerable Components | Dépendance Python ou npm avec CVE connue | **Dependabot** activé sur GitHub ; `pip-audit` et `npm audit` dans chaque pipeline CI/CD |
| **A07** | Authentication Failures | Brute force sur `/login` ; tokens JWT non expirés ; session non révoquée après déconnexion | **Rate limiting** `5 req/min` sur `/auth/*` (slowapi) ; access token exp = 15 min ; refresh token révocable en base ; rotation du refresh token à chaque usage |
| **A08** | Software Integrity | Dépendances compromises via supply chain attack | Lock files (`requirements.txt` pinned, `package-lock.json`) ; vérification des checksums en CI |
| **A09** | Logging Failures | Pas de trace des actions sensibles ; données personnelles dans les logs | **Sentry** pour les erreurs ; logs structurés sans PII ; audit trail sur les actions critiques (validation skills, confirmation paiement, changement statut demande) |
| **A10** | SSRF | Un utilisateur soumet une URL qui fait appel à un service interne | Validation stricte des URLs soumises (schéma https uniquement, domaines whitelistés pour les preuves Skills) |

---

### 15.4 JWT & Authentification SSO — Standards Plateforme

Un seul système d'authentification, un seul token valide sur tous les modules.

```
┌─────────────────────────────────────────────────────────────┐
│                    TOKEN JWT FDS                              │
│                                                              │
│  Header  : { "alg": "HS256", "typ": "JWT" }                 │
│  Payload : {                                                  │
│    "sub"  : "019584ab-...",   ← UUID v7 de l'utilisateur     │
│    "role" : "student",        ← FDSRole enum                 │
│    "exp"  : 1735689600,       ← 15 minutes                   │
│    "iat"  : 1735688700                                        │
│  }                                                            │
│                                                              │
│  Access Token  : exp = 15 min | stocké en mémoire React      │
│  Refresh Token : exp = 7 jours | httpOnly cookie | révocable │
└─────────────────────────────────────────────────────────────┘
```

**Règles immuables :**
- Le token ne contient **jamais** de données sensibles (pas de mot de passe, pas de numéro étudiant complet)
- Le token n'est **jamais** transmis dans une URL (`?token=...` interdit)
- La déconnexion **révoque** le refresh token en base — pas seulement côté client
- Chaque module vérifie le token indépendamment — pas de confiance implicite inter-modules

---

### 15.5 CORS — Configuration par module

Chaque module backend définit sa propre liste d'origines autorisées. Aucun module n'accepte `*` (wildcard) en production.

| Module | Origins autorisées (production) |
|---|---|
| **FDS Akademi API** | `https://fds-akademi.vercel.app`, `https://fds-akademi.fds.edu.ht` |
| **FDS Portail API** | `https://fds-portail.vercel.app`, `https://fds.edu.ht`, `https://www.fds.edu.ht` |
| **FDS Admin API** | `https://fds-admin.vercel.app`, `https://admin.fds.edu.ht` |
| **FDS Pay API** | `https://fds-admin.vercel.app`, `https://fds-akademi.vercel.app` *(appelé par Admin et Akademi)* |

```python
# Pattern commun — app/middleware/cors.py (par module)
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,   # depuis .env
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)
```

---

### 15.6 Rate Limiting — Standards par endpoint

```python
# Pattern commun — app/middleware/rate_limit.py
# Basé sur slowapi (limiter par IP)

Endpoints auth (/auth/login, /auth/register, /auth/refresh)
  → 5 requêtes / minute / IP
  → Objectif : bloquer le brute force sur les mots de passe

Endpoints publics (FDS Portail, formulaire de contact)
  → 30 requêtes / minute / IP
  → Objectif : bloquer le spam et le scraping

Endpoints API authentifiés (général)
  → 100 requêtes / minute / user
  → Objectif : protection contre les abus d'API

Endpoints critiques (FDS Pay — initiation paiement)
  → 10 requêtes / minute / user
  → Objectif : éviter les doubles paiements accidentels ou malveillants
```

---

### 15.7 Pipeline CI/CD — Checklist sécurité automatique

Chaque Pull Request déclenche automatiquement, via GitHub Actions :

```yaml
# .github/workflows/security.yml (commun à tous les modules)
jobs:
  security:
    steps:
      - pip-audit          # Vérifie les CVEs dans les dépendances Python
      - npm audit          # Vérifie les CVEs dans les dépendances npm
      - bandit             # Analyse statique Python — détecte les antipatterns sécurité
      - semgrep            # Règles OWASP sur le code source
      - trivy              # Scan du Dockerfile si présent

  quality:
    steps:
      - pytest             # Tests unitaires + intégration (coverage ≥ 80%)
      - eslint             # Linting TypeScript
      - lighthouse-ci      # Score performance et accessibilité ≥ 80
```

> **Règle de merge :** Aucune Pull Request ne peut être mergée si `pip-audit` ou `npm audit` détecte une vulnérabilité de sévérité **HIGH** ou **CRITICAL**.

---

### 15.8 Matrice de sécurité par module

Chaque module implémente un sous-ensemble de ces mesures selon sa surface d'exposition :

| Mesure | FDS Akademi | FDS Portail | FDS Admin | FDS Pay |
|---|---|---|---|---|
| UUID v7 sur tous les IDs | ✅ | ✅ | ✅ | ✅ |
| JWT `require_role()` | ✅ | ⬜ Public | ✅ | ✅ |
| bcrypt + HTTPS | ✅ | ✅ | ✅ | ✅ |
| CORS whitelist | ✅ | ✅ | ✅ | ✅ |
| Rate limiting auth | ✅ | ✅ | ✅ | ✅ |
| Rate limiting API | ✅ | ✅ | ✅ | **⭐ Strict** |
| Validation Pydantic inputs | ✅ | ✅ | ✅ | ✅ |
| SQLAlchemy ORM (no raw SQL) | ✅ | ✅ | ✅ | ✅ |
| Dependabot + pip-audit CI | ✅ | ✅ | ✅ | ✅ |
| Upload sécurisé (MIME check) | ✅ | ⬜ | ✅ | ⬜ |
| Audit trail (actions sensibles) | v2 | ⬜ | ✅ | ✅ |
| Webhook HMAC signature | ⬜ | ⬜ | ⬜ | ✅ |
| CSP headers | ⬜ | ✅ Public | ⬜ | ⬜ |
| Idempotence transactions | ⬜ | ⬜ | ⬜ | ✅ |
| 2FA | v3 | ⬜ | v3 | v2 |

---

### 15.9 SOLID — Application pragmatique (tous modules)

Les principes SOLID guident l'architecture de chaque module. Application pragmatique — pas dogmatique.

| Principe | Application | Exemple concret |
|---|---|---|
| **S** — Single Responsibility | Chaque fichier Python a une seule responsabilité : `routes/`, `services/`, `models/`, `schemas/` sont séparés | `submission_service.py` gère la logique métier ; `submission_router.py` gère le routing HTTP |
| **O** — Open/Closed | Les schémas Pydantic héritent pour étendre sans modifier | `UserCreate` hérite de `UserBase` ; ajouter un champ = nouvelle classe, pas de modification |
| **I** — Interface Segregation | Schémas Pydantic ciblés par usage | `UserPublic` (profil public) ≠ `UserPrivate` (avec email) ≠ `UserAdmin` (avec tous les champs) |
| **D** — Dependency Inversion | Injection de dépendances FastAPI | `db: Session = Depends(get_db)` — le service ne crée pas sa propre connexion DB |
| **L** — Liskov Substitution | *Non appliqué de force* | Python duck typing suffit — imposer l'héritage strict serait de l'over-engineering |

---

*Référence : `FDS_AKADEMI.md` §7.4 et §8.1 — standards étendus à toute la plateforme*
*Voir aussi : `ARCHITECTURE.md` — modèle de menace détaillé et ADRs de sécurité*
