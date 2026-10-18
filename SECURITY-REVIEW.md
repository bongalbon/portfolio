# Revue de sécurité — 18 octobre 2026

Périmètre : les quatre pages HTML, `main.js`, les scripts annexes, les ressources et la configuration Netlify du dépôt courant. Revue de code locale ; aucun test d'intrusion sur les applications présentées, aucun accès à la configuration Formspree et aucune vérification d'un déploiement public. Les niveaux ci-dessous expriment une priorité de correction, pas une exploitation constatée.

## Constats corrigés

| Priorité | Constat initial | Correction |
| --- | --- | --- |
| P2 | `main.js`, ancien `showStatus` (lignes 519/522) : la réponse d'erreur Formspree rejoignait `innerHTML`. Une réponse contenant du HTML pouvait créer des éléments actifs. Aucune preuve que Formspree permette à un attaquant de contrôler cette réponse. | Messages insérés par `textContent`. Test de régression avec une charge `<img onerror>`. |
| P2 | Les quatre pages exécutaient Tailwind à distance et Lucide via `@latest`, sans intégrité ni version stable. Une modification du fournisseur pouvait changer le code exécuté chez les visiteurs. | Tailwind compilé au build, Lucide copié localement, versions exactes et fichier de verrouillage des dépendances. Aucun JavaScript distant au chargement. |
| P2 | Absence de Content Security Policy : aucune restriction supplémentaire sur les scripts, formulaires ou intégrations. | CSP dans `netlify.toml`, scripts limités à l'origine locale, connexions et formulaire limités à Formspree, objets et base URL interdits. Scripts inline externalisés. Une CSP par balise meta couvre aussi les hébergements statiques sans en-têtes personnalisables. |
| P3 | Les pages de démo et de source décodaient une seconde fois `name`, déjà décodé par `URLSearchParams`. Un `%` malformé pouvait interrompre le script. | Suppression du double décodage, longueur d'affichage limitée et dictionnaire interrogé avec `Object.hasOwn`. Le titre reste inséré par `textContent`. |
| P2 | Sept alertes dans la chaîne Tailwind 3 (cinq élevées, deux modérées), liées à `braces` et `postcss-selector-parser`. | Migration vers Tailwind 4.3.3 avec compilation directe via `@tailwindcss/node` et `@tailwindcss/oxide`. Le CLI et son watcher ne sont pas nécessaires au build statique et ont été retirés. Les paquets vulnérables ont disparu du verrou de dépendances. |

Durcissement complémentaire : badges des technologies créés avec `textContent`, limites de longueur du formulaire pour l'ergonomie, protection contre le double clic pendant l'envoi, annonce accessible des retours et publication Netlify limitée aux fichiers du site dans `dist/`.

## Points à vérifier à l'exploitation

- Les limites HTML et le verrou d'envoi côté navigateur ne sont pas une protection antispam serveur. Vérifier les restrictions de domaine et les protections antispam disponibles dans le compte Formspree. L'identifiant public du formulaire n'est pas un secret.
- GitHub Pages n'interprète pas `netlify.toml`. La CSP meta s'y applique, mais `frame-ancestors`, `X-Frame-Options`, `nosniff` et les autres en-têtes doivent être servis par un hébergeur/proxy compatible pour être effectifs. Après déploiement Netlify, vérifier les en-têtes HTTP reçus, y compris sur `/` et les pages annexes.
- Google Fonts et Formspree restent des services externes : polices et messages passent par ces fournisseurs. Aucun secret n'a été repéré dans les fichiers applicatifs examinés ; l'historique Git n'a pas été audité.
- `modalDescription.innerHTML` contient uniquement des descriptions HTML écrites en dur dans `projectDetailsData`. Ne pas y injecter ultérieurement une API, des paramètres URL ou une saisie utilisateur sans assainissement adapté.
- Les pages « source privée » et « accès démo » sont informatives. Elles ne protègent aucun serveur ; l'authentification des applications liées est hors de ce dépôt.
- Conserver le verrou de dépendances et contrôler les mises à jour avant de régénérer les fichiers locaux. Une copie locale réduit les dépendances au chargement mais ne dispense pas de vérifier la chaîne de build.

## Vérifications reproductibles

`npm run build` génère les ressources locales et le dossier de publication. `npm test` contrôle l'injection dans les retours de formulaire, le respect de la réduction des animations, les paramètres URL malformés, l'absence de scripts distants/inline et les chemins locaux des ressources.

Résultats locaux : build réussi, 4 tests réussis, `git diff --check` sans erreur. Contrôle navigateur de l'accueil, du filtre Desktop et de l'ouverture/fermeture d'une fiche : fonctionnement confirmé, aucune erreur/alerte dans les journaux de la page lors de ce parcours. L'envoi réel Formspree n'a pas été déclenché. Le rendu mobile et les en-têtes du déploiement public restent à vérifier.

Après migration : `npm audit --include=dev --include=optional` retourne **0 vulnérabilité connue**, sans masquer les dépendances de compilation ni les dépendances optionnelles. La palette Tailwind 3 est conservée et les classes supprimées/renommées sont adaptées. L'accueil, le filtre Desktop et une fiche projet ont été revérifiés dans le navigateur après migration. La nouvelle base CSS nécessite des navigateurs compatibles Tailwind 4, précisés dans le README.

Références : [MDN — risques de innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML), [MDN — Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy), [Tailwind — Play CDN réservé au développement](https://tailwindcss.com/docs/installation/play-cdn).
