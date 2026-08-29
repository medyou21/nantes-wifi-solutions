import {
  AppBar, Toolbar, Typography, Button, Box,
  IconButton, Drawer, List, ListItem,
  ListItemButton, ListItemText, Chip,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";

import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo1.png";

// ─────────────────────────────────────────────
// NAVIGATION PUBLIC
// ─────────────────────────────────────────────
const navLinks = [
  { label: "Services", path: "/services" },
  { label: "Tarifs", path: "/tarifs" },
  { label: "Contact", path: "/contact" },
];

// ─────────────────────────────────────────────
// NAVIGATION ADMIN
// ─────────────────────────────────────────────
const adminLinks = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon sx={{ fontSize: 16 }} />
  },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // état drawer mobile
  const [drawerOpen, setDrawerOpen] = useState(false);

  // ─────────────────────────────────────────────
  // 🔐 LOGIQUE ADMIN
  // - token présent = utilisateur connecté
  // - route /admin = interface admin
  // ─────────────────────────────────────────────
  const token = localStorage.getItem("token");
  const isAdmin = Boolean(token);
  const isAdminRoute = location.pathname.startsWith("/admin");

  // ─────────────────────────────────────────────
  // LOGOUT ADMIN
  // ─────────────────────────────────────────────
  const handleLogout = () => {
    // suppression authentification
    localStorage.removeItem("token");

    // fermeture UI admin propre
    setDrawerOpen(false);

    // redirection page publique
    navigate("/");
  };

  return (
    <>
      {/* ─────────────────────────────────────────────
          HEADER PRINCIPAL
      ───────────────────────────────────────────── */}
      <AppBar
        position="sticky"
        sx={{
          // style différent selon admin / public
          background: isAdminRoute
            ? "linear-gradient(90deg, #000 0%, #0A1628 60%, #0d1f3c 100%)"
            : "linear-gradient(180deg, #000 0%, #0A1628 100%)",

          // ligne fine uniquement en admin (effet dashboard)
          boxShadow: isAdminRoute
            ? "0 1px 0 rgba(41,121,255,0.25)"
            : "none",

          py: 1,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 2, md: 6 },
          }}
        >

          {/* ─────────────────────────────────────────────
              LOGO + TITRE
          ───────────────────────────────────────────── */}
          <Box
            onClick={() => navigate(isAdmin ? "/admin/dashboard" : "/")}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              cursor: "pointer",
            }}
          >
            <Box component="img" src={logo} alt="logo" sx={{ height: 42 }} />

            <Box>
              <Typography sx={{ fontWeight: 800, color: "#fff" }}>
                Nantes WiFi Solutions
              </Typography>

              {/* Badge ADMIN visible uniquement en admin */}
              {isAdminRoute && (
                <Chip
                  label="Administration"
                  size="small"
                  sx={{
                    height: 16,
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    background: "rgba(41,121,255,0.2)",
                    border: "1px solid rgba(41,121,255,0.4)",
                    color: "#2979FF",
                  }}
                />
              )}
            </Box>
          </Box>

          {/* ─────────────────────────────────────────────
              NAVIGATION DESKTOP
          ───────────────────────────────────────────── */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>

            {/* MODE ADMIN */}
            {isAdminRoute ? (
              <>
                {adminLinks.map((link) => (
                  <Button
                    key={link.label}
                    onClick={() => navigate(link.path)}
                    startIcon={link.icon}
                    sx={{
                      color:
                        location.pathname === link.path
                          ? "#2979FF"
                          : "rgba(255,255,255,0.7)",

                      textTransform: "none",
                      fontWeight: 600,

                      borderBottom:
                        location.pathname === link.path
                          ? "2px solid #2979FF"
                          : "2px solid transparent",
                    }}
                  >
                    {link.label}
                  </Button>
                ))}

                {/* LOGOUT ADMIN */}
                <Button
                  onClick={handleLogout}
                  startIcon={<LogoutIcon sx={{ fontSize: 16 }} />}
                  sx={{
                    ml: 2,
                    color: "#ff6b6b",
                    border: "1px solid rgba(255,107,107,0.3)",
                    background: "rgba(255,107,107,0.08)",
                    textTransform: "none",
                    fontWeight: 600,

                    "&:hover": {
                      background: "rgba(255,107,107,0.2)",
                    },
                  }}
                >
                  Déconnexion
                </Button>
              </>
            ) : (
              /* MODE PUBLIC */
              navLinks.map((link) => (
                <Button
                  key={link.label}
                  onClick={() => navigate(link.path)}
                  sx={{
                    color:
                      link.label === "Contact"
                        ? "#fff"
                        : "rgba(255,255,255,0.75)",

                    fontWeight: 600,
                    textTransform: "none",

                    // bouton contact plus visible
                    ...(link.label === "Contact" && {
                      border: "1px solid #1976d2",
                      background: "rgba(25,118,210,0.15)",
                    }),
                  }}
                >
                  {link.label}
                </Button>
              ))
            )}
          </Box>

          {/* ─────────────────────────────────────────────
              BURGER MENU MOBILE
          ───────────────────────────────────────────── */}
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { xs: "flex", md: "none" }, color: "#fff" }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* ─────────────────────────────────────────────
          MENU MOBILE (DRAWER)
      ───────────────────────────────────────────── */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 260, background: "#0A1628", height: "100%", p: 2 }}>

          {/* fermeture */}
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: "#fff" }}>
            <CloseIcon />
          </IconButton>

          {/* menu mobile dynamique */}
          {[...(isAdminRoute ? adminLinks : navLinks)].map((link) => (
            <ListItem key={link.label} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(link.path);
                  setDrawerOpen(false);
                }}
              >
                <ListItemText
                  primary={link.label}
                  sx={{ color: "#fff" }}
                />
              </ListItemButton>
            </ListItem>
          ))}

          {/* logout mobile admin */}
          {isAdminRoute && (
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemText
                  primary="Déconnexion"
                  sx={{ color: "#ff6b6b" }}
                />
              </ListItemButton>
            </ListItem>
          )}
        </Box>
      </Drawer>
    </>
  );
}