# FDS Portail - Plateforme d'Admission et de Suivi

Bienvenue sur le dépôt du **Portail Officiel de la Faculté des Sciences (FDS)** de l'Université d'État d'Haïti (UEH). 

Ce portail permet aux futurs étudiants de consulter le catalogue des programmes (Génie Civil, Électromécanique, etc.), de soumettre leur dossier de candidature en ligne, et d'en assurer le suivi. Il intègre également un tableau de bord sécurisé pour le secrétariat administratif.

---

## 🛠️ Stack Technique

Ce projet est une architecture client-serveur complète (Fullstack) :

### Frontend
- **Framework :** React 19 (Vite)
- **Routage :** React Router DOM
- **Styling :** Tailwind CSS v4
- **Animations :** Motion (Framer Motion)
- **Design System :** "The Digital Curator" (Typographies Manrope/Inter, icônes Material Symbols Outlined, architecture en *Tonal Layering*).

### Backend
- **Framework :** Python / FastAPI
- **Base de Données :** PostgreSQL (avec SQLAlchemy pour l'ORM)
- **Stockage de Fichiers :** Cloudinary (pour les PDF et images soumis par les candidats)
- **Sécurité :** JWT (JSON Web Tokens), bcrypt pour le hachage des mots de passe.

---

## 🚀 Comment lancer le projet localement

### 1. Prérequis
- [Node.js](https://nodejs.org/) (version 18+)
- [Python](https://www.python.org/) (version 3.10+)
- Une base de données [PostgreSQL](https://www.postgresql.org/) active.
- Un compte [Cloudinary](https://cloudinary.com/) (pour le `.env` du backend).

### 2. Démarrer le Frontend (React/Vite)

À la racine du projet, installez les dépendances et lancez le serveur de développement :

```bash
# Installation des paquets npm
npm install

# Lancement du serveur Vite (par défaut sur http://localhost:3000)
npm run dev
```

### 3. Démarrer le Backend (FastAPI)

Ouvrez un **nouveau terminal**, puis configurez l'environnement Python :

```bash
# Se déplacer dans le dossier backend
cd backend

# Créer un environnement virtuel (optionnel mais recommandé)
python -m venv venv

# Activer l'environnement virtuel (sur Windows)
venv\Scripts\activate
# (Sur Mac/Linux : source venv/bin/activate)

# Installer les dépendances
pip install -r requirements.txt

# Configurer les variables d'environnement
# Copiez le fichier .env.example en .env et remplissez vos identifiants de BDD et Cloudinary.

# Lancer l'API locale (sur http://127.0.0.1:8000)
uvicorn main:app --reload
```

---

## 📁 Structure Principale du Dépôt

- `/src/` : Contient l'intégralité du code source Frontend (Composants, Écrans, Contextes, Styles).
- `/backend/` : Contient le code du serveur FastAPI (`main.py`, modèles SQLAlchemy, authentification).
- `FDS_UI.md` / `DESIGN.md` : Documentation officielle du Design System et des tokens de l'institution.
- `cahier_des_charges.md` : Documentation technique et spécifications complètes du projet.

---

*Ce projet a été structuré pour répondre aux standards de l'institution et garantir un traitement fluide et sécurisé des dossiers d'admission.*
