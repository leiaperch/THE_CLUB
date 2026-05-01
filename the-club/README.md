# THE CLUB — Visual Novel (Web / inkjs)

Projet web pour jouer THE CLUB directement dans le navigateur, propulsé par [inkjs](https://github.com/y-lohse/inkjs).

---

## 🚀 Démarrage rapide

### 1. Prérequis

- [Node.js](https://nodejs.org/) v18+
- [VS Code](https://code.visualstudio.com/)

### 2. Installer les dépendances

```bash
npm install
```

### 3. Compiler le fichier Ink

```bash
npm run compile
```

Cela génère `story.json` à la racine du projet.

### 4. Lancer le jeu

**Option A — via VS Code**
- Installe l'extension **Live Server** (recommandée automatiquement)
- Clic droit sur `index.html` → **Open with Live Server**

**Option B — via terminal**
```bash
npm run dev
```

> Le jeu s'ouvre sur http://localhost:3000

---

## 📁 Structure du projet

```
the-club/
├── src/
│   └── the_club_ep1.ink      ← Ton script Ink
├── .vscode/
│   ├── settings.json          ← Config VS Code
│   ├── extensions.json        ← Extensions recommandées
│   ├── tasks.json             ← Tâches (compiler, lancer)
│   └── launch.json            ← Debug Chrome
├── assets/
│   └── images/                ← Backgrounds, sprites, etc.
├── index.html                 ← Interface du jeu
├── style.css                  ← Thème visuel
├── main.js                    ← Moteur de jeu
├── compile.js                 ← Script de compilation ink → json
├── story.json                 ← (généré) Histoire compilée
└── package.json
```

---

## ✍️ Modifier le script

1. Édite `src/the_club_ep1.ink` dans VS Code
2. Lance `npm run compile` (ou Ctrl+Shift+B → "Compiler Ink → JSON")
3. Recharge le navigateur

---

## 🎮 Extensions VS Code recommandées

| Extension | Utilité |
|---|---|
| **Ink Language Server** | Coloration syntaxique + erreurs pour .ink |
| **Live Server** | Serveur local avec rechargement auto |
| **Prettier** | Formatage automatique du code |
| **Error Lens** | Affiche les erreurs en ligne |

---

## 📦 Hébergement

Pour partager le jeu, upload les fichiers sur :
- [itch.io](https://itch.io) (idéal pour visual novels)
- GitHub Pages
- Vercel / Netlify

N'oublie pas d'inclure `story.json` dans l'upload !

---

## 🏆 Fins secrètes

- **"N'a pas passé le CAPTCHA"** : Choisis "NE RIEN DIRE" à toutes les occasions possibles (4 fois)

