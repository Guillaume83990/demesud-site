/* ==========================================
   LOADING CLASS - Désactiver après 500ms
   À mettre EN PREMIER dans le <head>
========================================== */

(function () {
    // Ajouter la classe loading au body
    document.documentElement.className += ' loading';
    if (document.body) {
        document.body.className += ' loading';
    }

    // Retirer après 500ms
    setTimeout(function () {
        document.documentElement.classList.remove('loading');
        if (document.body) {
            document.body.classList.remove('loading');
        }
        console.log('✅ Animations activées');
    }, 500);
})();