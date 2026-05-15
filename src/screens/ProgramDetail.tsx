/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useParams, Link } from "react-router-dom";
import { PROGRAMS, CursusData } from "../constants";
import { allCursus } from "../data/cursus";

const areaIcons: Record<string, string> = {
  bolt: "bolt",
  cpu: "memory",
  "tower-control": "cell_tower",
  terminal: "terminal"
};

// Helper function to check if cursus is MPC type
const isCursusMPC = (cursus: CursusData): cursus is import("../constants").CursusMPC => {
  return 'niveaux' in cursus && Object.keys(cursus.niveaux).some(key => key.startsWith('MPC'));
};

export default function ProgramDetail() {
  const { id } = useParams();
  const program = PROGRAMS.find(p => p.id === id);
  const cursus = allCursus[id as keyof typeof allCursus] as CursusData | undefined;

  if (!program) {
    return (
      <div className="flex flex-col items-center justify-center p-16 gap-6">
        <h1 className="font-headline text-3xl font-bold text-on-surface">Programme inconnu</h1>
        <p className="font-body text-on-surface-variant text-lg">Le programme demandé n'existe pas dans notre catalogue.</p>
        <Link to="/" className="px-6 py-4 bg-primary text-on-primary font-headline font-bold rounded-md hover:bg-primary-container transition-all shadow-sm">
          Retour au catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <nav className="mb-10">
        <Link to="/" className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors group">
          <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">arrow_back</span>
          <span className="font-label text-xs font-semibold uppercase tracking-wider">Retour au catalogue</span>
        </Link>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Main Content */}
        <div className="md:col-span-8 flex flex-col gap-12">
          <section className="bg-surface-container-lowest rounded-xl p-8 md:p-12 border border-outline-variant/15 shadow-[0_8px_24px_rgba(17,28,45,0.06)] flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 bg-tertiary-container/20 text-tertiary px-3 py-1.5 rounded-md w-max mb-8">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              <span className="font-label text-[10px] font-bold uppercase tracking-widest">Ouvert aux candidatures</span>
            </div>
            <h1 className="font-headline text-4xl font-extrabold text-on-surface mb-6 tracking-tight">{program.name}</h1>
            <p className="font-body text-lg text-on-surface-variant max-w-2xl leading-relaxed">
              {program.description}
            </p>
            
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-outline-variant/15">
              {[
                { label: "Durée", value: program.duration },
                { label: "Crédits", value: program.credits },
                { label: "Code", value: program.code }
              ].map(stat => (
                <div key={stat.label}>
                  <span className="font-label text-xs font-semibold uppercase tracking-wider text-secondary block mb-2">{stat.label}</span>
                  <span className="font-headline text-lg font-bold text-on-surface">{stat.value}</span>
                </div>
              ))}
            </div>
          </section>

          {program.areas && (
            <section className="bg-surface-container-low rounded-xl p-8 md:p-12">
              <h2 className="font-headline text-2xl font-bold text-on-surface mb-8">Domaines d'Intégration</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {program.areas.map(area => {
                  const Icon = areaIcons[area.icon] || "description";
                  return (
                    <div key={area.name} className="bg-surface-container-lowest rounded-xl p-6 flex items-start gap-5 hover:shadow-[0_8px_24px_rgba(17,28,45,0.06)] transition-shadow">
                      <div className="bg-primary-container/10 p-3 rounded-md text-primary">
                        <span className="material-symbols-outlined text-xl">{Icon}</span>
                      </div>
                      <div>
                        <h3 className="font-headline font-bold text-primary text-base mb-2">{area.name}</h3>
                        <p className="font-body text-sm text-on-surface-variant leading-relaxed">{area.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Cours du programme */}
          {cursus && (
            <section className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 p-8 md:p-12">
              <div className="flex items-center gap-3 mb-10">
                <span className="material-symbols-outlined text-primary text-2xl">menu_book</span>
                <h2 className="font-headline text-2xl font-bold text-on-surface">Programme d'Études</h2>
              </div>

              <div className="space-y-12">
                {Object.entries(cursus.niveaux).map(([niveau, cours]) => (
                  <div key={niveau} className="bg-surface-container-low rounded-xl p-8">
                    <h3 className="font-headline text-xl font-bold text-primary mb-6 flex items-center gap-3">
                      <span className="bg-primary-fixed text-on-primary-fixed-variant px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest">
                        {niveau}
                      </span>
                    </h3>

                    <div className="grid gap-4">
                      {cours.map((course) => (
                        <div key={course.item} className="bg-surface-container-lowest rounded-xl p-6 hover:shadow-[0_4px_12px_rgba(17,28,45,0.04)] transition-shadow">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="bg-primary-container/5 text-primary border border-primary/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded">
                                  {course.item}
                                </span>
                                <h4 className="font-headline font-bold text-on-surface text-base">
                                  {course.titre}
                                </h4>
                              </div>
                              {'code' in course && (
                                <span className="text-[10px] text-secondary font-bold uppercase tracking-widest bg-surface-container-high px-2 py-0.5 rounded inline-block mt-2">
                                  {course.code}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-5 font-body text-sm">
                              {isCursusMPC(cursus) ? (
                                <>
                                  {course.heures_theorie && (
                                    <div className="flex items-center gap-1.5 text-secondary">
                                      <span className="material-symbols-outlined text-sm">menu_book</span>
                                      <span className="font-semibold">{course.heures_theorie}h</span>
                                      <span className="text-[10px] uppercase tracking-widest">théorie</span>
                                    </div>
                                  )}
                                  {course.heures_tp && (
                                    <div className="flex items-center gap-1.5 text-secondary">
                                      <span className="material-symbols-outlined text-sm">science</span>
                                      <span className="font-semibold">{course.heures_tp}h</span>
                                      <span className="text-[10px] uppercase tracking-widest">TP</span>
                                    </div>
                                  )}
                                </>
                              ) : (
                                <div className="flex items-center gap-1.5 text-secondary">
                                  <span className="material-symbols-outlined text-sm">schedule</span>
                                  <span className="font-semibold">{course.heures}h</span>
                                  <span className="text-[10px] uppercase tracking-widest">total</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar / CTA */}
        <aside className="md:col-span-4 flex flex-col gap-8">
          <div className="bg-surface-container-high rounded-xl overflow-hidden min-h-[320px] relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-container/20 via-primary-container/10 to-surface-container-highest flex items-center justify-center p-8 text-center">
              <div>
                <div className="w-20 h-20 mx-auto mb-6 bg-primary-container/10 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-primary">description</span>
                </div>
                <span className="font-label text-[10px] font-bold uppercase tracking-widest text-primary block mb-3">Laboratoire Appliqué</span>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed">Équipements de pointe pour la conception de systèmes embarqués.</p>
              </div>
            </div>
          </div>

          <section className="bg-primary rounded-xl p-8 text-on-primary flex flex-col gap-8 relative overflow-hidden shadow-lg">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-surface-container-highest text-sm">calendar_today</span>
                <span className="font-label text-[10px] font-bold uppercase tracking-widest text-surface-container-highest">Session Automne 2026</span>
              </div>
              <h2 className="font-headline text-3xl font-extrabold text-white mb-3">Prêt à commencer ?</h2>
              <p className="font-body text-sm text-white/80 leading-relaxed">
                Sécurisez votre place dans ce programme d'ingénierie de pointe. Les places sont limitées.
              </p>
            </div>
            
            <div className="flex flex-col gap-4 relative z-10">
              <Link 
                to="/candidature" 
                className="w-full bg-surface text-primary font-headline font-bold rounded-md hover:bg-surface-container-low transition-colors py-4 flex items-center justify-center gap-2 shadow-sm group"
              >
                Candidater maintenant
                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">send</span>
              </Link>
              <button 
                onClick={() => alert("Le PDF complet du syllabus de ce programme sera bientôt disponible en téléchargement.")}
                className="w-full bg-white/10 text-white border border-white/20 font-headline font-bold rounded-md hover:bg-white/20 transition-colors py-3 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">download</span>
                Syllabus (PDF)
              </button>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
