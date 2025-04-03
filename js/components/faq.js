// File: js/components/faq.js
// Update this file with the new code

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

// Set up interactivity for FAQ accordion with smooth animation
function setupFAQInteractivity() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    // Initially set up the first item if it's active
    const firstItem = document.querySelector('.faq-item.active');
    if (firstItem) {
        const answer = firstItem.querySelector('.faq-answer');
        answer.style.maxHeight = answer.scrollHeight + 'px';
    }
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-answer').style.maxHeight = '0px';
            });
            
            // Toggle the clicked FAQ item
            if (!isActive) {
                faqItem.classList.add('active');
                
                // Small timeout to ensure the CSS transition picks up the change
                setTimeout(() => {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }, 10);
            }
        });
    });
}

// Load FAQ section on DOM content loaded
document.addEventListener('DOMContentLoaded', loadFAQ);