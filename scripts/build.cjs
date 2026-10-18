const fs = require('node:fs');
const { compile, optimize } = require('@tailwindcss/node');
const { Scanner } = require('@tailwindcss/oxide');

async function build() {
  // Compilation ponctuelle via l'API : aucune dépendance de surveillance des fichiers.
  const sources = ['index.html', '404.html', 'demo-acces.html', 'source-privee.html', 'main.js', 'assets/404-page.js', 'assets/demo-acces-page.js', 'assets/source-privee-page.js'];
  const compiler = await compile(fs.readFileSync('tailwind.css', 'utf8'), {
    base: process.cwd(),
    onDependency() {}
  });
  const scanner = new Scanner({});
  const candidates = scanner.scanFiles(sources.map(file => ({
    content: fs.readFileSync(file, 'utf8'),
    extension: file.endsWith('.html') ? 'html' : 'js'
  })));
  fs.writeFileSync('assets/tailwind.css', optimize(compiler.build(candidates), { minify: true }).code);
  fs.copyFileSync('node_modules/lucide/dist/umd/lucide.min.js', 'assets/lucide.min.js');
  fs.copyFileSync('node_modules/lucide/LICENSE', 'assets/lucide.LICENSE');
  // Liste explicite : les dépendances et outils ne sont jamais publiés.
  fs.mkdirSync('dist/assets', { recursive: true });
  for (const file of ['index.html', '404.html', 'demo-acces.html', 'source-privee.html', 'main.js', 'style.css', 'image_portfolio.jpg']) {
    fs.copyFileSync(file, `dist/${file}`);
  }
  for (const file of ['tailwind.css', 'lucide.min.js', 'lucide.LICENSE', '404-page.js', 'demo-acces-page.js', 'source-privee-page.js']) {
    fs.copyFileSync(`assets/${file}`, `dist/assets/${file}`);
  }
}

build().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
