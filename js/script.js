document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Toggle icon between bars and times (X)
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Scroll Animation (Simple Reveal)
    const revealElements = document.querySelectorAll('.section-title, .about-content, .card, .timeline-item, .skill-category');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial styles for reveal elements
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease-out';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load

    // ScrollSpy (Active Link on Scroll)
    const sections = document.querySelectorAll('header.hero, section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // 200px offset for navbar/better trigger point
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
            // Logic to handle Home/Hero which might not have an ID but is at top
            if (section.classList.contains('hero') && pageYOffset < 300) {
                // If clearly at top, ensure no other nav is active or if we had a Home link it would be valid.
                // Currently we assume no link points to Hero directly via ID in the list except Logo?
                // But wait, if scrolling down, the logic above finds the last section that matches.
            }
        });

        navItems.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href').includes(current) && current !== '') {
                li.classList.add('active');
            }
        });
    });

    // Dark Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');

            if (body.classList.contains('dark-mode')) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Robot Mascot Interaction
    const robotContainer = document.getElementById('robot-mascot');
    const robotEyes = document.querySelector('.robot-eyes');

    // Make robot eyes look at cursor
    document.addEventListener('mousemove', (e) => {
        if (!robotContainer) return;

        const robotRect = robotContainer.getBoundingClientRect();
        const robotCenter = {
            x: robotRect.left + robotRect.width / 2,
            y: robotRect.top + robotRect.height / 2
        };

        // Calculate distance
        const dx = e.clientX - robotCenter.x;
        const dy = e.clientY - robotCenter.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Eye Movement
        if (robotEyes) {
            const angle = Math.atan2(dy, dx);
            const maxEyeMove = 3;
            const eyeX = Math.cos(angle) * maxEyeMove;
            const eyeY = Math.sin(angle) * maxEyeMove;
            robotEyes.style.transform = `translate(${eyeX}px, ${eyeY}px)`;
        }

        // Blur Effect removed as per user request
    });

    // Automated Robot Conversation Loop
    const tooltip = document.querySelector('.robot-tooltip');

    if (tooltip) {
        let isComplaint = false;

        setInterval(() => {
            if (isComplaint) {
                tooltip.textContent = "Halo sanak";
                isComplaint = false;
            } else {
                tooltip.textContent = "APO KELUHAN?";
                isComplaint = true;
            }
        }, 3000); // Toggle every 3 seconds
    }

    // Visitor Counter Simulation
    const countDisplay = document.getElementById('visitor-count');
    if (countDisplay) {
        // Base count starts from zero
        const baseCount = 0;

        // Get actual visits from local storage
        let localVisits = localStorage.getItem('site_visits');
        if (!localVisits) localVisits = 0;

        // Increment
        localVisits = parseInt(localVisits) + 1;
        localStorage.setItem('site_visits', localVisits);

        // Display total
        const totalViews = baseCount + localVisits;
        countDisplay.textContent = totalViews.toString();
    }
});

// Contact Pill Toggle
function togglePill(element) {
    // Optional: Close other pills when one is clicked
    const allPills = document.querySelectorAll('.contact-pill');
    allPills.forEach(pill => {
        if (pill !== element) {
            pill.classList.remove('active');
        }
    });

    element.classList.toggle('active');
}
