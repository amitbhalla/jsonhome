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
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }

            // Scroll to the target
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

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
});