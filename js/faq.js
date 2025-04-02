// When DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize FAQ functionality
    initFAQ();
    
    // Fetch and display FAQs
    fetchFAQs();
});

function initFAQ() {
    // This function will be called once FAQs are loaded
    document.addEventListener('faqsLoaded', function() {
        // FAQ Accordion
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
    });
}

function fetchFAQs() {
    fetch('data/faqs.json')
        .then(response => response.json())
        .then(faqs => {
            renderFAQs(faqs);
            // Dispatch event that FAQs are loaded
            document.dispatchEvent(new Event('faqsLoaded'));
        })
        .catch(error => {
            console.error('Error fetching FAQs:', error);
        });
}

function renderFAQs(faqs) {
    const faqList = document.querySelector('.faq-list');
    if (!faqList) return;
    
    faqList.innerHTML = '';
    
    faqs.forEach(faq => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        
        const toggleIcon = '<div class="faq-toggle"><i class="fas fa-plus"></i></div>';
        
        faqItem.innerHTML = `
            <div class="faq-question">
                ${faq.question}
                ${toggleIcon}
            </div>
            <div class="faq-answer">
                ${faq.answer}
            </div>
        `;
        
        faqList.appendChild(faqItem);
    });
}