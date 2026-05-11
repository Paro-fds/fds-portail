import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { LogOut, CheckCircle2, XCircle, Clock, Eye, ExternalLink, FileText, Image as ImageIcon, Loader2 } from "lucide-react";

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
  created_at: string;
  documents: DocumentSoumis[];
}

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
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [openingPdf, setOpeningPdf] = useState<string | null>(null);

  /**
   * Fetch le PDF via le proxy authentifié → crée une Blob URL → ouvre dans un nouvel onglet.
   * C'est la seule méthode fiable pour envoyer le token et afficher le PDF inline.
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
      // Libérer la mémoire après 60s
      setTimeout(() => URL.revokeObjectURL(blobUrl), 60000);
    } catch (e) {
      alert("Impossible d'ouvrir le document. Vérifiez votre connexion.");
    } finally {
      setOpeningPdf(null);
    }
  };


  const fetchCandidatures = async () => {
    try {
      const res = await fetch("/api/admin/candidatures", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setCandidatures(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidatures();
  }, []);

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
        fetchCandidatures();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "valide": return <span className="bg-success/10 text-success px-2 py-0.5 text-[10px] font-bold uppercase rounded-sm border border-success/20">Validé</span>;
      case "rejete": return <span className="bg-error/10 text-error px-2 py-0.5 text-[10px] font-bold uppercase rounded-sm border border-error/20">Rejeté</span>;
      default: return <span className="bg-warning/10 text-warning px-2 py-0.5 text-[10px] font-bold uppercase rounded-sm border border-warning/20">En Attente</span>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-end border-b border-outline-variant pb-6 mb-8">
        <div>
          <h1 className="font-display text-3xl font-black uppercase tracking-tight text-primary-container">Tableau de Bord</h1>
          <p className="text-on-surface-variant mt-1">Gestion des admissions FDS</p>
        </div>
        <button onClick={logout} className="fds-button-secondary text-sm flex items-center gap-2 h-9">
          <LogOut className="w-4 h-4" /> Déconnexion
        </button>
      </div>

      {/* Modal de prévisualisation — Images uniquement */}
      {previewUrl && !isPdf(previewUrl) && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewUrl(null)}
        >
          <div
            className="bg-surface max-w-3xl w-full rounded-lg overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b border-outline-variant">
              <span className="font-display font-bold">Prévisualisation</span>
              <div className="flex gap-2">
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="fds-button-secondary text-xs flex items-center gap-1 h-8 px-3"
                >
                  <ExternalLink className="w-3 h-3" /> Ouvrir
                </a>
                <button
                  onClick={() => setPreviewUrl(null)}
                  className="w-8 h-8 flex items-center justify-center text-outline hover:text-on-surface border border-outline-variant"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-4 flex items-center justify-center min-h-[300px]">
              <img
                src={previewUrl}
                alt="Prévisualisation"
                className="max-w-full max-h-[70vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-20 text-outline">Chargement des dossiers...</div>
      ) : (
        <div className="flex flex-col gap-4">
          {candidatures.length === 0 ? (
            <div className="bg-surface-container-low p-10 text-center border border-outline-variant text-on-surface-variant">
              Aucun dossier de candidature reçu pour le moment.
            </div>
          ) : (
            candidatures.map((c) => (
              <div key={c.id} className="bg-surface border border-outline-variant">
                {/* Ligne Résumé */}
                <div 
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-surface-container-low transition-colors"
                  onClick={() => setExpandedId(expandedId === c.id ? null : c.id)}
                >
                  <div className="flex items-center gap-6">
                    <div className="font-mono text-sm font-black bg-primary-container/10 px-2 py-1 text-primary-container">
                      {c.reference_dossier}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg">{c.prenom} {c.nom}</h3>
                      <p className="text-xs text-outline">{c.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-xs text-on-surface-variant flex gap-2">
                      <span className="font-bold text-success">{c.documents.filter(d => d.statut_validation === "valide").length} Validés</span>
                      <span>/</span>
                      <span className="font-bold">{c.documents.length} Docs</span>
                    </div>
                    <Eye className={`w-5 h-5 text-outline transition-transform ${expandedId === c.id ? "rotate-180" : ""}`} />
                  </div>
                </div>

                {/* Détails étendus (Documents) */}
                {expandedId === c.id && (
                  <div className="p-4 bg-surface-container-lowest border-t border-outline-variant grid gap-4">
                    <h4 className="fds-label-caps">Documents soumis</h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {c.documents.map((doc) => (
                        <div key={doc.id} className="border border-outline-variant bg-surface p-4 flex flex-col gap-4">
                          <div className="flex justify-between items-start">
                            <span className="font-medium text-sm">{doc.nom_document}</span>
                            {getStatusBadge(doc.statut_validation)}
                          </div>

                          {/* Miniature ou icône PDF */}
                          {isPdf(doc.fichier_url) ? (
                            // PDF → fetch authentifié → Blob URL → nouvel onglet
                            <button
                              onClick={() => openPdf(doc.fichier_url)}
                              disabled={openingPdf === doc.fichier_url}
                              className="w-full bg-surface-container-low border border-outline-variant h-24 flex flex-col items-center justify-center gap-1 hover:bg-primary-container/10 hover:border-primary-container/30 transition-colors group disabled:opacity-60"
                              title="Cliquer pour ouvrir le PDF"
                            >
                              {openingPdf === doc.fichier_url ? (
                                <><Loader2 className="w-6 h-6 animate-spin text-primary-container" /><span className="text-[10px] font-mono text-outline">Chargement...</span></>
                              ) : (
                                <><FileText className="w-8 h-8 text-outline group-hover:text-primary-container transition-colors" /><span className="text-[10px] font-mono uppercase text-outline group-hover:text-primary-container">Ouvrir PDF</span></>
                              )}
                            </button>
                          ) : (
                            // Image → ouvre le modal de prévisualisation
                            <div
                              className="bg-surface-container-low border border-outline-variant h-24 flex items-center justify-center cursor-pointer hover:bg-surface-container transition-colors overflow-hidden"
                              onClick={() => setPreviewUrl(doc.fichier_url)}
                              title="Cliquer pour prévisualiser"
                            >
                              <img
                                src={doc.fichier_url}
                                alt={doc.nom_document}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between mt-auto pt-2">
                            {isPdf(doc.fichier_url) ? (
                              <button
                                onClick={() => openPdf(doc.fichier_url)}
                                disabled={openingPdf === doc.fichier_url}
                                className="text-xs text-primary font-bold flex items-center gap-1 hover:underline disabled:opacity-50"
                              >
                                <ExternalLink className="w-3 h-3" />
                                {openingPdf === doc.fichier_url ? "Chargement..." : "Ouvrir le PDF"}
                              </button>
                            ) : (
                              <button
                                onClick={() => setPreviewUrl(doc.fichier_url)}
                                className="text-xs text-primary font-bold flex items-center gap-1 hover:underline"
                              >
                                <Eye className="w-3 h-3" /> Prévisualiser
                              </button>
                            )}
                            <div className="flex gap-2">
                              <button 
                                onClick={() => updateDocumentStatus(doc.id, "valide")}
                                disabled={doc.statut_validation === "valide"}
                                className="w-8 h-8 flex items-center justify-center bg-success/10 text-success border border-success/20 hover:bg-success hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Valider"
                              >
                                <CheckCircle2 className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => updateDocumentStatus(doc.id, "rejete")}
                                disabled={doc.statut_validation === "rejete"}
                                className="w-8 h-8 flex items-center justify-center bg-error/10 text-error border border-error/20 hover:bg-error hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Rejeter"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => updateDocumentStatus(doc.id, "en_attente")}
                                disabled={doc.statut_validation === "en_attente"}
                                className="w-8 h-8 flex items-center justify-center bg-warning/10 text-warning border border-warning/20 hover:bg-warning hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Remettre en attente"
                              >
                                <Clock className="w-4 h-4" />
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
    </div>
  );
}


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
  created_at: string;
  documents: DocumentSoumis[];
}

export default function AdminDashboard() {
  const { token, logout } = useAuth();
  const [candidatures, setCandidatures] = useState<Candidature[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchCandidatures = async () => {
    try {
      const res = await fetch("/api/admin/candidatures", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setCandidatures(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidatures();
  }, []);

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
        fetchCandidatures(); // Recharger les données pour MAJ UI
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "valide": return <span className="bg-success/10 text-success px-2 py-0.5 text-[10px] font-bold uppercase rounded-sm border border-success/20">Validé</span>;
      case "rejete": return <span className="bg-error/10 text-error px-2 py-0.5 text-[10px] font-bold uppercase rounded-sm border border-error/20">Rejeté</span>;
      default: return <span className="bg-warning/10 text-warning px-2 py-0.5 text-[10px] font-bold uppercase rounded-sm border border-warning/20">En Attente</span>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-end border-b border-outline-variant pb-6 mb-8">
        <div>
          <h1 className="font-display text-3xl font-black uppercase tracking-tight text-primary-container">Tableau de Bord</h1>
          <p className="text-on-surface-variant mt-1">Gestion des admissions FDS</p>
        </div>
        <button onClick={logout} className="fds-button-secondary text-sm flex items-center gap-2 h-9">
          <LogOut className="w-4 h-4" /> Déconnexion
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-20 text-outline">Chargement des dossiers...</div>
      ) : (
        <div className="flex flex-col gap-4">
          {candidatures.length === 0 ? (
            <div className="bg-surface-container-low p-10 text-center border border-outline-variant text-on-surface-variant">
              Aucun dossier de candidature reçu pour le moment.
            </div>
          ) : (
            candidatures.map((c) => (
              <div key={c.id} className="bg-surface border border-outline-variant">
                {/* Ligne Résumé */}
                <div 
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-surface-container-low transition-colors"
                  onClick={() => setExpandedId(expandedId === c.id ? null : c.id)}
                >
                  <div className="flex items-center gap-6">
                    <div className="font-mono text-sm font-black bg-primary-container/10 px-2 py-1 text-primary-container">
                      {c.reference_dossier}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg">{c.prenom} {c.nom}</h3>
                      <p className="text-xs text-outline">{c.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-xs text-on-surface-variant flex gap-2">
                      <span className="font-bold text-success">{c.documents.filter(d => d.statut_validation === "valide").length} Validés</span>
                      <span>/</span>
                      <span className="font-bold">{c.documents.length} Docs</span>
                    </div>
                    <Eye className={`w-5 h-5 text-outline transition-transform ${expandedId === c.id ? "rotate-180" : ""}`} />
                  </div>
                </div>

                {/* Détails étendus (Documents) */}
                {expandedId === c.id && (
                  <div className="p-4 bg-surface-container-lowest border-t border-outline-variant grid gap-4">
                    <h4 className="fds-label-caps">Documents soumis</h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {c.documents.map((doc) => (
                        <div key={doc.id} className="border border-outline-variant bg-surface p-4 flex flex-col gap-4">
                          <div className="flex justify-between items-start">
                            <span className="font-medium text-sm">{doc.nom_document}</span>
                            {getStatusBadge(doc.statut_validation)}
                          </div>
                          
                          <div className="flex items-center justify-between mt-auto pt-4">
                            <a href={doc.fichier_url} target="_blank" rel="noreferrer" className="text-xs text-primary font-bold flex items-center gap-1 hover:underline">
                              <ExternalLink className="w-3 h-3" /> Ouvrir le fichier
                            </a>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => updateDocumentStatus(doc.id, "valide")}
                                disabled={doc.statut_validation === "valide"}
                                className="w-8 h-8 flex items-center justify-center bg-success/10 text-success border border-success/20 hover:bg-success hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Valider"
                              >
                                <CheckCircle2 className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => updateDocumentStatus(doc.id, "rejete")}
                                disabled={doc.statut_validation === "rejete"}
                                className="w-8 h-8 flex items-center justify-center bg-error/10 text-error border border-error/20 hover:bg-error hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Rejeter"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => updateDocumentStatus(doc.id, "en_attente")}
                                disabled={doc.statut_validation === "en_attente"}
                                className="w-8 h-8 flex items-center justify-center bg-warning/10 text-warning border border-warning/20 hover:bg-warning hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Remettre en attente"
                              >
                                <Clock className="w-4 h-4" />
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
    </div>
  );
}
