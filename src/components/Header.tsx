/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Lock } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  const navItems = [
    { name: "Accueil", path: "/" },
    { name: "Candidature", path: "/candidature" },
    { name: "Suivi", path: "/suivi" },
    { name: "Aide", path: "/aide" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/" || location.pathname.startsWith("/programme");
    }
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 h-14 w-full border-b border-outline-variant bg-surface px-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="bg-primary-container p-1 rounded-none transition-transform group-hover:scale-105">
          <Lock className="w-4 h-4 text-on-primary fill-current" />
        </div>
        <span className="font-display text-lg font-black uppercase tracking-tighter text-primary-container">
          FDS Portail
        </span>
      </Link>

      <nav className="hidden md:flex h-full items-center gap-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`h-full flex items-center px-2 font-display text-sm font-bold uppercase tracking-tight transition-colors border-b-2 ${
              isActive(item.path)
                ? "text-primary-container border-primary-container"
                : "text-on-surface-variant border-transparent hover:text-primary-container hover:bg-surface-container-low"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <button className="font-display text-sm font-bold uppercase tracking-tight text-primary-container hover:bg-surface-container-low px-2 py-1 transition-colors">
          FR/HT
        </button>
      </div>
    </header>
  );
}
