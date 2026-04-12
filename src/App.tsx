// ─── App.tsx corrigé ───────────────────────────────────────────────────────

import { Routes, Route } from "react-router-dom";
import Legal from "./pages/Legal";
import Navbar from "./components/Navbar";
import MainLayout from "./layout/MainLayout";
import Contact from "./pages/Contact";
import Services from "./pages/services";
import Pricing from "./pages/Pricing";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"                  element={<MainLayout />} />
        <Route path="/services"          element={<Services />} />
        <Route path="/tarifs"            element={<Pricing />} />
        <Route path="/contact"           element={<Contact />} />
        <Route path="/mentions-legales"  element={<Legal defaultTab={0} />} />
        <Route path="/cgu-cgv"           element={<Legal defaultTab={1} />} />
        <Route path="/confidentialite"   element={<Legal defaultTab={2} />} />
      </Routes>
      <Footer />
    </>
  );
}