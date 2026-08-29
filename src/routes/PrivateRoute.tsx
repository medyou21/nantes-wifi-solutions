import { Navigate } from "react-router-dom";

/**
 * Composant garde-barrière pour les routes protégées.
 *
 * Vérifie la présence d'un token JWT dans le `localStorage` avant
 * d'autoriser l'accès au composant enfant. Si le token est absent,
 * redirige silencieusement vers la page de connexion.
 *
 * Utilisation :
 * @example
 * <Route
 *   path="/admin/dashboard"
 *   element={
 *     <PrivateRoute>
 *       <Dashboard />
 *     </PrivateRoute>
 *   }
 * />
 *
 * Limites connues :
 *  - La vérification est purement locale : on s'assure qu'un token
 *    existe, mais pas qu'il est valide ou non expiré côté serveur.
 *    Un token falsifié ou expiré passerait cette garde — la vraie
 *    vérification a lieu lors des appels API (réponse 401).
 *  - `children` est typé `any` : préférer `{ children: React.ReactNode }`
 *    pour bénéficier de la vérification de type sur le contenu rendu.
 */
export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  // Lecture synchrone du token depuis le localStorage.
  // `null` signifie que la clé est absente (jamais connecté ou après logout).
  const token = localStorage.getItem("token");

  if (!token) {
    // Token absent → redirection vers la page de connexion.
    // `replace` remplace l'entrée courante dans l'historique du navigateur
    // plutôt que d'en empiler une nouvelle — ainsi, le bouton "retour"
    // ne ramène pas l'utilisateur sur la route protégée qu'il tentait d'atteindre.
    return <Navigate to="/admin/login" replace />;
  }

  // Token présent → on rend le composant enfant protégé.
  // React Router v6 accepte de retourner `children` directement
  // sans l'envelopper dans un fragment ou un élément supplémentaire.
  return children;
}