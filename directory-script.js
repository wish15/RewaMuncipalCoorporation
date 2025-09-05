// Directory Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initQuickAccessNavigation();
    initSmoothScrolling();
    initContactCardAnimations();
    initHelplineInteractions();
    initSearchFunctionality();
    initCopyToClipboard();
});

// Quick Access Navigation
function initQuickAccessNavigation() {
    const quickAccessCards = document.querySelectorAll('.quick-access-card');
    
    quickAccessCards.forEach(card => {
        card.addEventListener('click', function() {
            const targetSection = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            scrollToSection(targetSection);
        });
        
        // Add keyboard accessibility
        card.setAttribute('tabindex', '0');
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Smooth scrolling function
function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Add visual feedback
        targetSection.style.animation = 'highlightSection 2s ease-in-out';
        setTimeout(() => {
            targetSection.style.animation = '';
        }, 2000);
    }
}

// Smooth scrolling for all anchor links
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// Contact Card Animations
function initContactCardAnimations() {
    const contactCards = document.querySelectorAll('.contact-card, .utility-card');
    
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
    
    contactCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });
}

// Helpline Interactions
function initHelplineInteractions() {
    const helplineItems = document.querySelectorAll('.helpline-item');
    
    helplineItems.forEach(item => {
        const numberElement = item.querySelector('.helpline-number');
        const number = numberElement.textContent.trim();
        
        // Make helpline items clickable to call
        item.addEventListener('click', function() {
            if (number) {
                // On mobile devices, this will prompt to call
                window.location.href = `tel:${number}`;
            }
        });
        
        // Add hover effect for desktop
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(10px)';
        });
        
        // Add keyboard accessibility
        item.setAttribute('tabindex', '0');
        item.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                this.click();
            }
        });
    });
}

