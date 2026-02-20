// ==========================================
// GARDE-MEUBLES - INTERACTIONS
// ==========================================

document.addEventListener('DOMContentLoaded', function () {

    // ==========================================
    // FAQ ACCORDION
    // ==========================================

    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Fermer tous les autres items
            const isActive = item.classList.contains('active');

            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Ouvrir l'item cliqué si il n'était pas actif
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });


    // ==========================================
    // SCROLL ANIMATIONS
    // ==========================================

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

    // Éléments à animer
    const animatedElements = document.querySelectorAll(
        '.storage-card, .size-card, .security-item, .service-item, .process-step, .faq-item'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });


    // ==========================================
    // SMOOTH SCROLL POUR LES LIENS INTERNES
    // ==========================================

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


    // ==========================================
    // ANIMATION COMPTEURS (si ajouté plus tard)
    // ==========================================

    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = Math.round(target);
                clearInterval(timer);
            } else {
                element.textContent = Math.round(current);
            }
        }, 16);
    }


    // ==========================================
    // MISE EN ÉVIDENCE DE LA CARTE POPULAIRE
    // ==========================================

    const featuredCard = document.querySelector('.size-card.featured');
    if (featuredCard) {
        // Animation pulsante légère pour attirer l'attention
        setInterval(() => {
            featuredCard.style.transform = 'scale(1.02)';
            setTimeout(() => {
                featuredCard.style.transform = 'scale(1)';
            }, 500);
        }, 3000);
    }


    // ==========================================
    // GESTION DES CARTES AU HOVER
    // ==========================================

    const storageCards = document.querySelectorAll('.storage-card');

    storageCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transition = 'all 0.3s ease';
        });
    });


    // ==========================================
    // BOUTONS CTA - TRACKING (optionnel)
    // ==========================================

    const ctaButtons = document.querySelectorAll('.btn-cta-primary, .btn-cta-secondary, .btn-card');

    ctaButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            // Ici vous pouvez ajouter du tracking analytics
            const buttonText = this.textContent.trim();
            console.log('CTA cliqué:', buttonText);

            // Exemple avec Google Analytics (décommenter si GA est installé)
            // gtag('event', 'cta_click', {
            //     'event_category': 'Engagement',
            //     'event_label': buttonText
            // });
        });
    });


    // ==========================================
    // AFFICHAGE PROGRESSIF DES ÉLÉMENTS
    // ==========================================

    const staggerElements = (selector, delay = 100) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, index * delay);
        });
    };

    // Appeler au scroll ou au chargement
    window.addEventListener('load', () => {
        staggerElements('.highlight-item', 150);
    });


    // ==========================================
    // VALIDATION BASIQUE POUR LES FORMULAIRES (si ajouté)
    // ==========================================

    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ff6b35';
                } else {
                    field.style.borderColor = '';
                }
            });

            if (!isValid) {
                e.preventDefault();
                alert('Veuillez remplir tous les champs obligatoires.');
            }
        });
    });


    // ==========================================
    // GESTION DU SCROLL POUR HEADER (si nécessaire)
    // ==========================================

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Ajouter une classe au body pour les styles basés sur le scroll
        if (currentScroll > 100) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });


    // ==========================================
    // LAZY LOADING DES IMAGES (si images ajoutées)
    // ==========================================

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }


    // ==========================================
    // CALCULATEUR DE VOLUME (optionnel - à développer)
    // ==========================================

    // Fonction pour estimer le volume nécessaire
    function estimateVolume(rooms, furniture) {
        // Logique d'estimation basée sur le nombre de pièces et meubles
        // À développer selon vos besoins
        const baseVolume = rooms * 10; // m³ par pièce
        return baseVolume;
    }


    // ==========================================
    // MESSAGES DE CONFIRMATION
    // ==========================================

    function showConfirmation(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : '#ff6b35'};
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }


    // ==========================================
    // DÉTECTION DE DISPOSITIF MOBILE
    // ==========================================

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
        document.body.classList.add('mobile-device');

        // Ajustements spécifiques pour mobile
        const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
        phoneLinks.forEach(link => {
            link.style.pointerEvents = 'auto';
        });
    }


    // ==========================================
    // IMPRESSION - OPTIMISATION (optionnel)
    // ==========================================

    window.addEventListener('beforeprint', () => {
        // Masquer les éléments non nécessaires à l'impression
        document.querySelectorAll('.no-print').forEach(el => {
            el.style.display = 'none';
        });
    });

    window.addEventListener('afterprint', () => {
        // Restaurer l'affichage
        document.querySelectorAll('.no-print').forEach(el => {
            el.style.display = '';
        });
    });

});


// ==========================================
// ANIMATIONS CSS ADDITIONNELLES
// ==========================================

// Ajouter les keyframes dynamiquement si nécessaire
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);
