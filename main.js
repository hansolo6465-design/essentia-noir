// Initialize page load animations
document.addEventListener('DOMContentLoaded', () => {
    // Set initial opacity for scroll animations
    gsap.set('.product-card, .feature-item, .testimonial-card', {
        opacity: 0,
        y: 30
    });

    gsap.set('.newsletter-content', {
        opacity: 0,
        scale: 0.9
    });

    // Smooth page transitions
    document.body.style.opacity = '1';
});

// Intersection Observer for enhanced animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

// Observe all animatable elements
document.querySelectorAll('.product-card, .feature-item, .testimonial-card').forEach(el => {
    observer.observe(el);
});

// Function to handle mobile menu (for future implementation)
function setupMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

// Page load fade in
window.addEventListener('load', () => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
});

// Add scroll lock to body when scrolling fast
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        // Any cleanup code here
    }, 150);
});

// Handle window resize for responsive adjustments
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Scroll trigger refresh
        ScrollTrigger.refresh();
    }, 250);
});

// Prevent layout shift
document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.style.scrollBehavior = 'smooth';
});

// Utility function for cart (placeholder)
function addToCart(productName, productPrice) {
    console.log(`Added "${productName}" ($${productPrice}) to cart`);
    alert(`Added "${productName}" to your cart!`);
}

// Add event listeners to cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('.product-info h3').textContent;
        const productPrice = productCard.querySelector('.price-tag').textContent;
        
        addToCart(productName, productPrice);
    });
});

// Shop button functionality
document.querySelector('.shop-btn')?.addEventListener('click', () => {
    const collectionSection = document.getElementById('collection');
    gsap.to(window, {
        duration: 1,
        scrollTo: { y: collectionSection, autoKill: false },
        ease: 'power2.inOut'
    });
});

// Explore Collection button
document.querySelector('.cta-primary')?.addEventListener('click', () => {
    const collectionSection = document.getElementById('collection');
    gsap.to(window, {
        duration: 1,
        scrollTo: { y: collectionSection, autoKill: false },
        ease: 'power2.inOut'
    });
});

// Log page analytics (placeholder)
console.log('Essentia Noir - Luxury Perfume Website Loaded Successfully');
console.log('Version: 1.0.0');
