// When DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize resources functionality
    initResources();
});

function initResources() {
    // Load resources
    loadResources();
    
    // Setup pagination
    setupPagination();
}

function loadResources() {
    const resourcesGrid = document.querySelector('.resources-grid');
    if (!resourcesGrid) return;

    fetch('/data/resources.json')
        .then(response => response.json())
        .then(data => {
            // Get query parameters
            const urlParams = new URLSearchParams(window.location.search);
            const page = parseInt(urlParams.get('page')) || 1;
            const resourcesPerPage = 4;
            
            // Calculate start and end indices
            const startIndex = (page - 1) * resourcesPerPage;
            const endIndex = startIndex + resourcesPerPage;
            
            // Get resources for current page
            const currentPageResources = data.slice(startIndex, endIndex);
            
            // Clear existing content
            resourcesGrid.innerHTML = '';
            
            // Add resources
            currentPageResources.forEach(resource => {
                const resourceCard = document.createElement('div');
                resourceCard.className = 'resource-card';
                resourceCard.setAttribute('data-aos', 'fade-up');
                
                let featuresHTML = '';
                resource.features.forEach(feature => {
                    featuresHTML += `<li><i class="fas fa-check"></i> ${feature}</li>`;
                });
                
                resourceCard.innerHTML = `
                    <div class="resource-icon">
                        <i class="${resource.icon}"></i>
                    </div>
                    <div class="resource-content">
                        <h3 class="resource-title">${resource.title}</h3>
                        <p class="resource-desc">${resource.description}</p>
                        <ul class="resource-features">
                            ${featuresHTML}
                        </ul>
                        <a href="/pages/resource.html?id=${resource.id}" class="btn btn-primary">View Resource</a>
                    </div>
                `;
                
                resourcesGrid.appendChild(resourceCard);
            });
            
            // Update pagination
            updatePagination(data.length, resourcesPerPage, page);
        })
        .catch(error => console.error('Error loading resources:', error));
}

function setupPagination() {
    const paginationContainer = document.querySelector('.resources-pagination');
    if (!paginationContainer) return;
    
    // Add event listeners for pagination links
    paginationContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' || e.target.parentElement.tagName === 'A') {
            e.preventDefault();
            
            const link = e.target.tagName === 'A' ? e.target : e.target.parentElement;
            const page = link.getAttribute('data-page');
            
            if (page) {
                // Update URL with new page
                const url = new URL(window.location);
                url.searchParams.set('page', page);
                window.history.pushState({}, '', url);
                
                // Load resources for new page
                loadResources();
                
                // Scroll to top of resources section
                document.querySelector('.resources-section').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
}

function updatePagination(totalResources, resourcesPerPage, currentPage) {
    const paginationContainer = document.querySelector('.resources-pagination');
    if (!paginationContainer) return;
    
    // Calculate total pages
    const totalPages = Math.ceil(totalResources / resourcesPerPage);
    
    // Clear existing pagination
    paginationContainer.innerHTML = '';
    
    // Previous button
    const prevLi = document.createElement('li');
    prevLi.className = 'page-item' + (currentPage === 1 ? ' disabled' : '');
    prevLi.innerHTML = `
        <a class="page-link" href="#" data-page="${currentPage - 1}" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
        </a>
    `;
    paginationContainer.appendChild(prevLi);
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.className = 'page-item' + (i === currentPage ? ' active' : '');
        li.innerHTML = `
            <a class="page-link" href="#" data-page="${i}">${i}</a>
        `;
        paginationContainer.appendChild(li);
    }
    
    // Next button
    const nextLi = document.createElement('li');
    nextLi.className = 'page-item' + (currentPage === totalPages ? ' disabled' : '');
    nextLi.innerHTML = `
        <a class="page-link" href="#" data-page="${currentPage + 1}" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
        </a>
    `;
    paginationContainer.appendChild(nextLi);
}

// Function to load individual resource
function loadResource() {
    // Get resource ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const resourceId = urlParams.get('id');
    
    if (!resourceId) {
        window.location.href = '/pages/resources.html';
        return;
    }
    
    const resourceContainer = document.querySelector('.resource-container');
    if (!resourceContainer) return;
    
    fetch('/data/resources.json')
        .then(response => response.json())
        .then(data => {
            // Find resource by ID
            const resource = data.find(r => r.id == resourceId);
            
            if (!resource) {
                window.location.href = '/pages/resources.html';
                return;
            }
            
            // Update page title
            document.title = `${resource.title} | Amit Bhalla`;
            
            // Update resource content
            resourceContainer.innerHTML = `
                <div class="resource-header">
                    <h1 class="resource-title">${resource.title}</h1>
                    <p class="resource-description">${resource.description}</p>
                </div>
                <div class="resource-content">
                    ${resource.content || 'Resource content will be available for download.'}
                </div>
                <div class="resource-download">
                    <a href="${resource.downloadLink}" class="btn btn-secondary">
                        <i class="fas fa-download"></i> Download Resource
                    </a>
                </div>
                <div class="resource-navigation">
                    <a href="/pages/resources.html" class="btn btn-outline-primary">
                        <i class="fas fa-arrow-left"></i> Back to Resources
                    </a>
                </div>
            `;
        })
        .catch(error => console.error('Error loading resource:', error));
}

// Check if we're on a resource page and load the resource
if (window.location.pathname.includes('resource.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        loadResource();
    });
}