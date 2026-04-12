import { Box, Typography, Tabs, Tab } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";

const MotionBox = motion(Box);

// ─────────────────────────────────────────────
// DONNÉES
// ─────────────────────────────────────────────

const mentionsData = [
  {
    title: "Éditeur du site",
    content: [
      "Le site **nantes-wifi-solutions.fr** est édité par :",
      "**Nantes WiFi Solutions**",
      "Forme juridique : Auto-entrepreneur (à compléter)",
      "Adresse : Nantes, Loire-Atlantique, 44000, France",
      "Email : contact@nantes-wifi-solutions.fr",
      "Téléphone : +33 X XX XX XX XX",
      "SIRET : XXX XXX XXX XXXXX (à compléter)",
      "Responsable de publication : (Votre nom)",
    ],
  },
  {
    title: "Hébergement",
    content: [
      "Le site frontend est hébergé par **Vercel Inc.** – 340 Pine Street, 5th Floor, San Francisco, CA 94104, USA.",
      "Le backend est hébergé sur **Render** ou **Railway** (à préciser selon votre déploiement).",
      "La base de données est hébergée sur **MongoDB Atlas** – région Europe (Frankfurt).",
    ],
  },
  {
    title: "Propriété intellectuelle",
    content: [
      "L'ensemble du contenu de ce site (textes, images, illustrations, logos, icônes, graphiques, code) est la propriété exclusive de Nantes WiFi Solutions, sauf mention contraire.",
      "Toute reproduction, distribution, modification ou utilisation à des fins commerciales sans autorisation écrite préalable est strictement interdite et constitue une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la Propriété Intellectuelle.",
      "Les marques et logos de tiers mentionnés sur ce site restent la propriété de leurs détenteurs respectifs.",
    ],
  },
  {
    title: "Cookies",
    content: [
      "Ce site utilise uniquement des cookies techniques nécessaires à son bon fonctionnement.",
      "**Aucun cookie publicitaire ou de traçage tiers** n'est utilisé sur ce site.",
      "Vous pouvez désactiver les cookies dans les paramètres de votre navigateur. Certaines fonctionnalités peuvent être affectées.",
    ],
  },
  {
    title: "Limitation de responsabilité",
    content: [
      "Nantes WiFi Solutions s'efforce de maintenir les informations publiées sur ce site exactes et à jour, sans pouvoir en garantir l'exhaustivité.",
      "Nous déclinons toute responsabilité pour les dommages directs ou indirects résultant de l'utilisation de ce site.",
      "Des liens hypertextes peuvent pointer vers des sites tiers dont nous ne contrôlons pas le contenu.",
    ],
  },
  {
    title: "Droit applicable",
    content: [
      "Les présentes mentions légales sont régies par le **droit français**.",
      "Tout litige relatif à leur interprétation ou exécution sera soumis à la compétence exclusive des **tribunaux de Nantes (44), France**.",
    ],
  },
];

const cguData = [
  {
    title: "Acceptation des conditions",
    content: [
      "En accédant et en utilisant le site nantes-wifi-solutions.fr, vous acceptez sans réserve les présentes Conditions Générales d'Utilisation (CGU).",
      "Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser ce site.",
      "Nantes WiFi Solutions se réserve le droit de modifier ces CGU à tout moment. Les modifications prennent effet dès leur publication.",
    ],
  },
  {
    title: "Utilisation du site",
    content: [
      "Le site est destiné à un **usage personnel et non commercial**.",
      "Sont strictement interdits : l'utilisation frauduleuse du formulaire de contact, toute tentative d'accès non autorisé, la diffusion de contenus illicites, et la perturbation du serveur.",
      "Nantes WiFi Solutions se réserve le droit de bloquer tout accès en cas de comportement abusif.",
    ],
  },
  {
    title: "Disponibilité du service",
    content: [
      "Nantes WiFi Solutions s'efforce de maintenir le site accessible 24h/24 et 7j/7, sans pouvoir garantir une disponibilité continue.",
      "Des interruptions peuvent survenir pour maintenance ou cas de force majeure. Nous ne saurions en être tenus responsables.",
    ],
  },
  {
    title: "Conditions Générales de Vente — Devis & Paiement",
    content: [
      "**Devis** : valable 30 jours à compter de sa date d'émission. Son acceptation écrite (email ou signature) vaut commande ferme.",
      "**Paiement** : par virement bancaire, chèque ou espèces selon accord. Un acompte de 30 % peut être demandé pour toute intervention supérieure à 200 €.",
      "**Délai d'intervention** : fixé d'un commun accord lors du premier contact. Intervention sous 24h possible sous réserve de disponibilité.",
    ],
  },
  {
    title: "Conditions Générales de Vente — Garantie & Rétractation",
    content: [
      "**Garantie** : les installations réalisées par Nantes WiFi Solutions sont garanties **12 mois pièces et main d'œuvre**. Le matériel fourni est soumis à la garantie constructeur.",
      "**Droit de rétractation** : conformément à l'article L.221-18 du Code de la Consommation, vous disposez d'un délai de **14 jours** pour exercer votre droit de rétractation pour tout contrat conclu à distance, sauf si la prestation a été entièrement exécutée avec votre accord préalable.",
      "**Responsabilité** : notre responsabilité est limitée au montant de la prestation facturée.",
    ],
  },
  {
    title: "Règlement des litiges",
    content: [
      "En cas de litige, une solution amiable sera recherchée en priorité. Contactez-nous à contact@nantes-wifi-solutions.fr.",
      "À défaut, vous pouvez recourir à un **médiateur de la consommation** conformément aux articles L.611-1 et suivants du Code de la Consommation.",
      "En dernier recours, les **tribunaux de Nantes (44)** seront seuls compétents.",
    ],
  },
];

