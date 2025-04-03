// File: js/components/resources-hero.js
// Resources Hero section component functionality

// Fetch resources hero data and render
async function loadResourcesHero() {
    try {
        const response = await fetch('./data/resources-hero.json');
        const data = await response.json();
        renderResourcesHero(data);
    } catch (error) {
        console.error('Error loading resources hero data:', error);
    }
}

// Render resources hero section with data
function renderResourcesHero(data) {
    const heroContainer = document.getElementById('resources-hero-container');
    
    const heroHTML = `
        <div class="hero-shapes">
            <div class="hero-shape hero-shape-1"></div>
            <div class="hero-shape hero-shape-2"></div>
            <div class="hero-shape hero-shape-3"></div>
        </div>
        <div class="container hero-container">
            <div class="hero-content">
                <div class="hero-subtitle">${data.subtitle}</div>
                <h1 class="hero-title">${data.title}</h1>
                <p class="hero-description">
                    ${data.description}
                </p>
                <div class="hero-cta">
                    ${data.ctaButtons.map(btn => `
                        <a href="${btn.href}" class="${btn.className} smooth-scroll">${btn.text}</a>
                    `).join('')}
                </div>
            </div>
            <div class="hero-image-container">
                <div class="hero-image-bg"></div>
                <img src="${data.image.src}" alt="${data.image.alt}" class="hero-image">
            </div>
        </div>
    `;
    
    heroContainer.innerHTML = heroHTML;
    
    // Add smooth scrolling functionality
    setupSmoothScrolling();
}

// Setup smooth scrolling for CTA buttons
function setupSmoothScrolling() {
    const smoothScrollLinks = document.querySelectorAll('.smooth-scroll');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Load resources hero section on DOM content loaded
document.addEventListener('DOMContentLoaded', loadResourcesHero);