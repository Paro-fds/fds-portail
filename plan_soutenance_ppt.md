# Plan de Soutenance (Spécial Direction & Jury) - Groupe de 4

Puisque des membres de la direction seront présents, votre présentation doit avoir un double impact :
1. **Convaincre le jury (le Professeur) sur l'ingénierie stricte (UML, Code, Base de données).**
2. **Convaincre la direction sur la valeur métier (Gain de temps, Sécurité, Image de marque de la FDS).**

Étant donné que vous êtes le membre qui maîtrise le plus le projet (le "Lead Tech"), vous devez prendre la partie la plus critique et la plus risquée : l'Architecture, la Sécurité, et la Démonstration Finale. C'est là que les questions pièges vont tomber.

---

## 1. Répartition des Rôles (Groupe de 4)

- **Orateur 1 (L'Enquêteur) - 3 min :** Parle du constat, du problème actuel de la FDS, et présente le "Persona" (Louismy). Son but est de faire ressentir la douleur du processus actuel à la direction.
- **Orateur 2 (Le Stratège Produit) - 3 min :** Présente la solution (la CJM), le "Job-to-be-Done" et le périmètre du MVP (MoSCoW). Il explique pourquoi on ne fait pas le paiement réel tout de suite (gestion des risques).
- **Orateur 3 (L'Architecte Data) - 3 min :** Montre les diagrammes (Cas d'utilisation, ERD). Explique la normalisation 3NF et le "System of Record". Il prouve que la structure de la base de données est solide.
- **Orateur 4 (VOUS - Le Lead Tech / Démonstrateur) - 5 min :** Vous clôturez. Vous montrez l'Architecture (FastAPI/React), la Sécurité (pour rassurer la direction sur les données des étudiants). Puis vous lancez le fameux "Coup de théâtre" et faites la démo live. Vous gérez ensuite les questions/réponses.

---

## 2. Contenu exact des Slides (À copier-coller dans PowerPoint)

*Astuce pour NotebookLM : Vous pouvez copier tout ce texte et le coller dans NotebookLM pour générer des fiches de révision pour vos camarades.*

### SLIDE 1 : Titre (Orateur 1)
- **Titre principal :** FDS Portail : Dématérialisation de l'admission
- **Sous-titre :** Projet de fin de module - Ingénierie Logicielle
- **Texte :** Noms des 4 membres du groupe.

### SLIDE 2 : Le Constat (Orateur 1)
- **Titre :** Un processus d'admission devenu inadapté
- **Puces (Texte sur le slide) :**
  - Forte dépendance au déplacement physique.
  - Asymétrie d'information (site non mis à jour).
  - Inégalités pour les candidats de province (risques sécuritaires et coûts).
- **Notes pour l'oral :** *(Ne pas lire le slide. Expliquer que la FDS forme l'élite mais recrute de manière analogique. Présenter brièvement Louismy, 17 ans, qui habite loin).*

### SLIDE 3 : La Solution : Le MVP (Orateur 2)
- **Titre :** Notre Solution : Un "Walking Skeleton" Ciblé
- **Puces :**
  - **Job-to-be-Done :** Permettre de s'informer et de postuler 100% en ligne depuis un smartphone.
  - **Ce qu'on FAIT (Must Have) :** Formulaire, Upload de PDF, Tracking, Dashboard Admin.
  - **Ce qu'on NE FAIT PAS (Won't Have) :** Transactions bancaires réelles (simulation uniquement pour éviter les risques financiers en V1).

### SLIDE 4 : Parcours Utilisateur (CJM) (Orateur 2)
- **Titre :** Transformation de l'Expérience Candidat
- **Visuel :** *Capture d'écran ou tableau simplifié de la Customer Journey Map de votre cahier des charges.*
- **Notes pour l'oral :** *(Expliquer que le point de rupture actuel est le déplacement physique, et que le portail transforme cette étape en une opportunité de conversion numérique).*

### SLIDE 5 : Modélisation et Ingénierie des Données (Orateur 3)
- **Titre :** Une Base de Données Robuste et Normalisée
- **Visuel :** *Insérer le diagramme de classes UML (ERD) du cahier des charges.*
- **Puces :**
  - Langage Ubiquitaire (Vocabulaire métier : `DocumentRequis`, `DocumentSoumis`).
  - Normalisation 3NF pour éviter les redondances.
  - **Le System of Record (SoR) :** La gestion des identités reste déléguée à FDS SYS.

### SLIDE 6 : Cinématique Asynchrone (Orateur 3)
- **Titre :** Résilience du flux de candidature
- **Visuel :** *Insérer le diagramme de séquence UML du cahier des charges.*
- **Notes pour l'oral :** *(Expliquer au jury que l'envoi d'emails via Resend est asynchrone. Si le système d'email tombe en panne, la base de données enregistre quand même la candidature).*

### SLIDE 7 : Architecture Technique (VOUS / Orateur 4)
- **Titre :** Architecture : Monolithe Modulaire
- **Visuel :** *Logos de FastAPI (Backend), React (Frontend), PostgreSQL (BDD).*
- **Puces :**
  - Découplage strict (API REST Contract-First).
  - Frontend "Mobile-First" adapté aux connexions 3G (Code Splitting).
  - Évolutivité future vers des microservices garantie.

### SLIDE 8 : Sécurité by Design (VOUS / Orateur 4)
- **Titre :** Protection des données de la FDS
- **Puces :**
  - Protection contre l'injection SQL (ORM SQLAlchemy).
  - Contrôle d'accès strict (JWT) contre les failles d'accès (Broken Access Control).
  - Upload sécurisé et validation du type MIME (Cloudinary).
- **Notes pour l'oral :** *(Rassurer la direction : le système est hermétique, un étudiant ne peut pas uploader un virus à la place d'un PDF, ni pirater les accès admin).*

### SLIDE 9 : Le Coup de Théâtre (VOUS / Orateur 4)
- **Titre :** Et si on allait plus loin ? (L'application en production)
- **Visuel :** *Slide très épuré, presque vide.*
- **Votre discours exact :** *"Membres du jury, membres de la direction. Le Projet 1 exigeait un cahier des charges rigoureux. Mais pour prouver que notre architecture technique tenait la route face à la réalité, nous avons pris l'initiative d'implémenter ce Walking Skeleton. Voici à quoi ressemble l'avenir de l'admission à la FDS."*

### SLIDE 10 : Démonstration Live (VOUS / Orateur 4)
- **Visuel :** *Quitter PowerPoint et ouvrir le navigateur web.*
- **Action :** Vous faites la démo sur l'application React.
  1. Montrer l'UI.
  2. Remplir un faux dossier avec un PDF.
  3. Montrer la génération de la référence CAN-2026.
  4. Basculer côté Admin et valider le dossier.

### SLIDE 11 : Conclusion (VOUS / Orateur 4)
- **Titre :** Conclusion
- **Puces :**
  - Hypothèse validée : La candidature peut être 100% dématérialisée.
  - Fondation technique posée pour le module "FDS Pay" futur.
- **Texte :** Merci de votre attention. Avez-vous des questions ?
