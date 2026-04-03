// ── Navigation ──────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {

    const navbar      = document.getElementById('navbar');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu     = document.getElementById('navMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const navLinks    = document.querySelectorAll('.nav-link');

    // Scroll navbar effect
    window.addEventListener('scroll', function () {
        navbar && navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Mobile menu toggle
    if (hamburgerBtn && navMenu) {
        function openMenu() {
            hamburgerBtn.classList.add('active');
            navMenu.classList.add('active');
            mobileOverlay && mobileOverlay.classList.add('active');
            hamburgerBtn.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }
        function closeMenu() {
            hamburgerBtn.classList.remove('active');
            navMenu.classList.remove('active');
            mobileOverlay && mobileOverlay.classList.remove('active');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }

        hamburgerBtn.addEventListener('click', function () {
            navMenu.classList.contains('active') ? closeMenu() : openMenu();
        });

        mobileOverlay && mobileOverlay.addEventListener('click', closeMenu);

        navLinks.forEach(link => link.addEventListener('click', function () {
            if (window.innerWidth <= 968) closeMenu();
        }));

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) closeMenu();
        });
    }

    // Smooth scroll for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
            }
        });
    });

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stagger children
                const children = entry.target.querySelectorAll('.project-card, .skill-category, .timeline-item, .carte-competence');
                children.forEach((child, i) => {
                    child.style.transitionDelay = `${i * 0.1}s`;
                });
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.animate-on-scroll, .project-card, .skill-category, .timeline-item').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    function updateActiveLink() {
        const scrollPos = window.scrollY + 120;
        sections.forEach(section => {
            const top    = section.offsetTop;
            const height = section.offsetHeight;
            const id     = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) link.classList.add('active');
                });
            }
        });
    }
    window.addEventListener('scroll', updateActiveLink);

    // Typewriter on hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';
        let i = 0;
        function type() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i++);
                setTimeout(type, 60);
            }
        }
        setTimeout(type, 800);
    }

    // Parallax floating shapes
    window.addEventListener('scroll', function () {
        const shapes = document.querySelectorAll('.shape');
        const scrolled = window.pageYOffset;
        shapes.forEach((shape, index) => {
            const speed = 0.08 + index * 0.04;
            shape.style.transform = `translateY(${-scrolled * speed}px)`;
        });
    });

    // Compétences page — year tabs (if present)
    const navAnneesBtns = document.querySelectorAll('.nav-annee-btn');
    const sectionsAnnee = document.querySelectorAll('.section-annee');

    if (navAnneesBtns.length > 0) {
        navAnneesBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                const annee = this.getAttribute('data-annee');

                navAnneesBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                sectionsAnnee.forEach(section => {
                    section.classList.remove('active');
                    if (section.getAttribute('data-annee') === annee) {
                        section.classList.add('active');
                    }
                });
            });
        });
        // Activate first by default
        if (navAnneesBtns[0]) navAnneesBtns[0].click();
    }

    // Compétences cards expandable
    document.querySelectorAll('.carte-competence').forEach(card => {
        card.addEventListener('click', function () {
            const wasActive = this.classList.contains('active');
            document.querySelectorAll('.carte-competence').forEach(c => c.classList.remove('active'));
            if (!wasActive) this.classList.add('active');
        });
    });

});

// Subtle floating petals (decorative)
function createPetals() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const petals = ['🌸', '🌺', '🌼', '🍀'];
    for (let i = 0; i < 8; i++) {
        const petal = document.createElement('span');
        petal.textContent = petals[Math.floor(Math.random() * petals.length)];
        petal.style.cssText = `
            position: absolute;
            font-size: ${0.6 + Math.random() * 1}rem;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${0.06 + Math.random() * 0.08};
            animation: floatBlossom ${8 + Math.random() * 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
            pointer-events: none;
            user-select: none;
        `;
        hero.appendChild(petal);
    }
}
document.addEventListener('DOMContentLoaded', createPetals);