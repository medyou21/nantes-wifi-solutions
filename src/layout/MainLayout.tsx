import { Box } from "@mui/material";
import Home from "../pages/Home";

const MainLayout = () => {
  return (
    <Box sx={{ width: "100%", overflowX: "hidden" }}>
      <Home />
    </Box>
  );
};

export default MainLayout;