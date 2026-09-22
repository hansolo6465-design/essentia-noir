// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Hero section animations
gsap.timeline()
    .to('.word', { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 }, 0)
    .to('.hero-subtitle', { opacity: 1, duration: 0.8 }, 0.4)
    .to('.cta-primary', { opacity: 1, y: 0, duration: 0.8 }, 0.6);

// Featured section scroll animations
gsap.utils.toArray('.product-card').forEach((card, index) => {
    gsap.to(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.1
    });
});

// Feature items animation
gsap.utils.toArray('.feature-item').forEach((item, index) => {
    gsap.to(item, {
        scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.05
    });
});

// Testimonials animation
gsap.utils.toArray('.testimonial-card').forEach((card, index) => {
    gsap.to(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.1
    });
});

// Newsletter section animation
gsap.to('.newsletter-content', {
    scrollTrigger: {
        trigger: '.newsletter-section',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
    },
    opacity: 1,
    scale: 1,
    duration: 0.8
});

// Hover animations for product cards
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, { duration: 0.3, y: -10 });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, { duration: 0.3, y: 0 });
    });
});

// Navbar animation on scroll
let lastScrollY = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    
    if (lastScrollY > 100) {
        navbar.style.borderBottomColor = 'rgba(212, 175, 55, 0.4)';
    } else {
        navbar.style.borderBottomColor = 'rgba(212, 175, 55, 0.2)';
    }
});

// Button ripple effect
function addRippleEffect(element) {
    element.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.pointerEvents = 'none';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple-animation 0.6s ease-out';

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
}

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Apply ripple to buttons
document.querySelectorAll('.cta-primary, .shop-btn, .add-to-cart, .subscribe-btn, .submit-btn').forEach(btn => {
    addRippleEffect(btn);
});

// Form submissions
document.getElementById('newsletter-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    gsap.to('.newsletter-form', {
        duration: 0.3,
        scale: 0.95,
        opacity: 0.7,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
            alert('Thank you for subscribing!');
            e.target.reset();
        }
    });
});

document.querySelector('.contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    gsap.to('.contact-form', {
        duration: 0.3,
        scale: 0.95,
        opacity: 0.7,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
            alert('Message sent! We\'ll get back to you soon.');
            e.target.reset();
        }
    });
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            gsap.to(window, {
                duration: 1,
                scrollTo: { y: target, autoKill: false },
                ease: 'power2.inOut'
            });
        }
    });
});
