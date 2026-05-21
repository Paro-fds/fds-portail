/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
    <header className="sticky top-0 z-50 h-24 w-full bg-surface/80 backdrop-blur-md px-8 flex items-center justify-between border-b border-outline-variant/20">
      <Link to="/" className="flex items-center gap-3 group">
        <img
          src="/logo.jpg"
          alt="Faculté des Sciences"
          className="h-20 w-auto object-contain transition-transform group-hover:scale-105 mix-blend-multiply scale-110 origin-left"
        />
      </Link>

      <nav className="hidden md:flex h-full items-center gap-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`h-full flex items-center px-4 font-headline text-sm font-semibold transition-all rounded-md my-2 ${isActive(item.path)
                ? "bg-surface-bright text-primary"
                : "text-secondary hover:bg-surface-container-low hover:text-primary hover:translate-x-1"
              }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <button className="font-headline text-sm font-semibold uppercase tracking-tight text-primary bg-surface-container-low hover:bg-surface-container px-3 py-1.5 rounded-md transition-colors">
          FR/HT
        </button>
      </div>
    </header>
  );
}
