
/* =========================================================================
   1. FONCTION GÉNÉRIQUE (DRY) : GESTION DES CLICS ET ALERTES
   ========================================================================= */

function handleButtonClick(event, fieldIds, alerteId, successHtml, errorHtml, timerDuration = 6000) {

    event.preventDefault(); // Stoppe l'action par défaut du bouton

    const alerteContainer = document.getElementById(alerteId);
    let allFieldsAreFilled = true;

    //  Validation des champs
    fieldIds.forEach(id => {
        const inputField = document.getElementById(id);
        if (!inputField || inputField.value.trim() === '') {
            allFieldsAreFilled = false;
        }
    });

    // Logique d'affichage
    if (alerteContainer) {
        // Efface tout ancien timer et masque l'alerte pour repartir à zéro
        alerteContainer.classList.add('d-none');
        clearTimeout(alerteContainer.timer);

        if (allFieldsAreFilled) {
            //  Succès
            alerteContainer.classList.remove('alert-warning', 'd-none');
            alerteContainer.classList.add('alert-success');
            alerteContainer.innerHTML = successHtml;

            // Ajout du timer pour effacer l'alerte après le délai
            alerteContainer.timer = setTimeout(() => {
                alerteContainer.classList.add('d-none');
                alerteContainer.innerHTML = '';
            }, timerDuration);

        } else {
            //  Erreur
            alerteContainer.classList.remove('alert-success', 'd-none');
            alerteContainer.classList.add('alert-warning');
            alerteContainer.innerHTML = errorHtml;
            // L'alerte d'erreur reste visible pour que l'utilisateur la lise
        }
    }
}



/* =========================================================================
   2. LOGIQUE SPÉCIFIQUE (ÉCOUTEURS D'ÉVÉNEMENT)
   ========================================================================= */

document.addEventListener('DOMContentLoaded', function () {

    // --- APPEL BOUTON 1 : MOT DE PASSE OUBLIÉ (Page Connection) ---
    const mdpSuccess = '<h4 class="alert-heading">Merci!</h4><p>Nous avons bien reçu votre demande. Si l’adresse mail saisie est associée à un compte chez nous, vous recevrez un email avec un lien de réinitialisation dans les prochaines minutes.</p>';
    const mdpError = '<h4 class="alert-heading">Erreur</h4><p>Veuillez saisir votre email.</p>';

    const mdpBtn = document.getElementById('mdpoublieBtn');

    if (mdpBtn) {
        mdpBtn.addEventListener('click', function (event) {
            handleButtonClick(
                event,
                ['exampleFormControlInput1'],
                'mdpAlerteMessage',
                mdpSuccess,
                mdpError
            );
        });
    }


    // --- APPEL BOUTON  : SE CONNECTER (Page Connection) ---
    const connSuccess = '<h4 class="alert-heading">Connexion Réussie!</h4><p>Bienvenue sur votre compte !</p>';
    const connError = '<h4 class="alert-heading">Erreur</h4><p>Veuillez remplir l\'email ET le mot de passe.</p>';

    const connexionBtn = document.getElementById('seconnecterBtn');

    if (connexionBtn) {
        connexionBtn.addEventListener('click', function (event) {
            handleButtonClick(
                event,
                ['exampleFormControlInput1', 'inputPassword6'],
                'connexionAlerteMessage',
                connSuccess,
                connError
            );
        });
    }


    // --- APPEL BOUTON  : ENVOYER (Page Créer un compte) ---
    const creationSuccess = '<h4 class="alert-heading">Bienvenue chez Vite & Gourmand! 👨‍🍳</h4><p>Votre compte a bien été créé. Un email de confirmation vous attend dans votre boîte de réception pour finaliser votre inscription.</p>';
    const creationError = '<h4 class="alert-heading">Champs manquants</h4><p>Veuillez remplir TOUS les champs. Merci.</p>';

    const creationBtn = document.getElementById('liveAlertBtnCreation');

    if (creationBtn) {
        creationBtn.addEventListener('click', function (event) {
            handleButtonClick(
                event,
                // Vérification de tous les champs essentiels pour l'inscription :
                ['formulairecreationnom', 'formulairecreationprenom', 'exampleFormControlInput1', 'formulairecreationtelephone', 'formulairecreationadresse', 'mdpcreation'],
                'alerteCreationCompteMessage',
                creationSuccess,
                creationError
            );
        });
    };


    // --- APPEL BOUTON  : ENVOYER (Page Nous Contacter) ---
    const contactSuccess = '<h4 class="alert-heading">🍰 Message bien reçu !</h4><p>Notre équipe mijote déjà une réponse à votre demande. À très vite. Julie & José.</p>';
    const contactError = '<h4 class="alert-heading">Champs manquants</h4><p>Veuillez remplir TOUS les champs. Merci.</p>';

    const contactBtn = document.getElementById('liveAlertBtn');

    if (contactBtn) {
        contactBtn.addEventListener('click', function (event) {
            handleButtonClick(
                event,
                ['formulairecontactsujet', 'formulairecontactmessage'],
                'alerteContactMessage',
                contactSuccess,
                contactError
            );
        });
    }
});


// ------------------------------------- PAGE INTRO -------------------------------------

// =========================================================
// ANIMATION CANVAS - Effet bulles sur la page d'introduction
// =========================================================

