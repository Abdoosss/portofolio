// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initSmoothScrolling();
    initContactForm();
    initAnimations();
    initSkillBars();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMobile = document.getElementById('navMobile');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile navigation
    navToggle.addEventListener('click', function() {
        navMobile.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = navToggle.querySelectorAll('span');
        if (navMobile.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile nav when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMobile.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMobile.contains(e.target)) {
            navMobile.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Highlight active navigation item
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`a[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    // Form validation
    function validateForm() {
        let isValid = true;
        
        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(error => {
            error.textContent = '';
        });
        
        // Remove error classes
        document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
            input.classList.remove('error');
        });

        // Validate name
        if (!nameInput.value.trim()) {
            document.getElementById('nameError').textContent = 'Name is required';
            nameInput.classList.add('error');
            isValid = false;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim()) {
            document.getElementById('emailError').textContent = 'Email is required';
            emailInput.classList.add('error');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value)) {
            document.getElementById('emailError').textContent = 'Please enter a valid email address';
            emailInput.classList.add('error');
            isValid = false;
        }

        // Validate message
        if (!messageInput.value.trim()) {
            document.getElementById('messageError').textContent = 'Message is required';
            messageInput.classList.add('error');
            isValid = false;
        }

        return isValid;
    }

    // Real-time validation
    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                this.classList.remove('error');
                const errorElement = document.getElementById(this.id + 'Error');
                if (errorElement) {
                    errorElement.textContent = '';
                }
            }
        });
    });

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = messageInput.value.trim();

            const whatsappNumber = "201204989778";
            let whatsappMessage = `Name: ${name}\n`;
            whatsappMessage += `Email: ${email}\n`;
            if (subject) {
                whatsappMessage += `Subject: ${subject}\n`;
            }
            whatsappMessage += `Message: ${message}`;

            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappUrl, "_blank");

            contactForm.reset();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    });
}

// Scroll animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.section-header, .about-text, .highlight-card, .skill-category, .project-card, .contact-info, .contact-form-container');
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Animate skill bars when they come into view
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                
                // Reset width and animate
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
                
                skillObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Header background on scroll
window.addEventListener('scroll', debounce(function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(15, 23, 42, 0.98)';
    } else {
        header.style.background = 'rgba(15, 23, 42, 0.95)';
    }
}, 10));

// Add loading animation to project images
document.addEventListener('DOMContentLoaded', function() {
    const projectPlaceholders = document.querySelectorAll('.project-placeholder');
    
    projectPlaceholders.forEach(placeholder => {
        placeholder.classList.add('loading');
        
        // Remove loading animation after a delay
        setTimeout(() => {
            placeholder.classList.remove('loading');
        }, 2000);
    });
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile navigation
    if (e.key === 'Escape') {
        const navMobile = document.getElementById('navMobile');
        const navToggle = document.getElementById('navToggle');
        
        if (navMobile.classList.contains('active')) {
            navMobile.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
});

// Add CSS for error states
const style = document.createElement('style');
style.textContent = `
    .form-group input.error,
    .form-group textarea.error {
        border-color: #ef4444;
    }
    
    .nav-link.active {
        color: var(--accent-primary);
    }
    
    .project-placeholder.loading {
        background: linear-gradient(90deg, #334155, #475569, #334155);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
    }
    
    @keyframes loading {
        0% {
            background-position: 200% 0;
        }
        100% {
            background-position: -200% 0;
        }
    }
`;
document.head.appendChild(style);

