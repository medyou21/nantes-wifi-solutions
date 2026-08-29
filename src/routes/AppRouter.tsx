import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminLogin from "../pages/Admin/Login";
import Dashboard from "../pages/Admin/Dashboard";
import PrivateRoute from "./PrivateRoute";

/**
 * Routeur principal de l'application d'administration.
 *
 * Déclare trois routes :
 *  - `/admin/login`     → page de connexion publique
 *  - `/admin/dashboard` → tableau de bord protégé par `PrivateRoute`
 *  - `*`               → redirection catch-all vers la page de connexion
 *
 * Architecture de protection :
 *  `PrivateRoute` agit comme un garde-barrière — il vérifie la présence
 *  d'un token JWT valide avant de rendre le composant enfant.
 *  Si le token est absent ou invalide, il redirige vers `/admin/login`.
 *
 * Note : `BrowserRouter` est déclaré ici (et non dans `main.tsx`) ce qui
 * signifie que ce routeur est autonome. Si l'app venait à intégrer
 * un routeur parent, il faudrait remplacer `BrowserRouter` par `Routes`
 * seul pour éviter l'imbrication de deux contextes de routage.
 */
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ── Page de connexion admin — accessible sans authentification ── */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/*
         * ── Dashboard protégé ───────────────────────────────────────────
         * `PrivateRoute` enveloppe `Dashboard` : si l'utilisateur n'est pas
         * authentifié, le composant enfant n'est jamais rendu — il est
         * remplacé par une redirection vers `/admin/login`.
         *
         * Utiliser un wrapper plutôt qu'un loader/middleware permet de
         * garder la logique de protection côté composant React,
         * compatible avec toutes les versions de React Router v6.
         */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/*
         * ── Catch-all — toute URL inconnue ─────────────────────────────
         * `path="*"` capture toutes les routes non définies ci-dessus.
         * `<Navigate>` effectue une redirection déclarative (rendu JSX)
         * plutôt qu'impérative (`useNavigate`), ce qui est le pattern
         * recommandé dans les déclarations de routes React Router v6.
         *
         * Redirige vers `/admin/login` plutôt que vers une page 404 :
         * cohérent pour une interface 100% admin où tout accès non
         * authentifié doit passer par la connexion.
         */}
        <Route path="*" element={<Navigate to="/admin/login" />} />

      </Routes>
    </BrowserRouter>
  );
}