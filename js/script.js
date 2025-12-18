// Navigation mobile
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Fermer le menu en cliquant sur un lien
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Animation au scroll avec effets progressifs
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observer les éléments à animer
    const elementsToAnimate = document.querySelectorAll('.project-card, .skill-category, .timeline-item');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Dans votre fichier script.js
    document.addEventListener('DOMContentLoaded', function() {
        const contactForm = document.getElementById('contactForm');
        const submitBtn = document.getElementById('submitBtn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        const formMessage = document.getElementById('formMessage');

        if (contactForm) {
            contactForm.addEventListener('submit', async function(e) {
                e.preventDefault();

                console.log('📤 Envoi du formulaire...');

                // Désactiver le bouton et montrer le loader
                submitBtn.disabled = true;
                btnText.style.display = 'none';
                btnLoader.style.display = 'inline';
                formMessage.style.display = 'none';

                // Récupérer les données du formulaire
                const formData = new FormData(this);

                try {
                    // Envoyer la requête
                    const response = await fetch('sendmail.php', {
                        method: 'POST',
                        body: formData
                    });

                    console.log('📨 Réponse reçue:', response.status);

                    // Vérifier si la réponse est OK
                    if (!response.ok) {
                        throw new Error(`Erreur HTTP: ${response.status}`);
                    }

                    const result = await response.json();
                    console.log('📝 Résultat:', result);

                    // Afficher le message
                    formMessage.textContent = result.message;
                    formMessage.className = 'form-message ' + result.status;
                    formMessage.style.display = 'block';

                    // Si succès, réinitialiser le formulaire
                    if (result.status === 'success') {
                        contactForm.reset();

                        // Cacher le message après 5 secondes
                        setTimeout(() => {
                            formMessage.style.display = 'none';
                        }, 5000);
                    }

                } catch (error) {
                    console.error('❌ Erreur:', error);

                    // Message d'erreur
                    formMessage.textContent = '❌ Une erreur réseau est survenue. Veuillez réessayer.';
                    formMessage.className = 'form-message error';
                    formMessage.style.display = 'block';

                } finally {
                    // Réactiver le bouton
                    submitBtn.disabled = false;
                    btnText.style.display = 'inline';
                    btnLoader.style.display = 'none';
                }
            });
        }

        // Validation en temps réel
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.validity.valid) {
                    this.classList.remove('invalid');
                    this.classList.add('valid');
                } else {
                    this.classList.remove('valid');
                    this.classList.add('invalid');
                }
            });
        });
    });

    // Effet de parallaxe sur les formes
    window.addEventListener('scroll', function() {
        const shapes = document.querySelectorAll('.shape');
        const scrolled = window.pageYOffset;

        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Animation de frappe pour le titre (optionnel)
    typeWriterEffect();
});

// Effet machine à écrire pour le titre
function typeWriterEffect() {
    const title = document.querySelector('.hero-title');
    if (!title) return;

    const text = title.textContent;
    title.textContent = '';
    let i = 0;

    function type() {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    }

    // Démarrer l'effet après un délai
    setTimeout(type, 1000);
}

// Effet de particules (optionnel avancé)
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--blue-light);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.3};
            animation: floatParticle ${10 + Math.random() * 20}s linear infinite;
        `;
        hero.appendChild(particle);
    }
}

// Ajouter les keyframes pour les particules
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes floatParticle {
        0% { transform: translateY(0) translateX(0); opacity: 0; }
        10% { opacity: 0.3; }
        90% { opacity: 0.1; }
        100% { transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px); opacity: 0; }
    }
`;
document.head.appendChild(particleStyle);

// Démarrer les effets
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
});

// Navigation améliorée
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navOverlay = document.querySelector('.nav-overlay');
    const navLinks = document.querySelectorAll('.nav-link');

    // Effet de scroll sur la navbar
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Gestion du menu mobile
    function toggleMobileMenu() {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        navOverlay.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', !isExpanded);

        // Empêcher le scroll du body quand le menu est ouvert
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    // Fermer le menu mobile
    function closeMobileMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    // Navigation smooth scroll pour les ancres
    function handleSmoothScroll(e) {
        const href = this.getAttribute('href');

        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }

        // Fermer le menu mobile après clic
        if (window.innerWidth <= 968) {
            closeMobileMenu();
        }
    }

    // Événements
    window.addEventListener('scroll', handleScroll);
    hamburger.addEventListener('click', toggleMobileMenu);
    navOverlay.addEventListener('click', closeMobileMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });

    // Fermer le menu en appuyant sur Echap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Mettre à jour le lien actif au scroll
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);

    // Initialisation
    handleScroll();
    updateActiveLink();
});
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');

    if (hamburgerBtn && navMenu) {
        // Toggle menu
        hamburgerBtn.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';

            // Toggle classes
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            mobileOverlay.classList.toggle('active');

            // Update aria attribute
            this.setAttribute('aria-expanded', !isExpanded);

            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking overlay
        mobileOverlay.addEventListener('click', function() {
            hamburgerBtn.classList.remove('active');
            navMenu.classList.remove('active');
            this.classList.remove('active');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });

        // Close menu when clicking a link (optional)
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
                mobileOverlay.classList.remove('active');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // Close menu on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                hamburgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
                mobileOverlay.classList.remove('active');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }
});