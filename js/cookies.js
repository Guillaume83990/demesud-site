/* ==========================================
   COOKIES - VERSION GARANTIE 100%
   Utilise des vrais cookies HTTP
========================================== */

'use strict';

console.log('🍪 DEMESUD - Version Cookie HTTP');

// Fonctions pour gérer les cookies HTTP
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
    console.log('✅ Cookie créé:', name, '=', value);
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) {
            const value = c.substring(nameEQ.length, c.length);
            console.log('📖 Cookie trouvé:', name, '=', value);
            return value;
        }
    }
    console.log('❌ Cookie non trouvé:', name);
    return null;
}

function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    console.log('🗑️ Cookie supprimé:', name);
}

// Nom du cookie
const COOKIE_NAME = 'demesud_consent';

// Afficher la bannière
function showBanner() {
    const banner = document.getElementById('cookiesBanner');
    if (banner) {
        banner.style.display = 'block';
        banner.style.opacity = '1';
        banner.style.visibility = 'visible';
        banner.style.transform = 'translateY(0)';
        console.log('📢 BANNIÈRE AFFICHÉE');
    } else {
        console.error('❌ Bannière non trouvée dans le DOM !');
    }
}

// Cacher la bannière
function hideBanner() {
    const banner = document.getElementById('cookiesBanner');
    if (banner) {
        banner.style.transform = 'translateY(-100%)';
        banner.style.opacity = '0';
        setTimeout(() => {
            banner.style.display = 'none';
            banner.style.visibility = 'hidden';
        }, 500);
        console.log('✅ BANNIÈRE CACHÉE');
    }
}

// Initialisation
window.addEventListener('load', function () {
    console.log('🔍 Vérification du consentement...');

    const consent = getCookie(COOKIE_NAME);

    if (consent) {
        console.log('→ Consentement trouvé:', consent);
        console.log('→ Bannière reste cachée');

        const banner = document.getElementById('cookiesBanner');
        if (banner) {
            banner.style.display = 'none';
            banner.style.visibility = 'hidden';
        }
    } else {
        console.log('→ Pas de consentement');
        console.log('→ Affichage de la bannière');
        showBanner();
    }
});

// ACCEPTER
window.acceptAllCookies = function () {
    console.log('════════════════════════════════');
    console.log('✅ ACCEPTER CLIQUÉ');
    setCookie(COOKIE_NAME, 'accepted', 365);
    hideBanner();
    console.log('════════════════════════════════');
};

// REFUSER
window.refuseAllCookies = function () {
    console.log('════════════════════════════════');
    console.log('❌ REFUSER CLIQUÉ');
    setCookie(COOKIE_NAME, 'refused', 365);
    hideBanner();
    console.log('════════════════════════════════');
};

// DEBUG - Voir le statut
window.voirCookies = function () {
    console.log('════════════════════════════════');
    console.log('📊 TOUS LES COOKIES:');
    console.log(document.cookie);
    console.log('════════════════════════════════');
    console.log('📊 Cookie Demesud:', getCookie(COOKIE_NAME) || 'Aucun');
    console.log('════════════════════════════════');
};

// DEBUG - Réinitialiser
window.resetTout = function () {
    console.log('🔄 RESET COMPLET');
    deleteCookie(COOKIE_NAME);

    // Nettoyer aussi localStorage au cas où
    try {
        localStorage.clear();
        console.log('✅ localStorage vidé');
    } catch (e) { }

    console.log('✅ Rechargement...');
    setTimeout(() => location.reload(), 500);
};

console.log('✅ Script prêt');
console.log('💡 Tapez: voirCookies() ou resetTout()');