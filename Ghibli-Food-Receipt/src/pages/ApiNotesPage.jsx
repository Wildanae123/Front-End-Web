// src/pages/ApiNotesPage.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
// REMOVE: import Header from '../components/Header.jsx';
// REMOVE: import Footer from '../components/Footer.jsx';
import * as api from '../utils/api-service.js';
import toast from 'react-hot-toast';
// Web components
import '../components/web-components/NoteList.js';
import '../components/web-components/NoteItem.js';
import '../components/web-components/LoadingIndicator.js';
// Icons for actions
import { CheckmarkCircle02Icon, ViewIcon } from '@hugeicons/core-free-icons';


// SimpleNoteEditor for Book-Specific Notes mode (recipeId is present) - REMAINS THE SAME
const SimpleNoteEditor = ({ initialNote = '', onSave, onCancel }) => {
  // ... (implementation as before) ...
  const [noteText, setNoteText] = useState(initialNote);
  useEffect(() => { setNoteText(initialNote || ''); }, [initialNote]);
  const handleSaveClick = () => onSave(noteText);
  return (
    <div className="note-editor-container" style={{ padding: '20px', maxWidth: '700px', margin: '20px auto', background: 'var(--color-white)', borderRadius:'8px', boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0,0,0,0.1))' }}>
      <textarea
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        rows={15}
        placeholder="Write your culinary notes here..."
        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--color-gold)', boxSizing:'border-box', marginBottom:'15px', background: 'var(--color-cream)', color: 'var(--color-dark-brown)', fontSize:'1rem' }}
      />
      <div style={{display:'flex', justifyContent:'flex-end', gap:'10px'}}>
        <button onClick={onCancel} className="auth-main-button" style={{background: 'var(--color-gray)', minWidth: '100px'}}>Back</button>
        <button onClick={handleSaveClick} className="auth-main-button auth-submit-button" style={{minWidth: '120px'}}>Save Notes</button>
      </div>
    </div>
  );
};

// Form for creating "simple books" (title, author, genre, description) - REMAINS THE SAME
const SimpleBookCreateFormOnly = ({ onBookCreated }) => {
  // ... (implementation as before, with fields: title, author, genre, description) ...
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const availableGenres = ['Fantasy', 'Adventure', 'Slice of Life', 'Coming-of-Age', 'Drama', 'Mystery', 'Food', 'Cookbook', 'Simple Note', 'General'];

  const resetForm = () => { setTitle(''); setAuthor(''); setGenre(''); setDescription(''); setErrors({}); };
  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required.';
    else if (title.trim().length < 2) newErrors.title = 'Title must be at least 2 characters.';
    if (!author.trim()) newErrors.author = 'Author is required.';
    if (!genre) newErrors.genre = 'Genre is required.';
    if (!description.trim()) newErrors.description = 'Description is required.';
    else if (description.trim().length > 500) newErrors.description = 'Description cannot exceed 500 characters.';
    return newErrors;
  };

  const handleCreateBook = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) { setErrors(formErrors); return; }
    setErrors({}); setIsSubmitting(true);
    const bookData = { title, author, genre, description, isbn: "", publishedDate: "", coverImageUrl: null };
    try {
      const createdBookResponse = await api.createBook(bookData);
      const newBook = createdBookResponse.data;
      toast.success(`"${newBook.title}" created!`);
      await api.addBookToLibrary(newBook.id, { status: 'unread' });
      toast.success(`"${newBook.title}" added to Recipe Collections.`);
      resetForm();
      if (onBookCreated) onBookCreated();
    } catch (error) {
      let errorMessage = `Failed to create book.`;
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage += ` Server says: ${error.response.data.message}`;
      } else if(error.message) {
        errorMessage += ` Error: ${error.message}`;
      }
      toast.error(errorMessage);
      console.error("Book creation error details:", error.response?.data || error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="note-input" style={{maxWidth: '600px', margin: '0 auto 2rem auto', marginBottom: '3rem' }}>
      <h2>Create Simple Book Entry</h2>
      <form onSubmit={handleCreateBook}>
        <input type="text" placeholder="Book Title (Required)" value={title} onChange={(e) => { setTitle(e.target.value); if(errors.title) setErrors(p=>({...p,title:null})); }} required className={errors.title ? 'input-error' : ''} />
        {errors.title && <span className="error-message" style={{marginBottom: '1rem', display:'block'}}>{errors.title}</span>}
        <input type="text" placeholder="Author (Required)" value={author} onChange={(e) => { setAuthor(e.target.value); if(errors.author) setErrors(p=>({...p,author:null})); }} required className={errors.author ? 'input-error' : ''} />
        {errors.author && <span className="error-message" style={{marginBottom: '1rem', display:'block'}}>{errors.author}</span>}
        <select value={genre} onChange={(e) => { setGenre(e.target.value); if(errors.genre) setErrors(p=>({...p,genre:null})); }} required className={errors.genre ? 'input-error' : ''}>
          <option value="" disabled>Select Genre (Required)</option>
          {availableGenres.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
        {errors.genre && <span className="error-message" style={{marginBottom: '1rem', display:'block'}}>{errors.genre}</span>}
        <textarea placeholder="Description (Required)" value={description} onChange={(e) => { setDescription(e.target.value); if(errors.description) setErrors(p=>({...p,description:null})); }} rows="5" required className={errors.description ? 'input-error' : ''}></textarea>
        {errors.description && <span className="error-message" style={{marginBottom: '1rem', display:'block'}}>{errors.description}</span>}
        <button type="submit" className="note-submit-button" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create Simple Book'}
        </button>
      </form>
    </div>
  );
};


