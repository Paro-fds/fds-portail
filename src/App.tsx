/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./screens/Home";
import ProgramDetail from "./screens/ProgramDetail";
import Application from "./screens/Application";
import Contact from "./screens/Contact";
import Tracking from "./screens/Tracking";
import Login from "./screens/Login";
import AdminDashboard from "./screens/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
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
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
