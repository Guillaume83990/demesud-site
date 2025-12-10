
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
        input.addEventListener('change', filtrer);
        input.addEventListener('input', filtrer);
    });

})();

/* ============================================================
   DATA MENUS COMPLET
============================================================ */
const menus = [
    // --------------------- MENUS À THÈMES ---------------------
    {
        id: "noel",
        categorie: "themes",
        titre: "Menu de Noël 🎄",
        description: "Plongez dans la magie des fêtes avec un menu raffiné qui met à l’honneur les saveurs authentiques de Noël.  Ce repas allie générosité, convivialité et finesse pour un réveillon inoubliable.",
        img: "images/photos/menu noel.jpg", /* Image menu noel page globale */
        min: 10,
        prix: "44,90€/pers",
        consignes: "À conserver entre 0°C et 4°C.Remise en température des plats chauds à 65°C à cœur minimum. DLC : 72h après réception",
        menuDetails: {
            "Classique 🥩": { entree: "Foie gras de canard, chutney de figues et pain brioché toasté", plat: "Filet de chapon rôti aux morilles, gratin dauphinois et fagot de haricots verts", dessert: "Bûche de Noël traditionnelle au chocolat et éclats de noisette", images: { entrée: "images/photos/menu noel.jpg", plat: "images/photos/dinde noel.jpg", dessert: "images/photos/buche noel2.jpg" }, allergenes: ["Lait", "Œufs", "Gluten", "Fruits à coque (notamment noisettes)", "Arachides (traces possibles en chocolaterie)", "Sésame (traces possibles dans le pain brioché)", "Sulfites,", "céleri"] },
            "Végane 🥕": { entree: "Cappuccino de potimarron au lait d’amande, éclats de châtaignes grillées", plat: "Rôti de seitan farci aux légumes et aux herbes, jus corsé au vin rouge, accompagné d’un gratin de patate douce et panais", dessert: "Bûche glacée coco – chocolat – noisette (sans produits laitiers ni œufs)", images: { entrée: "", plat: "", dessert: "" }, allergenes: ["Fruits à coque", "Soja", "Gluten", "Lait", "Fruits rouges"] },
            "Végétarienne 🌿": { entree: "Velouté de panais et poire, crème fouettée au bleu d’Auvergne et noix caramélisées", plat: "Wellington de légumes d’hiver (champignons, carottes, châtaignes) en croûte feuilletée, purée de céleri et sauce aux herbes", dessert: "Bûche roulée vanille – fruits rouges – mascarpone", images: { entrée: "", plat: "", dessert: "" }, allergenes: ["Lait", "Œufs", "Fruits à coque", "Céleri"] }

        }
    },
    {
        id: "stvalentin",
        categorie: "themes",
        titre: "Menu St Valentin",
        description: "Un dîner romantique pour deux.",
        img: "IMAGE LISTE",
        icon: "fa-heart",
        min: 2,
        prix: "39,99€",
        allergenes: ["Lait"],
        consignes: "À consommer le jour même.",
        menuDetails: {
            "Classique 🥩": { entree: "Amuse-bouche", plat: "Filet de bœuf", dessert: "Fondant chocolat", img: "IMAGE DETAIL" }
        }
    },
    {
        id: "halloween",
        categorie: "themes",
        titre: "Menu Halloween",
        description: "Un menu effrayant et délicieux.",
        img: "IMAGE LISTE",
        icon: "fa-ghost",
        min: 6,
        prix: "39,99€",
        allergenes: ["Gluten", "Soja"],
        consignes: "Conserver au frais.",
        menuDetails: {
            "Classique 🥩": { entree: "Soupe de citrouille", plat: "Curry de poulet", dessert: "Cupcake fantôme", img: "IMAGE DETAIL CLASSIQUE" },
            "Végane 🥕": { entree: "Soupe de potimarron", plat: "Ragoût de légumes", dessert: "Mousse au chocolat", img: "IMAGE DETAIL VEGANE" },
            "Végétarienne 🌿": { entree: "Velouté de courge", plat: "Gratin de légumes", dessert: "Tarte aux fruits", img: "IMAGE DETAIL VEGETARIENNE" }
        }
    },
    {
        id: "paques",
        categorie: "themes",
        titre: "Menu de Pâques",
        description: "Un menu printanier et raffiné.",
        img: "IMAGE LISTE",
        icon: "fa-egg",
        min: 8,
        prix: "49,99€",
        allergenes: ["Œufs"],
        consignes: "Conserver au frais.",
        menuDetails: {
            "Classique 🥩": { entree: "Salade printanière", plat: "Agneau rôti", dessert: "Gâteau chocolat", img: "IMAGE DETAIL" }
        }
    },

    // --------------------- MENUS DU QUOTIDIEN ---------------------
    {
        id: "bordelais",
        categorie: "quotidien",
        titre: "Menu bordelais",
        description: "Les saveurs du Sud-Ouest.",
        img: "IMAGE LISTE",
        icon: "fa-wine-glass",
        min: 4,
        prix: "39,99€",
        allergenes: ["Sulfites"],
        consignes: "Conserver au frais.",
        menuDetails: {
            "Classique 🥩": { entree: "Salade landaise", plat: "Magret de canard", dessert: "Cannelés", img: "IMAGE DETAIL" }
        }
    },
    {
        id: "bassin",
        categorie: "quotidien",
        titre: "Menu du bassin",
        description: "Le meilleur d’Arcachon.",
        img: "IMAGE LISTE",
        icon: "fa-fish",
        min: 4,
        prix: "49,99€",
        allergenes: ["Poisson", "Crustacés"],
        consignes: "0 à 2°C recommandé.",
        menuDetails: {
            "Classique 🥩": { entree: "Huîtres fraîches", plat: "Filet de bar", dessert: "Tarte aux myrtilles", img: "IMAGE DETAIL" }
        }
    },

    // --------------------- MENUS ÉVÉNEMENTS ---------------------
    {
        id: "anniversaire",
        categorie: "evenements",
        titre: "Menu Anniversaire",
        description: "Un menu gourmand pour vos anniversaires.",
        img: "IMAGE LISTE",
        icon: "fa-cake-candles",
        min: 15,
        prix: "39,99€",
        allergenes: ["Lait", "Œufs", "Gluten"],
        consignes: "À conserver entre 0°C et 4°C.",
        menuDetails: {
            "Classique 🥩": { entree: "Mini quiches", plat: "Poulet rôti", dessert: "Gâteau anniversaire", img: "IMAGE DETAIL" }
        }
    },
    {
        id: "bapteme",
        categorie: "evenements",
        titre: "Menu Baptême",
        description: "Un menu doux et festif pour un baptême.",
        img: "IMAGE LISTE",
        icon: "fa-baby",
        min: 15,
        prix: "49,99€",
        allergenes: ["Lait", "Œufs", "Gluten"],
        consignes: "À consommer rapidement.",
        menuDetails: {
            "Classique 🥩": { entree: "Velouté de légumes", plat: "Filet de poisson", dessert: "Tartelette fruits", img: "IMAGE DETAIL" }
        }
    },
    {
        id: "mariage",
        categorie: "evenements",
        titre: "Menu Mariage",
        description: "Un menu raffiné pour le grand jour.",
        img: "IMAGE LISTE",
        icon: "fa-ring",
        min: 20,
        prix: "59,99€",
        allergenes: ["Lait", "Œufs", "Fruits à coque"],
        consignes: "Conserver au frais.",
        menuDetails: {
            "Classique 🥩": { entree: "Saumon fumé", plat: "Filet mignon", dessert: "Pièce montée", img: "IMAGE DETAIL" }
        }
    },
    {
        id: "seminaire",
        categorie: "evenements",
        titre: "Menu Séminaire",
        description: "Menu pratique pour vos événements professionnels.",
        img: "IMAGE LISTE",
        icon: "fa-briefcase",
        min: 10,
        prix: "29,99€",
        allergenes: ["Gluten"],
        consignes: "À consommer rapidement.",
        menuDetails: {
            "Classique 🥩": { entree: "Wraps variés", plat: "Quiche lorraine", dessert: "Brownie", img: "IMAGE DETAIL" }
        }
    }
];

