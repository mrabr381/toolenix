// assets/js/theme.js
document.addEventListener('DOMContentLoaded', () => {
    // Check saved theme on load
    if(localStorage.getItem('theme') === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
});

// Global function for the Navbar button
function toggleTheme() {
    const root = document.documentElement;
    if(root.getAttribute('data-theme') === 'light' || !root.getAttribute('data-theme')) {
        root.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        root.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}
