# 🚀 Portfolio Professionnel — Hermann SIYA

> **Secrétaire Général de Mairie (Commune de Touloum) & Ingénieur Logiciel**  
> Conception et déploiement de solutions logicielles complètes : ERP pour Collectivités Territoriales Décentralisées (CTD), Fintech mobiles (Flutter, Kotlin Jetpack Compose), architectures distribuées IA et sécurité logicielle (RSA).

---

## 🛠️ Stack Technique

* **Front-end :** HTML5 Sémantique, JavaScript Vanilla (ES6+)
* **Styling & UI :** Tailwind CSS compilé localement, Effets Glassmorphism, Responsive Design
* **Icônes :** Lucide Icons, version figée et copie locale
* **Formulaire :** Intégration Formspree (Traitement sans serveur / AJAX)

---

## 📂 Structure du Projet

```text
portfolio/
├── index.html           # Page principale complète et responsive
├── 404.html             # Page d'erreur 404 personnalisée
├── source-privee.html   # Page d'information pour code source privé / propriétaire
├── demo-acces.html      # Page d'accès et demande de démo sur environnement dédié
├── image_portfolio.jpg  # Photo de profil professionnelle
├── style.css            # Styles personnalisés, animations & glassmorphism
├── main.js              # Logique d'interactivité, filtres & modal
├── netlify.toml         # Configuration de déploiement et sécurité Netlify
└── README.md            # Documentation du projet
```

---

## ⚙️ Configuration

Pour régénérer les ressources après une modification de classes HTML/JS :

Utiliser Node.js 20 ou plus récent. La compilation repose sur les API officielles Tailwind CSS 4 (`@tailwindcss/node` et `@tailwindcss/oxide`), avec des versions figées dans `package-lock.json`. Le CLI et son outil de surveillance ne sont pas installés. La palette précédente est conservée dans `tailwind-palette.cjs`.

```sh
npm ci --ignore-scripts
npm run build
npm test
```

Le build met à jour `assets/` (à conserver dans Git pour GitHub Pages) et prépare `dist/`, le dossier à publier. Netlify exécute automatiquement le build via `netlify.toml`. Les scripts inline et les compilateurs CDN ont été supprimés pour permettre une CSP restrictive.

Compatibilité CSS de Tailwind 4 : Safari 16.4+, Chrome 111+ et Firefox 128+ ([guide officiel](https://tailwindcss.com/docs/upgrade-guide)).

Animations : apparitions au défilement, accueil progressif, filtrage et fiches projets. La préférence système `prefers-reduced-motion` est respectée ; le contenu reste accessible sans animation.

Le compte rendu de sécurité et les limites de vérification figurent dans [SECURITY-REVIEW.md](SECURITY-REVIEW.md).

* **Auteur :** Hermann SIYA
* **Formulaire de contact :** Connecté à Formspree (`https://formspree.io/f/xljrkkqy`)
* **Hébergement cible :** Netlify / GitHub Pages

---

## 🌐 Déploiement sur Netlify (Recommandé)

### Option 1 : Déploiement automatique via GitHub (Recommandé)

1. Connectez-vous sur [Netlify](https://app.netlify.com/).
2. Cliquez sur **"Add new site"** > **"Import an existing project"**.
3. Choisissez **GitHub** et autorisez l'accès à votre compte.
4. Sélectionnez votre dépôt : `bongalbon/portfolio`.
5. Netlify détecte automatiquement le fichier `netlify.toml` :
   * **Branch to deploy :** `main`
   * **Build command :** `npm run build`
   * **Publish directory :** `dist`
6. Cliquez sur **"Deploy portfolio"**. Votre site est en ligne en quelques secondes !

### Option 2 : Déploiement instantané par Glisser-Déposer (Netlify Drop)

1. Rendez-vous sur [Netlify Drop](https://app.netlify.com/drop).
2. Exécutez `npm ci --ignore-scripts` puis `npm run build`, et glissez-déposez le dossier `dist`.
3. Le site est immédiatement déployé et opérationnel.

---

## 🚀 Déploiement sur GitHub Pages

1. Activez **GitHub Pages** dans votre dépôt :
   * Rendez-vous dans **Settings** > **Pages**
   * Sous **Build and deployment** > **Branch**, sélectionnez la branche `main` et le dossier `/ (root)`
   * Cliquez sur **Save**
2. Votre site sera publié à l'adresse :
   `https://bongalbon.github.io/portfolio/`
