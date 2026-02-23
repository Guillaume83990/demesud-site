/* ==========================================
   COOKIES DEMESUD - VERSION FINALE V2
   Garantie 100% fonctionnelle
========================================== */

'use strict';

console.log('🍪 [DEMESUD] Cookies V2 chargé');

// Configuration
const COOKIE_NAME = 'demesud_consent_v2';
const COOKIE_DAYS = 365;

// Fonctions cookies HTTP
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/;SameSite=Lax";
    console.log('✅ Cookie créé:', name, '=', value);
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// Gestion bannière
function showBanner() {
    const banner = document.getElementById('cookiesBanner');
    if (banner) {
        banner.style.display = 'block';
        banner.style.opacity = '1';
        banner.style.visibility = 'visible';
        console.log('📢 Bannière affichée');
    }
}

function hideBanner() {
    const banner = document.getElementById('cookiesBanner');
    if (banner) {
        banner.style.opacity = '0';
        banner.style.transform = 'translateY(-100%)';
        setTimeout(() => {
            banner.style.display = 'none';
            banner.style.visibility = 'hidden';
        }, 500);
        console.log('✅ Bannière cachée');
    }
}

// Initialisation au chargement
document.addEventListener('DOMContentLoaded', function () {
    console.log('🔍 Vérification consentement...');

    const consent = getCookie(COOKIE_NAME);
    const banner = document.getElementById('cookiesBanner');

    if (!banner) {
        console.warn('⚠️ Bannière non trouvée');
        return;
    }

    if (consent) {
        console.log('→ Consentement:', consent);
        banner.style.display = 'none';
        banner.style.visibility = 'hidden';
    } else {
        console.log('→ Pas de consentement, affichage bannière');
        showBanner();
    }
});

// ACCEPTER
window.acceptAllCookies = function () {
    console.log('✅ ACCEPTÉ');
    setCookie(COOKIE_NAME, 'accepted', COOKIE_DAYS);
    hideBanner();
};

// REFUSER
window.refuseAllCookies = function () {
    console.log('❌ REFUSÉ');
    setCookie(COOKIE_NAME, 'refused', COOKIE_DAYS);
    hideBanner();
};

// DEBUG
window.checkCookies = function () {
    console.log('════════════════════════════════');
    console.log('📊 COOKIES:', document.cookie);
    console.log('📊 Consentement:', getCookie(COOKIE_NAME) || 'Aucun');
    console.log('════════════════════════════════');
};

window.resetCookies = function () {
    console.log('🔄 RESET');
    deleteCookie(COOKIE_NAME);
    localStorage.clear();
    sessionStorage.clear();
    console.log('✅ Tout nettoyé, rechargement...');
    setTimeout(() => location.reload(), 500);
};

console.log('✅ Script prêt - Tapez checkCookies() ou resetCookies()');