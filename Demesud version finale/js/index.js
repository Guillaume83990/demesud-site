/* ==========================================
   DEMESUD - INDEX PAGE PREMIUM
   JavaScript haut de gamme avec animations
========================================== */

'use strict';

// ==========================================
// INITIALISATION
// ==========================================

document.addEventListener('DOMContentLoaded', function () {
    console.log('🌟 Démésud Premium - Initialisation...');

    // Initialiser tous les modules
    initHeroAnimations();
    initStatsCounter();
    initCarousel();
    initScrollAnimations();
    initParallax();
    initSmoothScroll();
    initScrollIndicator();
    initLazyLoading();
    initButtonAnimations();

    console.log('✅ Démésud Premium - Chargé avec succès');
});

// ==========================================
// ANIMATIONS HERO
// ==========================================

function initHeroAnimations() {
    const badge = document.querySelector('.trust-badge');
    if (!badge) return;

    // Animation de flottement du badge
    setTimeout(() => {
        badge.style.animation = 'badgeFloat 3s ease-in-out infinite';
    }, 1000);

    // Ajouter l'animation CSS si elle n'existe pas
    if (!document.getElementById('badge-float-style')) {
        const style = document.createElement('style');
        style.id = 'badge-float-style';
        style.textContent = `
            @keyframes badgeFloat {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
        `;
        document.head.appendChild(style);
    }

    // Parallax mouse pour le hero pattern
    const heroPattern = document.querySelector('.hero-pattern');
    if (heroPattern) {
        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 20;

            requestAnimationFrame(() => {
                heroPattern.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
            });
        });
    }
}

// ==========================================
// COMPTEUR STATS ANIMÉ
// ==========================================

function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length === 0) return;

    let hasAnimated = false;

    const animateNumber = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        if (!target) return;

        const duration = 2000; // 2 secondes
        const startTime = performance.now();

        const updateNumber = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function pour une animation smooth
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(target * easeOutCubic);

            // Formatter selon la valeur
            if (target >= 1000) {
                element.textContent = current >= 1000 ? '5k+' : current;
            } else {
                element.textContent = current + (target === 25 ? '+' : '');
            }

            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                // Valeur finale
                if (target >= 1000) {
                    element.textContent = '5k+';
                } else {
                    element.textContent = target + (target === 25 ? '+' : '');
                }
            }
        };

        requestAnimationFrame(updateNumber);
    };

    // Observer pour démarrer l'animation au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                statNumbers.forEach((stat, index) => {
                    setTimeout(() => {
                        animateNumber(stat);
                    }, index * 200);
                });
                hasAnimated = true;
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-luxury');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// ==========================================
// CAROUSEL AVIS PREMIUM
// ==========================================

let currentSlide = 0;
let slidesPerView = 3;
const totalReviews = 6;

function initCarousel() {
    const track = document.getElementById('reviewsTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (!track || !prevBtn || !nextBtn) return;

    // Déterminer le nombre d'avis visibles
    updateSlidesPerView();

    // Créer les indicateurs
    createCarouselDots();

    // Navigation
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Support tactile
    initCarouselTouch();

    // Responsive
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            updateSlidesPerView();
            updateCarousel();
        }, 250);
    });

    // Navigation clavier
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Affichage initial
    updateCarousel();

    console.log('✅ Carousel initialisé');
}

function updateSlidesPerView() {
    const width = window.innerWidth;

    if (width <= 768) {
        slidesPerView = 1;
    } else if (width <= 1024) {
        slidesPerView = 2;
    } else {
        slidesPerView = 3;
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        updateCarousel();
    }
}

function nextSlide() {
    const maxSlide = Math.max(0, totalReviews - slidesPerView);
    if (currentSlide < maxSlide) {
        currentSlide++;
        updateCarousel();
    }
}

function goToSlide(index) {
    const maxSlide = Math.max(0, totalReviews - slidesPerView);
    currentSlide = Math.max(0, Math.min(index, maxSlide));
    updateCarousel();
}

function updateCarousel() {
    const track = document.getElementById('reviewsTrack');
    if (!track || !track.children.length) return;

    const container = track.parentElement;
    const containerWidth = container.offsetWidth;
    const gap = 20;

    let cardWidth;
    if (slidesPerView === 3) {
        cardWidth = (containerWidth - (gap * 2)) / 3;
    } else if (slidesPerView === 2) {
        cardWidth = (containerWidth - gap) / 2;
    } else {
        cardWidth = containerWidth;
    }

    const offset = -(currentSlide * (cardWidth + gap));
    track.style.transform = `translateX(${offset}px)`;

    updateCarouselButtons();
    updateCarouselDots();
}

function updateCarouselButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const maxSlide = Math.max(0, totalReviews - slidesPerView);

    if (prevBtn) prevBtn.disabled = (currentSlide === 0);
    if (nextBtn) nextBtn.disabled = (currentSlide >= maxSlide);
}

function createCarouselDots() {
    const container = document.getElementById('carouselIndicators');
    if (!container) return;

    container.innerHTML = '';

    const maxSlide = Math.max(0, totalReviews - slidesPerView);
    const dotsCount = maxSlide + 1;

    for (let i = 0; i < dotsCount; i++) {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        dot.setAttribute('aria-label', `Aller à la position ${i + 1}`);
        dot.addEventListener('click', () => goToSlide(i));
        container.appendChild(dot);
    }
}

