# Modélisation des Données — FDS Portail

Ce document suit rigoureusement la méthodologie dictée par le cours **S08 Cours 1 : Fondements Modélisation Data** pour répondre aux User Stories US-JP1, US-JP2 et US-JP3.

---

## 1. Langage Ubiquitaire (Vocabulaire)
Avant de créer des tables, nous devons définir un vocabulaire commun (DDD) partagé par toute l'équipe FDS :

*   **Document Requis** : Une pièce justificative type exigée par l'administration (ex: Acte de naissance).
*   **Document Soumis** : Le fichier réel téléversé par un candidat spécifique (le PDF de l'acte de naissance de Jean Pierre).
*   **Événement Calendrier** : Une échéance temporelle critique liée au processus d'admission.
*   **Candidat** : Un bachelier qui s'inscrit, soumet ses documents et qui peut choisir de recevoir des alertes automatiques par e-mail.

---

## 2. Identifier les entités (Fact-Based Modeling)
En analysant les noms et verbes des User Stories (règle MVP) :

*   **US-JP1** : "Un *Bachelier* consulte la liste des *Documents Requis* (avec leur *format* et *date de mise à jour*)."
    *   *Entités candidates* : `DocumentRequis`
*   **US-JP2** : "Un *Bachelier* consulte le *Calendrier* des *Événements* (ouverture, clôture)."
    *   *Entités candidates* : `EvenementCalendrier`
*   **US-JP3** : "Un *Bachelier* reçoit des *Notifications* par e-mail pour les dates importantes."
    *   *Entités candidates* : `Candidat` (avec une préférence de notification)

> [!NOTE]
> **Pourquoi le candidat n'y était pas au départ ?** Le cours stipule (Slide 14 - Règle MVP) de ne modéliser *que* ce qui est écrit dans la User Story. Comme US-JP1 parlait de "consulter la liste" (le catalogue) et non de "soumettre", l'entité n'apparaissait pas. Mais vous avez tout à fait raison : dès lors que le candidat téléverse réellement son dossier sur le portail, l'entité `Candidat` devient indispensable, ainsi qu'une table de liaison pour relier la personne au document.

---

## 3. Construire le ERD (Modèle logique brut)

*   **`DocumentRequis`**
    *   `id` (PK, UUID)
    *   `nom` (ex: "Acte de Naissance")
    *   `description`
    *   `format_accepte` (ex: "PDF, JPG")
    *   `est_obligatoire` (Boolean)
    *   `mis_a_jour_le` (Timestamp) - *Pour satisfaire le Scénario 2 de l'US-JP1*
*   **`EvenementCalendrier`**
    *   `id` (PK, UUID)
    *   `titre`
    *   `type_evenement` (Enum: ouverture, cloture, concours, resultat)
    *   `date_evenement`
*   **`Candidat`**
    *   `id` (PK, UUID)
    *   `prenom`, `nom`
    *   `email` (Unique) - *Sert pour les notifications (US-JP3)*
    *   `notifications_actives` (Boolean)
*   **`DocumentSoumis` (Table de liaison N-N / Entité faible)**
    *   `id` (PK, UUID)
    *   `candidat_id` (FK -> Candidat)
    *   `document_requis_id` (FK -> DocumentRequis)
    *   `fichier_url` (Le lien vers le PDF)
    *   `statut_validation` (Enum: en_attente, valide, rejete)
    *   `soumis_le` (Timestamp)

### Relations et Cardinalités (Mapping Logique)

Conformément à la phase 3 du cours, voici comment ces entités interagissent :

1.  **Relation `Candidat` et `DocumentRequis` : (N — N)**
    *   Un Candidat doit fournir *plusieurs* Documents Requis.
    *   Un Document Requis (ex: "Acte de Naissance") est fourni par *plusieurs* Candidats.
    *   **Implémentation SQL** : Cette relation complexe N-N est "cassée" par la table intermédiaire `DocumentSoumis`.
2.  **Relation `Candidat` et `DocumentSoumis` : (1 — N)**
    *   **1** Candidat possède **N** Documents Soumis.
    *   *(Traduction SQL : La clé primaire du Candidat devient une Clé Étrangère `candidat_id` dans DocumentSoumis)*.
3.  **Relation `DocumentRequis` et `DocumentSoumis` : (1 — N)**
    *   **1** Document Requis (le modèle) correspond à **N** Documents Soumis (les vrais fichiers des candidats).
    *   *(Traduction SQL : La clé primaire du DocumentRequis devient une Clé Étrangère `document_requis_id` dans DocumentSoumis)*.
4.  **Entité `EvenementCalendrier` : (Isolée pour le MVP)**
    *   Les événements sont globaux à la faculté. Il n'y a pas besoin de les lier à un candidat spécifique pour répondre aux User Stories actuelles.

---

## 4. Normalisation (Vérification 3NF)
Le modèle proposé est déjà en 3ème Forme Normale (3NF) :
*   **1NF** : Tous les attributs sont atomiques. Pas de listes (le `format_accepte` est une simple chaîne de texte).
*   **2NF** : Les clés primaires sont des UUID simples (pas de clés composites), éliminant le risque de dépendances partielles.
*   **3NF** : Aucune donnée ne dépend d'un autre attribut non-clé. Les données sont correctement cloisonnées.

---

## 5. Choisir SQL ou NoSQL
Conformément à la règle de décision du cours :
*   **Structure** : Les entités sont clairement définies et le schéma est stable.
*   **Cohérence** : Nous avons besoin d'une forte cohérence (ACID) si le système évolue pour gérer de vraies candidatures transactionnelles plus tard.
*   **Décision** : **PostgreSQL** est le choix technologique justifié.

---

## 6. Du ERD normalisé au SQL (CREATE TABLE)
Voici la traduction physique du modèle (System of Record : FDS Portail) :

```sql
-- Table des documents requis (US-JP1)
CREATE TABLE documents_requis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nom VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    format_accepte VARCHAR(100) NOT NULL,
    est_obligatoire BOOLEAN DEFAULT TRUE,
    mis_a_jour_le TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Table des événements du calendrier (US-JP2)
CREATE TABLE evenements_calendrier (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titre VARCHAR(255) NOT NULL,
    type_evenement VARCHAR(50) CHECK (type_evenement IN ('ouverture', 'cloture', 'concours', 'resultat')),
    date_evenement TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Table des candidats (US-JP3 + Soumission)
CREATE TABLE candidats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    prenom VARCHAR(100) NOT NULL,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    notifications_actives BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Table des documents réellement soumis par le candidat (Liaison)
CREATE TABLE documents_soumis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    candidat_id UUID REFERENCES candidats(id) ON DELETE CASCADE,
    document_requis_id UUID REFERENCES documents_requis(id) ON DELETE RESTRICT,
    fichier_url TEXT NOT NULL,
    statut_validation VARCHAR(20) DEFAULT 'en_attente' CHECK (statut_validation IN ('en_attente', 'valide', 'rejete')),
    soumis_le TIMESTAMP DEFAULT NOW()
);
```

> [!TIP]
> **Respect du cours (ON DELETE CASCADE/RESTRICT)** : Si un candidat supprime son compte, on supprime ses documents (`CASCADE`). Mais on interdit la suppression d'un type de document requis (`RESTRICT`) s'il y a déjà des candidats qui l'ont soumis !

---

## 7. Exemple Concret : Scénario avec 4 documents
Pour bien illustrer l'interaction entre `DocumentRequis` et `DocumentSoumis`, voici un scénario pratique :

**A. La Règle (Table `DocumentRequis` - Administrée par la FDS)**
| id | nom | format_accepte | est_obligatoire |
| :--- | :--- | :--- | :--- |
| **DOC-1** | Acte de Naissance | PDF | Oui |
| **DOC-2** | Diplôme du Baccalauréat | PDF | Oui |
| **DOC-3** | Relevés de notes (Philo) | PDF | Oui |
| **DOC-4** | Photo d'identité | JPG | Oui |

**B. L'Action (Table `DocumentSoumis` - Remplie par le candidat)**
Jean Pierre (Candidat ID `CAND-99`) se connecte et téléverse ses 4 fichiers. Le système crée **4 lignes distinctes** :

| id | candidat_id | document_requis_id | fichier_url | statut_validation |
| :--- | :--- | :--- | :--- | :--- |
| 1001 | CAND-99 | DOC-1 | `.../jean-acte.pdf` | en_attente |
| 1002 | CAND-99 | DOC-2 | `.../jean-diplome.pdf` | en_attente |
| 1003 | CAND-99 | DOC-3 | `.../jean-notes.pdf` | en_attente |
| 1004 | CAND-99 | DOC-4 | `.../jean-photo.jpg` | en_attente |

**C. L'Avantage de cette séparation**
Le secrétariat peut traiter le dossier document par document. S'ils voient que la photo est floue, ils passent la ligne `1004` au statut `rejete` et demandent à Jean Pierre de renvoyer **uniquement** sa photo, sans toucher aux 3 autres documents (qui peuvent passer en statut `valide`). De plus, si l'année prochaine la FDS ajoute un 5ème document exigé, il suffit de l'ajouter dans la table `DocumentRequis` sans modifier la structure de la base de données.

---

## Conclusion
Le modèle de données est désormais complet et prêt à être implémenté pour soutenir le portail FDS. Il permet de gérer les candidatures, les alertes, et de valider les documents téléversés par l'administration.
