/* ==========================================
   PAGE GARDE-MEUBLES - JAVASCRIPT
   Stats counter animé
========================================== */

'use strict';

document.addEventListener('DOMContentLoaded', function () {
    console.log('🏢 Page Garde-Meubles - Initialisation...');

    initSmoothScroll();
    initButtonAnimations();
    initStatsCounter();

    console.log('✅ Page Garde-Meubles - Chargée avec succès');
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

    const animateValue = (element) => {
        const text = element.textContent;
        const match = text.match(/(\d+)/);
        if (!match) return;

        const target = parseInt(match[1]);
        const suffix = text.replace(/\d+/, '');
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateNumber = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current) + suffix;
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = target + suffix;
            }
        };

        updateNumber();
    };

    const checkScroll = () => {
        if (hasAnimated) return;

        const statsSection = document.querySelector('.intro-stats');
        if (!statsSection) return;

        const rect = statsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;

        if (isVisible) {
            hasAnimated = true;
            stats.forEach(stat => animateValue(stat));
            window.removeEventListener('scroll', checkScroll);
        }
    };

    checkScroll();
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

console.log('📊 Stats: Sites:', document.querySelectorAll('.site-card').length);