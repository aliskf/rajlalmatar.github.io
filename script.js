// ===== DOM Elements =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const heroLoader = document.getElementById('hero-loader');
const heroCanvas = document.getElementById('hero-canvas');
const scrollIndicator = document.getElementById('scroll-indicator');

// ===== Canvas Particle System =====
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.scrollProgress = 0;
        
        this.resize();
        this.init();
        this.bindEvents();
        this.animate();
    }
    
    resize() {
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
    }
    
    init() {
        const numParticles = Math.floor((this.width * this.height) / 8000);
        this.particles = [];
        
        for (let i = 0; i < numParticles; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                baseX: Math.random() * this.width,
                baseY: Math.random() * this.height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2,
                color: this.getRandomColor()
            });
        }
    }
    
    getRandomColor() {
        const colors = [
            'rgba(99, 102, 241, ',   // Indigo
            'rgba(139, 92, 246, ',   // Purple
            'rgba(236, 72, 153, ',   // Pink
            'rgba(34, 211, 238, ',   // Cyan
            'rgba(255, 255, 255, '   // White
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    bindEvents() {
        window.addEventListener('resize', () => {
            this.resize();
            this.init();
        });
        
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }
    
    updateScrollProgress(progress) {
        this.scrollProgress = progress;
    }
    
    animate() {
        this.ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Draw connections
        this.drawConnections();
        
        // Update and draw particles
        this.particles.forEach((p, i) => {
            // Mouse interaction
            const dx = this.mouse.x - p.x;
            const dy = this.mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 150;
            
            if (dist < maxDist) {
                const force = (maxDist - dist) / maxDist;
                p.x -= dx * force * 0.02;
                p.y -= dy * force * 0.02;
            }
            
            // Scroll effect - particles spread out
            const spreadFactor = 1 + this.scrollProgress * 0.5;
            const centerX = this.width / 2;
            const centerY = this.height / 2;
            
            // Move particles
            p.x += p.speedX * spreadFactor;
            p.y += p.speedY * spreadFactor;
            
            // Return to base position slowly
            p.x += (p.baseX - p.x) * 0.01;
            p.y += (p.baseY - p.y) * 0.01;
            
            // Wrap around edges
            if (p.x < 0) p.x = this.width;
            if (p.x > this.width) p.x = 0;
            if (p.y < 0) p.y = this.height;
            if (p.y > this.height) p.y = 0;
            
            // Draw particle
            const alpha = p.opacity * (1 - this.scrollProgress * 0.3);
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color + alpha + ')';
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
    
    drawConnections() {
        const connectionDist = 120;
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const p1 = this.particles[i];
                const p2 = this.particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < connectionDist) {
                    const opacity = (1 - dist / connectionDist) * 0.15 * (1 - this.scrollProgress * 0.5);
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        }
    }
}

// ===== Hero Scroll Animation Controller =====
class HeroScrollController {
    constructor() {
        this.sections = {
            intro: document.getElementById('hero-intro'),
            statement1: document.getElementById('hero-statement-1'),
            statement2: document.getElementById('hero-statement-2')
        };
        this.profile = document.getElementById('hero-profile');
        this.scrollWrapper = document.querySelector('.hero-scroll-wrapper');
        this.particleSystem = null;
        
        this.init();
    }
    
    init() {
        // Hide loader and initialize canvas
        setTimeout(() => {
            heroLoader.classList.add('hidden');
            this.particleSystem = new ParticleSystem(heroCanvas);
            this.sections.intro.classList.add('active');
        }, 800);
        
        // Bind scroll event
        window.addEventListener('scroll', () => this.onScroll());
        this.onScroll();
    }
    
    onScroll() {
        const scrollTop = window.pageYOffset;
        const wrapperTop = this.scrollWrapper.offsetTop;
        const wrapperHeight = this.scrollWrapper.offsetHeight - window.innerHeight;
        
        // Calculate scroll progress within hero section (0 to 1)
        let progress = (scrollTop - wrapperTop) / wrapperHeight;
        progress = Math.max(0, Math.min(1, progress));
        
        // Update particle system
        if (this.particleSystem) {
            this.particleSystem.updateScrollProgress(progress);
        }
        
        // Control which section is visible based on scroll progress
        this.updateSections(progress);
        
        // Show/hide scroll indicator
        if (scrollIndicator) {
            scrollIndicator.classList.toggle('hidden', progress > 0.1);
        }
        
        // Show profile image
        if (this.profile) {
            this.profile.classList.toggle('visible', progress > 0.3 && progress < 0.9);
        }
    }
    
    updateSections(progress) {
        // Section thresholds
        const thresholds = {
            intro: { start: 0, end: 0.25 },
            statement1: { start: 0.25, end: 0.55 },
            statement2: { start: 0.55, end: 0.85 }
        };
        
        Object.entries(this.sections).forEach(([key, section]) => {
            if (!section) return;
            
            const t = thresholds[key];
            const isActive = progress >= t.start && progress < t.end;
            
            section.classList.toggle('active', isActive);
        });
    }
}

// ===== Navbar Scroll Effect =====
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===== Mobile Menu Toggle =====
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===== Smooth Scroll for Navigation =====
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Scroll Animations (Intersection Observer) =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
};

const scrollObserver = new IntersectionObserver(animateOnScroll, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Hero Scroll Controller
    new HeroScrollController();
    
    // About section
    const aboutContent = document.querySelector('.about-content');
    const aboutLanguages = document.querySelector('.about-languages');
    if (aboutContent) scrollObserver.observe(aboutContent);
    if (aboutLanguages) scrollObserver.observe(aboutLanguages);
    
    // Timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
        scrollObserver.observe(item);
    });
    
    // Skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        category.style.transitionDelay = `${index * 0.1}s`;
        scrollObserver.observe(category);
    });
    
    // Education cards
    const educationCards = document.querySelectorAll('.education-card');
    educationCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
        scrollObserver.observe(card);
    });
    
    // Contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
        scrollObserver.observe(item);
    });
    
    // Social cards
    const socialCards = document.querySelectorAll('.social-card');
    socialCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        scrollObserver.observe(card);
    });
});

// ===== Active Navigation Link =====
const sections = document.querySelectorAll('section[id]');

const highlightNavLink = () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
};

window.addEventListener('scroll', highlightNavLink);

// ===== Language Bar Animation =====
const languageBars = document.querySelectorAll('.language-fill');
const languageSection = document.querySelector('.about-languages');

const languageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            languageBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            languageObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (languageSection) {
    languageObserver.observe(languageSection);
}

// ===== Console Easter Egg =====
console.log('%c Ali Iskif - Portfolio ', 'background: linear-gradient(135deg, #6366f1, #ec4899); color: white; font-size: 20px; padding: 10px 20px; border-radius: 5px;');
console.log('%c Thanks for checking out the code! ', 'color: #a1a1a1; font-size: 12px;');
console.log('%c Built with vanilla HTML, CSS & JavaScript ', 'color: #6366f1; font-size: 12px;');
