/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from "react-router-dom";
import { PROGRAMS } from "../constants";
import { useActualites } from "../hooks/useActualites";
import { useDatesCles } from "../hooks/useDatesCles";
import { useState } from "react";

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { news, loading: newsLoading } = useActualites();
  const { dates } = useDatesCles();

  // Configuration visuelle par type de date
  const dateStyles: Record<string, { bg: string; iconBg: string; icon: string; labelClass: string; dateClass: string }> = {
    ouverture: { bg: "bg-surface-container-lowest border border-outline-variant/15", iconBg: "bg-primary-container/10 text-primary", icon: "event",         labelClass: "text-secondary", dateClass: "text-on-surface" },
    cloture:   { bg: "bg-surface-container-lowest border border-outline-variant/15", iconBg: "bg-error-container/50 text-error",     icon: "schedule",      labelClass: "text-secondary", dateClass: "text-on-surface" },
    concours:  { bg: "bg-primary shadow-lg",                                         iconBg: "bg-white/20 text-white",              icon: "school",         labelClass: "text-primary-fixed", dateClass: "text-white" },
    autre:     { bg: "bg-surface-container-lowest border border-outline-variant/15", iconBg: "bg-surface-container text-secondary", icon: "calendar_today", labelClass: "text-secondary", dateClass: "text-on-surface" },
  };

  const faqs = [
    { q: "Quelles sont les conditions d'admission au cycle propédeutique ?", a: "Vous devez être titulaire d'un baccalauréat (NS4) et réussir le concours d'admission organisé chaque année par la faculté." },
    { q: "Quels sont les frais de scolarité ?", a: "La FDS étant une entité de l'Université d'État d'Haïti, la scolarité est subventionnée. Seuls des frais annuels d'inscription sont requis." },
    { q: "Comment se déroule le concours d'admission ?", a: "Le concours comporte des épreuves écrites en mathématiques, physique et français. Les dates exactes sont publiées dans la section Dates Clés." },
    { q: "La FDS offre-t-elle des possibilités de logement ?", a: "La Faculté ne dispose pas de campus d'hébergement. Les étudiants de province doivent s'organiser pour le logement à Port-au-Prince." },
  ];
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary to-primary-container p-12 text-on-primary shadow-lg flex flex-col md:flex-row items-center gap-8 justify-between">
          <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] right-[10%] w-64 h-64 bg-tertiary/20 rounded-full blur-2xl"></div>
          <div className="relative z-10 max-w-2xl">
            <span className="font-label text-[10px] font-bold uppercase tracking-widest text-primary-fixed block mb-3">Faculté des Sciences — UEH</span>
            <h1 className="font-headline text-5xl font-extrabold text-white mb-4 tracking-tight">
              Portail d'Admission & d'Information
            </h1>
            <p className="font-body text-lg text-white/90 mb-8 leading-relaxed">
              Bienvenue sur la porte d'entrée numérique de la FDS. Explorez nos cycles de formation, suivez les actualités, consultez les dates clés et soumettez votre candidature en ligne.
            </p>
            <Link 
              to="/candidature" 
              className="px-6 py-4 bg-white text-primary font-headline font-bold rounded-md hover:bg-surface-container-low active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm w-max"
            >
              Démarrer une candidature
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Présentation de la Faculté */}
      <section className="mb-16">
        <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0_8px_24px_rgba(17,28,45,0.06)] border border-outline-variant/15">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="flex-1">
              <span className="font-label text-[10px] font-bold uppercase tracking-widest text-primary mb-3 inline-block">À propos de la FDS</span>
              <h2 className="font-headline text-3xl font-bold text-on-surface mb-6">La Faculté des Sciences de l’UEH</h2>
              <p className="font-body text-on-surface-variant leading-relaxed text-lg mb-8">
                La FDS est le pôle scientifique de l’Université d’État d’Haïti, formant des ingénieurs, des chercheurs et des techniciens capables de répondre aux enjeux du développement national. Elle associe rigueur académique, innovation et ancrage local pour permettre aux étudiants de réussir dans les domaines des sciences fondamentales et appliquées.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { title: "Rigueur scientifique", text: "Programmes solides et encadrement académique" },
                  { title: "Ouverture métier", text: "Parcours orientés vers l’ingénierie, la recherche et le secteur technique" },
                  { title: "Accès national", text: "Un portail pensé pour les candidats en province et en ville" }
                ].map((item) => (
                  <div key={item.title} className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/15">
                    <h3 className="font-headline text-sm font-bold text-primary mb-3">{item.title}</h3>
                    <p className="font-body text-sm text-on-surface-variant leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/3 bg-primary-container/5 rounded-xl p-8 border-l-4 border-primary">
              <div className="text-primary font-headline font-bold uppercase tracking-wide mb-4">Mission</div>
              <p className="font-body text-on-surface-variant leading-relaxed">
                Offrir une visibilité claire et accessible aux programmes de formation, simplifier l’accès à l’information et réduire la dépendance aux contacts physiques pour les futurs candidats.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dates Clés - Important institutional block */}
      <section className="mb-16">
        <div className="bg-surface-container-low rounded-xl p-8 border-l-4 border-primary">
          <div className="flex items-center gap-3 mb-8">
            <span className="material-symbols-outlined text-primary text-2xl">calendar_today</span>
            <h2 className="font-headline font-bold text-xl text-primary">
              Dates Clés — Admission 2026
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dates.map((d) => {
              const s = dateStyles[d.type] ?? dateStyles.autre;
              return (
                <div key={d.id} className={`${s.bg} p-6 rounded-xl flex items-start gap-4`}>
                  <div className={`${s.iconBg} p-3 rounded-md`}>
                    <span className="material-symbols-outlined">{s.icon}</span>
                  </div>
                  <div>
                    <span className={`font-label text-xs font-semibold uppercase tracking-wider ${s.labelClass} block mb-1`}>{d.label}</span>
                    <span className={`font-headline font-bold text-lg ${s.dateClass}`}>{d.date}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Actualités & Blog */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-2xl">newspaper</span>
            <h2 className="font-headline text-2xl font-bold text-on-surface">Actualités & Annonces</h2>
          </div>
          <button className="text-sm font-bold text-primary hover:underline hidden sm:block">Voir tout</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsLoading ? (
            // Squelette de chargement — 3 cartes placeholder
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 flex flex-col h-full overflow-hidden animate-pulse">
                <div className="h-32 bg-surface-container-high" />
                <div className="p-6 flex flex-col gap-3">
                  <div className="h-3 w-20 bg-surface-container-high rounded" />
                  <div className="h-5 w-full bg-surface-container-high rounded" />
                  <div className="h-5 w-3/4 bg-surface-container-high rounded" />
                  <div className="h-3 w-full bg-surface-container rounded mt-2" />
                  <div className="h-3 w-5/6 bg-surface-container rounded" />
                </div>
              </div>
            ))
          ) : (
            // Articles réels (Sanity ou statiques selon configuration)
            [...news]
              .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))
              .slice(0, 3)
              .map((item) => {
                // Résolution de l'URL finale :
                // fichierPdfUrl (PDF uploadé dans Sanity) est prioritaire sur actionUrl
                const resolvedUrl = item.fichierPdfUrl ?? item.actionUrl;
                // Si un PDF est uploadé, forcer le type "telecharger"
                const resolvedType = item.fichierPdfUrl ? "telecharger" : (item.actionType ?? "lire");

                const ACTION_CONFIG: Record<string, { label: string; icon: string; isExternal?: boolean; isDownload?: boolean }> = {
                  lire:       { label: "Lire l'article",  icon: "arrow_forward", isExternal: true },
                  telecharger:{ label: "Télécharger",     icon: "download",      isDownload: true },
                  voir:       { label: "Voir",            icon: "open_in_new",   isExternal: true },
                  inscrire:   { label: "S'inscrire",      icon: "how_to_reg" },
                };
                const action = ACTION_CONFIG[resolvedType] ?? ACTION_CONFIG.lire;
                const hasUrl = !!resolvedUrl;

                // Rendu du bouton d'action
                const ActionBtn = () => {
                  const btnClass = `text-sm font-bold inline-flex items-center gap-1.5 group w-max mt-auto ${
                    hasUrl
                      ? "text-primary hover:underline cursor-pointer"
                      : "text-on-surface-variant/40 cursor-not-allowed"
                  }`;
                  const iconClass = `material-symbols-outlined text-[18px] ${hasUrl ? "group-hover:translate-x-0.5 transition-transform" : ""}`;
                  const inner = <><span>{action.label}</span><span className={iconClass}>{action.icon}</span></>;

                  if (!hasUrl) return <span className={btnClass}>{inner}</span>;

                  // Lien externe ou téléchargement
                  if (action.isExternal || action.isDownload) {
                    return (
                      <a
                        href={resolvedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={action.isDownload || undefined}
                        className={btnClass}
                      >
                        {inner}
                      </a>
                    );
                  }

                  // Lien interne (React Router)
                  return <Link to={resolvedUrl!} className={btnClass}>{inner}</Link>;
                };

                return (
                  <div key={item.id} className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 hover:shadow-[0_8px_24px_rgba(17,28,45,0.06)] transition-all flex flex-col h-full overflow-hidden">
                    <div className="h-32 bg-surface-container-high relative overflow-hidden flex items-center justify-center">
                      <span className="material-symbols-outlined text-4xl text-on-surface-variant opacity-20">newspaper</span>
                      <div className="absolute top-4 right-4 flex items-center gap-2">
                        {item.pinned && (
                          <span className="bg-primary text-on-primary text-[10px] font-bold px-2 py-1 uppercase tracking-widest rounded-md flex items-center gap-1">
                            <span className="material-symbols-outlined" style={{fontSize:"12px"}}>push_pin</span>
                            À la une
                          </span>
                        )}
                        <span className="bg-surface text-[10px] font-bold px-2 py-1 uppercase tracking-widest rounded-md">{item.tag}</span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-3">{item.date}</span>
                      <h3 className="font-headline font-bold text-lg text-on-surface mb-3 line-clamp-2">{item.title}</h3>
                      <p className="font-body text-sm text-on-surface-variant leading-relaxed line-clamp-3 mb-6 flex-1">{item.desc}</p>
                      <ActionBtn />
                    </div>
                  </div>
                );
              })

          )}
        </div>
      </section>

      {/* Catalog Grid */}
      <div id="catalogue" className="grid grid-cols-1 md:grid-cols-12 gap-8 scroll-mt-24 mb-16">
        {/* Cycle Propédeutique */}
        {(() => {
          const propProgram = PROGRAMS.find(p => p.category === "Propédeutique");
          return propProgram ? (
            <section className="md:col-span-12 bg-surface-container-lowest rounded-xl border border-outline-variant/15 p-8 hover:shadow-[0_8px_24px_rgba(17,28,45,0.06)] transition-all group">
              <Link to={`/programme/${propProgram.id}`} className="block">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-16 h-16 bg-primary-container/10 rounded-xl flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="text-3xl font-headline font-bold">Σ</span>
                  </div>
                  <div>
                    <h2 className="font-headline text-3xl font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">
                      {propProgram.name}
                    </h2>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="bg-primary-fixed text-on-primary-fixed-variant px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded">Tronc Commun</span>
                      <span className="text-secondary text-sm flex items-center gap-1 font-body font-medium">
                        <span className="material-symbols-outlined text-sm">schedule</span> {propProgram.duration.toLowerCase()}
                      </span>
                    </div>
                    <p className="font-body text-base text-on-surface-variant max-w-4xl leading-relaxed">
                      {propProgram.description}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-outline-variant/15">
                  {["Maths", "Physique", "Chimie"].map(sub => (
                    <div key={sub} className="bg-surface-container-low p-4 rounded-xl text-center font-headline font-bold text-primary">
                      {sub}
                    </div>
                  ))}
                </div>
              </Link>
            </section>
          ) : null;
        })()}

        {/* Spécialisations en Génie */}
        <section className="md:col-span-8 bg-surface-container-lowest rounded-xl border border-outline-variant/15 p-8">
          <div className="flex items-center gap-3 mb-8">
            <span className="material-symbols-outlined text-secondary text-xl">domain</span>
            <h2 className="font-headline text-xl font-bold text-on-surface">Spécialisations en Génie</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PROGRAMS.filter(p => p.category === "Génie").map(prog => (
              <Link 
                key={prog.id} 
                to={`/programme/${prog.id}`}
                className="bg-surface-container-low p-6 rounded-xl hover:bg-surface-container transition-colors group"
              >
                <h3 className="font-headline font-bold text-primary mb-3 group-hover:underline">
                  {prog.name}
                </h3>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed line-clamp-2">
                  {prog.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Filières Scientifiques & Techniques */}
        <section className="md:col-span-4 bg-surface-container-low rounded-xl p-8 flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <span className="material-symbols-outlined text-secondary text-xl">science</span>
            <h2 className="font-headline text-lg font-bold text-on-surface">Filières Scientifiques</h2>
          </div>
          <div className="space-y-4 flex-grow">
            {["Licence en Chimie", "Topographie", "Tech. Analyste Programmeur"].map(item => (
              <div key={item} className="bg-surface-container-lowest p-4 rounded-xl flex justify-between items-center group cursor-pointer hover:shadow-[0_4px_12px_rgba(17,28,45,0.04)] transition-all">
                <span className="font-body text-sm font-semibold text-on-surface">{item}</span>
                <span className="material-symbols-outlined text-secondary text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-surface-container p-6 rounded-xl text-center flex flex-col items-center gap-3">
            <span className="material-symbols-outlined text-primary text-xl">info</span>
            <p className="font-body text-xs text-on-surface-variant font-medium leading-relaxed">
              Cycles courts ou licences spécialisées axées sur la pratique technique.
            </p>
          </div>
        </section>
      </div>

      {/* FAQ Section */}
      <section className="mb-12 mt-16">
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 p-8 md:p-12">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-primary-container/10 rounded-full flex items-center justify-center mx-auto mb-6">
               <span className="material-symbols-outlined text-primary text-3xl">help</span>
            </div>
            <h2 className="font-headline text-3xl font-bold text-on-surface mb-4">Foire Aux Questions</h2>
            <p className="font-body text-lg text-on-surface-variant">Les réponses aux questions les plus fréquentes posées par nos candidats.</p>
          </div>
          
          <div className="flex flex-col gap-4 max-w-3xl mx-auto">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-surface-container-low rounded-xl overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-surface-container transition-colors"
                >
                  <span className="font-headline font-bold text-on-surface pr-6">{faq.q}</span>
                  <span className="material-symbols-outlined text-primary shrink-0">
                    {openFaq === idx ? "expand_less" : "expand_more"}
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-6 pt-0 font-body text-sm text-on-surface-variant leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="font-body text-sm text-on-surface-variant mb-6">Vous n'avez pas trouvé la réponse à votre question ?</p>
            <Link to="/aide" className="px-6 py-3 bg-surface-container-high text-primary font-headline font-bold rounded-md hover:bg-surface-container transition-colors inline-flex items-center justify-center">
               Contacter l'administration
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
