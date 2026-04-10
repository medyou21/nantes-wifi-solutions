import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";

type Props = {
  title: string;
  price: string;
  period?: string;
  features: string[];
  highlight?: boolean;
  dark?: boolean;
};

export default function PricingCard({
  title,
  price,
  period,
  features,
  highlight,
  dark,
}: Props) {
  return (
    <Card
      sx={{
        position: "relative",
        borderRadius: "16px",
        textAlign: "center",
        background: dark
          ? "#0a0e1a"
          : highlight
          ? "linear-gradient(160deg, #1a2a4a 0%, #0d1a35 100%)"
          : "rgba(255,255,255,0.05)",
        border: highlight
          ? "2px solid #1e6fd9"
          : dark
          ? "2px solid #1e3a6e"
          : "1px solid rgba(255,255,255,0.1)",
        boxShadow: highlight
          ? "0 0 40px rgba(30,111,217,0.35), 0 20px 40px rgba(0,0,0,0.5)"
          : "0 8px 24px rgba(0,0,0,0.4)",
        transform: highlight ? "scale(1.04)" : "scale(1)",
        transition: "transform 0.3s, box-shadow 0.3s",
        overflow: "visible",
        "&:hover": {
          transform: highlight ? "scale(1.06)" : "scale(1.02)",
          boxShadow: highlight
            ? "0 0 60px rgba(30,111,217,0.5), 0 24px 48px rgba(0,0,0,0.6)"
            : "0 12px 32px rgba(0,0,0,0.5)",
        },
      }}
    >
      {/* BADGE "LE PLUS CHOISI" */}
      {highlight && (
        <Box
          sx={{
            position: "absolute",
            top: -16,
            left: "50%",
            transform: "translateX(-50%)",
            background: "linear-gradient(90deg, #1565c0, #1e88e5)",
            color: "#fff",
            px: 2.5,
            py: 0.6,
            borderRadius: "20px",
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            boxShadow: "0 4px 12px rgba(21,101,192,0.5)",
          }}
        >
          Le plus choisi
        </Box>
      )}

      <CardContent sx={{ p: 4, pt: highlight ? 5 : 4 }}>
        {/* TITLE */}
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: highlight ? "1.5rem" : "1.25rem",
            color: highlight ? "#4fc3f7" : "#90caf9",
            mb: 1,
            letterSpacing: "0.02em",
            textTransform: "uppercase",
          }}
        >
          {title}
        </Typography>

        {/* PRICE */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <Typography
            component="span"
            sx={{
              fontWeight: 900,
              fontSize: "3.5rem",
              lineHeight: 1,
              color: "#ffffff",
              letterSpacing: "-0.02em",
            }}
          >
            {price.replace(/[€/mois]/g, "")}
          </Typography>
          <Typography
            component="span"
            sx={{
              fontWeight: 700,
              fontSize: "1.5rem",
              color: "#ffffff",
              mt: 0.5,
              ml: 0.3,
            }}
          >
            €
          </Typography>
          {period && (
            <Typography
              component="span"
              sx={{
                fontSize: "0.85rem",
                color: "rgba(255,255,255,0.5)",
                alignSelf: "flex-end",
                mb: 0.5,
                ml: 0.5,
              }}
            >
              {period}
            </Typography>
          )}
        </Box>

        {/* DIVIDER */}
        <Box
          sx={{
            height: "1px",
            background: "rgba(255,255,255,0.1)",
            mb: 3,
          }}
        />

        {/* FEATURES */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            mb: 4,
            textAlign: "left",
          }}
        >
          {features.map((f, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.2,
              }}
            >
              <CheckCircleOutlineIcon
                sx={{
                  color: "#1e88e5",
                  fontSize: 18,
                  flexShrink: 0,
                }}
              />
              <Typography
                sx={{
                  fontSize: "0.875rem",
                  color: "rgba(255,255,255,0.8)",
                  lineHeight: 1.4,
                }}
              >
                {f}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* BUTTON */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            borderRadius: "8px",
            py: 1.3,
            fontWeight: 700,
            fontSize: "0.8rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            background: highlight
              ? "linear-gradient(90deg, #1565c0, #1e88e5)"
              : "rgba(30,111,217,0.25)",
            border: highlight ? "none" : "1px solid rgba(30,111,217,0.6)",
            color: "#fff",
            boxShadow: highlight
              ? "0 4px 16px rgba(21,101,192,0.4)"
              : "none",
            "&:hover": {
              background: "linear-gradient(90deg, #1565c0, #1e88e5)",
              boxShadow: "0 6px 20px rgba(21,101,192,0.5)",
            },
          }}
        >
          Choisir ce forfait
        </Button>
      </CardContent>
    </Card>
  );
}