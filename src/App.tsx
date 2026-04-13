import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import MainLayout from "./layout/MainLayout";
import Contact from "./pages/Contact";
import Services from "./pages/services";
import Pricing from "./pages/Pricing";
import Legal from "./pages/Legal";

// 🔐 ADMIN
import Login from "./pages/Admin/Login";
import Dashboard from "./pages/Admin/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* ===================== */}
        {/* 🌐 SITE PUBLIC */}
        {/* ===================== */}

        <Route path="/" element={<MainLayout />} />
        <Route path="/services" element={<Services />} />
        <Route path="/tarifs" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />

        {/* LEGAL */}
        <Route path="/mentions-legales" element={<Legal defaultTab={0} />} />
        <Route path="/cgu-cgv" element={<Legal defaultTab={1} />} />
        <Route
          path="/confidentialite"
          element={<Legal defaultTab={2} />}
        />

        {/* ===================== */}
        {/* 🔐 ADMIN */}
        {/* ===================== */}

        <Route path="/admin/login" element={<Login />} />

        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* ===================== */}
        {/* 🔁 FALLBACK */}
        {/* ===================== */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </>
  );
}