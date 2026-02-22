/* ==========================================
   GESTION COOKIES RGPD - VERSION FINALE
   Sauvegarde du choix + Fonctionne parfaitement
========================================== */

'use strict';

console.log('🍪 Cookies script chargé');

// Variable globale pour éviter les doubles exécutions
let cookiesInitialized = false;

// Initialisation au chargement complet de la page
window.addEventListener('load', function () {
    if (cookiesInitialized) return;
    cookiesInitialized = true;

    console.log('🍪 Initialisation cookies...');

    const banner = document.getElementById('cookiesBanner');
    if (!banner) {
        console.warn('⚠️ Bannière cookies non trouvée');
        return;
    }

    // Vérifier le consentement
    let cookiesConsent = null;
    try {
        cookiesConsent = localStorage.getItem('cookiesConsent');
    } catch (e) {
        console.log('localStorage non accessible');
    }

    if (cookiesConsent === null) {
        // AUCUN CHOIX = AFFICHER LA BANNIÈRE
        console.log('→ Pas de consentement enregistré');
        console.log('📢 Bannière visible et en attente de votre choix');
        banner.style.display = 'block';
        banner.style.opacity = '1';
        banner.style.transform = 'translateY(0)';
    } else {
        // CHOIX DÉJÀ FAIT = CACHER
        console.log('→ Consentement déjà enregistré:', cookiesConsent);
        console.log('✓ Bannière masquée');
        banner.style.display = 'none';

        // Activer Analytics si accepté
        if (cookiesConsent === 'accepted') {
            enableAnalytics();
        }
    }
});

// Fonction ACCEPTER
window.acceptAllCookies = function () {
    console.log('✅ COOKIES ACCEPTÉS');

    const banner = document.getElementById('cookiesBanner');
    if (banner) {
        // Animation de sortie
        banner.style.transform = 'translateY(-100%)';
        banner.style.opacity = '0';

        setTimeout(function () {
            banner.style.display = 'none';
        }, 500);
    }

    // Sauvegarder le choix
    try {
        localStorage.setItem('cookiesConsent', 'accepted');
        console.log('💾 Choix sauvegardé: accepted');
    } catch (e) {
        console.error('Erreur sauvegarde:', e);
    }

    // Activer Analytics
    enableAnalytics();
};

// Fonction REFUSER
window.refuseAllCookies = function () {
    console.log('❌ COOKIES REFUSÉS');

    const banner = document.getElementById('cookiesBanner');
    if (banner) {
        // Animation de sortie
        banner.style.transform = 'translateY(-100%)';
        banner.style.opacity = '0';

        setTimeout(function () {
            banner.style.display = 'none';
        }, 500);
    }

    // Sauvegarder le choix
    try {
        localStorage.setItem('cookiesConsent', 'refused');
        console.log('💾 Choix sauvegardé: refused');
    } catch (e) {
        console.error('Erreur sauvegarde:', e);
    }

    // Désactiver Analytics
    disableAnalytics();
};

// Activer Google Analytics (à personnaliser)
function enableAnalytics() {
    console.log('📊 Analytics activé');
    // Ajoutez ici votre code Google Analytics
    // Exemple:
    // window.dataLayer = window.dataLayer || [];
    // function gtag(){dataLayer.push(arguments);}
    // gtag('js', new Date());
    // gtag('config', 'GA_MEASUREMENT_ID');
}

// Désactiver Analytics
function disableAnalytics() {
    console.log('📊 Analytics désactivé');
    // Ajoutez ici le code pour désactiver GA si nécessaire
}

// FONCTION DE DEBUG - Réinitialiser le consentement
window.resetCookiesConsent = function () {
    console.log('🔄 RÉINITIALISATION DU CONSENTEMENT');
    try {
        localStorage.removeItem('cookiesConsent');
        console.log('✓ Consentement supprimé');
    } catch (e) {
        console.error('Erreur:', e);
    }
    location.reload();
};

// FONCTION DE DEBUG - Voir le statut actuel
window.checkCookiesStatus = function () {
    try {
        const status = localStorage.getItem('cookiesConsent');
        console.log('📊 Statut actuel:', status || 'Aucun choix');
        return status;
    } catch (e) {
        console.error('Erreur:', e);
        return null;
    }
};

console.log('✅ Fonctions cookies prêtes');
console.log('💡 Pour tester: tapez resetCookiesConsent() dans la console');