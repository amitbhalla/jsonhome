// File: js/components/footer.js
// Footer section component functionality

// Fetch footer data and render
async function loadFooter() {
    try {
        const response = await fetch('./data/footer.json');
        const data = await response.json();
        renderFooter(data);
    } catch (error) {
        console.error('Error loading footer data:', error);
    }
}

// Render footer section with data
function renderFooter(data) {
    const footerContainer = document.getElementById('footer-container');
    
    const footerHTML = `
        <div class="container">
            <div class="footer-grid">
                <div class="footer-column footer-brand">
                    <h3><i class="${data.branding.icon}"></i> ${data.branding.name}</h3>
                    <p>${data.branding.description}</p>
                    <div class="footer-social">
                        ${data.social.map(item => `
                            <a href="${item.url}" target="_blank" title="${item.title}"><i class="${item.icon}"></i></a>
                        `).join('')}
                    </div>
                </div>
                <div class="footer-column">
                    <h3 class="footer-heading">${data.links.title}</h3>
                    <div class="footer-links">
                        ${data.links.items.map(link => `
                            <a href="${link.url}">${link.text}</a>
                        `).join('')}
                    </div>
                </div>
                <div class="footer-column">
                    <h3 class="footer-heading">${data.contact.title}</h3>
                    <div class="footer-contact">
                        <i class="fas fa-envelope"></i>
                        <div class="footer-contact-info">
                            <strong>Email</strong>
                            <a href="${data.contact.email.url}">${data.contact.email.text}</a>
                        </div>
                    </div>
                    <div class="footer-contact">
                        <i class="fas fa-phone"></i>
                        <div class="footer-contact-info">
                            <strong>Phone</strong>
                            <a href="${data.contact.phone.url}">${data.contact.phone.text}</a>
                        </div>
                    </div>
                    <div class="footer-contact">
                        <i class="fas fa-map-marker-alt"></i>
                        <div class="footer-contact-info">
                            <strong>Location</strong>
                            <span>${data.contact.location}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <div class="footer-copyright">
                    ${data.copyright}
                </div>
            </div>
        </div>
    `;
    
    footerContainer.innerHTML = footerHTML;
}

// Load footer section on DOM content loaded
document.addEventListener('DOMContentLoaded', loadFooter);