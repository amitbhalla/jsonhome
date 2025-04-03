// File: js/components/contact.js
// Contact section component functionality

// Fetch contact data and render
async function loadContact() {
    try {
        const response = await fetch('./data/contact.json');
        const data = await response.json();
        renderContact(data);
        setupContactForm();
    } catch (error) {
        console.error('Error loading contact data:', error);
    }
}

// Render contact section with data
function renderContact(data) {
    const contactContainer = document.getElementById('contact-container');
    
    const contactHTML = `
        <div class="cta-shapes">
            <div class="cta-shape cta-shape-1"></div>
            <div class="cta-shape cta-shape-2"></div>
        </div>
        <div class="container cta-container">
            <h2 class="cta-title">${data.title}</h2>
            <p class="cta-description">
                ${data.description}
            </p>
            <div class="cta-form">
                <form id="contact-form" action="#" method="POST">
                    ${data.formFields.map(field => `
                        <div class="form-group">
                            <label for="${field.id}" class="form-label">${field.label}</label>
                            ${field.type === 'textarea' ? 
                                `<textarea id="${field.id}" name="${field.id}" class="form-control" placeholder="${field.placeholder}" ${field.required ? 'required' : ''}></textarea>` : 
                                `<input type="${field.type}" id="${field.id}" name="${field.id}" class="form-control" placeholder="${field.placeholder}" ${field.required ? 'required' : ''}>`
                            }
                        </div>
                    `).join('')}
                    <div class="cta-buttons">
                        <button type="submit" class="btn btn-secondary"><i class="${data.submitButton.icon} mr-2" style="margin-right: 8px;"></i>${data.submitButton.text}</button>
                    </div>
                </form>
                <div class="cta-guarantee">
                    <i class="fas fa-lock"></i>
                    <span>${data.guaranteeText}</span>
                </div>
            </div>
        </div>
    `;
    
    contactContainer.innerHTML = contactHTML;
}

// Set up contact form submission
function setupContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const formValues = Object.fromEntries(formData.entries());
            
            // In a real implementation, you would send this data to a server
            console.log('Form submitted with values:', formValues);
            
            // Show success message
            alert('Thank you for your submission! I will contact you soon to schedule your strategy call.');
            
            // Reset form
            form.reset();
        });
    }
}

// Load contact section on DOM content loaded
document.addEventListener('DOMContentLoaded', loadContact);