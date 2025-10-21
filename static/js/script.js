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
        const scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150; // Offset for better accuracy
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

    // --- NAVBAR SCROLL EFFECT ---
    let lastScroll = 0;
    const handleScroll = () => {
        const currentScroll = window.scrollY;
        
        // Add shadow on scroll
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        }

        activateNavLink();
        lastScroll = currentScroll;
    };

    // --- HAMBURGER MENU LOGIC ---
    const toggleNav = () => {
        // Toggle Nav menu visibility
        navMenu.classList.toggle('nav-active');
        navOverlay.classList.toggle('active');

        // Animate links fading in
        navListItems.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Animate hamburger icon to an 'X'
        hamburger.classList.toggle('toggle');

        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('nav-active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
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
        link.addEventListener('click', (e) => {
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
                    const offsetTop = targetSection.offsetTop - navbarHeight - 20; // Extra 20px buffer
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- INITIALIZE ON PAGE LOAD ---
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('load', () => {
        activateNavLink();
        // Set initial state for nav links on mobile
        if (window.innerWidth <= 768) {
            navListItems.forEach(link => {
                link.style.animation = '';
            });
        }
    });

    // --- HANDLE WINDOW RESIZE ---
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Reset menu state on resize
            if (window.innerWidth > 768 && navMenu.classList.contains('nav-active')) {
                navMenu.classList.remove('nav-active');
                navOverlay.classList.remove('active');
                hamburger.classList.remove('toggle');
                document.body.style.overflow = 'auto';
                navListItems.forEach(link => {
                    link.style.animation = '';
                });
            }
        }, 250);
    });
});

