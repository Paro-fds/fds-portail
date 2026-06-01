/**
 * Hook useActualites — FDS Portail
 *
 * Récupère les actualités depuis Sanity CMS avec fallback sur les données
 * statiques de constants.tsx si Sanity n'est pas configuré ou en cas d'erreur.
 *
 * Stratégie :
 * - Si VITE_SANITY_PROJECT_ID est défini → appel API Sanity
 * - Sinon                                → fallback sur NEWS de constants.tsx
 *
 * La requête GROQ retourne les 10 dernières actualités triées par date,
 * les pinned en premier.
 */

import { useState, useEffect } from "react";
import { sanityClient } from "../lib/sanityClient";
import { NEWS, type Actualite } from "../constants";

// Requête GROQ : récupère toutes les actualités publiées,
// triées : pinned en premier, puis par date décroissante
const ACTUALITES_QUERY = `*[_type == "actualite" && !(_id in path("drafts.**"))] | order(pinned desc, date desc)[0...10] {
  "id": _id,
  tag,
  title,
  "date": date,
  desc,
  pinned,
  actionType,
  actionUrl,
  "fichierPdfUrl": fichierPdf.asset->url
}`;

interface UseActualitesResult {
  news: Actualite[];
  loading: boolean;
  error: string | null;
  source: "sanity" | "static"; // Pour savoir d'où viennent les données (utile en debug)
}

export function useActualites(): UseActualitesResult {
  const [news, setNews] = useState<Actualite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<"sanity" | "static">("static");

  useEffect(() => {
    const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;

    // Si Sanity n'est pas configuré → utiliser les données statiques immédiatement
    if (!projectId) {
      setNews(NEWS);
      setSource("static");
      setLoading(false);
      return;
    }

    // Sanity configuré → appel API
    sanityClient
      .fetch<Actualite[]>(ACTUALITES_QUERY)
      .then((data) => {
        if (data && data.length > 0) {
          setNews(data);
          setSource("sanity");
        } else {
          // Sanity répond mais sans données → fallback statique
          setNews(NEWS);
          setSource("static");
        }
      })
      .catch((err) => {
        console.error("[useActualites] Erreur Sanity :", err);
        // Erreur réseau ou API → fallback gracieux sur les données statiques
        setNews(NEWS);
        setSource("static");
        setError("Impossible de charger les actualités depuis Sanity.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { news, loading, error, source };
}
