// ==========================================
// PAGE ACCUEIL MODERNE - FONCTIONNALITÉS
// ==========================================

document.addEventListener('DOMContentLoaded', function () {

    // Initialiser toutes les fonctionnalités
    initHeroAnimations();
    initStatsCounter();
    initReviewsCarousel();
    initScrollAnimations();
    initParallax();
});

// ==========================================
// ANIMATIONS DU HERO
// ==========================================

function initHeroAnimations() {
    // Animation du badge Google
    const badge = document.querySelector('.google-badge-floating');
    if (badge) {
        setTimeout(() => {
            badge.style.animation = 'float 3s ease-in-out infinite';
        }, 1000);
    }

    // Animation des particules
    const particles = document.querySelector('.hero-particles');
    if (particles) {
        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX / window.innerWidth;
            mouseY = e.clientY / window.innerHeight;

            particles.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
        });
    }
}

// ==========================================
// COMPTEUR DES STATS HERO
// ==========================================

function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const animateNumber = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateNumber = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = target >= 10000 ? '10k+' : target + (target === 100 ? '%' : target === 25 ? '+' : '');
            }
        };

        updateNumber();
    };

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

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// ==========================================
// CARROUSEL AVIS CLIENTS MODERNE
// ==========================================

function initReviewsCarousel() {
    const track = document.querySelector('.reviews-track-modern');
    const prevBtn = document.getElementById('prevReviewModern');
    const nextBtn = document.getElementById('nextReviewModern');
    const dotsContainer = document.getElementById('reviewsDots');

    if (!track || !prevBtn || !nextBtn) return;

    const cards = document.querySelectorAll('.review-card-modern');
    const totalCards = cards.length;
    let currentIndex = 0;
    let autoPlayInterval;

    // Créer les dots
    for (let i = 0; i < totalCards; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }

    const dots = document.querySelectorAll('.dot');

    // Calculer la largeur de déplacement
    const getCardWidth = () => {
        return cards[0].offsetWidth + 30; // width + gap
    };

    // Aller à un slide spécifique
    const goToSlide = (index) => {
        currentIndex = index;
        updateCarousel();
        resetAutoPlay();
    };

    // Mettre à jour le carrousel
    const updateCarousel = () => {
        const cardWidth = getCardWidth();
        const offset = -currentIndex * cardWidth;
        track.style.transform = `translateX(${offset}px)`;

        // Mettre à jour les dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    };

    // Navigation précédent
    prevBtn.addEventListener('click', () => {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : totalCards - 1;
        updateCarousel();
        resetAutoPlay();
    });

    // Navigation suivant
    nextBtn.addEventListener('click', () => {
        currentIndex = currentIndex < totalCards - 1 ? currentIndex + 1 : 0;
        updateCarousel();
        resetAutoPlay();
    });

    // Auto-play
    const startAutoPlay = () => {
        autoPlayInterval = setInterval(() => {
            currentIndex = currentIndex < totalCards - 1 ? currentIndex + 1 : 0;
            updateCarousel();
        }, 5000);
    };

    const resetAutoPlay = () => {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    };

    // Démarrer l'auto-play
    startAutoPlay();

    // Pause sur hover
    track.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });

    track.addEventListener('mouseleave', () => {
        startAutoPlay();
    });

    // Gestion responsive
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateCarousel();
        }, 250);
    });

    // Touch/Swipe pour mobile
    let startX = 0;
    let isDragging = false;

    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        clearInterval(autoPlayInterval);
    });

    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    }, { passive: false });

    track.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        if (Math.abs(diff) > 50) {
            if (diff > 0 && currentIndex < totalCards - 1) {
                currentIndex++;
            } else if (diff < 0 && currentIndex > 0) {
                currentIndex--;
            }
            updateCarousel();
        }

        isDragging = false;
        startAutoPlay();
    });
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
    const elements = document.querySelectorAll(`
        .service-card-modern,
        .location-card,
        .about-image,
        .about-content
    `);

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Animation spéciale pour les cartes de service
    const serviceCards = document.querySelectorAll('.service-card-modern');
    serviceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.2}s`;
    });

    // Animation pour les locations
    const locationCards = document.querySelectorAll('.location-card');
    locationCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
}

// ==========================================
// EFFET PARALLAXE
// ==========================================

function initParallax() {
    const heroBackground = document.querySelector('.hero-background');

    if (!heroBackground) return;

    let ticking = false;

    const updateParallax = () => {
        const scrolled = window.pageYOffset;
        const heroHeight = document.querySelector('.hero-modern').offsetHeight;

        if (scrolled < heroHeight) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }

        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

// ==========================================
// SMOOTH SCROLL
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
// ANIMATION DU SCROLL INDICATOR
// ==========================================

const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    });

    scrollIndicator.addEventListener('click', () => {
        const servicesSection = document.querySelector('.services-premium');
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ==========================================
// HOVER EFFECT POUR LES CARTES DE SERVICE
// ==========================================

const serviceCards = document.querySelectorAll('.service-card-modern');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ==========================================
// LAZY LOADING DES IMAGES
// ==========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;

                // Ajouter une transition
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';

                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }

                img.onload = () => {
                    img.style.opacity = '1';
                };

                observer.unobserve(img);
            }
        });
    });

    // Observer toutes les images
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==========================================
// ANIMATIONS DES BOUTONS AU HOVER
// ==========================================

const buttons = document.querySelectorAll(`
    .btn-primary-modern,
    .btn-secondary-modern,
    .btn-outline-modern,
    .btn-cta-white,
    .btn-cta-outline
