import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./styles/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from "react-router-dom";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { HelmetProvider } from "react-helmet-async";

// ✅ Supprime le warning :first-child de MUI/Emotion
const cache = createCache({
  key: "css",
  prepend: true,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
       <HelmetProvider> 
    <CacheProvider value={cache}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </CacheProvider>
       </HelmetProvider> 
  </React.StrictMode>
);