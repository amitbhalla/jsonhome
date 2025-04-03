// File: js/components/resources-list.js
// Resources List section component functionality

// State management for resources
let allResources = [];
let filteredResources = [];
let currentPage = 1;
const resourcesPerPage = 4;
let currentCategory = "All";
let searchQuery = "";

// Handle URL hash to preserve pagination state
function getPageFromHash() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#page=')) {
        const pageNum = parseInt(hash.substring(6));
        return !isNaN(pageNum) && pageNum > 0 ? pageNum : 1;
    }
    return 1;
}

// Fetch resources list data and render
async function loadResourcesList() {
    try {
        const response = await fetch('./data/resources-list.json');
        const data = await response.json();
        
        // Store resources globally
        allResources = data.resources;
        filteredResources = [...allResources];
        
        // Get current page from URL hash if available
        currentPage = getPageFromHash();
        
        renderResourcesList(data);
        setupEventListeners();
        
        // Listen for hash changes to update pagination
        window.addEventListener('hashchange', function() {
            currentPage = getPageFromHash();
            renderResourcesGrid();
        });
    } catch (error) {
        console.error('Error loading resources list data:', error);
    }
}

// Render resources list section with data
function renderResourcesList(data) {
    const resourcesListContainer = document.getElementById('resources-list-container');
    
    const resourcesListHTML = `
        <div class="container resources-container">
            <div class="resources-header">
                <h2>${data.sectionTitle}</h2>
                <p>${data.description}</p>
                
                <div class="resources-filter">
                    <div class="search-box">
                        <input type="text" id="resource-search" placeholder="Search resources...">
                        <button id="search-button"><i class="fas fa-search"></i></button>
                    </div>
                    
                    <div class="category-filter">
                        ${data.categories.map(category => `
                            <button class="category-btn ${category === 'All' ? 'active' : ''}" data-category="${category}">${category}</button>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <div id="resources-grid" class="resources-grid">
                <!-- Resources will be rendered here -->
            </div>
            
            <div class="pagination" id="pagination">
                <!-- Pagination will be rendered here -->
            </div>
        </div>
    `;
    
    resourcesListContainer.innerHTML = resourcesListHTML;
    
    // Initial render of resources
    renderResourcesGrid();
}

// Render the resources grid based on current filters and pagination
function renderResourcesGrid() {
    const resourcesGrid = document.getElementById('resources-grid');
    
    // Apply filters
    applyFilters();
    
    // Calculate pagination
    const totalPages = Math.ceil(filteredResources.length / resourcesPerPage);
    
    // Ensure currentPage is valid based on total pages
    if (currentPage > totalPages && totalPages > 0) {
        currentPage = totalPages;
        window.location.hash = `page=${currentPage}`;
    }
    
    const startIndex = (currentPage - 1) * resourcesPerPage;
    const endIndex = Math.min(startIndex + resourcesPerPage, filteredResources.length);
    
    // Get current page resources
    const currentResources = filteredResources.slice(startIndex, endIndex);
    
    // Render resources grid
    if (currentResources.length > 0) {
        resourcesGrid.innerHTML = currentResources.map(resource => `
            <div class="resource-card" data-aos="fade-up">
                <div class="resource-image">
                    <img src="${resource.image}" alt="${resource.title}">
                    <span class="resource-category">${resource.category}</span>
                </div>
                <div class="resource-content">
                    <h3 class="resource-title">${resource.title}</h3>
                    <p class="resource-description">${resource.shortDescription}</p>
                    <div class="resource-features">
                        ${resource.features.map(feature => `
                            <div class="resource-feature">
                                <i class="fas fa-check"></i>
                                <span>${feature}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="resource-tags">
                        ${resource.tags.map(tag => `
                            <span class="resource-tag">${tag}</span>
                        `).join('')}
                    </div>
                    <button class="btn btn-primary preview-btn" data-resource-id="${resource.id}">Preview Resource</button>
                </div>
            </div>
        `).join('');
    } else {
        resourcesGrid.innerHTML = `
            <div class="no-resources">
                <i class="fas fa-search"></i>
                <h3>No resources found</h3>
                <p>Try adjusting your search or filter criteria.</p>
            </div>
        `;
    }
    
    // Render pagination
    renderPagination(totalPages);
    
    // Setup event listeners for preview buttons
    setupPreviewButtons();
}

