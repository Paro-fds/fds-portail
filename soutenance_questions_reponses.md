# Soutenance : Questions & Réponses sur les 11 parties du Cahier des Charges

Ce document parcourt chaque chapitre de votre cahier des charges et anticipe une question stratégique (et sa réponse) pour vous préparer à justifier vos choix devant le jury.

---

## §1. Problème Observé
**Q : Quel problème spécifique ce portail cherche-t-il à résoudre par rapport à la situation existante à la FDS ?**
> **R :** "Le portail résout le problème du 'déplacement physique obligatoire' et de l'asymétrie de l'information. Actuellement, les lycéens hors de la capitale n'ont pas de source de vérité numérique officielle et doivent se déplacer en personne, s'exposant au risque de l'insécurité, juste pour obtenir des informations d'admission ou déposer des papiers."

## §2. Solution Proposée
**Q : Pourquoi votre solution se limite-t-elle à un portail de candidature (MVP) et non à un système de gestion universitaire complet ?**
> **R :** "Par souci de pragmatisme et de rapidité de déploiement (Time-to-Market). Résoudre le chaos informationnel de l'admission est la porte d'entrée du cycle étudiant. Essayer de tout informatiser d'un coup (intranet, notes, etc.) est la première cause d'échec des projets informatiques. Notre MVP vise un succès ciblé et mesurable."

## §3. Argumentation (Customer Journey & Hypothèse)
**Q : Comment comptez-vous prouver scientifiquement que votre plateforme est réellement utile ?**
> **R :** "Nous avons intégré une métrique de succès chiffrable en base de données : la question obligatoire 'Avez-vous dû vous déplacer ?' enregistrée en `deplacement_physique`. Si à l'issue de la première campagne, plus de 70% des dossiers répondent 'Non', nous aurons prouvé par la donnée réelle que nous avons éliminé la friction géographique."

## §4. Priorisation MoSCoW
**Q : Le paiement est simulé. N'était-ce pas un besoin critique (Must Have) d'avoir de l'argent réel dès la phase 1 ?**
> **R :** "La gestion de flux monétaires implique des enjeux légaux qui dépassent le besoin premier : dématérialiser le dépôt de pièces (MVP). La simulation prouve en revanche que notre architecture (diagramme d'étapes, BDD) est prête à s'interfacer avec l'API MonCash dans une phase ultérieure sans repenser le parcours."

## §5. MVP et Walking Skeleton
**Q : Pouvez-vous me définir techniquement ce qu'est le 'Walking Skeleton' de votre système ?**
> **R :** "C'est le flux minimal de bout en bout qui prouve que tous nos composants communiquent. Dans notre cas : un candidat clique sur 'Postuler' sur le Frontend React et remplit ses infos personnelles. **Il est ensuite redirigé vers une simulation de paiement (MonCash). Une fois validé, il uploade son diplôme, que le Frontend envoie vers Cloudinary, et le Backend FastAPI enregistre tout le dossier dans PostgreSQL**. Ensuite, le service d'emailing (Resend) s'active en asynchrone, et l'Admin peut valider ce dossier sur son tableau de bord."

## §6. Use Cases et User Stories
**Q : Vous avez prévu une fonctionnalité de 'Remplacement de document' (UC6). N'était-il pas plus simple de forcer le candidat à refaire un dossier en cas de rejet ?**
> **R :** "L'objectif est d'optimiser l'expérience utilisateur (UX) et la propreté des données. Forcer un nouveau dossier générerait de la frustration et créerait des données 'orphelines' (des dossiers morts en BDD). Le remplacement 'in-place' repasse le statut à 'en_attente' et remplace le lien Cloudinary tout en conservant le même numéro de référence `CAN-2026-X`."

## §7. Scénarios et Séquences (Comportement)
**Q : Que se passe-t-il si l'API d'emails (Resend) tombe en panne lors de l'envoi de la confirmation au candidat ? Le dossier est-il perdu ?**
> **R :** "Non, notre architecture applique le principe de 'Fail-Safe'. L'appel d'email est asynchrone par rapport à la transaction métier. La source de vérité est notre base PostgreSQL. Même sans email, le candidat verra sa référence s'afficher sur l'écran de succès et le dossier sera correctement transmis au secrétariat."

## §8. Modèle de Données (Structure)
**Q : Est-ce que votre base de données respecte les propriétés ACID et la normalisation 3NF ?**
> **R :** "Totalement. Nos tables respectent la **3ème Forme Normale (3NF)** : toutes nos entités ont une clé primaire `UUID`, et aucune donnée n'est dupliquée (les documents sont reliés par des Clés Étrangères). 
> Concernant **ACID** : l'Atomicité est garantie par les transactions SQLAlchemy. La Cohérence est assurée par une contrainte UNIQUE `(candidat_id, document_requis_id)` pour bloquer l'upload en double du même document mathématiquement."

## §9. Architecture et Composants
**Q : Pourquoi avoir opté pour une architecture 'Monolithe Modulaire' au lieu de Microservices ?**
> **R :** "(Référence ADR-001). C'est un choix pragmatique pour une équipe de moins de 5 personnes construisant un MVP. La complexité opérationnelle des microservices (tracing, latence) aurait ralenti la livraison de valeur. Le code backend est cependant découpé logiquement, ce qui permettra une séparation physique en microservices plus tard si nécessaire."

