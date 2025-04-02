// When DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Dynamic year for copyright
    document.querySelector('.footer-copyright').innerHTML = `&copy; ${new Date().getFullYear()} Amit Bhalla. All rights reserved.`;

    // Form Submission (Demo purposes only)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show success message
            alert('Thank you for your interest! In a real implementation, you would be redirected to schedule your strategy call. Let\'s connect to transform your marketing results!');
        });
    });

    // Load JSON data for dynamic content
    loadDynamicContent();
});

// Function to load dynamic content from JSON
function loadDynamicContent() {
    // Load services data if on services page or homepage
    if (document.querySelector('.services-grid')) {
        fetch('/data/services.json')
            .then(response => response.json())
            .then(data => {
                populateServices(data);
            })
            .catch(error => console.error('Error loading services:', error));
    }

    // Load testimonials data if on testimonials section
    if (document.querySelector('.testimonials-grid')) {
        fetch('/data/testimonials.json')
            .then(response => response.json())
            .then(data => {
                populateTestimonials(data);
            })
            .catch(error => console.error('Error loading testimonials:', error));
    }

    // Load FAQ data if on FAQ section
    if (document.querySelector('.faq-list')) {
        fetch('/data/faqs.json')
            .then(response => response.json())
            .then(data => {
                populateFAQs(data);
            })
            .catch(error => console.error('Error loading FAQs:', error));
    }

    // Load case studies data if on case studies section
    if (document.querySelector('.case-studies-grid')) {
        fetch('/data/case-studies.json')
            .then(response => response.json())
            .then(data => {
                populateCaseStudies(data);
            })
            .catch(error => console.error('Error loading case studies:', error));
    }

    // Load profile data if needed
    if (document.querySelector('.hero-content')) {
        fetch('/data/profile.json')
            .then(response => response.json())
            .then(data => {
                populateProfileData(data);
            })
            .catch(error => console.error('Error loading profile data:', error));
    }
}

// Function to populate services
function populateServices(services) {
    const servicesGrid = document.querySelector('.services-grid');
    if (!servicesGrid) return;

    servicesGrid.innerHTML = '';
    
    services.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        serviceCard.setAttribute('data-aos', 'fade-up');
        
        let pointsHTML = '';
        service.points.forEach(point => {
            pointsHTML += `
                <div class="service-point">
                    <i class="fas fa-check"></i>
                    <span>${point}</span>
                </div>
            `;
        });
        
        serviceCard.innerHTML = `
            <div class="service-icon">
                <i class="${service.icon}"></i>
            </div>
            <h3 class="service-title">${service.title}</h3>
            <p class="service-description">
                ${service.description}
            </p>
            <div class="service-points">
                ${pointsHTML}
            </div>
            <a href="${service.link}" class="service-link">${service.linkText} <i class="fas fa-arrow-right"></i></a>
        `;
        
        servicesGrid.appendChild(serviceCard);
    });
}

// Function to populate testimonials
function populateTestimonials(testimonials) {
    const testimonialsGrid = document.querySelector('.testimonials-grid');
    if (!testimonialsGrid) return;

    testimonialsGrid.innerHTML = '';
    
    testimonials.forEach((testimonial, index) => {
        const testimonialCard = document.createElement('div');
        testimonialCard.className = 'testimonial-card';
        testimonialCard.setAttribute('data-aos', 'fade-up');
        testimonialCard.setAttribute('data-aos-delay', index * 100);
        
        testimonialCard.innerHTML = `
            <div class="testimonial-quote">
                <i class="fas fa-quote-left"></i>
            </div>
            <div class="testimonial-content">
                ${testimonial.content}
            </div>
            <div class="testimonial-author">
                <div class="testimonial-avatar">
                    <i class="fas fa-user-circle fa-3x"></i>
                </div>
                <div class="testimonial-info">
                    <h4>${testimonial.name}</h4>
                    <p>${testimonial.position}</p>
                </div>
            </div>
        `;
        
        testimonialsGrid.appendChild(testimonialCard);
    });
}

// Function to populate FAQs
function populateFAQs(faqs) {
    const faqList = document.querySelector('.faq-list');
    if (!faqList) return;

    faqList.innerHTML = '';
    
    faqs.forEach(faq => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        
        faqItem.innerHTML = `
            <div class="faq-question">
                ${faq.question}
                <i class="fas fa-plus"></i>
            </div>
            <div class="faq-answer">
                ${faq.answer}
            </div>
        `;
        
        faqList.appendChild(faqItem);
    });

    // Add click events to FAQ items after they are created
    document.querySelectorAll('.faq-question').forEach(question => {
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

// Function to populate case studies
function populateCaseStudies(caseStudies) {
    const caseStudiesGrid = document.querySelector('.case-studies-grid');
    if (!caseStudiesGrid) return;

    caseStudiesGrid.innerHTML = '';
    
    caseStudies.forEach((caseStudy, index) => {
        const caseStudyCard = document.createElement('div');
        caseStudyCard.className = 'case-study-card';
        caseStudyCard.setAttribute('data-aos', 'fade-up');
        caseStudyCard.setAttribute('data-aos-delay', index * 100);
        
        let impactItems = '';
        caseStudy.impact.forEach(item => {
            impactItems += `<li>${item}</li>`;
        });
        
        caseStudyCard.innerHTML = `
            <div class="case-study-content">
                <h3 class="case-study-title">${caseStudy.title}</h3>
                <div class="case-study-problem">
                    <p>${caseStudy.problem}</p>
                </div>
                <div class="case-study-impact">
                    <ul>
                        ${impactItems}
                    </ul>
                </div>
                <a href="${caseStudy.link}" class="btn btn-outline-primary">View Full Case Study <i class="fas fa-arrow-right"></i></a>
            </div>
        `;
        
        caseStudiesGrid.appendChild(caseStudyCard);
    });
}

// Function to populate profile data
function populateProfileData(data) {
    // Update hero section with profile data
    if (document.querySelector('.hero-title')) {
        document.querySelector('.hero-title').innerHTML = data.heroTitle;
    }
    
    if (document.querySelector('.hero-subtitle')) {
        document.querySelector('.hero-subtitle').textContent = data.heroSubtitle;
    }
    
    if (document.querySelector('.hero-description')) {
        document.querySelector('.hero-description').textContent = data.heroDescription;
    }
}