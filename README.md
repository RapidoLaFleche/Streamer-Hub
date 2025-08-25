🎮 Streamer Hub — Vite + React + Tailwind + Router + Express

👋 Salut ! Moi c’est RapidolaFleche. J’ai monté ce projet par passion, fait “de base” pour un streamer que j’aime beaucoup ❤️‍🔥.
Le but : un petit hub tout-en-un avec 3 onglets ultra simples et efficaces : Accueil, Stream, Vidéos.

✨ Fonctionnalités clés

⚡️ Front ultra-rapide avec Vite + React 18

🎨 Tailwind CSS pour un style propre et moderne

🧭 React Router pour la navigation (SPA)

🛰️ Express (Node.js) en option pour proxy/API (YouTube / endpoints custom)

📺 Intégration Twitch (embed du live/chat)

▶️ Section vidéos YouTube (via l’API Data v3)

🛡️ Prêt pour prod derrière Apache (HTTP/HTTPS), réécritures SPA et proxy /api

🧱 Pré-requis

🟢 Node.js 18+ (recommandé LTS)

🧩 npm (ou pnpm/yarn si tu préfères)

🌐 (Optionnel) Clé API YouTube Data v3

🔐 (Optionnel) Nom de domaine + HTTPS (Let’s Encrypt / Certbot)

🧰 (Optionnel) Apache si tu déploies sur un serveur web

🚀 Démarrage rapide (dev)
# 1) Installer les dépendances
npm install

# 2) Préparer les variables d'env
cp .env.example .env
# --> édite .env et renseigne YT_API_KEY / YT_CHANNEL_ID / VITE_TWITCH_CHANNEL / VITE_TWITCH_PARENTS

# 3) Lancer le front (Vite)
npm run dev
# http://localhost:5173


💡 Si tu utilises aussi Express (API/proxy), lance-le dans un autre terminal :
npm run server (ou node server.js selon ta config).
Tu peux aussi créer un script dev:all avec concurrently pour tout démarrer d’un coup.

⚙️ Fichier .env — variables utiles
# --- FRONT (Vite) ---
# Nom de chaîne Twitch (login)
VITE_TWITCH_CHANNEL=rayzopp

# Domaines autorisés pour l'embed Twitch (IMPORTANT en prod)
# Séparés par des virgules, sans http(s)
VITE_TWITCH_PARENTS=localhost,techtwins.fr,www.techtwins.fr

# Base du router si l’app est servie dans un sous-dossier (ex: /rayzopp)
VITE_APP_BASENAME=/rayzopp

# --- BACK (Express) ---
# Clé API YouTube (Data API v3)
YT_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# ID de chaîne YouTube (@pseudo ≠ ID)
YT_CHANNEL_ID=UCxxxxxxxxxxxxxxxxxxxx


🧭 Si tu déploies l’app dans un sous-chemin (ex: https://techtwins.fr/rayzopp), pense à :

Mettre <BrowserRouter basename="/rayzopp"> côté React ou utiliser VITE_APP_BASENAME=/rayzopp et le lire au montage.

Configurer Vite base si tu buildes des assets sous-dossier.

🗂️ Arborescence type
.
├─ public/
├─ src/
│  ├─ pages/
│  │  ├─ Home.jsx
│  │  ├─ Stream.jsx
│  │  └─ Videos.jsx
│  ├─ styles/
│  │  └─ index.css
│  ├─ App.jsx
│  └─ main.jsx
├─ server.js           # (Optionnel) Express: proxy / api
├─ .env.example
├─ .env
├─ package.json
└─ vite.config.js

🧪 Scripts npm utiles
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "server": "node server.js",
    "dev:all": "concurrently \"npm:server\" \"npm:dev\""
  }
}


Installe concurrently si tu veux dev:all :
npm i -D concurrently

🧵 Intégration Twitch (embed)

Utilise le composant officiel ou l’SDK embed.

Crucial : Twitch exige le(s) parent domain(s) autorisés.

En local : localhost

En prod : techtwins.fr et/ou www.techtwins.fr

Exemples :

