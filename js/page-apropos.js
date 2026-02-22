/* ==========================================
   PAGE À PROPOS - JAVASCRIPT
   Stats counter animé
========================================== */

'use strict';

document.addEventListener('DOMContentLoaded', function () {
    console.log('📖 Page À Propos - Initialisation...');

    initSmoothScroll();
    initStatsCounter();
    initButtonAnimations();

    console.log('✅ Page À Propos - Chargée avec succès');
});

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
    const stats = document.querySelectorAll('.stat-value');
    let hasAnimated = false;

    if (stats.length === 0) {
        console.log('⚠️ Aucun .stat-value trouvé');
        return;
    }

    console.log(`📊 ${stats.length} stats trouvés`);

    const animateValue = (element) => {
        const target = parseInt(element.getAttribute('data-target'));

        if (!target || isNaN(target)) {
            console.warn('⚠️ Pas de data-target valide pour:', element);
            return;
        }

        console.log(`✅ Animation stat: ${target}`);

        const duration = 2000;
        const frameRate = 1000 / 60;
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

        const statsSection = document.querySelector('.stats-section');
        if (!statsSection) {
            console.log('⚠️ Section .stats-section non trouvée');
            return;
        }

        const rect = statsSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const isVisible = rect.top < windowHeight && rect.bottom > 0;

        if (isVisible) {
            hasAnimated = true;
            console.log('🎬 Démarrage animation stats !');
            stats.forEach(stat => {
                setTimeout(() => animateValue(stat), 100);
            });
            window.removeEventListener('scroll', checkScroll);
        }
    };

    setTimeout(checkScroll, 500);
    window.addEventListener('scroll', checkScroll);
}

// ==========================================
// ANIMATIONS BOUTONS
// ==========================================

function initButtonAnimations() {
    const buttons = document.querySelectorAll('.btn-cta-primary, .btn-cta-secondary');

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

console.log('📊 Stats: Stat cards:', document.querySelectorAll('.stat-card').length);