# FAQ & Préparation à la Soutenance - FDS Portail

Ce document regroupe les questions les plus probables que le jury ou votre professeur pourrait vous poser lors de la soutenance, ainsi que les réponses structurées pour démontrer votre rigueur d'ingénierie.

---

## 💾 Base de Données & Architecture Modèle

**Q : Est-ce que votre base de données respecte les propriétés ACID et la normalisation ?**
> **Réponse :** "Absolument. Nos tables PostgreSQL respectent strictement la **3ème Forme Normale (3NF)** : toutes nos entités ont une clé primaire `UUID` forte, et il n'y a aucune donnée dupliquée. La table `DocumentSoumis` est liée au candidat via des clés étrangères, aucune liste n'est stockée dans une colonne. 
Concernant **ACID** : l'Atomicité est garantie par les transactions SQLAlchemy (tout ou rien lors d'un upload de dossier complet). La Cohérence est assurée par l'intégrité référentielle (Clés Étrangères) et une contrainte `UNIQUE` sur le couple `(candidat_id, document_requis_id)` pour bloquer les doublons mathématiquement."

**Q : Pourquoi ne pas avoir stocké les fichiers PDF/Images directement dans la base de données PostgreSQL (dans des colonnes BLOB) ou sur le serveur ?**
> **Réponse :** "Pour des raisons de performance et de sécurité (OWASP). Stocker des fichiers volumineux dans la base de données ralentirait considérablement les requêtes. Les stocker sur notre serveur local saturerait vite le disque. Nous avons donc déporté le stockage vers **Cloudinary**, qui nous retourne une URL sécurisée. Notre BDD reste ainsi légère et ultra-rapide."

---

## 🎨 Frontend & UI/UX (Design System)

**Q : Pourquoi avoir créé votre propre Design System ("The Digital Curator") plutôt que d'utiliser une librairie toute faite comme Bootstrap ou Material-UI ?**
> **Réponse :** "L'utilisation de librairies toutes faites donne souvent un rendu générique. La FDS étant l'élite de l'ingénierie, nous voulions un rendu premium. Nous avons implémenté l'**Atomic Design** avec TailwindCSS en créant nos propres composants purs (`Card`, `Button`, `Input`). Cela nous offre un contrôle absolu sur le style, centralise nos variables CSS (Primary `#004B87`), et allège considérablement le poids de l'application."

**Q : Vous parlez d'une approche "Mobile-First", comment l'avez-vous prouvé techniquement ?**
> **Réponse :** "Le parcours utilisateur (UX) a été pensé pour le mobile avant tout. Nous avons implémenté une **Navigation de bas d'écran (BottomNav)** car c'est là que se trouve le pouce de l'utilisateur sur mobile. De plus, nous utilisons le **Code Splitting (React.lazy)** : le navigateur ne télécharge que le JavaScript de la page consultée, ce qui garantit un affichage en moins de 3 secondes, même sur une connexion 3G haïtienne instable."

---

## 🌐 Intégration CMS & Contenu Dynamique

**Q : Pourquoi utiliser un CMS "Headless" comme Sanity pour les Actualités, mais pas pour le reste du site ?**
> **Réponse :** "Nous avons opté pour une approche **hybride**. Les données très volatiles qui nécessitent des mises à jour fréquentes par le secrétariat (Actualités, Dates Clés) sont gérées via Sanity CMS. L'avantage est que le contenu est distribué via leur CDN global, accélérant le chargement. À l'inverse, les données fondamentales (processus d'inscription, documents requis) sont directement liées à notre logique métier (Backend/Constantes) pour garantir une stabilité totale et ne pas dépendre excessivement de services tiers."

---

## 🔒 Sécurité & Backend (FastAPI)

**Q : Qu'est-ce qui garantit qu'un candidat ne pourra pas modifier la barre de progression pour forcer la validation de son dossier ?**
> **Réponse :** "La barre de progression côté React n'est qu'une interface d'affichage. La **Source de Vérité** est uniquement la base de données PostgreSQL protégée par le backend. Seul un administrateur ayant fourni un token JWT valide peut envoyer une requête `PUT /api/admin/documents/{id}/statut` pour valider un document. Toute tentative externe sera rejetée par le backend avec une erreur 403 (Forbidden)."

**Q : Comment protégez-vous le système contre un attaquant qui enverrait des virus à la place des PDF d'inscription ?**
> **Réponse :** "Nous appliquons la **Défense en Profondeur** (Defense in Depth). 
1. Le Frontend bloque la sélection de fichiers non autorisés. 
2. Le Backend FastAPI ne se fie **pas** à l'extension du fichier, il lit les 'magic bytes' du fichier via la librairie `filetype` pour s'assurer que c'est un vrai PDF ou JPG. 
3. La taille est bloquée à 5Mo pour éviter les attaques par déni de service (DDoS)."

---

## 💼 Choix Fonctionnels (Périmètre du MVP)

**Q : Pourquoi n'y a-t-il pas de système de "Création de compte avec mot de passe" pour les candidats ?**
> **Réponse :** "C'est un choix d'UX et de minimisation de friction. Notre persona (Louismy) est un jeune lycéen sur mobile. Lui demander de confirmer un compte, de retenir un mot de passe et de se connecter aurait créé une barrière à l'entrée. À la place, la soumission génère un numéro de référence unique (ex: `CAN-2026-X`). Avec cette simple référence, le candidat peut suivre la progression de son dossier de manière fluide et sécurisée."

**Q : Le paiement est simulé. N'est-ce pas une faiblesse pour l'application ?**
> **Réponse :** "Au contraire, c'est la preuve d'une bonne gestion de projet (Agile/MVP). Développer une véritable interconnexion bancaire prendrait des mois et impliquerait des enjeux légaux hors du périmètre de l'admission. Notre but premier est de **dématérialiser le dossier physique**. En simulant la transaction dans l'interface, nous avons déjà validé l'UX, les champs requis en base de données et l'architecture. Brancher l'API MonCash par la suite (le Module FDS Pay) ne sera plus qu'un détail technique."
