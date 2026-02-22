/* ==========================================
   DEMESUD - MAIN.JS (GLOBAL)
   JavaScript pour TOUT le site
   Inclut: Header, Footer, Cookies, Navigation
========================================== */

'use strict';

// ==========================================
// CHARGEMENT HEADER & FOOTER
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Charger le header
    fetch('header.html')
        .then(res => {
            if (!res.ok) throw new Error('Erreur chargement header');
            return res.text();
        })
        .then(html => {
            document.getElementById('header-placeholder').innerHTML = html;
            initMobileMenu();
            initStickyHeader();
            initActiveNavLink();
            initGoogleTranslate();
            initAccessibility();
        })
        .catch(err => console.error('❌ Erreur header:', err));

    // Charger le footer
    fetch('footer.html')
        .then(res => {
            if (!res.ok) throw new Error('Erreur chargement footer');
            return res.text();
        })
        .then(html => {
            document.getElementById('footer-placeholder').innerHTML = html;
            initFooterYear();
        })
        .catch(err => console.error('❌ Erreur footer:', err));
});

// ==========================================
// MENU MOBILE (BURGER)
// ==========================================

function initMobileMenu() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (!burger || !nav) return;

    burger.addEventListener('click', () => {
        const isActive = burger.classList.toggle('active');
        nav.classList.toggle('active');
        burger.setAttribute('aria-expanded', isActive);
        burger.setAttribute('aria-label', isActive ? 'Fermer le menu' : 'Ouvrir le menu');
        document.body.style.overflow = isActive ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    nav.addEventListener('click', (e) => {
        if (e.target === nav) {
            closeMobileMenu();
        }
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        }, 100);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    function closeMobileMenu() {
        burger.classList.remove('active');
        nav.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-label', 'Ouvrir le menu');
        document.body.style.overflow = '';
    }
}

// ==========================================
// HEADER STICKY
// ==========================================

function initStickyHeader() {
    const header = document.querySelector('.main-header');
    if (!header) return;

    let lastScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;
                if (currentScroll > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                lastScroll = currentScroll;
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ==========================================
// LIEN ACTIF NAVIGATION
// ==========================================

function initActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.remove('active');
        if (href === currentPage ||
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'accueil.html' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ==========================================
// ANNÉE FOOTER
// ==========================================

function initFooterYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ==========================================
// GOOGLE TRANSLATE
// ==========================================

let googleTranslateLoaded = false;

function initGoogleTranslate() {
    if (googleTranslateLoaded) return;

    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    script.onerror = () => console.error('❌ Erreur chargement Google Translate');
    document.head.appendChild(script);

    googleTranslateLoaded = true;
}

function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'fr',
        includedLanguages: 'en,fr',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
    }, 'google_translate_element');

    hideGoogleTranslateToolbar();
    detectCurrentLanguage();
}

function changeLanguage(lang) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    const activeBtn = document.querySelector(`[data-lang="${lang}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }

    if (lang === 'en') {
        triggerGoogleTranslate('fr', 'en');
    } else {
        if (window.location.hash.includes('googtrans')) {
            window.location.href = window.location.pathname;
        }
    }
}

function triggerGoogleTranslate(fromLang, toLang) {
    const selectElement = document.querySelector('.goog-te-combo');
    if (selectElement) {
        selectElement.value = toLang;
        selectElement.dispatchEvent(new Event('change'));
        return;
    }

    window.location.hash = `googtrans(${fromLang}|${toLang})`;

    setTimeout(() => {
        if (toLang === 'en' && !document.body.classList.contains('translated-ltr')) {
            window.location.reload();
        }
    }, 500);
}

function hideGoogleTranslateToolbar() {
    const style = document.createElement('style');
    style.innerHTML = `
        .goog-te-banner-frame.skiptranslate { display: none !important; }
        body { top: 0 !important; }
        .goog-te-balloon-frame { display: none !important; }
        #google_translate_element { display: none !important; }
    `;
    document.head.appendChild(style);

    const checkBanner = setInterval(() => {
        const banner = document.querySelector('.goog-te-banner-frame');
        if (banner) {
            banner.style.display = 'none';
            document.body.style.top = '0';
        }
    }, 100);

    setTimeout(() => clearInterval(checkBanner), 3000);
}

function detectCurrentLanguage() {
    const hash = window.location.hash;
    if (hash.includes('googtrans')) {
        const match = hash.match(/googtrans\([^|]+\|([^)]+)\)/);
        if (match && match[1] === 'en') {
            document.querySelectorAll('.lang-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            document.querySelector('[data-lang="en"]')?.classList.add('active');
            return 'en';
        }
    }
    document.querySelector('[data-lang="fr"]')?.classList.add('active');
    return 'fr';
}

window.googleTranslateElementInit = googleTranslateElementInit;
window.changeLanguage = changeLanguage;

// ==========================================
// ACCESSIBILITÉ
// ==========================================

function initAccessibility() {
    const header = document.querySelector('.main-header');
    if (!header) return;

    const focusableElements = header.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length > 0) {
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        header.addEventListener('keydown', (e) => {
            const nav = document.querySelector('.main-nav');
            if (!nav || !nav.classList.contains('active')) return;

            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                } else if (!e.shiftKey && document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        });
    }
}

// ==========================================
// SMOOTH SCROLL
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || !href) return;

            if (href === '#top') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const burger = document.querySelector('.burger');
                const nav = document.querySelector('.main-nav');
                if (burger && nav && nav.classList.contains('active')) {
                    burger.classList.remove('active');
                    nav.classList.remove('active');
                    burger.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }

                const headerHeight = document.querySelector('.main-header')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ==========================================
// LAZY LOADING IMAGES
// ==========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

console.log('✅ Main.js chargé');