function updateCarouselDots() {
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function initCarouselTouch() {
    const carousel = document.querySelector('.carousel-container');
    if (!carousel) return;

    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    }, { passive: true });

    carousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
    }, { passive: true });

    carousel.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;

        const diffX = startX - currentX;
        const threshold = 50;

        if (Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }, { passive: true });
}

// ==========================================
// ANIMATIONS AU SCROLL
// ==========================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Éléments à animer
    const animatedElements = document.querySelectorAll(`
        .service-card,
        .location-card,
        .about-visual,
        .about-text
    `);

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = `opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s, 
                               transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(el);
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
        const heroHeight = document.querySelector('.hero-luxury')?.offsetHeight || 0;

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
            if (!target) return;

            e.preventDefault();

            const headerHeight = document.querySelector('.main-header')?.offsetHeight || 0;
            const targetPosition = target.offsetTop - headerHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// ==========================================
// SCROLL INDICATOR
// ==========================================

function initScrollIndicator() {
    const scrollHint = document.querySelector('.scroll-hint');
    if (!scrollHint) return;

    // Cacher au scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            scrollHint.style.opacity = '0';
            scrollHint.style.pointerEvents = 'none';
        } else {
            scrollHint.style.opacity = '1';
            scrollHint.style.pointerEvents = 'auto';
        }
    }, { passive: true });

    // Scroll au clic
    scrollHint.addEventListener('click', () => {
        const servicesSection = document.querySelector('.services-luxury');
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ==========================================
// LAZY LOADING IMAGES (DÉSACTIVÉ - Images déjà chargées normalement)
// ==========================================

function initLazyLoading() {
    // Les images utilisent loading="lazy" natif du HTML
    // Pas besoin d'IntersectionObserver supplémentaire
    console.log('✅ Lazy loading natif activé via HTML');
}

// ==========================================
// ANIMATIONS BOUTONS
// ==========================================

function initButtonAnimations() {
    const buttons = document.querySelectorAll(`
        .btn-primary,
        .btn-secondary,
        .btn-outline,
        .btn-cta-primary,
        .btn-cta-secondary,
        .service-link
    `);

    buttons.forEach(button => {
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
    });
}

// ==========================================
// HOVER EFFECTS CARTES
// ==========================================

const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });
});

const locationCards = document.querySelectorAll('.location-card');
locationCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease';
    });
});

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

// Ajouter le style pour stopper les animations pendant resize
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
        this.style.outline = '3px solid var(--color-gold)';
        this.style.outlineOffset = '4px';
    });

    element.addEventListener('blur', function () {
        this.style.outline = '';
        this.style.outlineOffset = '';
    });
});

// ==========================================
// PRELOAD IMAGES CRITIQUES
// ==========================================

function preloadImages() {
    const criticalImages = [
        'assets/images/saint-tropez-hero.jpg',
        'assets/images/image-pro-demenagement.jpg'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

preloadImages();

// ==========================================
// ANALYTICS / TRACKING
// ==========================================

// Tracking des clics CTA
const ctaButtons = document.querySelectorAll(`
    .btn-primary,
    .btn-cta-primary,
    .service-link
`);

ctaButtons.forEach(button => {
    button.addEventListener('click', function (e) {
        const buttonText = this.textContent.trim();
        const section = this.closest('section')?.className.split(' ')[0] || 'unknown';

        console.log('📊 CTA Click:', {
            text: buttonText,
            section: section,
            timestamp: new Date().toISOString()
        });

        // Google Analytics (si disponible)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'cta_click', {
                event_category: 'Engagement',
                event_label: buttonText,
                event_section: section
            });
        }
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

console.log('📊 Statistiques page:');
console.log('  - Services:', document.querySelectorAll('.service-card').length);
console.log('  - Avis:', document.querySelectorAll('.review-card').length);
console.log('  - Locations:', document.querySelectorAll('.location-card').length);
console.log('  - Slides par vue:', slidesPerView);

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
        initCarousel,
        initStatsCounter,
        goToSlide
    };
}

// ==========================================
// FIX CAROUSEL MOBILE - À AJOUTER À index.js
// ==========================================

// Fonction pour désactiver le carousel sur mobile
function handleCarouselResponsive() {
    const isMobile = window.innerWidth <= 768;
    const track = document.getElementById('reviewsTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.getElementById('carouselIndicators');

    if (isMobile) {
        // Mode mobile : afficher tous les témoignages en colonne
        if (track) {
            track.style.transform = 'none';
        }

        // Masquer les contrôles
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        if (indicators) indicators.style.display = 'none';
    } else {
        // Mode desktop : réactiver le carousel
        if (prevBtn) prevBtn.style.display = 'flex';
        if (nextBtn) nextBtn.style.display = 'flex';
        if (indicators) indicators.style.display = 'flex';

        // Réinitialiser le carousel
        if (typeof updateCarousel === 'function') {
            updateCarousel();
        }
    }
}

// Appeler au chargement
document.addEventListener('DOMContentLoaded', function () {
    handleCarouselResponsive();
});

// Appeler au redimensionnement
let resizeTimer;
window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
        handleCarouselResponsive();
    }, 250);
});