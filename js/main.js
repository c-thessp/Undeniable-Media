/**
 * UNDENIABLE MEDIA STUDIO - LANDING PAGE
 * Interactive JavaScript Functionality
 */

// =========================================
// 1. NAVIGATION FUNCTIONALITY
// =========================================

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-wrapper')) {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
}

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class for styling
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// =========================================
// 2. SMOOTH SCROLLING
// =========================================

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// =========================================
// 3. FAQ ACCORDION
// =========================================

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close other open items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// =========================================
// 4. BACK TO TOP BUTTON
// =========================================

const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// =========================================
// 5. CONTACT FORM HANDLING
// =========================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            interest: document.getElementById('interest').value,
            message: document.getElementById('message').value
        };
        
        // Basic validation
        if (!formData.name || !formData.email || !formData.interest || !formData.message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // In a real implementation, you would send this data to a server
        console.log('Form submitted:', formData);
        
        // Show success message
        showNotification('Thank you! Your message has been sent. We\'ll be in touch soon.', 'success');
        
        // Reset form
        contactForm.reset();
    });
}

// =========================================
// 6. NOTIFICATION SYSTEM
// =========================================

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles for notification
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            max-width: 400px;
            padding: 1.25rem 1.5rem;
            background-color: white;
            border-radius: 15px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.2);
            z-index: 9999;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
            animation: slideIn 0.3s ease;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .notification-success {
            border-left: 4px solid #d4af37;
        }
        
        .notification-error {
            border-left: 4px solid #dc3545;
        }
        
        .notification-info {
            border-left: 4px solid #17a2b8;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .notification-content i {
            font-size: 1.5rem;
        }
        
        .notification-success i {
            color: #d4af37;
        }
        
        .notification-error i {
            color: #dc3545;
        }
        
        .notification-info i {
            color: #17a2b8;
        }
        
        .notification-content span {
            color: #333;
            font-weight: 500;
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 1.25rem;
            color: #666;
            cursor: pointer;
            padding: 0.25rem;
            transition: color 0.2s ease;
        }
        
        .notification-close:hover {
            color: #333;
        }
        
        @media (max-width: 768px) {
            .notification {
                right: 10px;
                left: 10px;
                max-width: none;
            }
        }
    `;
    
    if (!document.querySelector('style[data-notification]')) {
        style.setAttribute('data-notification', 'true');
        document.head.appendChild(style);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// =========================================
// 7. SCROLL ANIMATIONS
// =========================================

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(`
        .studio-card,
        .package-card,
        .show-card,
        .why-item,
        .serve-card,
        .team-member,
        .testimonial-card,
        .step-card
    `);
    
    animateElements.forEach(el => observer.observe(el));
});

// =========================================
// 8. PACKAGE HIGHLIGHT EFFECTS
// =========================================

// Add hover effect tracking for analytics
document.querySelectorAll('.package-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const packageName = card.querySelector('h4')?.textContent;
        console.log(`User viewing package: ${packageName}`);
    });
});

// =========================================
// 9. SCROLL PROGRESS INDICATOR (Optional)
// =========================================

function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // You can add a progress bar if needed
    // document.getElementById('scrollProgress').style.width = scrolled + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// =========================================
// 10. LAZY LOADING FOR IMAGES (if added later)
// =========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// =========================================
// 11. UTILITY FUNCTIONS
// =========================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// =========================================
// 12. ANALYTICS TRACKING (Placeholder)
// =========================================

// Track CTA button clicks
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText = e.target.textContent.trim();
        console.log(`CTA clicked: ${buttonText}`);
        
        // In production, you would send this to Google Analytics, Facebook Pixel, etc.
        // Example: gtag('event', 'click', { 'event_category': 'CTA', 'event_label': buttonText });
    });
});

// Track section views
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id || 'unknown';
            console.log(`Section viewed: ${sectionId}`);
            
            // Send to analytics
            // gtag('event', 'section_view', { 'section_name': sectionId });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.section').forEach(section => {
    sectionObserver.observe(section);
});

// =========================================
// 13. PERFORMANCE OPTIMIZATION
// =========================================

// Preload critical resources
window.addEventListener('load', () => {
    console.log('Page fully loaded');
    
    // Remove loading states if any
    document.body.classList.add('loaded');
    
    // Optional: Preconnect to external resources
    const preconnectLinks = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com'
    ];
    
    preconnectLinks.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = url;
        if (!document.querySelector(`link[href="${url}"]`)) {
            document.head.appendChild(link);
        }
    });
});

// =========================================
// 14. ACCESSIBILITY ENHANCEMENTS
// =========================================

// Keyboard navigation for FAQ
document.querySelectorAll('.faq-question').forEach((button, index) => {
    button.setAttribute('role', 'button');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', `faq-answer-${index}`);
    
    button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            button.click();
        }
    });
    
    // Update aria-expanded when clicked
    button.addEventListener('click', () => {
        const isExpanded = button.closest('.faq-item').classList.contains('active');
        button.setAttribute('aria-expanded', isExpanded);
    });
});

// Focus management for mobile menu
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            const firstLink = navLinks.querySelector('a');
            if (firstLink) {
                setTimeout(() => firstLink.focus(), 100);
            }
        }
    });
}

// =========================================
// 15. INITIALIZATION
// =========================================

console.log('Undeniable Media Studio - Website Loaded Successfully');
console.log('Brand: Sophisticated yet Approachable');

// Check if running in development mode
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

if (isDevelopment) {
    console.log('Running in development mode');
}