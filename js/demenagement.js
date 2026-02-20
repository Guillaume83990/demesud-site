// ==========================================
// PAGE DÉMÉNAGEMENT - PREMIUM RELIABLE
// ==========================================

'use strict';

window.addEventListener('load', function () {
    console.log('🌟 Page Déménagement Premium - Initialisation...');

    // Initialisation principale
    initScrollAnimations();
    initCardAnimations();
    initProcessAnimation();
    initGuaranteeCards();
    initCTAButtons();
    initHeroParallax();
    initLazyLoading();
    initSmoothScroll();
    initHeaderScroll();
    initBadgesAnimation();
    initAccessibility();

    console.log('✅ Page Déménagement Premium - Chargée avec succès');
});

// ==========================================
// SCROLL ANIMATIONS
// ==========================================

function initScrollAnimations() {
    const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -80px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                if (entry.target.classList.contains('service-detail-card')) {
                    const cards = document.querySelectorAll('.service-detail-card');
                    const index = Array.from(cards).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.15}s`;
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    function observeElements(selector) {
        document.querySelectorAll(selector).forEach(el => observer.observe(el));
    }

    // Initial observation
    observeElements('.intro-content, .service-detail-card, .process-step, .guarantee-card, .section-head');

    // Observer si éléments ajoutés dynamiquement
    const mutationObserver = new MutationObserver(() => {
        observeElements('.service-detail-card, .process-step, .guarantee-card');
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // Styles animation
    if (!document.getElementById('scroll-animation-style')) {
        const style = document.createElement('style');
        style.id = 'scroll-animation-style';
        style.textContent = `
            .animate-in { animation: fadeInUp 0.8s cubic-bezier(0.4,0,0.2,1) forwards; }
            @keyframes fadeInUp { from { opacity:0; transform:translateY(40px);} to{opacity:1; transform:translateY(0);} }
            .service-detail-card, .process-step, .guarantee-card { opacity:0; }
        `;
        document.head.appendChild(style);
    }
}

// ==========================================
// CARTES DE SERVICE 3D + BUTTON CTA
// ==========================================

function initCardAnimations() {
    const cards = document.querySelectorAll('.service-detail-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', function (e) {
            if (window.innerWidth <= 768) return;
            const rect = this.getBoundingClientRect();
            const deltaX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
            const deltaY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
            this.style.transform = `perspective(1000px) translateY(-10px) rotateX(${deltaY * 3}deg) rotateY(${deltaX * 3}deg)`;
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });

        const btnCard = card.querySelector('.btn-card');
        if (btnCard && !btnCard.querySelector('i')) {
            const icon = document.createElement('i');
            icon.className = 'fas fa-arrow-right';
            icon.style.marginLeft = '8px';
            icon.style.transition = 'transform 0.3s ease';
            btnCard.appendChild(icon);
        }
    });
}

// ==========================================
// PROCESS STEPS ANIMATION
// ==========================================

function initProcessAnimation() {
    const steps = document.querySelectorAll('.process-step');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(steps).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('step-visible');
                    const num = entry.target.querySelector('.step-number');
                    if (num) { num.style.animation = 'pulse 0.6s cubic-bezier(0.4,0,0.2,1)'; animateStepNumber(entry.target); }
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    steps.forEach(step => observer.observe(step));

    // Styles
    if (!document.getElementById('process-style')) {
        const style = document.createElement('style');
        style.id = 'process-style';
        style.textContent = `
            .process-step { opacity:0; transform:translateX(-40px); transition:all 0.7s cubic-bezier(0.4,0,0.2,1);}
            .process-step.step-visible { opacity:1; transform:translateX(0);}
            @keyframes pulse { 0%,100%{transform:scale(1);}50%{transform:scale(1.15);} }
        `;
        document.head.appendChild(style);
    }
}

function animateStepNumber(step) {
    const numberEl = step.querySelector('.step-number');
    if (!numberEl) return;
    const target = parseInt(numberEl.textContent);
    let current = 0;
    const duration = 600;
    const increment = target / (duration / 16);
    const update = () => {
        current += increment;
        numberEl.textContent = current < target ? Math.round(current) : target;
        if (current < target) requestAnimationFrame(update);
    };
    update();
}

// ==========================================
// GARANTIES
// ==========================================

function initGuaranteeCards() {
    const cards = document.querySelectorAll('.guarantee-card');
    cards.forEach((card, i) => {
        const icon = card.querySelector('.guarantee-icon');
        if (icon) icon.style.animationDelay = `${i * 0.2}s`;
        card.addEventListener('mouseenter', () => card.style.borderColor = 'var(--color-orange)');
        card.addEventListener('mouseleave', () => card.style.borderColor = 'rgba(0,0,0,0.05)');
    });
}

// ==========================================
// CTA BUTTONS + RIPPLE
// ==========================================

function initCTAButtons() {
    const buttons = document.querySelectorAll('.btn-card, .btn-cta-primary, .btn-cta-secondary');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            ripple.style.cssText = `
                position:absolute;background:rgba(255,255,255,0.5);border-radius:50%;
                width:100px;height:100px;margin-left:-50px;margin-top:-50px;
                animation:ripple 0.6s ease-out;pointer-events:none;
                left:${e.clientX - rect.left}px; top:${e.clientY - rect.top}px;
            `;
            this.style.position = 'relative'; this.style.overflow = 'hidden';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);

            console.log('📊 CTA clicked:', { text: this.textContent.trim(), href: this.getAttribute('href'), section: this.closest('section')?.className || 'unknown', timestamp: new Date().toISOString() });
        });
    });

    if (!document.getElementById('ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `@keyframes ripple { from{transform:scale(0);opacity:1;} to{transform:scale(4);opacity:0;} }`;
        document.head.appendChild(style);
    }
}

// ==========================================
// HERO PARALLAX
// ==========================================

function initHeroParallax() {
    const hero = document.querySelector('.page-hero');
    const heroBg = hero?.querySelector('.hero-bg');
    if (!hero || !heroBg) return;
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                if (scrolled < hero.offsetHeight) heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
                ticking = false;
            });
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
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            const offset = (document.querySelector('header')?.offsetHeight || 0) + 30;
            window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
        });
    });
}

// ==========================================
// BADGES
// ==========================================

function initBadgesAnimation() {
    const badges = document.querySelectorAll('.card-badge');
    badges.forEach((badge, i) => {
        badge.style.opacity = '0'; badge.style.transform = 'translateY(-20px) rotate(-5deg)';
        setTimeout(() => {
            badge.style.transition = 'all 0.6s cubic-bezier(0.34,1.56,0.64,1)';
            badge.style.opacity = '1'; badge.style.transform = 'translateY(0) rotate(0deg)';
        }, 200 + i * 100);
    });
}

// ==========================================
// LAZY LOADING NATIF
// ==========================================

function initLazyLoading() {
    console.log('✅ Lazy loading activé via loading="lazy" natif');
}

// ==========================================
// HEADER SCROLL HIDE/SHOW
// ==========================================

function initHeaderScroll() {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (!header) return;
        const currentScroll = window.pageYOffset;
        header.style.transform = currentScroll > lastScroll && currentScroll > 100 ? 'translateY(-100%)' : 'translateY(0)';
        lastScroll = currentScroll;
    }, { passive: true });
}

// ==========================================
// ACCESSIBILITÉ
// ==========================================

function initAccessibility() {
    const focusables = document.querySelectorAll('.btn-card, .btn-cta-primary, .btn-cta-secondary, .service-detail-card, a[href]');
    focusables.forEach(el => {
        el.addEventListener('focus', () => { el.style.outline = '3px solid var(--color-orange)'; el.style.outlineOffset = '4px'; el.style.transition = 'outline 0.2s ease'; });
        el.addEventListener('blur', () => { el.style.outline = ''; el.style.outlineOffset = ''; });
    });
}