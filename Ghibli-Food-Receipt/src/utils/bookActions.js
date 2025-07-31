// src/utils/bookActions.js

/**
 * Adds a new book to the list.
 * @param {Array} books - The current array of books.
 * @param {Object} newBookData - The new book to add, without an ID.
 * @returns {Array} The new array of books.
 */
export const addBook = (books, newBookData) => {
  const newBook = {
    ...newBookData,
    id: +new Date(), // Simple unique ID using timestamp
    isRead: false,
    review: '',
  };
  return [...books, newBook];
};

/**
 * Edits an existing book in the list.
 * @param {Array} books - The current array of books.
 * @param {number} bookId - The ID of the book to edit.
 * @param {Object} updatedData - The updated data for the book.
 * @returns {Array} The new array of books with the edited book.
 */
export const editingBook = (books, bookId, updatedData) => {
  return books.map((book) =>
    book.id === bookId ? { ...book, ...updatedData } : book
  );
};

/**
 * Deletes a book from the list.
 * @param {Array} books - The current array of books.
 * @param {number} bookId - The ID of the book to delete.
 * @returns {Array} The new array of books without the deleted book.
 */
export const deleteBook = (books, bookId) => {
  return books.filter((book) => book.id !== bookId);
};

/**
 * Searches for books by title.
 * @param {Array} books - The array of books to search.
 * @param {string} query - The search query.
 * @returns {Array} The filtered array of books.
 */
export const searchBook = (books, query) => {
  if (!query) {
    return books; // Return all books if query is empty
  }
  return books.filter((book) =>
    book.title.toLowerCase().includes(query.toLowerCase())
  );
};

/**
 * Marks a book as "read".
 * @param {Array} books - The current array of books.
 * @param {number} bookId - The ID of the book to mark as read.
 * @returns {Array} The new array of books.
 */
export const doneReadAction = (books, bookId) => {
  return books.map((book) =>
    book.id === bookId ? { ...book, isRead: true } : book
  );
};

/**
 * Marks a book as "unread" (to read again).
 * @param {Array} books - The current array of books.
 * @param {number} bookId - The ID of the book to mark as unread.
 * @returns {Array} The new array of books.
 */
export const readAgainAction = (books, bookId) => {
  return books.map((book) =>
    book.id === bookId ? { ...book, isRead: false } : book
  );
};