import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminLogin from "../pages/Admin/Login";
import Dashboard from "../pages/Admin/Dashboard";
import PrivateRoute from "./PrivateRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔐 LOGIN ADMIN */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* 📊 DASHBOARD PROTÉGÉ */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* 🔁 REDIRECTION PAR DÉFAUT */}
        <Route path="*" element={<Navigate to="/admin/login" />} />
      </Routes>
    </BrowserRouter>
  );
}