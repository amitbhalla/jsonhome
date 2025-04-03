// File: js/components/resources-modal.js
// Resources Modal component functionality

// Initialize resources modal
function initResourcesModal() {
    // Create the modal container if it doesn't exist
    let modalContainer = document.getElementById('resource-modal-container');
    
    if (!modalContainer) {
        modalContainer = document.createElement('div');
        modalContainer.id = 'resource-modal-container';
        modalContainer.className = 'resource-modal-wrapper';
        document.body.appendChild(modalContainer);
    }
    
    // Add event listener for opening the modal
    document.addEventListener('openResourceModal', (event) => {
        const resource = event.detail;
        if (resource) {
            openResourceModal(resource);
        }
    });
    
    // Close the modal when clicking outside
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('resource-modal-wrapper') && event.target.classList.contains('active')) {
            closeResourceModal();
        }
    });
    
    // Add keydown event listener for ESC key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeResourceModal();
        }
    });
}

// Open the resource modal with specific resource data
function openResourceModal(resource) {
    const modalContainer = document.getElementById('resource-modal-container');
    
    const modalHTML = `
        <div class="resource-modal">
            <button class="modal-close-btn"><i class="fas fa-times"></i></button>
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${resource.title}</h2>
                    <div class="modal-tags">
                        ${resource.tags.map(tag => `<span class="modal-tag">${tag}</span>`).join('')}
                    </div>
                </div>
                <div class="modal-body">
                    <div class="modal-image">
                        <img src="${resource.image}" alt="${resource.title}">
                    </div>
                    <div class="modal-description">
                        ${resource.longDescription}
                    </div>
                    <div class="modal-features">
                        <h3>What's Included</h3>
                        <ul>
                            ${resource.features.map(feature => `
                                <li><i class="fas fa-check-circle"></i> ${feature}</li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
                <div class="modal-footer">
                    <a href="${resource.downloadLink}" class="btn btn-secondary" download>
                        <i class="fas fa-download"></i> Download Resource
                    </a>
                </div>
            </div>
        </div>
    `;
    
    modalContainer.innerHTML = modalHTML;
    modalContainer.classList.add('active');
    document.body.classList.add('modal-open');
    
    // Add close button event listener
    const closeBtn = modalContainer.querySelector('.modal-close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeResourceModal);
    }
}

// Close the resource modal
function closeResourceModal() {
    const modalContainer = document.getElementById('resource-modal-container');
    if (modalContainer) {
        modalContainer.classList.remove('active');
        document.body.classList.remove('modal-open');
    }
}

// Initialize the modal functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', initResourcesModal);