// JavaScript Document for Rashik Ahmed Portfolio

/*
TemplateMo 600 Prism Flux - Customized for Rashik Ahmed
https://templatemo.com/tm-600-prism-flux
*/

// Skills data specific to Rashik Ahmed
const skillsData = [
    // Design Skills
    { name: 'Adobe Photoshop', icon: '🎨', level: 75, category: 'design' },
    { name: 'Adobe Illustrator', icon: '✏️', level: 70, category: 'design' },
    { name: 'Graphic Design', icon: '🖼️', level: 80, category: 'design' },
    { name: 'Adobe AI Tools', icon: '🤖', level: 65, category: 'design' },
    
    // Digital Marketing
    { name: 'Social Media Marketing', icon: '📱', level: 85, category: 'digital' },
    { name: 'Content Writing', icon: '✍️', level: 82, category: 'digital' },
    { name: 'Brand Strategy', icon: '🎯', level: 88, category: 'digital' },
    { name: 'Campaign Management', icon: '📊', level: 80, category: 'digital' },
    
    // Tools & Software
    { name: 'Microsoft Office', icon: '📄', level: 90, category: 'tools' },
    { name: 'Google Suite', icon: '📑', level: 85, category: 'tools' },
    { name: 'Microsoft Excel', icon: '📊', level: 82, category: 'tools' },
    { name: 'STATA', icon: '📈', level: 60, category: 'tools' },
];

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    const header = document.getElementById('header');
    if (section) {
        const headerHeight = header.offsetHeight;
        const targetPosition = section.offsetTop - headerHeight;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Initialize particles for philosophy section
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random horizontal position
        particle.style.left = Math.random() * 100 + '%';
        
        // Random vertical position
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation delay for natural movement
        particle.style.animationDelay = Math.random() * 20 + 's';
        
        // Random animation duration for variety
        particle.style.animationDuration = (18 + Math.random() * 8) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Initialize hexagonal skills grid
function initSkillsGrid() {
    const skillsGrid = document.getElementById('skillsGrid');
    if (!skillsGrid) return;
    
    const categoryTabs = document.querySelectorAll('.category-tab');
    
    function displaySkills(category = 'all') {
        skillsGrid.innerHTML = '';
        
        const filteredSkills = category === 'all' 
            ? skillsData 
            : skillsData.filter(skill => skill.category === category);
        
        filteredSkills.forEach((skill, index) => {
            const hexagon = document.createElement('div');
            hexagon.className = 'skill-hexagon';
            hexagon.style.animationDelay = `${index * 0.1}s`;
            
            hexagon.innerHTML = `
                <div class="hexagon-inner">
                    <div class="hexagon-content">
                        <div class="skill-icon-hex">${skill.icon}</div>
                        <div class="skill-name-hex">${skill.name}</div>
                        <div class="skill-level">
                            <div class="skill-level-fill" style="width: ${skill.level}%"></div>
                        </div>
                        <div class="skill-percentage-hex">${skill.level}%</div>
                    </div>
                </div>
            `;
            
            skillsGrid.appendChild(hexagon);
        });
    }
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            displaySkills(tab.dataset.category);
        });
    });
    
    displaySkills();
}

// Animated counter for stats
function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const counter = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Intersection Observer for stats animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(number => {
                if (!number.classList.contains('animated')) {
                    number.classList.add('animated');
                    animateCounter(number);
                }
            });
        }
    });
}, observerOptions);

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const header = document.getElementById('header');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling and active navigation
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
            if (menuToggle) menuToggle.classList.remove('active');
        }
    });
});

// Update active navigation on scroll
function updateActiveNav() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href').substring(1);
                if (href === sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Show success message
        alert(`Thank you ${data.name}! Your message has been received. I'll get back to you within 24 hours.`);
        
        // Reset form
        contactForm.reset();
    });
}

// Loading screen
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('hidden');
        }
    }, 1500);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Keyboard navigation for sections
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu) {
        navMenu.classList.remove('active');
        if (menuToggle) menuToggle.classList.remove('active');
    }
});

// Update carousel on window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Trigger any resize-dependent updates
    }, 250);
});

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initSkillsGrid();
    initParticles();
    
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }
});

// Prevent context menu in production (optional)
// document.addEventListener('contextmenu', (e) => e.preventDefault());

// Add scroll-to-top functionality
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #9945ff, #00a8ff);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 5px 20px rgba(153, 69, 255, 0.3);
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });
}

// Initialize scroll-to-top button after page load
window.addEventListener('load', () => {
    createScrollToTopButton();
});

// Smooth fade-in for elements on scroll
function observeElements() {
    const fadeInElements = document.querySelectorAll('section, .card, .education-card, .language-card');
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    fadeInElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInObserver.observe(el);
    });
}

// Initialize fade-in effects
document.addEventListener('DOMContentLoaded', () => {
    observeElements();
});

// Add smooth transitions on link hover
navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Analytics tracking (optional - uncomment to use)
/*
function trackPageView() {
    console.log('User viewing:', window.location.pathname);
}

window.addEventListener('load', trackPageView);
*/

// Export functions for external use
window.scrollToSection = scrollToSection;
window.animateCounter = animateCounter;