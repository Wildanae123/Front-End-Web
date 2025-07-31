// src/components/AddRecipeModal.jsx
import React, { useState, useEffect, useRef } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Cancel01Icon,
  CloudUploadIcon,
  StarIcon,
  Delete01Icon,
} from '@hugeicons/core-free-icons';

function AddRecipeModal({
  show,
  onClose,
  onAddRecipe,
  onEditRecipe,
  editingBook,
  authors = [],
}) {
  // State for each form field
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  const [isbn, setIsbn] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [bookCover, setBookCover] = useState(null);
  const [bookCoverPreview, setBookCoverPreview] = useState(null);
  const [isRead, setIsRead] = useState(false);
  const [review, setReview] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const fileInputRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const genres = [
    'Fantasy',
    'Adventure',
    'Slice of Life',
    'Coming-of-Age',
    'Drama',
    'Mystery',
  ];

  useEffect(() => {
    if (show) {
      setErrors({});
      setIsSubmitting(false);
      if (editingBook) {
        setTitle(editingBook.title || '');
        setAuthor(editingBook.author || '');
        setIsbn(editingBook.isbn || '');
        setGenre(editingBook.genre || '');
        setDescription(editingBook.description || '');
        setBookCover(editingBook.bookCover || null);
        setBookCoverPreview(editingBook.bookCover || null);
        setIsRead(editingBook.isRead || false);
        setReview(String(editingBook.review || ''));

        if (editingBook.publishedDate) {
          if (editingBook.publishedDate.includes('/')) {
            // DD/MM/YYYY
            const parts = editingBook.publishedDate.split('/');
            if (parts.length === 3) {
              const formattedDate = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
              setPublishedDate(formattedDate);
            } else {
              setPublishedDate('');
            }
          } else if (editingBook.publishedDate.includes('-')) {
            // YYYY-MM-DD or other ISO format
            // Check if it's a valid date string that can be parsed
            const dateObj = new Date(editingBook.publishedDate);
            if (!isNaN(dateObj.getTime())) {
              // Format to YYYY-MM-DD
              const year = dateObj.getFullYear();
              const month = String(dateObj.getMonth() + 1).padStart(2, '0');
              const day = String(dateObj.getDate()).padStart(2, '0');
              setPublishedDate(`${year}-${month}-${day}`);
            } else {
              setPublishedDate(''); // Set to empty if not a recognizable valid date
            }
          } else {
            setPublishedDate(''); // Or handle as an error/default
          }
        } else {
          setPublishedDate('');
        }
      } else {
        setTitle('');
        setAuthor('');
        setIsbn('');
        setGenre('');
        setDescription('');
        setPublishedDate('');
        setBookCover(null);
        setBookCoverPreview(null);
        setIsRead(false);
        setReview('');
      }
    }
  }, [editingBook, show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    let finalPublishedDate = '';
    if (publishedDate) {
      // publishedDate is YYYY-MM-DD from input
      const parts = publishedDate.split('-'); // [YYYY, MM, DD]
      if (parts.length === 3) {
        finalPublishedDate = `${parts[2]}/${parts[1]}/${parts[0]}`; // DD/MM/YYYY
      }
    }

    const recipeData = {
      title,
      author,
      isbn,
      genre,
      description,
      publishedDate: finalPublishedDate,
      bookCover,
      isRead,
      review: isRead ? review || '' : '',
    };

    try {
      if (editingBook) {
        await onEditRecipe(editingBook.id || editingBook._id, recipeData); // Await the async call
        // Success toast is handled by GhibliFoodBookshelf
      } else {
        await onAddRecipe(recipeData); // Await the async call
        // Success toast is handled by GhibliFoodBookshelf
      }
      // onClose(); // Optionally close modal on success, GhibliFoodBookshelf already does this.
    } catch (error) {
      // Error toast is handled by GhibliFoodBookshelf
      // We just need to stop the loading state here
      console.error('Submission failed in modal:', error); // Modal can log too
    } finally {
      setIsSubmitting(false); // Stop loading regardless of success/failure
    }
  };

  if (!show) {
    return null;
  }

  const handleAuthorChange = (e) => {
    const value = e.target.value;
    setAuthor(value);
    if (errors.author) setErrors((prev) => ({ ...prev, author: undefined }));

    if (value.length > 0) {
      const filteredSuggestions = authors.filter((name) =>
        name.toLowerCase().includes(value.toLowerCase()),
      );
      setSuggestions(filteredSuggestions);
      setIsSuggestionsVisible(true);
    } else {
      setSuggestions([]);
      setIsSuggestionsVisible(false);
    }
  };

  const handleSuggestionClick = (name) => {
    setAuthor(name);
    setSuggestions([]);
    setIsSuggestionsVisible(false);
  };

  const isSubmitButtonDisabled =
    !title.trim() || !author.trim() || !genre || isSubmitting;

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    const newErrors = { ...errors };
    delete newErrors.bookCover;
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        newErrors.bookCover = 'File is too large! Maximum size is 10MB.';
        setErrors(newErrors);
        e.target.value = null;
        return;
      }
      if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
        newErrors.bookCover =
          'Invalid file type! Only JPG, PNG, GIF are allowed.';
        setErrors(newErrors);
        e.target.value = null;
        return;
      }
      setErrors(newErrors);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBookCover(reader.result);
        setBookCoverPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required.';
    else if (title.trim().length < 3)
      newErrors.title = 'Title must be at least 3 characters long.';
    if (!author.trim()) newErrors.author = 'Author is required.';
    if (isbn && !/^\d+([-]?\d+)*$/.test(isbn))
      newErrors.isbn = 'ISBN must only contain numbers and hyphens.'; // Allow hyphens
    if (!genre) newErrors.genre = 'Please select a genre.';
    if (description.trim().length > 300)
      newErrors.description = `Description cannot exceed 300 characters. (${description.trim().length}/300)`;
    if (publishedDate) {
      const minDate = new Date('1900-01-01'); // Adjusted min date slightly
      const selectedUserDate = new Date(publishedDate); // YYYY-MM-DD
      if (selectedUserDate < minDate)
        newErrors.publishedDate = 'Date cannot be earlier than 01/01/1900.';
      if (selectedUserDate > new Date())
        newErrors.publishedDate = 'Date cannot be in the future.';
    }
    return newErrors;
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">
            {editingBook ? 'Edit Recipe Book' : 'Add New Recipe'}
          </h2>
          <button
            onClick={onClose}
            className="modal-close-button"
            disabled={isSubmitting}
          >
            <HugeiconsIcon icon={Cancel01Icon} size={24} strokeWidth={1.5} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form-container">
          <div className="modal-scroll-wrapper">
            {/* Title */}
            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                type="text"
                id="title"
                value={title}
                className={errors.title ? 'input-error' : ''}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title)
                    setErrors((prev) => ({ ...prev, title: undefined }));
                }}
                placeholder="e.g., Kiki's Fluffy Pancakes"
                required
              />
              {errors.title && (
                <span className="error-message">{errors.title}</span>
              )}
            </div>

            {/* Author (Text Input) */}
            <div className="form-group author-combobox">
              <label htmlFor="author">Author *</label>
              <input
                type="text"
                id="author"
                value={author}
                className={errors.author ? 'input-error' : ''}
                onChange={handleAuthorChange}
                onFocus={() =>
                  author.length > 0 && setIsSuggestionsVisible(true)
                }
                onBlur={() =>
                  setTimeout(() => setIsSuggestionsVisible(false), 150)
                }
                placeholder="e.g., Ursula"
                required
                autoComplete="off"
              />
              {isSuggestionsVisible && suggestions.length > 0 && (
                <ul className="suggestions">
                  {suggestions.map((name) => (
                    <li
                      key={name}
                      className="suggestion-item"
                      onMouseDown={() => handleSuggestionClick(name)}
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              )}
              {errors.author && (
                <span className="error-message">{errors.author}</span>
              )}
            </div>

            {/* ISBN */}
            <div className="form-group">
              <label htmlFor="isbn">ISBN</label>
              <input
                type="text"
                id="isbn"
                inputMode="text"
                value={isbn}
                className={errors.isbn ? 'input-error' : ''}
                onChange={(e) => {
                  setIsbn(e.target.value);
                  if (errors.isbn)
                    setErrors((prev) => ({ ...prev, isbn: undefined }));
                }}
                placeholder="e.g., 978-3-16-148410-0"
              />
              {errors.isbn && (
                <span className="error-message">{errors.isbn}</span>
              )}
            </div>

            {/* Genre */}
            <div className="form-group">
              <label htmlFor="genre">Genre *</label>
              <select
                id="genre"
                value={genre}
                className={errors.genre ? 'input-error' : ''}
                onChange={(e) => {
                  setGenre(e.target.value);
                  if (errors.genre)
                    setErrors((prev) => ({ ...prev, genre: undefined }));
                }}
                required
              >
                <option value="" disabled>
                  -- Select Genre --
                </option>
                {genres.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
              {errors.genre && (
                <span className="error-message">{errors.genre}</span>
              )}
            </div>

            {/* Description */}
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={description}
                className={errors.description ? 'input-error' : ''}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (errors.description)
                    setErrors((prev) => ({ ...prev, description: undefined }));
                }}
                placeholder="e.g., A delightful recipe for pancakes as seen in Kiki's Delivery Service..."
                rows="4"
              ></textarea>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                {errors.description && (
                  <span
                    className="error-message"
                    style={{ marginTop: '0.25rem' }}
                  >
                    {errors.description}
                  </span>
                )}
                <span
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--color-gray)',
                    marginTop: '0.25rem',
                    marginLeft: 'auto',
                  }}
                >
                  {description.length}/300
                </span>
              </div>
            </div>

            {/* Published Date */}
            <div className="form-group">
              <label htmlFor="publishedDate">Published Date</label>
              <input
                type="date"
                id="publishedDate"
                value={publishedDate}
                className={errors.publishedDate ? 'input-error' : ''}
                onChange={(e) => {
                  setPublishedDate(e.target.value);
                  if (errors.publishedDate)
                    setErrors((prev) => ({
                      ...prev,
                      publishedDate: undefined,
                    }));
                }}
              />
              <small>
                Format: Select from picker (YYYY-MM-DD), will be saved as
                DD/MM/YYYY.
              </small>
              {errors.publishedDate && (
                <span className="error-message">{errors.publishedDate}</span>
              )}
            </div>

            {/* Book Cover */}
            <div className="form-group">
              <label htmlFor="bookCover" className="file-upload-label-custom">
                <div className="file-upload-dropzone">
                  <HugeiconsIcon
                    icon={CloudUploadIcon}
                    size={48}
                    color="var(--color-gold)"
                    strokeWidth={2}
                    className="file-upload-icon"
                  />
                  <span>Browse Files to upload</span>
                </div>
              </label>
              <input
                type="file"
                id="bookCover"
                accept="image/jpeg, image/png, image/gif"
                onChange={handleCoverChange}
                className="file-input-hidden"
                ref={fileInputRef}
              />
              {errors.bookCover && (
                <span className="error-message">{errors.bookCover}</span>
              )}
              <div className="file-upload-preview">
                {bookCoverPreview ? (
                  <>
                    <img
                      src={bookCoverPreview}
                      alt="Cover preview"
                      className="cover-preview"
                    />
                    <button
                      type="button"
                      className="delete-file-button"
                      onClick={() => {
                        setBookCover(null);
                        setBookCoverPreview(null);
                        if (fileInputRef.current)
                          fileInputRef.current.value = null;
                        if (errors.bookCover)
                          setErrors((prev) => ({
                            ...prev,
                            bookCover: undefined,
                          }));
                      }}
                      aria-label="Delete file"
                    >
                      <HugeiconsIcon
                        icon={Delete01Icon}
                        size={24}
                        color="#ef4444"
                        strokeWidth={1.5}
                      />
                    </button>
                  </>
                ) : (
                  <span className="file-upload-filename">No selected File</span>
                )}
              </div>
            </div>

            {/* I have read this book */}
            <div className="form-group form-group-checkbox">
              <input
                type="checkbox"
                id="isRead"
                checked={isRead}
                onChange={(e) => setIsRead(e.target.checked)}
              />
              <label htmlFor="isRead">I have completed this recipe</label>
            </div>

            {/* Review (Conditional) */}
            {isRead && (
              <div className="form-group">
                <label>Your Rating</label>
                <div
                  className="star-rating-group"
                  onMouseLeave={() => setHoverRating(0)}
                >
                  {[1, 2, 3, 4, 5].map((starValue) => {
                    const activeRating = hoverRating || Number(review);

                    return (
                      <label key={starValue} style={{ cursor: 'pointer' }}>
                        {/* The actual radio button is now hidden, but still functional */}
                        <input
                          type="radio"
                          name="review"
                          value={String(starValue)}
                          checked={review === String(starValue)}
                          onChange={(e) => setReview(e.target.value)}
                          className="visually-hidden"
                        />
                        <HugeiconsIcon
                          icon={StarIcon}
                          size={32}
                          strokeWidth={1.5}
                          className="star-icon"
                          onMouseEnter={() => setHoverRating(starValue)}
                          onClick={() => setReview(String(starValue))}
                          color={
                            starValue <= activeRating
                              ? 'var(--color-gold)'
                              : 'var(--color-light-gray)'
                          }
                        />
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="submit"
              className="modal-submit-button"
              disabled={isSubmitButtonDisabled}
            >
              {/* The button text is also dynamic! */}
              {isSubmitting
                ? 'Saving...'
                : editingBook
                  ? 'Save Changes'
                  : 'Add Recipe Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRecipeModal;
