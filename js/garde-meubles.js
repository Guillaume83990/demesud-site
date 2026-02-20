/* ==========================================
   PAGE GARDE-MEUBLES
   Version propre sans blocage scroll
========================================== */

'use strict';

document.addEventListener('DOMContentLoaded', function () {
    console.log('🏢 Page Garde-Meubles - Initialisation...');

    initSmoothScroll();
    initButtonAnimations();

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