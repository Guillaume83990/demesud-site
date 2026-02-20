/* ==========================================
   PAGE GARDE-MEUBLES - JAVASCRIPT
   Animations et interactions
========================================== */

'use strict';

document.addEventListener('DOMContentLoaded', function () {
    console.log('🏢 Page Garde-Meubles - Initialisation...');

    // Initialiser tous les modules
    initScrollAnimations();
    initStatsCounter();
    initCardAnimations();
    initParallax();
    initSmoothScroll();

    console.log('✅ Page Garde-Meubles - Chargée avec succès');
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
        .site-card,
        .solution-card,
        .security-card,
        .stat-box,
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
// COMPTEUR STATS ANIMÉ
// ==========================================

function initStatsCounter() {
    const statValues = document.querySelectorAll('.stat-value');
    if (statValues.length === 0) return;

    let hasAnimated = false;

    const animateCounter = (element) => {
        const text = element.textContent;
        const isNumber = /^\d+$/.test(text);

        if (!isNumber) return; // Pour "24/7", "100%", etc.

        const target = parseInt(text);
        const duration = 2000;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(target * easeOutCubic);

            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = text; // Valeur finale avec formatage
            }
        };

        requestAnimationFrame(updateCounter);
    };

    // Observer pour démarrer l'animation au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                statValues.forEach((stat, index) => {
                    setTimeout(() => {
                        animateCounter(stat);
                    }, index * 200);
                });
                hasAnimated = true;
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.intro-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// ==========================================
// ANIMATIONS CARTES
// ==========================================

function initCardAnimations() {
    // Animation hover sur les cartes de site
    const siteCards = document.querySelectorAll('.site-card');
    siteCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease';
        });
    });

    // Animation hover sur les cartes de solution
    const solutionCards = document.querySelectorAll('.solution-card');
    solutionCards.forEach(card => {
        const icon = card.querySelector('.solution-icon');

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

    // Animation float sur les images de sécurité
    const securityImages = document.querySelectorAll('.security-image img');
    securityImages.forEach((img, index) => {
        const card = img.closest('.security-card');
        if (card) {
            card.addEventListener('mouseenter', function () {
                img.style.transform = 'scale(1.08)';
            });

            card.addEventListener('mouseleave', function () {
                img.style.transform = 'scale(1)';
            });
        }
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
// ANIMATIONS BOUTONS CTA
// ==========================================

const ctaButtons = document.querySelectorAll(`
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

        console.log('📊 CTA Click Garde-Meubles:', {
            text: buttonText,
            section: section,
            timestamp: new Date().toISOString()
        });

        // Google Analytics (si disponible)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'cta_click', {
                event_category: 'Garde-Meubles',
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
// ACCESSIBILITÉ - NAVIGATION CLAVIER
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
// VISIBILITÉ PAGE (PERFORMANCE)
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

console.log('📊 Statistiques page Garde-Meubles:');
console.log('  - Sites:', document.querySelectorAll('.site-card').length);
console.log('  - Solutions:', document.querySelectorAll('.solution-card').length);
console.log('  - Sécurité:', document.querySelectorAll('.security-card').length);

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
        initScrollAnimations,
        initStatsCounter,
        initCardAnimations
    };
}