## §10. Choix Technologiques & Architecture de Qualité
**Q : Vous revendiquez une approche 'Mobile-First'. Comment l'avez-vous concrètement implémentée techniquement ?**
> **R :** "Sur le plan UI, nous avons implémenté une 'BottomNav' pour l'ergonomie mobile. Sur le plan performance, nous utilisons le **Code Splitting (React.lazy)** : le navigateur ne télécharge que le Javascript de la page visualisée. De plus, les données CMS (Sanity) sont servies via un CDN global pour garantir un affichage en moins de 3 secondes, même sur le réseau 3G haïtien."

## §11. Validation, Risques et Limites
**Q : Quelle est la principale limite de sécurité de cette version 1.0 (MVP) et comment comptez-vous la régler ?**
> **R :** "Comme documenté dans le paragraphe 11.4, notre sécurité par JWT est robuste, mais il manque le mécanisme de renouvellement automatique (Refresh Tokens). Actuellement, l'administrateur devra se reconnecter manuellement toutes les 60 minutes. C'est une limite assumée pour le MVP, dont la résolution (un endpoint `POST /api/auth/refresh`) est classée en priorité P1 post-soutenance."

---

## 🔥 Questions Techniques Avancées & Pièges Fréquents du Jury

**Q : Vous avez choisi une API REST. Pourquoi pas GraphQL qui est pourtant la nouvelle norme ?**
> **R :** "(Référence ADR-002). GraphQL est très puissant pour éviter l'over-fetching lorsque les clients ont des besoins de données très hétérogènes. Or, notre portail est une application CRUD classique où les besoins du frontend sont très uniformes. REST nous a permis de bénéficier du cache HTTP natif (GET) et surtout d'auto-générer notre documentation OpenAPI via FastAPI sans effort supplémentaire (Contract-First)."

**Q : Vous dites avoir limité la taille des fichiers à 5 Mo. Que se passe-t-il si un attaquant envoie un fichier de 50 Go pour saturer la RAM de votre serveur avant même la vérification ?**
> **R :** "Excellente question. La limitation des 5 Mo ne se fait pas qu'au niveau du code métier. Au niveau du serveur web (comme Nginx ou Gunicorn qui fera tourner FastAPI), nous configurons une limite stricte sur la taille du 'Request Body' (`client_max_body_size` ou middleware FastAPI). La requête de 50 Go est rejetée par le serveur HTTP avant même d'atteindre la mémoire de notre code Python."

**Q : Concurrence : Que se passe-t-il si deux administrateurs cliquent exactement à la même milliseconde sur "Valider" et "Rejeter" pour le même document ?**
> **R :** "C'est un scénario de concurrence typique. PostgreSQL gère cela grâce à son niveau d'isolation transactionnelle par défaut (Read Committed). La première transaction qui arrive pose un verrou (lock) sur la ligne en modification (`UPDATE document_soumis`). La deuxième transaction doit attendre. Le statut final sera celui de la deuxième transaction, et grâce à notre champ d'audit (`valide_par` et `date_validation`), nous saurons exactement quel administrateur a eu le dernier mot en base."

**Q : Du côté administrateur, où stockez-vous le token JWT sur le navigateur (React) ? Dans le LocalStorage ? N'est-ce pas dangereux (faille XSS) ?**
> **R :** "Le LocalStorage est effectivement vulnérable aux attaques XSS si le site exécute du Javascript malveillant. Pour le MVP, comme l'application Admin n'affiche aucun texte ou commentaire généré par les utilisateurs (pas de forum, pas de chat), la surface d'attaque XSS est quasi-nulle, ce qui justifie son usage temporaire. L'évolution post-MVP serait de stocker ce token dans un Cookie `HttpOnly` et `Secure` pour bloquer totalement sa lecture par Javascript."

**Q : Et la gestion de vos mots de passe et clés secrètes ? Est-ce que la clé API de Cloudinary ou votre JWT Secret se balade sur votre GitHub public ?**
> **R :** "Absolument pas (OWASP A02). Toutes les clés (Base de données, Cloudinary, Resend, JWT Secret) sont lues depuis les variables d'environnement (`import.meta.env` côté React et `os.getenv()` côté Python). Le fichier `.env` est strictement ignoré par Git (via le `.gitignore`). Sur le dépôt de code, nous n'avons poussé qu'un fichier `.env.example` avec des valeurs factices."

**Q : Pourquoi avoir choisi TypeScript plutôt que JavaScript classique pour le Frontend ?**
> **R :** "TypeScript ajoute un typage statique qui nous a permis de définir des contrats stricts (Interfaces) pour nos données. Par exemple, l'interface `DocumentSoumis` nous garantit que nous ne pourrons jamais assigner un statut farfelu comme 'en_cours' au lieu de 'en_attente'. Cela attrape 80% des erreurs au moment de la compilation dans notre éditeur, avant même que le code ne tourne dans le navigateur."
