// Dictionnaire des noms de projets réels
    const projectNames = {
      'budget-ctd': 'SIELABUC — Système d\'Élaboration & Gestion Budgétaire des CTD (Python / Django / PostgreSQL)',
      'grh-ctd': 'SIGEPEC — Système Intégré de Gestion du Personnel Communal & Paie (Django / Android)',
      'rentpay': 'RentPay — Marketplace & Suivi des Loyers Immobiliers (Flutter / Django REST / CinetPay)',
      'gestion-tontine': 'Tontine & Mutuelle Pro — Fintech Android Associative (Kotlin 2.0 / Compose / Room)',
      'doc-orchestrator': 'AI Doc Orchestrator V2 — Plateforme Multi-Agents IA Distribuée (Next.js / Celery)',
      'nomenclator-ctd': 'Nomenclator CTD — Rapprochement Sémantique & Budgétaire CTD (Python / RapidFuzz)',
      'planificateur-sauvegarde': 'MonPlanificateurSauvegarde — Supervision & Sauvegarde Automatique (Electron / Python)',
      'license-generator': 'RSA License Key Generator — Cryptographie & Protection Logicielle (Electron / Flask / RSA)',
      'cantiques-guiziga': 'DIMIS TI MI GUIZIGA — Recueil & Application Android des Cantiques en Guiziga (Android / PWA)',
      'loyerpro': 'LoyerPro — Application PWA de Gestion Locative & Suivi Multi-Bailleurs (PWA / Vanilla JS / Firestore)',
      'ndjam': 'Ndjam (Market Shield) — Plateforme SaaS & Bouclier Fiscal pour Commerçants (PWA / Android TWA / Firestore)',
      'helper-ctd': 'CTD HelpCenter — Centre d\'Assistance & Documentation Communale (Python / Django / PostgreSQL)',
      'sur-mesure': 'Conception & Ingénierie Logicielle Sur-Mesure'
    };

    // Récupérer le paramètre 'proj' de l'URL
    const params = new URLSearchParams(window.location.search);
    const projKey = params.get('proj');
    const projectTitleEl = document.getElementById('project-title');

    if (projKey && Object.hasOwn(projectNames, projKey)) {
      projectTitleEl.textContent = projectNames[projKey];
    } else if (params.get('name')) {
      projectTitleEl.textContent = params.get('name').slice(0, 200);
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
