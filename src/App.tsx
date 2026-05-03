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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="programme/:id" element={<ProgramDetail />} />
          <Route path="candidature" element={<Application />} />
          <Route path="aide" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
