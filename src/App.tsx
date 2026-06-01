/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

// Chargement à la demande (lazy loading) — réduit le bundle initial
// Chaque page n'est téléchargée que lorsque l'utilisateur la visite
const Home = lazy(() => import("./screens/Home"));
const ProgramDetail = lazy(() => import("./screens/ProgramDetail"));
const Application = lazy(() => import("./screens/Application"));
const Contact = lazy(() => import("./screens/Contact"));
const Tracking = lazy(() => import("./screens/Tracking"));
const Login = lazy(() => import("./screens/Login"));
const AdminDashboard = lazy(() => import("./screens/AdminDashboard"));
const MotionGraphics = lazy(() => import("./screens/MotionGraphics"));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        {/* Suspense : affiche un indicateur pendant le chargement d'une page lazy */}
        <Suspense fallback={
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            background: "#020d1f",
            color: "#ffffff",
            fontFamily: "Inter, sans-serif",
            fontSize: "1rem",
            gap: "0.75rem"
          }}>
            <div style={{
              width: "20px",
              height: "20px",
              border: "2px solid rgba(255,255,255,0.2)",
              borderTop: "2px solid #4f8ef7",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite"
            }} />
            Chargement…
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="programme/:id" element={<ProgramDetail />} />
              <Route path="candidature" element={<Application />} />
              <Route path="suivi" element={<Tracking />} />
              <Route path="aide" element={<Contact />} />
              <Route path="login" element={<Login />} />
              
              {/* Route Sécurisée */}
              <Route element={<ProtectedRoute />}>
                <Route path="admin" element={<AdminDashboard />} />
              </Route>
            </Route>
            
            {/* Page Standalone Motion Graphics (hors Layout pour capture vidéo propre) */}
            <Route path="motion" element={<MotionGraphics />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}

