// src/pages/GhibliFoodBookshelf.jsx
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PlusSignIcon,
  Search01Icon,
  SearchCircleIcon,
  Note01Icon,
  CheckmarkCircle02Icon,
  ViewIcon,
  PencilEdit02Icon,
  Delete02Icon,
} from "@hugeicons/core-free-icons";
import toast, { Toaster } from "react-hot-toast";
import { Player } from "@lottiefiles/react-lottie-player";

// Import Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import RecipeSlider from "../components/RecipeSlider";
import AddRecipeModal from "../components/AddRecipeModal";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal.jsx";

// Import API service
import * as api from "../utils/api-service"; // Assuming api-service.js is in utils

// Import Assets (ensure these paths are correct)
import asideImage from "../assets/aside-image.jpg";
import heroImage from "../assets/hero-image.png";
// Default book covers - these might be URLs from the API or local if API doesn't provide them
import ghibliFood1 from "../assets/ghibli-food-1.jpg";
import ghibliFood2 from "../assets/ghibli-food-2.jpg";
import ghibliFood3 from "../assets/ghibli-food-3.jpg";
import ghibliFood4 from "../assets/ghibli-food-4.jpg";
import ghibliFood5 from "../assets/ghibli-food-5.jpg";

const localBookCovers = [
  ghibliFood1,
  ghibliFood2,
  ghibliFood3,
  ghibliFood4,
  ghibliFood5,
];

