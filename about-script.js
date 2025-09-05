// About City Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initSidebarNavigation();
    initSmoothScrolling();
    initSectionHighlighting();
    initDropdownMenus();
});

// Sidebar Navigation
function initSidebarNavigation() {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const sections = document.querySelectorAll('.content-section');
    
    // Add click event to sidebar links
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Scroll to target section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Smooth Scrolling for all anchor links
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Section Highlighting based on scroll position
function initSectionHighlighting() {
    const sections = document.querySelectorAll('.content-section');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    
    function updateActiveSection() {
        const scrollPosition = window.scrollY;
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // Remove active class from all sidebar links
                sidebarLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to corresponding sidebar link
                const sectionId = section.getAttribute('id');
                const correspondingLink = document.querySelector(`.sidebar-link[href="#${sectionId}"]`);
                
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }
    
    // Throttle scroll event for better performance
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateActiveSection();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial call
    updateActiveSection();
}

// Dropdown Menus for Mobile
function initDropdownMenus() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('.nav-link');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        if (dropdownLink && dropdownMenu) {
            dropdownLink.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
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

// Intersection Observer for animations
function initScrollAnimations() {
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
    
    // Observe stat cards, feature cards, etc.
    const animatedElements = document.querySelectorAll(`
        .stat-card,
        .feature-card,
        .demo-item,
        .culture-item,
        .sector-card,
        .place-card,
        .timeline-item,
        .admin-level
    `);
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
}

// Initialize animations when page loads
window.addEventListener('load', function() {
    initScrollAnimations();
});

// Print functionality
function printPage() {
    window.print();
}

// Share functionality
function sharePage() {
    if (navigator.share) {
        navigator.share({
            title: 'About Rewa - Rewa Municipal Corporation',
            text: 'Learn about Rewa city, the land of white tigers and rich heritage.',
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(function() {
            alert('Page URL copied to clipboard!');
        });
    }
}

// Search functionality for content
function initContentSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search content...';
    searchInput.className = 'content-search';
    
    // Add search input to sidebar
    const sidebar = document.querySelector('.sidebar-menu');
    if (sidebar) {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.style.padding = '0 25px 20px';
        searchContainer.appendChild(searchInput);
        
        sidebar.insertBefore(searchContainer, sidebar.firstChild.nextSibling);
        
        // Search functionality
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const contentSections = document.querySelectorAll('.content-section');
            
            contentSections.forEach(section => {
                const sectionText = section.textContent.toLowerCase();
                const sectionId = section.getAttribute('id');
                const correspondingLink = document.querySelector(`.sidebar-link[href="#${sectionId}"]`);
                
                if (sectionText.includes(searchTerm) || searchTerm === '') {
                    if (correspondingLink) {
                        correspondingLink.style.display = 'block';
                    }
                } else {
                    if (correspondingLink) {
                        correspondingLink.style.display = 'none';
                    }
                }
            });
        });
    }
}

// Add CSS for content search
const searchStyles = document.createElement('style');
searchStyles.textContent = `
    .content-search {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 14px;
        outline: none;
        transition: border-color 0.3s ease;
    }
    
    .content-search:focus {
        border-color: #ff7b39;
    }
    
    .search-container {
        border-bottom: 1px solid #f0f0f0;
        margin-bottom: 20px;
    }
`;

document.head.appendChild(searchStyles);

// Initialize content search
initContentSearch();
