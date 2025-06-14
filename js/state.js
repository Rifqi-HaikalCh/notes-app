// Global state management

// State aplikasi
let notes = [...getInitialData()];
let searchQuery = '';

// State management functions
const NotesState = {
    // Get all notes
    getAllNotes() {
        return notes;
    },

    // Get filtered notes based on archive status and search query
    getFilteredNotes(isArchived = false) {
        return notes.filter(note => {
            const matchesArchiveStatus = note.archived === isArchived;
            const matchesSearch = searchQuery === '' || 
                note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                note.body.toLowerCase().includes(searchQuery.toLowerCase());
            
            return matchesArchiveStatus && matchesSearch;
        });
    },

    // Add new note
    addNote(noteData) {
        const newNote = {
            id: generateId(),
            title: noteData.title.trim(),
            body: noteData.body.trim(),
            createdAt: new Date().toISOString(),
            archived: false
        };
        
        notes.push(newNote);
        this.notifyStateChange();
    },

    // Delete note by ID
    deleteNote(id) {
        notes = notes.filter(note => note.id !== id);
        this.notifyStateChange();
    },

    // Toggle archive status of a note
    toggleArchive(id) {
        notes = notes.map(note => 
            note.id === id 
                ? { ...note, archived: !note.archived }
                : note
        );
        this.notifyStateChange();
    },

    // Update search query
    setSearchQuery(query) {
        searchQuery = query;
        this.notifyStateChange();
    },

    // Get current search query
    getSearchQuery() {
        return searchQuery;
    },

    // Notify all components about state change
    notifyStateChange() {
        // Update notes lists
        const activeNotesList = document.getElementById('active-notes');
        const archivedNotesList = document.getElementById('archived-notes');
        
        if (activeNotesList) activeNotesList.updateNotes();
        if (archivedNotesList) archivedNotesList.updateNotes();
    }
};