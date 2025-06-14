// Main App Initialization

// Register all custom elements
customElements.define('app-header', AppHeader);
customElements.define('note-form', NoteForm);
customElements.define('notes-list', NotesList);
customElements.define('note-item', NoteItem);

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('📝 Aplikasi Catatan berhasil dimuat!');
    
    // Optional: Add any additional initialization logic here
    initializeApp();
});

// App initialization function
function initializeApp() {
    // Set up any global event listeners or configurations
    
    // Example: Handle keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('app-header .search-input');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Escape to clear search
        if (e.key === 'Escape') {
            const searchInput = document.querySelector('app-header .search-input');
            if (searchInput && searchInput === document.activeElement) {
                searchInput.value = '';
                NotesState.setSearchQuery('');
                searchInput.blur();
            }
        }
    });

    // Add loading animation or splash screen removal
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
}

// Service Worker registration (optional for PWA)
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', function() {

//     });
// }