// Magic Mouse Effect with Spotlight
document.addEventListener('DOMContentLoaded', function() {
    const circle = document.querySelector('.magic-circle');
    const spotlight = document.querySelector('.spotlight');
    
    // Update mouse position for both effects
    document.addEventListener('mousemove', function(e) {
        // Magic circle
        circle.style.left = e.pageX + 'px';
        circle.style.top = e.pageY + 'px';
        
        // Spotlight effect
        if (spotlight) {
            spotlight.style.setProperty('--clientX', (e.clientX / window.innerWidth) * 100 + '%');
            spotlight.style.setProperty('--clientY', (e.clientY / window.innerHeight) * 100 + '%');
        }
        
        // Create trailing particles
        createTrailParticle(e.pageX, e.pageY);
    });
    
    // Enhanced click effect
    document.addEventListener('click', function(e) {
        circle.style.width = '150px';
        circle.style.height = '150px';
        
        // Create click ripple
        createClickRipple(e.pageX, e.pageY);
        
        setTimeout(() => {
            circle.style.width = '120px';
            circle.style.height = '120px';
        }, 150);
    });
    
    // Create trail particles
    function createTrailParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'trail-particle';
        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 4px;
            background: linear-gradient(45deg, #923FFF, #7DBFFF);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transform: translate(-50%, -50%);
            opacity: 0.8;
            animation: fadeOut 0.5s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (document.body.contains(particle)) {
                document.body.removeChild(particle);
            }
        }, 500);
    }
    
    // Create click ripple effect
    function createClickRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.className = 'click-ripple';
        ripple.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            border: 2px solid rgba(146, 63, 255, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9997;
            transform: translate(-50%, -50%);
            animation: rippleExpand 0.6s ease-out forwards;
        `;
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            if (document.body.contains(ripple)) {
                document.body.removeChild(ripple);
            }
        }, 600);
    }
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
        }
    }
    
    @keyframes rippleExpand {
        to {
            width: 100px;
            height: 100px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Navigation toggle for mobile
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Project filtering with enhanced animations
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value
        const filterValue = button.getAttribute('data-filter');
        
        // Filter projects with stagger animation
        projectCards.forEach((card, index) => {
            card.style.transition = 'all 0.5s ease';
            
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                setTimeout(() => {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                }, index * 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(-30px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Enhanced form submission with validation
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Form validation
    const inputs = this.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        const inputContainer = input.parentElement;
        
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#ff4757';
            input.style.boxShadow = '0 0 10px rgba(255, 71, 87, 0.3)';
            
            // Show error message
            let errorMsg = inputContainer.querySelector('.error-message');
            if (!errorMsg) {
                errorMsg = document.createElement('span');
                errorMsg.className = 'error-message';
                errorMsg.style.cssText = 'color: #ff4757; font-size: 0.8rem; margin-top: 5px; display: block;';
                errorMsg.textContent = 'This field is required';
                inputContainer.appendChild(errorMsg);
            }
        } else {
            input.style.borderColor = 'rgba(146, 63, 255, 0.3)';
            input.style.boxShadow = 'none';
            
            // Remove error message
            const errorMsg = inputContainer.querySelector('.error-message');
            if (errorMsg) {
                inputContainer.removeChild(errorMsg);
            }
        }
    });
    
    // Email validation
    const emailInput = this.querySelector('input[type="email"]');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value && !emailRegex.test(emailInput.value)) {
        isValid = false;
        emailInput.style.borderColor = '#ff4757';
        emailInput.style.boxShadow = '0 0 10px rgba(255, 71, 87, 0.3)';
    }
    
    if (isValid) {
        // Success animation
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.textContent = 'Sent Successfully!';
            submitBtn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = 'linear-gradient(135deg, var(--purple-primary), var(--purple-secondary), var(--blue-accent))';
                this.reset();
            }, 2000);
        }, 1500);
        
        // Show success message
        showNotification('Thank you for your message! I will get back to you soon.', 'success');
    } else {
        showNotification('Please fill in all required fields correctly.', 'error');
    }
});

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #27ae60, #2ecc71)' : 'linear-gradient(135deg, #e74c3c, #c0392b)'};
        color: white;
        border-radius: 10px;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        font-weight: 500;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Animate elements on scroll with enhanced effects
function animateOnScroll() {
    const elements = document.querySelectorAll('.skill-card, .project-card, .about-image, .about-text, .contact-item, .stat');
    
    elements.forEach((element, index) => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0) scale(1)';
            }, index * 100);
        }
    });
}

// Set initial state for scroll animations
document.querySelectorAll('.skill-card, .project-card, .about-image, .about-text, .contact-item, .stat').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(50px) scale(0.9)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Enhanced scroll events
window.addEventListener('scroll', () => {
    animateOnScroll();
    
    // Parallax effect for floating icons
    const scrolled = window.pageYOffset;
    const parallax = document.querySelectorAll('.floating-icon');
    
    parallax.forEach((icon, index) => {
        const speed = 0.3 + (index * 0.1);
        icon.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Initial load animation
window.addEventListener('load', () => {
    animateOnScroll();
    
    // Animate hero content
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .btn');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Performance optimization: Throttle scroll events
let ticking = false;

function updateOnScroll() {
    animateOnScroll();
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});




// Magic Mouse Effect
document.addEventListener('mousemove', (e) => {
  const circle = document.querySelector('.magic-circle');
  circle.style.left = `${e.pageX}px`;
  circle.style.top = `${e.pageY}px`;
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// EmailJS Configuration
(function() {
  emailjs.init("YOUR_PUBLIC_KEY"); // Replace YOUR_PUBLIC_KEY
})();
const form = document.getElementById("contactForm");
form.addEventListener("submit", function(e){
  e.preventDefault();
  emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this)
    .then(() => alert("Message sent!"), err => alert("Error: " + JSON.stringify(err)));
});

