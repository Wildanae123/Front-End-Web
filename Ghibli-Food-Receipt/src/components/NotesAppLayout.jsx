// src/components/NotesAppLayout.jsx
import React, { useEffect, useRef } from 'react';
import Header from './Header.jsx';
import Footer from './Footer';
import './web-components/NoteList.js'; // Ensure these are correctly imported and work
import './web-components/NoteItem.js';
import './web-components/LoadingIndicator.js';
import NoteInput from './NoteInput.jsx';

function NotesAppLayout({
  loading,
  activeNotes,
  archivedNotes,
  onAddNote,
  onDeleteNote,
  onArchiveNote,
  // New props for configurability:
  pageTitle = "Notes", // A general title for the page content area
  showNoteInput = true, // Whether to show the <NoteInput /> component
  activeNotesTitle = "Active Notes", // Title for the active notes section
  showArchivedNotesSection = true, // Whether to show the archived notes section at all
  archivedNotesTitle = "Archived Notes", // Title for the archived notes section
  isSingleNoteView = false, // Special flag for single note, could influence web component behavior if designed for it
}) {
  const activeNotesRef = useRef(null);
  const archivedNotesRef = useRef(null);

  useEffect(() => {
    // Event listeners should only be added if the handlers are provided
    const handleDelete = onDeleteNote ? (event) => onDeleteNote(event.detail.id) : null;
    const handleArchive = onArchiveNote ? (event) => onArchiveNote(event.detail.id, event.detail.isArchived) : null;

    const activeEl = activeNotesRef.current;
    const archivedEl = archivedNotesRef.current;
    
    if (handleDelete) {
      activeEl?.addEventListener('delete-note', handleDelete);
      archivedEl?.addEventListener('delete-note', handleDelete);
    }
    if (handleArchive) {
      activeEl?.addEventListener('archive-note', handleArchive);
      archivedEl?.addEventListener('archive-note', handleArchive);
    }
    
    return () => {
      if (handleDelete) {
        activeEl?.removeEventListener('delete-note', handleDelete);
        archivedEl?.removeEventListener('delete-note', handleDelete);
      }
      if (handleArchive) {
        activeEl?.removeEventListener('archive-note', handleArchive);
        archivedEl?.removeEventListener('archive-note', handleArchive);
      }
    };
  }, [onDeleteNote, onArchiveNote]); // Dependencies remain the same

  useEffect(() => {
    if (activeNotesRef.current) {
      activeNotesRef.current.notes = activeNotes;
    }
    if (archivedNotesRef.current && showArchivedNotesSection) { // Only update if section is shown
      archivedNotesRef.current.notes = archivedNotes;
    }
  }, [activeNotes, archivedNotes, showArchivedNotesSection]);

  return (
    <div className="notes-app"> {/* Main page wrapper */}
      <Header />
      <main className="notes-app-main">
        {pageTitle && <h1 className="page-main-title">{pageTitle}</h1>} {/* Optional overall title */}
        
        {showNoteInput && onAddNote && <NoteInput onAddNote={onAddNote} />}
        
        {loading ? (
          <loading-indicator></loading-indicator>
        ) : (
          <>
            <section>
              {/* Only show title if there are notes or if it's not a single note view where title might be redundant */}
              {(activeNotes && activeNotes.length > 0 || !isSingleNoteView) && <h2>{activeNotesTitle}</h2>}
              <note-list
                ref={activeNotesRef}
                data-is-single-note={isSingleNoteView} /* Pass hint to web component */
              ></note-list>
              {activeNotes && activeNotes.length === 0 && !isSingleNoteView && (
                 <p className="notes-list-empty-message">No active notes yet.</p>
              )}
            </section>

            {showArchivedNotesSection && (
              <section>
                <h2>{archivedNotesTitle}</h2>
                <note-list ref={archivedNotesRef}></note-list>
                {archivedNotes && archivedNotes.length === 0 && (
                  <p className="notes-list-empty-message">No archived notes.</p>
                )}
              </section>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default NotesAppLayout;