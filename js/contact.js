/* ==========================================
   CONTACT - JAVASCRIPT
========================================== */

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function () {

    // ========================================
    // VALIDATION DU FORMULAIRE
    // ========================================
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Reset des erreurs
            clearErrors();

            // Validation
            let isValid = true;

            // Nom
            const nom = document.getElementById('nom');
            if (!nom.value.trim()) {
                showError(nom, 'Le nom est requis');
                isValid = false;
            }

            // Prénom
            const prenom = document.getElementById('prenom');
            if (!prenom.value.trim()) {
                showError(prenom, 'Le prénom est requis');
                isValid = false;
            }

            // Email
            const email = document.getElementById('email');
            if (!email.value.trim()) {
                showError(email, 'L\'email est requis');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Email invalide');
                isValid = false;
            }

            // Téléphone
            const telephone = document.getElementById('telephone');
            if (!telephone.value.trim()) {
                showError(telephone, 'Le téléphone est requis');
                isValid = false;
            } else if (!isValidPhone(telephone.value)) {
                showError(telephone, 'Numéro de téléphone invalide');
                isValid = false;
            }

            // Service
            const service = document.getElementById('service');
            if (!service.value) {
                showError(service, 'Veuillez sélectionner un service');
                isValid = false;
            }

            // Message
            const message = document.getElementById('message');
            if (!message.value.trim()) {
                showError(message, 'Le message est requis');
                isValid = false;
            } else if (message.value.trim().length < 10) {
                showError(message, 'Le message doit contenir au moins 10 caractères');
                isValid = false;
            }

            // RGPD
            const rgpd = document.getElementById('rgpd');
            if (!rgpd.checked) {
                showError(rgpd, 'Vous devez accepter le traitement de vos données');
                isValid = false;
            }

            // Si tout est valide
            if (isValid) {
                submitForm();
            } else {
                // Scroll vers la première erreur
                const firstError = document.querySelector('.form-group.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }

    // ========================================
    // FONCTIONS DE VALIDATION
    // ========================================

    function showError(element, message) {
        const formGroup = element.closest('.form-group') || element.closest('.checkbox-group');
        formGroup.classList.add('error');
        const errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.textContent = message;
        }
    }

    function clearErrors() {
        const errorGroups = document.querySelectorAll('.form-group.error, .checkbox-group.error');
        errorGroups.forEach(group => {
            group.classList.remove('error');
            const errorMessage = group.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.textContent = '';
            }
        });
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function isValidPhone(phone) {
        const re = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
        return re.test(phone.replace(/\s/g, ''));
    }

    function submitForm() {
        const formResponse = document.querySelector('.form-response');
        const submitButton = document.querySelector('.btn-submit');

        // Désactiver le bouton
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';

        // Simuler l'envoi (remplacer par votre logique d'envoi réelle)
        setTimeout(() => {
            // Succès
            formResponse.className = 'form-response success';
            formResponse.textContent = '✓ Votre message a été envoyé avec succès ! Nous vous recontacterons dans les plus brefs délais.';
            formResponse.style.display = 'block';

            // Reset du formulaire
            contactForm.reset();

            // Réactiver le bouton
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer ma demande';

            // Scroll vers le message de succès
            formResponse.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Cacher le message après 10 secondes
            setTimeout(() => {
                formResponse.style.display = 'none';
            }, 10000);

        }, 2000);

        // En cas d'erreur (exemple)
        // formResponse.className = 'form-response error';
        // formResponse.textContent = '✗ Une erreur est survenue. Veuillez réessayer.';
        // formResponse.style.display = 'block';
    }

    // ========================================
    // SUPPRESSION DES ERREURS EN TEMPS RÉEL
    // ========================================
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', function () {
            const formGroup = this.closest('.form-group') || this.closest('.checkbox-group');
            if (formGroup.classList.contains('error')) {
                formGroup.classList.remove('error');
            }
        });
    });

    // ========================================
    // FAQ ACCORDION
    // ========================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Fermer tous les autres items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle l'item cliqué
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });

    // ========================================
    // ANIMATIONS AU SCROLL
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observer les cartes de contact rapide
    const quickCards = document.querySelectorAll('.quick-contact-card');
    quickCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
        observer.observe(card);
    });

    // Observer les cartes de bureau
    const officeCards = document.querySelectorAll('.office-card');
    officeCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(card);
    });

    // Observer les items FAQ
    const faqItemsAnim = document.querySelectorAll('.faq-item');
    faqItemsAnim.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s`;
        observer.observe(item);
    });

    // ========================================
    // SMOOTH SCROLL
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========================================
    // ANIMATION DU HERO
    // ========================================
    const heroContent = document.querySelector('.page-hero .container');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';

        setTimeout(() => {
            heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }

    // ========================================
    // GESTION DU SCROLL HEADER
    // ========================================
    let lastScroll = 0;
    const header = document.querySelector('header');

    if (header) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });
    }

    // ========================================
    // EFFET PARALLAXE HERO
    // ========================================
    const heroSection = document.querySelector('.page-hero');
    const heroImage = document.querySelector('.hero-bg');

    if (heroSection && heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroHeight = heroSection.offsetHeight;

            if (scrolled < heroHeight) {
                const parallaxSpeed = 0.5;
                heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }

    // ========================================
    // ANIMATION DES ICÔNES
    // ========================================
    const quickIcons = document.querySelectorAll('.quick-icon');
    quickIcons.forEach(icon => {
        const card = icon.closest('.quick-contact-card');

        card.addEventListener('mouseenter', function () {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', function () {
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // ========================================
    // GESTION DES IMAGES
    // ========================================
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function () {
            this.classList.add('loaded');
        });

        img.addEventListener('error', function () {
            console.warn('Erreur de chargement de l\'image:', this.src);
        });
    });

    // ========================================
    // AUTO-REMPLISSAGE DATE (DATE MINIMALE = AUJOURD'HUI)
    // ========================================
    const dateInput = document.getElementById('date-souhaitee');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    // ========================================
    // FORMATAGE TÉLÉPHONE EN TEMPS RÉEL
    // ========================================
    const telephoneInput = document.getElementById('telephone');
    if (telephoneInput) {
        telephoneInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 10) {
                value = value.substring(0, 10);
            }
            if (value.length > 0) {
                value = value.match(/.{1,2}/g).join(' ');
            }
            e.target.value = value;
        });
    }

    // ========================================
    // PAGE LOADED
    // ========================================
    window.addEventListener('load', function () {
        document.body.classList.add('page-loaded');
        console.log('✓ Page Contact chargée avec succès');
    });

    // ========================================
    // CONSOLE LOG DEBUG
    // ========================================
    console.log('=================================');
    console.log('Contact - Page initialisée');
    console.log('=================================');
    console.log('Quick cards:', quickCards.length);
    console.log('Office cards:', officeCards.length);
    console.log('FAQ items:', faqItems.length);
    console.log('=================================');

});

// ========================================
// FONCTION UTILITAIRE
// ========================================
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ========================================
// GESTION REDIMENSIONNEMENT
// ========================================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        console.log('Fenêtre redimensionnée');
    }, 250);
});

// ========================================
// EXPORT
// ========================================
window.contactPage = {
    isElementInViewport: isElementInViewport
};