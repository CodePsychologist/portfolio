/**
 * Portfolio Website JavaScript
 * Handles mobile menu, smooth scrolling, form submissions, and animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const contactForm = document.getElementById('contact-form');
    const skillLevels = document.querySelectorAll('.skill-level');
    const businessCardInner = document.querySelector('.business-card-inner');
    
    // Mobile Menu Toggle
    const toggleMobileMenu = () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    };
    
    hamburger?.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
    
    // Smooth Scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Scroll to the target with smooth behavior
                const offsetTop = targetElement.offsetTop - 100; // Adjust for header height
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update URL without page reload
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Form Submission
    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formDataObject = Object.fromEntries(formData.entries());
            
            // For demonstration - in a real implementation, you would send this data to a server
            console.log('Form submission:', formDataObject);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success-message';
            successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
            
            contactForm.innerHTML = '';
            contactForm.appendChild(successMessage);
        });
    }
    
    // Animate skill bars on scroll
    const animateSkillBars = () => {
        skillLevels.forEach(skill => {
            const skillPosition = skill.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (skillPosition < screenPosition) {
                skill.style.width = skill.style.width || skill.getAttribute('style').match(/width:\s*(\d+%)/)[1];
            } else {
                skill.style.width = '0%';
            }
        });
    };
    
    // Project cards hover animation
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('hover');
        });
    });
    
    // Execute animations when scrolling
    window.addEventListener('scroll', () => {
        animateSkillBars();
    });
    
    // Run animations on initial load
    setTimeout(animateSkillBars, 500);
    
    // Business Card Flip Functionality
    const initBusinessCard = () => {
        const businessCard = document.querySelector('.business-card-inner');
        const flipButtons = document.querySelectorAll('.card-flip-btn');
        
        if (businessCard && flipButtons.length) {
            flipButtons.forEach(button => {
                button.addEventListener('click', () => {
                    businessCard.classList.toggle('flipped');
                });
            });
        }
    };
    
    // Initialize business card
    initBusinessCard();
});

// Add CSS for mobile navigation in active state
document.head.insertAdjacentHTML('beforeend', `
    <style>
    @media (max-width: 768px) {
        .hamburger.active .bar:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .hamburger.active .bar:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active .bar:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
        
        .nav-menu.active {
            left: 0;
            padding: 2rem 0;
        }
        
        .nav-item {
            margin: 2rem 0;
        }
        
        .hamburger {
            display: block;
        }
        
        body.no-scroll {
            overflow: hidden;
        }
        
        .form-success-message {
            padding: 2rem;
            background-color: #d4edda;
            color: #155724;
            border-radius: 0.5rem;
            text-align: center;
            font-weight: 600;
        }
    }
    </style>
`);

