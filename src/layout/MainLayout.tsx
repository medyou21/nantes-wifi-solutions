import { Box } from "@mui/material";
import Home from "../pages/Home";

export default function MainLayout() {
  return (
    <Box sx={{ width: "100%", overflowX: "hidden" }}>
      <Home />
    </Box>
  );
}