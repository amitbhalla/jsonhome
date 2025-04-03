#!/bin/bash

# Create main directories
mkdir -p css/components
mkdir -p js/components
mkdir -p data
mkdir -p assets/images
mkdir -p assets/icons
mkdir -p assets/docs

# Create HTML file
touch index.html

# Create CSS files
touch css/style.css
touch css/components/navbar.css
touch css/components/hero.css
touch css/components/pains-gains.css
touch css/components/solutions.css
touch css/components/services.css
touch css/components/approach.css
touch css/components/success-stories.css
touch css/components/testimonials.css
touch css/components/faq.css
touch css/components/contact.css
touch css/components/footer.css

# Create JS files
touch js/main.js
touch js/components/navbar.js
touch js/components/hero.js
touch js/components/pains-gains.js
touch js/components/solutions.js
touch js/components/services.js
touch js/components/approach.js
touch js/components/success-stories.js
touch js/components/testimonials.js
touch js/components/faq.js
touch js/components/contact.js
touch js/components/footer.js

# Create JSON data files
touch data/navbar.json
touch data/hero.json
touch data/pains-gains.json
touch data/solutions.json
touch data/services.json
touch data/approach.json
touch data/success-stories.json
touch data/testimonials.json
touch data/faq.json
touch data/contact.json
touch data/footer.json

# Copy resume to assets
echo "Please copy your Resume_AmitBhalla.pdf to the assets/docs directory"

echo "Project structure created successfully!"