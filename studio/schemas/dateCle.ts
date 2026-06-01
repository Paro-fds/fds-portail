// Schéma "dateCle" — FDS Portail
// Représente une date clé du calendrier d'admission (Ouverture, Clôture, Concours…)

export const dateCleSchema = {
  name: "dateCle",
  title: "Date Clé",
  type: "document",
  fields: [
    {
      name: "label",
      title: "Étiquette",
      type: "string",
      description: 'Texte court affiché au-dessus de la date. Ex : "Ouverture", "Clôture", "Concours"',
      validation: (Rule: any) => Rule.required().max(30),
    },
    {
      name: "date",
      title: "Date (texte lisible)",
      type: "string",
      description: 'Exemple : "15 Juillet 2026"',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "type",
      title: "Type de date",
      type: "string",
      description: "Détermine la couleur et l'icône affichées sur la carte",
      options: {
        list: [
          { title: "Ouverture (bleu clair)", value: "ouverture" },
          { title: "Clôture (rouge)", value: "cloture" },
          { title: "Concours (bleu foncé — mis en avant)", value: "concours" },
          { title: "Autre (neutre)", value: "autre" },
        ],
        layout: "radio",
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "ordre",
      title: "Ordre d'affichage",
      type: "number",
      description: "Les dates sont affichées du plus petit au plus grand. Ex : 1, 2, 3",
      validation: (Rule: any) => Rule.required().integer().min(1),
    },
  ],
  // Aperçu dans la liste des documents
  preview: {
    select: {
      title: "label",
      subtitle: "date",
    },
  },
  // Tri par défaut dans le Studio
  orderings: [
    {
      title: "Ordre d'affichage",
      name: "ordreAsc",
      by: [{ field: "ordre", direction: "asc" }],
    },
  ],
};
