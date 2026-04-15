# 🌐 Nantes WiFi Solutions – Site Web Générateur de Leads

> Site web professionnel full-stack pour une activité de services Wi-Fi à Nantes.  
> Stack : React + TypeScript · Node.js · MongoDB · MUI · Framer Motion

---

## 🎯 Objectif du projet

- Présenter les services Wi-Fi (diagnostic, installation, sécurité)
- Générer des leads qualifiés (formulaires / appels)
- Convertir les visiteurs en clients
- Gérer les demandes via un dashboard admin sécurisé

---

## 👤 Cible

| Segment | Besoins |
|---|---|
| Particuliers | Problèmes Wi-Fi à domicile, zones mortes |
| PME / Bureaux | Réseau professionnel stable et sécurisé |
| Syndics / Airbnb / Hôtels | Couverture multi-zones, réseau invité |

---

## 🧱 Stack technique

### Frontend

| Outil | Usage |
|---|---|
| React 18 + TypeScript | Framework principal |
| Vite | Build tool |
| Material UI (MUI v6) | Composants UI |
| React Router v6 | Routing |
| Framer Motion | Animations |
| Axios | Appels API |
| react-helmet-async | SEO / meta tags |

### Backend

| Outil | Usage |
|---|---|
| Node.js + Express.js | Serveur REST |
| TypeScript | Typage strict |
| Architecture MVC | Controller / Service / Model |
| Zod | Validation des données |
| Helmet | Sécurité headers HTTP |
| express-rate-limit | Anti-spam |
| Nodemailer | Envoi d'emails |
| JWT | Authentification admin |
| bcrypt | Hash des mots de passe |

### Base de données

| Outil | Usage |
|---|---|
| MongoDB Atlas | Base de données NoSQL |
| Mongoose | ODM |
| express-mongo-sanitize | Protection injection NoSQL |

---

## 🖥️ Pages du site

### 1. Home — Landing Page

- Hero avec CTA "Obtenir un devis gratuit"
- Présentation des 3 services
- Section tarifs (Basic 79€ · Confort 199€ · Pro 499€)
- Call To Action téléphone + formulaire
- Footer complet

### 2. Services

- Détail de chaque service avec illustration SVG
- Bénéfices listés + cibles (particuliers, PME, hôtels)
- CTA vers contact

### 3. Tarifs

- Tableau comparatif des 3 offres
- Données chargées depuis le backend (`GET /api/offers`)
- Bouton "Choisir ce forfait"

### 4. Contact

- Formulaire : nom, email, téléphone, service, message
- Validation côté client + backend (Zod)
- Envoi email via Nodemailer
- Feedback visuel succès / erreur

### 5. Admin Dashboard (privé)

- Login sécurisé JWT
- Liste des contacts avec filtres et recherche
- Export CSV
- Modal détail par contact
- Stats par service

---

## ⚙️ API REST

### 📩 Contact

```http
POST /api/contact
```
- Enregistre la demande en base
- Envoie un email admin + confirmation client
- Rate limit : 5 requêtes / heure / IP

### 📦 Offres

```http
GET /api/offers
```
- Retourne les 3 offres triées par ordre

### 👤 Admin

```http
POST /api/auth/login      — Authentification JWT
GET  /api/admin/contacts  — Liste des contacts (auth requise)
```

---

## 🗄️ Modélisation MongoDB

### Collection `contacts`

