# Structure du PowerPoint et Répartition de la Parole

Ce document est votre "Script de mise en scène" pour la soutenance. Il part du principe que vous êtes un groupe de 3 personnes (ajustez si vous êtes 2 ou 4).

## 1. La Répartition des Rôles (Le "Casting")

Ne faites jamais l'erreur du "chacun parle 3 minutes à tour de rôle sur chaque slide". Découpez la présentation par **expertise** :
- **Orateur A (Le Product Manager / Métier) :** Il/Elle maîtrise le problème, le persona (Louismy), la Customer Journey Map et le MVP. C'est la personne qui a le plus d'empathie et qui "vend" l'idée.
- **Orateur B (L'Architecte / Tech Lead) :** Il/Elle maîtrise l'UML, l'architecture (FastAPI/React), la base de données (3NF/System of Record) et la sécurité. C'est la personne qui prouve au professeur que le code est robuste.
- **Orateur C (Le Démonstrateur) :** Il/Elle prend le contrôle pour la surprise finale (le Projet 2 en avance), fait la démonstration live fluide, et conclut.

---

## 2. Le Plan du PowerPoint (10 Slides Maximum)

Voici exactement ce que vous devez mettre sur vos slides (pas de longs textes, uniquement des schémas et des mots-clés).

### Introduction & Métier (Par Orateur A)
*Durée : 4-5 minutes*

- **Slide 1 : Titre.** "Portail FDS : Dématérialisation de l'admission". Noms du groupe.
- **Slide 2 : Le Problème.** Ne mettez pas de texte. Mettez une photo d'une file d'attente ou un design minimaliste avec les 3 "Pain points" (Inconfort, Déplacement, Asymétrie d'information).
- **Slide 3 : Le Persona & La CJM.** Mettez une photo représentant "Louismy" (17 ans, mobile-only). Montrez très rapidement le tableau de la CJM avec le gros point rouge sur "Déplacement physique".
- **Slide 4 : La Solution (Le MVP).** Expliquez le "Job to be Done". Montrez la liste "Must Have" (Le Walking Skeleton) et dites fièrement ce que vous avez exclu (Won't Have : vrai paiement) pour aller vite.

### Technique & Ingénierie (Par Orateur B)
*Durée : 5-6 minutes*

- **Slide 5 : Choix Technologiques.** Logos de React, Vite, FastAPI, PostgreSQL. Expliquez le choix du "Monolithe Modulaire" et du "Mobile-First" (ADR-001 et ADR-002).
- **Slide 6 : Modélisation des Données.** Affichez l'ERD (Diagramme de classes). **Mettez en gras** les mots "Langage Ubiquitaire" et "Normalisation 3NF". Expliquez que la table `Utilisateur` ne fait que consommer le "System of Record" (FDS SYS).
- **Slide 7 : Cinématique Asynchrone.** Affichez le Diagramme de Séquence. Montrez comment l'API Resend (email) intervient *après* la sauvegarde en base pour garantir la résilience.
- **Slide 8 : Sécurité.** Citez 2 failles de l'OWASP que vous avez bloquées (A01: Broken Access Control via JWT, et A05: Injection SQL via SQLAlchemy).

### Le Coup de Théâtre & Conclusion (Par Orateur C)
*Durée : 5 minutes*

- **Slide 9 : Une diapositive noire avec juste écrit : "Et si on allait plus loin ?"**
  > **La Phrase de Transition EXACTE :** *"Monsieur le Professeur, nous savons que le livrable attendu aujourd'hui pour le Projet 1 s'arrête strictement au cahier des charges. Cependant, l'ingénierie logicielle ne vaut rien si elle n'est pas testée face à la réalité. Pour valider notre architecture, nous avons anticipé le Projet 2 et nous avons implémenté notre Walking Skeleton. Nous aimerions vous faire une démonstration en direct de ce que verra Louismy."*
- **Slide 10 (Pas de slide, l'écran montre le navigateur web) : La Démo.** 
  - Orateur C montre l'UI sur un téléphone (ou simule le mode mobile sur Chrome `F12`). 
  - Il remplit le formulaire.
  - Il montre le faux paiement.
  - Il uploade le fichier PDF.
  - Il montre l'écran "Dossier reçu CAN-2026-X".
  - (Bonus) Il ouvre l'espace admin et clique sur "Valider".
- **Slide 11 : Conclusion.** Rappel de l'hypothèse de départ : "Nous saurons que c'est un succès si nous atteignons 70% d'inscriptions sans déplacement."
- **Slide 12 : Q&A (Questions).** "Merci de votre attention."

---

## 3. Conseils de préparation du PowerPoint
- **Règle du 6x6 :** Pas plus de 6 lignes de texte par slide, pas plus de 6 mots par ligne. Le professeur ne doit pas "lire" vos slides, il doit vous écouter.
- **Contraste :** Utilisez les couleurs de l'université (si possible) ou un thème très sobre et professionnel.
- **La Démo de secours :** Internet peut tomber en panne pendant votre oral. Orateur C doit OBLIGATOIREMENT avoir enregistré une vidéo de 2 minutes de la démonstration sur son PC (capture d'écran vidéo). Si le site ne charge pas, vous lancez la vidéo en disant : *"Les aléas du direct font que la connexion flanche, heureusement nous avons un backup vidéo de notre application en production."* C'est très professionnel.
