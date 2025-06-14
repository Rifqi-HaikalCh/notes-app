// Notes List Component
class NotesList extends HTMLElement {
    constructor() {
        super();
        this.listType = this.getAttribute('list-type');
        this.render();
        this.updateNotes();
    }

    render() {
        this.innerHTML = `
            <style>
                .notes-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 20px;
                }
                
                @media (max-width: 768px) {
                    .notes-grid {
                        grid-template-columns: 1fr;
                        gap: 15px;
                    }
                }
            </style>
            <div class="notes-grid"></div>
        `;
        
        this.notesGrid = this.querySelector('.notes-grid');
    }
    
    updateNotes() {
        const filteredNotes = this.getFilteredNotes();
        
        if (filteredNotes.length === 0) {
            this.notesGrid.innerHTML = '<div class="empty-message">Tidak ada catatan 📝</div>';
        } else {
            this.notesGrid.innerHTML = filteredNotes.map(note => `
                <note-item 
                    note-id="${note.id}"
                    note-title="${escapeHtml(note.title)}"
                    note-body="${escapeHtml(note.body)}"
                    note-date="${note.createdAt}"
                    note-archived="${note.archived}">
                </note-item>
            `).join('');
        }
    }
    
    getFilteredNotes() {
        const isArchived = this.listType === 'archived';
        return NotesState.getFilteredNotes(isArchived);
    }

    // Handle attribute changes
    static get observedAttributes() {
        return ['list-type'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'list-type') {
            this.listType = newValue;
            this.updateNotes();
        }
    }
}