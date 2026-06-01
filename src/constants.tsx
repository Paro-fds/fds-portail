/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Program {
  id: string;
  name: string;
  description: string;
  category: "Génie" | "Sciences" | "Techniques" | "Propédeutique";
  duration: string;
  credits: string;
  code: string;
  areas?: { name: string; description: string; icon: string }[];
  imagePrompt?: string;
  imageUrl?: string;
}

// Types pour les données de cursus
export interface CoursMPC {
  item: number;
  titre: string;
  heures_theorie: number | null;
  heures_tp: number | null;
}

export interface CoursIngenierie {
  item: number;
  titre: string;
  heures: number;
  code: string;
}

export interface NiveauMPC {
  [niveau: string]: CoursMPC[];
}

export interface NiveauIngenierie {
  [niveau: string]: CoursIngenierie[];
}

export interface CursusMPC {
  filiere: string;
  duree_annees: number;
  niveaux: NiveauMPC;
}

export interface CursusIngenierie {
  filiere: string;
  duree_annees: number;
  niveaux: NiveauIngenierie;
}

export type CursusData = CursusMPC | CursusIngenierie;

export const PROGRAMS: Program[] = [
  {
    id: "mpc",
    name: "Premier Cycle (MPC)",
    description: "Le premier cycle ou cycle propédeutique a pour objectif principal de donner la formation scientifique générale nécessaire à la poursuite d'études spécialisées en sciences pures et appliquées. Il vise également à améliorer les aptitudes des étudiants à s'exprimer par écrit et oral en français, et à comprendre des textes scientifiques en anglais.",
    category: "Propédeutique",
    duration: "2 ans",
    credits: "120 ECTS",
    code: "MPC-24"
  },
  {
    id: "genie-civil",
    name: "Génie Civil",
    description: "Le programme de génie civil a pour mission première la formation d'ingénieurs qualifiés dans le domaine du bâtiment et des travaux publics. Il permet de travailler dans tous les secteurs de la construction (bâtiments, travaux publics, ouvrages d'art, géotechnique, structures, travaux maritimes, ouvrages pour l'énergie…) et ouvre à de très nombreux métiers.",
    category: "Génie",
    duration: "3 ans",
    credits: "180 ECTS",
    code: "GCV-24"
  },
  {
    id: "genie-electromecanique",
    name: "Génie Électromécanique",
    description: "La spécialité Génie électromécanique est un équilibre entre une formation en électrique (électrotechnique) et mécanique. Cette formation répond aux besoins des industries du secteur prive et étatique ayant besoin d'ingénieurs à haut potentiel et de fortes compétences scientifiques et techniques.",
    category: "Génie",
    duration: "3 ans",
    credits: "180 ECTS",
    code: "GEM-24"
  },
  {
    id: "genie-electronique",
    name: "Génie Électronique",
    description: "Le programme de génie électronique forme des ingénieurs dont la principale caractéristique est la polyvalence. C'est une formation générale qui intègre l'électrique, l'électronique, les télécommunications et l'informatique. Ce programme facilite l'intégration professionnelle.",
    category: "Génie",
    duration: "3 ans",
    credits: "180 ECTS",
    code: "GEL-24",
    areas: [
      { name: "Électrique", description: "Systèmes de puissance, distribution et conversion d'énergie.", icon: "bolt" },
      { name: "Électronique", description: "Circuits analogiques et numériques, microcontrôleurs.", icon: "cpu" },
      { name: "Télécommunications", description: "Traitement du signal, réseaux et transmission de données.", icon: "tower-control" },
      { name: "Informatique", description: "Programmation embarquée, architecture logicielle et IoT.", icon: "terminal" }
    ]
  },
  {
    id: "architecture",
    name: "Architecture",
    description: "La section d'Architecture aboutit à un diplôme d'Ingénieur-Architecte. Le programme de formation recherche l'équilibre entre la connaissance des matériaux et des calculs de leur mise en œuvre d'une part ; l'histoire et l'esthétique de l'espace ainsi que les méthodes et pratiques de sa production d'autre part.",
    category: "Génie",
    duration: "3 ans",
    credits: "180 ECTS",
    code: "ARC-24"
  },
  {
    id: "chimie",
    name: "Licence en Chimie",
    description: "Le programme des études de Licence en Chimie comporte quatre années. Les cours dispensés dans les deux premières années visent à donner aux étudiants une formation de base dans les matières essentielles de la Chimie et parallèlement une formation générale en Mathématiques, physique, Informatique et Biologie.",
    category: "Sciences",
    duration: "4 ans",
    credits: "240 ECTS",
    code: "CHM-24"
  },
  {
    id: "topographie",
    name: "Topographie & Techniques",
    description: "Filières techniques courtes formant des professionnels opérationnels tels que les Techniciens en génie civil, Techniciens analystes programmeurs, et spécialistes en topographie.",
    category: "Techniques",
    duration: "2 ans",
    credits: "120 ECTS",
    code: "TOP-24"
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// ACTUALITÉS & ANNONCES
// ─────────────────────────────────────────────────────────────────────────────
// Pour ajouter une actualité : ajouter un objet en haut du tableau NEWS.
// Les 3 premières entrées (ou celles marquées pinned:true) s'affichent en page d'accueil.
//
// Champs disponibles :
//   id     → identifiant unique (ex: "news-4")
//   tag    → catégorie : "Concours" | "Infrastructures" | "Recherche" | "Annonce" | "Événement"
//   title  → titre de l'article
//   date   → date lisible (ex: "10 Mai 2026")
//   desc   → résumé court (2–3 phrases max)
//   pinned → (optionnel) true = affiché en priorité sur la page d'accueil
// ─────────────────────────────────────────────────────────────────────────────

export type NewsTag = "Concours" | "Infrastructures" | "Recherche" | "Annonce" | "Événement";

export type ActionType = "lire" | "telecharger" | "voir" | "inscrire";

export interface Actualite {
  id: string;
  tag: NewsTag;
  title: string;
  date: string;
  desc: string;
  pinned?: boolean;
  actionType?: ActionType;  // Par défaut : "lire"
  actionUrl?: string;       // URL externe ou chemin interne
  fichierPdfUrl?: string;   // URL du PDF uploadé dans Sanity (prioritaire sur actionUrl)
}

export const NEWS: Actualite[] = [
  // ── Ajouter une nouvelle actualité ici en haut du tableau ──
  {
    id: "news-3",
    tag: "Concours",
    title: "Ouverture des inscriptions 2026",
    date: "10 Mai 2026",
    desc: "Les inscriptions pour le nouveau cycle propédeutique débuteront officiellement en juillet. Tous les candidats sont invités à préparer leur dossier.",
    pinned: true,
    actionType: "inscrire",
    actionUrl: "/candidature",
  },
  {
    id: "news-2",
    tag: "Infrastructures",
    title: "Nouveau laboratoire de génie civil",
    date: "2 Mai 2026",
    desc: "La FDS inaugure son nouveau laboratoire de résistance des matériaux financé par nos partenaires internationaux.",
    actionType: "lire",
    // actionUrl: "/actualites/labo-genie-civil",  ← à remplir quand la page existe
  },
  {
    id: "news-1",
    tag: "Recherche",
    title: "Conférence sur l'IA appliquée",
    date: "28 Avril 2026",
    desc: "Venez assister à notre séminaire sur les applications de l'intelligence artificielle en Haïti, animé par des professeurs et praticiens.",
    actionType: "voir",
    // actionUrl: "https://lien-externe.com",  ← à remplir
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// DATES CLÉS — Calendrier d'admission
// ─────────────────────────────────────────────────────────────────────────────
// Pour modifier une date : changer la valeur du champ "date" ci-dessous,
// ou gérer directement depuis Sanity Studio si configuré.
//
// Types disponibles (contrôlent la couleur et l'icône sur la carte) :
//   "ouverture" → bleu clair   | icône : event
//   "cloture"   → rouge        | icône : schedule
//   "concours"  → bleu foncé   | icône : school  (mis en avant)
//   "autre"     → neutre       | icône : calendar_today
// ─────────────────────────────────────────────────────────────────────────────

export type DateCleType = "ouverture" | "cloture" | "concours" | "autre";

export interface DateCle {
  id: string;
  label: string;
  date: string;
  type: DateCleType;
  ordre: number;
}

export const DATES_CLES: DateCle[] = [
  { id: "date-1", label: "Ouverture", date: "15 Juillet 2026",    type: "ouverture", ordre: 1 },
  { id: "date-2", label: "Clôture",   date: "30 Août 2026",       type: "cloture",   ordre: 2 },
  { id: "date-3", label: "Concours",  date: "15 Septembre 2026",  type: "concours",  ordre: 3 },
];