// On récupère l’élément <canvas> dans la page
// → Si la page actuelle ne contient pas ce canvas, la variable sera "null"
const canvas = document.getElementById("introCanvas");

// On vérifie que le canvas existe AVANT d'exécuter l'animation
// → Cela empêche l'erreur "canvas is null" sur les autres pages du site
if (canvas) {

    // Contexte 2D pour pouvoir dessiner dans le canvas
    const ctx = canvas.getContext("2d");

    // Le canvas prend la taille complète de la fenêtre
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Si la fenêtre est redimensionnée, on adapte automatiquement la taille du canvas
    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Tableau qui contiendra toutes les bulles / particules de l'animation
    const particles = [];

    // ----------------------------------------------------------
    // CLASS PARTICLE : définit ce qu'est une bulle à l'écran
    // ----------------------------------------------------------
    class Particle {
        constructor() {
            // Position horizontale aléatoire
            this.x = Math.random() * canvas.width;

            // Position verticale : en bas de l'écran (pour monter vers le haut)
            this.y = canvas.height + 10;

            // Taille de la particule (entre 1 et 5px environ)
            this.size = Math.random() * 4 + 1;

            // Vitesse de montée
            this.speed = Math.random() * 1 + 0.3;

            // Transparence (permet un effet subtil et réaliste)
            this.opacity = Math.random() * 0.4 + 0.1;
        }

        // Mise à jour de la position (la particule monte)
        update() {
            this.y -= this.speed;
        }

        // Dessine la particule dans le canvas
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

            // Couleur dorée style "bulles de champagne" avec transparence
            ctx.fillStyle = `rgba(255, 215, 0, ${this.opacity})`;
            ctx.fill();
        }
    }

    // ----------------------------------------------------------
    // Fonction d'animation (boucle infinie)
    // ----------------------------------------------------------
    function animate() {
        // Efface l'écran pour éviter les traînées
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // On crée une nouvelle particule tant qu'on n’a pas atteint 80 bulles
        if (particles.length < 80) {
            particles.push(new Particle());
        }

        // Mise à jour + affichage des particules
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.update();
            p.draw();

            // Si la particule sort de l'écran → on la supprime du tableau
            if (p.y < -10) {
                particles.splice(i, 1);
                i--;
            }
        }

        // On relance l'animation à la prochaine frame
        requestAnimationFrame(animate);
    }

    // Démarrage de l’animation
    animate();
}


// ------------------------------------- PAGE NOS MENUS -------------------------------------

// ----------------------------------------------------------
// FILTRE
// ----------------------------------------------------------

(function () {

    const filtres = {
        prixMax: document.getElementById('prixMax'),
        fourchette: document.getElementById('fourchettePrix'),
        theme: document.getElementById('theme'),
        regime: document.getElementById('regime'),
        personnes: document.getElementById('nbPersonnes')
    };

    function getCards() {
        return Array.from(document.querySelectorAll('.carte-menu'));
    }

    function filtrer() {
        const cartes = getCards();
        const conditions = [
            card => !filtres.prixMax.value || Number(card.dataset.prix) <= Number(filtres.prixMax.value),
            card => {
                if (!filtres.fourchette.value) return true;
                const [min, max] = filtres.fourchette.value.split('-').map(Number);
                return Number(card.dataset.prix) >= min && Number(card.dataset.prix) <= max;
            },
            card => !filtres.theme.value || card.dataset.theme === filtres.theme.value,
            card => !filtres.regime.value || card.dataset.regime === filtres.regime.value,
            card => !filtres.personnes.value || Number(card.dataset.personnes) >= Number(filtres.personnes.value)
        ];

        let visibles = 0;
        cartes.forEach(card => {
            const afficher = conditions.every(cond => cond(card));
            card.style.display = afficher ? "block" : "none";
            if (afficher) visibles++;
        });

        const info = document.querySelector('.info-result');
        info.textContent = visibles === 0
            ? "Aucun menu ne correspond aux filtres."
            : "";
    }

    Object.values(filtres).forEach(input => {
        if (input) {  // Vérifie que l'élément existe avant d'ajouter un listener
            input.addEventListener('change', filtrer);
            input.addEventListener('input', filtrer);
        }
    });


})();

/* ============================================================
   DATA MENUS COMPLET
============================================================ */


/* ============================
   0) SÉLECTEURS GLOBAUX (HEADER/FOOTER) pour enlever lors du detail menus
============================ */
const headerEl = document.querySelector("header");
const footerEl = document.querySelector("#footer");

