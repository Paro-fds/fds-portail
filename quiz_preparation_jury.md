# Quiz de Préparation : Soutenance Technique (FDS Portail)

Ce fichier contient les réponses aux questions "pièges" posées dans le chat, classées par domaine technique (selon les exigences du cours S10). Ne lisez ces réponses **qu'après** avoir essayé d'y répondre vous-même !

---

## 1. Modélisation de Données (System of Record & ERD)

**Question du Jury :** 
*"Dans votre cahier des charges, vous indiquez que le FDS SYS est le 'System of Record' (SoR) pour les Utilisateurs. Concrètement, qu'est-ce que cela implique techniquement si un administrateur veut changer son mot de passe ou son rôle ? Comment FDS Portail gère-t-il cette modification ?"*

**Réponse attendue :**
> "Le principe du System of Record signifie qu'il n'y a qu'une seule source de vérité. Si un administrateur veut changer son mot de passe, il ne le fait pas dans FDS Portail, il le fait dans le module principal FDS SYS. 
> Dans FDS Portail, la table `utilisateurs` n'est qu'une copie en lecture seule (ou elle est simplement alimentée par les tokens JWT émis par FDS SYS). Si nous autorisions la modification du mot de passe dans FDS Portail, nous violerions la règle du SoR en créant une duplication et un risque de désynchronisation (deux mots de passe différents pour la même personne)."

---

## 2. Architecture (Monolithe Modulaire)

**Question du Jury :** 
*"Vous avez défendu le choix d'un Monolithe Modulaire plutôt que des Microservices (ADR-001). C'est un bon choix pour commencer. Mais à quel moment précis sauriez-vous qu'il est temps de migrer vers des Microservices, et quel serait le plus gros défi technique de cette migration concernant votre base de données ?"*

**Réponse attendue :**
> "Nous migrerons vers des microservices uniquement si nous faisons face à un besoin de **scalabilité différenciée** (par exemple, si le traitement des uploads de diplômes sature le processeur au point de bloquer la lecture des cursus) ou si l'équipe de développement devient trop grande (loi de Conway).
> Le plus gros défi technique serait de **casser la base de données partagée**. Actuellement, notre PostgreSQL garantit la cohérence ACID globale. Dans une architecture microservices, nous devrions appliquer le pattern 'Database-per-service', ce qui nous obligerait à gérer la cohérence éventuelle (BASE) et des transactions distribuées complexes (pattern Saga)."

---

## 3. Sécurité par Conception (OWASP Top 10)

**Question du Jury :** 
*"Vous mentionnez la mitigation des injections SQL grâce à SQLAlchemy. Mais parlons de la faille numéro 1 (A01 - Broken Access Control). Si Louismy, un simple candidat sans compte, tente d'accéder directement à l'URL `https://fds-portail.com/admin` ou envoie une requête POST vers `/api/admin/valider`, que se passe-t-il exactement dans votre architecture ?"*

**Réponse attendue :**
> "Nous appliquons le principe du 'Deny by default' et du 'Fail Secure'. 
> Côté Frontend (React), la route `/admin` est protégée par un composant `<ProtectedRoute>` qui vérifie la présence d'un jeton d'authentification local. S'il n'y en a pas, l'utilisateur est redirigé vers la page de login.
> Mais comme le frontend n'est jamais digne de confiance absolue, la vraie sécurité est sur le Backend (FastAPI) : la route `/api/admin/valider` exige un token JWT valide dans le header (`Authorization: Bearer`). Sans ce token (ou avec un token falsifié/expiré), l'API FastAPI intercepte la requête avant même d'exécuter la logique métier et renvoie une erreur HTTP 401 Unauthorized. Les données sont intouchables."

---

## 4. Performance (Mobile-First & Connexion lente)

**Question du Jury :** 
*"Pour respecter votre règle de chargement rapide sur connexion 3G (règle 80/20), vous avez utilisé le 'Code Splitting' de React. Pouvez-vous m'expliquer concrètement ce que cela change pour le téléphone de Louismy lorsqu'il navigue de la page d'accueil vers le formulaire de candidature ?"*

**Réponse attendue :**
> "Sans le Code Splitting, lorsque Louismy ouvre la page d'accueil, son téléphone devrait télécharger un seul énorme fichier JavaScript (`bundle.js`) contenant tout le code de l'application (l'accueil, les formulaires, le tableau de bord admin, les graphiques), ce qui prendrait 10 secondes en 3G.
> Avec le Code Splitting (implémenté via `React.lazy`), Vite découpe notre code en plusieurs petits morceaux ('chunks'). Quand Louismy ouvre l'accueil, il ne télécharge que les 50 Ko nécessaires pour l'accueil. L'affichage est instantané. C'est seulement lorsqu'il clique sur le bouton 'Postuler' que React va télécharger de manière asynchrone le 'chunk' correspondant au composant du formulaire."

---

## 5. Problème et Persona (Le Pourquoi)

**Question du Jury :**
*"Pourquoi avoir pris le temps de construire une Customer Journey Map et d'interviewer un profil comme 'Louismy' ? N'aurait-il pas été plus simple et plus rapide de lister directement les fonctionnalités techniques dont l'administration de la FDS a besoin ?"*

**Réponse attendue :**
> "C'est toute la différence entre la complexité accidentelle et la complexité essentielle (comme enseigné par Fred Brooks). Si nous avions commencé directement par coder ce que voulait l'administration, nous aurions probablement bâti un système lourd que les lycéens de province ne sauraient pas utiliser sur mobile. La CJM et le Persona nous ont permis de cibler la véritable 'douleur' : le déplacement physique et le manque d'information, pour construire le 'Walking Skeleton' (MVP) strictement autour de ce besoin vital."

