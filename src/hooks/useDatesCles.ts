/**
 * Hook useDatesClés — FDS Portail
 *
 * Récupère les dates clés d'admission depuis Sanity CMS,
 * avec fallback sur les données statiques si Sanity n'est pas configuré.
 */

import { useState, useEffect } from "react";
import { sanityClient } from "../lib/sanityClient";
import { DATES_CLES, type DateCle } from "../constants";

// Requête GROQ : toutes les dates clés triées par ordre d'affichage
const DATES_QUERY = `*[_type == "dateCle" && !(_id in path("drafts.**"))] | order(ordre asc) {
  "id": _id,
  label,
  date,
  type,
  ordre
}`;

interface UseDatesClesResult {
  dates: DateCle[];
  loading: boolean;
}

export function useDatesCles(): UseDatesClesResult {
  const [dates, setDates] = useState<DateCle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;

    if (!projectId) {
      setDates(DATES_CLES);
      setLoading(false);
      return;
    }

    sanityClient
      .fetch<DateCle[]>(DATES_QUERY)
      .then((data) => {
        setDates(data && data.length > 0 ? data : DATES_CLES);
      })
      .catch(() => {
        setDates(DATES_CLES); // Fallback gracieux
      })
      .finally(() => setLoading(false));
  }, []);

  return { dates, loading };
}