`);

buttons.forEach(button => {
    button.addEventListener('mouseenter', function () {
        const arrow = this.querySelector('svg');
        if (arrow) {
            arrow.style.transform = 'translateX(5px)';
            arrow.style.transition = 'transform 0.3s ease';
        }
    });

    button.addEventListener('mouseleave', function () {
        const arrow = this.querySelector('svg');
        if (arrow) {
            arrow.style.transform = 'translateX(0)';
        }
    });
});

// ==========================================
// TRACKING DES INTERACTIONS
// ==========================================

// Tracking des clics sur les CTA
const ctaButtons = document.querySelectorAll(`
    .btn-primary-modern,
    .btn-cta-white,
    .service-link
`);

ctaButtons.forEach(button => {
    button.addEventListener('click', function (e) {
        const buttonText = this.textContent.trim();
        const section = this.closest('section')?.className.split(' ')[0] || 'unknown';

        console.log('CTA Click:', {
            text: buttonText,
            section: section,
            timestamp: new Date().toISOString()
        });

    });
});

// ==========================================
// PERFORMANCE: DEBOUNCE RESIZE
// ==========================================

let resizeTimer;
window.addEventListener('resize', () => {
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
    }, 400);
});

// Ajouter le style pour stopper les animations pendant le resize
const style = document.createElement('style');
style.textContent = `
    .resize-animation-stopper * {
        animation: none !important;
        transition: none !important;
    }
`;
document.head.appendChild(style);

// ==========================================
// ACCESSIBILITÉ - NAVIGATION CLAVIER
// ==========================================

const focusableElements = document.querySelectorAll(`
    a,
    button,
    .service-card-modern,
    .location-card
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
// PRELOAD DES IMAGES CRITIQUES
// ==========================================

