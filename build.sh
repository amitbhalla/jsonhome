#!/bin/bash

# Create root directory
mkdir -p amit-bhalla-website

# Create main directories
cd amit-bhalla-website
mkdir -p pages css/pages js/pages data images/blog images/resources images/icons

# Create HTML files
touch index.html
touch pages/services.html pages/blog.html pages/blog-post.html pages/resources.html pages/resource.html pages/about.html pages/contact.html

# Create CSS files
touch css/main.css css/header.css css/footer.css
touch css/pages/home.css css/pages/services.css css/pages/blog.css css/pages/resources.css css/pages/about.css css/pages/contact.css

# Create JavaScript files
touch js/main.js js/navigation.js js/animations.js js/faq.js
touch js/pages/blog.js js/pages/resources.js

# Create JSON data files
touch data/services.json data/testimonials.json data/faqs.json data/resources.json data/stats.json data/blog-posts.json data/case-studies.json data/profile.json

# Create a placeholder for images
touch images/placeholder.txt

echo "Project structure created successfully!"