function GhibliFoodBookshelf() {
  const [recipeBooks, setRecipeBooks] = useState([]); // API will populate this
  const [displayedBooks, setDisplayedBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentEditingBook, setCurrentEditingBook] = useState(null); // Renamed to avoid conflict
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bookToDeleteId, setBookToDeleteId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sliderImages, setSliderImages] = useState(localBookCovers); // Default slider

  // Fetch initial data from API
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const booksFromApi = await api.getAllBooks(searchQuery); // Pass search query to API
      const userLibrary = await api.getUserLibrary();

      // Combine book data with user library data (status, rating/review)
      const enrichedBooks = booksFromApi.data.map((book, index) => {
        // Assuming API returns { data: [...] }
        const libraryEntry = userLibrary.data.find(
          (item) => item.bookId === book.id || item.book?.id === book.id
        ); // API might nest book object
        return {
          ...book,
          isRead: libraryEntry ? libraryEntry.status === "read" : false,
          review: libraryEntry ? String(libraryEntry.rating || "") : "", // API rating to string for review
          notes: libraryEntry ? libraryEntry.notes : "", // Store notes from library
          // Use API bookCover if available, otherwise fallback or handle missing
          bookCover:
            book.bookCover ||
            book.coverImageUrl ||
            localBookCovers[index % localBookCovers.length], // Example fallback
        };
      });

      setRecipeBooks(enrichedBooks);
      setDisplayedBooks(enrichedBooks); // Initially display all fetched books
      
      // Update slider images if books have covers
      const apiSliderImages = enrichedBooks
        .map((b) => b.bookCover)
        .filter(Boolean);
      if (apiSliderImages.length > 0) {
        setSliderImages(apiSliderImages.slice(0, 5)); // Show up to 5 covers in slider
      }
    } catch (error) {
      toast.error(`Failed to fetch recipes: ${error.message}`);
      setRecipeBooks([]); // Set to empty array on error
      setDisplayedBooks([]);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]); // Re-fetch when searchQuery changes

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (showModal || isDeleteModalOpen) {
      document.body.classList.add("body-no-scroll");
    } else {
      document.body.classList.remove("body-no-scroll");
    }
    return () => {
      document.body.classList.remove("body-no-scroll");
    };
  }, [showModal, isDeleteModalOpen]);

  const handleAddRecipe = async (newRecipeData) => {
    // Map form data to API structure
    const bookApiData = {
      title: newRecipeData.title,
      description: newRecipeData.description,
      author: newRecipeData.author,
      isbn: newRecipeData.isbn,
      genre: newRecipeData.genre,
      publishedDate: newRecipeData.publishedDate,
      coverImageUrl: newRecipeData.bookCover, // Assuming AddRecipeModal provides this
      // Any other core book fields
    };

    try {
      const createdBook = await api.createBook(bookApiData); // API call
      // Add to user's library with default status (e.g., 'unread')
      await api.addBookToLibrary(createdBook.data.id, {
        status: newRecipeData.isRead ? "read" : "unread",
        rating: newRecipeData.review ? parseInt(newRecipeData.review) : null,
      });
      toast.success("Recipe added successfully!");
      fetchData(); // Re-fetch data
      handleCloseModal();
    } catch (error) {
      toast.error(`Failed to add recipe: ${error.message}`);
    }
  };

  const handleOpenEditModal = (book) => {
    setCurrentEditingBook(book);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentEditingBook(null);
  };

  const handleEditRecipe = async (bookId, updatedData) => {
    const coreBookData = {
      title: updatedData.title,
      description: updatedData.description,
      author: updatedData.author,
      isbn: updatedData.isbn,
      genre: updatedData.genre,
      publishedDate: updatedData.publishedDate,
      coverImageUrl: updatedData.bookCover,
    };
    const libraryData = {
      status: updatedData.isRead ? "read" : "unread",
      rating: updatedData.review ? parseInt(updatedData.review) : null,
      // notes: updatedData.notes, // Notes are handled by ApiNotesPage, but could be updated here too
    };

    try {
      await api.updateBook(bookId, coreBookData); // Update core book details
      await api.updateBookInLibrary(bookId, libraryData); // Update library specific details
      toast.success("Recipe updated successfully!");
      fetchData(); // Re-fetch
      handleCloseModal();
    } catch (error) {
      toast.error(`Failed to update recipe: ${error.message}`);
    }
  };

  const handleDeleteRecipe = (bookId) => {
    setBookToDeleteId(bookId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (bookToDeleteId) {
      try {
        // Decide: Delete from master list (admin) or just user's library?
        // Assuming deleting the book itself if user is creator/admin
        await api.deleteBookApi(bookToDeleteId); 
        // Optionally, also remove from library if not automatically handled by backend
        // await api.removeBookFromLibrary(bookToDeleteId); 
        toast.success("Recipe deleted successfully!");
        fetchData(); // Re-fetch
      } catch (error) {
        toast.error(`Failed to delete recipe: ${error.message}`);
      }
    }
    setIsDeleteModalOpen(false);
    setBookToDeleteId(null);
  };

  const handleSearchChange = (event) => {
    // Renamed from handleSearch to avoid conflict with potential future API search function
    setSearchQuery(event.target.value);
    // API call is triggered by useEffect dependency on searchQuery
  };

  const handleMarkAsReadUnread = async (
    bookId,
    currentIsRead,
    newRating = null
  ) => {
    const newStatus = currentIsRead ? "unread" : "read";
    try {
      // Check if book is in library, if not, add it. Otherwise update.
      // This logic might be simplified if your API handles POST on /library/:bookId as an "upsert".
      const libraryEntry = recipeBooks.find(
        (b) => b.id === bookId && b.notes !== undefined
      ); // Check if it was from library

      if (libraryEntry) {
        await api.updateBookInLibrary(bookId, {
          status: newStatus,
          rating:
            newRating !== null
              ? parseInt(newRating)
              : currentIsRead
              ? null
              : libraryEntry.review,
        });
      } else {
        await api.addBookToLibrary(bookId, {
          status: newStatus,
          rating: newRating !== null ? parseInt(newRating) : null,
        });
      }

      toast.success(
        newStatus === "read"
          ? "Recipe marked as completed!"
          : "Moved back to recipe collections!"
      );
      fetchData(); // Re-fetch
    } catch (error) {
      toast.error(`Failed to update status: ${error.message}`);
    }
  };

  // Filter the books into two separate arrays based on fetched & combined data
  const unreadBooks = displayedBooks.filter((book) => !book.isRead);
  const readBooks = displayedBooks.filter((book) => book.isRead);
  const uniqueAuthors = [
    ...new Set(recipeBooks.map((book) => book.author).filter(Boolean)),
  ];

  if (isLoading) {
    return (
      <div
        className="loading-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "2rem",
        }}
      >
        Loading Ghibli Recipes...
        <Player
          src="https://assets7.lottiefiles.com/packages/lf20_yy6zzg9v.json"
          loop
          autoplay
          style={{ width: "200px", height: "200px" }}
        />
      </div>
    );
  }

  return (
    <div className="bookshelf-page">
      <Header />
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          className: "",
          style: {
            background: "var(--color-brown)",
            color: "var(--color-cream)",
            border: "2px solid var(--color-gold)",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "var(--color-soft-green)",
              secondary: "var(--color-brown)",
            },
          },
          error: {
            iconTheme: {
              primary: "var(--color-red)",
              secondary: "var(--color-cream)",
            },
          },
        }}
      />

      <main className="main-content">
        <div className="main-layout">
          <section
            className="hero-banner"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="hero-overlay"></div>
            <div className="hero-content-wrapper">
              <Player
                src="https://assets7.lottiefiles.com/packages/lf20_zadfo6lc.json"
                className="lottie-player"
                loop
                autoplay
                background="transparent"
                speed={1}
              />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Search Your Culinary Magic!
              </h1>
              <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                Inspired by the enchanting meals of Studio Ghibli? Add your own
                recipes and let others recreate the magic.
              </p>
              <div className="search-input-wrapper">
                <HugeiconsIcon
                  icon={Search01Icon}
                  size={22}
                  className="search-input-icon"
                  color="var(--color-gray)"
                />
                <input
                  type="search"
                  placeholder="Search for a recipe book by title..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="hero-search-input"
                />
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="hero-button"
              >
                <HugeiconsIcon
                  icon={PlusSignIcon}
                  size={24}
                  color="#000000"
                  strokeWidth={1.5}
                  className="hero-button-icon"
                />
                <span>Add Your Recipe</span>
              </button>
            </div>
          </section>
          <article className="recipe-article">
            {!searchQuery && recipeBooks.length > 0 && (
              <>
                <section id="recipes">
                  <h2>Our Recipe Books</h2>
                  <p className="mb-8 text-lg">
                    Explore our collection of recipe books, each filled with
                    dishes inspired by the heartwarming meals from beloved
                    films.
                  </p>
                </section>
                <RecipeSlider images={sliderImages} />
              </>
            )}

            {/* Unread Books Section */}
            <div className="books-category fadeIn">
              <div className="books-category-list">
                <div className="books-category-title">
                  <h4>RECIPE COLLECTIONS</h4>
                  <div className="books-count unread-count">
                    {unreadBooks.length}
                  </div>
                </div>
                <div className="books-cards">
                  <div className="books-cards-list">
                    {unreadBooks.length > 0 ? (
                      unreadBooks.map((book) => (
                        <div
                          key={book.id || book._id}
                          className="recipe-book-card"
                        >
                          {" "}
                          {/* Use API id */}
                          {book.bookCover && (
                            <img
                              src={book.bookCover}
                              alt={book.title}
                              className="recipe-book-cover-thumbnail"
                              onError={(e) => (e.target.style.display = "none")}
                            />
                          )}
                          <h3>{book.title}</h3>
                          {book.genre && (
                            <span
                              className={`genre-tag genre-tag--${
                                book.genre
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")
                                  .replace(/[^\w-]+/g, "") || "default"
                              }`}
                            >
                              {book.genre}
                            </span>
                          )}
                          <p>
                            <strong>Author:</strong> {book.author}
                          </p>
                          <p>{book.description}</p>
                          {/* Review (rating) is shown in the "Read Books" section or if explicitly set */}
                          <div className="card-actions">
                            <Link
                              to={`/notes/recipe/${book.id || book._id}`}
                              className="action-btn explore"
                            >
                              {" "}
                              {/* Use API id */}
                              <HugeiconsIcon
                                icon={
                                  book.notes ? Note01Icon : SearchCircleIcon
                                }
                                size={20}
                                color="currentColor"
                              />
                              <span>
                                {book.notes
                                  ? "View/Edit Notes"
                                  : "Explore & Add Notes"}
                              </span>
                            </Link>
                            <div className="card-actions-group">
                              <button
                                onClick={() =>
                                  handleMarkAsReadUnread(
                                    book.id || book._id,
                                    book.isRead
                                  )
                                }
                                className="action-btn mark-read"
                              >
                                <HugeiconsIcon
                                  icon={CheckmarkCircle02Icon}
                                  size={20}
                                  color="currentColor"
                                />
                                <span>Completed</span>
                              </button>
                              <button
                                onClick={() => handleOpenEditModal(book)}
                                className="action-btn edit"
                              >
                                <HugeiconsIcon
                                  icon={PencilEdit02Icon}
                                  size={20}
                                  color="currentColor"
                                />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteRecipe(book.id || book._id)
                                }
                                className="action-btn delete"
                              >
                                <HugeiconsIcon
                                  icon={Delete02Icon}
                                  size={20}
                                  color="currentColor"
                                />
                                <span>Delete</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="empty-list-message">
                        {searchQuery
                          ? `No recipe collections found for "${searchQuery}".`
                          : "No recipe collections to show yet. Add one!"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Read Books Section */}
            <div className="books-category fadeIn">
              <div className="books-category-list">
                <div className="books-category-title">
                  <h4>COMPLETED RECIPES</h4>
                  <div className="books-count read-count">
                    {readBooks.length}
                  </div>
                </div>
                <div className="books-cards">
                  <div className="books-cards-list">
                    {readBooks.length > 0 ? (
                      readBooks.map((book) => (
                        <div
                          key={book.id || book._id}
                          className="recipe-book-card"
                        >
                          {" "}
                          {/* Use API id */}
                          {book.bookCover && (
                            <img
                              src={book.bookCover}
                              alt={book.title}
                              className="recipe-book-cover-thumbnail"
                              onError={(e) => (e.target.style.display = "none")}
                            />
                          )}
                          <h3>{book.title}</h3>
                          {book.genre && (
                            <span
                              className={`genre-tag genre-tag--${
                                book.genre
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")
                                  .replace(/[^\w-]+/g, "") || "default"
                              }`}
                            >
                              {book.genre}
                            </span>
                          )}
                          <p>
                            <strong>Author:</strong> {book.author}
                          </p>
                          <p>{book.description}</p>
                          {book.isRead && book.review && (
                            <p>
                              <strong>Your Rating:</strong> {book.review} / 5
                            </p>
                          )}
                          <div className="card-actions">
                            <Link
                              to={`/notes/recipe/${book.id || book._id}`}
                              className="action-btn explore"
                            >
                              {" "}
                              {/* Use API id */}
                              <HugeiconsIcon
                                icon={Note01Icon}
                                size={20}
                                color="currentColor"
                              />
                              <span>View/Edit Notes</span>
                            </Link>
                            <div className="card-actions-group">
                              <button
                                onClick={() =>
                                  handleMarkAsReadUnread(
                                    book.id || book._id,
                                    book.isRead
                                  )
                                }
                                className="action-btn mark-unread"
                              >
                                <HugeiconsIcon
                                  icon={ViewIcon}
                                  size={20}
                                  color="currentColor"
                                />
                                <span>Read Again</span>
                              </button>
                              <button
                                onClick={() => handleOpenEditModal(book)}
                                className="action-btn edit"
                              >
                                <HugeiconsIcon
                                  icon={PencilEdit02Icon}
                                  size={20}
                                  color="currentColor"
                                />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteRecipe(book.id || book._id)
                                }
                                className="action-btn delete"
                              >
                                <HugeiconsIcon
                                  icon={Delete02Icon}
                                  size={20}
                                  color="currentColor"
                                />
                                <span>Delete</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="empty-list-message">
                        No completed recipes yet.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </article>

          {!searchQuery && (
            <aside className="pantry-aside">
              <h3 id="about">From the Chef's Pantry</h3>
              <img src={asideImage} alt="A delicious Ghibli-style cake" />
              <p>
                "The secret to a Ghibli-esque meal isn't just the ingredients;
                it's the love and care baked into it. Here, we celebrate simple,
                fresh ingredients that create moments of pure joy."
              </p>
            </aside>
          )}
        </div>
      </main>

      <Footer />

      {/* Modal Component */}
      <AddRecipeModal
        show={showModal}
        onClose={handleCloseModal}
        onAddRecipe={handleAddRecipe} // This is for new recipes
        onEditRecipe={handleEditRecipe} // This is for existing recipes
        editingBook={currentEditingBook}
        authors={uniqueAuthors}
      />
      <DeleteConfirmationModal
        show={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default GhibliFoodBookshelf;
