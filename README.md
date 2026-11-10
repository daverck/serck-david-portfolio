# David Serck — Portfolio Développeur Full-Stack

[![React 19](https://img.shields.io/badge/React-19.3.0-blue.svg)](https://react.dev/)
[![Vite 8](https://img.shields.io/badge/Vite-8.3.0-646CFF.svg)](https://vitejs.dev/)
[![React Router 8](https://img.shields.io/badge/React_Router-8.3.1-CA4245.svg)](https://reactrouter.com/)
[![Tailwind CSS 3](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC.svg)](https://tailwindcss.com/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5.8.0-3178C6.svg)](https://www.typescriptlang.org/)
[![Cloudflare Pages](https://img.shields.io/badge/Deploy-Cloudflare_Pages-F38020.svg)](https://pages.cloudflare.com/)

Site portfolio moderne, responsive (mobile-first), performant et accessible de **David Serck** (Développeur Full-Stack avec 6 ans d'expérience, spécialisé en Angular, Python et Java Spring Boot).

Ce site est piloté dynamiquement par des données JSON exportées depuis [rxresu.me](https://rxresu.me/) et propose un support bilingue complet (Français / Anglais).

---

## 🌟 Fonctionnalités Clés

- **Support Bilingue (FR / EN)** :
  - Commutateur instantané de langue (`FR | EN`) dans le header et le menu mobile.
  - Double dataset dédié : `src/data/resume.fr.json` et `src/data/resume.en.json`.
  - Traduction contextuelle de l'ensemble de l'UI et des données de parcours.
  - Persistance du choix de langue dans le `localStorage`.

- **3 Pages Employeurs Dédiées** :
  - **Konekto** ([`/experience/konekto`](https://daverck.github.io/serck-david-portfolio/experience/konekto)) : 7 projets détaillés (PEPPOL/UBL, migration Angular 21 / Spring Boot 4, pointage RH, IA YOLO & ChatGPT, Keycloak).
  - **Dstny** ([`/experience/dstny`](https://daverck.github.io/serck-david-portfolio/experience/dstny)) : 4 projets détaillés (lookup serveur haute disponibilité, CockroachDB, Redis, APIs Python Tornado, dashboards React).
  - **Micro Belgium Application - MBA** ([`/experience/mba`](https://daverck.github.io/serck-david-portfolio/experience/mba)) : 7 projets détaillés (flux de facturation e-fff, synchronisation .dbf via T-SQL, relevés CODA en PDF, synchronisation Google Classroom, transcription vocale .NET).
  - Recherche et filtrage interactif par technologie sur chaque page entreprise.
  - Navigation rapide précédent/suivant entre les employeurs.

- **Expérience Utilisateur & Design** :
  - **Dark / Light Mode** : Bascule fluide avec détection de préférence système et persistance `localStorage`.
  - **Hero Section** : Photo de profil, badge animé de disponibilité immédiate, coordonnées directes et réseaux sociaux.
  - **Compétences & Stack** : Filtrage par catégorie (Backend, Frontend, Cloud/DevOps, Bases de données, IA) avec badges visuels.
  - **Parcours Académique & Langues** : Diplômes (IFOSUP grande distinction, Technobel, Technofutur, Technofutur TIC IA/IOT) et jauges de maîtrise linguistique.

- **Optimisé pour Cloudflare Pages** :
  - Règle de réécriture SPA `/* /index.html 200` dans `public/_redirects` pour éviter toute erreur 404 sur les URLs profondes.
  - En-têtes HTTP de sécurité (`X-Frame-Options`, `X-Content-Type-Options`) et politique de cache dans `public/_headers`.
  - Build statique rapide produit dans le dossier standard `dist/`.

---

## 🛠️ Stack Technique

| Rôle | Technologie |
|---|---|
| **Langage** | TypeScript 5.8 |
| **Framework** | React 19.3.0 |
| **Routage** | React Router 8.3.1 (package unifié `react-router`) |
| **Bundler** | Vite 8.3.0 (moteur Rolldown) |
| **Styles** | Tailwind CSS 3.4.17 + PostCSS + Autoprefixer |
| **Icônes** | Lucide React |
| **Hébergement** | Cloudflare Pages |

---

## 📁 Structure du Projet

```
serck-david-portfolio/
├── public/
│   ├── _headers                   # Headers HTTP de sécurité et de mise en cache
│   ├── _redirects                 # Règle SPA pour Cloudflare Pages
│   ├── favicon.svg                # Favicon monogramme 'DS'
│   └── resume.json                # Données statiques
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Badge.tsx          # Badges statut et technos
│   │   │   ├── Breadcrumb.tsx     # Fil d'Ariane
│   │   │   ├── ExternalLink.tsx   # Liens externes sécurisés
│   │   │   ├── Icons.tsx          # Icônes SVG officielles (GitHub, LinkedIn)
│   │   │   ├── LanguageToggle.tsx # Commutateur FR / EN
│   │   │   ├── RichHtml.tsx       # Rendu HTML avec styles typographiques
│   │   │   ├── BackToTop.tsx      # Bouton flottant retour en haut accessible
│   │   │   ├── SlantedSectionBackground.tsx # Séparations diagonales sans jointure
│   │   │   ├── ThemeToggle.tsx    # Bascule Dark / Light mode
│   │   ├── layout/
│   │   │   ├── Header.tsx         # Navigation sticky responsive
│   │   │   ├── AmbientBackground.tsx # Fond dynamique animé fluide
│   │   │   └── Layout.tsx         # Enveloppe avec skip-link et scroll-to-top
│   │   ├── sections/
│   │   │   ├── Hero.tsx           # Photo, disponibilité, coordonnées
│   │   │   ├── Skills.tsx         # Compétences avec filtres
│   │   │   ├── ExperienceTimeline.tsx # Aperçu des 3 entreprises
│   │   │   ├── Education.tsx      # Diplômes et langues
│   │   │   └── Contact.tsx        # Prise de contact directe
│   │   └── experience/
│   │       ├── EmployerHero.tsx   # En-tête de la page employeur
│   │       ├── ProjectCard.tsx    # Fiche détaillée de projet
│   │       └── EmployerNav.tsx    # Navigation rapide inter-employeurs
│   ├── context/
│   │   └── LanguageContext.tsx    # Gestion du bilinguisme FR/EN
│   ├── data/
│   │   ├── resume.fr.json         # Données CV en français (rxresu.me)
│   │   ├── resume.en.json         # Données CV en anglais (rxresu.me)
│   │   └── employers.ts           # Logique métier multilingue des 3 employeurs
│   ├── pages/
│   │   ├── HomePage.tsx           # Page d'accueil complète
│   │   └── EmployerDetailPage.tsx # Page employeur dynamique (/experience/:slug)
│   ├── types/
│   │   └── resume.ts              # Schéma TypeScript exhaustif
│   ├── App.tsx                    # Configuration des routes
│   ├── main.tsx                   # Point d'entrée React 19
│   └── index.css                  # Directives Tailwind et scrollbars modernes
├── index.html                     # HTML principal avec SEO & OpenGraph
├── package.json                   # Dépendances et scripts
├── tailwind.config.js             # Configuration Tailwind CSS
├── tsconfig.json                  # Configuration TypeScript strict
└── vite.config.ts                 # Configuration Vite 8
```

---

## 🚀 Démarrage Rapide

### Prérequis
- **Node.js** `>= 22.12.0` (testé et validé avec **Node v24.21.0 LTS**)
- **npm** `>= 10.0.0` (validé avec **npm 11.19.0**)

### Installation des dépendances
```bash
npm install
```

### Lancer le serveur de développement
```bash
npm run dev
```
Accédez au site sur `http://localhost:3000`.

### Compiler pour la production
```bash
npm run build
```
Les fichiers statiques optimisés sont générés dans le dossier `dist/`.

### Prévisualiser le build localement
```bash
npm run preview
```

---

## ☁️ Déploiement sur Cloudflare Pages

1. Connectez votre dépôt GitHub à **Cloudflare Pages**.
2. Renseignez les paramètres de build suivants :
   - **Framework preset** : `None` ou `Vite`
   - **Build command** : `npm run build`
   - **Build output directory** : `dist`
   - **Variable d'environnement** (optionnel) : `NODE_VERSION = 22` ou `24`
3. Déployez ! Le fichier `public/_redirects` sera automatiquement copié dans `dist/_redirects` pour garantir le fonctionnement du routage client sans erreur 404.

---

## 💬 Assistant conversationnel (Cloudflare Workers + Gemini)

Le widget React bilingue utilise un Worker indépendant, dans `worker/`. Le Worker contient son corpus de connaissances, valide les messages, limite chaque adresse IP à 12 requêtes par minute et appelle Gemini côté serveur. Les réponses trop courtes ou interrompues sont régénérées une fois, puis rejetées plutôt que présentées comme complètes. La clé Gemini ne doit jamais être ajoutée au frontend.

Le modèle par défaut est `gemini-3.6-flash`, un modèle Flash stable actuellement documenté par [Google](https://ai.google.dev/gemini-api/docs/models). Gemini 1.5 Flash n'est plus le choix adapté pour un nouveau déploiement. Le modèle peut être modifié dans `worker/wrangler.jsonc`.

### Obtenir une clé Gemini

1. Connectez-vous à [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Créez une clé API et conservez-la dans un gestionnaire de secrets. Ne la préfixez pas avec `VITE_` et ne la commitez jamais.

### Développement local

Dans `worker/.dev.vars` (fichier ignoré par Git), ajoutez :

```dotenv
GEMINI_API_KEY=votre_cle_gemini
```

Dans `.env.local` à la racine du portfolio, ajoutez :

```dotenv
VITE_CHATBOT_API_URL=http://localhost:8787/api/chat
```

Dans deux terminaux, lancez le Worker et le frontend :

```bash
npx wrangler@latest dev --config worker/wrangler.jsonc --port 8787
```

```bash
npm run dev
```

Le frontend est accessible sur `http://localhost:3000`. Le Worker autorise les origines localhost pour le développement et `https://daverck.github.io` en production.

### Déploiement du Worker

Installez et authentifiez Wrangler, puis enregistrez la clé comme secret Cloudflare :

```bash
npx wrangler@latest login
npx wrangler@latest secret put GEMINI_API_KEY --config worker/wrangler.jsonc
npx wrangler@latest deploy --config worker/wrangler.jsonc
```

Configurez ensuite `VITE_CHATBOT_API_URL` avec l'URL de votre Worker, par exemple `https://serck-david-chatbot.<sous-domaine>.workers.dev/api/chat`, dans l'environnement de build de GitHub Pages, puis reconstruisez et redéployez le site. Cette URL n'est pas secrète. Le Worker refuse les origines autres que le domaine GitHub Pages configuré et localhost.

Pour le déploiement automatique sur **GitHub Pages** :

1. Déployez le Worker et récupérez son URL `workers.dev`.
2. Dans GitHub, ouvrez **Settings → Secrets and variables → Actions → Variables**, puis créez la variable de dépôt `VITE_CHATBOT_API_URL` avec l'URL complète du Worker, par exemple `https://serck-david-chatbot.<sous-domaine>.workers.dev/api/chat`. Il s'agit d'une variable publique, pas d'un secret.
3. Le workflow `.github/workflows/deploy.yml` transmet cette variable à Vite au moment du build. Relancez le workflow **Deploy to GitHub Pages** (ou poussez un commit) pour publier le changement.

L'origine navigateur du site est `https://daverck.github.io` : le chemin `/serck-david-portfolio/` et le paramètre `?lang=en` ne font pas partie de l'origine CORS. Elle est déjà autorisée par le Worker. N'ajoutez pas l'URL du portfolio avec son chemin à la liste CORS, et ne mettez jamais la clé Gemini dans une variable `VITE_*`.

Le rate limiter utilise le namespace `1001` de `worker/wrangler.jsonc`; remplacez cet identifiant s'il est déjà utilisé par un autre binding de votre compte Cloudflare. Les quotas et conditions des offres gratuites Google et Cloudflare peuvent évoluer.

---

## 👤 Contact

- **David Serck** — Développeur Full-Stack
- **Email** : [serckdavid@gmail.com](mailto:serckdavid@gmail.com)
- **LinkedIn** : [linkedin.com/in/serck-david](https://linkedin.com/in/serck-david)
- **GitHub** : [@daverck](https://github.com/daverck)
- **Localisation** : Wavre, Belgique