/* ============================================================
   RÉFÉRENCES DOM
============================================================ */
const sectionThemes = document.getElementById("section-themes");
const sectionQuotidien = document.getElementById("section-quotidien");
const sectionEvenements = document.getElementById("section-evenements");

const modal = document.getElementById("menu-detail");
const closeBtn = document.getElementById("close-detail");
const detailImg = document.getElementById("detail-img");
const detailTitle = document.getElementById("detail-title");
const detailDescription = document.getElementById("detail-description");
const detailVersions = document.getElementById("detail-versions");
const detailEntree = document.getElementById("detail-entree");
const detailPlat = document.getElementById("detail-plat");
const detailDessert = document.getElementById("detail-dessert");
const detailAllergenes = document.getElementById("detail-allergenes");
const detailConsignes = document.getElementById("detail-consignes");
const orderBtn = document.getElementById("order-btn");

/* ============================================================
   CRÉATION CARTE
============================================================ */
function createCard(menu) {
    const div = document.createElement("article");
    div.className = "menu-card";
    div.innerHTML = `
    <img src="${menu.img}" alt="IMAGE — PLACE ICI" class="menu-img">
    <div class="menu-content">
      <i class="menu-icon fa-solid ${menu.icon}"></i>
      <h3>${menu.titre}</h3>
      <p>${menu.description}</p>
      <p class="menu-info"><strong>Minimum :</strong> ${menu.min} personnes</p>
      <p class="menu-info"><strong>Prix :</strong> ${menu.prix}</p>
      <button class="pill-btn details-btn" data-id="${menu.id}">Plus de détails</button>
    </div>
  `;
    return div;
}

