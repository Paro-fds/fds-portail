/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Mail, Shield, Send, MessageCircle, HelpCircle } from "lucide-react";
import { motion } from "motion/react";

export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-16">
      <div className="mb-10 text-center md:text-left">
        <h1 className="font-display text-4xl font-black text-primary-container mb-3 uppercase tracking-tighter">Nous contacter</h1>
        <p className="text-on-surface-variant text-lg">
          Notre équipe de support technique est disponible pour résoudre vos problèmes d'accès ou de fonctionnalité.
        </p>
      </div>

      <div className="bg-surface border border-outline-variant p-6 md:p-10">
        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="fds-label-caps" htmlFor="nom">Nom complet</label>
            <input 
              type="text" id="nom" 
              placeholder="Ex: Jean Dupont"
              className="h-11 border border-outline-variant px-4 bg-surface focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="fds-label-caps" htmlFor="email">Adresse institutionnelle</label>
            <input 
              type="email" id="email" 
              placeholder="utilisateur@ueh.edu.ht"
              className="h-11 border border-outline-variant px-4 bg-surface focus:outline-none focus:border-primary-container transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="fds-label-caps" htmlFor="message">Message détaillé</label>
            <textarea 
              id="message" rows={5}
              placeholder="Décrivez votre problème technique ou votre demande avec précision..."
              className="border border-outline-variant p-4 bg-surface focus:outline-none focus:border-primary-container transition-colors resize-none"
            />
          </div>

          <div className="flex items-center gap-3 bg-surface-container-low p-4 border border-outline-variant/30">
            <Shield className="w-5 h-5 text-on-surface-variant/50" />
            <span className="text-sm font-medium text-on-surface-variant/70">Protection Anti-Spam (CAPTCHA Invisible) active</span>
          </div>

          <div className="pt-6">
            <button className="fds-button-primary flex items-center justify-center gap-2 group w-full md:w-auto min-w-[200px]">
              <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              Envoyer le message
            </button>
          </div>
        </form>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface-container-low border border-outline-variant/30 p-6 flex flex-col gap-3">
          <HelpCircle className="w-8 h-8 text-primary-container/20" />
          <h3 className="font-display font-black uppercase text-sm tracking-widest">Base de connaissances</h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Consultez notre FAQ pour trouver des réponses immédiates aux questions les plus fréquentes sur les admissions.
          </p>
        </div>
        <div className="bg-surface-container-low border border-outline-variant/30 p-6 flex flex-col gap-3">
          <MessageCircle className="w-8 h-8 text-primary-container/20" />
          <h3 className="font-display font-black uppercase text-sm tracking-widest">Support Direct</h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Pour les urgences administratives, nos bureaux sont ouverts du lundi au vendredi, de 9h00 à 15h00.
          </p>
        </div>
      </div>
    </div>
  );
}
