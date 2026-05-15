import React, { useState } from "react";
import { motion } from "motion/react";

export default function Contact() {
  const [formData, setFormData] = useState({ nom: "", email: "", message: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!formData.nom.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError("Veuillez remplir tous les champs avant d'envoyer le message.");
      return;
    }

    // Simulation d'envoi
    setSuccess(true);
    setFormData({ nom: "", email: "", message: "" });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-16">
      <div className="mb-12 text-center md:text-left">
        <h1 className="font-headline text-4xl font-extrabold text-on-surface mb-4 tracking-tight">Nous contacter</h1>
        <p className="font-body text-on-surface-variant text-lg leading-relaxed">
          Notre équipe de support technique est disponible pour résoudre vos problèmes d'accès ou de fonctionnalité.
        </p>
      </div>

      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 shadow-[0_8px_24px_rgba(17,28,45,0.06)] p-8 md:p-12 mb-12">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 bg-error/10 text-error p-4 rounded-md border-l-4 border-error text-sm font-body">
              <span className="material-symbols-outlined shrink-0 text-lg">error</span>
              {error}
            </motion.div>
          )}
          {success && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 bg-tertiary/10 text-tertiary p-4 rounded-md border-l-4 border-tertiary text-sm font-body">
              <span className="material-symbols-outlined shrink-0 text-lg">check_circle</span>
              Votre message a été envoyé avec succès. Nous vous répondrons bientôt.
            </motion.div>
          )}

          <div className="space-y-2">
            <label className="font-label text-xs font-semibold uppercase tracking-wider text-secondary" htmlFor="nom">Nom complet</label>
            <div className="relative group">
              <span className="absolute left-0 bottom-3 text-secondary group-focus-within:text-primary transition-colors">
                <span className="material-symbols-outlined text-lg">person</span>
              </span>
              <input 
                type="text" id="nom" 
                placeholder="Ex: Jean Dupont"
                className="w-full pl-8 py-2 bg-transparent border-0 border-b-2 border-outline-variant/30 focus:ring-0 focus:border-primary transition-all font-body text-on-surface placeholder:text-outline"
                value={formData.nom} onChange={e => setFormData({...formData, nom: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-label text-xs font-semibold uppercase tracking-wider text-secondary" htmlFor="email">Adresse institutionnelle</label>
            <div className="relative group">
              <span className="absolute left-0 bottom-3 text-secondary group-focus-within:text-primary transition-colors">
                <span className="material-symbols-outlined text-lg">alternate_email</span>
              </span>
              <input 
                type="email" id="email" 
                placeholder="utilisateur@ueh.edu.ht"
                className="w-full pl-8 py-2 bg-transparent border-0 border-b-2 border-outline-variant/30 focus:ring-0 focus:border-primary transition-all font-body text-on-surface placeholder:text-outline"
                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-label text-xs font-semibold uppercase tracking-wider text-secondary" htmlFor="message">Message détaillé</label>
            <textarea 
              id="message" rows={4}
              placeholder="Décrivez votre problème technique ou votre demande avec précision..."
              className="w-full mt-2 p-4 bg-surface-container-low rounded-xl border-0 focus:ring-2 focus:ring-primary transition-all font-body text-on-surface placeholder:text-outline resize-none"
              value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
            />
          </div>

          <div className="flex items-center gap-4 bg-surface-container-low p-6 rounded-xl border border-outline-variant/15">
            <span className="material-symbols-outlined text-secondary text-2xl">security</span>
            <span className="font-body text-sm text-secondary">Protection Anti-Spam (CAPTCHA Invisible) active</span>
          </div>

          <div className="pt-4 flex justify-end">
            <button type="submit" className="px-6 py-4 bg-primary text-on-primary font-headline font-bold rounded-md hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm w-full md:w-auto">
              Envoyer le message
              <span className="material-symbols-outlined text-lg">send</span>
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-surface-container-low rounded-xl p-8 flex flex-col gap-4">
          <span className="material-symbols-outlined text-primary text-3xl opacity-80">help</span>
          <h3 className="font-headline font-bold text-lg text-on-surface">Base de connaissances</h3>
          <p className="font-body text-sm text-on-surface-variant leading-relaxed">
            Consultez notre FAQ pour trouver des réponses immédiates aux questions les plus fréquentes sur les admissions.
          </p>
        </div>
        <div className="bg-surface-container-low rounded-xl p-8 flex flex-col gap-4 border-l-4 border-primary">
          <span className="material-symbols-outlined text-primary text-3xl opacity-80">support_agent</span>
          <h3 className="font-headline font-bold text-lg text-on-surface">Support Direct</h3>
          <p className="font-body text-sm text-on-surface-variant leading-relaxed">
            Pour les urgences administratives, nos bureaux sont ouverts du lundi au vendredi, de 9h00 à 15h00.
          </p>
        </div>
      </div>
    </div>
  );
}