const privacyData = [
  {
    title: "Responsable du traitement",
    content: [
      "Le responsable du traitement des données personnelles est **Nantes WiFi Solutions**.",
      "Contact : contact@nantes-wifi-solutions.fr",
    ],
  },
  {
    title: "Données collectées",
    content: [
      "Nous collectons uniquement les données que vous nous communiquez via le formulaire de contact :",
      "• **Nom complet** — identification de votre demande",
      "• **Adresse email** — pour vous répondre",
      "• **Numéro de téléphone** — optionnel, pour vous rappeler",
      "• **Type de service** — pour orienter votre demande",
      "• **Message** — contenu de votre demande",
      "Aucune donnée bancaire ni donnée sensible n'est collectée sur ce site.",
    ],
  },
  {
    title: "Finalités et base légale",
    content: [
      "**Finalité principale** : traitement de votre demande de contact et envoi d'un devis.",
      "**Base légale** : exécution d'un contrat (art. 6.1.b RGPD) et intérêt légitime (art. 6.1.f RGPD).",
      "Vos données ne sont **jamais utilisées à des fins de prospection commerciale sans votre consentement**.",
    ],
  },
  {
    title: "Durée de conservation",
    content: [
      "Vos données sont conservées **3 ans** à compter du dernier contact commercial.",
      "Passé ce délai, vos données sont supprimées ou anonymisées de nos systèmes.",
    ],
  },
  {
    title: "Destinataires des données",
    content: [
      "Vos données sont traitées uniquement par Nantes WiFi Solutions.",
      "Elles sont hébergées sur des serveurs sécurisés (MongoDB Atlas – région Europe).",
      "Elles ne sont **pas vendues, louées ou transmises à des tiers** à des fins commerciales.",
      "Des sous-traitants techniques peuvent y accéder dans le strict cadre de leurs missions, sous garanties contractuelles RGPD.",
    ],
  },
  {
    title: "Vos droits (RGPD)",
    content: [
      "Conformément au Règlement Général sur la Protection des Données (UE 2016/679), vous disposez des droits suivants :",
      "• **Droit d'accès** : obtenir une copie de vos données",
      "• **Droit de rectification** : corriger des données inexactes",
      "• **Droit à l'effacement** : demander la suppression de vos données",
      "• **Droit à la limitation** : suspendre le traitement",
      "• **Droit à la portabilité** : recevoir vos données dans un format structuré",
      "• **Droit d'opposition** : vous opposer au traitement",
      "Pour exercer vos droits : **contact@nantes-wifi-solutions.fr** (réponse sous 30 jours).",
      "En cas de litige non résolu, vous pouvez saisir la **CNIL** — www.cnil.fr",
    ],
  },
  {
    title: "Sécurité des données",
    content: [
      "Nantes WiFi Solutions met en œuvre des mesures techniques et organisationnelles pour protéger vos données :",
      "• Connexions chiffrées **HTTPS**",
      "• Authentification sécurisée aux bases de données",
      "• Accès aux données limité au personnel habilité",
      "• Sauvegardes régulières chiffrées",
    ],
  },
];

// ─────────────────────────────────────────────
// COMPOSANTS INTERNES
// ─────────────────────────────────────────────

function RenderText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <Typography sx={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem", lineHeight: 1.8 }}>
      {parts.map((part, i) =>
        i % 2 === 1
          ? <Box component="span" key={i} sx={{ color: "rgba(255,255,255,0.88)", fontWeight: 700 }}>{part}</Box>
          : part
      )}
    </Typography>
  );
}

function SectionCard({ title, content, index }: { title: string; content: string[]; index: number }) {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      sx={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "14px",
        p: { xs: 3, md: 4 },
        "&:hover": { borderColor: "rgba(41,121,255,0.2)", background: "rgba(255,255,255,0.04)" },
        transition: "all 0.3s",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2.5 }}>
        <Box sx={{
          width: 32, height: 32, borderRadius: "8px",
          background: "rgba(41,121,255,0.15)",
          border: "1px solid rgba(41,121,255,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <Typography sx={{ color: "#2979FF", fontSize: "0.68rem", fontWeight: 800 }}>
            {String(index + 1).padStart(2, "0")}
          </Typography>
        </Box>
        <Typography sx={{ color: "#fff", fontWeight: 800, fontSize: { xs: "0.92rem", md: "1rem" } }}>
          {title}
        </Typography>
      </Box>
      <Box sx={{ pl: { xs: 0, md: 6 }, display: "flex", flexDirection: "column", gap: 1 }}>
        {content.map((line, i) => <RenderText key={i} text={line} />)}
      </Box>
    </MotionBox>
  );
}