/* --------------------------
   1) DONNÉES (TOUS LES MENUS)
--------------------------- */
const menus = [
    /* ========== THEMES ========== */
    {
        id: "noel",
        categorie: "themes",
        titre: "Menu de Noël 🎄",
        description:
            "Plongez dans la magie des fêtes avec un menu raffiné qui met à l'honneur les saveurs authentiques de Noël. Ce repas allie générosité, convivialité et finesse pour un réveillon inoubliable.",
        img: "images/photos/menu noel.jpg", /* image menu noel page globale */
        min: 10,
        prix: "44,90€ TTC / Pers",
        promoOffset: 5,
        delai: 6,
        promo: {
            remise: 10,
            seuil: 15
        },
        consignes:
            "À conserver entre 0°C et 4°C. DLC à consommer 72h après réception.",
        menuDetails: {
            "Classique 🥩": {
                entree: "Foie gras de canard, chutney de figues et pain brioché toasté",
                plat: "Filet de chapon rôti aux morilles, gratin dauphinois et fagot de haricots verts",
                dessert: "Bûche de Noël traditionnelle au chocolat et éclats de noisette",
                images: [
                    "images/photos/foie gras.jpg",
                    "images/photos/dinde noel.jpg",
                    "images/photos/buche noel 2.jpg"
                ],
                allergenes: ["Lait", "Œufs", "Gluten", "Fruits à coque", "Arachides", "Sésame", "Sulfites", "Céleri"],
                stock: 42
            },
            "Végane 🥕": {
                entree: "Cappuccino de potimarron au lait d’amande, éclats de châtaignes grillées",
                plat: "Rôti de seitan farci aux légumes et aux herbes, gratin de patate douce et panais",
                dessert: "Bûche glacée coco – chocolat – noisette (sans produits laitiers ni œufs)",
                images: [
                    "images/photos/entree noel végane.jpg",
                    "images/photos/plat noel vegane.jpg",
                    "images/photos/buche noel 2.jpg"
                ],
                allergenes: ["Fruits à coque", "Soja", "Gluten", "Lait (traces)", "Fruits rouges"],
                stock: 26
            },
            "Végétarienne 🌿": {
                entree: "Velouté de panais et poire, crème fouettée au bleu d’Auvergne et noix caramélisées",
                plat: "Wellington de légumes d’hiver en croûte feuilletée, purée de céleri et sauce aux herbes",
                dessert: "Bûche roulée vanille – fruits rouges – mascarpone",
                images: [
                    "images/photos/entree noel vegetarien.jpg",
                    "images/photos/plat noel vegetarien.jpg",
                    "images/photos/dessert noel vegetarien.jpg"
                ],
                allergenes: ["Lait", "Œufs", "Fruits à coque", "Céleri"],
                stock: 35
            }
        }
    },

    {
        id: "st-valentin",
        categorie: "themes",
        titre: "Menu St Valentin ❤️",
        description:
            "Un menu raffiné aux saveurs délicates. Une parenthèse romantique où chaque bouchée mêle tendresse, émotion et gourmandise partagée.",
        img: "images/photos/photo menu st valentin.jpg", /* image menu st valentin page globale 
        */
        min: 2,
        prix: "39,99€ TTC / Pers",
        delai: 7,
        promo: {
            remise: 10,
            seuil: 7
        },
        consignes: "À consommer le jour même. À conserver entre 0°C et 4°C.",
        menuDetails: {
            "Classique 🥩": {
                entree: "Tartare de saumon frais, mangue et avocat, citron vert et baies roses",
                plat: "Filet de bœuf sauce au vin rouge et échalotes confites, écrasé de pommes de terre à la truffe et légumes croquants",
                dessert: "Cœur fondant au chocolat noir, coulis de fruits rouges et éclats de noisettes caramélisées",
                images: [
                    "images/photos/entree st valentin.jpg",
                    "images/photos/plat saint valentin.jpg",
                    "images/photos/dessert st valentin.jpg"
                ],
                allergenes: ["Lait", "poisson", "Œufs", "Fruits à coque", "Sulfites", "céleri", "soja"],
                stock: 0 /* RUPTURE DE STOCK */
            }
        }
    },

    {
        id: "halloween",
        categorie: "themes",
        titre: "Menu Halloween 🎃",
        description: "Un menu d’Halloween aux saveurs ensorcelantes. Une parenthèse gourmande entre douceur, frisson et réconfort d’automne.",
        img: "images/photos/photo présentation menu halloween.jpg", /* image menu halloween page globale */
        min: 8,
        prix: "19,99€ TTC / Pers",
        delai: 8,
        promo: {
            remise: 10,
            seuil: 13
        },
        consignes: "À consommer le jour même. A conserver entre 0°C et 4°C.",
        menuDetails: {
            "Classique 🥩": { entree: "Velouté de potimarron et éclats de châtaigne", plat: "Poulet rôti aux herbes d’automne, purée de patate douce", dessert: "Mousse au chocolat noir et coulis de fruits rouges", images: ["images/photos/entree halloween.jpg", "images/photos/plat halloween.jpg", "images/photos/dessert halloween.jpg"], allergenes: ["Lait", "Fruits à coque", "oeufs", "soja", "sulfites"], stock: 40 },
            "Végane 🥕": { entree: "Velouté de courge butternut au lait de coco et éclats de graines de courge grillées", plat: "Parmentier de lentilles corail et patate douce, parfumé au thym et romarin", dessert: "Mousse au chocolat noir végan (tofu soyeux et chocolat 70%), coulis de fruits rouges et crumble d’amandes", images: ["images/photos/entree halloween vegane.jpg", "images/photos/plat halloween vegane.jpg", "images/photos/dessert halloween vegane.jpg"], allergenes: ["Fruits à coque", "Soja"], stock: 32 },
            "Végétarienne 🌿": { entree: " Cappuccino de potimarron, crème légère au parmesan et noisettes torréfiées", plat: "Feuilleté croustillant aux champignons, épinards et ricotta, accompagné d’un gratin de patate douce et châtaignes", dessert: "Tartelette au chocolat noir et potiron, chantilly à la vanille", images: ["images/photos/entree halloween vegetarien.jpg", "images/photos/plat halloween vegetarien.jpg", "images/photos/dessert halloween vegetarien.jpg"], allergenes: ["Lait", "Gluten", "Fruits à coque", "Oeufs"], stock: 24 }
        }
    },

    {
        id: "paques",
        categorie: "themes",
        titre: "Menu de Pâques 🐰",
        description: "Un menu printanier aux saveurs délicates. Une parenthèse gourmande qui célèbre la renaissance des saveurs, entre fraîcheur, douceur et convivialité.",
        img: "images/photos/photo menu pâques.jpg", /* image menu de Pâques page globale */
        min: 6,
        prix: "29,99€ TTC / Pers",
        delai: 7,
        promo: {
            remise: 10,
            seuil: 11
        },
        consignes: "Conserver au frais. À consommer le jour même.",
        menuDetails: {
            "Classique 🥩 ": {
                entree: "Œuf mollet sur son lit d’asperges vertes, copeaux de parmesan et vinaigrette au citron", plat: "Gigot d’agneau rôti au romarin, flageolets et gratin dauphinois", dessert: "Nid de Pâques au chocolat et praliné, génoise moelleuse et éclats de noisette", images: ["images/photos/entree paques.jpg", "images/photos/plat paques.jpg", "images/photos/dessert paques.jpg"], allergenes: ["Œufs", "Lait", "Fruits à coque", "Gluten"], stock: 29
            }
        }
    },

    /* ========== QUOTIDIEN ========== */
    {
        id: "bordelais",
        categorie: "quotidien",
        titre: "Menu Bordelais 🍷",
        description: "Un voyage gourmand au cœur du Sud-Ouest. Une parenthèse culinaire qui célèbre l’élégance et l’authenticité des saveurs bordelaises, entre richesse, finesse et convivialité autour de la table.",
        img: "images/photos/entree menu bordelais.jpg", /* image menu Bordelais page globale */
        min: 4,
        prix: "29,99€ TTC / Pers",
        delai: 6,
        promo: {
            remise: 10,
            seuil: 9
        },
        consignes: "Conserver au frais. DLC à consommer 72h après réception.",
        menuDetails: {
            "Classique 🥩": { entree: "Foie Gras de Canard servi avec son chutney de figues et toast brioché", plat: "Confit de Canard accompagné de pommes de terre sarladaises et légumes de saison", dessert: "Canelés Bordelais", images: ["images/photos/entree menu bordelais.jpg", "images/photos/plat menu bordelais.jpg", "images/photos/dessert menu bordelais.jpg"], allergenes: ["Sulfites"], stock: 37 }
        }
    },
    {
        id: "bassin",
        categorie: "quotidien",
        titre: "Menu du Bassin 🦪",
        description: "Une escapade iodée au cœur du Bassin d’Arcachon, entre embruns et douceur. Un menu qui célèbre la mer, la convivialité et les plaisirs simples du littoral.",
        img: "images/photos/huitres.jpg", /* Image menu du Bassin page globale */
        min: 4,
        prix: "39,99€ TTC / Pers",
        delai: 7,
        promo: {
            remise: 10,
            seuil: 9
        },
        consignes: "Conserver au frais : 0 à 2°C recommandé. DLC à consommer 24h après réception.",
        menuDetails: {
            "Classique 🥩": {
                entree: "Huîtres du Bassin avec citron et pain de seigle. ", plat: "Moules marinières servies avec frites croustillantes.", dessert: "Fraises fraîches, chantilly légère et sucre vanillé.", images: ["images/photos/huitres.jpg", "images/photos/plat menu du Bassin.jpg", "images/photos/dessert menu bassin.jpg"], allergenes: ["Mollusques", "Gluten", "Sulfites", "Lait"], stock: 32
            }
        }
    },

    /* ========== EVENEMENTS ========== */
    {
        id: "anniversaire",
        categorie: "evenements",
        titre: "Menu Anniversaire 🎉",
        description: "Un moment de fête et de partage. Un menu raffiné pour célébrer cette journée d’exception avec douceur et convivialité.",
        img: "images/photos/menu anniversaire.jpg", /* Image menu anniversaire page globale */
        min: 15,
        prix: "39,99€ TTC / Pers",
        delai: 15,
        consignes: "À conserver entre 0°C et 4°C. DLC à consommer 24h après réception.",
        menuDetails: {
            "Classique 🥩": { entree: "Tartare de Saumon et Avocat assaisonné au citron vert", plat: "Filet de Bœuf Sauce Morilles servi avec gratin dauphinois", dessert: "Gâteau au Chocolat et Crème Vanille", images: ["images/photos/entree anniversaire.jpg", "images/photos/plat menu anniversaire.jpg", "images/photos/dessert menu anniversaire.jpg"], allergenes: ["Poisson", "Lait", "Gluten", "Œufs", "Sulfites"], stock: 35 }
        }
    },
    {
        id: "bapteme",
        categorie: "evenements",
        titre: "Menu Baptême 🕊️",
        description: "Un moment tendre et convivial. Un menu raffiné pour célébrer ce jour unique avec douceur, partage et convivialité.",
        img: "images/photos/menu bapteme.jpg",
        min: 15,
        prix: "39,99€ TTC / Pers",
        delai: 15,
        consignes: "À consommer dès réception. À conserver entre 0°C et 4°C",
        menuDetails: {
            "Classique 🥩": { entree: "Velouté de Légumes de Saison", plat: "Poulet Rôti, Légumes et Pommes de Terre Fondantes", dessert: "Entremets Vanille & Fruits Rouges", images: ["images/photos/entree halloween vegetarien.jpg", "images/photos/plat bapteme.jpg", "images/photos/dessert baptême.jpg"], allergenes: ["Lait", "Œufs", "Gluten", "Fruits à coque (possible selon entremets)", "Céleri (possible dans le velouté)"], stock: 29 }
        }
    },
    {
        id: "mariage",
        categorie: "evenements",
        titre: "Menu Mariage 💍",
        description: "Une célébration d’amour et de partage . Un menu raffiné qui unit élégance et émotion, pour sublimer cette journée unique placée sous le signe du bonheur et de la gourmandise.",
        img: "images/photos/menu mariage.jpg",
        min: 20,
        prix: "59,99€ TTC / Pers",
        delai: 20,
        consignes: "À consommer dès réception. À conserver entre 0°C et 4°C",
        menuDetails: {
            "Classique 🥩": { entree: "Foie gras de canard, chutney de figues et pain brioché toasté", plat: "Dos de saumon rôti, Légumes Confits et Sauce au Beurre Blanc", dessert: "Gâteau Vanille & Fruits Rouges", images: ["images/photos/menu bordelais.jpg", "images/photos/plat menu mariage.jpg", "images/photos/dessert mariage.jpg"], allergenes: ["Poisson", "Lait", "Œufs", "Gluten", "Sulfites"], stock: 46 }
        }
    },
    {
        id: "seminaire",
        categorie: "evenements",
        titre: "Menu Séminaire 📋",
        description: "Un moment d’échange et de partage. Un menu raffiné qui allie gourmandise et praticité, pour nourrir autant les papilles que les discussions professionnelles.",
        img: "images/photos/menu séminaire.jpg",
        min: 8,
        prix: "29,99€ TTC / Pers",
        delai: 8,
        consignes: "À conserver entre 0°C et 4°C. DLC à consommer 24h après réception.",
        menuDetails: {
            "Classique 🥩": { entree: "Tartare de Saumon et Avocat assaisonné au citron vert", plat: "Pavé de Saumon rôti, Riz Parfumé et Légumes Croquants", dessert: "Gâteau au Chocolat et Crème Vanille", images: ["images/photos/entrée menu séminaire.jpg", "images/photos/plat menu mariage.jpg", "images/photos/dessert menu anniversaire.jpg"], allergenes: ["Poisson", "Lait", "Œufs", "Gluten", "Soja (possible dans le chocolat)"], stock: 20 }
        }
    }
];


