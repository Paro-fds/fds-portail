import React, { useState } from "react";
import { motion } from "motion/react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

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

      <Card className="p-8 md:p-12 mb-12">
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

          <Input 
            label="Nom complet" id="nom" placeholder="Ex: Jean Dupont" icon="person"
            value={formData.nom} onChange={e => setFormData({...formData, nom: e.target.value})}
          />

          <Input 
            label="Adresse institutionnelle" id="email" type="email" placeholder="utilisateur@ueh.edu.ht" icon="alternate_email"
            value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
          />

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
            <Button type="submit" icon="send">
              Envoyer le message
            </Button>
          </div>
        </form>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card variant="flat" className="flex flex-col gap-4">
          <span className="material-symbols-outlined text-primary text-3xl opacity-80">help</span>
          <h3 className="font-headline font-bold text-lg text-on-surface">Base de connaissances</h3>
          <p className="font-body text-sm text-on-surface-variant leading-relaxed">
            Consultez notre FAQ pour trouver des réponses immédiates aux questions les plus fréquentes sur les admissions.
          </p>
        </Card>
        <Card variant="accent" className="flex flex-col gap-4">
          <span className="material-symbols-outlined text-primary text-3xl opacity-80">support_agent</span>
          <h3 className="font-headline font-bold text-lg text-on-surface">Support Direct</h3>
          <p className="font-body text-sm text-on-surface-variant leading-relaxed">
            Pour les urgences administratives, nos bureaux sont ouverts du lundi au vendredi, de 9h00 à 15h00.
          </p>
        </Card>
      </div>
    </div>
  );
}
