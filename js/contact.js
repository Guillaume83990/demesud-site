/* ==========================================
   PAGE CONTACT - JAVASCRIPT
   Gestion formulaire EmailJS et animations
========================================== */

'use strict';

document.addEventListener('DOMContentLoaded', function () {
    console.log('📧 Page Contact - Initialisation...');

    // Initialiser tous les modules
    initFormHandling();
    initScrollAnimations();
    initSmoothScroll();

    console.log('✅ Page Contact - Chargée avec succès');
});

// ==========================================
// GESTION FORMULAIRE
// ==========================================

function initFormHandling() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Vérifier le consentement
        const consent = document.getElementById('consent');
        if (!consent.checked) {
            showNotification('Veuillez accepter la politique de confidentialité', 'error');
            return;
        }

        // Récupérer les données du formulaire
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };

        // Valider les données
        if (!validateForm(formData)) {
            return;
        }

        // Afficher le loader
        const submitBtn = form.querySelector('.btn-submit');
        submitBtn.classList.add('loading');

        try {
            // Envoyer via EmailJS
            await emailjs.send(
                'service_demesud',  // Service ID à configurer dans EmailJS
                'template_contact',  // Template ID à configurer dans EmailJS
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    phone: formData.phone,
                    service: formData.service,
                    message: formData.message,
                    to_email: 'contact@demesud.com'
                }
            );

            // Succès
            console.log('✅ Email envoyé avec succès');
            showSuccessModal();
            form.reset();

            // Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    event_category: 'Contact',
                    event_label: formData.service
                });
            }

        } catch (error) {
            console.error('❌ Erreur envoi email:', error);
            showNotification('Une erreur est survenue. Veuillez réessayer ou nous appeler directement.', 'error');
        } finally {
            submitBtn.classList.remove('loading');
        }
    });

    // Validation en temps réel
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function () {
            validateField(this);
        });

        input.addEventListener('input', function () {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

// ==========================================
// VALIDATION FORMULAIRE
// ==========================================

function validateForm(formData) {
    let isValid = true;

    // Valider le nom
    if (formData.name.trim().length < 2) {
        showFieldError('name', 'Le nom doit contenir au moins 2 caractères');
        isValid = false;
    }

    // Valider l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showFieldError('email', 'Email invalide');
        isValid = false;
    }

    // Valider le téléphone (optionnel mais si rempli doit être valide)
    if (formData.phone) {
        const phoneRegex = /^[\d\s\.\-\+\(\)]{10,}$/;
        if (!phoneRegex.test(formData.phone)) {
            showFieldError('phone', 'Téléphone invalide');
            isValid = false;
        }
    }

    // Valider le service
    if (!formData.service) {
        showFieldError('service', 'Veuillez sélectionner un service');
        isValid = false;
    }

    // Valider le message
    if (formData.message.trim().length < 10) {
        showFieldError('message', 'Le message doit contenir au moins 10 caractères');
        isValid = false;
    }

    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    switch (field.id) {
        case 'name':
            if (value.length < 2) {
                errorMessage = 'Le nom doit contenir au moins 2 caractères';
                isValid = false;
            }
            break;

        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Email invalide';
                isValid = false;
            }
            break;

        case 'phone':
            if (value) {
                const phoneRegex = /^[\d\s\.\-\+\(\)]{10,}$/;
                if (!phoneRegex.test(value)) {
                    errorMessage = 'Téléphone invalide';
                    isValid = false;
                }
            }
            break;

        case 'service':
            if (!value) {
                errorMessage = 'Veuillez sélectionner un service';
                isValid = false;
            }
            break;

        case 'message':
            if (value.length < 10) {
                errorMessage = 'Le message doit contenir au moins 10 caractères';
                isValid = false;
            }
            break;
    }

    if (isValid) {
        clearFieldError(field.id);
    } else {
        showFieldError(field.id, errorMessage);
    }

    return isValid;
}

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;

    field.classList.add('error');

    // Ajouter bordure rouge
    field.style.borderColor = '#e74c3c';

    // Retirer l'erreur après 3 secondes
    setTimeout(() => {
        clearFieldError(fieldId);
    }, 3000);
}

function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;

    field.classList.remove('error');
    field.style.borderColor = '';
}

// ==========================================
// MODAL SUCCESS
// ==========================================

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Fermer modal au clic sur le fond
document.getElementById('successModal')?.addEventListener('click', function (e) {
    if (e.target === this) {
        closeModal();
    }
});

// Fermer modal avec Escape
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Exposer closeModal globalement
window.closeModal = closeModal;

// ==========================================
// NOTIFICATIONS
// ==========================================

function showNotification(message, type = 'info') {
    // Créer la notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;

    // Ajouter au body
    document.body.appendChild(notification);

    // Styles inline
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 20px 25px;
        background: ${type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.4s ease;
        max-width: 400px;
    `;

    // Retirer après 5 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => notification.remove(), 400);
    }, 5000);
}

// Ajouter les animations pour les notifications
if (!document.getElementById('notification-animations')) {
    const style = document.createElement('style');
    style.id = 'notification-animations';
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ==========================================
// ANIMATIONS AU SCROLL
// ==========================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Éléments à animer
    const animatedElements = document.querySelectorAll(`
        .method-card,
        .form-container,
        .info-card,
        .section-head
    `);

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // Style pour l'état animé
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// ==========================================
// SMOOTH SCROLL
// ==========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href === '#' || !href) return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();

                const headerHeight = document.querySelector('.main-header')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================
// ACCESSIBILITÉ
// ==========================================

const focusableElements = document.querySelectorAll(`
    a,
    button,
    input,
    select,
    textarea,
    [tabindex]:not([tabindex="-1"])
`);

focusableElements.forEach(element => {
    element.addEventListener('focus', function () {
        this.style.outline = '3px solid var(--color-orange)';
        this.style.outlineOffset = '4px';
    });

    element.addEventListener('blur', function () {
        this.style.outline = '';
        this.style.outlineOffset = '';
    });
});

// ==========================================
// PERFORMANCE - DEBOUNCE RESIZE
// ==========================================

let resizeAnimationStopper;
window.addEventListener('resize', () => {
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeAnimationStopper);
    resizeAnimationStopper = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
    }, 400);
}, { passive: true });

// Style pour stopper les animations pendant resize
if (!document.getElementById('resize-stopper-style')) {
    const style = document.createElement('style');
    style.id = 'resize-stopper-style';
    style.textContent = `
        .resize-animation-stopper * {
            animation: none !important;
            transition: none !important;
        }
    `;
    document.head.appendChild(style);
}

// ==========================================
// ERROR HANDLING
// ==========================================

window.addEventListener('error', (e) => {
    console.error('❌ Erreur JavaScript:', e.message);
}, true);

// ==========================================
// LOGS DE DEBUG
// ==========================================

console.log('📊 Statistiques page Contact:');
console.log('  - Méthodes:', document.querySelectorAll('.method-card').length);
console.log('  - Infos cards:', document.querySelectorAll('.info-card').length);
console.log('  - EmailJS:', typeof emailjs !== 'undefined' ? 'Chargé' : 'Non chargé');

// ==========================================
// UTILITIES
// ==========================================

// Fonction debounce réutilisable
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}