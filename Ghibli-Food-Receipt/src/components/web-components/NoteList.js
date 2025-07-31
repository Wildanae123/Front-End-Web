// src/components/web-components/NoteList.js (Conceptual - adapting for book display)
class NoteList extends HTMLElement {
  _notes = []; // This will receive the 'simpleBooks' array

  set notes(value) {
    this._notes = value;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <style>
        .notes-list-container { /* Changed from notes-list-grid */
          display: flex;
          flex-direction: column; /* Stack items vertically */
          gap: 1.5rem; /* Spacing between items */
        }
        /* Ensure child note-item takes appropriate width */
        ::slotted(note-item) { /* If using slot, or style note-item directly */
            /* width: 100%; */ /* Or let it be natural block width */
        }
      </style>
      <div class="notes-list-container"></div> {/* Use the new class */}
    `;

    const container = this.querySelector('.notes-list-container');
    if (!this._notes || this._notes.length === 0) {
      container.innerHTML = '<p class="notes-list-empty-message">No items to display.</p>';
      return;
    }

    this._notes.forEach(itemData => {
      const noteItemElement = document.createElement('note-item');
      noteItemElement.note = itemData;
      noteItemElement.setAttribute('display-mode', 'book-summary'); 
      container.appendChild(noteItemElement);
    });
  }
}
customElements.define('note-list', NoteList);