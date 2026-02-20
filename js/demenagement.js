// ==========================================
// PAGE DÉMÉNAGEMENT - FONCTIONNALITÉS PREMIUM
// ==========================================

document.addEventListener('DOMContentLoaded', function () {
    // Initialiser toutes les fonctionnalités
    initScrollAnimations();
    initCardAnimations();
    initProcessAnimation();
    initGuaranteeCards();
    initCTAButtons();
    initHeroParallax();
    initLazyLoading();

    console.log('✅ Page Déménagement initialisée');
});

// ==========================================
// ANIMATIONS AU SCROLL
// ==========================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // Délai progressif pour les cartes
                if (entry.target.classList.contains('service-detail-card')) {
                    const cards = document.querySelectorAll('.service-detail-card');
                    const index = Array.from(cards).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.15}s`;
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer tous les éléments
    const elements = document.querySelectorAll(`
        .intro-content,
        .service-detail-card,
        .process-step,
        .guarantee-card,
        .section-head
    `);

    elements.forEach(el => observer.observe(el));
}

// Styles d'animation
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .animate-in {
        animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(40px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .service-detail-card,
    .process-step,
    .guarantee-card {
        opacity: 0;
    }
`;
document.head.appendChild(animationStyles);

// ==========================================
// ANIMATIONS DES CARTES DE SERVICE
// ==========================================

function initCardAnimations() {
    const cards = document.querySelectorAll('.service-detail-card');

    cards.forEach(card => {
        // Effet 3D au survol
        card.addEventListener('mousemove', function (e) {
            if (window.innerWidth <= 768) return; // Désactiver sur mobile

            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;

            this.style.transform = `
                perspective(1000px)
                translateY(-10px) 
                rotateX(${deltaY * 3}deg) 
                rotateY(${deltaX * 3}deg)
            `;
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });

        // Animation du bouton CTA
        const btnCard = card.querySelector('.btn-card');
        if (btnCard) {
            btnCard.addEventListener('mouseenter', function () {
                const icon = document.createElement('i');
                icon.className = 'fas fa-arrow-right';
                icon.style.marginLeft = '8px';
                icon.style.transition = 'transform 0.3s ease';

                if (!this.querySelector('i')) {
                    this.appendChild(icon);
                }
            });
        }
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
                const allSteps = document.querySelectorAll('.process-step');
                const currentIndex = Array.from(allSteps).indexOf(entry.target);

                setTimeout(() => {
                    entry.target.classList.add('step-visible');

                    // Animer le numéro avec pulsation
                    const stepNumber = entry.target.querySelector('.step-number');
                    if (stepNumber) {
                        stepNumber.style.animation = 'pulse 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    }

                    // Animer le compteur
                    animateStepNumber(entry.target);
                }, currentIndex * 100);

                processObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    steps.forEach(step => processObserver.observe(step));
}

// Animation du numéro d'étape
function animateStepNumber(step) {
    const numberEl = step.querySelector('.step-number');
    if (!numberEl) return;

    const targetNumber = parseInt(numberEl.textContent);
    let currentNumber = 0;
    const duration = 600;
    const increment = targetNumber / (duration / 16);

    const updateNumber = () => {
        currentNumber += increment;
        if (currentNumber < targetNumber) {
            numberEl.textContent = Math.round(currentNumber);
            requestAnimationFrame(updateNumber);
        } else {
            numberEl.textContent = targetNumber;
        }
    };

    updateNumber();
}

// Styles du processus
const processStyles = document.createElement('style');
processStyles.textContent = `
    .process-step {
        opacity: 0;
        transform: translateX(-40px);
        transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
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
            transform: scale(1.15);
        }
    }
`;
document.head.appendChild(processStyles);

// ==========================================
// ANIMATION DES CARTES GARANTIES
// ==========================================

function initGuaranteeCards() {
    const cards = document.querySelectorAll('.guarantee-card');

    cards.forEach((card, index) => {
        // Décalage aléatoire de l'animation float
        const icon = card.querySelector('.guarantee-icon');
        if (icon) {
            icon.style.animationDelay = `${index * 0.2}s`;
        }

        // Hover effect
        card.addEventListener('mouseenter', function () {
            this.style.borderColor = 'var(--color-orange)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.borderColor = 'rgba(0, 0, 0, 0.05)';
        });
    });
}

// ==========================================
// GESTION DES BOUTONS CTA
// ==========================================

function initCTAButtons() {
    const buttons = document.querySelectorAll(`
        .btn-card,
        .btn-cta-primary,
        .btn-cta-secondary
    `);

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            // Tracking
            const buttonText = this.textContent.trim();
            const section = this.closest('section')?.className || 'unknown';

            console.log('📊 CTA clicked:', {
                text: buttonText,
                section: section,
                href: this.getAttribute('href'),
                timestamp: new Date().toISOString()
            });

            // Effet visuel de clic
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                width: 100px;
                height: 100px;
                margin-left: -50px;
                margin-top: -50px;
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

            const rect = this.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top = (e.clientY - rect.top) + 'px';

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Animation ripple
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    @keyframes ripple {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyles);

// ==========================================
// PARALLAXE DU HERO
// ==========================================

function initHeroParallax() {
    const hero = document.querySelector('.page-hero');
    const heroBg = hero?.querySelector('.hero-bg');

    if (!hero || !heroBg) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const heroHeight = hero.offsetHeight;

                if (scrolled < heroHeight) {
                    heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
                }

                ticking = false;
            });

            ticking = true;
        }
    }, { passive: true });
}

