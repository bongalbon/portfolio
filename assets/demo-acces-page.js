// Dictionnaire des noms d'applications réelles
    const projectNames = {
      'budget-ctd': 'SIELABUC — Système d\'Élaboration & Gestion Budgétaire des CTD (Instruction MINFI-MINDDEVEL)',
      'grh-ctd': 'SIGEPEC — Système Intégré de Gestion du Personnel Communal & Paie',
      'rentpay': 'RentPay — Marketplace & Gestion Locative Immobilière (Flutter / MoMo)',
      'gestion-tontine': 'Tontine & Mutuelle Pro — Fintech Android Associative & Épargne',
      'doc-orchestrator': 'AI Doc Orchestrator V2 — Plateforme Multi-Agents IA Distribuée',
      'nomenclator-ctd': 'Nomenclator CTD — Intelligence Sémantique & Budgétaire CTD',
      'planificateur-sauvegarde': 'MonPlanificateurSauvegarde — Supervision & Sauvegarde Automatique',
      'license-generator': 'RSA License Key Generator — Cryptographie & Protection Logicielle',
      'cantiques-guiziga': 'DIMIS TI MI GUIZIGA — Application Android des Cantiques en Guiziga',
      'loyerpro': 'LoyerPro — Application PWA de Gestion Locative & Suivi Multi-Bailleurs',
      'ndjam': 'Ndjam (Market Shield) — Plateforme SaaS & Bouclier Fiscal pour Commerçants',
      'helper-ctd': 'CTD HelpCenter — Centre d\'Assistance & Documentation des Progiciels CTD',
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
