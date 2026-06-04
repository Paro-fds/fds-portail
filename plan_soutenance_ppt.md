# Plan de Soutenance PowerPoint — Groupe de 4 (Avec la Direction)

> Ce document est le **script exact** de votre présentation. Chaque information ci-dessous est extraite mot pour mot de votre `cahier_des_charges.md`. Le professeur aura le même document sous les yeux — vos réponses doivent correspondre parfaitement.

---

## Répartition des Rôles (4 orateurs)

| Orateur | Rôle | Slides | Durée | Ce qu'il maîtrise |
|---|---|---|---|---|
| **Orateur 1** | L'Enquêteur (Contexte & Terrain) | 1 → 3 | 3 min | Le problème, Louismy, les verbatims d'interview |
| **Orateur 2** | Le Stratège Produit (Solution & Périmètre) | 4 → 5 | 3 min | Le JTBD, le MoSCoW, la CJM To-Be |
| **Orateur 3** | L'Ingénieur (Données & Diagrammes) | 6 → 8 | 3 min | L'ERD, la 3NF, le System of Record, le diagramme de séquence |
| **VOUS** | Le Lead Tech & Démonstrateur | 9 → 11 | 6 min | Architecture, Sécurité, Démo live, Questions |

---

## Script Slide par Slide

### SLIDE 1 — Titre (Orateur 1)

**Titre :** FDS Portail : Dématérialisation de l'admission
**Sous-titre :** Projet de fin de module — Analyse & Conception Logicielle
**Contenu :** Noms des 4 membres du groupe.

---

### SLIDE 2 — Le Constat (Orateur 1)

**Titre :** Un processus d'admission devenu inadapté

**3 puces à afficher :**
- Forte dépendance au déplacement physique à Port-au-Prince
- Asymétrie d'information : site non mis à jour, numéros injoignables
- Inégalité d'accès : désavantage systématique pour les candidats de province

**Discours oral (Orateur 1) :**
> *"Nous avons mené une interview terrain auprès d'un lycéen de Pétion-Ville. Le verbatim est dans notre cahier des charges : 'Je me demandais comment une école d'ingénieurs de renom pouvait ne pas disposer d'un site moderne avec la possibilité de faire des inscriptions en ligne.' Ce candidat incarne notre Persona : Louismy, 17 ans, smartphone Android, connexion 3G."*

---

### SLIDE 3 — La Customer Journey Map As-Is (Orateur 1)

**Titre :** Le parcours actuel de Louismy (État *As-Is*)

**Tableau à afficher (tableau simplifié, extrait du §3.3) :**

| Étape | Difficulté | Opportunité |
|---|---|---|
| 1. Recherche Google | Infos dispersées | Portail officiel centralisé |
| 2. Tentative d'appel | Aucun canal fiable | FAQ & contacts clairs |
| **3. Déplacement physique** | 🚨 **Point de rupture** | **Candidature 100% en ligne** |
| 4. Sur place | Brochures photocopiées | Fiches de cursus digitalisées |
| 5. Attente du calendrier | Agacement | Dates clés via CMS |
| **6. Formulaire papier** | 🎯 **Moment de conversion** | **Upload de documents** Mobile-First |
| 7. Confirmation manuelle | Aucun suivi numérique | Référence `CAN-2026-X` + tracking |

**Discours oral (Orateur 1) :**
> *"Le principal problème identifié (§3.3 du cahier des charges) est une forte dépendance au déplacement physique, causée par un déficit d'information numérique. Le Point de rupture à l'étape 3 représente un risque réel d'abandon pour les candidats de province, accentué par le contexte sécuritaire."*

---

### SLIDE 4 — Le Job-To-Be-Done & L'Hypothèse (Orateur 2)

**Titre :** Le besoin fondamental de Louismy (§3.7)

**Citation exacte à afficher en grand sur le slide (mot pour mot du §3.7) :**

> *« Quand je dois m'inscrire à l'université depuis ma province sans information claire, je veux pouvoir m'informer, soumettre mon dossier et payer virtuellement les frais entièrement en ligne afin de sécuriser ma candidature à la FDS sans perdre de temps ni risquer ma sécurité dans un déplacement physique. »*

**Indicateur de succès (§3.5) à afficher :**
- **Seuil 1 :** ≥ 20 candidatures soumises dans les 14 premiers jours
- **Seuil 2 :** ≥ 70% des candidats complètent sans déplacement physique
- **Seuil 3 :** ≤ 30% d'abandon du formulaire en cours de remplissage

**Discours oral (Orateur 2) :**
> *"Notre succès n'est pas subjectif. Le §3.5 du cahier des charges définit trois seuils mesurables en base de données, notamment via le champ `candidats.deplacement_physique` — une colonne booléenne qui enregistre si le candidat a eu besoin de se déplacer ou non."*

---

### SLIDE 5 — Le Périmètre MVP : MoSCoW (Orateur 2)

**Titre :** Ce que nous livrons — La priorisation MoSCoW (§4)

**Colonne Must Have (à afficher, extrait exact du §4) :**
- ✅ Pages de présentation des cursus et dates clés
- ✅ Formulaire de candidature en ligne avec upload (PDF/JPG)
- ✅ Génération de la référence dossier `CAN-2026-X`
- ✅ Suivi du dossier en ligne par le candidat
- ✅ Interface sécurisée pour l'administration (valider/rejeter)
- ✅ Notifications automatiques par email (réception, validation, rejet)
- ✅ Remplacement d'un document rejeté sans déplacement
- ✅ **Simulation du paiement** MonCash/NatCash (prépare le module FDS Pay)

