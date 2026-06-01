/**
 * Client Sanity — FDS Portail
 *
 * Configuration de la connexion à l'API Sanity.
 * Le Project ID et le dataset sont lus depuis les variables d'environnement
 * (anti-OWASP A02 : secrets hors du code source).
 *
 * Variables à définir dans .env :
 *   VITE_SANITY_PROJECT_ID=votre_project_id
 *   VITE_SANITY_DATASET=production
 */

import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || "",
  dataset: import.meta.env.VITE_SANITY_DATASET || "production",
  apiVersion: "2024-01-01", // Date figée — évite les breaking changes d'API
  useCdn: true,             // CDN Sanity : lecture rapide, cache ~60s (suffisant pour des actualités)
});
