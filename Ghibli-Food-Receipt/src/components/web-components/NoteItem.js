// src/components/web-components/NoteItem.js (Conceptual Changes)

class NoteItem extends HTMLElement {
  _data = null; // Can be a note or a book

  // Add a new property to control action visibility
  _hideActions = false;

  static get observedAttributes() {
    return ['hide-actions']; // Observe this attribute
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'hide-actions') {
      this._hideActions = newValue !== null && newValue !== "false"; // Set to true if attribute exists and not "false"
      this.render();
    }
  }

  set note(value) { // Keep 'note' setter for backward compatibility if used elsewhere
    this._data = value;
    this.render();
  }

  set book(value) { // Add a 'book' setter
    this._data = value;
    this._hideActions = true; // By default, hide actions for books in this context
    this.render();
  }

  connectedCallback() {
    if (!this.hasAttribute('hide-actions') && this._data && this._data.role === undefined) {
      // If it looks like a book and hide-actions wasn't set, set it.
      // This logic is a bit heuristic; better to set hide-actions from NoteList.
    }
    this.render();
  }

  render() {
    if (!this._note) return; // _note now holds book-like data from ApiNotesPage

    const isBookDisplayMode = this.getAttribute('display-mode') === 'book-summary';
    
    const title = this._note.title || 'No Title';
    const bodyContent = this._note.body || this._note.description || 'No content'; // Prefer body (from note) or description (from book)
    const author = this._note.author;
    const genre = this._note.genre;
    const isRead = !!this._note.isRead; // For the action button label

    // Simplified HTML structure for this example
    this.innerHTML = `
      <style>
        .book-item-card { /* Style like recipe-book-card */
          background-color: var(--color-white); padding: 1.5rem; border-radius: 0.5rem;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
          border-left: 5px solid var(--color-light-gold);
        }
        .book-item-card h3 { font-size: 1.5rem; font-weight: 600; color: var(--color-maroon); margin-bottom: 0.5rem; font-family: var(--font-display); }
        .book-item-card .meta { font-size: 0.85rem; color: var(--color-gray); margin-bottom: 0.5rem; }
        .book-item-card p { margin-bottom: 1rem; line-height: 1.625; }
        .book-item-actions { margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--color-light-brown); display: flex; gap: 0.5rem; }
        .book-item-actions button { /* Basic button styling, use your action-btn classes if possible */
          padding: 0.5rem 1rem; border-radius: 9999px; font-weight: bold; cursor: pointer;
          border: 2px solid var(--color-gold); color: var(--color-gold); background: transparent;
          transition: all 0.2s;
        }
        .book-item-actions button:hover { background: var(--color-gold); color: var(--color-white); }
      </style>
      <div class="book-item-card">
        <h3>${title}</h3>
        ${author || genre ? `<div class="meta">${author ? `Author: ${author}` : ''}${author && genre ? ' | ' : ''}${genre ? `Genre: ${genre}` : ''}</div>` : ''}
        <p>${bodyContent}</p>
        ${isBookDisplayMode ? `
          <div class="book-item-actions">
            <button class="action-toggle-read">${isRead ? 'Read Again' : 'Mark Completed'}</button>
            {/* Add other book-specific actions if needed, e.g., a link to full details or notes */}
          </div>
        ` : `
          <div class="note-item-actions">
             <button class="action-button delete-button" aria-label="Delete Note">Delete</button>
             <button class="action-button archive-button" aria-label="Archive Note">${this._note.archived ? 'Unarchive' : 'Archive'}</button>
          </div>
        `}
      </div>
    `;

    if (isBookDisplayMode) {
      const toggleReadButton = this.querySelector('.action-toggle-read');
      if (toggleReadButton) {
        toggleReadButton.addEventListener('click', () => {
          this.dispatchEvent(new CustomEvent('archive-note', { // Re-using 'archive-note' for simplicity, detail contains isRead
            detail: { id: this._note.id, isArchived: isRead }, // isArchived here means current isRead status
            bubbles: true 
          }));
        });
      }
    } else {
      // Existing delete/archive event listeners for notes
      const deleteButton = this.querySelector('.delete-button');
      const archiveButton = this.querySelector('.archive-button');
      if(deleteButton) deleteButton.addEventListener('click', () => this.dispatchEvent(new CustomEvent('delete-note', { detail: { id: this._note.id }, bubbles: true })));
      if(archiveButton) archiveButton.addEventListener('click', () => this.dispatchEvent(new CustomEvent('archive-note', { detail: { id: this._note.id, isArchived: !!this._note.archived }, bubbles: true })));
    }
  }
}
customElements.define('note-item', NoteItem);