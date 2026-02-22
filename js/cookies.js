/* ==========================================
   GESTION COOKIES - JAVASCRIPT
   Conformité RGPD
========================================== */

'use strict';

document.addEventListener('DOMContentLoaded', function () {
    console.log('🍪 Système cookies - Initialisation...');
    checkCookieConsent();
    console.log('✅ Système cookies - Prêt');
});

function checkCookieConsent() {
    const consent = getCookie('cookie_consent');
    if (!consent) {
        const currentPage = window.location.pathname;
        const isIndexPage = currentPage === '/' || currentPage === '/index.html' || currentPage.endsWith('/index.html');
        if (isIndexPage) {
            showCookieBanner();
        }
    } else {
        loadCookies(consent);
        const banner = document.getElementById('cookiesBanner');
        if (banner) banner.style.display = 'none';
    }
}

function showCookieBanner() {
    const banner = document.getElementById('cookiesBanner');
    if (banner) {
        banner.style.display = 'block';
        banner.classList.add('show');
    }
}

function hideCookieBanner() {
    const banner = document.getElementById('cookiesBanner');
    if (banner) {
        banner.classList.remove('show');
        setTimeout(() => banner.style.display = 'none', 500);
    }
}

function acceptAllCookies() {
    const consent = { necessary: true, analytics: true, marketing: true, preferences: true };
    setCookie('cookie_consent', JSON.stringify(consent), 365);
    loadCookies(JSON.stringify(consent));
    hideCookieBanner();
    console.log('✅ Tous les cookies acceptés');
}

function refuseAllCookies() {
    const consent = { necessary: true, analytics: false, marketing: false, preferences: false };
    setCookie('cookie_consent', JSON.stringify(consent), 365);
    loadCookies(JSON.stringify(consent));
    hideCookieBanner();
    console.log('❌ Cookies refusés');
}

function openCookieSettings() {
    const modal = document.getElementById('cookiesModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        loadCurrentPreferences();
    }
}

function closeCookieSettings() {
    const modal = document.getElementById('cookiesModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function loadCurrentPreferences() {
    const consent = getCookie('cookie_consent');
    if (consent) {
        try {
            const preferences = JSON.parse(consent);
            if (document.getElementById('cookieAnalytics')) {
                document.getElementById('cookieAnalytics').checked = preferences.analytics || false;
            }
            if (document.getElementById('cookieMarketing')) {
                document.getElementById('cookieMarketing').checked = preferences.marketing || false;
            }
            if (document.getElementById('cookiePreferences')) {
                document.getElementById('cookiePreferences').checked = preferences.preferences || false;
            }
        } catch (e) {
            console.error('Erreur lecture préférences:', e);
        }
    }
}

function savePreferences() {
    const consent = {
        necessary: true,
        analytics: document.getElementById('cookieAnalytics')?.checked || false,
        marketing: document.getElementById('cookieMarketing')?.checked || false,
        preferences: document.getElementById('cookiePreferences')?.checked || false
    };
    setCookie('cookie_consent', JSON.stringify(consent), 365);
    loadCookies(JSON.stringify(consent));
    closeCookieSettings();
    hideCookieBanner();
    console.log('💾 Préférences sauvegardées');
}

function acceptAllFromModal() {
    acceptAllCookies();
    closeCookieSettings();
}

function refuseAllFromModal() {
    refuseAllCookies();
    closeCookieSettings();
}

function loadCookies(consentString) {
    try {
        const consent = JSON.parse(consentString);
        if (consent.analytics) console.log('📊 Analytics activés');
        if (consent.marketing) console.log('📊 Marketing activé');
        if (consent.preferences) console.log('⚙️ Préférences activées');
    } catch (e) {
        console.error('Erreur chargement cookies:', e);
    }
}

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/;SameSite=Lax";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

const cookiesModal = document.getElementById('cookiesModal');
if (cookiesModal) {
    cookiesModal.addEventListener('click', function (e) {
        if (e.target === this) closeCookieSettings();
    });
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeCookieSettings();
});

window.acceptAllCookies = acceptAllCookies;
window.refuseAllCookies = refuseAllCookies;
window.openCookieSettings = openCookieSettings;
window.closeCookieSettings = closeCookieSettings;
window.savePreferences = savePreferences;
window.acceptAllFromModal = acceptAllFromModal;
window.refuseAllFromModal = refuseAllFromModal;