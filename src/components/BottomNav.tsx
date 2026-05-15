/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link, useLocation } from "react-router-dom";

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    { name: "Candidat", path: "/candidature", icon: "assignment" },
    { name: "Accueil", path: "/", icon: "school" },
    { name: "Suivi", path: "/suivi", icon: "search" },
    { name: "Aide", path: "/aide", icon: "help" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/" || location.pathname.startsWith("/programme");
    }
    return location.pathname === path;
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 h-16 flex items-center justify-around bg-surface-container-lowest/90 backdrop-blur-md shadow-[0_-8px_24px_rgba(17,28,45,0.06)] pb-safe">
      {navItems.map((item) => {
        const active = isActive(item.path);
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all rounded-t-xl ${
              active 
                ? "text-primary bg-surface-container-low" 
                : "text-secondary hover:text-primary hover:bg-surface-container-low/50"
            }`}
          >
            <span className={`material-symbols-outlined text-[20px] ${active ? "font-bold" : ""}`}>
              {item.icon}
            </span>
            <span className="font-headline text-[10px] font-bold uppercase tracking-widest">
              {item.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
