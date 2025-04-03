// File: js/components/approach.js
// Approach section component functionality

// Fetch approach data and render
async function loadApproach() {
    try {
        const response = await fetch('./data/approach.json');
        const data = await response.json();
        renderApproach(data);
    } catch (error) {
        console.error('Error loading approach data:', error);
    }
}

// Render approach section with data
function renderApproach(data) {
    const approachContainer = document.getElementById('approach-container');
    
    const approachHTML = `
        <!-- Blob SVGs for process section -->
        <div class="blob blob-2">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="var(--light)" d="M38.1,-65.2C50.8,-59.8,63.5,-52.6,69.7,-41.7C75.9,-30.8,75.5,-16.4,71.9,-3.9C68.3,8.7,61.6,19.7,55.3,31.3C49,42.9,43.1,55.1,33.2,62.1C23.2,69.1,9.1,70.9,-4.1,69.1C-17.3,67.3,-29.6,62,-38.4,53.7C-47.3,45.3,-52.6,33.9,-56.7,22.4C-60.7,10.8,-63.4,-0.9,-63.4,-13.5C-63.4,-26.1,-60.7,-39.6,-52.5,-48.1C-44.2,-56.7,-30.5,-60.3,-17.9,-65.8C-5.3,-71.2,7.3,-78.5,19.3,-78.2C31.3,-77.9,42.8,-70,38.1,-65.2Z"></path>
            </svg>
        </div>
        <div class="blob blob-4 blob-rotate">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="var(--accent)" d="M49.2,-82.4C62.3,-74.7,70.7,-57.7,76.2,-41.5C81.6,-25.3,84.1,-9.8,81.3,4.5C78.6,18.8,70.6,32,61.8,44.3C53,56.7,43.4,68.2,30.6,74.1C17.8,80,1.9,80.3,-12.6,75.8C-27.2,71.3,-40.4,62,-47.7,49.9C-55,37.8,-56.4,22.9,-61.1,7.7C-65.7,-7.6,-73.6,-23.1,-70.8,-35.8C-68,-48.5,-54.6,-58.3,-40.9,-65.9C-27.2,-73.4,-13.6,-78.7,2.4,-79.7C18.4,-80.7,36.1,-90.1,49.2,-82.4Z"></path>
            </svg>
        </div>
        <div class="container process-container">
            <div class="process-header">
                <span class="section-tag">${data.sectionTag}</span>
                <h2>${data.title}</h2>
                <p>
                    ${data.description}
                </p>
            </div>
            <div class="process-steps">
                ${data.steps.map((step, index) => `
                    <div class="process-step" data-aos="fade-up" data-aos-delay="${index * 100}">
                        <div class="step-number">${step.number}</div>
                        <div class="step-icon">
                            <i class="${step.icon}"></i>
                        </div>
                        <h3 class="step-title">${step.title}</h3>
                        <p class="step-description">
                            ${step.description}
                        </p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    approachContainer.innerHTML = approachHTML;
}

// Load approach section on DOM content loaded
document.addEventListener('DOMContentLoaded', loadApproach);