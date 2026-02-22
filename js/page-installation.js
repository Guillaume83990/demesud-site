/* ==========================================
   PAGE INSTALLATION VILLAS - JAVASCRIPT
   FAQ accordion + Animations
========================================== */

'use strict';

document.addEventListener('DOMContentLoaded', function () {
    console.log('🏠 Page Installation Villas - Initialisation...');

    initSmoothScroll();
    initButtonAnimations();
    initFAQ();

    console.log('✅ Page Installation Villas - Chargée avec succès');
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
    const buttons = document.querySelectorAll('.btn-cta-primary, .btn-cta-secondary, .btn-service');

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
// FAQ ACCORDION
// ==========================================

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;

        question.addEventListener('click', function () {
            const isActive = item.classList.contains('active');

            // Fermer toutes les FAQ
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Ouvrir celle cliquée si elle n'était pas déjà ouverte
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    console.log('📊 FAQ items:', faqItems.length);
}

console.log('📊 Stats: Services:', document.querySelectorAll('.service-card').length);