# Conseils pour la Présentation : FDS Portail

Une bonne présentation d'un projet d'ingénierie devant un jury ne doit pas être un simple résumé du cahier des charges. Votre but est de démontrer que vous avez **maîtrisé la complexité**, fait des **choix d'ingénierie conscients** et que vous avez pensé au **besoin réel de l'utilisateur**.

---

## 📊 Structure de la présentation (Le Pitch - 10 à 15 min)

### 1. L'Accroche et le Problème (2 min)
*Ne commencez pas par parler de React ou de FastAPI.*
- **L'histoire :** Parlez de "Louismy", votre persona (le lycéen de province). Racontez la difficulté actuelle pour s'inscrire à la FDS (déplacement physique, asymétrie d'information, insécurité).
- **Le constat :** "Aujourd'hui, l'élite de l'ingénierie haïtienne recrute via des processus manuels et papiers."

### 2. La Solution et la Proposition de Valeur (2 min)
- Présentez le **Portail FDS** comme la solution de dématérialisation.
- Montrez le périmètre strict (le MVP) : *"Notre but n'est pas de tout faire (pas de cours en ligne, pas de paiement réel en V1), notre but est de permettre à un étudiant de s'informer et de soumettre un dossier complet depuis son smartphone."*

### 3. La Démonstration (Le "Walking Skeleton") (4 min)
*Si vous avez un prototype ou l'application fonctionnelle, montrez-la ! Sinon, utilisez des captures d'écran du design.*
- Montrez l'expérience mobile-first.
- Montrez le parcours fluide : le formulaire, l'upload de document, la génération de la référence `CAN-2026-X`.
- Côté Admin : montrez comment l'administration valide un document en 1 clic.

### 4. Architecture et Choix Techniques (3 min)
*C'est ici que vous gagnez vos points techniques avec le professeur.*
- Montrez le **diagramme de composants** (Section 9.3 du cahier des charges).
- Parlez de l'**ADR-001** : *"Nous avons choisi un Monolithe Modulaire plutôt que des Microservices car notre équipe est restreinte, le domaine est jeune, et nous voulions garantir la cohérence des données."*
- Mentionnez le choix de l'**API REST Contract-First**, ce qui vous permet de découpler proprement le Frontend (React) du Backend (FastAPI).

### 5. La Sécurité by Design (2 min)
*Les professeurs adorent quand la sécurité n'est pas une réflexion après coup.*
- Mentionnez comment vous adressez le **Top 10 OWASP** :
  - **A01 :** Le contrôle de rôle strict (RBAC) pour l'accès admin.
  - **A07 :** La protection contre le brute-force avec le Rate Limiter en mémoire.
  - La sécurité des fichiers : Vous vérifiez le vrai type MIME (magic bytes) et limitez la taille (5 Mo), et vous utilisez Cloudinary plutôt que de stocker les fichiers sur le même serveur.

---

## 🛡️ Anticipation des questions "Pièges" (Questions / Réponses)

Le jury va tester la solidité de vos choix. Voici comment répondre à quelques questions classiques :

**Q : Pourquoi ne pas avoir fait des microservices, c'est pourtant très à la mode ?**
> *Réponse :* "Nous appliquons la règle du pragmatisme. Pour une équipe de notre taille (< 5 développeurs) et un MVP, la complexité opérationnelle des microservices (tracing réseau, déploiement multiple) aurait ralenti la livraison de valeur. Nous avons opté pour un Monolithe Modulaire : le code est séparé en modules stricts, ce qui nous permettra de migrer vers des microservices plus tard si le trafic l'exige, mais pour l'instant nous gardons la simplicité de déploiement (ADR-001)."

**Q : Pourquoi utiliser FastAPI au lieu de Django ou Express.js ?**
> *Réponse :* "FastAPI nous offre des performances asynchrones natives, idéales pour ne pas bloquer le serveur lors de l'upload des fichiers vers Cloudinary. De plus, il auto-génère la documentation OpenAPI (Swagger), ce qui garantit notre approche 'Contract-First' avec l'équipe frontend."

**Q : Qu'est-ce qui garantit qu'un candidat ne verra pas les documents d'un autre ?**
> *Réponse :* "Nous appliquons le principe du Moindre Privilège (Least Privilege). La recherche de suivi ne retourne que les données liées à la référence exacte soumise. Du côté admin, l'accès nécessite un JWT valide et la vérification systématique du rôle 'admin' sur chaque endpoint (mitigation OWASP A01)."

**Q : Et si la base de données PostgreSQL tombe en panne ?**
> *Réponse :* "Notre architecture backend est Stateless. Si le backend ou la BDD redémarre, aucune session n'est perdue car nous utilisons des jetons JWT pour l'authentification. De plus, le déploiement prévu sur un PaaS (Railway) gère les redémarrages automatiques."

---

## 💡 Le petit truc en plus
La veille de la présentation, relisez l'**ADR-001** et l'**ADR-002** dans le cahier des charges. Ce format de "décision documentée" (Architecture Decision Record) montre une grande maturité professionnelle. Lors de la présentation, mentionnez simplement *"Comme documenté dans notre ADR-001..."* pour prouver que tout a été pensé, pesé et justifié formellement.

---

## 🚀 Conseils Avancés pour le Jour J

### 1. La posture face aux questions difficiles
Les jurys posent parfois des questions pointues pour tester vos limites, pas forcément pour vous piéger.
- **Si vous ne savez pas :** Ne mentez jamais et n'inventez pas une réponse technique. Dites plutôt : *"C'est un excellent point. Pour le périmètre de ce MVP, nous n'avons pas eu besoin de couvrir ce cas spécifique, mais si nous devions le faire, nous explorerions probablement la piste [Nom d'une techno/concept]."*
- **Assumez vos compromis :** Toute architecture est une question de compromis (Trade-offs). Si on vous reproche que la base PostgreSQL partagée pourrait être un goulot d'étranglement, répondez : *"Absolument, c'est le compromis que nous avons accepté pour garantir la simplicité de déploiement initiale (ADR-001). L'étape suivante serait d'implémenter un cache Redis plus agressif avant d'envisager de séparer les bases."*

