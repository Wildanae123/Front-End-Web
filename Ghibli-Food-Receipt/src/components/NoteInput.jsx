// src/components/NoteInput.jsx
import React, { useState } from 'react';

const MAX_TITLE_LENGTH = 50;

function NoteInput({ onAddNote }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [titleCharCount, setTitleCharCount] = useState(MAX_TITLE_LENGTH);

  const handleTitleChange = (event) => {
    const newTitle = event.target.value;
    if (newTitle.length <= MAX_TITLE_LENGTH) {
      setTitle(newTitle);
      setTitleCharCount(MAX_TITLE_LENGTH - newTitle.length);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim() || !body.trim()) {
        alert("Title and body cannot be empty!");
        return;
    }
    onAddNote({ title, body });
    setTitle('');
    setBody('');
    setTitleCharCount(MAX_TITLE_LENGTH);
  };

  return (
    <div className="note-input">
      <h2>Create a new Note</h2>
      <form onSubmit={handleSubmit}>
        <p className="note-input-title-char-limit">
          Characters remaining: {titleCharCount}
        </p>
        <input
          type="text"
          placeholder="Note title..."
          value={title}
          onChange={handleTitleChange}
          required
        />
        <textarea
          placeholder="Write your note here..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows="5"
          required
        ></textarea>
        <button type="submit" className="note-submit-button">Add Note</button>
      </form>
    </div>
  );
}

export default NoteInput;