**Won't Have (à afficher, extrait exact du §4) :**
- ❌ Transactions monétaires réelles → délégué au Module FDS Pay
- ❌ Plateforme de cours → déléguée à FDS Akademi

**Discours oral (Orateur 2) :**
> *"La méthode MoSCoW nous a imposé une discipline : le choix de simuler le paiement (et non d'implémenter de vraies transactions) est un choix délibéré de gestion du risque. Nous avons préféré valider l'UX et la persistance technique de la simulation, et déléguer le vrai paiement au futur module FDS Pay. C'est l'essence d'un MVP : construire pour apprendre, pas pour tout faire."*

---

### SLIDE 6 — La Modélisation des Données (Orateur 3)

**Titre :** Notre Modèle de Données (§8) — ERD 3NF

**Visuel :** Insérer le diagramme de classes UML du §8.1 du cahier des charges.

**3 puces à afficher :**
- **Langage Ubiquitaire :** `DocumentRequis`, `DocumentSoumis` (vocabulaire du secrétariat, pas des termes génériques)
- **Normalisation 3NF :** Séparation entre *ce qui est exigé* (`DocumentRequis`) et *ce qui est fourni* (`DocumentSoumis`)
- **System of Record :** FDS SYS détient les identités. FDS Portail ne fait que *consommer* la table `Utilisateur`.

**Discours oral (Orateur 3) :**
> *"Si vous regardez notre schéma SQL au §8.3, la contrainte UNIQUE sur `(candidat_id, document_requis_id)` garantit qu'un candidat ne peut pas avoir deux fois le même document dans son dossier. Quand il remplace un document rejeté, c'est un UPSERT, pas un INSERT en doublon."*

---

### SLIDE 7 — Cinématique Asynchrone (Orateur 3)

**Titre :** La résilience du flux de candidature (§7.2)

**Visuel :** Insérer le diagramme de séquence UML du §7.2 du cahier des charges.

**Le point clé à expliquer :**
> *"L'envoi de l'email de confirmation via Resend est asynchrone et NON-BLOQUANT. Si l'API Resend tombe en panne, la référence `CAN-2026-X` s'affiche quand même sur l'écran du candidat car la base de données PostgreSQL a déjà été committée avant l'envoi de l'email."*

---

### SLIDE 8 — Sécurité (Orateur 3)

**Titre :** Sécurité by Design — 3 menaces bloquées

**3 puces :**
- 🔒 **A01 (Broken Access Control) :** ProtectedRoute React + JWT FastAPI → un candidat ne peut jamais accéder au tableau de bord admin
- 🔒 **A03 (Injection SQL) :** ORM SQLAlchemy — jamais de SQL brut → aucune injection possible
- 🔒 **A07 (Brute-Force) :** Rate Limiter → fenêtre de 60s / 5 essais maximum sur la route de login

---

### SLIDE 9 — Le Coup de Théâtre (VOUS)

**Visuel :** Slide très épuré, fond sombre, texte unique :

> *"Et si le cahier des charges était déjà en production ?"*

**Votre discours EXACT :**
> *"Monsieur le Professeur, membres de la direction. Le Projet 1 exigeait un cahier des charges rigoureux — nous l'avons livré. Mais l'ingénierie logicielle ne vaut rien si elle n'est pas confrontée à la réalité. Pour valider que notre architecture tenait la route, nous avons pris l'initiative d'implémenter notre Walking Skeleton. Ce que vous allez voir dans les 3 prochaines minutes, c'est ce que verra Louismy le jour de l'ouverture des inscriptions."*

---

### SLIDE 10 — Démonstration Live (VOUS)

**Action :** Quittez PowerPoint. Ouvrez le navigateur en Mode Mobile (F12 → iPhone SE).

**Scénario de démo (dans l'ordre, restez naturel) :**
1. Montrez la page d'accueil → *"Louismy arrive ici depuis Google. L'info est là, claire."*
2. Cliquez sur Génie Informatique → montrez la liste des documents requis.
3. Cliquez sur "Postuler" → remplissez rapidement le formulaire.
4. Montrez l'étape de simulation du paiement MonCash → *"Le paiement est simulé — la référence transactionnelle est persistée en base pour préparer FDS Pay."*
5. Uploadez un PDF → montrez la confirmation avec `CAN-2026-X`.
6. Basculez sur le tableau de bord Admin → montrez le dossier et cliquez sur "Valider".

**PLAN B OBLIGATOIRE :** Si Internet coupe, lancez la vidéo enregistrée au préalable et dites :
> *"Les aléas du direct — nous avons heureusement anticipé cela avec un backup vidéo de l'application en production."*

---

### SLIDE 11 — Conclusion (VOUS)

**Titre :** Ce que nous avons prouvé

**3 puces :**
- Un lycéen de province peut postuler à la FDS en moins de 20 minutes sans se déplacer
- L'hypothèse (§3.5) est maintenant vérifiable avec des données réelles
- La fondation technique est posée pour les modules FDS Pay et FDS Akademi

**Dernière phrase :**
> *"Nous sommes prêts pour vos questions."*

---

## Conseils Finaux

- **Règle d'or pour les slides :** Aucun slide ne dépasse 6 lignes de texte. Le professeur vous regarde VOUS, pas vos slides.
- **Si le jury cite un numéro de section :** C'est votre force. Dites : *"Exactement, c'est le §X de notre cahier des charges, et voici ce que nous avons fait."*
- **Si vous ne savez pas répondre :** Ne bluffez pas. Dites : *"C'est une excellente question que nous avons identifiée comme une évolution post-MVP."* et montrez le tableau Won't Have.