function ApiNotesPage() {
  const { recipeId } = useParams();
  const navigate = useNavigate();

  const [allSimpleBooks, setAllSimpleBooks] = useState([]);
  const [unreadSimpleBooks, setUnreadSimpleBooks] = useState([]);
  const [readSimpleBooks, setReadSimpleBooks] = useState([]);
  const [simpleBooksLoading, setSimpleBooksLoading] = useState(true);

  const [bookDetails, setBookDetails] = useState(null);
  const [bookNotesText, setBookNotesText] = useState('');
  const [bookNotesLoading, setBookNotesLoading] = useState(true);

  const [pageLoading, setPageLoading] = useState(true);

  const unreadNoteListRef = useRef(null);
  const readNoteListRef = useRef(null);

  const fetchBookAndBookNotes = useCallback(async () => {
    if (!recipeId) return;
    setBookNotesLoading(true); setPageLoading(true);
    try {
      const bookInfo = await api.getBookById(recipeId);
      setBookDetails(bookInfo.data);
      const userLibrary = await api.getUserLibrary();
      const libraryEntry = userLibrary.data.find(item => item.bookId === recipeId || item.book?.id === recipeId);
      setBookNotesText(libraryEntry?.notes || '');
    } catch (error) {
      toast.error(`Failed to load recipe notes: ${error.message}`); setBookDetails(null);
    } finally {
      setBookNotesLoading(false); setPageLoading(false);
    }
  }, [recipeId]);

  const handleSaveBookRecipeNote = async (newNotesText) => {
    if (!recipeId) return;
    try {
      await api.updateBookInLibrary(recipeId, { notes: newNotesText });
      setBookNotesText(newNotesText); toast.success('Recipe notes saved!');
    } catch (error) {
      toast.error(`Failed to save recipe notes: ${error.message}`);
    }
  };

  const fetchAndCategorizeSimpleBooks = useCallback(async () => {
    setSimpleBooksLoading(true); setPageLoading(true);
    try {
      const booksResponse = await api.getAllBooks();
      const libraryResponse = await api.getUserLibrary();
      const allBooks = booksResponse.data || [];
      const libraryItems = libraryResponse.data || [];
      const enrichedBooks = allBooks.map(book => {
        const libraryEntry = libraryItems.find(item => item.bookId === book.id || item.book?.id === book.id);
        return { ...book, isRead: libraryEntry ? libraryEntry.status === "read" : false, };
      });
      setAllSimpleBooks(enrichedBooks);
      setUnreadSimpleBooks(enrichedBooks.filter(book => !book.isRead));
      setReadSimpleBooks(enrichedBooks.filter(book => book.isRead));
    } catch (error) {
      toast.error("Failed to fetch books: " + error.message);
      setAllSimpleBooks([]); setUnreadSimpleBooks([]); setReadSimpleBooks([]);
    } finally {
      setSimpleBooksLoading(false); setPageLoading(false);
    }
  }, []);
  
  const handleNewSimpleBookCreated = () => {
    fetchAndCategorizeSimpleBooks();
  };

  const handleMarkSimpleBookStatus = async (bookId, currentIsRead) => {
    const newStatus = currentIsRead ? 'unread' : 'read';
    try {
        await api.updateBookInLibrary(bookId, { status: newStatus });
        toast.success(`Book marked as ${newStatus === 'read' ? 'completed' : 'collection'}.`);
        fetchAndCategorizeSimpleBooks();
    } catch (error) {
        toast.error(`Failed to update book status: ${error.message}`);
    }
  };

  useEffect(() => {
    setPageLoading(true);
    if (recipeId) {
      fetchBookAndBookNotes();
    } else {
      fetchAndCategorizeSimpleBooks();
    }
  }, [recipeId, fetchBookAndBookNotes, fetchAndCategorizeSimpleBooks]);

  useEffect(() => {
    if (!recipeId) { 
      const mapBookToNoteItemData = (book) => ({
        id: book.id || book._id, title: book.title, body: book.description, 
        createdAt: book.createdAt || book.publishedDate || new Date().toISOString(),
        archived: book.isRead, isRead: book.isRead, author: book.author,
        genre: book.genre, displayMode: 'book-summary', 
      });
      if (unreadNoteListRef.current) unreadNoteListRef.current.notes = unreadSimpleBooks.map(mapBookToNoteItemData);
      if (readNoteListRef.current) readNoteListRef.current.notes = readSimpleBooks.map(mapBookToNoteItemData);
    }
  }, [recipeId, unreadSimpleBooks, readSimpleBooks]);

  useEffect(() => {
    if (recipeId) return; 
    const handleToggleReadEvent = (event) => { 
        const { id, isArchived: currentIsRead } = event.detail; 
        handleMarkSimpleBookStatus(id, currentIsRead);
    };
    const handleDeleteBookEvent = async (event) => {
        const bookIdToDelete = event.detail.id;
        toast((t) => (
          <span style={{textAlign: 'center'}}> Delete this book permanently?
            <div style={{marginTop: '10px'}}>
              <button style={{marginRight: '10px', padding: '5px 10px', background:'var(--color-red)', color:'white', border:'none', borderRadius:'3px'}}
                onClick={async () => {
                  toast.dismiss(t.id);
                  try {
                      await api.deleteBookApi(bookIdToDelete);
                      toast.success("Book deleted successfully.");
                      await api.removeBookFromLibrary(bookIdToDelete).catch(() => {});
                      fetchAndCategorizeSimpleBooks();
                  } catch (error) { toast.error(`Failed to delete book: ${error.message}`); }
                }}
              > Yes, Delete </button>
              <button style={{padding: '5px 10px', background:'var(--color-light-gray)', border:'none', borderRadius:'3px'}}
                onClick={() => toast.dismiss(t.id)}
              > Cancel </button>
            </div>
          </span> ), { duration: Infinity });
    };
    const unreadEl = unreadNoteListRef.current; const readEl = readNoteListRef.current;
    unreadEl?.addEventListener('delete-note', handleDeleteBookEvent); 
    unreadEl?.addEventListener('archive-note', handleToggleReadEvent); 
    readEl?.addEventListener('delete-note', handleDeleteBookEvent);
    readEl?.addEventListener('archive-note', handleToggleReadEvent);
    return () => {
        unreadEl?.removeEventListener('delete-note', handleDeleteBookEvent);
        unreadEl?.removeEventListener('archive-note', handleToggleReadEvent);
        readEl?.removeEventListener('delete-note', handleDeleteBookEvent);
        readEl?.removeEventListener('archive-note', handleToggleReadEvent);
    };
  }, [recipeId, handleMarkSimpleBookStatus, fetchAndCategorizeSimpleBooks]); // Added deps

  // --- Render logic based on mode ---
  // The outer <div className="notes-app"> and Header/Footer are removed from here
  // as they are provided by App.jsx through the <Outlet />

  if (pageLoading) {
    return (
      <main className="notes-app-main"> {/* Keep main wrapper */}
        <h1 className="page-main-title">Loading...</h1>
        <div style={{display: 'flex', justifyContent: 'center', padding: '50px'}}><loading-indicator></loading-indicator></div>
      </main>
    );
  }

  if (recipeId) {
    if (!bookDetails && !bookNotesLoading) { 
      return (
        <main className="notes-app-main">
          <h1 className="page-main-title">Error</h1>
          <p className="empty-list-message">Recipe details not found for ID: {recipeId}. <Link to="/ghibli-food-bookshelf">Return to Bookshelf</Link></p>
        </main>
      );
    }
    return (
      <main className="notes-app-main">
        <h1 className="page-main-title">Notes for: {bookDetails?.title || 'Recipe'}</h1>
        <SimpleNoteEditor
          initialNote={bookNotesText}
          onSave={handleSaveBookRecipeNote}
          onCancel={() => navigate(-1)}
        />
      </main>
    );
  } else { // General Mode: Create "Simple Book" and Categorized Lists
    return (
      <main className="notes-app-main">
        <h1 className="page-main-title">Create & Manage Simple Books</h1>
        <SimpleBookCreateFormOnly onBookCreated={handleNewSimpleBookCreated} />
        
        {simpleBooksLoading ? (
          <div style={{display: 'flex', justifyContent: 'center', padding: '50px'}}><loading-indicator></loading-indicator></div>
        ) : (
          <>
            <section className="books-category" style={{marginTop: '3rem'}}>
              <div className="books-category-list">
                <div className="books-category-title">
                  <h4>RECIPE COLLECTIONS (Simple Books)</h4>
                  <div className="books-count unread-count">{unreadSimpleBooks.length}</div>
                </div>
                {unreadSimpleBooks.length > 0 ? (
                  <note-list ref={unreadNoteListRef}></note-list>
                ) : (
                  <p className="empty-list-message">No simple books in your collection yet.</p>
                )}
              </div>
            </section>

            <section className="books-category" style={{marginTop: '2rem'}}>
              <div className="books-category-list">
                <div className="books-category-title">
                  <h4>COMPLETED RECIPES (Simple Books)</h4>
                  <div className="books-count read-count">{readSimpleBooks.length}</div>
                </div>
                {readSimpleBooks.length > 0 ? (
                  <note-list ref={readNoteListRef}></note-list>
                ) : (
                  <p className="empty-list-message">No completed simple books yet.</p>
                )}
              </div>
            </section>
          </>
        )}
      </main>
    );
  }
}

export default ApiNotesPage;