```json
{
  "_id":       "ObjectId",
  "name":      "string",
  "email":     "string",
  "phone":     "string",
  "service":   "diagnostic | installation | securite | reseau | maintenance",
  "message":   "string",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Collection `offers`

```json
{
  "title":       "string",
  "price":       "number",
  "description": "string",
  "features":    ["string"],
  "highlight":   "boolean",
  "order":       "number"
}
```

### Collection `admins`

```json
{
  "email":    "string",
  "password": "string (bcrypt)",
  "role":     "superadmin"
}
```

---

## 🏗️ Architecture
frontend/
├── src/
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Services.tsx
│   │   ├── Tarifs.tsx
│   │   └── Contact.tsx
│   ├── components/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── admin/
│   │   ├── Dashboard.tsx
│   │   ├── ContactsTable.tsx
│   │   └── ContactDetailModal.tsx
│   ├── hooks/
│   │   └── useContacts.ts
│   ├── seo/
│   │   ├── seo.config.ts
│   │   ├── SEOHead.tsx
│   │   ├── SchemaOrg.tsx
│   │   └── GoogleAnalytics.tsx
│   ├── services/
│   │   └── api.ts
│   └── styles/
│       └── theme.ts
backend/
├── src/
│   ├── controllers/
│   │   ├── contact.controller.ts
│   │   └── auth.controller.ts
│   ├── routes/
│   │   ├── contact.routes.ts
│   │   ├── admin.routes.ts
│   │   ├── auth.routes.ts
│   │   └── offer.routes.ts
│   ├── models/
│   │   ├── contact.model.ts
│   │   ├── offer.model.ts
│   │   └── admin.model.ts
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   ├── validate.middleware.ts
│   │   └── sanitize.middleware.ts
│   ├── validators/
│   │   ├── contact.validator.ts
│   │   └── auth.validator.ts
│   ├── services/
│   │   └── mail.service.ts
│   ├── config/
│   │   ├── db.ts
│   │   ├── cors.config.ts
│   │   └── rateLimit.config.ts
│   ├── scripts/
│   │   └── seed.ts
│   └── app.ts

---

## 🔐 Sécurité

| Mesure | Outil | Détail |
|---|---|---|
| Validation | Zod | Schémas stricts sur tous les inputs |
| Sanitization XSS | Middleware custom | Strip HTML / scripts sur req.body |
| Injection NoSQL | express-mongo-sanitize | Retire les opérateurs `$` MongoDB |
| Headers HTTP | Helmet | CSP, X-Frame-Options, HSTS… |
| CORS | cors | Whitelist d'origines autorisées |
| Rate limiting global | express-rate-limit | 100 req / 15 min / IP |
| Rate limiting contact | express-rate-limit | 5 envois / heure / IP |
| Rate limiting auth | express-rate-limit | 10 tentatives / 15 min / IP |
| Auth admin | JWT + bcrypt | Token 24h, hash password |
| Body size | Express | Limite 10kb par requête |

---

## 🚀 SEO & Marketing

| Élément | Implémentation |
|---|---|
| Meta tags | `react-helmet-async` par page |
| Open Graph | Titre, description, image par page |
| Twitter Card | `summary_large_image` |
| Schema.org | `LocalBusiness` JSON-LD avec horaires, zone, offres |
| Google Analytics 4 | GA4 avec `anonymize_ip` (RGPD) |
| Canonical URLs | Une URL canonique par page |
| Robots | Pages admin exclues (`noindex`) |

### Mots-clés ciblés

- WiFi Nantes
- Installation WiFi Nantes
- Problème WiFi maison
- Diagnostic WiFi Nantes
- Expert WiFi Nantes
- Dépannage WiFi Nantes
- Réseau WiFi professionnel Nantes

---

## 📦 Déploiement

| Couche | Service recommandé |
|---|---|
| Frontend | Vercel / Netlify |
| Backend | Render / Railway / VPS |
| Base de données | MongoDB Atlas |
| Emails | Gmail SMTP / Resend / Mailgun |

### Variables d'environnement

**Frontend `.env`**
```env
VITE_API_URL=https://api.nantes-wifi.fr
```

**Backend `.env`**
```env
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=votre_secret_jwt
EMAIL_USER=contact@nantes-wifi.fr
EMAIL_PASS=votre_mot_de_passe
FRONTEND_URL=https://nantes-wifi.fr
```

---

## 🔄 Flux utilisateur
Visiteur → Home → Services → Tarifs
↓
Formulaire contact
↓
Backend (validation + email)
↓
Admin reçoit l'email + dashboard
↓
Conversion client

---

## 🧪 Tests

- Tests API : Postman (collection complète)
- Tests responsive : Mobile, tablette, desktop
- Tests formulaire : validation, rate limit, emails
- Tests auth : login, token expiré, route protégée

---

## 💡 Bonus stratégique

> Objectif : **générer des clients automatiquement**

- [ ] Bouton WhatsApp flottant
- [ ] Numéro de téléphone cliquable
- [ ] CTA "Devis gratuit en 2 min"
- [ ] Section avis clients (preuve sociale)
- [ ] Chat en ligne
- [ ] Réservation de créneau
- [ ] Paiement en ligne (Stripe)
- [ ] CRM intégré

---

## 🌱 Données de seed

```bash
# Créer les données de test (50 contacts + 3 offres + 1 admin)
cd backend
npx ts-node src/scripts/seed.ts

# Admin par défaut
Email    : admin@nantes-wifi.fr
Password : 123456
```

---

## 📅 Planning réalisé

| Étape | Statut |
|---|---|
| Design UI/UX | ✅ Terminé |
| Frontend — Pages publiques | ✅ Terminé |
| Frontend — Dashboard admin | ✅ Terminé |
| Backend — API REST | ✅ Terminé |
| Sécurité (Zod, Helmet, Rate limit) | ✅ Terminé |
| SEO & Analytics | ✅ Terminé |
| Déploiement | 🔄 En cours |

---

## 📌 Auteur

Projet réalisé par **HAMDI Mohamed**  
Dans le cadre d'un projet de solution WiFi professionnelle à Nantes.

---

## 📜 Licence

Projet privé — usage commercial.  
Tous droits réservés © 2025 Nantes WiFi Solutions.