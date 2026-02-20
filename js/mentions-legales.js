/* ==========================================
   PAGE MENTIONS LÉGALES - JAVASCRIPT
   Navigation sticky et animations
========================================== */

'use strict';

document.addEventListener('DOMContentLoaded', function () {
    console.log('⚖️ Page Mentions Légales - Initialisation...');

    // Initialiser tous les modules
    initStickyNav();
    initSmoothScroll();
    initScrollSpy();
    initUpdateDate();

    console.log('✅ Page Mentions Légales - Chargée avec succès');
});

// ==========================================
// NAVIGATION STICKY ACTIVE
// ==========================================

function initStickyNav() {
    const navLinks = document.querySelectorAll('.legal-nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Retirer active de tous
            navLinks.forEach(l => l.classList.remove('active'));
            // Ajouter active au lien cliqué
            this.classList.add('active');
        });
    });
}

// ==========================================
// SMOOTH SCROLL VERS SECTIONS
// ==========================================

function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.legal-nav a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('.main-header')?.offsetHeight || 0;
                const offset = 20;
                const targetPosition = targetSection.offsetTop - headerHeight - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================
// SCROLL SPY (active section au scroll)
// ==========================================

function initScrollSpy() {
    const sections = document.querySelectorAll('.legal-block[id]');
    const navLinks = document.querySelectorAll('.legal-nav a');

    if (sections.length === 0) return;

    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-100px 0px -60% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');

                // Retirer active de tous
                navLinks.forEach(link => link.classList.remove('active'));

                // Ajouter active au lien correspondant
                const activeLink = document.querySelector(`.legal-nav a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

// ==========================================
// MISE À JOUR DATE AUTOMATIQUE
// ==========================================

function initUpdateDate() {
    const dateElement = document.getElementById('updateDate');
    if (dateElement) {
        const today = new Date();
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        const formattedDate = today.toLocaleDateString('fr-FR', options);
        dateElement.textContent = formattedDate;
    }
}

// ==========================================
// ANIMATIONS AU SCROLL
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animer les blocs légaux
document.querySelectorAll('.legal-block').forEach((block, index) => {
    block.style.opacity = '0';
    block.style.transform = 'translateY(30px)';
    block.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(block);
});

// ==========================================
// ACCESSIBILITÉ
// ==========================================

const focusableElements = document.querySelectorAll(`
    a,
    button,
    [tabindex]:not([tabindex="-1"])
`);

focusableElements.forEach(element => {
    element.addEventListener('focus', function () {
        this.style.outline = '3px solid var(--color-orange)';
        this.style.outlineOffset = '4px';
    });

    element.addEventListener('blur', function () {
        this.style.outline = '';
        this.style.outlineOffset = '';
    });
});

// ==========================================
// COPIER EMAIL AU CLIC
// ==========================================

const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

emailLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        const email = this.getAttribute('href').replace('mailto:', '');

        // Tentative de copie dans le presse-papiers
        if (navigator.clipboard) {
            navigator.clipboard.writeText(email).then(() => {
                showNotification('Email copié dans le presse-papiers !');
            }).catch(() => {
                // Si échec, laisser le comportement normal
            });
        }
    });
});

// ==========================================
// NOTIFICATION TEMPORAIRE
// ==========================================

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: var(--color-orange);
        color: white;
        padding: 15px 25px;
        border-radius: 50px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInUp 0.3s ease;
        font-weight: 600;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutDown 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Animations pour notification
if (!document.getElementById('notification-animations')) {
    const style = document.createElement('style');
    style.id = 'notification-animations';
    style.textContent = `
        @keyframes slideInUp {
            from {
                transform: translateY(100px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        @keyframes slideOutDown {
            from {
                transform: translateY(0);
                opacity: 1;
            }
            to {
                transform: translateY(100px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ==========================================
// PRINT STYLING
// ==========================================

// Ajouter un bouton d'impression (optionnel)
const legalFooter = document.querySelector('.legal-footer');
if (legalFooter) {
    const printBtn = document.createElement('button');
    printBtn.innerHTML = '<i class="fas fa-print"></i> Imprimer cette page';
    printBtn.className = 'btn-contact';
    printBtn.style.marginTop = '20px';
    printBtn.onclick = () => window.print();
    // legalFooter.appendChild(printBtn); // Décommenter si souhaité
}

// ==========================================
// ERROR HANDLING
// ==========================================

window.addEventListener('error', (e) => {
    console.error('❌ Erreur JavaScript:', e.message);
}, true);

// ==========================================
// LOGS DE DEBUG
// ==========================================

console.log('📊 Statistiques Mentions Légales:');
console.log('  - Sections:', document.querySelectorAll('.legal-block').length);
console.log('  - Liens navigation:', document.querySelectorAll('.legal-nav a').length);