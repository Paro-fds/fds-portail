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
    description: "Le premier cycle ou cycle propédeutique a pour objectif principal de donner la formation scientifique générale nécessaire à la poursuite d’études spécialisées en sciences pures et appliquées. Il vise également à améliorer les aptitudes des étudiants à s’exprimer par écrit et oral en français, et à comprendre des textes scientifiques en anglais.",
    category: "Propédeutique",
    duration: "2 ans",
    credits: "120 ECTS",
    code: "MPC-24"
  },
  {
    id: "genie-civil",
    name: "Génie Civil",
    description: "Le programme de génie civil a pour mission première la formation d’ingénieurs qualifiés dans le domaine du bâtiment et des travaux publics. Il permet de travailler dans tous les secteurs de la construction (bâtiments, travaux publics, ouvrages d’art, géotechnique, structures, travaux maritimes, ouvrages pour l’énergie…) et ouvre à de très nombreux métiers.",
    category: "Génie",
    duration: "3 ans",
    credits: "180 ECTS",
    code: "GCV-24"
  },
  {
    id: "genie-electromecanique",
    name: "Génie Électromécanique",
    description: "La spécialité Génie électromécanique est un équilibre entre une formation en électrique (électrotechnique) et mécanique. Cette formation répond aux besoins des industries du secteur prive et étatique ayant besoin d’ingénieurs à haut potentiel et de fortes compétences scientifiques et techniques.",
    category: "Génie",
    duration: "3 ans",
    credits: "180 ECTS",
    code: "GEM-24"
  },
  {
    id: "genie-electronique",
    name: "Génie Électronique",
    description: "Le programme de génie électronique forme des ingénieurs dont la principale caractéristique est la polyvalence. C’est une formation générale qui intègre l’électrique, l’électronique, les télécommunications et l’informatique. Ce programme facilite l’intégration professionnelle.",
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
    description: "La section d’Architecture aboutit à un diplôme d’Ingénieur-Architecte. Le programme de formation recherche l’équilibre entre la connaissance des matériaux et des calculs de leur mise en œuvre d’une part ; l’histoire et l’esthétique de l’espace ainsi que les méthodes et pratiques de sa production d’autre part.",
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
