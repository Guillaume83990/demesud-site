/* ==========================================
   FIX SCROLL MOBILE - JAVASCRIPT
   Désactive les animations au chargement
   Scroll immédiat et fluide
========================================== */

(function () {
    'use strict';

    // ==========================================
    // 1. DÉSACTIVER ANIMATIONS AU CHARGEMENT
    // ==========================================

    // Ajouter classe "no-animations" immédiatement
    document.documentElement.classList.add('no-animations');
    document.body.classList.add('no-animations');

    // Forcer le scroll actif
    document.documentElement.style.overflowY = 'auto';
    document.body.style.overflowY = 'auto';

    // ==========================================
    // 2. SUPPRIMER OBSERVERS PENDANT CHARGEMENT
    // ==========================================

    let originalIntersectionObserver;

    if (window.IntersectionObserver) {
        originalIntersectionObserver = window.IntersectionObserver;

        // Désactiver temporairement IntersectionObserver
        window.IntersectionObserver = function () {
            return {
                observe: function () { },
                unobserve: function () { },
                disconnect: function () { }
            };
        };
    }

    // ==========================================
    // 3. RESTAURER APRÈS CHARGEMENT
    // ==========================================

    window.addEventListener('load', function () {

        // Attendre 1 seconde après le load
        setTimeout(function () {

            // Retirer la classe no-animations
            document.documentElement.classList.remove('no-animations');
            document.body.classList.remove('no-animations');

            // Restaurer IntersectionObserver
            if (originalIntersectionObserver) {
                window.IntersectionObserver = originalIntersectionObserver;
            }

            console.log('✅ Animations réactivées');

        }, 1000);
    });

    // ==========================================
    // 4. FORCER SCROLL SI BLOQUÉ
    // ==========================================

    // Vérifier toutes les 100ms si le scroll est bloqué
    const scrollChecker = setInterval(function () {

        if (document.body.style.overflow === 'hidden' &&
            !document.body.classList.contains('menu-open')) {
            document.body.style.overflowY = 'auto';
        }

        if (document.documentElement.style.overflow === 'hidden') {
            document.documentElement.style.overflowY = 'auto';
        }

    }, 100);

    // Arrêter après 5 secondes
    setTimeout(function () {
        clearInterval(scrollChecker);
    }, 5000);

    // ==========================================
    // 5. DÉSACTIVER SMOOTH SCROLL TEMPORAIREMENT
    // ==========================================

    const originalScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';

    // Restaurer smooth scroll après 2 secondes
    setTimeout(function () {
        document.documentElement.style.scrollBehavior = originalScrollBehavior || 'smooth';
    }, 2000);

    // ==========================================
    // 6. BLOQUER LES ANIMATIONS GSAP/SCROLL
    // ==========================================

    // Si GSAP est présent
    if (window.gsap) {
        window.gsap.globalTimeline.pause();

        setTimeout(function () {
            window.gsap.globalTimeline.resume();
        }, 1500);
    }

    // ==========================================
    // 7. MOBILE UNIQUEMENT
    // ==========================================

    if (window.innerWidth <= 768) {

        // Forcer overflow auto
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';

        // Désactiver tout ce qui peut bloquer
        document.body.style.position = 'relative';
        document.body.style.height = 'auto';

        console.log('📱 Mode mobile - Scroll forcé');
    }

    // ==========================================
    // 8. STATS COUNTER - INSTANT
    // ==========================================

    // Désactiver les compteurs animés temporairement
    const statNumbers = document.querySelectorAll('.stat-number, .stat-value');
    statNumbers.forEach(function (stat) {
        const target = stat.getAttribute('data-target');
        if (target) {
            stat.textContent = target;
        }
    });

})();

// ==========================================
// CSS INLINE POUR NO-ANIMATIONS
// ==========================================

// Ajouter le style inline immédiatement
const style = document.createElement('style');
style.textContent = `
    /* Désactiver TOUTES les animations pendant le chargement */
    .no-animations *,
    .no-animations *::before,
    .no-animations *::after {
        animation: none !important;
        transition: none !important;
        animation-delay: 0s !important;
        transition-delay: 0s !important;
    }
    
    /* Forcer l'affichage immédiat */
    .no-animations [style*="opacity: 0"] {
        opacity: 1 !important;
    }
    
    .no-animations [style*="transform: translateY"] {
        transform: none !important;
    }
    
    /* Stats visibles immédiatement */
    .no-animations .stat-number,
    .no-animations .stat-value {
        opacity: 1 !important;
        transform: none !important;
    }
    
    /* Scroll toujours actif */
    html, body {
        overflow-y: auto !important;
        -webkit-overflow-scrolling: touch !important;
    }
    
    /* Mobile - ultra prioritaire */
    @media (max-width: 768px) {
        html, body {
            overflow-y: auto !important;
            position: relative !important;
            height: auto !important;
        }
        
        body:not(.menu-open) {
            overflow: auto !important;
        }
    }
`;

// Insérer en premier dans le head
if (document.head) {
    document.head.insertBefore(style, document.head.firstChild);
} else {
    document.addEventListener('DOMContentLoaded', function () {
        document.head.insertBefore(style, document.head.firstChild);
    });
}

// ==========================================
// DEBUG - CONSOLE LOGS
// ==========================================

console.log('🚀 Scroll Fix JS - Activé');
console.log('⏱️ Animations désactivées pendant 1 seconde');
console.log('📱 Scroll mobile forcé');