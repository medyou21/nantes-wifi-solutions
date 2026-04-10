import { Card, CardContent, Typography, Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

type Props = {
  title: string;
  features: string[];
  icon: React.ReactNode;
};

export default function ServiceCard({ title, features, icon }: Props) {
  return (
    <Card
      sx={{
        position: "relative",
        pt: 5,
        pb: 3,
        px: 3,
        borderRadius: "16px",
        textAlign: "center",
        background: "#fff",
        color: "#000",
        boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
        overflow: "visible", // indispensable pour que l'icône dépasse
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 20px 45px rgba(0,0,0,0.35)",
        },
      }}
    >
      {/* ICÔNE RONDE QUI DÉPASSE EN HAUT */}
      <Box
        sx={{
          position: "absolute",
          top: -28,
          left: "50%",
          transform: "translateX(-50%)",
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #1565C0 0%, #42A5F5 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          boxShadow: "0 6px 20px rgba(21,101,192,0.5)",
          "& svg": { fontSize: 26 },
        }}
      >
        {icon}
      </Box>

      <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
        {/* TITRE */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            mb: 2,
            fontSize: "1rem",
            color: "#0D0D0D",
          }}
        >
          {title}
        </Typography>

        {/* FEATURES */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {features.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                textAlign: "left",
              }}
            >
              <CheckCircleIcon
                sx={{ color: "#1565C0", fontSize: 18, flexShrink: 0 }}
              />
              <Typography
                variant="body2"
                sx={{ color: "#333", fontSize: "0.82rem" }}
              >
                {item}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}