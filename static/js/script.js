document.addEventListener('DOMContentLoaded', () => {

    // A reusable function to handle animations for any set of elements
    const setupAnimations = (elements, threshold = 0.2) => {
        // Check for IntersectionObserver API support
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: threshold
            });

            elements.forEach(element => {
                observer.observe(element);
            });
        } else {
            // Fallback: If API isn't supported, just show the elements
            elements.forEach(element => {
                element.classList.add('animated');
            });
        }
    };

    // Function to update the active link in the navbar
    const updateActiveLink = () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');

        let current = 'home'; // Default to home

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            // Determines the current section based on scroll position
            if (window.scrollY >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        // Loop through all nav links and add the 'active' class to the current one
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.href.includes(current)) {
                link.classList.add('active');
            }
        });
    };

    // Find the elements you want to animate
    const aboutSectionContainer = document.querySelector('.about-section-container');
    const projectCards = document.querySelectorAll('.project-card');
    const contactContainer = document.querySelector('.contact-container');

    // Set up the animations for each section
    if (aboutSectionContainer) {
        setupAnimations([aboutSectionContainer], 0.2);
    }

    if (projectCards.length > 0) {
        setupAnimations(projectCards, 0.2);
    }

    if (contactContainer) {
        setupAnimations([contactContainer], 0.2);
    }

    // Add event listeners for scroll and load to handle active link updates
    window.addEventListener('scroll', updateActiveLink);
    window.addEventListener('load', updateActiveLink);

});