# 🚀 Streamer Hub (Vite + React + Tailwind + Router + Express)

👋 Salut à tous, moi c’est **RapidolaFleche** 🏹, et j’ai créé ce projet de base pour un streamer que j’aime beaucoup 💜.  
L’idée : construire un petit hub simple, moderne et rapide ⚡️ pour centraliser ses contenus : accueil, live et vidéos.

---

## 🌟 Fonctionnalités principales

- 🏠 **Accueil** → Présentation personnalisée avec bannières & liens
- 🎥 **Stream** → Intégration de la chaîne Twitch via `VITE_TWITCH_CHANNEL`
- 📺 **Vidéos** → Récupération automatique depuis YouTube (via `YT_API_KEY` + `YT_CHANNEL_ID`)
- 🎨 **Design** → Interface moderne avec TailwindCSS
- ⚡ **Techno** → Vite, React, React Router et Express côté backend

---

## 🛠️ Installation & Démarrage

1. 📦 **Installe Node.js** (>= 18 recommandé)
2. 🔧 Dans un terminal :

   ```bash
   npm install
   cp .env.example .env
   # puis ouvre le fichier .env et configure :
   # - YT_API_KEY (clé API YouTube)
   # - YT_CHANNEL_ID (ID de la chaîne YouTube)
   # - VITE_TWITCH_CHANNEL (pseudo Twitch du streamer)
   npm run dev
   ```

3. 🌍 Ouvre dans ton navigateur : [http://localhost:5173](http://localhost:5173)

---

## 🎨 Personnalisation

- 🎮 Twitch : `VITE_TWITCH_CHANNEL` dans `.env`
- 📺 YouTube : `YT_CHANNEL_ID` dans `.env`
- 🖼️ Bannières et images : `src/pages/Home.jsx`
- 🎭 Style : Tailwind (modifie classes utilitaires selon ton goût)

---

## 📦 Build & Production

Pour générer ton projet en mode production :

```bash
npm run build
npm run preview
```

👉 Cela permet de tester le **build final** en local avant un déploiement.

---

## 🛡️ Bonnes pratiques

- ⚠️ **Ne partage pas ton `.env`** (contient les clés secrètes)
- ✅ Partage un fichier `.env.example` (vide, avec juste les noms de variables)
- 🚀 Toujours relancer `npm run build` après un changement important avant mise en prod

---

## ❤️ Motivation

Ce projet est né parce que **RapidolaFleche** voulait faire plaisir à un streamer qu’il apprécie énormément 💜.  
C’est une base solide, mais libre à vous de l’améliorer, d’y ajouter vos idées, et d’en faire un hub encore plus fou 🚀.

---

✨ Amusez-vous bien, et que vos streams soient remplis de hype et de bonne vibe ✨  