### 2. La mise en valeur du code (Si on vous demande d'en montrer)
- Ne scrollez pas frénétiquement dans `main.py`.
- Préparez **2 ou 3 extraits de code "propres"** qui montrent votre niveau. 
- *Exemple parfait :* Montrez le fichier `logging_middleware.py` ou `rate_limiter.py`. Cela prouvera en moins d'une minute que vous comprenez les concepts avancés (Middleware, intercepteurs HTTP, protection contre le brute-force) plutôt que de montrer de simples routes CRUD.

### 3. Parlez de l'Avenir (Roadmap & Next Steps)
Un bon ingénieur sait quelles sont les limites de son système actuel. Concluez votre présentation en listant les 3 choses que vous feriez si vous aviez 3 mois de plus :
1. **Scale Out :** Passer de FastAPI sur une instance unique à un déploiement derrière un Load Balancer avec les sessions stockées dans Redis.
2. **Paiement Réel :** Connecter la simulation actuelle à l'API réelle de MonCash / NatCash (le fameux futur "FDS Pay").
3. **Accessibilité Totale :** Mettre en place des tests automatisés d'accessibilité (ex: axe-core) dans le pipeline CI/CD pour garantir le maintien du niveau WCAG 2.1 AA à chaque mise à jour.

### 4. La dynamique d'équipe (Si vous présentez à plusieurs)
- **Répartissez-vous les rôles intelligemment :** Celui qui est le plus à l'aise avec la base de données répond aux questions Data. Celui qui a fait le front gère les questions UX/React.
- Ne vous contredisez jamais devant le jury. Si un collègue donne une réponse incomplète, complétez en disant : *"Pour rebondir sur ce que dit mon collègue, j'ajouterais que..."*
