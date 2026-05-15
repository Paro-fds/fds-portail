import React, { useState, useRef } from "react";
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
        return <span className="flex items-center gap-1.5 bg-tertiary/10 text-tertiary px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-md"><span className="material-symbols-outlined text-sm">check_circle</span> Validé</span>;
      case "rejete":
        return <span className="flex items-center gap-1.5 bg-error/10 text-error px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-md"><span className="material-symbols-outlined text-sm">cancel</span> Rejeté</span>;
      default:
        return <span className="flex items-center gap-1.5 bg-secondary/10 text-secondary px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-md"><span className="material-symbols-outlined text-sm">schedule</span> En Attente</span>;
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 md:py-16">
      <AnimatePresence mode="wait">
        {!data ? (
          <motion.div
            key="search"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 p-8 md:p-12 text-center shadow-[0_8px_24px_rgba(17,28,45,0.06)]"
          >
            <div className="w-20 h-20 bg-primary-container/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <span className="material-symbols-outlined text-4xl text-primary">search</span>
            </div>
            <h1 className="font-headline text-3xl font-extrabold mb-4 text-on-surface tracking-tight">Suivi de Dossier</h1>
            <p className="font-body text-on-surface-variant mb-10 max-w-md mx-auto leading-relaxed">
              Entrez la référence officielle (CAN-2026-XXXX) qui vous a été fournie lors de la soumission de votre candidature.
            </p>

            <form onSubmit={handleSearch} className="max-w-sm mx-auto flex flex-col gap-8">
              <div className="flex flex-col gap-2 text-left">
                <label className="font-label text-[10px] font-bold uppercase tracking-widest text-secondary" htmlFor="ref">Référence du Dossier</label>
                <input 
                  type="text" id="ref" 
                  placeholder="CAN-2026-..."
                  className="w-full pb-2 bg-transparent border-0 border-b-2 border-outline-variant/30 focus:ring-0 focus:border-primary transition-colors font-mono text-center text-xl uppercase placeholder:text-outline-variant"
                  value={reference} onChange={e => setReference(e.target.value.toUpperCase())}
                />
              </div>

              {error && (
                <div className="text-error font-body text-sm font-medium bg-error/10 p-4 rounded-md flex items-center gap-3 border-l-4 border-error text-left">
                  <span className="material-symbols-outlined shrink-0 text-lg">error</span>
                  {error}
                </div>
              )}

              <button 
                type="submit" 
                disabled={isSearching || !reference.trim()}
                className="w-full px-6 py-4 bg-primary text-on-primary font-headline font-bold rounded-md hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSearching ? (
                  <><span className="material-symbols-outlined animate-spin text-lg">hourglass_empty</span> Recherche...</>
                ) : (
                  <><span className="material-symbols-outlined text-lg">search</span> Rechercher mon dossier</>
                )}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 p-8 md:p-12 shadow-[0_8px_24px_rgba(17,28,45,0.06)]"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-8 border-b border-outline-variant/15 gap-6">
              <div>
                <span className="font-label text-[10px] font-bold uppercase tracking-widest text-secondary mb-2 block">Dossier Candidat</span>
                <h1 className="font-headline text-3xl font-extrabold text-on-surface">{data.prenom} {data.nom}</h1>
              </div>
              <div className="text-left md:text-right">
                <span className="font-mono text-xl font-black text-primary bg-primary-container/10 px-4 py-2 rounded-md">
                  {data.reference_dossier}
                </span>
              </div>
            </div>

            {uploadSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 bg-tertiary/10 text-tertiary p-5 mb-8 text-sm font-body border-l-4 border-tertiary rounded-r-md"
              >
                <span className="material-symbols-outlined shrink-0 text-lg mt-0.5">check_circle</span>
                {uploadSuccess}
              </motion.div>
            )}
            {uploadError && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 bg-error/10 text-error p-5 mb-8 text-sm font-body border-l-4 border-error rounded-r-md"
              >
                <span className="material-symbols-outlined shrink-0 text-lg mt-0.5">error</span>
                {uploadError}
              </motion.div>
            )}

            <h2 className="font-label text-[10px] font-bold uppercase tracking-widest text-secondary mb-6">Statut des Documents Soumis</h2>
            
            <div className="grid gap-4">
              {data.documents.map((doc) => (
                <div
                  key={doc.id}
                  className={`flex flex-col p-6 rounded-xl transition-colors border ${
                    doc.statut_validation === "rejete"
                      ? "border-error/30 bg-error/5"
                      : "border-outline-variant/15 bg-surface-container-low"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-xl text-secondary shrink-0">description</span>
                      <span className="font-headline font-bold text-sm text-on-surface">{doc.nom_document}</span>
                    </div>
                    <div>{getStatusBadge(doc.statut_validation)}</div>
                  </div>

                  {doc.statut_validation === "rejete" && (
                    <div className="mt-6 pt-6 border-t border-error/20">
                      <p className="font-body text-xs text-error mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">error</span>
                        Ce document a été rejeté. Vous pouvez le remplacer ci-dessous (PDF, JPG, JPEG — max 5 Mo).
                      </p>
                      <label
                        className={`flex items-center justify-center gap-2 border-2 border-dashed border-error/40 rounded-xl p-4 cursor-pointer font-headline text-sm font-bold text-error hover:bg-error/10 transition-colors ${
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
                            e.target.value = "";
                          }}
                        />
                        {uploadingDocId === doc.id ? (
                          <><span className="material-symbols-outlined animate-spin text-lg">hourglass_empty</span> Envoi en cours...</>
                        ) : (
                          <><span className="material-symbols-outlined text-lg">upload</span> Remplacer ce document</>
                        )}
                      </label>
                    </div>
                  )}
                </div>
              ))}
              {data.documents.length === 0 && (
                <p className="text-secondary font-body italic p-6 text-center bg-surface-container-low rounded-xl">Aucun document soumis trouvé.</p>
              )}
            </div>

            <div className="mt-12 pt-8 border-t border-outline-variant/15 flex flex-col sm:flex-row gap-4 justify-between items-center">
              <button 
                onClick={() => { setData(null); setReference(""); setUploadError(null); setUploadSuccess(null); }}
                className="px-6 py-4 bg-transparent text-secondary border border-outline-variant/30 font-headline font-bold rounded-md hover:bg-surface-container-low transition-colors w-full sm:w-auto flex justify-center items-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">arrow_back</span> Faire une autre recherche
              </button>
              <button
                onClick={() => handleSearch({ preventDefault: () => {} } as React.FormEvent)}
                className="px-6 py-4 bg-primary-container/10 text-primary font-headline font-bold rounded-md hover:bg-primary-container/20 transition-colors w-full sm:w-auto flex justify-center items-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">refresh</span> Actualiser
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
