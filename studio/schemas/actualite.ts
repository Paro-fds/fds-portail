// Schéma "actualite" — FDS Portail
// Définit la structure d'un article d'actualité dans Sanity Studio

export const actualiteSchema = {
  name: "actualite",
  title: "Actualité / Annonce",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule: any) => Rule.required().min(5).max(120),
    },
    {
      name: "tag",
      title: "Catégorie",
      type: "string",
      options: {
        list: [
          { title: "Concours", value: "Concours" },
          { title: "Annonce", value: "Annonce" },
          { title: "Recherche", value: "Recherche" },
          { title: "Infrastructures", value: "Infrastructures" },
          { title: "Événement", value: "Événement" },
        ],
        layout: "radio",
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "date",
      title: "Date (texte lisible)",
      type: "string",
      description: 'Exemple : "15 Juin 2026"',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "desc",
      title: "Résumé",
      type: "text",
      rows: 3,
      description: "Court résumé affiché sur la carte (2–3 phrases max)",
      validation: (Rule: any) => Rule.required().max(300),
    },
    {
      name: "pinned",
      title: "À la une",
      type: "boolean",
      description: "Si activé, cet article apparaît en premier sur la page d'accueil",
      initialValue: false,
    },

    // ── Action (bouton de la carte) ──────────────────────────────────────────
    {
      name: "actionType",
      title: "Type d'action",
      type: "string",
      description: "Détermine le libellé et l'icône du bouton affiché sur la carte",
      options: {
        list: [
          { title: "Lire l'article  →", value: "lire" },
          { title: "⬇  Télécharger (PDF, résultats…)", value: "telecharger" },
          { title: "↗  Voir / Ouvrir (lien externe)", value: "voir" },
          { title: "✏  S'inscrire / Postuler", value: "inscrire" },
        ],
        layout: "radio",
      },
      initialValue: "lire",
    },
    {
      name: "actionUrl",
      title: "URL de l'action",
      type: "url",
      description: "Lien vers un article ou une page externe. Laisser vide si vous uploadez un PDF ci-dessous.",
      validation: (Rule: any) =>
        Rule.uri({ allowRelative: true, scheme: ["http", "https", "/"] }),
    },
    {
      name: "fichierPdf",
      title: "📎 Fichier PDF à télécharger",
      type: "file",
      description: "Uploadez directement un PDF (résultats, règlement, formulaire…). Prioritaire sur l'URL si les deux sont remplis.",
      options: {
        accept: ".pdf",
      },
    },
  ],

  // Aperçu dans la liste des documents Sanity
  preview: {
    select: {
      title: "title",
      subtitle: "tag",
    },
  },
};
