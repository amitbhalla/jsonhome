// File: js/components/navbar.js
// Navbar component functionality

// Fetch navbar data and render
async function loadNavbar() {
    try {
        const response = await fetch('./data/navbar.json');
        const data = await response.json();
        renderNavbar(data);
        setupEventListeners();
    } catch (error) {
        console.error('Error loading navbar data:', error);
    }
}

// Render navbar with data
function renderNavbar(data) {
    const navbarContainer = document.getElementById('navbar-container');
    
    const navbarHTML = `
        <div class="container">
            <nav>
                <a href="#" class="logo">
                    <i class="${data.logo.icon}"></i> ${data.logo.text}
                </a>
                <div class="nav-links">
                    ${data.menuItems.map(item => `
                        <a href="${item.href}" class="nav-link">${item.text}</a>
                    `).join('')}
                    <a href="${data.ctaButton.href}" class="${data.ctaButton.className}" ${data.ctaButton.download ? 'download' : ''}>${data.ctaButton.text}</a>
                </div>
                <button class="mobile-menu-btn">
                    <i class="fas fa-bars"></i>
                </button>
            </nav>
        </div>
    `;
    
    navbarContainer.innerHTML = navbarHTML;
}

// Setup event listeners for navbar
function setupEventListeners() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Notify main.js that the navbar has loaded
    document.dispatchEvent(new CustomEvent('navbarLoaded'));
}

// Load navbar on DOM content loaded
document.addEventListener('DOMContentLoaded', loadNavbar);