// Search Functionality
function initSearchFunctionality() {
    // Create search input
    const searchContainer = document.createElement('div');
    searchContainer.className = 'directory-search-container';
    searchContainer.innerHTML = `
        <div class="search-input-group">
            <input type="text" id="directorySearch" placeholder="Search directory..." class="directory-search-input">
            <button class="search-clear-btn" id="searchClear">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="search-filters">
            <button class="filter-btn active" data-filter="all">All</button>
            <button class="filter-btn" data-filter="contact">Contacts</button>
            <button class="filter-btn" data-filter="helpline">Helplines</button>
            <button class="filter-btn" data-filter="utility">Utilities</button>
        </div>
    `;
    
    // Insert search container after page header
    const pageHeader = document.querySelector('.page-header');
    pageHeader.insertAdjacentElement('afterend', searchContainer);
    
    const searchInput = document.getElementById('directorySearch');
    const searchClear = document.getElementById('searchClear');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        filterDirectory(searchTerm);
        
        // Show/hide clear button
        searchClear.style.display = searchTerm ? 'block' : 'none';
    });
    
    // Clear search
    searchClear.addEventListener('click', function() {
        searchInput.value = '';
        filterDirectory('');
        this.style.display = 'none';
        searchInput.focus();
    });
    
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active filter
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterType = this.getAttribute('data-filter');
            filterByType(filterType);
        });
    });
    
    function filterDirectory(searchTerm) {
        const allCards = document.querySelectorAll('.contact-card, .helpline-item, .utility-card, .codes-card');
        const sections = document.querySelectorAll('.directory-section');
        
        allCards.forEach(card => {
            const cardText = card.textContent.toLowerCase();
            const matches = cardText.includes(searchTerm) || searchTerm === '';
            
            if (matches) {
                card.style.display = '';
                card.style.animation = 'fadeIn 0.5s ease-in-out';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Hide/show sections based on visible cards
        sections.forEach(section => {
            const visibleCards = section.querySelectorAll('.contact-card:not([style*="display: none"]), .helpline-item:not([style*="display: none"]), .utility-card:not([style*="display: none"]), .codes-card:not([style*="display: none"])');
            
            if (visibleCards.length === 0 && searchTerm !== '') {
                section.style.display = 'none';
            } else {
                section.style.display = '';
            }
        });
    }
    
    function filterByType(type) {
        const sections = document.querySelectorAll('.directory-section');
        
        sections.forEach(section => {
            const sectionId = section.getAttribute('id');
            
            if (type === 'all') {
                section.style.display = '';
            } else if (
                (type === 'contact' && sectionId === 'contact-directory') ||
                (type === 'helpline' && sectionId === 'helpline') ||
                (type === 'utility' && (sectionId === 'public-utilities' || sectionId === 'std-codes'))
            ) {
                section.style.display = '';
            } else {
                section.style.display = 'none';
            }
        });
    }
}

// Copy to Clipboard Functionality
function initCopyToClipboard() {
    // Add copy buttons to phone numbers and emails
    const contactItems = document.querySelectorAll('.contact-item, .helpline-number');
    
    contactItems.forEach(item => {
        const text = item.textContent.trim();
        
        // Check if it's a phone number or email
        if (text.match(/^[\+]?[0-9\-\s\(\)]+$/) || text.includes('@')) {
            item.style.cursor = 'pointer';
            item.title = 'Click to copy';
            
            item.addEventListener('click', function(e) {
                e.stopPropagation();
                copyToClipboard(text);
                showCopyFeedback(this);
            });
        }
    });
}

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function() {
            console.log('Copied to clipboard:', text);
        });
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

function showCopyFeedback(element) {
    const originalContent = element.innerHTML;
    element.style.background = '#28a745';
    element.style.color = 'white';
    element.style.borderRadius = '4px';
    element.style.padding = '2px 6px';
    
    // Create and show tooltip
    const tooltip = document.createElement('div');
    tooltip.textContent = 'Copied!';
    tooltip.style.cssText = `
        position: absolute;
        background: #333;
        color: white;
        padding: 6px 10px;
        border-radius: 4px;
        font-size: 12px;
        z-index: 1000;
        top: -30px;
        left: 50%;
        transform: translateX(-50%);
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.appendChild(tooltip);
    
    setTimeout(() => {
        element.style.background = '';
        element.style.color = '';
        element.style.borderRadius = '';
        element.style.padding = '';
        if (tooltip.parentNode) {
            tooltip.parentNode.removeChild(tooltip);
        }
    }, 2000);
}

// Print Functionality
function printDirectory() {
    window.print();
}

// Add print styles
const printStyles = document.createElement('style');
printStyles.textContent = `
    @media print {
        .header, .footer, .breadcrumb, .directory-search-container {
            display: none !important;
        }
        
        .directory-section {
            break-inside: avoid;
            margin-bottom: 30px;
        }
        
        .contact-card, .utility-card {
            break-inside: avoid;
            margin-bottom: 15px;
        }
    }
`;
document.head.appendChild(printStyles);

// Add CSS for search functionality
const searchStyles = document.createElement('style');
searchStyles.textContent = `
    .directory-search-container {
        background: white;
        border-radius: 10px;
        padding: 25px;
        margin: 20px 0 40px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    
    .search-input-group {
        position: relative;
        margin-bottom: 20px;
    }
    
    .directory-search-input {
        width: 100%;
        padding: 15px 50px 15px 20px;
        border: 2px solid #e9ecef;
        border-radius: 8px;
        font-size: 16px;
        outline: none;
        transition: border-color 0.3s ease;
    }
    
    .directory-search-input:focus {
        border-color: #ff7b39;
    }
    
    .search-clear-btn {
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        color: #666;
        cursor: pointer;
        display: none;
        padding: 5px;
        border-radius: 4px;
    }
    
    .search-clear-btn:hover {
        background: #f8f9fa;
        color: #ff7b39;
    }
    
    .search-filters {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
    }
    
    .filter-btn {
        padding: 8px 16px;
        border: 2px solid #e9ecef;
        background: white;
        color: #666;
        border-radius: 20px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.3s ease;
    }
    
    .filter-btn:hover,
    .filter-btn.active {
        background: #ff7b39;
        border-color: #ff7b39;
        color: white;
    }
    
    @keyframes highlightSection {
        0% { background: rgba(255, 123, 57, 0.1); }
        50% { background: rgba(255, 123, 57, 0.2); }
        100% { background: transparent; }
    }
    
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
    
    @media (max-width: 768px) {
        .directory-search-container {
            padding: 20px 15px;
        }
        
        .search-filters {
            justify-content: center;
        }
        
        .filter-btn {
            font-size: 13px;
            padding: 6px 12px;
        }
    }
`;

document.head.appendChild(searchStyles);
