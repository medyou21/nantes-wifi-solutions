# 🌐 Nantes WiFi Solutions — Site web générateur de leads

Site web professionnel full-stack pour une activité de diagnostic, d’installation et de sécurisation Wi-Fi à Nantes.

**Frontend :** React · TypeScript · Vite · Material UI · Framer Motion  
**Backend :** Node.js · Express · TypeScript · MongoDB Atlas

## 🎯 Objectifs

- présenter les services Wi-Fi aux particuliers et aux professionnels ;
- générer des leads qualifiés par formulaire, téléphone et futurs canaux marketing ;
- mesurer les conversions avec les outils Google ;
- gérer les demandes depuis un tableau de bord administrateur sécurisé.

## 👥 Public ciblé

| Segment | Besoins |
|---|---|
| Particuliers | Zones mortes, débit instable, configuration de box ou répéteurs |
| PME et bureaux | Réseau professionnel stable, performant et sécurisé |
| Syndics, Airbnb et hôtels | Couverture multi-zone, réseau invité et maintenance |

## 🧱 Stack technique

### Frontend

| Technologie | Usage |
|---|---|
| React + TypeScript | Interface utilisateur typée |
| Vite | Serveur de développement et build |
| Material UI | Composants et thème graphique |
| React Router | Navigation et routes privées |
| Framer Motion | Animations |
| Axios / Fetch | Communication avec l’API |
| react-helmet-async | Métadonnées SEO dynamiques |

### Backend

