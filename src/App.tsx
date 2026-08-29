import { Routes, Route, Navigate } from "react-router-dom";

import SchemaOrg from "./seo/SchemaOrg";
import GoogleAnalytics from "./seo/GoogleAnalytics";
import SEOHead from "./seo/SEOHead";
import { PAGES_SEO } from "./seo/seo.config";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CookieConsent from "./components/CookieConsent";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Legal from "./pages/Legal";

import Login from "./pages/Admin/Login";
import Dashboard from "./pages/Admin/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";

export default function App() {
  return (
    <>
      <SchemaOrg />
      <GoogleAnalytics />

      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <SEOHead {...PAGES_SEO.home} />
              <Home />
            </>
          }
        />
        <Route
          path="/services"
          element={
            <>
              <SEOHead {...PAGES_SEO.services} />
              <Services />
            </>
          }
        />
        <Route
          path="/tarifs"
          element={
            <>
              <SEOHead {...PAGES_SEO.tarifs} />
              <Pricing />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <SEOHead {...PAGES_SEO.contact} />
              <Contact />
            </>
          }
        />

        <Route path="/mentions-legales" element={<Legal defaultTab={0} />} />
        <Route path="/cgu-cgv" element={<Legal defaultTab={1} />} />
        <Route path="/confidentialite" element={<Legal defaultTab={2} />} />

        <Route
          path="/admin/login"
          element={
            <>
              <SEOHead
                title="Admin — Nantes WiFi Solutions"
                description="Connexion à l'administration Nantes WiFi Solutions."
                noIndex
              />
              <Login />
            </>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <>
                <SEOHead
                  title="Dashboard — Nantes WiFi Solutions"
                  description="Interface privée d'administration."
                  noIndex
                />
                <Dashboard />
              </>
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
      <CookieConsent />
    </>
  );
}
