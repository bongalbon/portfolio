/**
 * ==========================================================================
 * Portfolio Main Logic - JavaScript Vanilla
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialisation des icônes Lucide
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Gestion du Menu Mobile
  initMobileMenu();

  // 3. Système de Filtrage des Projets
  initProjectFilters();

  // 4. Modal Détails de Projet
  initProjectModal();

  // 5. Navigation Active & Scroll Doux
  initActiveNavigation();

  // 6. Gestion du Bouton Retour en Haut
  initBackToTop();

  // 7. Animations d'apparition au scroll (Intersection Observer)
  initScrollReveal();

  // 8. Gestion du Formulaire Formspree (AJAX)
  initContactForm();

  // 9. Copie Rapide de l'Email avec Toast
  initCopyEmail();
});

/**
 * Gestion du menu responsive
 */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-close-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const backdrop = document.getElementById('mobile-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.remove('translate-x-full');
    backdrop?.classList.remove('opacity-0', 'pointer-events-none');
    document.body.classList.add('overflow-hidden');
  }

  function closeMenu() {
    mobileMenu.classList.add('translate-x-full');
    backdrop?.classList.add('opacity-0', 'pointer-events-none');
    document.body.classList.remove('overflow-hidden');
  }

  menuBtn.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  backdrop?.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/**
 * Filtrage des réalisations/projets
 */
function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterButtons.length || !projectCards.length) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Retirer l'état actif de tous les boutons
      filterButtons.forEach(btn => {
        btn.classList.remove('bg-blue-600', 'text-white', 'shadow-lg', 'shadow-blue-500/20');
        btn.classList.add('bg-slate-800/80', 'text-slate-400', 'hover:text-white', 'hover:bg-slate-800');
      });

      // Appliquer l'état actif au bouton cliqué
      button.classList.add('bg-blue-600', 'text-white', 'shadow-lg', 'shadow-blue-500/20');
      button.classList.remove('bg-slate-800/80', 'text-slate-400', 'hover:text-white', 'hover:bg-slate-800');

      const filterValue = button.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category')?.split(' ') || [];
        
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.classList.remove('is-hidden');
          // Animation douce
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.classList.add('is-hidden');
          }, 250);
        }
      });
    });
  });
}

/**
 * Modal de détails de projet
 */
/**
 * Modal de détails de projet - Projets réels d'Hermann SIYA
 */
