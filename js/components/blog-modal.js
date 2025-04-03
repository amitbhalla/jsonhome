// File: js/components/blog-modal.js
// Blog modal component functionality

// This file sets up the modal container on load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize modal container - actual content is loaded dynamically in blog-posts.js
    const modalContainer = document.getElementById('blog-modal-container');
    
    if (modalContainer) {
        // Make sure modal container starts hidden
        modalContainer.classList.remove('active');
    }
});