/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-primary text-white/90 border-t border-outline-variant">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Identité */}
          <div>
            <h3 className="font-display text-lg font-black uppercase tracking-tight text-white mb-4">
              Faculté des Sciences
            </h3>
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              Université d'État d'Haïti (UEH). Fondée en 1902, la FDS forme les ingénieurs et scientifiques qui bâtissent l'avenir d'Haïti.
            </p>
            <p className="text-xs text-white/40 font-mono">
              © {new Date().getFullYear()} FDS — UEH
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-white/70 mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-white/50 mt-0.5 shrink-0" />
                <span className="text-white/70">Delmas 33, Port-au-Prince, Haïti</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-white/50 shrink-0" />
                <span className="text-white/70">+509 XX XX XXXX</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-white/50 shrink-0" />
                <span className="text-white/70">contact@fds.edu.ht</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-white/50 shrink-0" />
                <span className="text-white/70">Lun — Ven : 9h00 — 15h00</span>
              </li>
            </ul>
          </div>

          {/* Liens rapides */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-white/70 mb-4">
              Liens rapides
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/#catalogue" className="text-white/60 hover:text-white transition-colors">
                  Catalogue des programmes
                </a>
              </li>
              <li>
                <Link to="/candidature" className="text-white/60 hover:text-white transition-colors">
                  Déposer une candidature
                </Link>
              </li>
              <li>
                <Link to="/aide" className="text-white/60 hover:text-white transition-colors">
                  Contact & Aide
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 px-4 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-white/30 font-mono uppercase tracking-widest">
          <span>Portail Institutionnel — Faculté des Sciences, UEH</span>
          <span>Projet GL-EN3-2026</span>
        </div>
      </div>
    </footer>
  );
}
