/* ==========================================
   INSTALLATION VILLAS - JAVASCRIPT
========================================== */

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function () {

    // ========================================
    // FAQ - Accordion
    // ========================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Toggle l'état actif
            const isActive = item.classList.contains('active');

            // Fermer tous les autres items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle l'item cliqué
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });

    // ========================================
    // Animations au scroll
    // ========================================
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

    // Observer les cartes de services
    const serviceCards = document.querySelectorAll('.service-detail-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
        observer.observe(card);
    });

    // Observer les étapes du processus
    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        step.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(step);
    });

    // Observer les cartes de garanties
    const guaranteeCards = document.querySelectorAll('.guarantee-card');
    guaranteeCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observer les items FAQ
    const faqItemsAnim = document.querySelectorAll('.faq-item');
    faqItemsAnim.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s`;
        observer.observe(item);
    });

    // ========================================
    // Smooth scroll pour les liens internes
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========================================
    // Animation du hero au chargement
    // ========================================
    const heroContent = document.querySelector('.page-hero .container');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';

        setTimeout(() => {
            heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }

    // ========================================
    // Gestion du scroll pour le header
    // ========================================
    let lastScroll = 0;
    const header = document.querySelector('header');

    if (header) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });
    }

    // ========================================
    // Effet parallaxe léger sur le hero
    // ========================================
    const heroSection = document.querySelector('.page-hero');
    const heroImage = document.querySelector('.hero-bg');

    if (heroSection && heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroHeight = heroSection.offsetHeight;

            if (scrolled < heroHeight) {
                const parallaxSpeed = 0.5;
                heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }

    // ========================================
    // Animation des icônes de garanties
    // ========================================
    const guaranteeIcons = document.querySelectorAll('.guarantee-icon');
    guaranteeIcons.forEach(icon => {
        const card = icon.closest('.guarantee-card');

        card.addEventListener('mouseenter', function () {
            icon.style.transform = 'scale(1.2) rotate(5deg)';
            icon.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', function () {
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // ========================================
    // Suivi des clics sur les boutons CTA
    // ========================================
    const ctaButtons = document.querySelectorAll('.btn-cta-primary, .btn-cta-secondary, .btn-card');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Ajoutez ici votre code de tracking analytics si nécessaire
            console.log('CTA cliqué:', this.textContent);
        });
    });

    // ========================================
    // Gestion des images
    // ========================================
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function () {
            this.classList.add('loaded');
        });

        img.addEventListener('error', function () {
            console.warn('Erreur de chargement de l\'image:', this.src);
            // Vous pouvez ajouter une image de fallback ici
        });
    });

    // ========================================
    // Animation des badges au survol des cartes
    // ========================================
    serviceCards.forEach(card => {
        const badge = card.querySelector('.card-badge');
        if (badge) {
            card.addEventListener('mouseenter', function () {
                badge.style.transform = 'scale(1.1)';
                badge.style.transition = 'transform 0.3s ease';
            });

            card.addEventListener('mouseleave', function () {
                badge.style.transform = 'scale(1)';
            });
        }
    });

    // ========================================
    // Ajout d'une classe au body quand tout est chargé
    // ========================================
    window.addEventListener('load', function () {
        document.body.classList.add('page-loaded');
        console.log('✓ Page Installation Villas chargée avec succès');
    });

    // ========================================
    // Détection du scroll pour animations
    // ========================================
    let isScrolling;
    window.addEventListener('scroll', function () {
        window.clearTimeout(isScrolling);

        isScrolling = setTimeout(function () {
            // Le scroll s'est arrêté
            console.log('Scroll terminé');
        }, 66);
    });

    // ========================================
    // Console log pour debug
    // ========================================
    console.log('=================================');
    console.log('Installation Villas - Initialisée');
    console.log('=================================');
    console.log('FAQ items:', faqItems.length);
    console.log('Service cards:', serviceCards.length);
    console.log('Process steps:', processSteps.length);
    console.log('Guarantee cards:', guaranteeCards.length);
    console.log('=================================');

});

// ========================================
// Fonction utilitaire pour vérifier si un élément est visible
// ========================================
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ========================================
// Gestion du redimensionnement de la fenêtre
// ========================================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        console.log('Fenêtre redimensionnée');
        // Ajoutez ici du code pour gérer le responsive si nécessaire
    }, 250);
});

// ========================================
// Export des fonctions pour utilisation externe (si nécessaire)
// ========================================
window.installationVillasPage = {
    isElementInViewport: isElementInViewport
};