/* ============================================================
   RENDER MENUS
============================================================ */
function renderMenus() {
    sectionThemes.innerHTML = "";
    sectionQuotidien.innerHTML = "";
    sectionEvenements.innerHTML = "";

    menus.forEach(menu => {
        const card = createCard(menu);
        if (menu.categorie === "themes") sectionThemes.appendChild(card);
        if (menu.categorie === "quotidien") sectionQuotidien.appendChild(card);
        if (menu.categorie === "evenements") sectionEvenements.appendChild(card);
    });
}

/* ============================================================
   OUVERTURE MODAL DETAIL
============================================================ */
let currentMenu, currentVersion;

function openDetail(id) {
    currentMenu = menus.find(m => m.id === id);
    const versions = Object.keys(currentMenu.menuDetails);
    currentVersion = versions[0];

    updateModal();

    // Versions disponibles
    detailVersions.innerHTML = "";
    if (versions.length > 1) {
        versions.forEach(v => {
            const b = document.createElement("button");
            b.className = "pill-btn";
            b.textContent = v;
            if (v === currentVersion) b.style.border = "2px solid #720000";
            b.addEventListener("click", () => {
                currentVersion = v;
                updateModal();
                [...detailVersions.children].forEach(btn => btn.style.border = "none");
                b.style.border = "2px solid #720000";
            });
            detailVersions.appendChild(b);
        });
    } else {
        detailVersions.textContent = versions[0];
    }

    modal.classList.remove("hidden");
}


/* ============================================================
   UPDATE MODAL
============================================================ */
function updateModal() {
    const data = currentMenu.menuDetails[currentVersion];
    detailImg.src = data.img;
    detailTitle.textContent = currentMenu.titre + " - " + currentVersion;
    detailDescription.textContent = currentMenu.description;
    detailEntree.textContent = data.entree;
    detailPlat.textContent = data.plat;
    detailDessert.textContent = data.dessert;

    // Allergènes : si version spécifique, utilise data.allergenes sinon menu global
    detailAllergenes.innerHTML = "";

    // Vérifie si la version a des allergènes spécifiques
    const allergens = data.allergenes || currentMenu.allergenes;

    allergens.forEach(a => {
        const li = document.createElement("li");
        li.textContent = a;
        detailAllergenes.appendChild(li);
    });

    detailConsignes.textContent = currentMenu.consignes;
}


/* ============================================================
   EVENTS
============================================================ */
document.addEventListener("click", e => {
    const btn = e.target.closest(".details-btn");
    if (btn) openDetail(btn.dataset.id);
});

closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
orderBtn.addEventListener("click", () => alert("Commande envoyée !"));

/* ============================================================
   INIT
============================================================ */
renderMenus();
