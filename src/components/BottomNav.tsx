/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GraduationCap, ClipboardList, LifeBuoy } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    { name: "Candidature", path: "/candidature", icon: ClipboardList },
    { name: "Accueil", path: "/", icon: GraduationCap },
    { name: "Aide", path: "/aide", icon: LifeBuoy },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/" || location.pathname.startsWith("/programme");
    }
    return location.pathname === path;
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 h-16 flex items-center justify-around bg-surface border-t border-outline-variant">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.path);
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all ${
              active 
                ? "text-primary-container bg-surface-container-low border-t-2 border-primary-container" 
                : "text-on-surface-variant hover:text-primary-container"
            }`}
          >
            <Icon className={`w-5 h-5 ${active ? "fill-current" : ""}`} />
            <span className="font-display text-[10px] font-bold uppercase tracking-widest">
              {item.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
