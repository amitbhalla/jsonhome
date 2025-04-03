// File: js/pages/resources.js
// Main entry point for the resources page JavaScript

// Import shared component scripts
import '../components/navbar.js';
import '../components/contact.js';
import '../components/footer.js';

// Import resources page specific components
import '../components/resources-hero.js';
import '../components/resources-list.js';
import '../components/resources-modal.js';

// Initialize AOS animation library
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Global event listeners and functionality

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