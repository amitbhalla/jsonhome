// File: js/components/hero.js
// Hero section component functionality

// Fetch hero data and render
async function loadHero() {
    try {
        const response = await fetch('./data/hero.json');
        const data = await response.json();
        renderHero(data);
    } catch (error) {
        console.error('Error loading hero data:', error);
    }
}

// Render hero section with data
function renderHero(data) {
    const heroContainer = document.getElementById('hero-container');
    
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
                        <a href="${btn.href}" class="${btn.className}">${btn.text}</a>
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
}

// Load hero section on DOM content loaded
document.addEventListener('DOMContentLoaded', loadHero);