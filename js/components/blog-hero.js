// File: js/components/blog-hero.js
// Blog hero section component functionality

// Fetch blog hero data and render
async function loadBlogHero() {
    try {
        const response = await fetch('./data/blog-hero.json');
        const data = await response.json();
        renderBlogHero(data);
        setupHeroSearch(data);
    } catch (error) {
        console.error('Error loading blog hero data:', error);
    }
}

// Render blog hero section with data
function renderBlogHero(data) {
    const blogHeroContainer = document.getElementById('blog-hero-container');
    
    const blogHeroHTML = `
        <div class="hero-shapes">
            <div class="hero-shape hero-shape-1"></div>
            <div class="hero-shape hero-shape-2"></div>
            <div class="hero-shape hero-shape-3"></div>
        </div>
        <div class="container hero-container">
            <div class="blog-hero-content">
                <h1 class="blog-hero-title">${data.title}</h1>
                <p class="blog-hero-description">
                    ${data.description}
                </p>
                <div class="blog-hero-search-container">
                    <div class="blog-hero-search">
                        <input type="text" id="blog-search" placeholder="${data.searchPlaceholder}" class="blog-search-input">
                        <button class="blog-search-button">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                </div>
                <div class="blog-hero-categories">
                    ${data.categories.map((category, index) => `
                        <button class="blog-category-button ${index === 0 ? 'active' : ''}" data-category="${category}">
                            ${category}
                        </button>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    blogHeroContainer.innerHTML = blogHeroHTML;
}

// Set up search functionality
function setupHeroSearch(data) {
    // We'll implement this in the blog-posts.js file
    // to keep the search and filtering connected to the blog posts display
    
    // Adding event listeners for category buttons
    setTimeout(() => {
        document.querySelectorAll('.blog-category-button').forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                document.querySelectorAll('.blog-category-button').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Dispatch custom event for filtering
                const category = button.dataset.category;
                document.dispatchEvent(new CustomEvent('filterByCategory', { 
                    detail: { category } 
                }));
            });
        });
        
        // Add event listener for search input
        const searchInput = document.getElementById('blog-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.trim().toLowerCase();
                document.dispatchEvent(new CustomEvent('searchPosts', { 
                    detail: { searchTerm } 
                }));
            });
            
            // Add event listener for search button
            const searchButton = document.querySelector('.blog-search-button');
            if (searchButton) {
                searchButton.addEventListener('click', () => {
                    const searchTerm = searchInput.value.trim().toLowerCase();
                    document.dispatchEvent(new CustomEvent('searchPosts', { 
                        detail: { searchTerm } 
                    }));
                });
            }
        }
    }, 100);
}

// Load blog hero section on DOM content loaded
document.addEventListener('DOMContentLoaded', loadBlogHero);