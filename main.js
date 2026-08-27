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
const projectDetailsData = {
  proj1: {
    title: "Application de Gestion Municipale & RH",
    subtitle: "Système complet de gestion budgétaire, personnel communal et services citoyens",
    category: "Web / Desktop • Outils Métiers",
    description: `Cette solution sur mesure répond aux contraintes strictes des administrations locales :
      <ul>
        <li class="mb-2"><strong>Gestion Budgétaire :</strong> Suivi des engagements, ordonnancements et mandatements selon la nomenclature financière.</li>
        <li class="mb-2"><strong>Gestion des RH :</strong> Registre des agents, plannings de service, gestion des congés et états de paie.</li>
        <li class="mb-2"><strong>Sécurité & Traçabilité :</strong> Contrôle d'accès par rôle (RBAC), journalisation complète des écritures et intégrité PostgreSQL.</li>
      </ul>`,
    techs: ["Python", "Django", "PostgreSQL", "Tailwind CSS", "Docker", "Celery"],
    githubUrl: "source-privee.html?proj=gestion-municipale",
    demoUrl: "demo-acces.html?proj=gestion-municipale"
  },
  proj2: {
    title: "SmartBudget Mobile - Trésorerie Personnelle & PME",
    subtitle: "Application mobile intuitive de suivi de dépenses, flux de trésorerie et prévisions",
    category: "Mobile",
    description: `Conçue avec Flutter pour offrir une fluidité native sur iOS et Android :
      <ul>
        <li class="mb-2"><strong>Tableaux de bord dynamiques :</strong> Visualisation des postes de dépenses en temps réel via des graphiques interactifs.</li>
        <li class="mb-2"><strong>Mode Hors-ligne :</strong> Synchronisation locale SQLite ultra-rapide avec sauvegarde chiffrée.</li>
        <li class="mb-2"><strong>Publication :</strong> Déploiement automatisé et validation sur Google Play Console.</li>
      </ul>`,
    techs: ["Flutter", "Dart", "SQLite", "Provider", "Charts Flutter", "Google Play Console"],
    githubUrl: "source-privee.html?proj=smartbudget-flutter",
    demoUrl: "demo-acces.html?proj=smartbudget-flutter"
  },
  proj3: {
    title: "AutoReport Engine & Générateur PDF",
    subtitle: "Microservice d'automatisation des rapports financiers et administratifs certifiés",
    category: "Outils Métiers",
    description: `Génération instantanée de documents légaux et financiers complexes :
      <ul>
        <li class="mb-2"><strong>Génération Haute Performance :</strong> Utilisation de ReportLab pour compiler des bilans financiers de plusieurs centaines de pages en quelques secondes.</li>
        <li class="mb-2"><strong>Intégration API :</strong> Microservice REST consommable par n'importe quelle application tierce.</li>
        <li class="mb-2"><strong>Conformité :</strong> Modèles de rapports conformes aux normes comptables en vigueur.</li>
      </ul>`,
    techs: ["Python", "ReportLab", "Django REST Framework", "Redis", "Celery"],
    githubUrl: "source-privee.html?proj=autoreport-engine",
    demoUrl: "demo-acces.html?proj=autoreport-engine"
  },
  proj4: {
    title: "Suite Audit & Trésorerie Pro",
    subtitle: "Application Desktop sécurisée pour analystes financiers et gestionnaires de fonds",
    category: "Web / Desktop • Outils Métiers",
    description: `Logiciel desktop multiplateforme alliant rapidité de calcul et ergonomie :
      <ul>
        <li class="mb-2"><strong>Calculs Avancés :</strong> Rapprochement bancaire automatisé, détection d'anomalies et ratios de liquidité.</li>
        <li class="mb-2"><strong>Architecture Hybride :</strong> Interface Web moderne encapsulée dans Electron avec moteur de calcul Python/SQLite en local.</li>
      </ul>`,
    techs: ["Electron", "Python", "SQLite", "Tailwind CSS", "Chart.js"],
    githubUrl: "source-privee.html?proj=audit-tresorerie-pro",
    demoUrl: "demo-acces.html?proj=audit-tresorerie-pro"
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
