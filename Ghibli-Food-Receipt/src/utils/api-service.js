// src/utils/api-service.js
const BASE_URL = 'http://localhost:5000/api/v1';

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  // Assuming cookies are handled by the browser automatically for HttpOnly
  // If using token-based auth, you'd add Authorization header here.

  const config = {
    method: 'GET',
    ...options,
    headers,
    credentials: 'include',
  };

  if (options.body && typeof options.body === 'object') {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { message: response.statusText || `HTTP error!` };
      }
      const error = new Error(
        errorData.message || `HTTP error! status: ${response.status}`,
      );
      error.status = response.status; // Attach status to the error object
      throw error;
    }
    if (
      response.status === 204 ||
      response.headers.get('content-length') === '0'
    ) {
      return null;
    }
    return response.json();
  } catch (error) {
    // Conditional logging: Don't log 401s from here as they might be expected (e.g., initial session check)
    // Let the calling function decide how to handle logging for specific statuses like 401.
    if (error.status !== 401 && error.status !== 403) {
      // Also not logging 403s by default from here
      console.error(
        'API Service Error:',
        error.message,
        'Status:',
        error.status,
      );
    }
    throw error; // Re-throw the error (now with status property)
  }
}

// --- Auth Routes ---
export const loginUser = (credentials) =>
  request('/auth/login', { method: 'POST', body: credentials });
export const registerUser = (userData) =>
  request('/auth/register', { method: 'POST', body: userData });
export const guestLoginUser = () =>
  request('/auth/guest/login', { method: 'POST' });
export const logoutUser = () => request('/auth/logout', { method: 'POST' });
export const getMe = () => request('/users/me', { method: 'GET' });

// --- Book Routes ---
export const getAllBooks = (search = '') =>
  request(`/books${search ? `?search=${encodeURIComponent(search)}` : ''}`);
export const createBook = (bookData) =>
  request('/books', { method: 'POST', body: bookData });
export const getBookById = (id) => request(`/books/${id}`);
export const updateBook = (id, bookData) =>
  request(`/books/${id}`, { method: 'PUT', body: bookData });
export const deleteBookApi = (id) =>
  request(`/books/${id}`, { method: 'DELETE' });

// --- User Library Routes ---
export const getUserLibrary = () => request('/library');
export const addBookToLibrary = (bookId, libraryInfo = { status: 'unread' }) =>
  request(`/library/${bookId}`, { method: 'POST', body: libraryInfo });
export const updateBookInLibrary = (bookId, libraryInfo) =>
  request(`/library/${bookId}`, { method: 'PUT', body: libraryInfo });
export const removeBookFromLibrary = (bookId) =>
  request(`/library/${bookId}`, { method: 'DELETE' });

// src/utils/api-service.js
// ... (existing functions) ...

// --- General Purpose Notes API Routes ---
export const fetchActiveGeneralNotes = () => request('/notes?archived=false'); // e.g., GET /api/v1/notes?archived=false
export const fetchArchivedGeneralNotes = () => request('/notes?archived=true'); // e.g., GET /api/v1/notes?archived=true
export const addGeneralNote = (noteData) => request('/notes', { method: 'POST', body: noteData });
export const deleteGeneralNote = (noteId) => request(`/notes/${noteId}`, { method: 'DELETE' });
export const archiveGeneralNote = (noteId) => request(`/notes/${noteId}`, { method: 'PATCH', body: { archived: true } });
export const unarchiveGeneralNote = (noteId) => request(`/notes/${noteId}`, { method: 'PATCH', body: { archived: false } });