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

export const PROGRAMS: Program[] = [
  {
    id: "genie-electronique",
    name: "Génie Électronique",
    description: "Formation polyvalente intégrant l'électrique, l'électronique, les télécommunications et l'informatique.",
    category: "Génie",
    duration: "10 Semestres",
    credits: "300 ECTS",
    code: "GEL-24",
    areas: [
      { name: "Électrique", description: "Systèmes de puissance, distribution et conversion d'énergie.", icon: "bolt" },
      { name: "Électronique", description: "Circuits analogiques et numériques, microcontrôleurs.", icon: "cpu" },
      { name: "Télécommunications", description: "Traitement du signal, réseaux et transmission de données.", icon: "tower-control" },
      { name: "Informatique", description: "Programmation embarquée, architecture logicielle et IoT.", icon: "terminal" }
    ],
    imagePrompt: "A highly detailed, technical photograph showing a modern electronics laboratory at a university. Focus on an intricate circuit board being tested with precise oscilloscopes and glowing digital multimeters. Institutional navy blue and silver accents."
  },
  {
    id: "genie-civil",
    name: "Génie Civil",
    description: "Conception, construction et entretien d'infrastructures. Bâtiments, ponts, routes.",
    category: "Génie",
    duration: "10 Semestres",
    credits: "300 ECTS",
    code: "GCV-24"
  },
  {
    id: "genie-electromecanique",
    name: "Génie Électromécanique",
    description: "Systèmes combinant mécanique et électricité. Énergie, machines thermiques.",
    category: "Génie",
    duration: "10 Semestres",
    credits: "300 ECTS",
    code: "GEM-24"
  },
  {
    id: "architecture",
    name: "Architecture",
    description: "Art et technique de la conception d'espaces bâtis, urbanisme et aménagement.",
    category: "Génie",
    duration: "10 Semestres",
    credits: "300 ECTS",
    code: "ARC-24"
  }
];