// ==========================================
// SMOOTH SCROLL POUR ANCRES
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        if (href === '#' || !href) return;

        const target = document.querySelector(href);

        if (target) {
            e.preventDefault();

            const headerHeight = document.querySelector('header')?.offsetHeight || 0;
            const targetPosition = target.offsetTop - headerHeight - 30;

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

setTimeout(() => {
    const badges = document.querySelectorAll('.card-badge');
    badges.forEach((badge, index) => {
        badge.style.opacity = '0';
        badge.style.transform = 'translateY(-20px) rotate(-5deg)';

        setTimeout(() => {
            badge.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
            badge.style.opacity = '1';
            badge.style.transform = 'translateY(0) rotate(0deg)';
        }, 200 + (index * 100));
    });
}, 300);

// ==========================================
// LAZY LOADING DÉSACTIVÉ
// ==========================================

function initLazyLoading() {
    // Les images utilisent loading="lazy" natif du HTML
    // Pas besoin d'IntersectionObserver qui cause des problèmes
    console.log('✅ Lazy loading natif activé via HTML');
}

// ==========================================
// ACCESSIBILITÉ - NAVIGATION CLAVIER
// ==========================================

const focusableElements = document.querySelectorAll(`
    .btn-card,
    .btn-cta-primary,
    .btn-cta-secondary,
    .service-detail-card,
    a[href]
`);

focusableElements.forEach(element => {
    element.addEventListener('focus', function () {
        this.style.outline = '3px solid var(--color-orange)';
        this.style.outlineOffset = '4px';
        this.style.transition = 'outline 0.2s ease';
    });

    element.addEventListener('blur', function () {
        this.style.outline = '';
        this.style.outlineOffset = '';
    });
});

// ==========================================
// GESTION DU SCROLL POUR HEADER
// ==========================================

let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const header = document.querySelector('header');

    if (!header) return;

    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scroll down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scroll up
        header.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
}, { passive: true });

// ==========================================
// DÉTECTION DU VIEWPORT POUR STATS
// ==========================================

window.addEventListener('load', () => {
    console.log('📊 Page Stats:', {
        cards: document.querySelectorAll('.service-detail-card').length,
        process_steps: document.querySelectorAll('.process-step').length,
        guarantees: document.querySelectorAll('.guarantee-card').length,
        cta_buttons: document.querySelectorAll('[class*="btn-"]').length,
        viewport: {
            width: window.innerWidth,
            height: window.innerHeight
        }
    });
});

// ==========================================
// PERFORMANCE MONITORING
// ==========================================

if ('PerformanceObserver' in window) {
    try {
        const perfObserver = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (entry.entryType === 'paint') {
                    console.log(`⚡ ${entry.name}: ${entry.startTime.toFixed(2)}ms`);
                }
            });
        });

        perfObserver.observe({ entryTypes: ['paint'] });
    } catch (e) {
        // Observer not supported
    }
}

// ==========================================
// EXPORT POUR DEBUG
// ==========================================

window.demenagementDebug = {
    reinitAnimations: initScrollAnimations,
    reinitCards: initCardAnimations,
    reinitProcess: initProcessAnimation,
    stats: () => {
        return {
            cards: document.querySelectorAll('.service-detail-card').length,
            steps: document.querySelectorAll('.process-step').length,
            guarantees: document.querySelectorAll('.guarantee-card').length
        };
    }
};