import React, { useState, useRef } from "react";
import { Search, Loader2, CheckCircle2, Clock, XCircle, FileText, ArrowLeft, Upload, RefreshCw, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

interface DocumentSoumis {
  id: string;
  document_requis_id: string;
  nom_document: string;
  statut_validation: "en_attente" | "valide" | "rejete";
  soumis_le: string;
}

interface TrackingData {
  reference_dossier: string;
  candidat_id: string;
  prenom: string;
  nom: string;
  documents: DocumentSoumis[];
}

export default function Tracking() {
  const [reference, setReference] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TrackingData | null>(null);

  // États pour le remplacement de document
  const [uploadingDocId, setUploadingDocId] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reference.trim()) return;
    
    setIsSearching(true);
    setError(null);
    setData(null);
    setUploadError(null);
    setUploadSuccess(null);

    try {
      const res = await fetch(`/api/candidature/${reference}`);
      if (!res.ok) {
        if (res.status === 404) throw new Error("Dossier introuvable. Vérifiez votre référence.");
        throw new Error("Une erreur est survenue lors de la recherche.");
      }
      const result = await res.json();
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSearching(false);
    }
  };

  const handleReplaceDocument = async (doc: DocumentSoumis, file: File) => {
    if (!data) return;

    setUploadingDocId(doc.id);
    setUploadError(null);
    setUploadSuccess(null);

    // Vérifications côté client (miroir des règles backend)
    const allowedExts = [".pdf", ".jpg", ".jpeg"];
    const ext = file.name.toLowerCase().slice(file.name.lastIndexOf("."));
    if (!allowedExts.includes(ext)) {
      setUploadError("Format invalide. Seuls PDF, JPG et JPEG sont acceptés.");
      setUploadingDocId(null);
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Le fichier dépasse la limite de 5 Mo.");
      setUploadingDocId(null);
      return;
    }

    try {
      const payload = new FormData();
      payload.append("candidat_id", data.candidat_id);
      payload.append("document_requis_id", doc.document_requis_id);
      payload.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: payload });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || "Erreur lors du remplacement.");
      }

      // Rafraîchir les données du dossier après succès
      const refreshRes = await fetch(`/api/candidature/${data.reference_dossier}`);
      const refreshed = await refreshRes.json();
      setData(refreshed);
      setUploadSuccess(`Le document "${doc.nom_document}" a été remplacé. Il est de nouveau en attente de validation.`);
    } catch (err: any) {
      setUploadError(err.message);
    } finally {
      setUploadingDocId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "valide":
        return <span className="flex items-center gap-1 bg-success/10 text-success px-3 py-1 text-xs font-bold uppercase rounded-full border border-success/20"><CheckCircle2 className="w-3 h-3" /> Validé</span>;
      case "rejete":
        return <span className="flex items-center gap-1 bg-error/10 text-error px-3 py-1 text-xs font-bold uppercase rounded-full border border-error/20"><XCircle className="w-3 h-3" /> Rejeté</span>;
      default:
        return <span className="flex items-center gap-1 bg-warning/10 text-warning px-3 py-1 text-xs font-bold uppercase rounded-full border border-warning/20"><Clock className="w-3 h-3" /> En Attente</span>;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-16">
      <AnimatePresence mode="wait">
        {!data ? (
          <motion.div
            key="search"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-surface border border-outline-variant p-6 md:p-10 text-center"
          >
            <div className="w-16 h-16 bg-primary-container/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-primary-container" />
            </div>
            <h1 className="font-display text-3xl font-bold mb-2">Suivi de Dossier</h1>
            <p className="text-on-surface-variant mb-8 max-w-md mx-auto">
              Entrez la référence officielle (CAN-2026-XXXX) qui vous a été fournie lors de la soumission de votre candidature.
            </p>

            <form onSubmit={handleSearch} className="max-w-sm mx-auto flex flex-col gap-4">
              <div className="flex flex-col gap-2 text-left">
                <label className="fds-label-caps" htmlFor="ref">Référence du Dossier</label>
                <input 
                  type="text" id="ref" 
                  placeholder="CAN-2026-..."
                  className="h-12 border border-outline-variant px-4 text-center font-mono text-lg uppercase focus:outline-none focus:border-primary-container transition-colors"
                  value={reference} onChange={e => setReference(e.target.value.toUpperCase())}
                />
              </div>

              {error && (
                <div className="text-error text-sm font-medium bg-error/10 p-3">
                  {error}
                </div>
              )}

              <button 
                type="submit" 
                disabled={isSearching || !reference.trim()}
                className="fds-button-primary h-12 flex justify-center items-center gap-2 mt-2 disabled:opacity-50"
              >
                {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : "Rechercher mon dossier"}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface border border-outline-variant p-6 md:p-10"
          >
            <div className="flex justify-between items-start mb-8 pb-6 border-b border-outline-variant">
              <div>
                <span className="fds-label-caps text-outline mb-1 block">Dossier Candidat</span>
                <h1 className="font-display text-3xl font-bold">{data.prenom} {data.nom}</h1>
              </div>
              <div className="text-right">
                <span className="font-mono text-xl font-black text-primary-container bg-primary-container/10 px-3 py-1">
                  {data.reference_dossier}
                </span>
              </div>
            </div>

            {/* Messages de feedback upload */}
            {uploadSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2 bg-success/10 text-success border border-success/20 p-4 mb-6 text-sm font-medium"
              >
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                {uploadSuccess}
              </motion.div>
            )}
            {uploadError && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2 bg-error/10 text-error border border-error/20 p-4 mb-6 text-sm font-medium"
              >
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                {uploadError}
              </motion.div>
            )}

            <h2 className="fds-label-caps mb-4">Statut des Documents Soumis</h2>
            
            <div className="grid gap-3">
              {data.documents.map((doc) => (
                <div
                  key={doc.id}
                  className={`flex flex-col p-4 border bg-surface-container-low gap-3 transition-colors ${
                    doc.statut_validation === "rejete"
                      ? "border-error/30 bg-error/5"
                      : "border-outline-variant"
                  }`}
                >
                  {/* Ligne principale : nom + statut */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-outline shrink-0" />
                      <span className="font-medium">{doc.nom_document}</span>
                    </div>
                    {getStatusBadge(doc.statut_validation)}
                  </div>

                  {/* Zone de remplacement — uniquement si rejeté */}
                  {doc.statut_validation === "rejete" && (
                    <div className="border-t border-error/20 pt-3">
                      <p className="text-xs text-error mb-3 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Ce document a été rejeté. Vous pouvez le remplacer ci-dessous (PDF, JPG, JPEG — max 5 Mo).
                      </p>
                      <label
                        className={`flex items-center justify-center gap-2 border-2 border-dashed border-error/40 p-3 cursor-pointer text-sm font-medium text-error hover:bg-error/10 transition-colors ${
                          uploadingDocId === doc.id ? "opacity-50 pointer-events-none" : ""
                        }`}
                      >
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg"
                          ref={(el) => { fileInputRefs.current[doc.id] = el; }}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleReplaceDocument(doc, file);
                            // Reset input pour permettre de re-sélectionner le même fichier
                            e.target.value = "";
                          }}
                        />
                        {uploadingDocId === doc.id ? (
                          <><Loader2 className="w-4 h-4 animate-spin" /> Envoi en cours...</>
                        ) : (
                          <><Upload className="w-4 h-4" /> Remplacer ce document</>
                        )}
                      </label>
                    </div>
                  )}
                </div>
              ))}
              {data.documents.length === 0 && (
                <p className="text-outline italic p-4 text-center">Aucun document soumis trouvé.</p>
              )}
            </div>

            <div className="mt-10 pt-6 border-t border-outline-variant flex flex-col sm:flex-row gap-3 justify-between items-center">
              <button 
                onClick={() => { setData(null); setReference(""); setUploadError(null); setUploadSuccess(null); }}
                className="fds-button-secondary inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Faire une autre recherche
              </button>
              <button
                onClick={() => handleSearch({ preventDefault: () => {} } as React.FormEvent)}
                className="fds-button-secondary inline-flex items-center gap-2 text-sm"
              >
                <RefreshCw className="w-4 h-4" /> Actualiser
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
