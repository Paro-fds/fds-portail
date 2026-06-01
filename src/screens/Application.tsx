import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";

type Step = "prerequis" | "info" | "payment" | "upload" | "success";

interface DocumentRequis {
  id: string;
  nom: string;
  description: string | null;
  format_accepte: string;
  est_obligatoire: boolean;
}

const getIconForDoc = (nom: string) => {
  const lowerNom = nom.toLowerCase();
  if (lowerNom.includes("naissance")) return "person";
  if (lowerNom.includes("bac")) return "school";
  if (lowerNom.includes("notes")) return "task";
  if (lowerNom.includes("photo")) return "image";
  return "description";
};

export default function Application() {
  const [step, setStep] = useState<Step>("prerequis");
  const [formData, setFormData] = useState({
    nom: "", prenom: "", email: "", telephone: "", ville: "Port-au-Prince",
    methodePaiement: "MonCash" as "MonCash" | "NatCash",
    telephonePaiement: ""
  });
  
  const [documentsRequis, setDocumentsRequis] = useState<DocumentRequis[]>([]);
  const [files, setFiles] = useState<Record<string, File>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSimulatingPayment, setIsSimulatingPayment] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [referenceDossier, setReferenceDossier] = useState<string | null>(null);
  const [referencePaiement, setReferencePaiement] = useState<string | null>(null);
  const [deplacementPhysique, setDeplacementPhysique] = useState<boolean | null>(null);

  useEffect(() => {
    fetch('/api/documents-requis')
      .then(res => res.json())
      .then(data => setDocumentsRequis(data))
      .catch(err => console.error("Erreur chargement documents:", err));
  }, []);

  const handleNext = () => {
    setError(null);
    if (step === "info") {
      if (!formData.nom.trim() || !formData.prenom.trim() || !formData.email.trim() || !formData.telephone.trim()) {
        setError("Veuillez remplir tous les champs obligatoires avant de continuer.");
        return;
      }
      setStep("payment");
    }
    else if (step === "upload") setStep("success");
  };

  const handlePaymentSubmit = () => {
    setError(null);
    if (!formData.telephonePaiement.trim()) {
      setError("Veuillez entrer le numéro de téléphone lié à votre compte.");
      return;
    }
    setIsSimulatingPayment(true);
    
    // Simulation of payment processing delay (2s)
    setTimeout(() => {
      setIsSimulatingPayment(false);
      setReferencePaiement(`SIM-${Math.random().toString(36).substring(2, 9).toUpperCase()}`);
      setStep("upload");
    }, 2000);
  };

  const handleFileChange = (docId: string, file: File | null) => {
    if (!file) return;
    setFiles(prev => ({ ...prev, [docId]: file }));
  };

  const getAcceptForDoc = (formatAccepte: string) => {
    const upper = formatAccepte.toUpperCase();
    if (upper.includes("PDF") && !upper.includes("JPG")) return ".pdf";
    if (upper.includes("JPG") || upper.includes("JPEG")) return ".jpg,.jpeg";
    return ".pdf,.jpg,.jpeg";
  };

  const handleFinalSubmit = async () => {
    if (Object.keys(files).length < documentsRequis.length) {
      setError("Veuillez téléverser tous les documents requis avant de soumettre.");
      return;
    }
    if (deplacementPhysique === null) {
      setError("Veuillez répondre à la question sur le déplacement physique (obligatoire).");
      return;
    }
    
    setIsSubmitting(true);
    setError(null);

    try {
      const candRes = await fetch('/api/candidature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email,
          notifications_actives: true,
          methode_paiement: formData.methodePaiement,
          reference_paiement: referencePaiement,
          deplacement_physique: deplacementPhysique,
        })
      });
      if (!candRes.ok) throw new Error("Erreur lors de la création du candidat.");
      
      const candData = await candRes.json();
      const candidatId = candData.id;
      setReferenceDossier(candData.reference_dossier);

      const uploadPromises = Object.entries(files).map(async ([docId, file]) => {
        const payload = new FormData();
        payload.append('candidat_id', candidatId);
        payload.append('document_requis_id', docId);
        payload.append('file', file as File);
        
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: payload
        });
        if (!uploadRes.ok) throw new Error(`Erreur lors de l'upload d'un document`);
        return uploadRes.json();
      });

      await Promise.all(uploadPromises);
      setStep("success");
    } catch (e: any) {
      setError(e.message || "Une erreur inconnue est survenue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-16">
      <AnimatePresence mode="wait">
        {step === "prerequis" && (
          <motion.div
            key="prerequis"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card className="p-8 md:p-12">
             <div className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h1 className="font-headline text-3xl font-extrabold text-primary tracking-tight">Candidature</h1>
                <span className="font-label text-xs font-bold uppercase tracking-widest text-secondary">Prérequis</span>
              </div>
              <div className="flex gap-2">
                <div className="h-1.5 w-1/4 bg-primary rounded" />
                <div className="h-1.5 w-3/4 bg-surface-container-high rounded" />
              </div>
            </div>

            <div className="mb-10">
              <h2 className="font-headline text-2xl font-bold mb-3 text-on-surface">Documents Requis</h2>
              <p className="font-body text-on-surface-variant leading-relaxed">Pour soumettre votre candidature, vous aurez besoin de numériser les documents suivants.</p>
              <div className="mt-6 flex items-start gap-4 bg-error-container/10 p-5 rounded-md border-l-4 border-error">
                <span className="material-symbols-outlined text-error shrink-0">error</span>
                <p className="font-body text-sm text-error font-medium">Votre candidature ne pourra pas être finalisée sans ces documents et sans le paiement des frais.</p>
              </div>
            </div>

            <div className="grid gap-4 mb-10">
              {documentsRequis.map((doc) => (
                <div key={doc.id} className="flex items-start gap-4 p-5 rounded-xl border border-outline-variant/15 bg-surface-container-low hover:border-primary-container/30 transition-colors">
                  <div className="bg-primary-container/10 p-3 rounded-md text-primary shrink-0">
                    <span className="material-symbols-outlined text-xl">{getIconForDoc(doc.nom)}</span>
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-on-surface">{doc.nom}</h3>
                    <p className="font-body text-xs text-secondary mt-1 uppercase tracking-widest">Format {doc.format_accepte} uniquement</p>
                  </div>
                </div>
              ))}
              {documentsRequis.length === 0 && (
                <div className="p-8 text-center text-outline animate-pulse font-body text-sm">Chargement des documents depuis la BDD...</div>
              )}
            </div>

            <div className="pt-6 flex justify-end">
              <Button 
                onClick={() => setStep("info")}
                disabled={documentsRequis.length === 0}
                icon="arrow_forward"
              >
                J'ai préparé ces documents
              </Button>
            </div>
            </Card>
          </motion.div>
        )}

        {step === "info" && (
          <motion.div
            key="info"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card className="p-8 md:p-12">
            <div className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h1 className="font-headline text-3xl font-extrabold text-primary tracking-tight">Candidature</h1>
                <span className="font-label text-xs font-bold uppercase tracking-widest text-secondary">Étape 1/3</span>
              </div>
              <div className="flex gap-2">
                <div className="h-1.5 w-2/4 bg-primary rounded" />
                <div className="h-1.5 w-2/4 bg-surface-container-high rounded" />
              </div>
            </div>

            <div className="mb-10">
              <h2 className="font-headline text-2xl font-bold mb-3 text-on-surface">Informations Personnelles</h2>
              <p className="font-body text-on-surface-variant leading-relaxed">Veuillez remplir vos informations de base pour commencer votre candidature.</p>
              {error && (
                <div className="mt-6 flex items-start gap-4 bg-error-container/10 p-5 rounded-md border-l-4 border-error">
                  <span className="material-symbols-outlined text-error shrink-0">error</span>
                  <span className="font-body text-sm font-medium text-error">{error}</span>
                </div>
              )}
            </div>

            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Input 
                  label="Nom de famille" id="nom" placeholder="Votre nom"
                  value={formData.nom} onChange={e => setFormData({...formData, nom: e.target.value})}
                />
                <Input 
                  label="Prénom" id="prenom" placeholder="Votre prénom"
                  value={formData.prenom} onChange={e => setFormData({...formData, prenom: e.target.value})}
                />
              </div>

              <Input 
                label="Email" id="email" type="email" placeholder="votre.email@exemple.com" icon="alternate_email"
                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
              />

              <Input 
                label="Téléphone" id="tel" type="tel" placeholder="+509 XX XX XX XX" icon="phone"
                value={formData.telephone} onChange={e => setFormData({...formData, telephone: e.target.value})}
              />

              <div className="space-y-2">
                <label className="font-label text-[10px] font-bold uppercase tracking-widest text-secondary" htmlFor="ville">Ville de résidence</label>
                <select id="ville" className="w-full h-12 px-4 bg-surface-container-low border border-outline-variant/30 rounded-md focus:ring-1 focus:ring-primary focus:border-primary transition-all font-body text-on-surface outline-none"
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

              <div className="pt-8 flex justify-between items-center gap-4">
                <Button variant="outline" onClick={() => setStep("prerequis")} type="button">
                  Précédent
                </Button>
                <Button onClick={handleNext} icon="payment" type="button">
                  Payer les frais
                </Button>
              </div>
            </form>
            </Card>
          </motion.div>
        )}

        {step === "payment" && (
          <motion.div
            key="payment"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card className="p-8 md:p-12">
            <div className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h1 className="font-headline text-3xl font-extrabold text-primary tracking-tight">Candidature</h1>
                <span className="font-label text-xs font-bold uppercase tracking-widest text-secondary">Étape 2/3</span>
              </div>
              <div className="flex gap-2">
                <div className="h-1.5 w-3/4 bg-primary rounded" />
                <div className="h-1.5 w-1/4 bg-surface-container-high rounded" />
              </div>
            </div>

            <div className="mb-10 text-center">
              <span className="material-symbols-outlined text-5xl text-primary opacity-80 mb-4">payments</span>
              <h2 className="font-headline text-2xl font-bold mb-3 text-on-surface">Paiement des Frais d'Admission</h2>
              <p className="font-body text-on-surface-variant leading-relaxed">Le paiement s'effectue via le module FDS Pay. Pour le MVP, cette étape est simulée.</p>
              
              <div className="mt-6 flex flex-col items-center justify-center p-6 bg-surface-container-low rounded-xl border border-outline-variant/15">
                <span className="font-label text-xs font-bold uppercase tracking-widest text-secondary mb-2">Montant à payer</span>
                <span className="font-headline text-4xl font-extrabold text-on-surface">1,000 HTG</span>
              </div>
            </div>

            {error && (
              <div className="mb-8 flex items-start gap-4 bg-error-container/10 p-5 rounded-md border-l-4 border-error">
                <span className="material-symbols-outlined text-error shrink-0">error</span>
                <span className="font-body text-sm font-medium text-error">{error}</span>
              </div>
            )}

            <div className="space-y-8">
              <div>
                <label className="font-label text-[10px] font-bold uppercase tracking-widest text-secondary block mb-4">Méthode de Paiement</label>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, methodePaiement: "MonCash"})}
                    className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${formData.methodePaiement === 'MonCash' ? 'border-[#DA291C] bg-[#DA291C]/5' : 'border-outline-variant/20 hover:border-outline-variant/50'}`}
                  >
                    <span className="font-headline font-bold text-lg" style={{color: formData.methodePaiement === 'MonCash' ? '#DA291C' : 'inherit'}}>MonCash</span>
                  </button>
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, methodePaiement: "NatCash"})}
                    className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${formData.methodePaiement === 'NatCash' ? 'border-[#004B87] bg-[#004B87]/5' : 'border-outline-variant/20 hover:border-outline-variant/50'}`}
                  >
                    <span className="font-headline font-bold text-lg" style={{color: formData.methodePaiement === 'NatCash' ? '#004B87' : 'inherit'}}>NatCash</span>
                  </button>
                </div>
              </div>

              <Input 
                label={`Numéro de téléphone (${formData.methodePaiement})`} 
                id="telPaiement" type="tel" placeholder="XX XX XX XX" icon="smartphone"
                value={formData.telephonePaiement} onChange={e => setFormData({...formData, telephonePaiement: e.target.value})}
              />

              <div className="pt-8 flex justify-between items-center gap-4">
                <Button variant="outline" onClick={() => setStep("info")} disabled={isSimulatingPayment} type="button">
                  Précédent
                </Button>
                <Button 
                  onClick={handlePaymentSubmit} 
                  disabled={isSimulatingPayment} 
                  icon={isSimulatingPayment ? "sync" : "check_circle"} 
                  type="button"
                >
                  {isSimulatingPayment ? "Traitement FDS Pay..." : "Confirmer le paiement"}
                </Button>
              </div>
            </div>
            </Card>
          </motion.div>
        )}

        {step === "upload" && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card className="p-8 md:p-12">
             <div className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h1 className="font-headline text-3xl font-extrabold text-primary tracking-tight">Candidature</h1>
                <span className="font-label text-xs font-bold uppercase tracking-widest text-secondary">Étape 3/3</span>
              </div>
              <div className="flex gap-2">
                <div className="h-1.5 w-full bg-primary rounded" />
              </div>
            </div>

            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6 bg-tertiary-container/20 text-tertiary p-4 rounded-xl border border-tertiary/20">
                <span className="material-symbols-outlined">verified</span>
                <span className="font-body text-sm font-medium">Paiement confirmé (Réf: {referencePaiement})</span>
              </div>
              
              <h2 className="font-headline text-2xl font-bold mb-3 text-on-surface">Dossier Académique</h2>
              <p className="font-body text-on-surface-variant leading-relaxed">Veuillez fournir les documents requis ci-dessous pour l'analyse de votre dossier.</p>
              {error && (
                <div className="mt-6 flex items-start gap-4 bg-error-container/10 p-5 rounded-md border-l-4 border-error">
                  <span className="material-symbols-outlined text-error shrink-0">error</span>
                  <span className="font-body text-sm font-medium text-error">{error}</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {documentsRequis.map((doc, index) => {
                const hasFile = !!files[doc.id];
                const fileObj = files[doc.id];
                
                return (
                  <div key={doc.id} className={`bg-surface-container-low rounded-xl p-6 flex flex-col gap-6 border transition-colors ${hasFile ? 'border-primary/50' : 'border-outline-variant/15'} ${index === documentsRequis.length - 1 && index % 2 === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-headline font-bold flex items-center gap-2 text-on-surface">
                           <span className="material-symbols-outlined text-xl text-primary">{getIconForDoc(doc.nom)}</span> {doc.nom}
                        </h3>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-secondary mt-2 block">Format: {doc.format_accepte}</span>
                      </div>
                      <span className="bg-primary-container/10 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-primary rounded-md">
                        {doc.est_obligatoire ? "Requis" : "Optionnel"}
                      </span>
                    </div>

                    <label className={`border-2 border-dashed rounded-xl bg-surface-container-lowest min-h-[160px] flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all group relative overflow-hidden ${hasFile ? 'border-primary bg-primary/5' : 'border-outline-variant/30 hover:border-primary hover:bg-primary/5'}`}>
                       <input 
                         type="file" className="hidden" 
                         accept={getAcceptForDoc(doc.format_accepte)}
                         onChange={(e) => handleFileChange(doc.id, e.target.files?.[0] || null)}
                       />
                       
                       {hasFile ? (
                         <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex flex-col items-center gap-3 text-primary">
                           <span className="material-symbols-outlined text-3xl">check_circle</span>
                           <span className="text-xs font-bold truncate max-w-[200px]">{fileObj.name}</span>
                           <span className="text-[10px] uppercase tracking-widest text-secondary">{(fileObj.size / 1024 / 1024).toFixed(2)} MB</span>
                         </motion.div>
                       ) : (
                         <>
                           <span className="material-symbols-outlined text-3xl text-secondary mb-3 group-hover:text-primary transition-colors group-hover:scale-110">upload</span>
                           <span className="font-label text-xs font-bold uppercase tracking-widest text-primary mb-1">Cliquer pour téléverser</span>
                           <span className="text-[10px] text-secondary uppercase tracking-widest">Ou glissez-déposez ici</span>
                         </>
                       )}
                    </label>
                  </div>
                );
              })}
            </div>

            <fieldset className="mb-10 p-6 rounded-xl border border-outline-variant/15 bg-surface-container-low">
              <legend className="font-headline font-bold text-on-surface px-2 mb-4">
                Avez-vous dû vous déplacer pour compléter cette candidature ? <span className="text-error">*</span>
              </legend>
              <p className="font-body text-sm text-on-surface-variant mb-4 px-2">
                Cette information nous aide à mesurer l&apos;impact du portail en ligne.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 px-2">
                <label className="flex items-center gap-3 cursor-pointer font-body text-on-surface">
                  <input
                    type="radio"
                    name="deplacement"
                    checked={deplacementPhysique === false}
                    onChange={() => setDeplacementPhysique(false)}
                    className="w-4 h-4 accent-primary"
                  />
                  Non, tout a été fait en ligne
                </label>
                <label className="flex items-center gap-3 cursor-pointer font-body text-on-surface">
                  <input
                    type="radio"
                    name="deplacement"
                    checked={deplacementPhysique === true}
                    onChange={() => setDeplacementPhysique(true)}
                    className="w-4 h-4 accent-primary"
                  />
                  Oui, j&apos;ai dû me déplacer
                </label>
              </div>
            </fieldset>

            <div className="pt-6 flex flex-col sm:flex-row justify-between gap-4">
              <Button variant="outline" onClick={() => setStep("payment")} disabled={isSubmitting} type="button">
                Précédent
              </Button>
              <Button 
                onClick={handleFinalSubmit} 
                disabled={isSubmitting} 
                icon={isSubmitting ? "hourglass_empty" : "verified"} 
                type="button"
              >
                {isSubmitting ? "Téléversement en cours..." : "Soumettre le dossier"}
              </Button>
            </div>
            </Card>
          </motion.div>
        )}

        {step === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 p-8 md:p-16 flex flex-col items-center text-center gap-8 shadow-[0_16px_48px_rgba(17,28,45,0.08)]"
          >
            <div className="flex flex-col items-center gap-6">
               <div className="bg-tertiary-container/10 p-6 rounded-full">
                <span className="material-symbols-outlined text-6xl text-tertiary">verified</span>
               </div>
               <h1 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight uppercase">Candidature Enregistrée</h1>
            </div>

            <div className="w-full max-w-sm bg-surface-container-low rounded-xl p-8 flex flex-col gap-3">
               <span className="font-label text-[10px] font-bold uppercase tracking-widest text-secondary">Référence Officielle du Dossier</span>
               <span className="font-mono text-3xl font-black text-primary tracking-[.15em] select-all">{referenceDossier || "EN-ATTENTE"}</span>
            </div>

            <p className="font-body text-on-surface-variant leading-relaxed max-w-md">
              Un email de confirmation sécurisé a été envoyé. Vos {documentsRequis.length} documents et votre paiement ({referencePaiement}) ont été validés avec succès.
            </p>

            <div className="w-full max-w-md flex flex-col sm:flex-row gap-4 mt-6">
               <Link to="/suivi" className="flex-1 px-6 py-4 bg-primary text-on-primary font-headline font-bold rounded-md hover:bg-primary-container transition-all flex items-center justify-center gap-2 shadow-sm">
                 <span className="material-symbols-outlined text-lg">search</span> Suivi du dossier
               </Link>
               <Link to="/" className="flex-1 px-6 py-4 bg-transparent text-primary border border-primary/20 font-headline font-bold rounded-md hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
                 <span className="material-symbols-outlined text-lg">home</span> Accueil
               </Link>
            </div>

            <div className="pt-8 w-full mt-4 flex items-center justify-center gap-2 opacity-50">
               <span className="material-symbols-outlined text-sm">lock</span>
               <span className="font-label text-[10px] font-bold uppercase tracking-widest">Portail Sécurisé — Faculté des Sciences (UEH)</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
