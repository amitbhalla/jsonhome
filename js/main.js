// File: js/main.js
// Main entry point for the website JavaScript

// Import component scripts
import './components/navbar.js';
import './components/hero.js';
import './components/pains-gains.js';
import './components/solutions.js';
import './components/services.js';
import './components/approach.js';
import './components/success-stories.js';
import './components/testimonials.js';
import './components/faq.js';
import './components/contact.js';
import './components/footer.js';

// Initialize AOS animation library
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Global event listeners and functionality
    
    // Wait for all components to load before setting up smooth scrolling
    setTimeout(() => {
        setupSmoothScrolling();
    }, 500);

    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Dynamic year for copyright
    const footerCopyright = document.querySelector('.footer-copyright');
    if (footerCopyright) {
        footerCopyright.innerHTML = footerCopyright.innerHTML.replace(/\d{4}/, new Date().getFullYear());
    }
    // Add scroll to top button to the body
    const scrollButton = document.createElement('div');
        scrollButton.className = 'scroll-to-top';
        scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(scrollButton);

    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });

    // Scroll to top when button is clicked
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
                top: 0,
            behavior: 'smooth'
        });
    });
});

// Function to set up smooth scrolling for all anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Get the target element
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            // Only proceed if target element exists
            if (!targetElement) return;
            
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }

            // Get the header height for offset (if header is fixed)
            const headerHeight = document.querySelector('header').offsetHeight;
            
            // Calculate the final scroll position with offset
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

            // Smooth scroll to the target
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
}