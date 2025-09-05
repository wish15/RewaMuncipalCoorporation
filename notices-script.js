// Notices Page JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize page functionality
    initializeDropdownMenus();
    initializeNoticeFilters();
    initializeSearchFunctionality();
    initializeSmoothScrolling();
    initializeAnimations();
    initializeNoticeActions();
    initializePrintFunctionality();
    initializeShareFunctionality();
    initializeEmergencyNumbers();
    
    console.log('Notices page loaded successfully');
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

// Notice filtering functionality
function initializeNoticeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const noticeItems = document.querySelectorAll('.notice-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter notice items
            noticeItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Update stats counter
            updateStatsCounter(filterValue);
        });
    });
}

// Search functionality for notices
function initializeSearchFunctionality() {
    // Create search input
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
        <div style="margin: 20px 0; display: flex; align-items: center; gap: 10px;">
            <input type="text" id="noticeSearch" placeholder="Search notices, tenders, events..." 
                   style="flex: 1; padding: 12px 15px; border: 2px solid #e0e0e0; border-radius: 25px; font-size: 14px;">
            <button id="clearSearch" style="padding: 12px 15px; background: #1976D2; color: white; border: none; border-radius: 25px; cursor: pointer;">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Insert search before notices grid
    const noticesGrid = document.querySelector('.notices-grid');
    if (noticesGrid) {
        noticesGrid.parentNode.insertBefore(searchContainer, noticesGrid);
    }
    
    const searchInput = document.getElementById('noticeSearch');
    const clearButton = document.getElementById('clearSearch');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterNoticesBySearch(searchTerm);
        });
    }
    
    if (clearButton) {
        clearButton.addEventListener('click', function() {
            searchInput.value = '';
            filterNoticesBySearch('');
        });
    }
}

// Filter notices by search term
function filterNoticesBySearch(searchTerm) {
    const noticeItems = document.querySelectorAll('.notice-item');
    let visibleCount = 0;
    
    noticeItems.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        const content = item.querySelector('p').textContent.toLowerCase();
        const tags = Array.from(item.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase()).join(' ');
        
        if (searchTerm === '' || title.includes(searchTerm) || content.includes(searchTerm) || tags.includes(searchTerm)) {
            item.style.display = 'block';
            visibleCount++;
        } else {
            item.style.display = 'none';
        }
    });
    
    // Show search results count
    showSearchResults(visibleCount, searchTerm);
}

// Show search results count
function showSearchResults(count, searchTerm) {
    // Remove existing search results message
    const existingMessage = document.querySelector('.search-results-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    if (searchTerm !== '') {
        const message = document.createElement('div');
        message.className = 'search-results-message';
        message.innerHTML = `
            <div style="background: #E3F2FD; color: #1976D2; padding: 15px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
                <i class="fas fa-search"></i> Found ${count} result(s) for "${searchTerm}"
            </div>
        `;
        
        const noticesGrid = document.querySelector('.notices-grid');
        if (noticesGrid) {
            noticesGrid.parentNode.insertBefore(message, noticesGrid);
        }
    }
}

