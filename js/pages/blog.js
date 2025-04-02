// When DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize blog functionality
    initBlog();
});

function initBlog() {
    // Load blog posts
    loadBlogPosts();
    
    // Setup pagination
    setupPagination();
}

function loadBlogPosts() {
    const blogGrid = document.querySelector('.blog-grid');
    if (!blogGrid) return;

    fetch('/data/blog-posts.json')
        .then(response => response.json())
        .then(data => {
            // Get query parameters
            const urlParams = new URLSearchParams(window.location.search);
            const page = parseInt(urlParams.get('page')) || 1;
            const postsPerPage = 6;
            
            // Calculate start and end indices
            const startIndex = (page - 1) * postsPerPage;
            const endIndex = startIndex + postsPerPage;
            
            // Get posts for current page
            const currentPagePosts = data.slice(startIndex, endIndex);
            
            // Clear existing content
            blogGrid.innerHTML = '';
            
            // Add blog posts
            currentPagePosts.forEach(post => {
                const blogCard = document.createElement('div');
                blogCard.className = 'blog-card';
                blogCard.setAttribute('data-aos', 'fade-up');
                
                blogCard.innerHTML = `
                    <div class="blog-image" style="background-color: var(--primary);">
                        <div class="blog-overlay"></div>
                        <div class="blog-category">${post.category}</div>
                    </div>
                    <div class="blog-content">
                        <h3 class="blog-title">${post.title}</h3>
                        <div class="blog-meta">
                            <span>${post.date}</span>
                            <span>${post.readTime} min read</span>
                        </div>
                        <p class="blog-excerpt">${post.excerpt}</p>
                        <a href="/pages/blog-post.html?id=${post.id}" class="blog-link">Read More <i class="fas fa-arrow-right"></i></a>
                    </div>
                `;
                
                blogGrid.appendChild(blogCard);
            });
            
            // Update pagination
            updatePagination(data.length, postsPerPage, page);
        })
        .catch(error => console.error('Error loading blog posts:', error));
}

function setupPagination() {
    const paginationContainer = document.querySelector('.blog-pagination');
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
                
                // Load blog posts for new page
                loadBlogPosts();
                
                // Scroll to top of blog section
                document.querySelector('.blog-posts').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
}

function updatePagination(totalPosts, postsPerPage, currentPage) {
    const paginationContainer = document.querySelector('.blog-pagination');
    if (!paginationContainer) return;
    
    // Calculate total pages
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    
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

// Function to load individual blog post
function loadBlogPost() {
    // Get blog post ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    
    if (!postId) {
        window.location.href = '/pages/blog.html';
        return;
    }
    
    const blogPostContainer = document.querySelector('.blog-post-container');
    if (!blogPostContainer) return;
    
    fetch('/data/blog-posts.json')
        .then(response => response.json())
        .then(data => {
            // Find post by ID
            const post = data.find(p => p.id == postId);
            
            if (!post) {
                window.location.href = '/pages/blog.html';
                return;
            }
            
            // Update page title
            document.title = `${post.title} | Amit Bhalla`;
            
            // Update blog post content
            blogPostContainer.innerHTML = `
                <div class="blog-post-header">
                    <h1 class="blog-post-title">${post.title}</h1>
                    <div class="blog-post-meta">
                        <span class="blog-post-date">${post.date}</span>
                        <span class="blog-post-category">${post.category}</span>
                        <span class="blog-post-read-time">${post.readTime} min read</span>
                    </div>
                </div>
                <div class="blog-post-content">
                    ${post.content}
                </div>
                <div class="blog-post-author">
                    <div class="blog-author-avatar">
                        <i class="fas fa-user-circle fa-4x"></i>
                    </div>
                    <div class="blog-author-info">
                        <h4>Amit Bhalla</h4>
                        <p>Marketing Strategist & Growth Catalyst with nearly two decades of experience helping B2B companies maximize marketing ROI and accelerate growth.</p>
                    </div>
                </div>
                <div class="blog-post-navigation">
                    <a href="/pages/blog.html" class="btn btn-outline-primary">
                        <i class="fas fa-arrow-left"></i> Back to Blog
                    </a>
                </div>
            `;
        })
        .catch(error => console.error('Error loading blog post:', error));
}

// Check if we're on a blog post page and load the post
if (window.location.pathname.includes('blog-post.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        loadBlogPost();
    });
}