//                 HEADERS & FOOTER COMMUN POUR TOUTES LES PAGES
/**
 * DÉTECTION DE LA PAGE ACTIVE : Applique la classe 'active' sur le lien de la page en cours.
 * Cette fonction s'exécute uniquement après l'injection du header.
 */
const highlightActiveLink = () => {

    const currentPage = window.location.pathname.split('/').pop();

    // 2. Sélection de tous les liens de navigation.
    const navLinks = document.querySelectorAll('.nav-link');

    // 3. Boucle et applique la classe 'active'.
    navLinks.forEach((link) => {
        const linkPage = link.getAttribute('href');

        // Si le chemin du lien correspond à la page actuelle.
        if (currentPage === linkPage) {
            link.classList.add('active'); // Ajout de la classe qui rend le lien actif
        } else {
            // (Airbnb: pas de ligne vide avant le bloc 'else')
            link.classList.remove('active'); // S'assurer que les autres liens ne sont pas actifs
        }
    });
};

/**
 * Fonction utilitaire pour charger un fichier HTML externe et l'injecter dans un élément du DOM.
 * @param {string} targetId - L'ID de l'élément cible ('header' et 'footer')
 * @param {string} filePath - Le chemin du fichier HTML à charger 
 */
const loadAndInject = async (targetId, filePath) => {
    try {
        // On récupère le fichier HTML.
        const response = await fetch(filePath);

        // Si la réponse renvoie une erreur HTTP, on la capte pour la gestion d'erreurs.
        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status} pour le fichier : ${filePath}`);
        }

        // On convertit le contenu en texte (HTML brut).
        const html = await response.text();

        // On insère le HTML dans l'élément correspondant (via son ID).
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.innerHTML = html;

            // Exécuter la détection de la page active après injection du header.
            if (targetId === 'header') {
                highlightActiveLink();
            }
        } else {
            // (Airbnb: Affichage de l'erreur si l'ID cible n'est pas trouvé)
            console.error(`Cible DOM non trouvée avec l'ID : ${targetId}`);
        }
    } catch (error) {
        // Si une erreur survient (réseau, 404, etc.), on l'affiche clairement.
        console.error(`⚠️ Impossible de charger '${filePath}' :`, error);
    }
};

// DÉMARRAGE DE L'INJECTION QUAND LE DOM EST PRÊT
// (Exécuté dès que le navigateur a analysé le HTML)
document.addEventListener('DOMContentLoaded', () => {

    // Injection de l'En-tête (Header)
    loadAndInject('header', './header.html');

    // Injection du Pied de page (Footer)
    loadAndInject('footer', './footer.html');
}); 
