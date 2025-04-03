// File: js/components/success-stories.js
// Success Stories section component functionality

// Fetch success stories data and render
async function loadSuccessStories() {
    try {
        const response = await fetch('./data/success-stories.json');
        const data = await response.json();
        renderSuccessStories(data);
    } catch (error) {
        console.error('Error loading success stories data:', error);
    }
}

// Render success stories section with data
function renderSuccessStories(data) {
    const successStoriesContainer = document.getElementById('success-stories-container');
    
    const successStoriesHTML = `
        <!-- SVG Blobs for visual interest -->
        <div class="blob blob-results-1">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="rgba(247, 37, 133, 0.05)" d="M38.5,-65.1C45.5,-59.5,44.2,-39.9,48.7,-25.7C53.2,-11.6,63.5,-2.8,66.4,7.9C69.3,18.7,64.8,31.3,55.3,38.7C45.9,46.1,31.4,48.3,19.1,50.1C6.8,52,-3.2,53.6,-14.8,52.5C-26.4,51.5,-39.7,47.8,-48.9,39.7C-58.1,31.5,-63.3,18.9,-66.2,5.1C-69.1,-8.6,-69.7,-23.5,-62.3,-32.5C-54.9,-41.5,-39.4,-44.6,-27.1,-48.1C-14.8,-51.6,-5.6,-55.4,7.5,-63.6C20.6,-71.8,31.5,-70.7,38.5,-65.1Z" transform="translate(100 100)" />
            </svg>
        </div>
        <div class="blob blob-results-2">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="rgba(76, 201, 240, 0.05)" d="M58.3,-72.3C73.2,-62.3,81.7,-41.1,81.5,-21.4C81.4,-1.6,72.6,16.7,61.5,30.9C50.3,45.1,36.8,55.1,21.2,62.1C5.6,69.2,-12,73.3,-27.4,69C-42.9,64.7,-56.1,52.1,-65,36.5C-73.9,20.9,-78.5,2.3,-75.1,-14.7C-71.8,-31.7,-60.6,-47.1,-46.5,-57.3C-32.4,-67.6,-15.4,-72.7,3.5,-77.1C22.4,-81.5,43.4,-82.2,58.3,-72.3Z" transform="translate(100 100)" />
            </svg>
        </div>
        
        <div class="container results-container">
            <div class="results-header" data-aos="fade-up">
                <span class="section-tag">${data.sectionTag}</span>
                <h2>${data.title}</h2>
                <p>
                    ${data.description}
                </p>
            </div>
            
            <div class="results-showcase">
                <!-- Metrics Overview -->
                <div class="results-metrics" data-aos="fade-up">
                    ${data.metrics.map(metric => `
                        <div class="metric-circle">
                            <div class="metric-outer-ring">
                                <div class="metric-inner">
                                    <span class="metric-value">${metric.value}<span class="metric-symbol">${metric.symbol}</span></span>
                                    <span class="metric-label">${metric.label}</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="case-studies-grid">
                    ${data.caseStudies.map((caseStudy, index) => `
                        <!-- Case Study ${index + 1} -->
                        <div class="case-study-card" data-aos="fade-up" data-aos-delay="${index * 100}">
                            <div class="case-study-content">
                                <h3 class="case-study-title">${caseStudy.title}</h3>
                                <div class="case-study-problem">
                                    <p>${caseStudy.problem}</p>
                                </div>
                                <div class="case-study-impact">
                                    <ul>
                                        ${caseStudy.impacts.map(impact => `
                                            <li>${impact}</li>
                                        `).join('')}
                                    </ul>
                                </div>
                                <a href="${caseStudy.link.href}" class="btn btn-outline-primary">${caseStudy.link.text} <i class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    successStoriesContainer.innerHTML = successStoriesHTML;
    
    // Set up interactivity for metrics
    setTimeout(() => {
        const metricCircles = document.querySelectorAll('.metric-circle');
        
        // Add hover effects
        metricCircles.forEach((circle, index) => {
            circle.addEventListener('mouseenter', () => {
                circle.classList.add('active');
            });
            
            circle.addEventListener('mouseleave', () => {
                circle.classList.remove('active');
            });
        });
    }, 500);
}

// Load success stories section on DOM content loaded
document.addEventListener('DOMContentLoaded', loadSuccessStories);