import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

export default defineConfig({
  // Identifiants du projet Sanity (https://sanity.io/manage)
  projectId: "q0m1l9gp",
  dataset: "production",

  // Nom affiché dans l'onglet du navigateur
  name: "fds-portail-studio",
  title: "FDS Portail — Studio",

  plugins: [
    structureTool(), // Interface de gestion de contenu standard
  ],

  schema: {
    types: schemaTypes,
  },
});
