document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    const navListItems = document.querySelectorAll('.nav-links li');
    const navbar = document.querySelector('.navbar');
    const navOverlay = document.querySelector('.nav-overlay');

    // --- SCROLLSPY FOR ACTIVE LINK HIGHLIGHTING ---
    const activateNavLink = () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    // --- NAVBAR SCROLL EFFECT WITH DEBOUNCING ---
    let lastScroll = 0;
    let scrollTimeout;
    
    const handleScroll = () => {
        clearTimeout(scrollTimeout);
        
        scrollTimeout = setTimeout(() => {
            const currentScroll = window.scrollY;
            
            // Add shadow on scroll
            if (currentScroll > 50) {
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
            } else {
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
            }

            activateNavLink();
            lastScroll = currentScroll;
        }, 10);
    };

    // --- HAMBURGER MENU LOGIC ---
    const toggleNav = () => {
        const isActive = navMenu.classList.contains('nav-active');
        
        // Toggle Nav menu visibility
        navMenu.classList.toggle('nav-active');
        navOverlay.classList.toggle('active');
        hamburger.classList.toggle('toggle');
        
        // Update aria-expanded attribute
        hamburger.setAttribute('aria-expanded', !isActive);

        // Animate links fading in
        navListItems.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Prevent body scroll when menu is open
        document.body.style.overflow = isActive ? 'auto' : 'hidden';
    };
    
    // Open/close nav when hamburger is clicked
    hamburger.addEventListener('click', toggleNav);

    // Keyboard accessibility for hamburger menu
    hamburger.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleNav();
        }
    });

    // Close menu when a nav link is clicked (for mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('nav-active')) {
                toggleNav();
            }
        });
    });

    // Close menu when clicking outside (for mobile)
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('nav-active') && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            toggleNav();
        }
    });

    // Close menu when clicking overlay
    navOverlay.addEventListener('click', toggleNav);

    // Prevent clicks inside the nav menu from closing it
    navMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // --- SMOOTH SCROLL ENHANCEMENT ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Only handle internal links
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const navbarHeight = navbar.offsetHeight;
                    const offsetTop = targetSection.offsetTop - navbarHeight - 20;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- INTERSECTION OBSERVER FOR SCROLL ANIMATIONS ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for fade-in effect
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });

    // --- FORM VALIDATION ---
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            let isValid = true;

            // Reset previous error states
            [name, email, message].forEach(field => {
                if (field) field.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            });

            // Validate name
            if (name && name.value.trim() === '') {
                name.style.borderColor = '#dc3545';
                isValid = false;
            }

            // Validate email
            if (email) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(email.value.trim())) {
                    email.style.borderColor = '#dc3545';
                    isValid = false;
                }
            }

            // Validate message
            if (message && message.value.trim() === '') {
                message.style.borderColor = '#dc3545';
                isValid = false;
            }

            if (!isValid) {
                e.preventDefault();
            }
        });
    }

    // --- INITIALIZE ON PAGE LOAD ---
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    window.addEventListener('load', () => {
        activateNavLink();
        // Set initial state for nav links on mobile
        if (window.innerWidth <= 768) {
            navListItems.forEach(link => {
                link.style.animation = '';
            });
        }
        
        // Remove initial opacity from first section
        if (sections[0]) {
            sections[0].style.opacity = '1';
            sections[0].style.transform = 'translateY(0)';
        }
    });

    // --- HANDLE WINDOW RESIZE WITH DEBOUNCING ---
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Reset menu state on resize
            if (window.innerWidth > 992 && navMenu.classList.contains('nav-active')) {
                navMenu.classList.remove('nav-active');
                navOverlay.classList.remove('active');
                hamburger.classList.remove('toggle');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = 'auto';
                navListItems.forEach(link => {
                    link.style.animation = '';
                });
            }
        }, 250);
    }, { passive: true });
});