const projectDetailsData = {
  proj_budget: {
    title: "SIGEPEC-Budget — ERP Budgétaire & Comptabilité des CTD",
    subtitle: "Progiciel complet de gestion budgétaire, comptable et patrimoniale conforme aux instructions MINFI-MINDDEVEL",
    category: "Finances & Collectivités (CTD) • ERP",
    description: `Solution intégrée d'envergure conçue pour digitaliser l'ensemble de la chaîne financière des Collectivités Territoriales Décentralisées (Mairies) :
      <ul>
        <li class="mb-2"><strong>Cadrage & Prévisions Budgétaires :</strong> Élaboration du Cadre Budgétaire à Moyen Terme (CBMT), du Cadre de Dépenses à Moyen Terme (CDMT), des Projets de Performance Annuels (PPA) et des Rapports Annuels de Performance (RAP).</li>
        <li class="mb-2"><strong>Cycle d'Exécution Budgétaire :</strong> Gestion rigoureuse des engagements, liquidations, ordonnancements, mandatements et suivi des restes à recouvrer / restes à payer (RAR/RAP).</li>
        <li class="mb-2"><strong>Comptabilité & Matières :</strong> Plan comptable sectoriel, inventaire physique du patrimoine, calcul automatique des amortissements (linéaires/dégressifs) et suivi de la dette communale.</li>
        <li class="mb-2"><strong>Sécurité & Multi-Tenants :</strong> Gestion Électronique des Documents (GED), isolation par collectivité, contrôle d'accès RBAC et sauvegardes automatisées planifiées.</li>
      </ul>`,
    techs: ["Python 3.12", "Django 5", "PostgreSQL", "Docker Compose", "Celery", "Electron Desktop", "ReportLab", "Bootstrap 5"],
    githubUrl: "source-privee.html?proj=budget-ctd",
    demoUrl: "demo-acces.html?proj=budget-ctd"
  },
  proj_grh: {
    title: "SIGEPEC-RH & Paie — Système Intégré de GRH & Paie CTD",
    subtitle: "Gestion des carrières, paie institutionnelle, avancements automatiques et pointage mobile biométrique",
    category: "Finances & Collectivités (CTD) • RH & Paie",
    description: `ERP spécialisé pour l'administration communale et les organisations publiques :
      <ul>
        <li class="mb-2"><strong>Tableau Synoptique d'Avancement :</strong> Calcul et projection automatisés des avancements d'échelons et de grades (échelle 1 à 12) tous les 2 ans avec règles de promotion.</li>
        <li class="mb-2"><strong>Moteur de Paie Complet :</strong> Traitement des éléments fixes et variables, cotisations sociales CNPS, retenues fiscales IRPP, CAC, rappels rétroactifs et génération du fichier magnétique officiel DIPE.</li>
        <li class="mb-2"><strong>Congés & Absences :</strong> Calcul des droits selon le Code du Travail camerounais, plannings prévisionnels, gestion des arrêts et reprises de service avec pièces jointes.</li>
        <li class="mb-2"><strong>Pointage Mobile & Structure :</strong> Application Android dédiée pour le pointage biométrique des agents et organigramme hiérarchique dynamique.</li>
      </ul>`,
    techs: ["Python", "Django", "PostgreSQL", "Android Mobile", "Docker", "ReportLab", "Exports Excel", "Electron"],
    githubUrl: "source-privee.html?proj=grh-ctd",
    demoUrl: "demo-acces.html?proj=grh-ctd"
  },
  proj_rentpay: {
    title: "RentPay — Solution Unifiée de Gestion & Suivi des Loyers",
    subtitle: "Marketplace immobilière géolocalisée et plateforme de gestion locative avec paiement Mobile Money",
    category: "Mobile (Flutter) • Fintech & Immobilier",
    description: `Écosystème unifié comprenant une API REST centrale et deux applications mobiles Flutter indépendantes :
      <ul>
        <li class="mb-2"><strong>App Mobile Bailleur :</strong> Gestion du patrimoine immobilier, publication multi-images, suivi des baux, relances automatiques et tableau de bord des encaissements.</li>
        <li class="mb-2"><strong>App Mobile Locataire :</strong> Recherche géolocalisée sur les 10 régions du Cameroun, filtres par budget/commune, demande de location en 1 clic et profil KYC avec CNI.</li>
        <li class="mb-2"><strong>Paiement Mobile Money :</strong> Intégration de la passerelle CinetPay (MTN MoMo, Orange Money, Wave) avec webhooks IPN et émission automatique de quittance PDF certifiée.</li>
        <li class="mb-2"><strong>Architecture Moderne :</strong> State management avec Riverpod 2.6, navigation GoRouter et backend unifié Django REST Framework.</li>
      </ul>`,
    techs: ["Flutter 3.5+", "Dart", "Riverpod", "Django REST Framework 5.1", "PostgreSQL Neon", "CinetPay (MoMo/Orange)", "GoRouter"],
    githubUrl: "source-privee.html?proj=rentpay",
    demoUrl: "demo-acces.html?proj=rentpay"
  },
  proj_tontine: {
    title: "Tontine & Mutuelle Pro — Fintech Android Associative",
    subtitle: "Application Android native de gestion financière, épargne, crédits et tontines rotatives",
    category: "Mobile (Android Kotlin) • Fintech Associative",
    description: `Application Android native de référence pour les mutuelles de solidarité et tontines communautaires :
      <ul>
        <li class="mb-2"><strong>Multi-Associations & Isolation :</strong> Gestion simultanée de plusieurs associations avec isolation complète des données (Room SQLite et Cloud Firestore).</li>
        <li class="mb-2"><strong>Matrice Stricte de Gouvernance :</strong> Séparation des pouvoirs (Président, SG, Trésorier, Censeur) avec verrouillages croisés de séance (<code>isGeneralLocked</code>, <code>isFinanceValidated</code>).</li>
        <li class="mb-2"><strong>Épargne & Calcul Prorata Temporis :</strong> Moteur de répartition équitable des intérêts générés par les prêts aux épargnants au prorata temporis du capital épargné.</li>
        <li class="mb-2"><strong>Grand Livre Matriciel & Prêts :</strong> Saisie rapide en séance, suivi des remboursements d'échéances et tirage automatique des cagnottes rotatives.</li>
      </ul>`,
    techs: ["Kotlin 2.0", "Jetpack Compose", "Material 3", "Room SQLite", "Firebase Auth", "Cloud Firestore", "MVVM Clean Arch"],
    githubUrl: "source-privee.html?proj=gestion-tontine",
    demoUrl: "demo-acces.html?proj=gestion-tontine"
  },
  proj_doc_orchestrator: {
    title: "AI Doc Orchestrator V2 — Orchestration Multi-Agents IA",
    subtitle: "Plateforme distribuée de traitement documentaire et de délégation de tâches par agents IA spécialisés",
    category: "Web & Systèmes IA • Systèmes Distribués",
    description: `Architecture distribuée haute performance pour l'automatisation et le traitement documentaire intelligent :
      <ul>
        <li class="mb-2"><strong>Système Multi-Agents IA :</strong> Agent coordinateur principal avec délégation automatique vers des sous-agents spécialisés via scoring de compétences.</li>
        <li class="mb-2"><strong>File de Tâches Distribuée :</strong> Moteur asynchrone Celery + Redis avec contrôle complet (création, annulation, reprise et timeouts configurables).</li>
        <li class="mb-2"><strong>Live Updates WebSockets :</strong> Diffusion temps réel des flux d'activité sans polling HTTP via Django Channels et tableau de bord Next.js interactif.</li>
        <li class="mb-2"><strong>Sécurité & Audit :</strong> Traçabilité complète des actions, authentification par tokens et gestion des rôles (Manager, Operator, Viewer).</li>
      </ul>`,
    techs: ["Next.js (React)", "Django REST Framework", "Celery", "Redis", "Django Channels (WebSockets)", "PostgreSQL", "Docker Compose"],
    githubUrl: "source-privee.html?proj=doc-orchestrator",
    demoUrl: "demo-acces.html?proj=doc-orchestrator"
  },
  proj_nomenclator: {
    title: "Nomenclator CTD — Intelligence Sémantique & Budgétaire",
    subtitle: "Moteur de rapprochement et d'harmonisation comptable pour les finances publiques locales",
    category: "Finances & Collectivités (CTD) • Intelligence Sémantique",
    description: `Outil d'aide à la décision financière et d'harmonisation de nomenclatures pour les communes :
      <ul>
        <li class="mb-2"><strong>Rapprochement Sémantique Flou :</strong> Moteur basé sur RapidFuzz et regex sémantique pour retrouver instantanément la correspondance exacte d'un libellé budgétaire.</li>
        <li class="mb-2"><strong>Harmonisation Tripartite :</strong> Conversion transparente entre l'Ancien Plan Comptable, le Nouveau Plan Comptable et la Nomenclature Fonctionnelle des CTD.</li>
        <li class="mb-2"><strong>Heuristiques de Destination :</strong> Détection automatique du secteur d'affectation (Enseignement, Santé, Voirie, Environnement, Eau/Énergie) pour éviter toute erreur d'imputation.</li>
        <li class="mb-2"><strong>Gain de Productivité :</strong> Réduction drastique du temps d'élaboration budgétaire et de confection du compte de gestion.</li>
      </ul>`,
    techs: ["Python 3.12", "Streamlit", "RapidFuzz", "Pandas", "Regex Sémantique", "Excel Engine"],
    githubUrl: "source-privee.html?proj=nomenclator-ctd",
    demoUrl: "demo-acces.html?proj=nomenclator-ctd"
  },
  proj_sauvegarde: {
    title: "MonPlanificateurSauvegarde — Supervision & Sauvegarde Auto",
    subtitle: "Application Desktop de planification, d'exécution et de restauration de bases de données",
    category: "Desktop & Outils Métiers • DevOps",
    description: `Solution Desktop autonome garantissant la pérennité et la sécurité des données applicatives d'entreprise :
      <ul>
        <li class="mb-2"><strong>Planification Automatisée :</strong> Gestion des fréquences de sauvegarde et synchronisation avec le Planificateur de Tâches Windows et scripts PowerShell.</li>
        <li class="mb-2"><strong>Supervision & Alertes :</strong> Tableau de bord de suivi de l'état des archives, contrôle de la taille des sauvegardes et journalisation des logs.</li>
        <li class="mb-2"><strong>Restauration Assistée :</strong> Procédure sécurisée en 1 clic pour restaurer des bases de données SQLite ou PostgreSQL avec vérification d'intégrité.</li>
      </ul>`,
    techs: ["Electron", "Python / Django", "SQLite", "PowerShell", "Batch Scripts", "Node.js"],
    githubUrl: "source-privee.html?proj=planificateur-sauvegarde",
    demoUrl: "demo-acces.html?proj=planificateur-sauvegarde"
  },
  proj_license: {
    title: "RSA License Key Generator — Cryptographie & Protection",
    subtitle: "Suite Desktop de génération de licences asymétriques RSA avec verrouillage matériel (HWID)",
    category: "Desktop & Outils Métiers • Sécurité Logicielle",
    description: `Générateur cryptographique de licences logicielles pour la distribution sécurisée d'applications propriétaires :
      <ul>
        <li class="mb-2"><strong>Cryptographie Asymétrique RSA :</strong> Génération de paires de clés RSA 2048/4096-bit (PEM) pour la signature numérique infalsifiable des licences.</li>
        <li class="mb-2"><strong>Verrouillage Matériel (HWID) :</strong> Empreinte matérielle unique liant chaque licence au poste de travail client autorisé.</li>
        <li class="mb-2"><strong>Contrôle des Modules & Expirations :</strong> Gestion des fonctionnalités activables à la carte, limitation de durée et gestion des révocations.</li>
      </ul>`,
    techs: ["Electron", "Python Flask", "RSA Cryptography", "PyInstaller", "Tailwind CSS", "Batch Scripts"],
    githubUrl: "source-privee.html?proj=license-generator",
    demoUrl: "demo-acces.html?proj=license-generator"
  },
  proj_cantiques: {
    title: "DIMIS TI MI GUIZIGA — Application des Cantiques en Guiziga",
    subtitle: "Recueil numérique et application Android de 285 cantiques et prières en langue Guiziga",
    category: "Mobile (Android / PWA) • Culture & Langues",
    description: `Projet patrimonial et technologique pour la préservation et la diffusion des cantiques en langue Guiziga :
      <ul>
        <li class="mb-2"><strong>285 Cantiques & Prières :</strong> Intégration complète avec respect strict des caractères diacritiques (<code>ɓ</code>, <code>ɗ</code>, <code>ŋ</code>, <code>Ɓ</code>, <code>Ɗ</code>).</li>
        <li class="mb-2"><strong>Mise en Forme Liturgique :</strong> Refrains dorés mis en valeur, index alphabétique et thématique, et mode 100% hors-ligne.</li>
        <li class="mb-2"><strong>Compilation Automatisée en 1 Clic :</strong> Pipeline de conversion USFM vers JSON et compilation automatique du bundle Play Store (.aab / .apk).</li>
      </ul>`,
    techs: ["Android Natif (Gradle)", "PWA HTML5/CSS3/JS", "USFM Parser", "JSON Engine", "Batch Scripts", "Google Play Store AAB"],
    githubUrl: "source-privee.html?proj=cantiques-guiziga",
    demoUrl: "demo-acces.html?proj=cantiques-guiziga"
  }
};

