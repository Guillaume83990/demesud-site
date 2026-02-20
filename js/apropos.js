/* ==========================================
   PAGE À PROPOS - JAVASCRIPT
   Animations compteur et scroll
========================================== */

'use strict';

document.addEventListener('DOMContentLoaded', function () {
    console.log('📖 Page À Propos - Initialisation...');

    // Initialiser tous les modules
    initScrollAnimations();
    initStatsCounter();
    initCardAnimations();
    initParallax();
    initSmoothScroll();

    console.log('✅ Page À Propos - Chargée avec succès');
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
        .stat-card,
        .certification-card,
        .zone-card,
        .location-item,
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
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out cubic)
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(target * easeOutCubic);

            // Formater avec séparateurs de milliers
            if (target >= 1000) {
                element.textContent = current.toLocaleString('fr-FR');
            } else {
                element.textContent = current;
            }

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString('fr-FR');
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

                        // Animation pulse sur l'icône
                        const card = stat.closest('.stat-card');
                        const icon = card?.querySelector('.stat-icon');
                        if (icon) {
                            icon.style.animation = 'pulse 0.6s ease';
                        }
                    }, index * 200);
                });
                hasAnimated = true;
            }
        });
    }, { threshold: 0.3 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }

    // Ajouter l'animation pulse
    if (!document.getElementById('pulse-animation')) {
        const style = document.createElement('style');
        style.id = 'pulse-animation';
        style.textContent = `
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
        `;
        document.head.appendChild(style);
    }
}

// ==========================================
// ANIMATIONS CARTES
// ==========================================

function initCardAnimations() {
    // Animation hover sur les cartes certifications
    const certificationCards = document.querySelectorAll('.certification-card');
    certificationCards.forEach(card => {
        const icon = card.querySelector('.certification-icon');

        card.addEventListener('mouseenter', function () {
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(-5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });

        card.addEventListener('mouseleave', function () {
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Animation hover sur les cartes zone
    const zoneCards = document.querySelectorAll('.zone-card');
    zoneCards.forEach(card => {
        const icon = card.querySelector('.zone-icon');

        card.addEventListener('mouseenter', function () {
            if (icon) {
                icon.style.animation = 'float 2s ease-in-out infinite';
            }
        });
    });

    // Ajouter l'animation float
    if (!document.getElementById('float-animation')) {
        const style = document.createElement('style');
        style.id = 'float-animation';
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
        `;
        document.head.appendChild(style);
    }
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

        console.log('📊 CTA Click À Propos:', {
            text: buttonText,
            section: section,
            timestamp: new Date().toISOString()
        });

        // Google Analytics (si disponible)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'cta_click', {
                event_category: 'À Propos',
                event_label: buttonText,
                event_section: section
            });
        }
    });
});

// ==========================================
// ANIMATION IMAGES AU SCROLL
// ==========================================

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transform = 'scale(0.95)';

            setTimeout(() => {
                img.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                img.style.opacity = '1';
                img.style.transform = 'scale(1)';
            }, 100);

            imageObserver.unobserve(img);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.story-visual img, .expansion-visual img').forEach(img => {
    imageObserver.observe(img);
});

// ==========================================
// LAZY LOADING IMAGES
// ==========================================

if ('IntersectionObserver' in window) {
    const lazyImageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    lazyImageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        lazyImageObserver.observe(img);
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

console.log('📊 Statistiques page À Propos:');
console.log('  - Stats:', document.querySelectorAll('.stat-card').length);
console.log('  - Certifications:', document.querySelectorAll('.certification-card').length);
console.log('  - Zones:', document.querySelectorAll('.zone-card').length);

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
        initStatsCounter,
        initScrollAnimations,
        initCardAnimations
    };
}