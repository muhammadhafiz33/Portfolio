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
    const revealElements = document.querySelectorAll('.section-title, .about-content, .timeline-item, .skill-category');

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

    // Realtime Visitor Counter (using CountAPI)
    const countDisplay = document.getElementById('visitor-count');
    if (countDisplay) {
        // Unique identifier for this project
        const namespace = 'hafiz-portfolio-project-v1';
        const key = 'visits';

        // Try to get global count
        fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
            .then(response => response.json())
            .then(data => {
                countDisplay.textContent = data.value;
            })
            .catch(error => {
                console.log('Counter API unavailable, using local fallback');
                // Fallback: Use local storage if API is blocked/down
                let localVisits = localStorage.getItem('site_visits') || 0;
                localVisits = parseInt(localVisits) + 1;
                localStorage.setItem('site_visits', localVisits);
                countDisplay.textContent = localVisits;
            });
    }

    // Scroll Reveal Animation Observer (Silhouette Effect)
    const silhouetteElements = document.querySelectorAll('.scroll-reveal');
    const silhouetteObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Removed unobserve to allow repeat
            } else {
                // Remove class when out of view to reset animation
                entry.target.classList.remove('active');
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% visible
        rootMargin: "0px"
    });

    silhouetteElements.forEach(el => silhouetteObserver.observe(el));
});

// Contact Pill Toggle
function togglePill(element) {
    // Optional: Close other pills when one is clicked
    const allPills = document.querySelectorAll('.contact-pill');
    allPills.forEach(pill => {
        if (pill !== element && pill.classList.contains('active')) {
            pill.classList.remove('active');
        }
    });
    element.classList.toggle('active');
}

// --- Particle Background Animation ---
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Theme Colors
    let particleColor = 'rgba(79, 70, 229, 0.5)'; // Default Primary
    let lineColor = 'rgba(79, 70, 229, 0.1)';

    function updateThemeColors() {
        if (document.body.classList.contains('dark-mode')) {
            particleColor = 'rgba(255, 255, 255, 0.2)';
            lineColor = 'rgba(255, 255, 255, 0.05)';
        } else {
            particleColor = 'rgba(79, 70, 229, 0.5)';
            lineColor = 'rgba(79, 70, 229, 0.1)';
        }
    }

    // Listen for theme toggle to update colors immediatey
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            setTimeout(updateThemeColors, 50); // Small delay to wait for class toggle
        });
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.directionX = (Math.random() * 2) - 1; // Speed -1 to 1
            this.directionY = (Math.random() * 2) - 1;
            this.size = (Math.random() * 3) + 1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = particleColor;
            ctx.fill();
        }

        update() {
            // Boundary Check
            if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
            if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

            this.x += this.directionX * 0.5; // Moderate speed
            this.y += this.directionY * 0.5;

            this.draw();
        }
    }

    function init() {
        particlesArray = [];
        let numberOfParticles = (canvas.width * canvas.height) / 15000; // Density
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
        updateThemeColors();
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
    }

    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                    ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                    opacityValue = 1 - (distance / 20000);
                    ctx.strokeStyle = lineColor; // Use dynamic theme color
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });


    init();
    animate();
}

// --- About Text Slideshow ---
const aboutSlides = document.querySelectorAll('.about-slide');
if (aboutSlides.length > 0) {
    let currentSlide = 0;

    function nextSlide() {
        // Remove active class from current
        aboutSlides[currentSlide].classList.remove('active');
        // Calculate next slide index
        currentSlide = (currentSlide + 1) % aboutSlides.length;
        // Add active class to next
        aboutSlides[currentSlide].classList.add('active');
    }

    // Change slide every 4 seconds
    setInterval(nextSlide, 4000);
}

// --- Guestbook / Feedback Logic ---
const guestbookForm = document.getElementById('guestbook-form');
const commentsList = document.getElementById('comments-list');

// Load comments on start
loadComments();

if (guestbookForm) {
    guestbookForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const nameInput = document.getElementById('guest-name');
        const msgInput = document.getElementById('guest-message');

        if (nameInput.value && msgInput.value) {
            const newComment = {
                name: nameInput.value,
                message: msgInput.value,
                date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
            };

            saveComment(newComment);
            nameInput.value = '';
            msgInput.value = '';

            // Re-load to show new comment
            loadComments();
        }
    });
}

function saveComment(comment) {
    let comments = JSON.parse(localStorage.getItem('site_comments')) || [];
    comments.unshift(comment); // Add to top
    localStorage.setItem('site_comments', JSON.stringify(comments));
}

function loadComments() {
    if (!commentsList) return;

    let comments = JSON.parse(localStorage.getItem('site_comments')) || [];

    if (comments.length === 0) {
        commentsList.innerHTML = '<div class="empty-state">Belum ada pesan. Jadilah yang pertama!</div>';
        return;
    }

    commentsList.innerHTML = comments.map(c => `
        <div class="comment-item">
            <div class="comment-header">
                <span class="comment-name">${escapeHtml(c.name)}</span>
                <span class="comment-date">${c.date}</span>
            </div>
            <div class="comment-body">${escapeHtml(c.message)}</div>
        </div>
    `).join('');
}

// Security helper
function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
