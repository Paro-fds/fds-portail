/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-12">
      <div className="max-w-[1200px] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Identité */}
          <div className="md:col-span-5">
            <h3 className="font-headline text-2xl font-bold text-white mb-6">
              Faculté des Sciences
            </h3>
            <p className="font-body text-base text-white/80 leading-relaxed mb-6 max-w-md">
              Université d'État d'Haïti (UEH). Fondée en 1902, la FDS forme les ingénieurs et scientifiques qui bâtissent l'avenir d'Haïti.
            </p>
            <p className="font-body text-sm text-white/50">
              © {new Date().getFullYear()} FDS — UEH
            </p>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="font-label text-xs font-semibold uppercase tracking-wider text-white/60 mb-6">
              Contact
            </h4>
            <ul className="space-y-4 font-body text-sm text-white/80">
              <li className="flex items-start gap-3 hover:text-white transition-colors cursor-default">
                <span className="material-symbols-outlined text-white/50 text-lg">location_on</span>
                <span>Delmas 33, Port-au-Prince, Haïti</span>
              </li>
              <li className="flex items-center gap-3 hover:text-white transition-colors cursor-default">
                <span className="material-symbols-outlined text-white/50 text-lg">call</span>
                <span>+509 XX XX XXXX</span>
              </li>
              <li className="flex items-center gap-3 hover:text-white transition-colors cursor-default">
                <span className="material-symbols-outlined text-white/50 text-lg">mail</span>
                <span>contact@fds.edu.ht</span>
              </li>
              <li className="flex items-center gap-3 hover:text-white transition-colors cursor-default">
                <span className="material-symbols-outlined text-white/50 text-lg">schedule</span>
                <span>Lun — Ven : 9h00 — 15h00</span>
              </li>
            </ul>
          </div>

          {/* Liens rapides */}
          <div className="md:col-span-3">
            <h4 className="font-label text-xs font-semibold uppercase tracking-wider text-white/60 mb-6">
              Liens rapides
            </h4>
            <ul className="space-y-4 font-body text-sm">
              <li>
                <a href="/#catalogue" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-transform">
                  Catalogue des programmes
                </a>
              </li>
              <li>
                <Link to="/candidature" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-transform">
                  Déposer une candidature
                </Link>
              </li>
              <li>
                <Link to="/aide" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-transform">
                  Contact & Aide
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-8 pb-8 pt-4">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-widest text-white/40">
          <span>Portail Institutionnel — Faculté des Sciences, UEH</span>
          <span>Projet GL-EN3-2026</span>
        </div>
      </div>
    </footer>
  );
}