/* --------------------------
   1) DONNÉES (TOUS LES MENUS)
--------------------------- */

document.addEventListener("DOMContentLoaded", () => {

    /* ============================
       RÉFÉRENCES DOM
    ============================ */
    const sectionThemes = document.getElementById("section-themes");
    const sectionQuotidien = document.getElementById("section-quotidien");
    const sectionEvenements = document.getElementById("section-evenements");

    const modal = document.getElementById("menu-detail");
    const closeBtn = document.getElementById("close-detail");

    const carouselImg = document.getElementById("carousel-img");
    const carouselPrev = document.getElementById("carousel-prev");
    const carouselNext = document.getElementById("carousel-next");
    const carouselIndicators = document.getElementById("carousel-indicators");

    const detailTitle = document.getElementById("detail-title");
    const detailDescription = document.getElementById("detail-description");
    const detailVersions = document.getElementById("detail-versions");
    const detailEntree = document.getElementById("detail-entree");
    const detailPlat = document.getElementById("detail-plat");
    const detailDessert = document.getElementById("detail-dessert");
    const detailAllergenes = document.getElementById("detail-allergenes");
    const detailConsignes = document.getElementById("detail-consignes");
    const detailInfosContainer = document.getElementById("detail-infos");
    const orderBtn = document.getElementById("order-btn");

    const filterPrixMax = document.getElementById("prixMax");
    const filterFourchette = document.getElementById("fourchettePrix");
    const filterTheme = document.getElementById("theme");
    const filterRegime = document.getElementById("regime");
    const filterNbPers = document.getElementById("nbPersonnes");
    const resetBtn = document.getElementById("resetFilters");

    /* ============================
       ÉTAT GLOBAL
    ============================ */
    let currentMenu = null;
    let currentVersion = null;
    let currentImageIndex = 0;

    /* ============================
       UTILITAIRES
    ============================ */
    function resolveImage(src, label = "IMAGE") {
        return src && src.trim() ? src : `https://via.placeholder.com/800x500?text=${encodeURIComponent(label)}`;
    }

    function parsePriceToNumber(priceRaw) {
        if (!priceRaw) return 0;
        const match = priceRaw.match(/[\d.,]+/);
        return match ? parseFloat(match[0].replace(",", ".")) : 0;
    }

    function getRegimeEmoji() {
        if (!filterRegime || !filterRegime.options || filterRegime.options.length === 0) return "";
        const selectedOption = filterRegime.options[filterRegime.selectedIndex];
        if (!selectedOption) return "";
        const emoji = (selectedOption.textContent || "").trim().split(" ")[0];
        return (emoji === "Régime" || emoji === "") ? "" : emoji;
    }

    /* ============================
       CRÉER CARTE MENU
    ============================ */
    function createCard(menu) {
        const el = document.createElement("article");
        el.className = "menu-card";
        el.innerHTML = `
            <img class="menu-img" src="${resolveImage(menu.img, menu.titre)}" alt="${menu.titre}">
            <div class="menu-content">
                <h3 class="menu-title">${menu.titre}</h3>
                <p class="menu-desc">${menu.description || ""}</p>
                <p class="menu-info">Minimum : ${menu.min || 1} pers</p>
                <p class="menu-info">Prix : ${menu.prix || "NC"}</p>
                <div class="card-actions">
                  <button class="pill-btn details-btn" data-id="${menu.id}">Plus de détails</button>
                </div>
            </div>
        `;
        return el;
    }

    /* ============================
       MESSAGE "Aucun menu trouvé"
    ============================ */
    function displayNoResult() {
        [sectionThemes, sectionQuotidien, sectionEvenements].forEach(sec => { if (sec) sec.innerHTML = ""; });

        const box = document.createElement("div");
        box.className = "no-result-box";
        box.innerHTML = `
            <div class="no-result-emoji">🔍</div>
            <strong class="no-result-title">Aucun menu ne correspond à vos filtres.</strong>
            <p class="no-result-text">Essayez d'élargir votre recherche ou réinitialisez les filtres.</p>
        `;
        if (sectionThemes) sectionThemes.appendChild(box);
    }

    /* ============================
       RENDRE MENUS
    ============================ */
    function renderMenus(filteredMenus = menus) {
        if (!Array.isArray(filteredMenus)) return;
        [sectionThemes, sectionQuotidien, sectionEvenements].forEach(sec => { if (sec) sec.innerHTML = ""; });

        if (filteredMenus.length === 0) {
            displayNoResult();
            return;
        }

        filteredMenus.forEach(menu => {
            const card = createCard(menu);
            if (menu.categorie === "themes" && sectionThemes) sectionThemes.appendChild(card);
            else if (menu.categorie === "quotidien" && sectionQuotidien) sectionQuotidien.appendChild(card);
            else if (menu.categorie === "evenements" && sectionEvenements) sectionEvenements.appendChild(card);

            // Attacher l'écouteur au bouton détails
            const btn = card.querySelector(".details-btn");
            if (btn) btn.addEventListener("click", () => openDetail(menu.id));
        });
    }

    /* ============================
       FILTRAGE
    ============================ */
    function applyFilters() {
        if (!Array.isArray(menus)) return;
        let list = [...menus];

        // Filtre prix max
        const prixMaxVal = filterPrixMax?.value ? Number(filterPrixMax.value) : null;
        if (prixMaxVal) list = list.filter(m => parsePriceToNumber(m.prix) <= prixMaxVal);

        // Filtre fourchette
        if (filterFourchette?.value) {
            const [minF, maxF] = filterFourchette.value.split("-").map(Number);
            list = list.filter(m => {
                const p = parsePriceToNumber(m.prix);
                return p >= minF && p <= maxF;
            });
        }

        // Filtre thème
        const themeVal = filterTheme?.value;
        if (themeVal) {
            list = list.filter(m => {
                if (themeVal === "quotidien" || themeVal === "evenements") return m.categorie === themeVal;
                if (themeVal === "saintvalentin") return m.id === "st-valentin";
                return m.id === themeVal;
            });
        }

        // Filtre régime
        const regimeVal = filterRegime?.value;
        if (regimeVal) {
            const regimeMap = { classique: "classique", vegetarien: "végétarienne", vegan: "végane" };
            const target = regimeMap[regimeVal];
            list = list.filter(m =>
                Object.keys(m.menuDetails || {}).some(k =>
                    (k || "").toLowerCase().includes(target?.toLowerCase())
                )
            );
        }

        // Filtre nb personnes
        const nbPers = filterNbPers?.value ? Number(filterNbPers.value) : 0;
        if (nbPers > 0) list = list.filter(m => m.min <= nbPers);

        renderMenus(list);
    }

    /* ============================
   LISTENERS FILTRES + RESET
============================ */
    [filterPrixMax, filterFourchette, filterTheme, filterRegime].forEach(el => {
        if (el) el.addEventListener("change", applyFilters);
    });
    if (filterNbPers) filterNbPers.addEventListener("input", applyFilters);

    if (resetBtn) resetBtn.addEventListener("click", () => {
        [filterPrixMax, filterFourchette, filterTheme, filterRegime].forEach(f => {
            if (f) f.selectedIndex = 0;
        });
        if (filterNbPers) filterNbPers.value = "";
        applyFilters();
    });


    /* ============================
       MESSAGE STOCK GLOBAL
    ============================ */
    function showStockWarning(message) {
        let warning = document.querySelector(".stock-warning");

        if (!warning) {
            warning = document.createElement("div");
            warning.className = "stock-warning";
            document.body.appendChild(warning);
        }

        warning.textContent = message;

        warning.classList.add("visible");

        setTimeout(() => {
            warning.classList.remove("visible");
        }, 3000);
    }


    /* ============================
       QUANTITÉ + PROMO (MODAL)
    ============================ */

    function buildQuantityBlock(menu, versionKey) {
        const wrapper = document.createElement("div");
        wrapper.className = "detail-quantity-wrapper";

        const label = document.createElement("label");
        label.className = "qty-label";
        label.textContent = "Nombre de personnes :";

        const input = document.createElement("input");
        input.type = "number";
        input.id = "modal-qty-input";
        input.className = "modal-qty-input";

        // 🔥 valeur minimale = menu.min
        const MIN = menu.min || 1;
        input.min = MIN;
        input.value = MIN;

        const recap = document.createElement("div");
        recap.className = "price-recap-block";
        recap.innerHTML = `
        <div class="recap-row"><span>Prix unitaire :</span> <strong class="recap-unit-price">--</strong></div>
        <div class="recap-row"><span>Quantité :</span> <strong class="recap-qty">--</strong></div>
        <div class="recap-row"><span>Remise :</span> <strong class="recap-discount">--</strong></div>
        <div class="recap-row total-row"><span>TOTAL :</span> <strong class="recap-total">--</strong></div>
    `;

        //  ÉCOUTEUR QUANTITÉ
        input.addEventListener("input", () => {
            let qty = parseInt(input.value) || MIN;

            //  bloque en dessous du minimum
            if (qty < MIN) {
                qty = MIN;
                input.value = MIN;
            }

            // 📦 gestion du stock
            const stock = (menu.menuDetails?.[versionKey]?.stock ?? null);

            if (stock !== null && qty > stock) {
                showStockWarning(`Désolé, mais nous avons seulement ${stock} menus en stock.`);
                qty = stock;
                input.value = stock;
            }

            updatePriceRecap(menu, versionKey, qty, recap);
        });

        updatePriceRecap(menu, versionKey, MIN, recap);

        wrapper.appendChild(label);
        wrapper.appendChild(input);
        wrapper.appendChild(recap);

        return wrapper;
    }


    /* ============================
       CALCUL PRIX + PROMO
    ============================ */

    function updatePriceRecap(menu, versionKey, qty, recapEl) {
        const unitPrice = parsePriceToNumber(menu.prix);
        const promoPercent = (menu.promo && typeof menu.promo.remise === "number") ? menu.promo.remise : 10;
        const promoOffset = (typeof menu.promoOffset === "number") ? menu.promoOffset : 5;

        const threshold = (menu.min || 0) + promoOffset;
        const subtotal = unitPrice * qty;

        let discount = 0;
        if (qty >= threshold) discount = subtotal * (promoPercent / 100);

        const totalAfter = subtotal - discount;

        recapEl.querySelector(".recap-unit-price").textContent = `${unitPrice.toFixed(2)} €`;
        recapEl.querySelector(".recap-qty").textContent = `${qty} pers`;
        recapEl.querySelector(".recap-discount").textContent =
            discount > 0
                ? `- ${discount.toFixed(2)} € (${promoPercent}%)`
                : "Aucune";
        recapEl.querySelector(".recap-total").textContent = `${totalAfter.toFixed(2)} €`;

        // ••• NOTE PROMO •••
        let note = recapEl.querySelector(".promo-note");
        if (!note) {
            note = document.createElement("div");
            note.className = "promo-note";
            recapEl.appendChild(note);
        }

        if (qty < threshold) {
            note.textContent = `Remise de ${promoPercent}% si vous commandez ${promoOffset} personnes de plus (soit ${threshold} personnes).`;
        } else {
            note.textContent = `Remise appliquée : ${promoPercent}% (seuil atteint : ${threshold} pers).`;
        }
    }


    /* ============================
       OUVERTURE / UPDATE MODAL
    ============================ */

    function openDetail(id) {
        currentMenu = menus.find(m => m.id === id);
        if (!currentMenu) return;

        const versions = Object.keys(currentMenu.menuDetails || {});
        currentVersion = versions[0] || null;
        currentImageIndex = 0;

        if (detailTitle) detailTitle.textContent = `${getRegimeEmoji()} ${currentMenu.titre}${currentVersion ? " — " + currentVersion : ""}`;
        if (detailDescription) detailDescription.textContent = currentMenu.description || "";
        if (detailConsignes) detailConsignes.textContent = currentMenu.consignes || "";

        if (detailVersions) {
            detailVersions.innerHTML = "";
            versions.forEach(v => {
                const btn = document.createElement("button");
                btn.textContent = v;
                btn.className = "pill-btn";
                if (v === currentVersion) btn.classList.add("active");
                btn.addEventListener("click", () => {
                    currentVersion = v;
                    currentImageIndex = 0;
                    [...detailVersions.children].forEach(b => b.classList.remove("active"));
                    btn.classList.add("active");
                    updateModal();
                });
                detailVersions.appendChild(btn);
            });
        }

        updateModal();

        if (modal) modal.classList.remove("hidden");
        document.body.style.overflow = "hidden";
        if (closeBtn) closeBtn.focus();
    }

    function updateModal() {
        if (!currentMenu) return;

        const versions = Object.keys(currentMenu.menuDetails || {});
        if (!currentVersion && versions.length) currentVersion = versions[0];

        const data = (currentMenu.menuDetails || {})[currentVersion] || {};

        if (detailTitle) detailTitle.textContent = `${getRegimeEmoji()} ${currentMenu.titre}${currentVersion ? " — " + currentVersion : ""}`;
        if (detailEntree) detailEntree.textContent = data.entree || "";
        if (detailPlat) detailPlat.textContent = data.plat || "";
        if (detailDessert) detailDessert.textContent = data.dessert || "";

        // Carrousel
        const imgs = data.images || [];
        if (carouselImg) {
            if (!imgs.length) {
                carouselImg.src = resolveImage("", currentMenu.titre);
                if (carouselIndicators) carouselIndicators.innerHTML = "";
            } else {
                if (currentImageIndex >= imgs.length) currentImageIndex = 0;
                if (currentImageIndex < 0) currentImageIndex = imgs.length - 1;
                carouselImg.src = resolveImage(imgs[currentImageIndex], `${currentMenu.titre} ${currentImageIndex + 1}`);

                if (carouselIndicators) {
                    carouselIndicators.innerHTML = "";
                    imgs.forEach((_, i) => {
                        const dot = document.createElement("button");
                        dot.className = i === currentImageIndex ? "active" : "";
                        dot.addEventListener("click", () => { currentImageIndex = i; updateModal(); });
                        carouselIndicators.appendChild(dot);
                    });
                }
            }
        }

        // Allergènes
        if (detailAllergenes) {
            detailAllergenes.innerHTML = "";
            (data.allergenes || []).forEach(a => {
                const li = document.createElement("li");
                li.textContent = a;
                detailAllergenes.appendChild(li);
            });
        }

        // INFOS
        detailInfosContainer.innerHTML = "";

        if (currentMenu.delai) {
            const p = document.createElement("p");
            p.innerHTML = `🕓 Commande <strong>${currentMenu.delai} jours</strong> à l’avance`;
            detailInfosContainer.appendChild(p);
        }

        const pPrix = document.createElement("p");
        const prixNum = parsePriceToNumber(currentMenu.prix);
        pPrix.innerHTML = prixNum > 0 ? `💶 Prix unitaire : <strong>${prixNum.toFixed(2)} €</strong> / personne` : "💶 Prix : NC";
        detailInfosContainer.appendChild(pPrix);

        const pMin = document.createElement("p");
        pMin.textContent = `👥 Minimum : ${currentMenu.min} pers`;
        detailInfosContainer.appendChild(pMin);

        const stock = data.stock ?? null;
        const pStock = document.createElement("p");

        if (stock === 0) {
            pStock.innerHTML = "❌ Ce menu est en rupture de stock.";
            if (orderBtn) { orderBtn.disabled = true; orderBtn.style.opacity = 0.5; }
        } else {
            pStock.textContent = `📦 Stock : ${stock !== null ? stock : "NC"}`;
            if (orderBtn) { orderBtn.disabled = false; orderBtn.style.opacity = 1; }
        }
        detailInfosContainer.appendChild(pStock);

        //  Ajout du bloc quantité
        const qtyBlock = buildQuantityBlock(currentMenu, currentVersion);
        detailInfosContainer.appendChild(qtyBlock);
    }

    /* ============================
           CARROUSEL + COMMANDE
    ============================ */
    if (carouselPrev) carouselPrev.addEventListener("click", () => { currentImageIndex--; updateModal(); });
    if (carouselNext) carouselNext.addEventListener("click", () => { currentImageIndex++; updateModal(); });

    if (orderBtn) orderBtn.addEventListener("click", () => {
        if (!currentMenu) return alert("Erreur : aucun menu sélectionné.");

        const qtyInput = document.getElementById("modal-qty-input");
        const qty = qtyInput ? parseInt(qtyInput.value) : currentMenu.min;

        const unitPrice = parsePriceToNumber(currentMenu.prix);
        const subtotal = unitPrice * qty;
        const promoPercent = (currentMenu.promo && typeof currentMenu.promo.remise === "number") ? currentMenu.promo.remise : 10;
        const promoOffset = (typeof currentMenu.promoOffset === "number") ? currentMenu.promoOffset : 5;
        const threshold = (currentMenu.min || 0) + promoOffset;

        let discount = 0;
        if (qty >= threshold) discount = subtotal * (promoPercent / 100);

        const total = subtotal - discount;

        alert(
            `Commande simulée — ${currentMenu.titre}\n` +
            `Quantité : ${qty} personnes\n` +
            `Prix unitaire : ${unitPrice.toFixed(2)} €\n` +
            `Sous-total : ${subtotal.toFixed(2)} €\n` +
            `Remise : ${discount.toFixed(2)} €\n` +
            `Total à payer (simulé) : ${total.toFixed(2)} €`
        );
    });

    /* ============================
           FERMETURE MODAL
    ============================ */
    if (closeBtn) closeBtn.addEventListener("click", () => {
        modal.classList.add("hidden");
        document.body.style.overflow = "";
    });

    document.addEventListener("keydown", e => {
        if (!modal || modal.classList.contains("hidden")) return;
        if (e.key === "Escape") modal.classList.add("hidden");
        if (e.key === "ArrowLeft") { currentImageIndex--; updateModal(); }
        if (e.key === "ArrowRight") { currentImageIndex++; updateModal(); }
    });

    /* ============================
           INIT
    ============================ */
    renderMenus();
    applyFilters();
});

// ------------------------------------- PAGE PAIEMENT -------------------------------------

