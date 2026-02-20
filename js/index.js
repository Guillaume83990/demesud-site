/* ==========================================
   DEMESUD - INDEX PAGE PREMIUM
   JavaScript haut de gamme avec animations
========================================== */

'use strict';

// ==========================================
// INITIALISATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌟 Démésud Premium - Initialisation...');

    initHeroAnimations();
    initStatsCounter();
    initCarousel();
    initScrollAnimations();
    initParallax();
    initSmoothScroll();
    initScrollIndicator();
    initLazyLoading();
    initButtonAnimations();
    handleCarouselResponsive();
    preloadImages();
    initAnalytics();
    initAccessibility();
    console.log('✅ Démésud Premium - Chargé avec succès');
});

// ==========================================
// HERO ANIMATIONS & PARALLAX
// ==========================================
function initHeroAnimations() {
    const badge = document.querySelector('.trust-badge');
    const heroPattern = document.querySelector('.hero-pattern');

    if (badge) {
        setTimeout(() => badge.style.animation = 'badgeFloat 3s ease-in-out infinite', 1000);

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
    }

    if (heroPattern) {
        document.addEventListener('mousemove', (e) => {
            const mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
            const mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
            requestAnimationFrame(() => heroPattern.style.transform = `translate(${mouseX}px, ${mouseY}px)`);
        });
    }
}

function initParallax() {
    const heroBg = document.querySelector('.hero-bg');
    if (!heroBg) return;

    let ticking = false;
    const updateParallax = () => {
        const scrolled = window.pageYOffset;
        const heroHeight = document.querySelector('.hero-luxury')?.offsetHeight || 0;
        if (scrolled < heroHeight) heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
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
// STATS COUNTER
// ==========================================
function initStatsCounter() {
    const statsSection = document.querySelector('.stats-luxury');
    const statNumbers = document.querySelectorAll('.stat-number');
    if (!statsSection || !statNumbers.length) return;

    let hasAnimated = false;

    const animateNumber = (el) => {
        const target = parseInt(el.dataset.target);
        if (!target) return;

        const duration = 2000;
        const startTime = performance.now();

        const update = (time) => {
            const progress = Math.min((time - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(target * eased);

            if (target >= 1000) el.textContent = current >= 1000 ? '5k+' : current;
            else el.textContent = current + (target === 25 ? '+' : '');

            if (progress < 1) requestAnimationFrame(update);
            else el.textContent = target >= 1000 ? '5k+' : target + (target === 25 ? '+' : '');
        };

        requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                statNumbers.forEach((stat, i) => setTimeout(() => animateNumber(stat), i * 200));
                hasAnimated = true;
            }
        });
    }, { threshold: 0.5 });

    observer.observe(statsSection);
}

// ==========================================
// CAROUSEL AVIS PREMIUM
// ==========================================
let currentSlide = 0;
let slidesPerView = 3;
const totalReviews = 6;

function initCarousel() {
    updateSlidesPerView();
    createCarouselDots();
    updateCarousel();
    initCarouselTouch();
    initCarouselNavigation();
    window.addEventListener('resize', debounce(() => {
        updateSlidesPerView();
        updateCarousel();
    }, 250));
}

function updateSlidesPerView() {
    const width = window.innerWidth;
    slidesPerView = width <= 768 ? 1 : width <= 1024 ? 2 : 3;
}

function prevSlide() { goToSlide(currentSlide - 1); }
function nextSlide() { goToSlide(currentSlide + 1); }

function goToSlide(index) {
    const maxSlide = Math.max(0, totalReviews - slidesPerView);
    currentSlide = Math.max(0, Math.min(index, maxSlide));
    updateCarousel();
}

function updateCarousel() {
    const track = document.getElementById('reviewsTrack');
    if (!track || !track.children.length) return;

    const containerWidth = track.parentElement.offsetWidth;
    const gap = 20;
    const cardWidth = slidesPerView === 3 ? (containerWidth - gap * 2) / 3
        : slidesPerView === 2 ? (containerWidth - gap) / 2
            : containerWidth;

    track.style.transform = `translateX(${-currentSlide * (cardWidth + gap)}px)`;
    updateCarouselButtons();
    updateCarouselDots();
}

function updateCarouselButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const maxSlide = Math.max(0, totalReviews - slidesPerView);
    if (prevBtn) prevBtn.disabled = currentSlide === 0;
    if (nextBtn) nextBtn.disabled = currentSlide >= maxSlide;
}

function createCarouselDots() {
    const container = document.getElementById('carouselIndicators');
    if (!container) return;
    container.innerHTML = '';
    const maxSlide = Math.max(0, totalReviews - slidesPerView);
    for (let i = 0; i <= maxSlide; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot';
        dot.setAttribute('aria-label', `Aller à la position ${i + 1}`);
        dot.addEventListener('click', () => goToSlide(i));
        container.appendChild(dot);
    }
}

