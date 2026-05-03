/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Outlet } from "react-router-dom";
import Header from "./Header";
import BottomNav from "./BottomNav";
import Footer from "./Footer";
import { motion, AnimatePresence } from "motion/react";
import { useLocation } from "react-router-dom";

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary-container selection:text-on-primary">
      <Header />
      <main className="flex-grow pb-24 md:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
