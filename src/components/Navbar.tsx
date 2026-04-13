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

const navLinks = [
  { label: "Services", path: "/services" },
  { label: "Tarifs",   path: "/tarifs" },
  { label: "Contact",  path: "/contact" },
];

const adminLinks = [
  { label: "Dashboard", path: "/admin/dashboard", icon: <DashboardIcon sx={{ fontSize: 16 }} /> },
];

export default function Navbar() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // ✅ Détection admin via token (sans nouvelle page)
  const isAdmin = Boolean(localStorage.getItem("token"));
  const isAdminRoute = location.pathname.startsWith("/admin");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          background: isAdminRoute
            ? "linear-gradient(90deg, #000 0%, #0A1628 60%, #0d1f3c 100%)"
            : "linear-gradient(180deg, #000 0%, #0A1628 100%)",
          boxShadow: isAdminRoute
            ? "0 1px 0 rgba(41,121,255,0.25)"  // ✅ ligne bleue subtile en mode admin
            : "none",
          py: 1,
        }}
      >
        <Toolbar sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: { xs: 2, md: 6 } }}>

          {/* Logo */}
          <Box onClick={() => navigate(isAdmin ? "/admin/dashboard" : "/")}
            sx={{ display: "flex", alignItems: "center", gap: 1.5, cursor: "pointer" }}>
            <Box component="img" src={logo} alt="Nantes WiFi Solutions" sx={{ height: 42 }} />
            <Box>
              <Typography sx={{ fontWeight: 800, color: "#fff", fontSize: { xs: "0.9rem", md: "1.1rem" }, letterSpacing: 0.5, lineHeight: 1.2 }}>
                Nantes WiFi Solutions
              </Typography>
              {/* ✅ Badge admin sous le nom */}
              {isAdminRoute && (
                <Chip
                  label="Administration"
                  size="small"
                  sx={{
                    height: 16, fontSize: "0.6rem", fontWeight: 700,
                    background: "rgba(41,121,255,0.2)",
                    border: "1px solid rgba(41,121,255,0.4)",
                    color: "#2979FF", borderRadius: "4px",
                    "& .MuiChip-label": { px: 0.75 },
                  }}
                />
              )}
            </Box>
          </Box>

          {/* Desktop nav */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1 }}>
            {isAdminRoute ? (
              // ── Mode admin ──
              <>
                {adminLinks.map((link) => (
                  <Button key={link.label} onClick={() => navigate(link.path)}
                    startIcon={link.icon}
                    sx={{
                      color: location.pathname === link.path ? "#2979FF" : "rgba(255,255,255,0.7)",
                      fontWeight: 600, textTransform: "none", fontSize: "0.9rem",
                      borderBottom: location.pathname === link.path ? "2px solid #2979FF" : "2px solid transparent",
                      borderRadius: 0, pb: 0.25,
                      "&:hover": { color: "#fff" },
                    }}>
                    {link.label}
                  </Button>
                ))}
                <Button onClick={handleLogout} startIcon={<LogoutIcon sx={{ fontSize: 16 }} />}
                  sx={{
                    ml: 2, color: "#ff6b6b", fontWeight: 600, textTransform: "none",
                    border: "1px solid rgba(255,107,107,0.3)",
                    background: "rgba(255,107,107,0.08)",
                    borderRadius: 2, px: 2,
                    "&:hover": { background: "rgba(255,107,107,0.2)" },
                  }}>
                  Déconnexion
                </Button>
              </>
            ) : (
              // ── Mode public ──
              <>
                {navLinks.map((link) =>
                  link.label === "Contact" ? (
                    <Button key={link.label} onClick={() => navigate(link.path)}
                      sx={{
                        color: "#fff", fontWeight: 700, textTransform: "none",
                        fontSize: "0.9rem", px: 2.5, py: 0.75, borderRadius: "4px",
                        border: "1px solid #1976d2", background: "rgba(25,118,210,0.15)",
                        "&:hover": { background: "#1976d2" },
                      }}>
                      {link.label}
                    </Button>
                  ) : (
                    <Button key={link.label} onClick={() => navigate(link.path)}
                      sx={{
                        color: "rgba(255,255,255,0.75)", fontWeight: 600,
                        textTransform: "none", fontSize: "0.9rem",
                        "&:hover": { color: "#fff" },
                      }}>
                      {link.label}
                    </Button>
                  )
                )}
              </>
            )}
          </Box>

          {/* Burger mobile */}
          <IconButton onClick={() => setDrawerOpen(true)}
            sx={{ display: { xs: "flex", md: "none" }, color: "#fff" }}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer mobile */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}
        slotProps={{ paper: { sx: { width: 260, background: "linear-gradient(180deg,#000 0%,#0A1628 100%)", px: 2, py: 3 } } }}>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: "#fff" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1, px: 1 }}>
          <Box component="img" src={logo} alt="Nantes WiFi Solutions" sx={{ height: 36 }} />
          <Box>
            <Typography sx={{ color: "#fff", fontWeight: 800, fontSize: "0.9rem" }}>
              Nantes WiFi Solutions
            </Typography>
            {isAdminRoute && (
              <Chip label="Admin" size="small"
                sx={{ height: 14, fontSize: "0.58rem", background: "rgba(41,121,255,0.2)", color: "#2979FF", border: "1px solid rgba(41,121,255,0.3)", borderRadius: "4px", "& .MuiChip-label": { px: 0.75 } }} />
            )}
          </Box>
        </Box>

        {/* Divider */}
        <Box sx={{ height: 1, background: "rgba(255,255,255,0.07)", mx: 1, mb: 3 }} />

        <List disablePadding>
          {(isAdminRoute ? adminLinks : navLinks).map((link) => (
            <ListItem key={link.label} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => { navigate(link.path); setDrawerOpen(false); }}
                sx={{
                  borderRadius: "8px",
                  ...(!isAdminRoute && link.label === "Contact" && {
                    border: "1px solid #1976d2",
                    background: "rgba(25,118,210,0.15)",
                    "&:hover": { background: "#1976d2" },
                  }),
                  ...(isAdminRoute && {
                    "&:hover": { background: "rgba(41,121,255,0.1)" },
                  }),
                }}>
                <ListItemText primary={link.label}
                  slotProps={{ primary: { sx: { color: "#fff", fontWeight: 600, fontSize: "1rem" } } }} />
              </ListItemButton>
            </ListItem>
          ))}

          {/* Bouton logout dans le drawer admin */}
          {isAdminRoute && (
            <ListItem disablePadding sx={{ mt: 2 }}>
              <ListItemButton onClick={() => { handleLogout(); setDrawerOpen(false); }}
                sx={{ borderRadius: "8px", border: "1px solid rgba(255,107,107,0.3)", background: "rgba(255,107,107,0.08)", "&:hover": { background: "rgba(255,107,107,0.2)" } }}>
                <ListItemText primary="Déconnexion"
                  slotProps={{ primary: { sx: { color: "#ff6b6b", fontWeight: 700, fontSize: "1rem" } } }} />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
}