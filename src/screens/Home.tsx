/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from "react-router-dom";
import { PROGRAMS } from "../constants";
import { ArrowRight, Building2, Beaker, Info, Calendar, School, Clock } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="bg-surface-container rounded-none p-8 border border-outline-variant flex flex-col md:flex-row items-center gap-8 justify-between relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <h1 className="font-display text-4xl font-black text-primary-container mb-4">
              Catalogue des Programmes
            </h1>
            <p className="text-lg text-on-surface-variant mb-6 leading-relaxed">
              Explorez nos cycles de formation, spécialisations en génie et filières scientifiques. La Faculté des Sciences (UEH) offre un enseignement rigoureux pour former les cadres techniques et scientifiques de demain.
            </p>
            <Link 
              to="/candidature" 
              className="fds-button-primary inline-flex items-center gap-2 group"
            >
              Démarrer une candidature
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="hidden md:block absolute right-[-5%] top-[-10%] w-64 h-64 bg-primary-container/5 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Dates Clés - Important institutional block */}
      <section className="mb-12">
        <div className="bg-surface-container-high border-2 border-primary-container/10 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="text-primary-container w-6 h-6" />
            <h2 className="font-display font-bold uppercase tracking-widest text-primary-container">
              Dates Clés — Admission 2026
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 border border-outline-variant flex items-start gap-4">
              <div className="bg-primary-container/10 p-2 text-primary-container"><Calendar className="w-5 h-5" /></div>
              <div>
                <span className="fds-label-caps block mb-1">Ouverture</span>
                <span className="font-display font-bold text-lg">15 Juillet 2026</span>
              </div>
            </div>
            <div className="bg-white p-4 border border-outline-variant flex items-start gap-4">
              <div className="bg-error-container/20 p-2 text-error"><Clock className="w-5 h-5" /></div>
              <div>
                <span className="fds-label-caps block mb-1">Clôture</span>
                <span className="font-display font-bold text-lg">30 Août 2026</span>
              </div>
            </div>
            <div className="bg-primary-container text-on-primary p-4 shadow-md flex items-start gap-4">
              <div className="bg-white/20 p-2"><School className="w-5 h-5" /></div>
              <div>
                <span className="text-xs font-bold uppercase text-white/70 block mb-1">Concours</span>
                <span className="font-display font-bold text-lg">15 Septembre 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Cycle Propédeutique */}
        {(() => {
          const propProgram = PROGRAMS.find(p => p.category === "Propédeutique");
          return propProgram ? (
            <section className="md:col-span-12 bg-surface border border-outline-variant p-6 hover:border-primary-container transition-colors group">
              <Link to={`/programme/${propProgram.id}`} className="block">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-surface-container-highest flex items-center justify-center text-primary-container shrink-0">
                    <span className="text-2xl font-bold">Σ</span>
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold text-on-surface mb-1 group-hover:text-primary-container">
                      {propProgram.name}
                    </h2>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 text-[10px] font-bold uppercase">Tronc Commun</span>
                      <span className="text-on-surface-variant text-sm flex items-center gap-1 font-mono">
                        <Clock className="w-4 h-4" /> {propProgram.duration.toLowerCase()}
                      </span>
                    </div>
                    <p className="text-sm text-on-surface-variant max-w-3xl leading-relaxed">
                      {propProgram.description}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 border-t border-outline-variant/30 pt-6">
                  {["Maths", "Physique", "Chimie"].map(sub => (
                    <div key={sub} className="bg-surface-container-low border border-outline-variant/50 p-3 text-center font-display font-bold text-primary-container">
                      {sub}
                    </div>
                  ))}
                </div>
              </Link>
            </section>
          ) : null;
        })()}

        {/* Spécialisations en Génie */}
        <section className="md:col-span-8 bg-surface border border-outline-variant p-6">
          <div className="flex items-center gap-3 mb-6 border-b border-outline-variant/30 pb-4">
            <Building2 className="text-on-surface-variant w-5 h-5" />
            <h2 className="font-display text-xl font-bold">Spécialisations en Génie</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROGRAMS.filter(p => p.category === "Génie").map(prog => (
              <Link 
                key={prog.id} 
                to={`/programme/${prog.id}`}
                className="border border-outline-variant/50 p-4 hover:bg-surface-container-low transition-colors group"
              >
                <h3 className="font-display font-bold text-primary-container mb-2 group-hover:underline">
                  {prog.name}
                </h3>
                <p className="text-xs text-on-surface-variant line-clamp-2">
                  {prog.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Filières Scientifiques & Techniques */}
        <section className="md:col-span-4 bg-surface-container-low border border-outline-variant p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-6 border-b border-outline-variant/30 pb-4">
            <Beaker className="text-on-surface-variant w-5 h-5" />
            <h2 className="font-display text-lg font-bold">Filières Scientifiques</h2>
          </div>
          <div className="space-y-3 flex-grow">
            {["Licence en Chimie", "Topographie", "Tech. Analyste Programmeur"].map(item => (
              <div key={item} className="bg-surface border border-outline-variant/50 p-3 flex justify-between items-center group cursor-pointer hover:border-primary-container">
                <span className="text-sm font-medium text-on-surface">{item}</span>
                <ArrowRight className="w-4 h-4 text-outline transition-transform group-hover:translate-x-1" />
              </div>
            ))}
          </div>
          <div className="mt-6 bg-surface-container-highest p-4 border border-outline-variant/30 text-center flex flex-col items-center gap-2">
            <Info className="w-5 h-5 text-primary-container" />
            <p className="text-xs text-on-surface-variant font-medium italic">
              Cycles courts ou licences spécialisées axées sur la pratique technique.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
