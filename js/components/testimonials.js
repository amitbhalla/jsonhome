// File: js/components/testimonials.js
// Testimonials section component functionality

// Fetch testimonials data and render
async function loadTestimonials() {
    try {
        const response = await fetch('./data/testimonials.json');
        const data = await response.json();
        renderTestimonials(data);
    } catch (error) {
        console.error('Error loading testimonials data:', error);
    }
}

// Render testimonials section with data
function renderTestimonials(data) {
    const testimonialsContainer = document.getElementById('testimonials-container');
    
    const testimonialsHTML = `
        <!-- Blob SVGs for testimonials -->
        <div class="blob blob-1 blob-small">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="var(--accent-2)" d="M43.1,-73.6C57.1,-67.5,70.3,-57.5,77.7,-44.2C85.1,-30.8,86.6,-14.4,83.5,0.6C80.4,15.6,72.7,29.3,64.4,42.7C56.1,56.1,47.1,69.3,34.7,74.6C22.3,79.8,6.5,77.2,-7.8,72.3C-22.1,67.5,-35,60.4,-47.7,51.7C-60.4,43,-73,32.6,-78.1,19.3C-83.2,5.9,-80.9,-10.5,-75.2,-25.4C-69.6,-40.3,-60.6,-53.7,-48.3,-60.7C-36,-67.7,-20.5,-68.3,-4.9,-60.3C10.7,-52.3,29.1,-79.7,43.1,-73.6Z"></path>
            </svg>
        </div>
        <div class="blob blob-3 blob-small">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="var(--primary)" d="M40.9,-69.5C53.1,-63.2,63.2,-51.7,69.5,-38.5C75.9,-25.3,78.5,-10.4,77.1,4.1C75.8,18.6,70.4,32.6,61.7,44.7C53,56.7,40.9,66.7,27.1,72.3C13.4,77.9,-1.9,79.2,-16.5,75.9C-31,72.7,-44.7,65,-57.2,54.2C-69.7,43.5,-80.9,29.7,-84.1,14C-87.3,-1.7,-82.6,-19.3,-73.7,-32.9C-64.7,-46.5,-51.4,-56.2,-37.7,-61.6C-24,-67.1,-9.9,-68.2,3.3,-69.8C16.5,-71.4,33,-75.9,40.9,-69.5Z"></path>
            </svg>
        </div>
        <div class="container testimonials-container">
            <div class="testimonials-header">
                <span class="section-tag">${data.sectionTag}</span>
                <h2>${data.title}</h2>
                <p>
                    ${data.description}
                </p>
            </div>
            <div class="testimonials-grid">
                ${data.testimonials.map((testimonial, index) => `
                    <div class="testimonial-card" data-aos="fade-up" data-aos-delay="${index * 100}">
                        <div class="testimonial-quote">
                            <i class="fas fa-quote-left"></i>
                        </div>
                        <div class="testimonial-content">
                            ${testimonial.content}
                        </div>
                        <div class="testimonial-author">
                            <div class="testimonial-avatar">
                                <i class="fas fa-${testimonial.author.avatar} fa-3x"></i>
                            </div>
                            <div class="testimonial-info">
                                <h4>${testimonial.author.name}</h4>
                                <p>${testimonial.author.title}</p>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    testimonialsContainer.innerHTML = testimonialsHTML;
}

// Load testimonials section on DOM content loaded
document.addEventListener('DOMContentLoaded', loadTestimonials);