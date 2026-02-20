/* ==========================================
   PAGE 404 - JAVASCRIPT
   Animations et interactivité
========================================== */

'use strict';

document.addEventListener('DOMContentLoaded', function () {
    console.log('🚫 Page 404 - Initialisation...');

    // Animation des cartes au scroll
    initScrollAnimations();

    console.log('✅ Page 404 - Chargée');
});

// ==========================================
// ANIMATIONS AU SCROLL
// ==========================================

function initScrollAnimations() {
    const cards = document.querySelectorAll('.error-404-link-card');

    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;

        // Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        observer.observe(card);
    });
}

// Animation du numéro 404
const number = document.querySelector('.error-404-number');
if (number) {
    number.style.opacity = '0';
    number.style.transform = 'scale(0.5)';

    setTimeout(() => {
        number.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        number.style.opacity = '1';
        number.style.transform = 'scale(1)';
    }, 200);
}