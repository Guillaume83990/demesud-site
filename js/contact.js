/* ==========================================
   PAGE CONTACT - JAVASCRIPT
   Validation formulaire + EmailJS
========================================== */

'use strict';

document.addEventListener('DOMContentLoaded', function () {
    console.log('📧 Page Contact - Initialisation...');

    initContactForm();
    initAnimations();

    console.log('✅ Page Contact - Chargée avec succès');
});

// ==========================================
// VALIDATION DU FORMULAIRE
// ==========================================

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) {
        console.warn('⚠️ Formulaire de contact non trouvé');
        return;
    }

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        console.log('📝 Tentative de soumission du formulaire');

        clearErrors();

        let isValid = true;

        // Nom
        const name = document.getElementById('name');
        if (!name.value.trim()) {
            showError(name, 'Le nom est requis');
            isValid = false;
        }

        // Téléphone
        const phone = document.getElementById('phone');
        if (!phone.value.trim()) {
            showError(phone, 'Le téléphone est requis');
            isValid = false;
        } else if (!isValidPhone(phone.value)) {
            showError(phone, 'Numéro invalide (format: 06 12 34 56 78)');
            isValid = false;
        }

        // Email
        const email = document.getElementById('email');
        if (!email.value.trim()) {
            showError(email, "L'email est requis");
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Email invalide');
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
        const consent = document.getElementById('consent');
        if (!consent.checked) {
            showError(consent, 'Vous devez accepter le traitement de vos données');
            isValid = false;
        }

        if (isValid) {
            console.log('✅ Formulaire valide, envoi...');
            submitForm();
        } else {
            console.log('❌ Formulaire invalide');
            const firstError = document.querySelector('.form-group.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    // Suppression erreurs en temps réel
    const formInputs = contactForm.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', function () {
            const formGroup = this.closest('.form-group') || this.closest('.form-consent');
            if (formGroup && formGroup.classList.contains('error')) {
                formGroup.classList.remove('error');
            }
        });
    });

    // Formatage téléphone en temps réel
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
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
}

function showError(element, message) {
    const formGroup = element.closest('.form-group') || element.closest('.form-consent');
    if (formGroup) {
        formGroup.classList.add('error');

        // Créer ou mettre à jour le message d'erreur
        let errorMsg = formGroup.querySelector('.error-message');
        if (!errorMsg) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            formGroup.appendChild(errorMsg);
        }
        errorMsg.textContent = message;
    }
}

function clearErrors() {
    const errorGroups = document.querySelectorAll('.form-group.error, .form-consent.error');
    errorGroups.forEach(group => {
        group.classList.remove('error');
        const errorMessage = group.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    });
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function isValidPhone(phone) {
    // Accepte: 06 12 34 56 78 ou 0612345678
    const cleaned = phone.replace(/\s/g, '');
    const re = /^0[1-9]\d{8}$/;
    return re.test(cleaned);
}

function submitForm() {
    const submitButton = document.querySelector('.btn-submit');
    const btnText = submitButton.querySelector('.btn-text');
    const btnLoader = submitButton.querySelector('.btn-loader');
    const btnIcon = submitButton.querySelector('.fas.fa-paper-plane');

    // Désactiver le bouton et afficher le loader
    submitButton.disabled = true;
    if (btnText) btnText.style.display = 'none';
    if (btnLoader) btnLoader.style.display = 'flex';
    if (btnIcon) btnIcon.style.display = 'none';

    // Récupérer les données du formulaire
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };

    console.log('📧 Envoi avec EmailJS...', formData);

    // Envoi avec EmailJS
    emailjs.send('service_demesud', 'template_contact', {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message,
        to_email: 'contact@demesud.com'
    })
        .then(function (response) {
            console.log('✅ Email envoyé avec succès!', response);

            // Réinitialiser le bouton
            submitButton.disabled = false;
            if (btnText) btnText.style.display = 'inline';
            if (btnLoader) btnLoader.style.display = 'none';
            if (btnIcon) btnIcon.style.display = 'inline';

            // Réinitialiser le formulaire
            document.getElementById('contactForm').reset();

            // Afficher la modale de succès
            showSuccessModal();
        })
        .catch(function (error) {
            console.error('❌ Erreur envoi email:', error);

            // Réinitialiser le bouton
            submitButton.disabled = false;
            if (btnText) btnText.style.display = 'inline';
            if (btnLoader) btnLoader.style.display = 'none';
            if (btnIcon) btnIcon.style.display = 'inline';

            alert('Une erreur est survenue. Veuillez réessayer ou nous contacter directement au 04 94 97 02 07');
        });
}

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
}

// Fonction globale pour fermer la modale
window.closeModal = function () {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
};

// Fermer la modale en cliquant à l'extérieur
document.addEventListener('click', function (e) {
    const modal = document.getElementById('successModal');
    if (e.target === modal) {
        closeModal();
    }
});

// ==========================================
// ANIMATIONS AU SCROLL
// ==========================================

function initAnimations() {
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

    // Cartes de méthodes de contact
    const methodCards = document.querySelectorAll('.method-card');
    methodCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
        observer.observe(card);
    });

    // Smooth scroll pour les liens ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

console.log('📊 Contact JS chargé avec succès');