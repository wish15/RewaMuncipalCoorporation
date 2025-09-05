// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initBannerSlider();
    initMobileMenu();
    initDropdownMenus();
    initSearchFilter();
    initScrollEffects();
    initServiceCardAnimations();
});

// Global function to reinitialize navigation after dynamic loading
window.reinitializeNavigation = function() {
    initMobileMenu();
    initDropdownMenus();
};

// Listen for navbar loaded event
document.addEventListener('navbarLoaded', function() {
    setTimeout(() => {
        initMobileMenu();
        initDropdownMenus();
    }, 50);
});

// Banner Slider Functionality
function initBannerSlider() {
    const slides = document.querySelectorAll('.banner-slide');
    let currentSlide = 0;
    
    if (slides.length === 0) return;
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Auto-advance slides every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Initialize first slide
    showSlide(0);
}

// Mobile Menu Toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Dropdown Menu Functionality
function initDropdownMenus() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    function handleMobileDropdowns() {
        dropdowns.forEach(dropdown => {
            const dropdownLink = dropdown.querySelector('.nav-link');
            const dropdownMenu = dropdown.querySelector('.dropdown-menu');
            
            // Remove existing mobile listeners
            dropdownLink.removeEventListener('click', dropdown.mobileClickHandler);
            
            if (window.innerWidth <= 768) {
                dropdown.mobileClickHandler = function(e) {
                    const href = this.getAttribute('href');
                    
                    // If it's a real link (not just #), allow navigation
                    if (href && href !== '#' && !href.startsWith('#')) {
                        // Don't prevent default - allow navigation
                        // Close mobile menu after navigation
                        setTimeout(() => {
                            const navMenu = document.querySelector('.nav-menu');
                            const hamburger = document.querySelector('.hamburger');
                            if (navMenu && hamburger) {
                                navMenu.classList.remove('active');
                                hamburger.classList.remove('active');
                                const spans = hamburger.querySelectorAll('span');
                                spans[0].style.transform = 'none';
                                spans[1].style.opacity = '1';
                                spans[2].style.transform = 'none';
                            }
                        }, 100);
                    } else {
                        // Only prevent default for # links (dropdown-only)
                        e.preventDefault();
                        e.stopPropagation();
                        
                        // Close other dropdowns
                        dropdowns.forEach(otherDropdown => {
                            if (otherDropdown !== dropdown) {
                                otherDropdown.classList.remove('active');
                            }
                        });
                        
                        // Toggle current dropdown
                        dropdown.classList.toggle('active');
                    }
                };
                
                dropdownLink.addEventListener('click', dropdown.mobileClickHandler);
            }
        });
    }
    
    // Handle mobile dropdowns on load
    handleMobileDropdowns();
    
    // Handle direct navigation links (non-dropdown items)
    const directLinks = document.querySelectorAll('.nav-menu > li:not(.dropdown) .nav-link');
    directLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Close mobile menu after clicking direct links
            setTimeout(() => {
                const navMenu = document.querySelector('.nav-menu');
                const hamburger = document.querySelector('.hamburger');
                if (navMenu && hamburger) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    const spans = hamburger.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }, 100);
        });
    });
    
    // Handle dropdown submenu links
    const dropdownSubLinks = document.querySelectorAll('.dropdown-menu a');
    dropdownSubLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Close mobile menu after clicking dropdown submenu items
            setTimeout(() => {
                const navMenu = document.querySelector('.nav-menu');
                const hamburger = document.querySelector('.hamburger');
                if (navMenu && hamburger) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    const spans = hamburger.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
                // Also close dropdown
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }, 100);
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
        // Re-initialize mobile dropdown handlers on resize
        handleMobileDropdowns();
    });
}

// Search and Filter Functionality
function initSearchFilter() {
    const searchInput = document.getElementById('searchInput');
    const filterBtn = document.querySelector('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-card');
    
    if (!searchInput) return;
    
    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        filterServices(searchTerm);
    });
    
    // Filter button click
    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            filterServices(searchTerm);
            
            // Add visual feedback
            this.innerHTML = '<span class="loading"></span> Filtering...';
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-filter"></i> Filter';
            }, 1000);
        });
    }
    
    function filterServices(searchTerm) {
        serviceCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const category = card.getAttribute('data-category') || '';
            
            const matches = title.includes(searchTerm) || 
                          description.includes(searchTerm) || 
                          category.includes(searchTerm);
            
            if (matches || searchTerm === '') {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease-in-out';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show no results message
        const visibleCards = Array.from(serviceCards).filter(card => 
            card.style.display !== 'none'
        );
        
        if (visibleCards.length === 0 && searchTerm !== '') {
            showNoResultsMessage();
        } else {
            hideNoResultsMessage();
        }
    }
    
    function showNoResultsMessage() {
        let noResultsDiv = document.querySelector('.no-results');
        if (!noResultsDiv) {
            noResultsDiv = document.createElement('div');
            noResultsDiv.className = 'no-results';
            noResultsDiv.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #666;">
                    <i class="fas fa-search" style="font-size: 48px; margin-bottom: 20px; opacity: 0.5;"></i>
                    <h3>No services found</h3>
                    <p>Try adjusting your search terms or browse all services.</p>
                </div>
            `;
            document.querySelector('.services-grid').appendChild(noResultsDiv);
        }
        noResultsDiv.style.display = 'block';
    }
    
    function hideNoResultsMessage() {
        const noResultsDiv = document.querySelector('.no-results');
        if (noResultsDiv) {
            noResultsDiv.style.display = 'none';
        }
    }
}

// Scroll Effects
function initScrollEffects() {
    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    const header = document.querySelector('.header');
    
    if (!navbar || !header) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.classList.remove('scrolled');
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Service Card Animations
function initServiceCardAnimations() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Intersection Observer for card animations
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
    
    serviceCards.forEach(card => {
        // Initial state for animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        observer.observe(card);
        
        // Add click tracking
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.service-link')) {
                const link = this.querySelector('.service-link');
                if (link) {
                    // Add visual feedback
                    this.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        this.style.transform = '';
                        link.click();
                    }, 150);
                }
            }
        });
    });
}

// Utility Functions
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

// Add CSS for fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .header.scrolled {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
    }
    
    .service-card {
        cursor: pointer;
    }
    
    .service-card:active {
        transform: scale(0.98) !important;
    }
`;
document.head.appendChild(style);

// Add service link tracking
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('service-link') || e.target.closest('.service-link')) {
        const link = e.target.closest('.service-link') || e.target;
        const serviceName = link.closest('.service-card').querySelector('h3').textContent;
        
        // Track analytics (you can replace this with actual analytics code)
        console.log('Service accessed:', serviceName);
        
        // Add visual feedback
        const originalText = link.innerHTML;
        link.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening...';
        
        setTimeout(() => {
            link.innerHTML = originalText;
        }, 2000);
    }
});

// Back to top button (optional)
function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #ff7b39;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(255, 123, 57, 0.3);
        z-index: 1000;
    `;
    
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back to top button
createBackToTopButton();
