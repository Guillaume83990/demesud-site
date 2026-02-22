/* ==========================================
   GESTION COOKIES - JAVASCRIPT
   Conformité RGPD - VERSION CORRIGÉE
========================================== */

'use strict';

// ==========================================
// INITIALISATION
// ==========================================

document.addEventListener('DOMContentLoaded', function () {
    console.log('🍪 Système cookies - Initialisation...');

    // Vérifier le consentement
    checkCookieConsent();

    console.log('✅ Système cookies - Prêt');
});

// ==========================================
// VÉRIFIER LE CONSENTEMENT
// ==========================================

function checkCookieConsent() {
    const consent = getCookie('cookie_consent');

    if (!consent) {
        // Pas de consentement, afficher la bannière UNIQUEMENT sur index.html
        const currentPage = window.location.pathname;
        const isIndexPage = currentPage === '/' || currentPage === '/index.html' || currentPage.endsWith('/index.html');

        if (isIndexPage) {
            showCookieBanner();
        }
    } else {
        // Consentement existant, charger les cookies autorisés
        loadCookies(consent);
        // IMPORTANT : Cacher la bannière si consentement existe
        const banner = document.getElementById('cookiesBanner');
        if (banner) {
            banner.style.display = 'none';
        }
    }
}

// ==========================================
// AFFICHER LA BANNIÈRE
// ==========================================

function showCookieBanner() {
    const banner = document.getElementById('cookiesBanner');
    if (banner) {
        banner.style.display = 'block';
        // Pas de setTimeout pour éviter qu'elle réapparaisse
        banner.classList.add('show');
    }
}

// ==========================================
// MASQUER LA BANNIÈRE
// ==========================================

function hideCookieBanner() {
    const banner = document.getElementById('cookiesBanner');
    if (banner) {
        banner.classList.remove('show');
        setTimeout(() => {
            banner.style.display = 'none';
        }, 500);
    }
}

// ==========================================
// ACCEPTER TOUS LES COOKIES
// ==========================================

function acceptAllCookies() {
    const consent = {
        necessary: true,
        analytics: true,
        marketing: true,
        preferences: true
    };

    // Sauvegarder le consentement
    setCookie('cookie_consent', JSON.stringify(consent), 365);

    // Charger les cookies
    loadCookies(JSON.stringify(consent));

    // Masquer la bannière
    hideCookieBanner();

    console.log('✅ Tous les cookies acceptés');
}

// ==========================================
// REFUSER TOUS LES COOKIES (sauf nécessaires)
// ==========================================

function refuseAllCookies() {
    const consent = {
        necessary: true,
        analytics: false,
        marketing: false,
        preferences: false
    };

    // Sauvegarder le consentement
    setCookie('cookie_consent', JSON.stringify(consent), 365);

    // Charger uniquement les cookies nécessaires
    loadCookies(JSON.stringify(consent));

    // Masquer la bannière
    hideCookieBanner();

    console.log('❌ Cookies refusés (sauf nécessaires)');
}

// ==========================================
// OUVRIR MODAL PRÉFÉRENCES
// ==========================================

function openCookieSettings() {
    const modal = document.getElementById('cookiesModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Charger les préférences actuelles
        loadCurrentPreferences();
    }
}

// ==========================================
// FERMER MODAL PRÉFÉRENCES
// ==========================================

function closeCookieSettings() {
    const modal = document.getElementById('cookiesModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ==========================================
// CHARGER PRÉFÉRENCES ACTUELLES
// ==========================================

function loadCurrentPreferences() {
    const consent = getCookie('cookie_consent');

    if (consent) {
        try {
            const preferences = JSON.parse(consent);

            // Cocher les cases selon les préférences
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

// ==========================================
// SAUVEGARDER PRÉFÉRENCES
// ==========================================

function savePreferences() {
    const consent = {
        necessary: true, // Toujours true
        analytics: document.getElementById('cookieAnalytics')?.checked || false,
        marketing: document.getElementById('cookieMarketing')?.checked || false,
        preferences: document.getElementById('cookiePreferences')?.checked || false
    };

    // Sauvegarder
    setCookie('cookie_consent', JSON.stringify(consent), 365);

    // Charger les cookies selon préférences
    loadCookies(JSON.stringify(consent));

    // Fermer modal
    closeCookieSettings();

    // Masquer bannière
    hideCookieBanner();

    console.log('💾 Préférences sauvegardées:', consent);
}

// ==========================================
// ACCEPTER TOUT DEPUIS MODAL
// ==========================================

function acceptAllFromModal() {
    acceptAllCookies();
    closeCookieSettings();
}

// ==========================================
// REFUSER TOUT DEPUIS MODAL
// ==========================================

function refuseAllFromModal() {
    refuseAllCookies();
    closeCookieSettings();
}

// ==========================================
// CHARGER LES COOKIES AUTORISÉS
// ==========================================

function loadCookies(consentString) {
    try {
        const consent = JSON.parse(consentString);

        // Cookies nécessaires (toujours chargés)
        // Pas de code ici, ils sont déjà actifs

        // Cookies analytics (Google Analytics)
        if (consent.analytics) {
            loadGoogleAnalytics();
        }

        // Cookies marketing
        if (consent.marketing) {
            // Code pour pixels marketing (Facebook, etc.)
            console.log('📊 Cookies marketing chargés');
        }

        // Cookies de préférences
        if (consent.preferences) {
            // Code pour sauvegarder préférences utilisateur
            console.log('⚙️ Cookies préférences chargés');
        }

    } catch (e) {
        console.error('Erreur chargement cookies:', e);
    }
}

// ==========================================
// CHARGER GOOGLE ANALYTICS
// ==========================================

function loadGoogleAnalytics() {
    // À compléter avec votre ID Google Analytics
    // Exemple: G-XXXXXXXXXX

    /*
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
    
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
    document.head.appendChild(script);
    */

    console.log('📊 Google Analytics prêt (à configurer)');
}

// ==========================================
// GESTION COOKIES (GET / SET / DELETE)
// ==========================================

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

function deleteCookie(name) {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
}

// ==========================================
// FERMER MODAL AU CLIC EXTÉRIEUR
// ==========================================

const cookiesModal = document.getElementById('cookiesModal');
if (cookiesModal) {
    cookiesModal.addEventListener('click', function (e) {
        if (e.target === this) {
            closeCookieSettings();
        }
    });
}

// ==========================================
// FERMER MODAL AVEC ESCAPE
// ==========================================

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeCookieSettings();
    }
});

// ==========================================
// EXPOSER LES FONCTIONS GLOBALEMENT
// ==========================================

window.acceptAllCookies = acceptAllCookies;
window.refuseAllCookies = refuseAllCookies;
window.openCookieSettings = openCookieSettings;
window.closeCookieSettings = closeCookieSettings;
window.savePreferences = savePreferences;
window.acceptAllFromModal = acceptAllFromModal;
window.refuseAllFromModal = refuseAllFromModal;

// ==========================================
// LOGS DEBUG
// ==========================================

console.log('🍪 Cookies Manager:');
console.log('  - Bannière:', document.getElementById('cookiesBanner') ? 'Présente' : 'Absente');
console.log('  - Modal:', document.getElementById('cookiesModal') ? 'Présent' : 'Absent');
console.log('  - Consentement actuel:', getCookie('cookie_consent') || 'Aucun');