// src/pages/LocalNotesPage.jsx
import React, { useState } from 'react';
import NotesAppLayout from '../components/NotesAppLayout.jsx';
import { getNotes, saveNotes } from '../utils/local-storage-service.js';

function LocalNotesPage() {
  const [notes, setNotes] = useState(getNotes());

  const onAddNote = ({ title, body }) => {
    const newNote = {
      id: `notes-${+new Date()}`,
      title,
      body,
      createdAt: new Date().toISOString(),
      archived: false,
    };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  const onDeleteNote = (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      const updatedNotes = notes.filter((note) => note.id !== id);
      setNotes(updatedNotes);
      saveNotes(updatedNotes);
    }
  };

  const onArchiveNote = (id) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, archived: !note.archived } : note
    );
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  const activeNotes = notes.filter((note) => !note.archived);
  const archivedNotes = notes.filter((note) => note.archived);

  return (
    <NotesAppLayout
      loading={false}
      activeNotes={activeNotes}
      archivedNotes={archivedNotes}
      onAddNote={onAddNote}
      onDeleteNote={onDeleteNote}
      onArchiveNote={onArchiveNote}
    />
  );
}

export default LocalNotesPage;