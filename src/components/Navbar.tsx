import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo1.png";

const navLinks = [
  { label: "Services", path: "/services" },
  { label: "Tarifs", path: "/tarifs" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          background: "linear-gradient(180deg, #000000 0%, #0A1628 100%)",
          boxShadow: "none",
          py: 1,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: { xs: 2, md: 6 },
          }}
        >
          {/* LOGO + NOM */}
          <Box
            onClick={() => navigate("/")}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              cursor: "pointer",
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="Nantes WiFi Solutions"
              sx={{ height: 42 }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: "#fff",
                fontSize: { xs: "0.9rem", md: "1.1rem" },
                letterSpacing: 0.5,
              }}
            >
              Nantes WiFi Solutions
            </Typography>
          </Box>

          {/* NAVIGATION DESKTOP */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 1,
            }}
          >
            {navLinks.map((link) =>
              link.label === "Contact" ? (
                <Button
                  key={link.label}
                  onClick={() => navigate(link.path)}
                  sx={{
                    color: "#fff",
                    fontWeight: 700,
                    textTransform: "none",
                    fontSize: "0.9rem",
                    px: 2.5,
                    py: 0.75,
                    borderRadius: "4px",
                    border: "1px solid #1976d2",
                    background: "rgba(25,118,210,0.15)",
                    "&:hover": { background: "#1976d2" },
                  }}
                >
                  {link.label}
                </Button>
              ) : (
                <Button
                  key={link.label}
                  onClick={() => navigate(link.path)}
                  sx={{
                    color: "rgba(255,255,255,0.75)",
                    fontWeight: 600,
                    textTransform: "none",
                    fontSize: "0.9rem",
                    "&:hover": { color: "#fff" },
                  }}
                >
                  {link.label}
                </Button>
              )
            )}
          </Box>

          {/* BURGER MOBILE */}
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { xs: "flex", md: "none" }, color: "#fff" }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* DRAWER MOBILE */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: 260,
              background: "linear-gradient(180deg, #000000 0%, #0A1628 100%)",
              px: 2,
              py: 3,
            },
          },
        }}
      >
        {/* CLOSE */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <IconButton
            onClick={() => setDrawerOpen(false)}
            sx={{ color: "#fff" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* LOGO DANS LE DRAWER */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mb: 4,
            px: 1,
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Nantes WiFi Solutions"
            sx={{ height: 36 }}
          />
          <Typography
            sx={{ color: "#fff", fontWeight: 800, fontSize: "0.9rem" }}
          >
            Nantes WiFi Solutions
          </Typography>
        </Box>

        {/* LIENS */}
        <List disablePadding>
          {navLinks.map((link) => (
            <ListItem key={link.label} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => {
                  navigate(link.path);
                  setDrawerOpen(false);
                }}
                sx={{
                  borderRadius: "8px",
                  ...(link.label === "Contact" && {
                    border: "1px solid #1976d2",
                    background: "rgba(25,118,210,0.15)",
                    "&:hover": { background: "#1976d2" },
                  }),
                }}
              >
                <ListItemText
                  primary={link.label}
                  slotProps={{
                    primary: {
                      sx: {
                        color: "#fff",
                        fontWeight: link.label === "Contact" ? 700 : 500,
                        fontSize: "1rem",
                      },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}