function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalCategory = document.getElementById('modal-category');
  const modalDescription = document.getElementById('modal-description');
  const modalTechList = document.getElementById('modal-tech-list');
  const modalGithub = document.getElementById('modal-github');
  const modalDemo = document.getElementById('modal-demo');
  const closeBtn = document.getElementById('modal-close-btn');
  const modalBackdrop = document.getElementById('modal-backdrop');

  if (!modal) return;

  function openModal(projectId) {
    const data = projectDetailsData[projectId];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalSubtitle.textContent = data.subtitle;
    modalCategory.textContent = data.category;
    modalDescription.innerHTML = data.description;

    // Remplir les technologies
    modalTechList.innerHTML = data.techs
      .map(t => `<span class="px-2.5 py-1 text-xs font-mono font-medium rounded-md bg-blue-950/60 text-blue-300 border border-blue-800/40">${t}</span>`)
      .join('');

    modalGithub.setAttribute('href', data.githubUrl);
    modalDemo.setAttribute('href', data.demoUrl);

    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function closeModal() {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  document.querySelectorAll('.open-project-modal').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = button.getAttribute('data-project-id');
      openModal(projId);
    });
  });

  closeBtn?.addEventListener('click', closeModal);
  modalBackdrop?.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

/**
 * Mise en évidence du lien de menu lors du défilement
 */
function initActiveNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('text-blue-400', 'border-blue-400');
            link.classList.remove('text-slate-300', 'border-transparent');
          } else {
            link.classList.remove('text-blue-400', 'border-blue-400');
            link.classList.add('text-slate-300', 'border-transparent');
          }
        });
      }
    });
  });
}

/**
 * Bouton Retour en haut
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
      backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
      backToTopBtn.classList.add('opacity-100', 'translate-y-0');
    } else {
      backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Scroll Reveal via Intersection Observer
 */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/**
 * Formulaire de contact Formspree avec retour interactif
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('form-submit-btn');
  const statusMsg = document.getElementById('form-status-msg');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      Envoi en cours...
    `;

    const formData = new FormData(form);
    const formAction = form.getAttribute('action');

    try {
      // Si l'URL contient encore le placeholder, afficher un message d'information pour le test
      if (formAction.includes('YOUR_FORM_ID')) {
        setTimeout(() => {
          showStatus('Message simulé avec succès ! (Pensez à remplacer YOUR_FORM_ID par votre identifiant Formspree).', 'success');
          form.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
          if (window.lucide) window.lucide.createIcons();
        }, 1000);
        return;
      }

      const response = await fetch(formAction, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        showStatus('Votre message a été envoyé avec succès ! Je vous répondrai dans les plus brefs délais.', 'success');
        form.reset();
      } else {
        const errorData = await response.json();
        const msg = errorData.errors ? errorData.errors.map(err => err.message).join(', ') : "Une erreur est survenue lors de l'envoi.";
        showStatus(msg, 'error');
      }
    } catch (err) {
      showStatus("Impossible d'envoyer le message. Vérifiez votre connexion Internet.", 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      if (window.lucide) window.lucide.createIcons();
    }
  });

  function showStatus(text, type) {
    if (!statusMsg) return;
    statusMsg.classList.remove('hidden', 'text-emerald-400', 'text-rose-400', 'bg-emerald-950/40', 'bg-rose-950/40', 'border-emerald-800/50', 'border-rose-800/50');
    
    if (type === 'success') {
      statusMsg.classList.add('text-emerald-400', 'bg-emerald-950/40', 'border-emerald-800/50');
      statusMsg.innerHTML = `<i data-lucide="check-circle" class="w-4 h-4 mr-2 inline"></i> ${text}`;
    } else {
      statusMsg.classList.add('text-rose-400', 'bg-rose-950/40', 'border-rose-800/50');
      statusMsg.innerHTML = `<i data-lucide="alert-circle" class="w-4 h-4 mr-2 inline"></i> ${text}`;
    }

    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      statusMsg.classList.add('hidden');
    }, 8000);
  }
}

/**
 * Copier l'adresse email dans le presse-papier
 */
function initCopyEmail() {
  const copyBtns = document.querySelectorAll('.copy-email-btn');
  const toast = document.getElementById('toast-notification');

  if (!copyBtns.length) return;

  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || "hermannsiya@gmail.com";
      
      navigator.clipboard.writeText(email).then(() => {
        showToast("Adresse e-mail copiée dans le presse-papier !");
      }).catch(() => {
        showToast("Échec de la copie.");
      });
    });
  });

  function showToast(message) {
    if (!toast) return;
    const toastText = document.getElementById('toast-text');
    if (toastText) toastText.textContent = message;

    toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
    toast.classList.add('opacity-100', 'translate-y-0');

    setTimeout(() => {
      toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      toast.classList.remove('opacity-100', 'translate-y-0');
    }, 3500);
  }
}