// Update stats counter based on filter
function updateStatsCounter(filterValue) {
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach(card => {
        const icon = card.querySelector('.stat-icon i');
        const countElement = card.querySelector('.stat-content h3');
        
        if (filterValue === 'all') {
            card.style.opacity = '1';
        } else {
            // Highlight relevant stat card
            if ((filterValue === 'tenders' && icon.classList.contains('fa-gavel')) ||
                (filterValue === 'news' && icon.classList.contains('fa-newspaper')) ||
                (filterValue === 'events' && icon.classList.contains('fa-calendar-alt')) ||
                (filterValue === 'notices' && icon.classList.contains('fa-bell'))) {
                card.style.opacity = '1';
                card.style.transform = 'scale(1.05)';
            } else {
                card.style.opacity = '0.5';
                card.style.transform = 'scale(1)';
            }
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

// Initialize animations
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
    const animatedElements = document.querySelectorAll('.notices-section, .notice-item, .stat-card');
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        observer.observe(element);
    });
}

// Notice actions functionality
function initializeNoticeActions() {
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(button => {
        const icon = button.querySelector('i');
        
        if (icon && icon.classList.contains('fa-download')) {
            button.addEventListener('click', function() {
                const noticeItem = this.closest('.notice-item');
                const title = noticeItem.querySelector('h3').textContent;
                
                // Simulate download
                showToast(`Downloading: ${title}`);
                
                // In a real application, this would trigger actual file download
                setTimeout(() => {
                    showToast('Download completed successfully!');
                }, 2000);
            });
        } else if (icon && icon.classList.contains('fa-share')) {
            button.addEventListener('click', function() {
                const noticeItem = this.closest('.notice-item');
                const title = noticeItem.querySelector('h3').textContent;
                
                if (navigator.share) {
                    navigator.share({
                        title: title,
                        text: 'Check out this notice from Rewa Municipal Corporation',
                        url: window.location.href
                    });
                } else {
                    copyToClipboard(window.location.href);
                    showToast('Link copied to clipboard!');
                }
            });
        }
    });
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
                        title: 'Notices - Rewa Municipal Corporation',
                        text: 'Stay updated with latest notices and announcements',
                        url: window.location.href
                    });
                } else {
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
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=Rewa Municipal Corporation Notices`, '_blank');
            });
        }
    });
}

// Emergency numbers functionality
function initializeEmergencyNumbers() {
    const emergencyNumbers = document.querySelectorAll('.emergency-item .number');
    
    emergencyNumbers.forEach(numberElement => {
        numberElement.style.cursor = 'pointer';
        
        numberElement.addEventListener('click', function() {
            const number = this.textContent.trim();
            
            // For mobile devices, try to open phone dialer
            if (/Mobi|Android/i.test(navigator.userAgent)) {
                window.open(`tel:${number}`, '_self');
            } else {
                // For desktop, copy to clipboard
                copyToClipboard(number);
                showToast(`Number copied: ${number}`);
            }
        });
        
        // Add hover effect
        numberElement.addEventListener('mouseenter', function() {
            this.style.textDecoration = 'underline';
        });
        
        numberElement.addEventListener('mouseleave', function() {
            this.style.textDecoration = 'none';
        });
    });
}

// Notice reminder functionality
function initializeNoticeReminders() {
    const importantNotices = document.querySelectorAll('.notice-item.priority-high, .notice-item.important');
    
    importantNotices.forEach(notice => {
        // Add reminder button
        const reminderBtn = document.createElement('button');
        reminderBtn.innerHTML = '<i class="fas fa-bell"></i> Set Reminder';
        reminderBtn.className = 'reminder-btn';
        reminderBtn.style.cssText = `
            background: #FF9800;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 20px;
            cursor: pointer;
            font-size: 12px;
            margin-top: 10px;
            transition: background 0.3s ease;
        `;
        
        reminderBtn.addEventListener('click', function() {
            const title = notice.querySelector('h3').textContent;
            showToast(`Reminder set for: ${title}`);
            
            // In a real application, this would set up actual notifications
            this.innerHTML = '<i class="fas fa-check"></i> Reminder Set';
            this.style.background = '#4CAF50';
            this.disabled = true;
        });
        
        const noticeContent = notice.querySelector('.notice-content');
        if (noticeContent) {
            noticeContent.appendChild(reminderBtn);
        }
    });
}

// Initialize deadline tracking
function initializeDeadlineTracking() {
    const tenderItems = document.querySelectorAll('.tender-item');
    
    tenderItems.forEach(item => {
        const dateElements = item.querySelectorAll('.detail-item .value');
        
        dateElements.forEach(element => {
            const dateText = element.textContent;
            if (dateText.includes('2025')) {
                const date = new Date(dateText);
                const now = new Date();
                const daysLeft = Math.ceil((date - now) / (1000 * 60 * 60 * 24));
                
                if (daysLeft > 0 && daysLeft <= 7) {
                    // Add urgent indicator for deadlines within 7 days
                    const urgentIndicator = document.createElement('span');
                    urgentIndicator.innerHTML = `<i class="fas fa-clock"></i> ${daysLeft} days left`;
                    urgentIndicator.style.cssText = `
                        background: #F44336;
                        color: white;
                        padding: 4px 8px;
                        border-radius: 12px;
                        font-size: 11px;
                        margin-left: 8px;
                        animation: pulse 2s infinite;
                    `;
                    
                    element.appendChild(urgentIndicator);
                }
            }
        });
    });
}

// Utility function to copy to clipboard
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    } else {
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
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #1976D2;
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
    
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 100);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(50px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.5; }
        100% { opacity: 1; }
    }
    
    .stat-card {
        transition: all 0.3s ease;
    }
    
    .notice-item {
        transition: all 0.3s ease;
    }
    
    .filter-btn {
        transition: all 0.3s ease;
    }
    
    .reminder-btn:hover {
        background: #F57C00 !important;
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
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Initialize additional features
setTimeout(() => {
    initializeNoticeReminders();
    initializeDeadlineTracking();
}, 1000);

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Press 'S' to focus search
    if (e.key === 's' && !e.ctrlKey && !e.metaKey) {
        const searchInput = document.querySelector('#noticeSearch');
        if (searchInput && document.activeElement !== searchInput) {
            e.preventDefault();
            searchInput.focus();
        }
    }
    
    // Press numbers 1-5 to filter categories
    if (e.key >= '1' && e.key <= '5') {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const index = parseInt(e.key) - 1;
        if (filterButtons[index]) {
            filterButtons[index].click();
        }
    }
    
    // Press 'Escape' to clear search and filters
    if (e.key === 'Escape') {
        const searchInput = document.querySelector('#noticeSearch');
        if (searchInput) {
            searchInput.value = '';
            filterNoticesBySearch('');
        }
        
        const allFilter = document.querySelector('.filter-btn[data-filter="all"]');
        if (allFilter) {
            allFilter.click();
        }
    }
});
