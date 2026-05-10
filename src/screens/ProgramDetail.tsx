/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useParams, Link } from "react-router-dom";
import { PROGRAMS, CursusData, CoursMPC, CoursIngenierie } from "../constants";
import { allCursus } from "../data/cursus";
import { ArrowLeft, CheckCircle, Download, Calendar, FileText, Send, Bolt, Cpu, RadioTower, Terminal, type LucideIcon, BookOpen, Clock } from "lucide-react";

const areaIcons: Record<string, LucideIcon> = {
  bolt: Bolt,
  cpu: Cpu,
  "tower-control": RadioTower,
  terminal: Terminal
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
      <div className="flex flex-col items-center justify-center p-16 gap-4">
        <h1 className="font-display text-3xl font-bold text-on-surface">Programme inconnu</h1>
        <p className="text-on-surface-variant">Le programme demandé n'existe pas dans notre catalogue.</p>
        <Link to="/" className="fds-button-primary mt-4">Retour au catalogue</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="mb-8">
        <Link to="/" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors group">
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span className="fds-label-caps">Retour au catalogue</span>
        </Link>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Main Content */}
        <div className="md:col-span-8 flex flex-col gap-6">
          <section className="bg-surface border border-outline-variant p-8 flex flex-col justify-center">
            <div className="inline-flex items-center gap-1.5 bg-surface-container-high px-3 py-1 rounded-full w-max mb-6 border border-outline-variant">
              <CheckCircle className="w-3.5 h-3.5 text-success fill-current" />
              <span className="fds-label-caps text-[10px]">Ouvert aux candidatures</span>
            </div>
            <h1 className="font-display text-4xl font-bold text-on-surface mb-2">{program.name}</h1>
            <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed">
              {program.description}
            </p>
            
            <div className="mt-8 pt-6 border-t border-outline-variant flex flex-wrap gap-x-12 gap-y-6">
              {[
                { label: "Durée", value: program.duration },
                { label: "Crédits", value: program.credits },
                { label: "Code", value: program.code }
              ].map(stat => (
                <div key={stat.label}>
                  <span className="fds-label-caps text-outline block mb-1">{stat.label}</span>
                  <span className="font-mono text-sm font-bold text-on-surface">{stat.value}</span>
                </div>
              ))}
            </div>
          </section>

          {program.areas && (
            <section className="bg-surface-container border border-outline-variant p-8">
              <h2 className="font-display text-2xl font-bold mb-6">Domaines d'Intégration</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {program.areas.map(area => {
                  const Icon = areaIcons[area.icon] || FileText;
                  return (
                    <div key={area.name} className="bg-surface border border-outline-variant p-4 flex items-start gap-4 group hover:bg-surface-container-low transition-colors">
                      <div className="bg-primary-container/10 p-2 text-primary-container group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-primary-container text-base">{area.name}</h3>
                        <p className="text-xs text-on-surface-variant mt-1">{area.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Cours du programme */}
          {cursus && (
            <section className="bg-surface-container border border-outline-variant p-8">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-primary-container" />
                <h2 className="font-display text-2xl font-bold">Programme d'Études</h2>
              </div>

              <div className="space-y-8">
                {Object.entries(cursus.niveaux).map(([niveau, cours]) => (
                  <div key={niveau} className="border border-outline-variant rounded-lg p-6">
                    <h3 className="font-display text-xl font-bold text-primary-container mb-4 flex items-center gap-2">
                      <span className="bg-primary-container/10 px-3 py-1 rounded-full text-sm font-mono">
                        {niveau}
                      </span>
                      {isCursusMPC(cursus) 
                        ? `Année ${niveau.slice(-1)}` 
                        : (niveau === 'EN1' ? 'Semestre 1 et 2' : `Semestre ${niveau.slice(-1)}`)
                      }
                    </h3>

                    <div className="grid gap-3">
                      {cours.map((course) => (
                        <div key={course.item} className="bg-surface border border-outline-variant/50 p-4 hover:bg-surface-container-low transition-colors">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="bg-primary-container/10 text-primary-container px-2 py-0.5 text-xs font-mono font-bold rounded">
                                  {course.item}
                                </span>
                                <h4 className="font-display font-bold text-on-surface text-sm">
                                  {course.titre}
                                </h4>
                              </div>
                              {'code' in course && (
                                <span className="text-xs text-on-surface-variant font-mono bg-surface-container-high px-2 py-0.5 rounded">
                                  {course.code}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-4 text-sm">
                              {isCursusMPC(cursus) ? (
                                <>
                                  {course.heures_theorie && (
                                    <div className="flex items-center gap-1 text-on-surface-variant">
                                      <BookOpen className="w-4 h-4" />
                                      <span className="font-mono">{course.heures_theorie}h</span>
                                      <span className="text-xs">théorie</span>
                                    </div>
                                  )}
                                  {course.heures_tp && (
                                    <div className="flex items-center gap-1 text-on-surface-variant">
                                      <Clock className="w-4 h-4" />
                                      <span className="font-mono">{course.heures_tp}h</span>
                                      <span className="text-xs">TP</span>
                                    </div>
                                  )}
                                </>
                              ) : (
                                <div className="flex items-center gap-1 text-on-surface-variant">
                                  <Clock className="w-4 h-4" />
                                  <span className="font-mono">{course.heures}h</span>
                                  <span className="text-xs">total</span>
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
        <aside className="md:col-span-4 flex flex-col gap-6">
          <div className="bg-surface-container-high overflow-hidden min-h-[300px] border border-outline-variant relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-container/20 via-primary-container/10 to-surface-container-highest flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-20 h-20 mx-auto mb-4 bg-primary-container/10 rounded-full flex items-center justify-center">
                  <FileText className="w-10 h-10 text-primary-container" />
                </div>
                <span className="fds-label-caps text-primary-container block mb-1">Laboratoire Appliqué</span>
                <p className="text-sm text-on-surface-variant italic">Équipements de pointe pour la conception de systèmes embarqués.</p>
              </div>
            </div>
          </div>

          <section className="bg-primary-container p-8 text-on-primary flex flex-col gap-6 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-surface-container-highest" />
                <span className="fds-label-caps text-surface-container-highest">Session Automne 2026</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-white mb-2">Prêt à commencer ?</h2>
              <p className="text-sm text-white/70 leading-relaxed">
                Sécurisez votre place dans ce programme d'ingénierie de pointe. Les places sont limitées.
              </p>
            </div>
            
            <div className="mt-4 flex flex-col gap-3 relative z-10">
              <Link 
                to="/candidature" 
                className="w-full bg-surface text-primary-container font-display font-bold uppercase tracking-widest py-4 flex items-center justify-center gap-2 group hover:bg-surface-container-low transition-colors"
              >
                Candidater maintenant
                <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <button className="w-full bg-transparent border border-white/30 text-white font-display font-bold uppercase tracking-widest py-3 flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
                <Download className="w-4 h-4" />
                Syllabus (PDF)
              </button>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
