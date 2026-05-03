/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { 
  User, Mail, Phone, MapPin, 
  ChevronRight, ArrowRight, Upload, 
  FileCheck, AlertCircle, BadgeCheck, 
  Home, RefreshCw, BadgeInfo, FileText,
  School
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

type Step = "info" | "upload" | "success";

export default function Application() {
  const [step, setStep] = useState<Step>("info");
  const [formData, setFormData] = useState({
    nom: "Dupont",
    prenom: "Jean",
    email: "jean.dupont@",
    telephone: "+509 34 56 78 90",
    ville: "Port-au-Prince"
  });

  const handleNext = () => {
    if (step === "info") setStep("upload");
    else if (step === "upload") setStep("success");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
      <AnimatePresence mode="wait">
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
                    className="h-11 border border-outline-variant px-4 focus:outline-none focus:border-primary-container hover:border-outline transition-colors"
                    value={formData.nom} onChange={e => setFormData({...formData, nom: e.target.value})}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="fds-label-caps" htmlFor="prenom">Prénom</label>
                  <input 
                    type="text" id="prenom" 
                    className="h-11 border border-outline-variant px-4 focus:outline-none focus:border-primary-container"
                    value={formData.prenom} onChange={e => setFormData({...formData, prenom: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="fds-label-caps text-error" htmlFor="email">Email</label>
                <div className="relative">
                  <input 
                    type="email" id="email" 
                    className="w-full h-11 border border-error bg-error-container/10 px-4 pr-12 focus:outline-none focus:ring-1 focus:ring-error"
                    value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                  <AlertCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-error" />
                </div>
                <p className="text-xs text-error font-medium flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" /> Format d'adresse institutionnelle suggéré
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <label className="fds-label-caps text-success" htmlFor="tel">Téléphone</label>
                <div className="relative">
                  <input 
                    type="tel" id="tel" 
                    className="w-full h-11 border border-success px-4 pr-12 focus:outline-none"
                    value={formData.telephone} onChange={e => setFormData({...formData, telephone: e.target.value})}
                  />
                  <FileCheck className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-success fill-current" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="fds-label-caps" htmlFor="ville">Ville</label>
                <select id="ville" className="h-11 border border-outline-variant px-2 bg-surface focus:outline-none">
                  <option>Port-au-Prince</option>
                  <option>Cap-Haïtien</option>
                  <option>Jacmel</option>
                  <option>Gonaïves</option>
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {/* Document 1 */}
              <div className="bg-surface-container-low border border-outline-variant p-6 flex flex-col gap-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-display font-bold flex items-center gap-2">
                       <FileText className="w-5 h-5 text-outline" /> Pièce d'identité
                    </h3>
                    <span className="text-[10px] font-mono text-outline mt-1 block">PDF uniquement (Max 5MB)</span>
                  </div>
                  <span className="bg-primary-container/10 px-2 py-0.5 text-[8px] font-black uppercase text-primary-container ring-1 ring-primary-container/20 tracking-tighter">Requis</span>
                </div>
                <div className="border-2 border-dashed border-outline-variant bg-white min-h-[160px] flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:bg-primary-container/5 hover:border-primary-container transition-all group">
                   <Upload className="w-8 h-8 text-outline mb-2 group-hover:scale-110 transition-transform" />
                   <span className="fds-label-caps text-primary text-[10px]">Cliquer pour téléverser</span>
                   <span className="text-[10px] text-outline mt-1">Glissez-déposez le fichier ici</span>
                </div>
              </div>

              {/* Document 2 Error state */}
              <div className="bg-surface-container-low border border-error p-6 flex flex-col gap-6">
                 <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-display font-bold flex items-center gap-2">
                       <School className="w-5 h-5 text-outline" /> Baccalauréat
                    </h3>
                    <span className="text-[10px] font-mono text-outline mt-1 block">PDF uniquement (Max 5MB)</span>
                  </div>
                  <span className="bg-error-container/20 px-2 py-0.5 text-[8px] font-black uppercase text-error ring-1 ring-error/20 tracking-tighter">Requis</span>
                </div>
                <div className="border-2 border-dashed border-error bg-error-container/5 min-h-[160px] flex flex-col items-center justify-center p-4 text-center relative group">
                   <div className="absolute top-2 right-2 text-error"><AlertCircle className="w-4 h-4" /></div>
                   <img 
                    src="https://img.icons8.com/color/96/pdf.png" 
                    alt="Error" 
                    className="w-12 h-12 grayscale opacity-50 mb-2"
                   />
                   <span className="font-mono text-[10px] text-error font-black">ERR_MIME_UNSUPPORTED</span>
                   <p className="text-[10px] text-on-error-container mt-1 max-w-[180px]">Format d'image non supporté. Veuillez convertir en PDF.</p>
                   <button className="mt-4 border border-error bg-white px-4 py-1.5 fds-label-caps text-[10px] text-error hover:bg-error-container/20 transition-colors">Réessayer</button>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-outline-variant flex justify-between">
              <button 
                type="button" onClick={() => setStep("info")}
                className="fds-button-secondary text-sm"
              >
                Précédent
              </button>
              <button 
                type="button" onClick={handleNext}
                className="fds-button-primary flex items-center gap-2 group"
              >
                Soumettre le dossier
                <BadgeCheck className="w-5 h-5 transition-transform group-hover:scale-110" />
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
               <span className="font-mono text-2xl font-black text-primary-container tracking-[.25em] select-all">CAN-2026-0089</span>
            </div>

            <p className="text-on-surface-variant leading-relaxed max-w-md">
              Un email de confirmation sécurisé a été envoyé. Votre dossier est enregistré dans notre base centralisée, aucun déplacement à la Faculté n'est requis à ce stade.
            </p>

            <div className="w-full flex flex-col sm:flex-row gap-4 mt-4">
               <Link to="/" className="flex-1 fds-button-primary flex items-center justify-center gap-2">
                 <RefreshCw className="w-4 h-4" /> Suivi du dossier
               </Link>
               <Link to="/" className="flex-1 fds-button-secondary flex items-center justify-center gap-2">
                 <Home className="w-4 h-4" /> Retour à l'accueil
               </Link>
            </div>

            <div className="pt-8 border-t border-outline-variant w-full mt-4 flex items-center justify-center gap-2 opacity-50 grayscale">
               <Lock className="w-4 h-4" />
               <span className="fds-label-caps text-[10px]">Portail Sécurisé - Faculté des Sciences (UEH)</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
