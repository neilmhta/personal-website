// Function to toggle dark mode
function toggleDarkMode() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    if (isDarkMode) {
        // If in dark mode, switch to light mode
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light'); // Store user preference
    } else {
        // If in light mode, switch to dark mode
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark'); // Store user preference
    }
}

// Check if user has preferred theme stored in localStorage
const userPreferredTheme = localStorage.getItem('theme');

// Apply user preferred theme or default based on system preference
if (userPreferredTheme === 'dark') {
    document.body.classList.add('dark-mode');
} else if (userPreferredTheme === 'light') {
    document.body.classList.remove('dark-mode');
} else {
    // If no user preference, follow system preference
    const isSystemDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isSystemDarkMode) {
        document.body.classList.add('dark-mode');
    }
}

// Add event listener to toggle button
document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);
