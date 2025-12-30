import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// --- Firebase Configuration ---
const firebaseConfig = {
    apiKey: "AIzaSyBso_SasiHHB2Z2rRe9MXATs8Md84w2khY",
    authDomain: "portfolio-hafiz-5c86b.firebaseapp.com",
    projectId: "portfolio-hafiz-5c86b",
    storageBucket: "portfolio-hafiz-5c86b.firebasestorage.app",
    messagingSenderId: "861471865210",
    appId: "1:861471865210:web:0ca3c9e1db319211c9bec3",
    measurementId: "G-FR7Q4VGXBX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
            if (section.classList.contains('hero') && pageYOffset < 300) {
                // Hero logic
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
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null; // Safe check

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
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

        // Eye Movement
        if (robotEyes) {
            const angle = Math.atan2(dy, dx);
            const maxEyeMove = 3;
            const eyeX = Math.cos(angle) * maxEyeMove;
            const eyeY = Math.sin(angle) * maxEyeMove;
            robotEyes.style.transform = `translate(${eyeX}px, ${eyeY}px)`;
        }
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
        const namespace = 'hafiz-portfolio-project-v1';
        const key = 'visits';

        fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
            .then(response => response.json())
            .then(data => {
                countDisplay.textContent = data.value;
            })
            .catch(error => {
                console.log('Counter API unavailable, using local fallback');
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
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px"
    });

    silhouetteElements.forEach(el => silhouetteObserver.observe(el));
});

// Contact Pill Toggle
window.togglePill = function (element) {
    const allPills = document.querySelectorAll('.contact-pill');
    allPills.forEach(pill => {
        if (pill !== element && pill.classList.contains('active')) {
            pill.classList.remove('active');
        }
    });
    element.classList.toggle('active');
};

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
            if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
            if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
            this.x += this.directionX * 0.5;
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
        aboutSlides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % aboutSlides.length;
        aboutSlides[currentSlide].classList.add('active');
    }

    setInterval(nextSlide, 4000);
}

// --- CLOUD FIREBASE GUESTBOOK LOGIC (Global) ---
document.addEventListener('DOMContentLoaded', () => {
    const guestbookForm = document.getElementById('guestbook-form');
    const commentsList = document.getElementById('comments-list');

    // Realtime Listener for Messages
    if (commentsList) {
        const q = query(collection(db, "messages"), orderBy("timestamp", "desc"));
        onSnapshot(q, (snapshot) => {
            const comments = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            if (comments.length === 0) {
                commentsList.innerHTML = '<div class="empty-state">Belum ada pesan. Jadilah yang pertama!</div>';
            } else {
                commentsList.innerHTML = comments.map(c => `
                    <div class="comment-item">
                        <div class="comment-header">
                            <span class="comment-name">${escapeHtml(c.name)}</span>
                            <span class="comment-date">${c.date || 'Baru Saja'}</span>
                        </div>
                        <div class="comment-body">${escapeHtml(c.message)}</div>
                    </div>
                `).join('');
            }
        }, (error) => {
            console.error("Error reading messages:", error);
            commentsList.innerHTML = '<div class="empty-state">Gagal memuat pesan (Cek koneksi).</div>';
        });
    }

    // Handle Submission
    if (guestbookForm) {
        guestbookForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('guest-name');
            const msgInput = document.getElementById('guest-message');

            if (nameInput.value.trim() && msgInput.value.trim()) {
                const btn = guestbookForm.querySelector('button');
                const originalText = btn.innerHTML;
                btn.innerHTML = 'Sending...';
                btn.disabled = true;

                try {
                    // Create a timeout promise (30 seconds)
                    const timeout = new Promise((_, reject) =>
                        setTimeout(() => reject(new Error("Timeout! Cek koneksi internet atau Firewall.")), 30000)
                    );

                    // Race between addDoc and timeout
                    await Promise.race([
                        addDoc(collection(db, "messages"), {
                            name: nameInput.value.trim(),
                            message: msgInput.value.trim(),
                            date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
                            timestamp: serverTimestamp()
                        }),
                        timeout
                    ]);

                    nameInput.value = '';
                    msgInput.value = '';
                    showToast("Pesan Terkirim ke Cloud! Muncul untuk semua orang.", "success");
                } catch (err) {
                    console.error("Error adding message: ", err);
                    showToast("Gagal kirim: " + err.message, "error");
                } finally {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                }
            }
        });
    }
});

// Modern Toast Notification Function
function showToast(message, type = 'success') {
    // Create container if not exists
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container); // Append to body, not inside other elements
    }

    // Create Toast Element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    // Icon based on type
    const icon = type === 'success' ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-exclamation-circle"></i>';

    toast.innerHTML = `${icon} <span>${message}</span>`;

    container.appendChild(toast);

    // Remove after 4 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOutToast 0.4s forwards';
        setTimeout(() => toast.remove(), 400); // Wait for animation
    }, 4000);
}

// Security helper
function escapeHtml(text) {
    if (!text) return "";
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// --- Floating Background Icons ---
function createFloatingIcons() {
    const icons = [
        'fa-satellite', 'fa-html5', 'fa-react', 'fa-js', 'fa-css3-alt',
        'fa-code', 'fa-laptop-code', 'fa-rocket'
    ];
    const container = document.body;
    const count = 15; // Number of floating icons

    for (let i = 0; i < count; i++) {
        const iconClass = icons[Math.floor(Math.random() * icons.length)];
        const icon = document.createElement('i');
        const prefix = (iconClass === 'fa-satellite' || iconClass === 'fa-code' || iconClass === 'fa-laptop-code' || iconClass === 'fa-rocket') ? 'fas' : 'fab';

        icon.classList.add(prefix, iconClass, 'floating-icon');
        icon.style.left = Math.random() * 100 + 'vw';
        icon.style.top = Math.random() * 100 + 'vh';

        const size = Math.random() * 2 + 1;
        icon.style.fontSize = size + 'rem';

        const duration = Math.random() * 20 + 10;
        icon.style.animationDuration = duration + 's';

        icon.style.animationDelay = Math.random() * 5 + 's';

        container.appendChild(icon);
    }
}

createFloatingIcons();
