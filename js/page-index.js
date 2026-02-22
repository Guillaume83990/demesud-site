/* ==========================================
   PAGE INDEX - JAVASCRIPT
   Carousel avis + Stats animés
========================================== */

'use strict';

document.addEventListener('DOMContentLoaded', function () {
    console.log('🌟 Page Index - Initialisation...');

    initCarousel();
    initSmoothScroll();
    initButtonAnimations();
    initStatsCounter();

    console.log('✅ Page Index - Chargée avec succès');
});

// ==========================================
// CAROUSEL AVIS
// ==========================================

let currentSlide = 0;
let slidesPerView = 3;
const totalReviews = 6;

function initCarousel() {
    const track = document.getElementById('reviewsTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (!track || !prevBtn || !nextBtn) return;

    updateSlidesPerView();
    createCarouselDots();

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    initCarouselTouch();

    window.addEventListener('resize', debounce(() => {
        updateSlidesPerView();
        updateCarousel();
    }, 250));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    updateCarousel();
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
        if (Math.abs(diffX) > 50) {
            diffX > 0 ? nextSlide() : prevSlide();
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
// STATS COUNTER ANIMÉ
// ==========================================

function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    if (stats.length === 0) {
        console.log('⚠️ Aucun .stat-number trouvé');
        return;
    }

    console.log(`📊 ${stats.length} stats trouvés`);

    const animateNumber = (element) => {
        const target = parseInt(element.getAttribute('data-target'));

        if (!target || isNaN(target)) {
            console.warn('⚠️ Pas de data-target valide pour:', element);
            return;
        }

        console.log(`✅ Animation stat: ${target}`);

        const duration = 2000; // 2 secondes
        const frameRate = 1000 / 60; // 60 FPS
        const totalFrames = Math.round(duration / frameRate);
        const increment = target / totalFrames;

        let currentFrame = 0;

        element.textContent = '0';

        const animate = () => {
            currentFrame++;
            const currentValue = Math.min(Math.round(increment * currentFrame), target);
            element.textContent = currentValue;

            if (currentFrame < totalFrames) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = target;
            }
        };

        animate();
    };

    const checkScroll = () => {
        if (hasAnimated) return;

        const statsSection = document.querySelector('.stats-luxury');
        if (!statsSection) {
            console.log('⚠️ Section .stats-luxury non trouvée');
            return;
        }

        const rect = statsSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const isVisible = rect.top < windowHeight && rect.bottom > 0;

        if (isVisible) {
            hasAnimated = true;
            console.log('🎬 Démarrage animation stats !');
            stats.forEach(stat => {
                setTimeout(() => animateNumber(stat), 100);
            });
            window.removeEventListener('scroll', checkScroll);
        }
    };

    // Vérifier au chargement de la page
    setTimeout(checkScroll, 500);

    // Vérifier au scroll
    window.addEventListener('scroll', checkScroll);
}

// ==========================================
// ANIMATIONS BOUTONS
// ==========================================

function initButtonAnimations() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .service-link');

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
// RESPONSIVE MOBILE
// ==========================================

function handleCarouselResponsive() {
    const isMobile = window.innerWidth <= 768;
    const track = document.getElementById('reviewsTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.getElementById('carouselIndicators');

    if (isMobile) {
        if (track) track.style.transform = 'none';
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        if (indicators) indicators.style.display = 'none';
    } else {
        if (prevBtn) prevBtn.style.display = 'flex';
        if (nextBtn) nextBtn.style.display = 'flex';
        if (indicators) indicators.style.display = 'flex';
        updateCarousel();
    }
}

window.addEventListener('resize', debounce(handleCarouselResponsive, 250));
handleCarouselResponsive();

// ==========================================
// UTILITIES
// ==========================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

console.log('📊 Index: Services:', document.querySelectorAll('.service-card').length);