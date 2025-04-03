// File: js/components/about/narrative.js
// Narrative section component functionality

// Fetch narrative data and render
async function loadNarrative() {
    try {
        const response = await fetch('./data/about/narrative.json');
        const data = await response.json();
        renderNarrative(data);
    } catch (error) {
        console.error('Error loading narrative data:', error);
    }
}

// Render narrative section with data
function renderNarrative(data) {
    const narrativeContainer = document.getElementById('narrative-container');
    
    const narrativeHTML = `
        <!-- Blob SVGs for visual interest -->
        <div class="blob blob-3">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="var(--accent)" d="M40.9,-69.5C53.1,-63.2,63.2,-51.7,69.5,-38.5C75.9,-25.3,78.5,-10.4,77.1,4.1C75.8,18.6,70.4,32.6,61.7,44.7C53,56.7,40.9,66.7,27.1,72.3C13.4,77.9,-1.9,79.2,-16.5,75.9C-31,72.7,-44.7,65,-57.2,54.2C-69.7,43.5,-80.9,29.7,-84.1,14C-87.3,-1.7,-82.6,-19.3,-73.7,-32.9C-64.7,-46.5,-51.4,-56.2,-37.7,-61.6C-24,-67.1,-9.9,-68.2,3.3,-69.8C16.5,-71.4,33,-75.9,40.9,-69.5Z"></path>
            </svg>
        </div>
        <div class="blob blob-4">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="var(--light)" d="M49.2,-82.4C62.3,-74.7,70.7,-57.7,76.2,-41.5C81.6,-25.3,84.1,-9.8,81.3,4.5C78.6,18.8,70.6,32,61.8,44.3C53,56.7,43.4,68.2,30.6,74.1C17.8,80,1.9,80.3,-12.6,75.8C-27.2,71.3,-40.4,62,-47.7,49.9C-55,37.8,-56.4,22.9,-61.1,7.7C-65.7,-7.6,-73.6,-23.1,-70.8,-35.8C-68,-48.5,-54.6,-58.3,-40.9,-65.9C-27.2,-73.4,-13.6,-78.7,2.4,-79.7C18.4,-80.7,36.1,-90.1,49.2,-82.4Z"></path>
            </svg>
        </div>
        <div class="container narrative-container">
            <div class="narrative-header">
                <span class="section-tag">${data.sectionTag}</span>
                <h2>${data.title}</h2>
                <p>
                    ${data.description}
                </p>
            </div>
            
            <div class="narrative-grid">
                ${data.narrative.map((item, index) => `
                    <div class="narrative-card" data-aos="fade-up" data-aos-delay="${index * 100}">
                        <div class="narrative-icon ${item.color}">
                            <i class="${item.icon}"></i>
                        </div>
                        <h3 class="narrative-title">${item.title}</h3>
                        <p class="narrative-content">${item.content}</p>
                    </div>
                `).join('')}
            </div>
            
            <div class="personal-note" data-aos="fade-up">
                <div class="personal-note-content">
                    <h3 class="personal-note-title">${data.personalNote.title}</h3>
                    <p>${data.personalNote.content}</p>
                </div>
                <div class="personal-note-image">
                    <img src="${data.personalNote.image.src}" alt="${data.personalNote.image.alt}">
                </div>
            </div>
        </div>
    `;
    
    narrativeContainer.innerHTML = narrativeHTML;
}

// Load narrative section on DOM content loaded
document.addEventListener('DOMContentLoaded', loadNarrative);