function preloadImages() {
    const criticalImages = [
        'assets/images/saint-tropez-hero.jpg',
        'assets/images/image-pro-demenagement.jpg',
        'assets/images/image-garde-meubles.jpg',
        'assets/images/demesud-villas.png'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

preloadImages();

// ==========================================
// LOG DE DEBUG
// ==========================================

console.log('✅ Page d\'accueil moderne initialisée');
console.log('📊 Stats:', document.querySelectorAll('.stat-number').length);
console.log('💬 Avis:', document.querySelectorAll('.review-card-modern').length);
console.log('📍 Locations:', document.querySelectorAll('.location-card').length);

/* ==========================================
   CAROUSEL AVIS CLIENTS - VERSION CORRIGÉE
   Remplace l'ancien JavaScript
========================================== */

let currentSlide = 0;
let slidesPerView = 3;
const totalReviews = 6;

// ========================================
// INITIALISATION
// ========================================
document.addEventListener('DOMContentLoaded', function () {
    // Attendre un peu que le DOM soit complètement rendu
    setTimeout(() => {
        initReviewsCarousel();
    }, 100);

    // Réécouter le resize
    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            updateSlidesPerView();
            updateCarousel();
        }, 250);
    });
});

// ========================================
// CALCULER COMBIEN D'AVIS AFFICHER
// ========================================
function updateSlidesPerView() {
    const width = window.innerWidth;

    if (width <= 768) {
        slidesPerView = 1;
    } else if (width <= 1024) {
        slidesPerView = 2;
    } else {
        slidesPerView = 3;
    }

    // Recréer les dots quand on change le nombre d'avis visibles
    createIndicators();
}

// ========================================
// INITIALISER LE CAROUSEL
// ========================================
function initReviewsCarousel() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const track = document.getElementById('reviewsTrack');

    if (!prevBtn || !nextBtn || !track) {
        console.error('❌ Éléments carousel non trouvés');
        return;
    }

    // Déterminer le nombre d'avis visibles
    updateSlidesPerView();

    // Événements des boutons
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Créer les indicateurs
    createIndicators();

    // Affichage initial
    updateCarousel();

    // Support tactile
    initTouchSupport();

    console.log('✅ Carousel initialisé - Slides par vue:', slidesPerView);
}

// ========================================
// NAVIGATION
// ========================================
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

// ========================================
// METTRE À JOUR L'AFFICHAGE
// ========================================
function updateCarousel() {
    const track = document.getElementById('reviewsTrack');
    if (!track || !track.children.length) return;

    // Récupérer la largeur du container
    const container = track.parentElement;
    const containerWidth = container.offsetWidth;

    // Calculer la largeur d'une card selon le nombre visible
    let cardWidth;
    const gap = 20;

    if (slidesPerView === 3) {
        cardWidth = (containerWidth - (gap * 2)) / 3;
    } else if (slidesPerView === 2) {
        cardWidth = (containerWidth - gap) / 2;
    } else {
        cardWidth = containerWidth;
    }

    // Calculer le déplacement total
    const offset = -(currentSlide * (cardWidth + gap));

    // Appliquer
    track.style.transform = `translateX(${offset}px)`;

    console.log(`Slide ${currentSlide} - Offset: ${offset}px - Card width: ${cardWidth}px`);

    // Mettre à jour les boutons et dots
    updateButtons();
    updateIndicators();
}

// ========================================
// METTRE À JOUR LES BOUTONS
// ========================================
function updateButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const maxSlide = Math.max(0, totalReviews - slidesPerView);

    if (prevBtn) prevBtn.disabled = (currentSlide === 0);
    if (nextBtn) nextBtn.disabled = (currentSlide >= maxSlide);
}

// ========================================
// CRÉER LES INDICATEURS
// ========================================
function createIndicators() {
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

// ========================================
// METTRE À JOUR LES INDICATEURS
// ========================================
function updateIndicators() {
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// ========================================
// SUPPORT TACTILE
// ========================================
function initTouchSupport() {
    const carousel = document.querySelector('.reviews-carousel');
    if (!carousel) return;

    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    carousel.addEventListener('touchstart', function (e) {
        startX = e.touches[0].clientX;
        isDragging = true;
    }, { passive: true });

    carousel.addEventListener('touchmove', function (e) {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
    }, { passive: true });

    carousel.addEventListener('touchend', function () {
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

// ========================================
// NAVIGATION CLAVIER
// ========================================
document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});

console.log('✅ Carousel reviews JavaScript chargé');