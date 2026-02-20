/* ==========================================
   À PROPOS - JAVASCRIPT
========================================== */

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function () {

    // ========================================
    // Animation des compteurs
    // ========================================
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 secondes
        const step = target / (duration / 16); // 60 FPS
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    }

    // Observer pour déclencher l'animation au scroll
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(number => {
                    if (!number.classList.contains('animated')) {
                        number.classList.add('animated');
                        animateCounter(number);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

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

    // Observer les cartes de stats
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observer les cartes d'engagements
    const commitmentCards = document.querySelectorAll('.commitment-card');
    commitmentCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observer les cartes de certifications
    const certificationCards = document.querySelectorAll('.certification-card');
    certificationCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observer les items de localisation
    const locationItems = document.querySelectorAll('.location-item');
    locationItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `opacity 0.5s ease ${index * 0.15}s, transform 0.5s ease ${index * 0.15}s`;
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
    // Animation des icônes
    // ========================================
    const commitmentIcons = document.querySelectorAll('.commitment-icon');
    commitmentIcons.forEach(icon => {
        const card = icon.closest('.commitment-card');

        card.addEventListener('mouseenter', function () {
            icon.style.transform = 'scale(1.2) rotate(5deg)';
            icon.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', function () {
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    const certificationIcons = document.querySelectorAll('.certification-icon');
    certificationIcons.forEach(icon => {
        const card = icon.closest('.certification-card');

        card.addEventListener('mouseenter', function () {
            icon.style.transform = 'scale(1.15) rotate(-5deg)';
            icon.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', function () {
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // ========================================
    // Suivi des clics sur les boutons CTA
    // ========================================
    const ctaButtons = document.querySelectorAll('.btn-cta-primary, .btn-cta-secondary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function () {
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
        });
    });

    // ========================================
    // Animation des tags au chargement
    // ========================================
    const tags = document.querySelectorAll('.tag-orange, .tag-blue');
    tags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'scale(0.8)';

        setTimeout(() => {
            tag.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            tag.style.opacity = '1';
            tag.style.transform = 'scale(1)';
        }, 300 + (index * 100));
    });

    // ========================================
    // Ajout d'une classe au body quand tout est chargé
    // ========================================
    window.addEventListener('load', function () {
        document.body.classList.add('page-loaded');
        console.log('✓ Page À Propos chargée avec succès');
    });

    // ========================================
    // Animation progressive des sections
    // ========================================
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // ========================================
    // Détection du scroll pour animations
    // ========================================
    let isScrolling;
    window.addEventListener('scroll', function () {
        window.clearTimeout(isScrolling);

        isScrolling = setTimeout(function () {
            console.log('Scroll terminé');
        }, 66);
    });

    // ========================================
    // Console log pour debug
    // ========================================
    console.log('=================================');
    console.log('À Propos - Page initialisée');
    console.log('=================================');
    console.log('Stat cards:', statCards.length);
    console.log('Commitment cards:', commitmentCards.length);
    console.log('Certification cards:', certificationCards.length);
    console.log('Location items:', locationItems.length);
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
    }, 250);
});

// ========================================
// Export des fonctions pour utilisation externe
// ========================================
window.aproposPage = {
    isElementInViewport: isElementInViewport
};