import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/Button";

interface DocumentSoumis {
  id: string;
  nom_document: string;
  fichier_url: string;
  statut_validation: "en_attente" | "valide" | "rejete";
  soumis_le: string;
}

interface Candidature {
  id: string;
  reference_dossier: string;
  prenom: string;
  nom: string;
  email: string;
  statut_paiement?: string;
  methode_paiement?: string;
  reference_paiement?: string;
  deplacement_physique?: boolean | null;
  created_at: string;
  documents: DocumentSoumis[];
}

interface CandidaturesPage {
  total: number;
  page: number;
  limit: number;
  items: Candidature[];
}

const PAGE_SIZE = 20;

/** Retourne l'URL du proxy backend pour afficher un document avec le bon Content-Type */
function getProxyUrl(url: string, token: string): string {
  return `/api/admin/proxy-document?url=${encodeURIComponent(url)}`;
}

function isPdf(url: string): boolean {
  return url.toLowerCase().includes(".pdf") || url.toLowerCase().includes("/raw/");
}

export default function AdminDashboard() {
  const { token, logout } = useAuth();
  const [candidatures, setCandidatures] = useState<Candidature[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [openingPdf, setOpeningPdf] = useState<string | null>(null);

  /**
   * Fetch le PDF via le proxy authentifié → crée une Blob URL → ouvre dans un nouvel onglet.
   */
  const openPdf = async (cloudinaryUrl: string) => {
    setOpeningPdf(cloudinaryUrl);
    try {
      const res = await fetch(`/api/admin/proxy-document?url=${encodeURIComponent(cloudinaryUrl)}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Accès refusé");
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, "_blank");
      setTimeout(() => URL.revokeObjectURL(blobUrl), 60000);
    } catch (e) {
      alert("Impossible d'ouvrir le document. Vérifiez votre connexion.");
    } finally {
      setOpeningPdf(null);
    }
  };


  const fetchCandidatures = async (pageNum: number = page) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `/api/admin/candidatures?page=${pageNum}&limit=${PAGE_SIZE}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.ok) {
        const data: CandidaturesPage = await res.json();
        setCandidatures(data.items);
        setTotal(data.total);
        setPage(data.page);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidatures(page);
  }, [page, token]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const updateDocumentStatus = async (docId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/documents/${docId}/statut`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ statut: newStatus })
      });
      if (res.ok) {
        fetchCandidatures(page);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "valide": return <span className="bg-tertiary/10 text-tertiary px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md flex items-center gap-1 w-max"><span className="material-symbols-outlined text-xs">check_circle</span> Validé</span>;
      case "rejete": return <span className="bg-error/10 text-error px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md flex items-center gap-1 w-max"><span className="material-symbols-outlined text-xs">cancel</span> Rejeté</span>;
      default: return <span className="bg-secondary/10 text-secondary px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md flex items-center gap-1 w-max"><span className="material-symbols-outlined text-xs">schedule</span> En Attente</span>;
    }
  };

  const getPaymentBadge = (status?: string, methode?: string, reference?: string) => {
    if (status === "paye") {
      const isMonCash = methode === "MonCash";
      return (
        <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md flex items-center gap-1 w-max ${isMonCash ? 'bg-[#DA291C]/10 text-[#DA291C]' : 'bg-[#004B87]/10 text-[#004B87]'}`} title={`Réf: ${reference}`}>
          <span className="material-symbols-outlined text-xs">payments</span> Payé via {methode}
        </span>
      );
    }
    return <span className="bg-error/10 text-error px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md flex items-center gap-1 w-max"><span className="material-symbols-outlined text-xs">money_off</span> Non payé</span>;
  };

  const getDeplacementBadge = (value?: boolean | null) => {
    if (value === null || value === undefined) {
      return (
        <span className="bg-surface-container text-secondary px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md w-max">
          Déplacement non renseigné
        </span>
      );
    }
    if (value) {
      return (
        <span className="bg-error-container/30 text-error px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md flex items-center gap-1 w-max">
          <span className="material-symbols-outlined text-xs">directions_walk</span> Déplacement requis
        </span>
      );
    }
    return (
      <span className="bg-tertiary/10 text-tertiary px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md flex items-center gap-1 w-max">
        <span className="material-symbols-outlined text-xs">cloud_done</span> 100 % en ligne
      </span>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end pb-6 mb-10 gap-4">
        <div>
          <h1 className="font-headline text-3xl font-extrabold uppercase tracking-tight text-primary">Tableau de Bord</h1>
          <p className="font-body text-secondary mt-1">Gestion des admissions FDS</p>
        </div>
        <Button variant="outline" onClick={logout} icon="logout">
          Déconnexion
        </Button>
      </div>

      {/* Modal de prévisualisation — Images uniquement */}
      {previewUrl && !isPdf(previewUrl) && (
        <div
          className="fixed inset-0 bg-inverse-surface/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewUrl(null)}
        >
          <div
            className="bg-surface-container-lowest max-w-4xl w-full rounded-xl overflow-hidden shadow-2xl border border-outline-variant/15"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4">
              <span className="font-headline font-bold text-on-surface">Prévisualisation</span>
              <div className="flex gap-2">
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-surface-container-low text-primary font-headline text-xs font-bold rounded-md hover:bg-surface-container transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">open_in_new</span> Ouvrir
                </a>
                <button
                  onClick={() => setPreviewUrl(null)}
                  className="w-8 h-8 flex items-center justify-center text-secondary hover:text-on-surface hover:bg-surface-container-low rounded-md transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </div>
            </div>
            <div className="bg-surface-container p-6 flex items-center justify-center min-h-[400px]">
              <img
                src={previewUrl}
                alt="Prévisualisation"
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-sm"
              />
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <span className="material-symbols-outlined animate-spin text-4xl text-primary">hourglass_empty</span>
          <span className="font-body text-secondary">Chargement des dossiers...</span>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {candidatures.length === 0 ? (
            <div className="bg-surface-container-lowest p-16 rounded-xl border border-outline-variant/15 flex flex-col items-center justify-center gap-4 shadow-[0_4px_12px_rgba(17,28,45,0.04)]">
              <span className="material-symbols-outlined text-4xl text-outline">folder_open</span>
              <p className="font-body text-on-surface-variant text-center">Aucun dossier de candidature reçu pour le moment.</p>
            </div>
          ) : (
            candidatures.map((c) => (
              <div key={c.id} className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 overflow-hidden shadow-[0_4px_12px_rgba(17,28,45,0.04)] hover:shadow-[0_8px_24px_rgba(17,28,45,0.08)] transition-shadow">
                {/* Ligne Résumé */}
                <div 
                  className={`p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between cursor-pointer transition-colors ${expandedId === c.id ? "bg-surface-container-low" : "hover:bg-surface-container-low"}`}
                  onClick={() => setExpandedId(expandedId === c.id ? null : c.id)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 sm:mb-0">
                    <div className="font-mono text-xs font-black tracking-widest bg-primary-container/10 px-3 py-1.5 rounded-md text-primary inline-flex items-center gap-2 w-max">
                      <span className="material-symbols-outlined text-sm">badge</span>
                      {c.reference_dossier}
                    </div>
                    <div>
                      <h3 className="font-headline font-extrabold text-xl text-on-surface">{c.prenom} {c.nom}</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center flex-wrap gap-2 sm:gap-4 mt-1">
                        <p className="font-body text-sm text-secondary">{c.email}</p>
                        {getPaymentBadge(c.statut_paiement, c.methode_paiement, c.reference_paiement)}
                        {getDeplacementBadge(c.deplacement_physique)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 self-end sm:self-auto">
                    <div className="font-body text-sm text-secondary flex items-center gap-2">
                      <span className={`font-bold ${c.documents.filter(d => d.statut_validation === "valide").length === c.documents.length ? "text-tertiary" : "text-primary"}`}>
                        {c.documents.filter(d => d.statut_validation === "valide").length} Validés
                      </span>
                      <span>/</span>
                      <span className="font-bold">{c.documents.length} Docs</span>
                    </div>
                    <span className={`material-symbols-outlined text-secondary transition-transform duration-300 ${expandedId === c.id ? "rotate-180" : ""}`}>
                      expand_more
                    </span>
                  </div>
                </div>

                {/* Détails étendus (Documents) */}
                {expandedId === c.id && (
                  <div className="p-6 bg-surface-container-lowest border-t border-outline-variant/15">
                    <h4 className="font-label text-xs font-bold uppercase tracking-widest text-secondary mb-6 flex items-center gap-2">
                      <span className="material-symbols-outlined text-lg">folder_shared</span>
                      Documents soumis
                    </h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {c.documents.map((doc) => (
                        <div key={doc.id} className="bg-surface-container-low rounded-xl p-5 flex flex-col gap-5">
                          <div className="flex justify-between items-start gap-4">
                            <span className="font-headline font-bold text-on-surface">{doc.nom_document}</span>
                            {getStatusBadge(doc.statut_validation)}
                          </div>

                          {/* Miniature ou icône PDF */}
                          {isPdf(doc.fichier_url) ? (
                            <button
                              onClick={() => openPdf(doc.fichier_url)}
                              disabled={openingPdf === doc.fichier_url}
                              className="w-full bg-surface-container-lowest rounded-lg h-32 flex flex-col items-center justify-center gap-2 hover:bg-primary-container/5 hover:text-primary transition-colors group disabled:opacity-60 border border-outline-variant/15"
                              title="Cliquer pour ouvrir le PDF"
                            >
                              {openingPdf === doc.fichier_url ? (
                                <><span className="material-symbols-outlined animate-spin text-3xl text-primary">hourglass_empty</span><span className="text-[10px] font-bold uppercase tracking-widest text-secondary">Chargement...</span></>
                              ) : (
                                <><span className="material-symbols-outlined text-4xl text-secondary group-hover:text-primary transition-colors">description</span><span className="font-label text-[10px] font-bold uppercase tracking-widest text-secondary group-hover:text-primary">Ouvrir PDF</span></>
                              )}
                            </button>
                          ) : (
                            <div
                              className="bg-surface-container-lowest rounded-lg border border-outline-variant/15 h-32 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity overflow-hidden relative group"
                              onClick={() => setPreviewUrl(doc.fichier_url)}
                              title="Cliquer pour prévisualiser"
                            >
                              <img
                                src={doc.fichier_url}
                                alt={doc.nom_document}
                                className="h-full w-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="material-symbols-outlined text-white text-3xl">visibility</span>
                              </div>
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/15">
                            {isPdf(doc.fichier_url) ? (
                              <button
                                onClick={() => openPdf(doc.fichier_url)}
                                disabled={openingPdf === doc.fichier_url}
                                className="font-headline text-xs text-primary font-bold flex items-center gap-1.5 hover:underline disabled:opacity-50"
                              >
                                <span className="material-symbols-outlined text-sm">open_in_new</span>
                                {openingPdf === doc.fichier_url ? "Chargement..." : "Ouvrir le PDF"}
                              </button>
                            ) : (
                              <button
                                onClick={() => setPreviewUrl(doc.fichier_url)}
                                className="font-headline text-xs text-primary font-bold flex items-center gap-1.5 hover:underline"
                              >
                                <span className="material-symbols-outlined text-sm">visibility</span> Prévisualiser
                              </button>
                            )}
                            <div className="flex gap-2 bg-surface-container p-1 rounded-md">
                              <button 
                                onClick={() => updateDocumentStatus(doc.id, "valide")}
                                disabled={doc.statut_validation === "valide"}
                                className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${doc.statut_validation === 'valide' ? 'bg-tertiary text-white' : 'text-secondary hover:bg-tertiary/20 hover:text-tertiary'}`}
                                title="Valider"
                              >
                                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                              </button>
                              <button 
                                onClick={() => updateDocumentStatus(doc.id, "rejete")}
                                disabled={doc.statut_validation === "rejete"}
                                className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${doc.statut_validation === 'rejete' ? 'bg-error text-white' : 'text-secondary hover:bg-error/20 hover:text-error'}`}
                                title="Rejeter"
                              >
                                <span className="material-symbols-outlined text-[20px]">cancel</span>
                              </button>
                              <button 
                                onClick={() => updateDocumentStatus(doc.id, "en_attente")}
                                disabled={doc.statut_validation === "en_attente"}
                                className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${doc.statut_validation === 'en_attente' ? 'bg-secondary text-white' : 'text-secondary hover:bg-secondary/20 hover:text-secondary'}`}
                                title="Remettre en attente"
                              >
                                <span className="material-symbols-outlined text-[20px]">schedule</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {!isLoading && total > PAGE_SIZE && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-outline-variant/30">
          <p className="font-body text-sm text-secondary">
            {total} dossier{total > 1 ? "s" : ""} — page {page} / {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
            >
              Précédent
            </Button>
            <Button
              variant="outline"
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= totalPages}
            >
              Suivant
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
