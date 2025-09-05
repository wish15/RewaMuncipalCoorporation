// Tourism Page JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize page functionality
    initializeDropdownMenus();
    initializeSmoothScrolling();
    initializeAnimations();
    initializeImageLazyLoading();
    initializePrintFunctionality();
    initializeShareFunctionality();
    initializePlaceCardInteractions();
    initializeAccommodationFilters();
    
    console.log('Tourism page loaded successfully');
});

// Dropdown menus functionality
function initializeDropdownMenus() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.nav-link');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (trigger && menu) {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Close other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('active');
            });
        }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize animations using Intersection Observer
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Add animation styles and observe elements
    const animatedElements = document.querySelectorAll('.tourism-section, .place-card, .reach-card, .festival-card');
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        observer.observe(element);
    });
}

// Lazy loading for images (placeholder for future implementation)
function initializeImageLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Print functionality
function initializePrintFunctionality() {
    const printBtn = document.querySelector('.share-btn i.fa-print');
    
    if (printBtn) {
        printBtn.parentElement.addEventListener('click', function() {
            window.print();
        });
    }
}

// Share functionality
function initializeShareFunctionality() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(btn => {
        const icon = btn.querySelector('i');
        
        if (icon && icon.classList.contains('fa-share-alt')) {
            btn.addEventListener('click', function() {
                if (navigator.share) {
                    navigator.share({
                        title: 'Tourism - Rewa Municipal Corporation',
                        text: 'Discover the beautiful city of Rewa - Land of White Tigers',
                        url: window.location.href
                    });
                } else {
                    // Fallback for browsers that don't support Web Share API
                    copyToClipboard(window.location.href);
                    showToast('Link copied to clipboard!');
                }
            });
        } else if (icon && icon.classList.contains('fa-facebook-f')) {
            btn.addEventListener('click', function() {
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
            });
        } else if (icon && icon.classList.contains('fa-twitter')) {
            btn.addEventListener('click', function() {
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=Discover Rewa Tourism`, '_blank');
            });
        }
    });
}

// Place card interactions
function initializePlaceCardInteractions() {
    const placeCards = document.querySelectorAll('.place-card');
    
    placeCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add ripple effect
            createRippleEffect(this, event);
        });
        
        // Add hover effects for features
        const features = card.querySelectorAll('.place-features span');
        features.forEach(feature => {
            feature.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
            });
            
            feature.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    });
}

// Accommodation filters (future enhancement)
function initializeAccommodationFilters() {
    const accommodationItems = document.querySelectorAll('.accommodation-item');
    
    // Add click functionality to phone numbers
    accommodationItems.forEach(item => {
        const phoneLinks = item.querySelectorAll('p');
        phoneLinks.forEach(p => {
            if (p.textContent.includes('+91-')) {
                p.style.cursor = 'pointer';
                p.style.color = '#4CAF50';
                
                p.addEventListener('click', function() {
                    const phoneNumber = this.textContent.match(/\+91-[\d-]+/);
                    if (phoneNumber) {
                        window.open(`tel:${phoneNumber[0]}`, '_self');
                    }
                });
            }
        });
    });
}

// Utility function to create ripple effect
function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.pointerEvents = 'none';
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Utility function to copy to clipboard
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}

// Utility function to show toast notification
function showToast(message) {
    // Remove existing toast
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create new toast
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 12px 24px;
        border-radius: 25px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        font-size: 14px;
        font-weight: 500;
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(50px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .place-features span {
        transition: transform 0.2s ease;
    }
    
    .accommodation-item p:hover {
        font-weight: 500;
    }
`;
document.head.appendChild(style);

// Handle mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Search functionality for places (future enhancement)
function initializeSearchFunctionality() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search tourist places...';
    searchInput.className = 'tourism-search';
    
    // Add search input to page header (if needed)
    const pageHeader = document.querySelector('.page-header');
    if (pageHeader) {
        searchInput.style.cssText = `
            margin-top: 15px;
            padding: 10px 15px;
            border: 2px solid #e0e0e0;
            border-radius: 25px;
            font-size: 14px;
            width: 100%;
            max-width: 300px;
        `;
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const placeCards = document.querySelectorAll('.place-card');
            
            placeCards.forEach(card => {
                const placeName = card.querySelector('h3').textContent.toLowerCase();
                const placeDescription = card.querySelector('p').textContent.toLowerCase();
                
                if (placeName.includes(searchTerm) || placeDescription.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// Initialize keyboard navigation
document.addEventListener('keydown', function(e) {
    // Press 'S' to focus search (if implemented)
    if (e.key === 's' && !e.ctrlKey && !e.metaKey) {
        const searchInput = document.querySelector('.tourism-search');
        if (searchInput && document.activeElement !== searchInput) {
            e.preventDefault();
            searchInput.focus();
        }
    }
    
    // Press 'Escape' to close dropdowns
    if (e.key === 'Escape') {
        const activeDropdowns = document.querySelectorAll('.dropdown.active');
        activeDropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});
