/* ==========================================
   PAGE INSTALLATION VILLAS - JAVASCRIPT
   Animations et interactions
========================================== */

'use strict';

document.addEventListener('DOMContentLoaded', function () {
    console.log('🏰 Page Installation Villas - Initialisation...');

    // Initialiser tous les modules
    initScrollAnimations();
    initFAQ();
    initProcessAnimation();
    initCardAnimations();
    initParallax();
    initSmoothScroll();

    console.log('✅ Page Installation Villas - Chargée avec succès');
});

// ==========================================
// ANIMATIONS AU SCROLL
// ==========================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Éléments à animer
    const animatedElements = document.querySelectorAll(`
        .service-card,
        .advantage-card,
        .faq-item,
        .intro-content h2,
        .section-head
    `);

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // Style pour l'état animé
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// ==========================================
// FAQ ACCORDION
// ==========================================

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems.length === 0) return;

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        if (!question) return;

        question.addEventListener('click', function () {
            // Fermer les autres items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle l'item actuel
            item.classList.toggle('active');

            // Analytics
            if (item.classList.contains('active')) {
                const questionText = this.querySelector('h3').textContent;
                console.log('📊 FAQ ouvert:', questionText);

                if (typeof gtag !== 'undefined') {
                    gtag('event', 'faq_open', {
                        event_category: 'Installation Villas',
                        event_label: questionText
                    });
                }
            }
        });

        // Accessibilité clavier
        question.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    console.log('✅ FAQ initialisée -', faqItems.length, 'questions');
}

// ==========================================
// ANIMATION PROCESSUS
// ==========================================

function initProcessAnimation() {
    const processSteps = document.querySelectorAll('.process-step');
    if (processSteps.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('step-visible');

                    // Animer le numéro
                    const stepNumber = entry.target.querySelector('.step-number');
                    if (stepNumber) {
                        stepNumber.style.animation = 'pulse 0.6s ease';
                    }
                }, index * 200);
            }
        });
    }, { threshold: 0.3 });

    processSteps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateX(-30px)';
        step.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
        observer.observe(step);
    });

    // Style pour les étapes visibles
    const style = document.createElement('style');
    style.textContent = `
        .step-visible {
            opacity: 1 !important;
            transform: translateX(0) !important;
        }

        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
    `;
    document.head.appendChild(style);
}

// ==========================================
// ANIMATIONS CARTES
// ==========================================

function initCardAnimations() {
    // Animation hover sur les cartes de service
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease';
        });
    });

    // Animation hover sur les cartes avantages
    const advantageCards = document.querySelectorAll('.advantage-card');
    advantageCards.forEach(card => {
        const icon = card.querySelector('.advantage-icon');

        card.addEventListener('mouseenter', function () {
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });

        card.addEventListener('mouseleave', function () {
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// ==========================================
// EFFET PARALLAX
// ==========================================

function initParallax() {
    const heroBg = document.querySelector('.hero-bg');
    if (!heroBg) return;

    let ticking = false;

    const updateParallax = () => {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.page-hero');
        const heroHeight = heroSection ? heroSection.offsetHeight : 0;

        if (scrolled < heroHeight) {
            heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
        }

        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
}

// ==========================================
// SMOOTH SCROLL
// ==========================================

function initSmoothScroll() {
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
}

// ==========================================
// ANIMATIONS BOUTONS
// ==========================================

const ctaButtons = document.querySelectorAll(`
    .btn-service,
    .btn-cta-primary,
    .btn-cta-secondary
`);

ctaButtons.forEach(button => {
    button.addEventListener('mouseenter', function () {
        const icon = this.querySelector('i');
        if (icon) {
            icon.style.transform = 'translateX(5px)';
            icon.style.transition = 'transform 0.3s ease';
        }
    });

    button.addEventListener('mouseleave', function () {
        const icon = this.querySelector('i');
        if (icon) {
            icon.style.transform = 'translateX(0)';
        }
    });

    // Effet ripple au clic
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Animation ripple
if (!document.getElementById('ripple-animation')) {
    const style = document.createElement('style');
    style.id = 'ripple-animation';
    style.textContent = `
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
    document.head.appendChild(style);
}

// ==========================================
// TRACKING CTA CLICS
// ==========================================

ctaButtons.forEach(button => {
    button.addEventListener('click', function (e) {
        const buttonText = this.textContent.trim();
        const section = this.closest('section')?.className.split(' ')[0] || 'unknown';

        console.log('📊 CTA Click Installation Villas:', {
            text: buttonText,
            section: section,
            timestamp: new Date().toISOString()
        });

        // Google Analytics (si disponible)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'cta_click', {
                event_category: 'Installation Villas',
                event_label: buttonText,
                event_section: section
            });
        }
    });
});

// ==========================================
// LAZY LOADING IMAGES
// ==========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==========================================
// PERFORMANCE - DEBOUNCE RESIZE
// ==========================================

let resizeAnimationStopper;
window.addEventListener('resize', () => {
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeAnimationStopper);
    resizeAnimationStopper = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
    }, 400);
}, { passive: true });

// Style pour stopper les animations pendant resize
if (!document.getElementById('resize-stopper-style')) {
    const style = document.createElement('style');
    style.id = 'resize-stopper-style';
    style.textContent = `
        .resize-animation-stopper * {
            animation: none !important;
            transition: none !important;
        }
    `;
    document.head.appendChild(style);
}

// ==========================================
// ACCESSIBILITÉ
// ==========================================

const focusableElements = document.querySelectorAll(`
    a,
    button,
    input,
    select,
    textarea,
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
// VISIBILITÉ PAGE
// ==========================================

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('⏸️ Page cachée - pause animations');
    } else {
        console.log('▶️ Page visible - reprise animations');
    }
});

// ==========================================
// ERROR HANDLING
// ==========================================

window.addEventListener('error', (e) => {
    console.error('❌ Erreur JavaScript:', e.message);
}, true);

// ==========================================
// LOGS DE DEBUG
// ==========================================

console.log('📊 Statistiques page Installation Villas:');
console.log('  - Services:', document.querySelectorAll('.service-card').length);
console.log('  - Avantages:', document.querySelectorAll('.advantage-card').length);
console.log('  - FAQ:', document.querySelectorAll('.faq-item').length);
console.log('  - Étapes processus:', document.querySelectorAll('.process-step').length);

// ==========================================
// UTILITIES
// ==========================================

// Fonction debounce réutilisable
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Fonction throttle réutilisable
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==========================================
// EXPORT (si module)
// ==========================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initFAQ,
        initScrollAnimations,
        initProcessAnimation
    };
}