// ─────────────────────────────────────────────
// CONFIG ONGLETS
// ─────────────────────────────────────────────

const tabs = [
  { label: "Mentions légales", data: mentionsData },
  { label: "CGU / CGV",        data: cguData      },
  { label: "Confidentialité",  data: privacyData  },
];

// ─────────────────────────────────────────────
// EXPORT PAR DÉFAUT — accepte defaultTab
// ─────────────────────────────────────────────

interface LegalProps {
  defaultTab?: 0 | 1 | 2;
}

export default function Legal({ defaultTab = 0 }: LegalProps) {
  const [activeTab, setActiveTab] = useState<number>(defaultTab);

  return (
    <Box sx={{
      background: "linear-gradient(180deg, #000000 0%, #0A1628 100%)",
      minHeight: "100vh",
      px: { xs: 2, md: 8 },
      py: { xs: 8, md: 12 },
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Glow */}
      <Box sx={{
        position: "absolute", width: 500, height: 400,
        background: "radial-gradient(ellipse, rgba(0,80,255,0.06) 0%, transparent 70%)",
        top: "5%", left: "50%", transform: "translateX(-50%)", pointerEvents: "none",
      }}/>

      <Box sx={{ position: "relative", zIndex: 1, maxWidth: 820, mx: "auto" }}>

        {/* HEADER */}
        <MotionBox
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: "center", mb: { xs: 5, md: 8 } }}
        >
          <Box sx={{
            display: "inline-block", px: 3, py: 0.75, borderRadius: "20px",
            background: "#fff", border: "1px solid #e0e0e0",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)", mb: 2.5,
          }}>
            <Typography variant="overline" sx={{ color: "#1565C0", fontWeight: 700, letterSpacing: 3, fontSize: "0.7rem" }}>
              INFORMATIONS LÉGALES
            </Typography>
          </Box>
          <Box>
            <Box sx={{
              display: "inline-block", px: { xs: 3, md: 6 }, py: 2,
              borderRadius: "12px", background: "#fff",
              boxShadow: "0 8px 30px rgba(0,0,0,0.3)", mb: 2,
            }}>
              <Typography variant="h4" sx={{ fontWeight: 900, color: "#000", fontSize: { xs: "1.4rem", md: "2rem" } }}>
                {tabs[activeTab].label}
              </Typography>
            </Box>
          </Box>
          <Typography sx={{ color: "rgba(255,255,255,0.35)", fontSize: "0.82rem", mt: 0.5 }}>
            Dernière mise à jour : avril 2026
          </Typography>
        </MotionBox>

        {/* TABS */}
        <Box sx={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "14px",
          p: 0.5,
          mb: 5,
        }}>
          <Tabs
            value={activeTab}
            onChange={(_, v) => setActiveTab(v)}
            variant="fullWidth"
            sx={{
              minHeight: 46,
              "& .MuiTabs-indicator": {
                background: "linear-gradient(135deg, #2979FF, #1565C0)",
                borderRadius: "10px",
                height: "100%",
                zIndex: 0,
              },
              "& .MuiTab-root": {
                color: "rgba(255,255,255,0.4)",
                fontWeight: 600,
                fontSize: { xs: "0.72rem", md: "0.82rem" },
                textTransform: "none",
                minHeight: 46,
                borderRadius: "10px",
                zIndex: 1,
                transition: "color 0.2s",
                "&.Mui-selected": { color: "#fff", fontWeight: 700 },
              },
            }}
          >
            {tabs.map((t) => <Tab key={t.label} label={t.label} />)}
          </Tabs>
        </Box>

        {/* CONTENT */}
        <MotionBox
          key={activeTab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          {tabs[activeTab].data.map((s, i) => (
            <SectionCard key={s.title} title={s.title} content={s.content} index={i} />
          ))}
        </MotionBox>

        {/* FOOTER NOTE */}
        <MotionBox
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{
            mt: 6, p: 3,
            background: "rgba(41,121,255,0.06)",
            border: "1px solid rgba(41,121,255,0.15)",
            borderRadius: "12px", textAlign: "center",
          }}
        >
          <Typography sx={{ color: "rgba(255,255,255,0.4)", fontSize: "0.82rem" }}>
            Pour toute question relative à ces informations légales, contactez-nous à{" "}
            <Box component="a" href="mailto:contact@nantes-wifi-solutions.fr" sx={{
              color: "#2979FF", textDecoration: "none", fontWeight: 600,
              "&:hover": { textDecoration: "underline" },
            }}>
              contact@nantes-wifi-solutions.fr
            </Box>
          </Typography>
        </MotionBox>

      </Box>
    </Box>
  );
}