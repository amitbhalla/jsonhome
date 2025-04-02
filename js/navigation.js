// When DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation functionality
    initNavigation();
});

function initNavigation() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            // Only scroll if the target exists on the current page
            if (document.querySelector(targetId)) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (mobileMenuBtn) {
                        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                }

                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header Scroll Effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });
    
    // Set active nav link based on current page
    setActiveNavLink();
}

function setActiveNavLink() {
    // Get current page URL path
    const path = window.location.pathname;
    const pageName = path.split('/').pop();
    
    console.log("Current page:", pageName);
    
    // Get all nav links
    const navLinks = document.querySelectorAll('.nav-links a:not(.btn)');
    
    // Remove active from any links that might have it hardcoded in HTML
    navLinks.forEach(link => {
        // Remove all active classes first
        link.classList.remove('active');
    });
    
    // Handle index.html/home page
    if (pageName === '' || pageName === 'index.html' || path === '/') {
        navLinks.forEach(link => {
            if (link.textContent.trim() === 'HOME') {
                link.classList.add('active');
            }
        });
        return;
    }
    
    // Handle other pages - match based on page filename
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Extract filename from href
        const hrefPage = href.split('/').pop();
        
        if (hrefPage === pageName) {
            link.classList.add('active');
            console.log("Set active:", link.textContent);
        }
        
        // Special case for blog post pages
        if (pageName === 'blog-post.html' && hrefPage === 'blog.html') {
            link.classList.add('active');
        }
        
        // Special case for resource page
        if (pageName === 'resource.html' && hrefPage === 'resources.html') {
            link.classList.add('active');
        }
    });
    
    // Add style tag to ensure active styling is applied
    const styleEl = document.createElement('style');
    styleEl.textContent = `
        .nav-links a.active {
            color: var(--accent) !important;
            font-weight: 700 !important;
        }
        
        .nav-links a.active::after {
            content: '' !important;
            position: absolute !important;
            bottom: -5px !important;
            left: 0 !important;
            width: 100% !important;
            height: 3px !important;
            background: var(--accent) !important;
            display: block !important;
        }
    `;
    document.head.appendChild(styleEl);
}