/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { 
  Mail, Phone, MapPin, 
  ArrowRight, Upload, 
  FileCheck, AlertCircle, BadgeCheck, 
  Home, RefreshCw, FileText, Lock,
  School, Image, User, Loader2, CheckCircle2
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

type Step = "prerequis" | "info" | "upload" | "success";

interface DocumentRequis {
  id: string;
  nom: string;
  description: string | null;
  format_accepte: string;
  est_obligatoire: boolean;
}

const getIconForDoc = (nom: string) => {
  const lowerNom = nom.toLowerCase();
  if (lowerNom.includes("naissance")) return <User className="w-6 h-6" />;
  if (lowerNom.includes("bac")) return <School className="w-6 h-6" />;
  if (lowerNom.includes("notes")) return <FileCheck className="w-6 h-6" />;
  if (lowerNom.includes("photo")) return <Image className="w-6 h-6" />;
  return <FileText className="w-6 h-6" />;
};

export default function Application() {
  const [step, setStep] = useState<Step>("prerequis");
  const [formData, setFormData] = useState({
    nom: "", prenom: "", email: "", telephone: "", ville: "Port-au-Prince"
  });
  
  // Nouveaux états dynamiques
  const [documentsRequis, setDocumentsRequis] = useState<DocumentRequis[]>([]);
  const [files, setFiles] = useState<Record<string, File>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [referenceDossier, setReferenceDossier] = useState<string | null>(null);

  // Appel API pour récupérer les règles de la BDD (Phase 4)
  useEffect(() => {
    fetch('/api/documents-requis')
      .then(res => res.json())
      .then(data => setDocumentsRequis(data))
      .catch(err => console.error("Erreur chargement documents:", err));
  }, []);

  const handleNext = () => {
    if (step === "info") setStep("upload");
    else if (step === "upload") setStep("success");
  };

  const handleFileChange = (docId: string, file: File | null) => {
    if (!file) return;
    setFiles(prev => ({ ...prev, [docId]: file }));
  };

  const handleFinalSubmit = async () => {
    // Vérification : tous les documents sont-ils présents ?
    if (Object.keys(files).length < documentsRequis.length) {
      setError("Veuillez téléverser tous les documents requis avant de soumettre.");
      return;
    }
    
    setIsSubmitting(true);
    setError(null);

    try {
      // 1. Création du candidat
      const candRes = await fetch('/api/candidature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, notifications_actives: true })
      });
      if (!candRes.ok) throw new Error("Erreur lors de la création du candidat.");
      
      const candData = await candRes.json();
      const candidatId = candData.id;
      setReferenceDossier(candData.reference_dossier);

      // 2. Upload des fichiers vers Cloudinary via FastAPI
      const uploadPromises = Object.entries(files).map(async ([docId, file]) => {
        const payload = new FormData();
        payload.append('candidat_id', candidatId);
        payload.append('document_requis_id', docId);
        payload.append('file', file);
        
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: payload
        });
        if (!uploadRes.ok) throw new Error(`Erreur lors de l'upload d'un document`);
        return uploadRes.json();
      });

      await Promise.all(uploadPromises);
      
      // 3. Succès
      setStep("success");
    } catch (e: any) {
      setError(e.message || "Une erreur inconnue est survenue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
      <AnimatePresence mode="wait">
        {step === "prerequis" && (
          <motion.div
            key="prerequis"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-surface border border-outline-variant p-6 md:p-10"
          >
             <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <h1 className="font-display text-2xl font-bold text-primary-container uppercase">Prérequis</h1>
                <span className="font-mono text-sm text-outline">Avant de commencer</span>
              </div>
              <div className="h-1.5 w-full bg-surface-container-highest">
                <div className="h-full w-1/4 bg-primary-container" />
              </div>
            </div>

            <div className="mb-10 border-b border-outline-variant pb-6">
              <h2 className="font-display text-3xl font-bold mb-2">Documents Requis</h2>
              <p className="text-on-surface-variant">Pour soumettre votre candidature, vous aurez besoin de numériser les documents suivants. Ces exigences proviennent de la base de données officielle.</p>
              <div className="mt-4 flex items-start gap-3 bg-error-container/10 text-error p-4 border border-error/20">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-sm">Votre candidature ne pourra pas être finalisée sans ces documents.</p>
              </div>
            </div>

            <div className="grid gap-4 mb-10">
              {documentsRequis.map((doc) => (
                <div key={doc.id} className="flex items-start gap-4 p-4 border border-outline-variant bg-surface-container-low">
                  <div className="bg-primary-container/10 p-2 text-primary-container shrink-0">
                    {getIconForDoc(doc.nom)}
                  </div>
                  <div>
                    <h3 className="font-display font-bold">{doc.nom}</h3>
                    <p className="text-sm text-on-surface-variant">Format {doc.format_accepte} uniquement</p>
                  </div>
                </div>
              ))}
              {documentsRequis.length === 0 && (
                <div className="p-8 text-center text-outline animate-pulse">Chargement des documents depuis la BDD...</div>
              )}
            </div>

            <div className="pt-8 border-t border-outline-variant flex justify-end">
              <button 
                type="button" onClick={() => setStep("info")}
                className="fds-button-primary flex items-center gap-2 group"
                disabled={documentsRequis.length === 0}
              >
                J'ai préparé ces documents
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        )}

        {step === "info" && (
          <motion.div
            key="info"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-surface border border-outline-variant p-6 md:p-10"
          >
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <h1 className="font-display text-2xl font-bold text-primary-container uppercase">Candidature</h1>
                <span className="font-mono text-sm text-outline">Étape 1/2</span>
              </div>
              <div className="h-1.5 w-full bg-surface-container-highest">
                <div className="h-full w-1/2 bg-primary-container" />
              </div>
            </div>

            <div className="mb-10 border-b border-outline-variant pb-6">
              <h2 className="font-display text-3xl font-bold mb-2">Informations Personnelles</h2>
              <p className="text-on-surface-variant">Veuillez remplir vos informations de base pour commencer votre candidature.</p>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="fds-label-caps" htmlFor="nom">Nom</label>
                  <input 
                    type="text" id="nom" 
                    placeholder="Votre nom de famille"
                    className="h-11 border border-outline-variant px-4 focus:outline-none focus:border-primary-container hover:border-outline transition-colors"
                    value={formData.nom} onChange={e => setFormData({...formData, nom: e.target.value})}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="fds-label-caps" htmlFor="prenom">Prénom</label>
                  <input 
                    type="text" id="prenom" 
                    placeholder="Votre prénom"
                    className="h-11 border border-outline-variant px-4 focus:outline-none focus:border-primary-container"
                    value={formData.prenom} onChange={e => setFormData({...formData, prenom: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="fds-label-caps" htmlFor="email">Email</label>
                <div className="relative">
                  <input 
                    type="email" id="email" 
                    placeholder="votre.email@exemple.com"
                    className="w-full h-11 border border-outline-variant px-4 pr-12 focus:outline-none focus:border-primary-container transition-colors"
                    value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="fds-label-caps" htmlFor="tel">Téléphone</label>
                <div className="relative">
                  <input 
                    type="tel" id="tel" 
                    placeholder="+509 XX XX XX XX"
                    className="w-full h-11 border border-outline-variant px-4 pr-12 focus:outline-none focus:border-primary-container transition-colors"
                    value={formData.telephone} onChange={e => setFormData({...formData, telephone: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="fds-label-caps" htmlFor="ville">Ville</label>
                <select id="ville" className="h-11 border border-outline-variant px-2 bg-surface focus:outline-none"
                  value={formData.ville} onChange={e => setFormData({...formData, ville: e.target.value})}
                >
                  <option>Port-au-Prince</option>
                  <option>Cap-Haïtien</option>
                  <option>Jacmel</option>
                  <option>Gonaïves</option>
                  <option>Les Cayes</option>
                  <option>Jérémie</option>
                  <option>Hinche</option>
                  <option>Autre</option>
                </select>
              </div>

              <div className="pt-8 border-t border-outline-variant mt-10 flex justify-end">
                <button 
                  type="button" onClick={handleNext}
                  className="fds-button-primary inline-flex items-center gap-2 group"
                >
                  Suivant
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {step === "upload" && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-surface border border-outline-variant p-6 md:p-10"
          >
             <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <h1 className="font-display text-2xl font-bold text-primary-container uppercase">Candidature</h1>
                <span className="font-mono text-sm text-outline">Étape 2/2</span>
              </div>
              <div className="h-1.5 w-full bg-surface-container-highest">
                <div className="h-full w-full bg-primary-container" />
              </div>
            </div>

            <div className="mb-10 border-b border-outline-variant pb-6">
              <h2 className="font-display text-3xl font-bold mb-2">Dossier Académique</h2>
              <p className="text-on-surface-variant">Veuillez fournir les documents requis ci-dessous pour l'analyse de votre dossier.</p>
              {error && (
                <div className="mt-4 flex items-center gap-2 text-error bg-error/10 p-4 border border-error/20">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">{error}</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {documentsRequis.map((doc, index) => {
                const hasFile = !!files[doc.id];
                const fileObj = files[doc.id];
                
                return (
                  <div key={doc.id} className={`bg-surface-container-low border p-6 flex flex-col gap-6 ${hasFile ? 'border-primary-container/50' : 'border-outline-variant'} ${index === documentsRequis.length - 1 && index % 2 === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-display font-bold flex items-center gap-2">
                           {getIconForDoc(doc.nom)} {doc.nom}
                        </h3>
                        <span className="text-[10px] font-mono text-outline mt-1 block">Format: {doc.format_accepte}</span>
                      </div>
                      <span className="bg-primary-container/10 px-2 py-0.5 text-[8px] font-black uppercase text-primary-container ring-1 ring-primary-container/20 tracking-tighter">
                        {doc.est_obligatoire ? "Requis" : "Optionnel"}
                      </span>
                    </div>

                    <label className={`border-2 border-dashed bg-white min-h-[160px] flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-all group relative overflow-hidden ${hasFile ? 'border-primary-container bg-primary-container/5' : 'border-outline-variant hover:border-primary-container hover:bg-primary-container/5'}`}>
                       <input 
                         type="file" className="hidden" 
                         accept={doc.format_accepte.includes('PDF') ? '.pdf' : 'image/*'}
                         onChange={(e) => handleFileChange(doc.id, e.target.files?.[0] || null)}
                       />
                       
                       {hasFile ? (
                         <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex flex-col items-center gap-2 text-primary">
                           <CheckCircle2 className="w-8 h-8 text-primary-container" />
                           <span className="text-xs font-bold truncate max-w-[200px]">{fileObj.name}</span>
                           <span className="text-[10px] text-outline">{(fileObj.size / 1024 / 1024).toFixed(2)} MB</span>
                         </motion.div>
                       ) : (
                         <>
                           <Upload className="w-8 h-8 text-outline mb-2 group-hover:scale-110 transition-transform" />
                           <span className="fds-label-caps text-primary text-[10px]">Cliquer pour téléverser</span>
                           <span className="text-[10px] text-outline mt-1">Glissez-déposez le fichier ici</span>
                         </>
                       )}
                    </label>
                  </div>
                );
              })}
            </div>

            <div className="pt-8 border-t border-outline-variant flex justify-between">
              <button 
                type="button" onClick={() => setStep("info")}
                className="fds-button-secondary text-sm"
                disabled={isSubmitting}
              >
                Précédent
              </button>
              <button 
                type="button" onClick={handleFinalSubmit}
                disabled={isSubmitting}
                className="fds-button-primary flex items-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Téléversement en cours...
                  </>
                ) : (
                  <>
                    Soumettre le dossier
                    <BadgeCheck className="w-5 h-5 transition-transform group-hover:scale-110" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}

        {step === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface border border-outline-variant p-8 md:p-16 flex flex-col items-center text-center gap-8 shadow-2xl"
          >
            <div className="flex flex-col items-center gap-4">
               <div className="bg-success/10 p-6 rounded-full border border-success/20">
                <BadgeCheck className="w-16 h-16 text-success fill-current" />
               </div>
               <h1 className="font-display text-4xl font-black text-on-surface tracking-tighter uppercase">Candidature Enregistrée</h1>
            </div>

            <div className="w-full max-w-sm bg-surface-container-low border border-outline-variant p-6 flex flex-col gap-2">
               <span className="fds-label-caps text-on-surface-variant text-[10px]">Référence Officielle du Dossier</span>
               <span className="font-mono text-2xl font-black text-primary-container tracking-[.25em] select-all">{referenceDossier || "EN-ATTENTE"}</span>
            </div>

            <p className="text-on-surface-variant leading-relaxed max-w-md">
              Un email de confirmation sécurisé a été envoyé. Vos {documentsRequis.length} documents ont été téléversés avec succès sur notre plateforme Cloudinary et liés à votre base de données PostgreSQL.
            </p>

            <div className="w-full flex flex-col sm:flex-row gap-4 mt-4">
               <Link to="/suivi" className="flex-1 fds-button-primary flex items-center justify-center gap-2">
                 <RefreshCw className="w-4 h-4" /> Suivi du dossier
               </Link>
               <Link to="/" className="flex-1 fds-button-secondary flex items-center justify-center gap-2">
                 <Home className="w-4 h-4" /> Retour à l'accueil
               </Link>
            </div>

            <div className="pt-8 border-t border-outline-variant w-full mt-4 flex items-center justify-center gap-2 opacity-50 grayscale">
               <Lock className="w-4 h-4" />
               <span className="fds-label-caps text-[10px]">Portail Sécurisé — Faculté des Sciences (UEH)</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
