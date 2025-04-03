// File: js/components/blog-posts.js
// Blog posts section component functionality

// State to keep track of data and filtering/pagination
let allPosts = [];
let filteredPosts = [];
let currentPage = 1;
const postsPerPage = 4;
let currentCategory = 'All';
let currentSearchTerm = '';

// Fetch blog posts data and render
async function loadBlogPosts() {
    try {
        const response = await fetch('./data/blog-posts.json');
        const data = await response.json();
        
        // Initialize state
        allPosts = data.posts;
        filteredPosts = [...allPosts];
        
        renderBlogPosts();
        setupEventListeners();
    } catch (error) {
        console.error('Error loading blog posts data:', error);
    }
}

// Render blog posts with current filters and pagination
function renderBlogPosts() {
    const blogPostsContainer = document.getElementById('blog-posts-container');
    
    // Calculate pagination
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = Math.min(startIndex + postsPerPage, filteredPosts.length);
    const currentPosts = filteredPosts.slice(startIndex, endIndex);
    
    // Show no results message if needed
    if (filteredPosts.length === 0) {
        const blogPostsHTML = `
            <div class="container blog-posts-container">
                <div class="no-results">
                    <h3>No blog posts found</h3>
                    <p>Try adjusting your search or filters to find what you're looking for.</p>
                    <button id="reset-filters" class="btn btn-primary">Reset Filters</button>
                </div>
            </div>
        `;
        
        blogPostsContainer.innerHTML = blogPostsHTML;
        
        // Add event listener to reset button
        setTimeout(() => {
            const resetButton = document.getElementById('reset-filters');
            if (resetButton) {
                resetButton.addEventListener('click', () => {
                    // Reset search and filters
                    currentCategory = 'All';
                    currentSearchTerm = '';
                    currentPage = 1;
                    filteredPosts = [...allPosts];
                    
                    // Update UI
                    const searchInput = document.getElementById('blog-search');
                    if (searchInput) {
                        searchInput.value = '';
                    }
                    
                    document.querySelectorAll('.blog-category-button').forEach(btn => {
                        btn.classList.remove('active');
                        if (btn.dataset.category === 'All') {
                            btn.classList.add('active');
                        }
                    });
                    
                    renderBlogPosts();
                });
            }
        }, 100);
        
        return;
    }
    
    // Render the blog posts
    const blogPostsHTML = `
        <div class="container blog-posts-container">
            <div class="blog-posts-grid">
                ${currentPosts.map(post => `
                    <div class="blog-post-card" data-aos="fade-up">
                        <div class="blog-post-content">
                            <div class="blog-post-tags">
                                ${post.tags.map(tag => `
                                    <span class="tag">${tag}</span>
                                `).join('')}
                            </div>
                            <span class="date">${post.date} · ${post.readTime}</span>
                            <h3 class="blog-post-title">${post.title}</h3>
                            <p class="blog-post-excerpt">${post.excerpt}</p>
                            <div class="blog-post-footer">
                                <div class="author">
                                    <div class="author-avatar">
                                        <i class="fas fa-${post.author.avatar}"></i>
                                    </div>
                                    <div class="author-info">
                                        <span class="author-name">${post.author.name}</span>
                                        <span class="author-title">${post.author.title}</span>
                                    </div>
                                </div>
                                <button class="btn btn-primary read-more-btn" data-post-id="${post.id}">Read More</button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            ${totalPages > 1 ? `
                <div class="blog-pagination">
                    <button class="pagination-btn prev-btn ${currentPage === 1 ? 'disabled' : ''}" ${currentPage === 1 ? 'disabled' : ''}>
                        <i class="fas fa-chevron-left"></i> Previous
                    </button>
                    <div class="pagination-info">
                        Page ${currentPage} of ${totalPages}
                    </div>
                    <button class="pagination-btn next-btn ${currentPage === totalPages ? 'disabled' : ''}" ${currentPage === totalPages ? 'disabled' : ''}>
                        Next <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            ` : ''}
        </div>
    `;
    
    blogPostsContainer.innerHTML = blogPostsHTML;
    
    // Set up pagination buttons
    setTimeout(() => {
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    renderBlogPosts();
                    window.scrollTo({ top: document.getElementById('blog-posts-container').offsetTop - 100, behavior: 'smooth' });
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentPage < totalPages) {
                    currentPage++;
                    renderBlogPosts();
                    window.scrollTo({ top: document.getElementById('blog-posts-container').offsetTop - 100, behavior: 'smooth' });
                }
            });
        }
        
        // Set up read more buttons
        const readMoreBtns = document.querySelectorAll('.read-more-btn');
        readMoreBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const postId = parseInt(btn.dataset.postId);
                const post = allPosts.find(p => p.id === postId);
                if (post) {
                    openBlogModal(post);
                }
            });
        });
    }, 100);
}

// Filter posts based on category and search term
function filterPosts() {
    // Reset to page 1 when filters change
    currentPage = 1;
    
    // Apply category filter
    if (currentCategory === 'All') {
        filteredPosts = [...allPosts];
    } else {
        filteredPosts = allPosts.filter(post => post.tags.includes(currentCategory));
    }
    
    // Apply search filter
    if (currentSearchTerm) {
        filteredPosts = filteredPosts.filter(post => 
            post.title.toLowerCase().includes(currentSearchTerm) || 
            post.excerpt.toLowerCase().includes(currentSearchTerm) ||
            post.content.toLowerCase().includes(currentSearchTerm) ||
            post.tags.some(tag => tag.toLowerCase().includes(currentSearchTerm))
        );
    }
    
    renderBlogPosts();
}

// Open blog post modal
function openBlogModal(post) {
    const modalContainer = document.getElementById('blog-modal-container');
    
    const modalHTML = `
        <div class="blog-modal">
            <div class="blog-modal-content">
                <button class="blog-modal-close">
                    <i class="fas fa-times"></i>
                </button>
                <div class="blog-modal-header">
                    <div class="blog-post-tags">
                        ${post.tags.map(tag => `
                            <span class="tag">${tag}</span>
                        `).join('')}
                    </div>
                    <span class="date">${post.date} · ${post.readTime}</span>
                    <h2 class="blog-modal-title">${post.title}</h2>
                    <div class="author">
                        <div class="author-avatar">
                            <i class="fas fa-${post.author.avatar}"></i>
                        </div>
                        <div class="author-info">
                            <span class="author-name">${post.author.name}</span>
                            <span class="author-title">${post.author.title}</span>
                        </div>
                    </div>
                </div>
                <div class="blog-modal-body">
                    ${post.content}
                </div>
                <div class="blog-modal-footer">
                    <button class="btn btn-primary share-btn">
                        <i class="fas fa-share-alt"></i> Share
                    </button>
                    <button class="btn btn-secondary contact-btn">
                        Contact Amit
                    </button>
                </div>
            </div>
        </div>
    `;
    
    modalContainer.innerHTML = modalHTML;
    
    // Show modal
    modalContainer.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    
    // Set up event listeners
    setTimeout(() => {
        const closeBtn = document.querySelector('.blog-modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeBlogModal);
        }
        
        // Close on click outside modal
        modalContainer.addEventListener('click', (e) => {
            if (e.target === modalContainer) {
                closeBlogModal();
            }
        });
        
        // Contact button
        const contactBtn = document.querySelector('.contact-btn');
        if (contactBtn) {
            contactBtn.addEventListener('click', () => {
                closeBlogModal();
                // Scroll to contact section
                document.getElementById('contact-container').scrollIntoView({ behavior: 'smooth' });
            });
        }
        
        // Share button
        const shareBtn = document.querySelector('.share-btn');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                // Simple share action - in a real implementation, this would use the Web Share API
                alert('Sharing functionality would be implemented here.');
            });
        }
    }, 100);
}

// Close blog post modal
function closeBlogModal() {
    const modalContainer = document.getElementById('blog-modal-container');
    modalContainer.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

// Set up event listeners for category filtering and search
function setupEventListeners() {
    // Listen for category filter events
    document.addEventListener('filterByCategory', (e) => {
        currentCategory = e.detail.category;
        filterPosts();
    });
    
    // Listen for search events
    document.addEventListener('searchPosts', (e) => {
        currentSearchTerm = e.detail.searchTerm.toLowerCase();
        filterPosts();
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeBlogModal();
        }
    });
}

// Load blog posts on DOM content loaded
document.addEventListener('DOMContentLoaded', loadBlogPosts);