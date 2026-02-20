// ==========================================
// PAGE DÉMÉNAGEMENT - FONCTIONNALITÉS
// ==========================================

document.addEventListener('DOMContentLoaded', function () {

    // Initialiser toutes les fonctionnalités
    initScrollAnimations();
    initCardAnimations();
    initProcessAnimation();
    initCTATracking();
});

// ==========================================
// ANIMATIONS AU SCROLL
// ==========================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // Pour les cartes de service, ajouter un délai progressif
                if (entry.target.classList.contains('service-detail-card')) {
                    const cards = document.querySelectorAll('.service-detail-card');
                    const index = Array.from(cards).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.2}s`;
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer tous les éléments à animer
    const elementsToAnimate = document.querySelectorAll(`
        .intro-content,
        .service-detail-card,
        .process-step,
        .guarantee-card
    `);

    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// Ajouter les styles d'animation
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.8s ease forwards;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Animation initiale invisible */
    .service-detail-card,
    .process-step,
    .guarantee-card {
        opacity: 0;
    }
`;
document.head.appendChild(style);

// ==========================================
// ANIMATIONS DES CARTES
// ==========================================

function initCardAnimations() {
    const cards = document.querySelectorAll('.service-detail-card');

    cards.forEach(card => {
        // Animation au survol de la carte
        card.addEventListener('mouseenter', function () {
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        // Ajouter un effet de brillance au hover
        card.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;

            this.style.transform = `
                translateY(-10px) 
                rotateX(${deltaY * 2}deg) 
                rotateY(${deltaX * 2}deg)
            `;
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });
}

// ==========================================
// ANIMATION DU PROCESSUS
// ==========================================

function initProcessAnimation() {
    const steps = document.querySelectorAll('.process-step');

    const processObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('step-visible');

                    // Animer le numéro
                    const stepNumber = entry.target.querySelector('.step-number');
                    if (stepNumber) {
                        stepNumber.style.animation = 'pulse 0.6s ease';
                    }
                }, index * 150);

                processObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });

    steps.forEach(step => {
        processObserver.observe(step);
    });
}

// Ajouter les styles pour l'animation du processus
const processStyle = document.createElement('style');
processStyle.textContent = `
    .process-step {
        opacity: 0;
        transform: translateX(-30px);
        transition: all 0.6s ease;
    }

    .process-step.step-visible {
        opacity: 1;
        transform: translateX(0);
    }

    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
    }
`;
document.head.appendChild(processStyle);

// ==========================================
// SUIVI DES CLICS CTA
// ==========================================

function initCTATracking() {
    const ctaButtons = document.querySelectorAll('.btn-card, .btn-cta-primary, .btn-cta-secondary');

    ctaButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            const buttonText = this.textContent.trim();
            const section = this.closest('section')?.className || 'unknown';

            console.log('CTA clicked:', {
                text: buttonText,
                section: section,
                timestamp: new Date().toISOString()
            });

            // Ici vous pouvez ajouter votre code de tracking analytics
            // Exemple: gtag('event', 'cta_click', { ... });
        });
    });
}

// ==========================================
// SMOOTH SCROLL POUR LES ANCRES
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        if (href === '#' || !href) return;

        const target = document.querySelector(href);

        if (target) {
            e.preventDefault();

            const headerHeight = document.querySelector('.main-header')?.offsetHeight || 0;
            const targetPosition = target.offsetTop - headerHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// ANIMATION DES BADGES
// ==========================================

const badges = document.querySelectorAll('.card-badge');
badges.forEach(badge => {
    badge.style.opacity = '0';
    badge.style.transform = 'translateY(-20px)';

    setTimeout(() => {
        badge.style.transition = 'all 0.6s ease';
        badge.style.opacity = '1';
        badge.style.transform = 'translateY(0)';
    }, 300);
});

// ==========================================
// COMPTEUR D'ÉTAPES DU PROCESSUS
// ==========================================

function animateProcessNumbers() {
    const stepNumbers = document.querySelectorAll('.step-number');

    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const number = entry.target;
                const targetValue = parseInt(number.textContent);
                let currentValue = 0;
                const duration = 800;
                const increment = targetValue / (duration / 16);

                const updateNumber = () => {
                    currentValue += increment;
                    if (currentValue < targetValue) {
                        number.textContent = Math.round(currentValue);
                        requestAnimationFrame(updateNumber);
                    } else {
                        number.textContent = targetValue;
                    }
                };

                updateNumber();
                numberObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stepNumbers.forEach(num => numberObserver.observe(num));
}

// Démarrer l'animation des numéros après un court délai
setTimeout(animateProcessNumbers, 500);

// ==========================================
// EFFET PARALLAXE SUR LE HERO
// ==========================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.page-hero');

    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ==========================================
// GESTION DES BOUTONS DE DEVIS
// ==========================================

const devisButtons = document.querySelectorAll('.btn-card, .btn-cta-primary');

devisButtons.forEach(button => {
    button.addEventListener('click', function (e) {
        // Ajouter un effet de chargement
        const originalText = this.innerHTML;
        this.innerHTML = '<span style="opacity: 0.7;">Chargement...</span>';

        // Restaurer après un court délai (simulé)
        setTimeout(() => {
            this.innerHTML = originalText;
        }, 300);
    });
});

// ==========================================
// ACCESSIBILITÉ - FOCUS KEYBOARD
// ==========================================

// Améliorer la navigation au clavier
const focusableElements = document.querySelectorAll(`
    .btn-card,
    .btn-cta-primary,
    .btn-cta-secondary,
    .service-detail-card
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
// LAZY LOADING AMÉLIORÉ POUR LES IMAGES
// ==========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';

                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }

                img.onload = () => {
                    img.style.opacity = '1';
                };

                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('.card-img img').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==========================================
// LOG DE DEBUG (à retirer en production)
// ==========================================

console.log('✅ Page Déménagement initialisée');
console.log('📊 Nombre de cartes de service:', document.querySelectorAll('.service-detail-card').length);
console.log('🔄 Nombre d\'étapes processus:', document.querySelectorAll('.process-step').length);
console.log('🛡️ Nombre de garanties:', document.querySelectorAll('.guarantee-card').length);