function updateCarouselDots() {
    document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

function initCarouselTouch() {
    const carousel = document.querySelector('.carousel-container');
    if (!carousel) return;

    let startX = 0, currentX = 0, isDragging = false;

    carousel.addEventListener('touchstart', e => { startX = e.touches[0].clientX; isDragging = true; }, { passive: true });
    carousel.addEventListener('touchmove', e => { if (isDragging) currentX = e.touches[0].clientX; }, { passive: true });
    carousel.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        const diff = startX - currentX;
        if (Math.abs(diff) > 50) diff > 0 ? nextSlide() : prevSlide();
    }, { passive: true });
}

function initCarouselNavigation() {
    document.getElementById('prevBtn')?.addEventListener('click', prevSlide);
    document.getElementById('nextBtn')?.addEventListener('click', nextSlide);
    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
}

// ==========================================
// SCROLL & ANIMATIONS
// ==========================================
function initScrollAnimations() {
    const elements = document.querySelectorAll('.service-card, .location-card, .about-visual, .about-text');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

    elements.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = `opacity 0.8s cubic-bezier(0.4,0,0.2,1) ${i * 0.1}s,
                            transform 0.8s cubic-bezier(0.4,0,0.2,1) ${i * 0.1}s`;
        observer.observe(el);
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            const headerHeight = document.querySelector('.main-header')?.offsetHeight || 0;
            window.scrollTo({ top: target.offsetTop - headerHeight - 20, behavior: 'smooth' });
        });
    });
}

function initScrollIndicator() {
    const hint = document.querySelector('.scroll-hint');
    if (!hint) return;
    window.addEventListener('scroll', () => {
        hint.style.opacity = window.pageYOffset > 100 ? '0' : '1';
        hint.style.pointerEvents = window.pageYOffset > 100 ? 'none' : 'auto';
    }, { passive: true });
    hint.addEventListener('click', () => {
        document.querySelector('.services-luxury')?.scrollIntoView({ behavior: 'smooth' });
    });
}

// ==========================================
// BUTTONS & HOVER
// ==========================================
function initButtonAnimations() {
    document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline, .btn-cta-primary, .btn-cta-secondary, .service-link')
        .forEach(btn => {
            btn.addEventListener('mouseenter', () => btn.querySelector('i')?.style.transform = 'translateX(5px)');
            btn.addEventListener('mouseleave', () => btn.querySelector('i')?.style.transform = 'translateX(0)');
        });
}

document.querySelectorAll('.service-card, .location-card').forEach(card => {
    card.addEventListener('mouseenter', () => card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease');
});

// ==========================================
// LAZY LOADING & PRELOAD
// ==========================================
function initLazyLoading() { console.log('✅ Lazy loading natif activé via HTML'); }

function preloadImages() {
    ['assets/images/saint-tropez-hero.jpg', 'assets/images/image-pro-demenagement.jpg']
        .forEach(src => { const img = new Image(); img.src = src; });
}

// ==========================================
// ACCESSIBILITÉ
// ==========================================
function initAccessibility() {
    document.querySelectorAll('a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])').forEach(el => {
        el.addEventListener('focus', () => { el.style.outline = '3px solid var(--color-gold)'; el.style.outlineOffset = '4px'; });
        el.addEventListener('blur', () => { el.style.outline = ''; el.style.outlineOffset = ''; });
    });
}

// ==========================================
// ANALYTICS
// ==========================================
function initAnalytics() {
    document.querySelectorAll('.btn-primary, .btn-cta-primary, .service-link')
        .forEach(btn => btn.addEventListener('click', () => {
            const text = btn.textContent.trim();
            const section = btn.closest('section')?.className.split(' ')[0] || 'unknown';
            console.log('📊 CTA Click:', { text, section, timestamp: new Date().toISOString() });
            if (typeof gtag !== 'undefined') gtag('event', 'cta_click', { event_category: 'Engagement', event_label: text, event_section: section });
        }));
}

// ==========================================
// RESPONSIVE CAROUSEL
// ==========================================
function handleCarouselResponsive() {
    const isMobile = window.innerWidth <= 768;
    const track = document.getElementById('reviewsTrack');
    ['prevBtn', 'nextBtn', 'carouselIndicators'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = isMobile ? 'none' : (id === 'carouselIndicators' ? 'flex' : 'flex');
    });
    if (!isMobile) updateCarousel();
}

window.addEventListener('resize', debounce(handleCarouselResponsive, 250));

// ==========================================
// PERFORMANCE & UTILS
// ==========================================
let resizeAnimationStopper;
window.addEventListener('resize', () => {
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeAnimationStopper);
    resizeAnimationStopper = setTimeout(() => document.body.classList.remove('resize-animation-stopper'), 400);
}, { passive: true });

if (!document.getElementById('resize-stopper-style')) {
    const style = document.createElement('style');
    style.id = 'resize-stopper-style';
    style.textContent = '.resize-animation-stopper *{animation:none !important;transition:none !important;}';
    document.head.appendChild(style);
}

function debounce(func, wait) { let t; return (...args) => { clearTimeout(t); t = setTimeout(() => func.apply(this, args), wait); }; }
function throttle(func, limit) { let inThrottle; return (...args) => { if (!inThrottle) { func.apply(this, args); inThrottle = true; setTimeout(() => inThrottle = false, limit); } }; }