// Apply filters based on category and search query
function applyFilters() {
    filteredResources = allResources.filter(resource => {
        // Filter by category
        const categoryMatch = currentCategory === 'All' || resource.category === currentCategory;
        
        // Filter by search query
        const searchMatch = searchQuery === '' || 
            resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        
        return categoryMatch && searchMatch;
    });
    
    // Reset to first page when filters change, only when not coming from a hash change
    if (!window.location.hash.startsWith('#page=')) {
        currentPage = 1;
        window.location.hash = 'page=1';
    }
}

// Render pagination controls
function renderPagination(totalPages) {
    const paginationContainer = document.getElementById('pagination');
    
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }
    
    let paginationHTML = `
        <a href="#" class="pagination-btn prev-btn ${currentPage === 1 ? 'disabled' : ''}" ${currentPage === 1 ? 'disabled' : ''}>
            <i class="fas fa-chevron-left"></i> Previous
        </a>
        <div class="pagination-numbers">
    `;
    
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `
            <a href="#" class="pagination-number ${currentPage === i ? 'active' : ''}" data-page="${i}">${i}</a>
        `;
    }
    
    paginationHTML += `
        </div>
        <a href="#" class="pagination-btn next-btn ${currentPage === totalPages ? 'disabled' : ''}" ${currentPage === totalPages ? 'disabled' : ''}>
            Next <i class="fas fa-chevron-right"></i>
        </a>
    `;
    
    paginationContainer.innerHTML = paginationHTML;
}

// Setup event listeners for the resources list
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('resource-search');
    const searchButton = document.getElementById('search-button');
    
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderResourcesGrid();
    });
    
    searchButton.addEventListener('click', () => {
        searchQuery = searchInput.value;
        renderResourcesGrid();
    });
    
    // Category filter buttons
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active class
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update current category
            currentCategory = button.dataset.category;
            
            // Re-render resources grid
            renderResourcesGrid();
        });
    });
    
    // Use event delegation for pagination controls
    const paginationContainer = document.getElementById('pagination');
    
    paginationContainer.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default link behavior
        
        // Handle page number buttons
        if (e.target.classList.contains('pagination-number')) {
            const pageNum = parseInt(e.target.dataset.page);
            if (pageNum !== currentPage) {
                window.location.hash = `page=${pageNum}`;
                document.getElementById('resources-list-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            return;
        }
        
        // Handle previous button
        if (e.target.closest('.prev-btn') && !e.target.closest('.prev-btn').disabled) {
            if (currentPage > 1) {
                window.location.hash = `page=${currentPage - 1}`;
                document.getElementById('resources-list-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            return;
        }
        
        // Handle next button
        if (e.target.closest('.next-btn') && !e.target.closest('.next-btn').disabled) {
            const totalPages = Math.ceil(filteredResources.length / resourcesPerPage);
            if (currentPage < totalPages) {
                window.location.hash = `page=${currentPage + 1}`;
                document.getElementById('resources-list-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            return;
        }
    });
}

// Setup event listeners for resource preview buttons
function setupPreviewButtons() {
    const previewButtons = document.querySelectorAll('.preview-btn');
    
    previewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const resourceId = button.dataset.resourceId;
            const resource = allResources.find(r => r.id === resourceId);
            
            // Trigger modal to open with this resource
            if (resource) {
                const event = new CustomEvent('openResourceModal', { detail: resource });
                document.dispatchEvent(event);
            }
        });
    });
}

// Load resources list section on DOM content loaded
document.addEventListener('DOMContentLoaded', loadResourcesList);