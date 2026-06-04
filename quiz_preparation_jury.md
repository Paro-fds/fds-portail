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
