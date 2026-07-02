// assets/js/main.js

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSearch();
    initSmoothScroll();
});

/**
 * Navigation & Mobile Menu Logic
 */
function initNavigation() {
    // For future mobile hamburger menu implementation
    const nav = document.querySelector('.navbar');
    let lastScroll = 0;

    // Sticky Navbar shadow effect on scroll
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            nav.style.boxShadow = 'var(--shadow-soft)';
            nav.style.background = 'var(--nav-bg)';
        } else {
            nav.style.boxShadow = 'none';
        }
        lastScroll = currentScroll;
    }, { passive: true });
}

/**
 * Global Search Logic
 */
function initSearch() {
    const searchInputs = document.querySelectorAll('input[type="text"][placeholder*="Search"]');
    
    searchInputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = e.target.value.trim().toLowerCase();
                if (query) {
                    // In a production static site, this routes to a dedicated search page 
                    // or filters the DOM live. We will route to a central search handler.
                    window.location.href = `/search.html?q=${encodeURIComponent(query)}`;
                }
            }
        });
    });
}

/**
 * Smooth Scrolling for Anchor Links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Reusable Toast Notification System (For Tool Interactions)
 * Exposed globally so tool-specific scripts can call it.
 */
window.showToast = function(message, type = 'success') {
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = `toast-notification glass toast-${type}`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    
    toast.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem; padding: 1rem 1.5rem;">
            <span>${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
            <span style="font-weight: 500;">${message}</span>
        </div>
    `;

    // Base styles for the toast
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: '9999',
        transform: 'translateY(100px)',
        opacity: '0',
        transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    });

    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
    });

    // Animate out after 3 seconds
    setTimeout(() => {
        toast.style.transform = 'translateY(100px)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};
