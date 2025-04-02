/**
 * Additional animations for the Amit Bhalla website
 * This complements AOS (Animate on Scroll) with custom animations
 */

// When DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
});

function initAnimations() {
    // Animate hero title gradient
    animateHeroGradient();
    
    // Animate stats counters
    animateCounters();
    
    // Animate images on hover
    setupImageHoverEffects();
    
    // Add parallax effect to blobs
    setupParallaxEffect();
}

/**
 * Animate hero title gradient by changing its position and angle over time
 */
function animateHeroGradient() {
    const textGradients = document.querySelectorAll('.text-gradient');
    if (!textGradients.length) return;
    
    let angle = 0;
    
    setInterval(() => {
        angle = (angle + 1) % 360;
        
        textGradients.forEach(element => {
            element.style.background = `linear-gradient(${angle}deg, var(--primary) 0%, var(--secondary) 100%)`;
            element.style.backgroundClip = 'text';
            element.style.webkitBackgroundClip = 'text';
            element.style.webkitTextFillColor = 'transparent';
            element.style.color = 'transparent';
        });
    }, 50);
}

/**
 * Animate stat counters with a counting up effect
 */
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number, .bio-stat-number');
    if (!counters.length) return;
    
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent);
                let count = 0;
                
                // Don't animate again if already animated
                if (counter.dataset.animated === 'true') return;
                counter.dataset.animated = 'true';
                
                const updateCounter = () => {
                    const increment = target / 40; // Adjust speed
                    if (count < target) {
                        count += increment;
                        counter.textContent = Math.ceil(count);
                        setTimeout(updateCounter, 30);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                // Start the animation
                updateCounter();
                
                // Unobserve after animation
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    // Observe each counter
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

/**
 * Setup hover animations for images
 */
function setupImageHoverEffects() {
    const images = document.querySelectorAll('.service-detail-image img, .bio-image');
    if (!images.length) return;
    
    images.forEach(image => {
        image.addEventListener('mousemove', (e) => {
            // Calculate mouse position relative to the image
            const { left, top, width, height } = image.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;
            
            // Calculate tilt amount (max 10deg)
            const tiltX = (y - 0.5) * 10;
            const tiltY = (0.5 - x) * 10;
            
            // Apply transform
            image.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        // Reset transform on mouse leave
        image.addEventListener('mouseleave', () => {
            image.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

/**
 * Setup parallax effect for background blobs
 */
function setupParallaxEffect() {
    const blobs = document.querySelectorAll('.blob');
    if (!blobs.length) return;
    
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        blobs.forEach((blob, index) => {
            // Different blobs move at different speeds and directions
            const factor = (index % 2 === 0) ? 1 : -1;
            const intensity = (index % 3 + 1) * 20 * factor;
            
            // Calculate translation amount
            const translateX = (x - 0.5) * intensity;
            const translateY = (y - 0.5) * intensity;
            
            // Apply transform
            blob.style.transform = `translate(${translateX}px, ${translateY}px)`;
        });
    });
}