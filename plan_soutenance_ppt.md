# Plan de Soutenance PowerPoint — Version Finale Complète
## Groupe de 4 — Avec Jury et Direction FDS

> **Note :** Ce document est votre script de mise en scène complet. Chaque information est extraite mot pour mot du `cahier_des_charges.md`. Les diagrammes sont directement issus des §6.1 (Cas d'Utilisation) et §7.1 (Activités).

---

## Répartition des Rôles (Groupe de 4)

| # | Rôle | Slides | Durée | Ce que cet orateur maîtrise |
|---|---|---|---|---|
| **Orateur 1** | L'Enquêteur — Le Contexte | 1 → 3 | ~3 min | Le problème, le persona Louismy, les interviews de terrain |
| **Orateur 2** | Le Stratège Produit — La Solution | 4 → 6 | ~4 min | Le JTBD, la CJM To-Be, le MoSCoW |
| **Orateur 3** | L'Ingénieur — Les Diagrammes | 7 → 9 | ~4 min | Le Cas d'Utilisation, le Diagramme d'Activités, la base de données |
| **VOUS** | Le Lead Tech & Démonstrateur | 10 → 13 | ~6 min | Architecture, Sécurité, Démo live, Réponses aux questions |

---

## Script Complet Slide par Slide

---

### 🟦 SLIDE 1 — Titre (Orateur 1)

**Titre affiché :** FDS Portail — Dématérialisation de l'Admission
**Sous-titre affiché :** Analyse & Conception Logicielle — Groupe [Numéro]
**Contenu :** Photo de l'université FDS ou logo. Noms des 4 membres.

---

### 🟦 SLIDE 2 — Le Problème (Orateur 1)

**Titre affiché :** Un processus d'admission inadapté en 2026

**3 points visuels à afficher (icônes + texte court) :**
- 🗺️ **Déplacement physique obligatoire** → Risque sécuritaire + coût de transport
- 📋 **Asymétrie d'information** → Site non mis à jour, numéros injoignables, brochures photocopiées
- 🚫 **Inégalité géographique** → Les candidats de province sont désavantagés

**Discours oral exact (Orateur 1) :**
> *"Nous avons mené une interview terrain. Ce verbatim est dans notre cahier des charges, il résume le problème mieux que n'importe quelle statistique : 'Je me demandais comment une école d'ingénieurs de renom pouvait ne pas disposer d'un site moderne avec la possibilité de faire des inscriptions en ligne.' Cette phrase, c'est Louismy — 17 ans, Pétion-Ville, smartphone Android — qui la prononce après son premier déplacement à Delmas 33. Notre travail commence ici."*

---

### 🟦 SLIDE 3 — Le Persona & la CJM As-Is (Orateur 1)

**Titre affiché :** Louismy — Notre Boussole de Conception

**Partie gauche du slide — Profil du Persona :**
- **Nom :** Louismy, 17 ans
- **Lieu :** Pétion-Ville
- **Outil :** Smartphone Android, connexion 3G intermittente
- **Objectif :** S'inscrire en Génie Informatique à la FDS

**Partie droite du slide — CJM simplifiée (tableau) :**

| Étape | Ce que vit Louismy | 🔥 Problème | 💡 Notre réponse |
|---|---|---|---|
| 1. Cherche sur Google | Aucun résultat officiel | Infos dispersées | Portail officiel + SEO |
| 2. Appelle la FDS | Personne ne répond | Aucun canal fiable | FAQ + contacts clairs |
| **3. Se déplace à Delmas** | **🚨 STRESS, risque** | **Point de rupture** | **Candidature 100% en ligne** |
| 4. Au secrétariat | Brochure photocopiée | Infos peu fiables | Fiches de cursus numériques |
| 5. Attend le calendrier | Frustration | Dates non publiées | Dates clés gérées via CMS |
| **6. Formulaire papier** | **Résignation** | **🎯 Moment de conversion** | **Upload de documents Mobile-First** |
| 7. Reçoit un numéro | Soulagement | Aucun suivi numérique | Référence `CAN-2026-X` + tracking |

**Discours oral exact (Orateur 1) :**
> *"Le principal problème identifié dans le §3.3 de notre cahier des charges est une forte dépendance au déplacement physique. L'étape 3 est ce qu'on appelle un 'Point de rupture' — c'est là que les candidats de province abandonnent. L'étape 6 est notre 'Moment de vérité' : si notre formulaire en ligne tient la route, nous convertissons ce candidat sans qu'il ait à risquer sa sécurité."*

---

### 🟩 SLIDE 4 — Le Job-To-Be-Done (Orateur 2)

**Titre affiché :** Ce que Louismy veut vraiment accomplir

**Citation exacte à afficher en grand — extrait du §3.7 du cahier des charges :**

> *« Quand je dois m'inscrire à l'université depuis ma province sans information claire, je veux pouvoir m'informer, soumettre mon dossier et payer virtuellement les frais entièrement en ligne afin de sécuriser ma candidature à la FDS sans perdre de temps ni risquer ma sécurité dans un déplacement physique. »*

**Indicateurs de succès (§3.5) à afficher sous la citation :**

| Ce qu'on mesure | Seuil de validation |
|---|---|
| Candidatures soumises | ≥ 20 dossiers dans les 14 premiers jours |
| Complétion sans déplacement | ≥ 70 % répondent "Non" à la question déplacement |
| Taux d'abandon du formulaire | ≤ 30 % d'abandon en cours de remplissage |

**Discours oral exact (Orateur 2) :**
> *"Le Job-To-Be-Done, c'est la motivation profonde qui pousse Louismy à utiliser notre portail. On ne mesure pas le succès de ce projet en disant 'le site fonctionne' — on le mesure en base de données, via le champ `candidats.deplacement_physique`, qui enregistre si le candidat a eu besoin de se déplacer ou non."*

---

### 🟩 SLIDE 5 — La Parcours Futur : CJM To-Be (Orateur 2)

**Titre affiché :** L'expérience candidat transformée (État *To-Be*)

**Visuel : Frise chronologique à 5 étapes (extrait §3.4) :**

```
  📱            🏠            📤            ✉️            📊
  Portail   →  Information  →  Candidature  →  Confirmation  →  Suivi
FDS.com          Cursus,          Formulaire,     Référence        Barre de
                 prérequis,       Upload,         CAN-2026-X       progression
                 dates            Paiement sim.   + Email          + Correction
```

**Discours oral exact (Orateur 2) :**
> *"La transformation est radicale. Le parcours As-Is impliquait 2 à 3 déplacements physiques sur plusieurs semaines. Notre parcours To-Be tient en 5 étapes depuis un smartphone, avec une confirmation immédiate. L'administration reçoit les dossiers directement dans son tableau de bord, sans papier, sans perte."*

---

### 🟩 SLIDE 6 — Le Périmètre MVP : MoSCoW (Orateur 2)

**Titre affiché :** Ce que nous livrons : La méthode MoSCoW (§4)

**Colonne gauche — Must Have (ce qui est dans l'application) :**
- ✅ Pages de présentation des 5 cursus + dates clés
- ✅ Formulaire de candidature + upload de documents (PDF/JPG max 5 Mo)
- ✅ Référence unique `CAN-2026-X` générée automatiquement
- ✅ Simulation du paiement MonCash / NatCash
- ✅ Emails automatiques (réception, validation, rejet)
- ✅ Page de suivi avec barre de progression
- ✅ Remplacement d'un document rejeté depuis le téléphone
- ✅ Tableau de bord admin sécurisé (valider / rejeter)

**Colonne droite — Won't Have (délibérément exclu) :**
- ❌ Transactions bancaires réelles → délégué au module **FDS Pay** (risque financier, délai légal)
- ❌ Cours en ligne → délégué à **FDS Akademi**

**Discours oral exact (Orateur 2) :**
> *"La méthode MoSCoW est une discipline. Si vous voyez que le paiement réel n'est pas dans notre MVP, c'est un choix stratégique : intégrer MonCash réel implique des contrats, des délais légaux, des responsabilités financières. Cela aurait retardé notre livraison de 3 mois. Nous simulons le paiement pour valider l'expérience candidat, et nous préparons techniquement l'intégration future via FDS Pay."*

---

### 🟨 SLIDE 7 — Diagramme des Cas d'Utilisation (Orateur 3)

**Titre affiché :** Qui fait quoi sur le portail ? (§6.1)

**Explication à afficher — version accessible pour la Direction :**

> Un Cas d'Utilisation répond à la question : **"Qui peut faire quoi dans notre système ?"**
> Il y a 2 acteurs dans notre portail : le **Candidat** (à gauche) et l'**Admin FDS** (à droite).

**Tableau explicatif simplifié (à côté ou sous le diagramme) :**

| Acteur | Ce qu'il peut faire | Ce qui le protège |
|---|---|---|
| **Candidat** (sans compte) | Consulter les cursus · Soumettre · Payer (sim.) · Uploader · Suivre · Remplacer | Référence de dossier confidentielle |
| **Admin FDS** | Voir les dossiers · Valider ou rejeter · Auditer | Connexion obligatoire (JWT) avant tout accès |

**Discours oral exact (Orateur 3) :**
> *"Ce diagramme (§6.1 du cahier des charges) montre une décision architecturale importante : le candidat n'a PAS besoin de créer un compte. Il utilise uniquement sa référence `CAN-2026-X` pour suivre son dossier. Cela supprime la friction de l'inscription et le risque de mots de passe oubliés. L'administrateur, lui, DOIT obligatoirement passer par une authentification sécurisée avant d'accéder à la moindre donnée candidat."*

---

### 🟨 SLIDE 8 — Diagramme d'Activités (Orateur 3)

**Titre affiché :** Le parcours complet de candidature (§7.1)

**Explication à afficher — version accessible pour la Direction :**

> Le Diagramme d'Activités montre le **flux exact des actions** du début à la fin, avec toutes les décisions possibles (comme un organigramme détaillé).

**Résumé textuel du diagramme (à afficher en 2 colonnes) :**

**Côté Candidat :**
1. Consulte les cursus
2. Remplit le formulaire
3. **Simule le paiement** (MonCash / NatCash)
4. Uploade ses documents PDF
5. ✅ Reçoit la référence `CAN-2026-X` + email
6. Suit sa barre de progression en ligne

**Côté Admin FDS :**
1. Reçoit le dossier dans son tableau de bord
2. Examine les documents
3. Valide ✅ ou Rejette ❌
4. Le candidat reçoit un email immédiat
5. Si rejeté → le candidat remplace depuis son téléphone

**Discours oral exact (Orateur 3) :**
> *"Ce diagramme (§7.1) prouve que nous avons pensé à tous les cas, y compris les cas d'erreur. Si un fichier n'est pas un PDF ou dépasse 5 Mo, le système le rejette avant même de le stocker. Si un admin rejette un document, le candidat peut le remplacer directement depuis sa page de suivi — sans se déplacer. La barre de progression reflète en temps réel l'état exact du dossier."*

---

### 🟨 SLIDE 9 — Modèle de Données (Orateur 3)

**Titre affiché :** La Structure de la Base de Données (§8)

**Explication à afficher — version accessible pour la Direction :**

> La base de données, c'est la **mémoire du système**. Elle stocke de manière organisée et sécurisée toutes les candidatures et leurs documents.

**4 entités à afficher (noms + rôle en une ligne) :**

| Table | Rôle | Lien |
|---|---|---|
| `Utilisateur` | Les administrateurs FDS (empruntés de FDS SYS) | Valide les documents |
| `Candidat` | Un lycéen qui postule (sans compte) | Possède son dossier |
| `DocumentRequis` | La liste officielle des pièces exigées par la FDS | Définit ce qu'il faut fournir |
| `DocumentSoumis` | Le fichier uploadé par un candidat | Relie Candidat ↔ DocumentRequis |

**Point clé à afficher en évidence :**
> **Normalisation 3NF :** Nous séparons ce qui est *exigé* (DocumentRequis) de ce qui est *fourni* (DocumentSoumis). Pas de redondance, pas d'anomalie de mise à jour.

**Discours oral exact (Orateur 3) :**
> *"Le choix des noms de tables n'est pas anodin. Nous avons appliqué le principe du Langage Ubiquitaire : nos tables utilisent exactement le vocabulaire du secrétariat de la FDS, pas des termes génériques de développeurs. Cela garantit que notre code reflète fidèlement la réalité métier. Et si vous regardez notre schéma SQL au §8.3, la contrainte UNIQUE sur (candidat_id, document_requis_id) garantit qu'un candidat ne peut pas soumettre deux fois le même document par erreur."*

---

### 🔴 SLIDE 10 — Architecture Technique (VOUS)

**Titre affiché :** Comment ça marche sous le capot ? (§9 & §10)

**Explication accessible pour la Direction :**
> Nous avons choisi **3 briques technologiques** qui correspondent exactement aux contraintes de Louismy (mobile, 3G, sécurité).

**Visuel : 3 blocs + 1 flèche entre chaque :**

```
  📱 FRONTEND          🖥️ BACKEND           🗄️ BASE DE DONNÉES
  React + Vite    →   FastAPI (Python)  →   PostgreSQL
  
  Mobile-First        Contract-First        3NF + Contraintes
  Code Splitting      API REST              ACID
  (3G optimisé)       Sécurité JWT          System of Record
```

**Discours oral exact (VOUS) :**
> *"Trois décisions techniques justifiées dans nos ADR (Architecture Decision Records). Premièrement, React avec du Code Splitting : Louismy n'a pas à télécharger toute l'application d'un coup. Sur 3G, il ne charge que la page d'accueil. Le formulaire de candidature se charge uniquement quand il clique sur 'Postuler'. Deuxièmement, FastAPI : un Monolithe Modulaire, adapté à notre équipe de 4 développeurs. Et troisièmement, PostgreSQL avec nos contraintes d'intégrité SQL qui garantissent qu'aucune donnée ne sera corrompue."*

---

### 🔴 SLIDE 11 — Sécurité by Design (VOUS)

**Titre affiché :** Les données des candidats sont protégées (§11)

**Explication pour la Direction — en termes simples :**
> Nous avons anticipé les 3 attaques les plus courantes sur un portail d'inscription.

**3 menaces concrètes + protection :**

| Risque | Scénario réel | Notre protection |
|---|---|---|
| 🔓 **Accès non autorisé** | Un étudiant tente d'ouvrir la page `/admin` | JWT requis · Redirection automatique vers Login |
| 💉 **Injection malveillante** | Un attaquant tente d'effacer la base de données via le formulaire | ORM SQLAlchemy · Jamais de SQL brut |
| 🤖 **Attaque par force brute** | Un robot essaie 1000 mots de passe sur le compte admin | Rate Limiter · 5 essais max / 60 secondes |
| 🦠 **Upload de virus** | Un fichier `.exe` renommé en `.pdf` | Vérification du type MIME réel (magic bytes) |

**Discours oral exact (VOUS) :**
> *"Pour rassurer la direction sur la protection des données de vos étudiants : un candidat ne peut JAMAIS voir les dossiers d'un autre candidat. Les URLs de documents sont privées et accessibles uniquement via une route admin authentifiée. Et un fichier malveillant déguisé en PDF est rejeté avant même d'atteindre Cloudinary grâce à la vérification des 'magic bytes' (le vrai type du fichier, pas juste son extension)."*

---

### 🔴 SLIDE 12 — Le Coup de Théâtre (VOUS)

**Visuel :** Fond sombre. Texte centré, sobre :

> *"Et si le cahier des charges était déjà en production ?"*

**Votre discours EXACT — Mémorisez cette phrase :**
> *"Monsieur le Professeur, membres de la direction de la FDS. Le Projet 1 demandait un cahier des charges rigoureux — nous l'avons livré. Mais l'ingénierie logicielle ne vaut rien si elle n'est jamais confrontée à la réalité. Pour valider que notre architecture tenait la route, nous avons pris l'initiative d'implémenter notre Walking Skeleton. Ce que vous allez voir dans les 3 prochaines minutes, c'est ce que verra Louismy le jour de l'ouverture des inscriptions à la FDS."*

---

### 🔴 SLIDE 13 — Démonstration Live + Conclusion (VOUS)

**Action :** Quittez PowerPoint. Ouvrez Chrome en Mode Mobile (F12 → iPhone SE, 375px).

**Script de démo (Restez naturel, narratif) :**

1. **Page d'accueil :**
   > *"Louismy tape 'FDS Haïti' sur Google. Le portail apparaît en premier résultat. Il ouvre la page d'accueil."*

2. **Fiche de cursus :**
   > *"Il clique sur 'Génie Informatique'. Il voit les prérequis, les dates d'admission, la liste exacte des documents. L'information qu'il cherchait en 2 déplacements, elle est là, en 10 secondes."*

3. **Formulaire (Étape 1 : Infos personnelles) :**
   > *"Il clique sur 'Postuler'. Il remplit son nom, prénom, email."*

4. **Formulaire (Étape 2 : Paiement simulé) :**
   > *"Il choisit MonCash. Une référence transactionnelle est générée. Elle sera persistée en base pour le futur module FDS Pay."*

5. **Formulaire (Étape 3 : Upload) :**
   > *"Il uploade son diplôme en PDF. Il répond 'Non' à la question 'Avez-vous dû vous déplacer ?' — cette donnée va mesurer notre hypothèse."*

6. **Confirmation :**
   > *"La référence CAN-2026-0001 s'affiche immédiatement. Un email de confirmation est envoyé en arrière-plan."*

7. **Tableau de bord Admin :**
   > *"Côté administration — je me connecte avec les identifiants admin. Je vois le dossier de Louismy. Je valide son document. Il recevra un email de notification automatiquement."*

**Conclusion (dernières paroles) :**
> *"Ce que vous venez de voir, c'est notre hypothèse validée en direct. Un lycéen de province peut compléter son dossier d'admission à la FDS en moins de 20 minutes, depuis son téléphone, sans aucun déplacement physique. Nous sommes prêts pour vos questions."*

---

**⚠️ PLAN B OBLIGATOIRE (si Internet coupe) :**
L'Orateur 3 (ou VOUS) doit avoir une vidéo de 2 minutes de la démo enregistrée sur un PC offline.
Phrase à dire si besoin : *"Les aléas du direct — nous avons heureusement anticipé cela avec un backup vidéo de notre application en production."*

---

## Règles de Présentation Finales

1. **6 mots max par bullet point** sur les slides. Le professeur vous écoute, il ne lit pas vos slides.
2. **Citez les sections** du cahier des charges dès que possible (§3.3, §6.1, §7.1, §8) — cela prouve la maîtrise.
3. **Si on vous pose une question difficile :** *"C'est une excellente question que nous avons identifiée dans nos évolutions post-MVP. Notre architecture modulaire permet de l'intégrer sans refactoring majeur."*
4. **Répartition du temps total : 17-18 minutes max** (15 min de présentation + 2-3 min de démo).
