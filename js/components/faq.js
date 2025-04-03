// File: js/components/faq.js
// FAQ section component functionality

// Fetch FAQ data and render
async function loadFAQ() {
    try {
        const response = await fetch('./data/faq.json');
        const data = await response.json();
        renderFAQ(data);
        setupFAQInteractivity();
    } catch (error) {
        console.error('Error loading FAQ data:', error);
    }
}

// Render FAQ section with data
function renderFAQ(data) {
    const faqContainer = document.getElementById('faq-container');
    
    const faqHTML = `
        <div class="container faq-container">
            <div class="faq-header">
                <span class="section-tag">${data.sectionTag}</span>
                <h2>${data.title}</h2>
                <p>
                    ${data.description}
                </p>
            </div>
            <div class="faq-list">
                ${data.questions.map((item, index) => `
                    <div class="faq-item ${index === 0 ? 'active' : ''}">
                        <div class="faq-question">
                            ${item.question}
                            <i class="fas fa-plus"></i>
                        </div>
                        <div class="faq-answer">
                            ${item.answer}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    faqContainer.innerHTML = faqHTML;
}

// Set up interactivity for FAQ accordion
function setupFAQInteractivity() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Toggle the clicked FAQ item
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// Load FAQ section on DOM content loaded
document.addEventListener('DOMContentLoaded', loadFAQ);