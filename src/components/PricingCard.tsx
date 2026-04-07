import { Card, CardContent, Typography, Button } from "@mui/material";

type Props = {
  title: string;
  price: string;
  features: string[];
};

export default function PricingCard({ title, price, features }: Props) {
  return (
    <Card sx={{ p: 3, borderRadius: 4, textAlign: "center" }}>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="h3" sx={{ my: 2 }}>
          {price}
        </Typography>

        {features.map((f, i) => (
          <Typography key={i}>✔ {f}</Typography>
        ))}

        <Button variant="contained" sx={{ mt: 3 }}>
          Choisir
        </Button>
      </CardContent>
    </Card>
  );
}