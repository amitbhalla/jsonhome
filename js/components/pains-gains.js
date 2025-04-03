// File: js/components/pains-gains.js
// Pains & Gains section component functionality

// Fetch pains & gains data and render
async function loadPainsGains() {
    try {
        const response = await fetch('./data/pains-gains.json');
        const data = await response.json();
        renderPainsGains(data);
    } catch (error) {
        console.error('Error loading pains & gains data:', error);
    }
}

// Render pains & gains section with data
function renderPainsGains(data) {
    const painsGainsContainer = document.getElementById('pains-gains-container');
    
    const painsGainsHTML = `
        <!-- Blob SVGs -->
        <div class="blob blob-1">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="var(--primary)" d="M43.1,-73.6C57.1,-67.5,70.3,-57.5,77.7,-44.2C85.1,-30.8,86.6,-14.4,83.5,0.6C80.4,15.6,72.7,29.3,64.4,42.7C56.1,56.1,47.1,69.3,34.7,74.6C22.3,79.8,6.5,77.2,-7.8,72.3C-22.1,67.5,-35,60.4,-47.7,51.7C-60.4,43,-73,32.6,-78.1,19.3C-83.2,5.9,-80.9,-10.5,-75.2,-25.4C-69.6,-40.3,-60.6,-53.7,-48.3,-60.7C-36,-67.7,-20.5,-68.3,-4.9,-60.3C10.7,-52.3,29.1,-79.7,43.1,-73.6Z"></path>
            </svg>
        </div>
        <div class="blob blob-2 blob-rotate">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="var(--secondary)" d="M38.1,-65.2C50.8,-59.8,63.5,-52.6,69.7,-41.7C75.9,-30.8,75.5,-16.4,71.9,-3.9C68.3,8.7,61.6,19.7,55.3,31.3C49,42.9,43.1,55.1,33.2,62.1C23.2,69.1,9.1,70.9,-4.1,69.1C-17.3,67.3,-29.6,62,-38.4,53.7C-47.3,45.3,-52.6,33.9,-56.7,22.4C-60.7,10.8,-63.4,-0.9,-63.4,-13.5C-63.4,-26.1,-60.7,-39.6,-52.5,-48.1C-44.2,-56.7,-30.5,-60.3,-17.9,-65.8C-5.3,-71.2,7.3,-78.5,19.3,-78.2C31.3,-77.9,42.8,-70,38.1,-65.2Z"></path>
            </svg>
        </div>
        <div class="container problem-container">
            <div class="problem-header">
                <span class="section-tag">${data.sectionTag}</span>
                <h2>${data.title}</h2>
                <p>
                    ${data.description}
                </p>
            </div>
            <div class="problem-cards">
                ${data.problems.map((problem, index) => `
                    <div class="problem-card" data-aos="fade-up" data-aos-delay="${index * 100}">
                        <div class="problem-icon">
                            <i class="${problem.icon}"></i>
                        </div>
                        <h3 class="problem-title">${problem.title}</h3>
                        <p class="problem-description">
                            ${problem.description}
                        </p>
                        ${problem.points.map(point => `
                            <div class="problem-check">
                                <i class="fas fa-check-circle"></i>
                                <span>${point}</span>
                            </div>
                        `).join('')}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    painsGainsContainer.innerHTML = painsGainsHTML;
}

// Load pains & gains section on DOM content loaded
document.addEventListener('DOMContentLoaded', loadPainsGains);