Le backend est maintenu dans un dépôt séparé :  
[nantes-wifi-solutions-backend](https://github.com/medyou21/nantes-wifi-solutions-backend)

| Technologie | Usage |
|---|---|
| Node.js + Express | API REST |
| TypeScript | Typage strict |
| MongoDB Atlas + Mongoose | Persistance des données |
| Zod | Validation des entrées |
| JWT + bcrypt | Authentification administrateur |
| Helmet + CORS | Sécurisation HTTP |
| express-rate-limit | Protection anti-spam et brute force |
| Brevo / Nodemailer | Emails transactionnels |
| PDFKit | Génération de devis PDF |

## 🖥️ Pages

### Accueil

- Hero avec appel à l’action « Obtenir un devis gratuit »
- Présentation des principaux services
- Aperçu des forfaits Basic, Confort et Pro
- CTA téléphone et formulaire

### Services

- Diagnostic Wi-Fi
- Installation et optimisation
- Sécurité et surveillance
- Réseaux professionnels
- CTA vers la demande de devis

### Tarifs

| Offre | Prix indicatif | Cible |
|---|---:|---|
| Basic | 79 € | Diagnostic initial |
| Confort | 199 € | Installation à domicile |
| Pro | 499 € | Entreprises et sites multi-zones |

Les offres peuvent être chargées depuis l’API avec `GET /api/offers`.

### Contact

- nom, email, téléphone, service et message ;
- validation côté client et serveur ;
- enregistrement en base ;
- envoi d’emails de notification et de confirmation ;
- suivi de la conversion après un envoi réussi.

### Administration

- connexion JWT ;
- liste, recherche et filtrage des contacts ;
- affichage du détail d’une demande ;
- statistiques par service ;
- export CSV ;
- routes exclues de l’indexation des moteurs de recherche.

## ⚙️ API REST

L’URL exacte dépend de la configuration du backend.

| Méthode | Route | Description | Accès |
|---|---|---|---|
| `POST` | `/api/contacts` | Enregistrer une demande et envoyer les notifications | Public, limité |
| `GET` | `/api/offers` | Retourner les offres triées | Public |
| `POST` | `/api/admin/login` | Authentifier un administrateur | Public, limité |
| `GET` | `/api/admin/contacts` | Lister les contacts | JWT requis |

## 🗄️ Modèles MongoDB

### Contact

```json
{
  "_id": "ObjectId",
  "name": "string",
  "email": "string",
  "phone": "string",
  "service": "diagnostic | installation | securite | reseau | maintenance",
  "message": "string",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Offre

```json
{
  "title": "string",
  "price": "number",
  "description": "string",
  "features": ["string"],
  "highlight": "boolean",
  "order": "number"
}
```

### Administrateur

```json
{
  "email": "string",
  "password": "hash bcrypt",
  "role": "superadmin"
}
```

## 🏗️ Architecture du frontend

```text
src/
├── components/
│   ├── CookieConsent.tsx
│   ├── CTA.tsx
│   ├── Footer.tsx
│   ├── Navbar.tsx
│   ├── PricingCard.tsx
│   └── ServiceCard.tsx
├── hooks/
│   └── useContacts.ts
├── pages/
│   ├── Admin/
│   │   ├── ContactDetailModal.tsx
│   │   ├── ContactsTable.tsx
│   │   ├── Dashboard.tsx
│   │   └── Login.tsx
│   ├── Contact.tsx
│   ├── Home.tsx
│   ├── Legal.tsx
│   ├── Pricing.tsx
│   └── services.tsx
├── routes/
│   └── PrivateRoute.tsx
├── sections/
│   ├── Hero.tsx
│   ├── Pricing.tsx
│   └── Services.tsx
├── seo/
│   ├── GoogleAnalytics.tsx
│   ├── SchemaOrg.tsx
│   ├── SEOHead.tsx
│   └── seo.config.ts
├── services/
│   └── api.ts
├── styles/
│   └── theme.ts
├── App.tsx
└── main.tsx

public/
├── robots.txt
├── sitemap.xml
├── favicon.svg
└── logo.png
```

## 🔐 Sécurité

| Mesure | Implémentation |
|---|---|
| Validation | Schémas Zod côté backend |
| Protection XSS | Nettoyage des entrées |
| Injection NoSQL | express-mongo-sanitize |
| En-têtes HTTP | Helmet |
| CORS | Origines autorisées explicitement |
| Limite globale | 100 requêtes / 15 minutes / IP |
| Limite contact | 5 envois / heure / IP |
| Limite connexion | 10 tentatives / 15 minutes / IP |
| Authentification | JWT avec expiration et mots de passe bcrypt |
| Taille du body | Limite de 10 Ko |
| Pages privées | `noindex, nofollow, noarchive` |

Aucun secret, mot de passe ou identifiant administrateur ne doit être enregistré dans Git.

## 🚀 SEO et marketing Google

| Élément | Implémentation |
|---|---|
| Meta tags | Titre et description par page |
| URL canonique | Canonical dynamique selon l’environnement |
| Open Graph | Titre, description, URL et image |
| X / Twitter Card | `summary_large_image` |
| Schema.org | `LocalBusiness` et catalogue d’offres en JSON-LD |
| Google Analytics 4 | Pages vues et événements marketing |
| Google Tag Manager | Conteneur chargé par variable d’environnement |
| Google Ads | Conversion `generate_lead` après succès du formulaire |
| Search Console | Balise de validation dans le HTML statique |
| Consent Mode v2 | Consentement refusé par défaut puis mis à jour |
| Bandeau RGPD | Choix accepter/refuser conservé localement |
| Suivi des clics | Téléphone, email et WhatsApp |
| Sitemap | `/sitemap.xml` |
| Robots | `/robots.txt` et exclusion de `/admin/` |

### Événements suivis

| Événement | Déclenchement |
|---|---|
| `page_view` | Navigation entre les pages React |
| `form_submit` | Formulaire de contact envoyé |
| `generate_lead` | Demande enregistrée avec succès |
| `conversion` | Conversion transmise à Google Ads |
| `click_phone` | Clic sur un lien `tel:` |
| `click_email` | Clic sur un lien `mailto:` |
| `click_whatsapp` | Clic sur un lien WhatsApp |
| `consent_granted` | Acceptation des outils de mesure |

### Mots-clés ciblés

- WiFi Nantes
- Installation WiFi Nantes
- Diagnostic WiFi Nantes
- Problème WiFi maison
- Expert WiFi Nantes
- Dépannage WiFi Nantes
- Réseau WiFi professionnel Nantes

## ⚙️ Installation du frontend

```bash
git clone https://github.com/medyou21/nantes-wifi-solutions.git
cd nantes-wifi-solutions
npm install
npm run dev
```

Pour récupérer la branche SEO avant sa fusion :

```bash
git fetch origin
git switch --track origin/feature/google-seo-marketing
npm install
npm run dev
```

## 🔐 Variables d’environnement du frontend

Copier `.env.example` vers `.env`, puis renseigner les valeurs nécessaires :

```env
VITE_API_URL=http://localhost:5000
VITE_SITE_URL=https://nantes-wifi.fr

VITE_GA_ID=G-XXXXXXXXXX
VITE_GTM_ID=GTM-XXXXXXX

VITE_GOOGLE_ADS_ID=AW-XXXXXXXXX
VITE_GOOGLE_ADS_CONVERSION_LABEL=XXXXXXXXXXXX

VITE_GOOGLE_SITE_VERIFICATION=XXXXXXXXXXXX
```

Les identifiants Google ne sont pas des secrets. Les clés API privées et les mots de passe ne doivent jamais être placés dans le frontend.

Lorsque `VITE_GTM_ID` est renseigné, le conteneur Google Tag Manager prend en charge le chargement des balises. Il faut alors créer et publier une balise Google dans GTM avec l’identifiant `VITE_GA_ID`.

## 🔐 Variables d’environnement du backend

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://...
CLIENT_URL=http://localhost:5173
BREVO_API_KEY=...
MAIL_FROM=contact@nantes-wifi.fr
MAIL_TO=admin@nantes-wifi.fr
JWT_SECRET=...
```

Utiliser des valeurs différentes et sécurisées pour la production.

## 📦 Scripts

Les scripts exacts dépendent du `package.json` présent localement :

| Commande | Description |
|---|---|
| `npm run dev` | Démarrer le frontend en développement |
| `npm run build` | Compiler le frontend pour la production |
| `npm run preview` | Prévisualiser le build |

## 📦 Déploiement

| Couche | Service |
|---|---|
| Frontend | Vercel ou Netlify |
| Backend | Render, Railway ou VPS |
| Base de données | MongoDB Atlas |
| Emails | Brevo |
| Domaine | `nantes-wifi.fr` |

Ajouter les variables `VITE_*` dans les paramètres du projet Vercel, puis redéployer le frontend.

## 🔄 Parcours de conversion

```text
Visiteur
  → Accueil / Services / Tarifs
  → Formulaire, téléphone ou WhatsApp
  → Validation et enregistrement par l’API
  → Notification client et administrateur
  → Événement generate_lead
  → Conversion commerciale
```

## 🧪 Tests recommandés

- responsive : mobile, tablette et ordinateur ;
- validation et erreurs du formulaire ;
- rate limits du contact et de l’authentification ;
- connexion, token expiré et route protégée ;
- chargement de `robots.txt` et `sitemap.xml` ;
- métadonnées et données structurées ;
- Consent Mode v2 dans Tag Assistant ;
- événements GA4 dans DebugView ;
- conversion Google Ads après un test de formulaire.

## 🗺️ Roadmap

- [x] Pages publiques
- [x] Dashboard administrateur
- [x] API REST
- [x] Validation et protections principales
- [x] SEO local et données structurées
- [x] GA4, GTM, Google Ads et Consent Mode v2
- [x] Sitemap et règles robots
- [x] Bouton WhatsApp flottant configurable
- [x] Avis clients et preuve sociale (exemples à remplacer par des avis vérifiés)
- [x] CRUD PostgreSQL des offres dans le dashboard
- [ ] Réservation de créneau
- [ ] Paiement Stripe
- [ ] Intégration CRM
- [ ] CI/CD et tests automatisés
- [ ] Déploiement et validation finale des outils Google

## 👤 Auteur

Projet réalisé par **HAMDI Mohamed** dans le cadre d’une solution Wi-Fi professionnelle à Nantes.

## 📜 Licence

Projet privé à usage commercial.  
Tous droits réservés © 2026 Nantes WiFi Solutions.
