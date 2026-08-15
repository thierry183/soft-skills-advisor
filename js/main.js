// ============================================
// MAIN APPLICATION - Navigation & Utilities
// ============================================

// ============================================
// NAVIGATION - Highlight current page
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

// ============================================
// NOTIFICATION SYSTEM
// ============================================

/**
 * Display a notification message to the user
 * @param {string} message - The message to display
 * @param {string} type - 'success', 'error', or 'info'
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// LOCAL STORAGE HELPERS
// ============================================

/**
 * Save data to localStorage
 * @param {string} key - Storage key
 * @param {*} data - Data to store (will be JSON stringified)
 */
function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

/**
 * Get data from localStorage
 * @param {string} key - Storage key
 * @returns {*} - Parsed data or null
 */
function getFromStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

/**
 * Clear data from localStorage
 * @param {string} key - Storage key
 */
function clearFromStorage(key) {
    localStorage.removeItem(key);
}
// ============================================
// GO UP BUTTON - Show/Hide and Scroll
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    var goUpBtn = document.getElementById('goUpBtn');
    
    if (goUpBtn) {
        // Show button when scrolled down 300px
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                goUpBtn.classList.add('show');
            } else {
                goUpBtn.classList.remove('show');
            }
        });
        
        // Scroll to top when clicked
        goUpBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});