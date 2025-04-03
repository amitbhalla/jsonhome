// File: js/components/about/hero.js
// About page hero section component

// Fetch about hero data and render
async function loadAboutHero() {
    try {
        const response = await fetch('./data/about/hero.json');
        const data = await response.json();
        renderAboutHero(data);
    } catch (error) {
        console.error('Error loading about hero data:', error);
    }
}

// Render about hero section with data
function renderAboutHero(data) {
    const aboutHeroContainer = document.getElementById('about-hero-container');
    
    const aboutHeroHTML = `
        <div class="hero-shapes">
            <div class="hero-shape hero-shape-1"></div>
            <div class="hero-shape hero-shape-2"></div>
            <div class="hero-shape hero-shape-3"></div>
        </div>
        <div class="container about-hero-container">
            <div class="about-hero-content">
                <div class="hero-subtitle">${data.subtitle}</div>
                <h1 class="hero-title">${data.title}</h1>
                <p class="hero-description">
                    ${data.description}
                </p>
                <div class="about-hero-stats">
                    ${data.stats.map(stat => `
                        <div class="about-hero-stat">
                            <div class="stat-value">${stat.value}<span class="stat-suffix">${stat.suffix}</span></div>
                            <div class="stat-description">${stat.description}</div>
                        </div>
                    `).join('')}
                </div>
                <div class="hero-cta">
                    ${data.ctaButtons.map(btn => `
                        <a href="${btn.href}" class="${btn.className}" ${btn.download ? 'download' : ''}>${btn.text}</a>
                    `).join('')}
                </div>
            </div>
            <div class="about-hero-image-container">
                <div class="hero-image-bg"></div>
                <img src="${data.image.src}" alt="${data.image.alt}" class="about-hero-image">
            </div>
        </div>
    `;
    
    aboutHeroContainer.innerHTML = aboutHeroHTML;
}

// Load about hero section on DOM content loaded
document.addEventListener('DOMContentLoaded', loadAboutHero);