---

## 6. Priorisation et MVP (MoSCoW)

**Question du Jury :**
*"Dans votre méthode MoSCoW, vous avez classé les vraies transactions MonCash dans 'Won't Have'. Pourquoi avoir délibérément exclu le paiement réel du MVP alors que c'est une étape cruciale de l'admission à l'université ?"*

**Réponse attendue :**
> "L'objectif du MVP ('Build to Learn') est de tester notre hypothèse principale le plus vite possible avec un minimum de risques. Intégrer de vraies transactions bancaires implique des contrats tiers, des délais légaux et des failles critiques potentielles. Cela aurait retardé le Time-to-Market de plusieurs mois. 
> En simulant le paiement (US7), nous validons que le parcours candidat fonctionne de bout en bout, tout en déléguant la responsabilité financière stricte au futur module FDS Pay."

---

## 7. Diagrammes de Séquence et Résilience

**Question du Jury :**
*"Dans votre diagramme de séquence (Section 7.2), l'envoi de l'email via Resend se fait après l'enregistrement en base de données. Que se passe-t-il exactement si l'API Resend tombe en panne au moment précis où le candidat clique sur 'Soumettre' ?"*

**Réponse attendue :**
> "C'est l'avantage de l'asynchronisme. Si Resend tombe en panne, le serveur tentera d'envoyer l'email et échouera, mais **après** que les données ont été commitées dans PostgreSQL. 
> Par conséquent, le candidat ne perd pas sa progression : la référence `CAN-2026-X` s'affichera quand même sur son écran, et l'administrateur verra bien son dossier. Une panne sur un service d'email externe ne fait pas crasher notre cœur de métier."

---

## 8. Choix Technologiques (REST vs GraphQL - ADR-002)

**Question du Jury :**
*"Vous avez choisi REST avec FastAPI dans votre ADR-002. Pourtant, GraphQL est réputé pour éviter l''over-fetching' (télécharger trop de données), ce qui est idéal pour les connexions 3G lentes de vos utilisateurs. Pourquoi avoir rejeté GraphQL ?"*

**Réponse attendue :**
> "GraphQL est un outil puissant, mais il introduit une 'complexité accidentelle' élevée : courbe d'apprentissage, sécurisation difficile et surtout une mauvaise gestion du cache HTTP natif. 
> Notre portail FDS est avant tout un CRUD simple dont les données sont très prévisibles (un nom, un diplôme, un statut). Le risque d'over-fetching est donc extrêmement minime. De plus, REST via FastAPI nous offre gratuitement la génération de la documentation OpenAPI, ce qui valide notre approche 'Contract-First'."

---

## 9. Ingénierie des Données (Langage Ubiquitaire et 3NF)

**Question du Jury :**
*"Comment justifiez-vous le nom de vos tables et la façon dont vous avez modélisé les documents dans votre diagramme de classes ? Pourquoi avoir séparé `DocumentRequis` et `DocumentSoumis` ?"*

**Réponse attendue :**
> "Nous avons appliqué deux principes fondamentaux de l'ingénierie logicielle.
> Premièrement, le **Langage Ubiquitaire** issu du Domain-Driven Design (DDD). Nous n'avons pas appelé nos entités 'UserFile' ou 'Upload' de manière générique. Nous avons utilisé exactement les mots du métier ('Candidat', 'Document Requis', 'Document Soumis') pour que le code et la base de données parlent le même langage que le secrétariat.
> Deuxièmement, la **Normalisation 3NF**. Si nous n'avions fait qu'une seule table, nous aurions eu énormément de redondance (répéter le format exigé pour chaque dossier). En séparant le 'modèle' (DocumentRequis) de l'instance (DocumentSoumis), nous évitons les anomalies de mise à jour et respectons la Troisième Forme Normale."

---

## 10. Méthodologie et Pragmatisme (Pourquoi pas tous les diagrammes UML ?)

**Question du Jury :**
*"UML propose de nombreux diagrammes (Activité, État-Transition, Composants, etc.). Pourquoi n'avez-vous pas inclus les 5 grands diagrammes UML dans votre cahier des charges, comme on le faisait traditionnellement en génie logiciel ?"*

**Réponse attendue :**
> "C'est un choix délibéré basé sur l'Agilité et le principe du 'Just Enough Design Up Front' (JEDUF). 
> Dans l'approche traditionnelle (Waterfall), on modélisait tout à l'excès ('Big Design Up Front'), ce qui figeait le projet et créait de la documentation inutile. Dans notre approche moderne, nous utilisons les modèles **uniquement pour résoudre une complexité spécifique de communication** :
> 1. Le **Cas d'Utilisation** pour montrer 'Qui fait Quoi' aux parties prenantes.
> 2. Le **Diagramme de Séquence** car nous avions une complexité temporelle asynchrone (l'envoi de l'email Resend et l'upload Cloudinary).
> 3. Le **Diagramme de Classes / ERD** car la structure de la base de données (le System of Record) est critique et difficile à changer plus tard.
> Pour le reste (comme les états simples d'un document : en_attente -> valide), le texte en Gherkin suffit amplement. Dessiner un diagramme d'état ou d'activité aurait été une perte de temps sans valeur ajoutée. C'est l'essence même de l'ingénierie pragmatique."