<TwitchPlayer
  channel={import.meta.env.VITE_TWITCH_CHANNEL}
  parent={import.meta.env.VITE_TWITCH_PARENTS.split(',')}
/>


Erreurs fréquentes :

InvalidParent → ton domaine n’est pas dans la liste parent.

X-Frame-Options / CSP → vérifie tes headers côté serveur.

▶️ Intégration YouTube (API Data v3)

Obtiens une clé API sur Google Cloud Console.

Stocke YT_API_KEY et YT_CHANNEL_ID dans .env.

Côté Express, expose des routes simples :

// GET /api/youtube/latest
// GET /api/youtube/videos?maxResults=5


Côté React, consomme /api/youtube/... (proxy interne) → évite CORS.

🏗️ Build
npm run build
npm run preview   # teste le build en local


Le build génère /dist.

Tu peux le déployer tel quel derrière Apache/nginx.

Si tu es en sous-dossier, ajuste :

<BrowserRouter basename="/rayzopp">

Une réécriture SPA côté Apache

(Optionnel) base dans vite.config.js

🌍 Déploiement avec Apache (HTTP/HTTPS)
1) Copier le build
sudo mkdir -p /var/www/html/rayzopp
sudo rsync -av --delete dist/ /var/www/html/rayzopp/

2) .htaccess (réécritures SPA)

Place ce fichier dans /var/www/html/rayzopp/.htaccess :

RewriteEngine On
RewriteBase /rayzopp/
RewriteRule ^index\.html$ - [L]

# Laisse passer les fichiers réels
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

# Sinon, renvoie toujours l'app
RewriteRule . /rayzopp/index.html [L]

3) VirtualHost (exemple)
<VirtualHost *:80>
    ServerName techtwins.fr
    ServerAlias www.techtwins.fr

    DocumentRoot /var/www/html

    # App servie dans /rayzopp
    Alias /rayzopp /var/www/html/rayzopp
    <Directory /var/www/html/rayzopp>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    # (Optionnel) Proxy API Express
    ProxyPreserveHost On
    ProxyPass /api http://127.0.0.1:3000/api
    ProxyPassReverse /api http://127.0.0.1:3000/api

    ErrorLog ${APACHE_LOG_DIR}/techtwins_error.log
    CustomLog ${APACHE_LOG_DIR}/techtwins_access.log combined
</VirtualHost>


🔒 Ajoute le VirtualHost :443 avec SSL (Let’s Encrypt) et les mêmes règles (Alias, ProxyPass), sinon la redirection 80→443 cassera /rayzopp//api.

🧯 Dépannage (FAQ)

❌ Les JS/CSS se chargent en text/html (MIME interdit)
→ Manque de rewrite SPA / mauvais basename / base Vite.
→ Vérifie .htaccess et que les assets /rayzopp/assets/... existent.

❌ SPA 404 quand je refresh une route
→ Réécritures SPA manquantes. Utilise le .htaccess ci-dessus.

❌ Twitch “InvalidParent” / iframe refusée
→ Mets VITE_TWITCH_PARENTS à jour avec tous les domaines réellement utilisés (sans protocole).

❌ CORS en dev (YouTube, APIs externes)
→ Passe par un proxy Express (/api/...) côté serveur.

❌ 301 sur /lounge ou /rayzopp puis erreur en HTTPS
→ Reproduis la même config côté vhost :443 (Proxy/Alias/Overrides), pas que sur :80.

👤 À propos

Créé par RapidolaFleche 🏹 — “fait de base pour un streamer que j’aime beaucoup” 💜
But : un hub simple, rapide et propre pour suivre son live, sa page d’accueil, et ses vidéos.

📜 Licence

MIT — fais-en bon usage, et n’oublie pas les petits crédits si tu réutilises 😄

🧩 Idées d’améliorations

🔍 Recherche/tri/pagination côté front

🌗 Thème clair/sombre

🧪 Tests (Vitest/RTL)

🛠️ CI/CD (GitHub Actions)

🧵 Récupération d’autres classements (ex: MKWorld API) via proxy /api

🙌 Merci

Si tu utilises ce projet ou si ça t’a aidé, dis-le moi — ça me fera super plaisir ! 🚀