# Front-End-Web

## Table of Contents
* [Ghibli Food Bookshelf: A Recipe Journey](#ghibli-food-bookshelf-a-recipe-journey)
* [Project Integration](#project-integration)
* [Setup & Installation](#setup--installation)
* [Tech Stack](#tech-stack)
* [API Integration](#api-integration)
* [Basic Web Programming Learning](#basic-web-programming-learning)
* [Fundamental Front-End Web Development Learning Journey](#fundamental-front-end-web-development-learning-journey)
* [Learning Front-End Web Development for Beginners](#learning-front-end-web-development-for-beginners)
* [Intermediate Web Development Learning](#intermediate-web-development-learning)

---

# Ghibli Food Bookshelf: A Recipe Journey

## Description

**Ghibli Food Bookshelf** is a delightful web application designed for fans of Studio Ghibli who wish to curate and explore a personal collection of recipe books inspired by the enchanting meals depicted in the films. Users can add, edit, and manage their Ghibli-themed recipe books, track which recipes they've completed, rate them, and discover new culinary adventures. The application provides an intuitive and visually appealing interface, leveraging local browser storage to persist the user's collection — ensuring their magical recipe list is always at their fingertips.

---

## Key Features

### 📚 Recipe Book Management

- **Add New Books:**  
  Easily add new recipe books with comprehensive details including:
  - Title
  - Author
  - Description
  - ISBN
  - Genre
  - Publication date
  - Custom book cover image

- **Edit Existing Books:**  
  Modify any detail of an existing recipe book through an intuitive modal interface.

- **Delete Books:**  
  Securely remove books from the collection with a confirmation step requiring the user to type **"DELETE"**.

### ✅ Reading Status & Tracking

- **Mark as Read/Unread:**  
  Toggle the status of books between:
  - *Recipe Collections* (unread/to try)
  - *Completed Recipes* (read)

- **Star Ratings:**  
  Assign a 1–5 star rating to completed recipe books.

### 🎨 User Interface & Experience

- **Visual Bookshelves:**  
  Books are neatly organized into "unread" and "read" categories for clear visibility.

- **Interactive Hero Section:**  
  Engaging hero banner with a Lottie animation and a prominent "Add Recipe" button.

- **Recipe Image Slider:**  
  A dynamic slider showcasing inspirational Ghibli food images (or book covers).

- **Genre Tagging:**  
  Color-coded tags (e.g., *Fantasy*, *Adventure*, *Slice of Life*) for quick visual categorization.

- **Book Cover Upload & Preview:**  
  Upload custom book cover images with live preview and validation:
  - Supported formats: JPG, PNG, GIF
  - Max size: 10MB

- **Search Functionality:**  
  Real-time filtering by title with responsive UI updates.

- **Dynamic Form Validation:**  
  - Required fields: Title, Author, Genre
  - Title: Minimum 3 characters
  - Description: Max 300 characters (with live counter)
  - Published Date: Not earlier than Jan 1, 1999
  - ISBN: Optional, numeric only if provided

- **Author Suggestions:**  
  Auto-suggest existing authors while typing in the author input field.

- **Toast Notifications:**  
  Non-intrusive, friendly notifications for key actions:
  - Adding/editing/deleting books
  - Changing read status
  - No search results

- **Responsive Design:**  
  Fluid layout that adapts to different screen sizes.

- **Themed Aesthetics:**  
  Custom styling and Google Fonts to evoke a Ghibli-esque charm.

---

## 💾 Data Persistence

- **Local Storage:**  
  All recipe book data is saved using the browser's `localStorage` API, ensuring persistence between user sessions.
- **Backend Integration:**  
  When connected to the backend API, data is synchronized with PostgreSQL database for cross-device access.

---

## 🔗 Project Integration

This frontend application is part of a larger integrated ecosystem:

### 🔧 Backend Integration (Back-End-Web)
- **API Endpoint**: `http://localhost:5000/api/v1`
- **Authentication**: JWT tokens via HttpOnly cookies
- **Features**: User accounts, cloud book storage, cross-device sync

### 🤖 Machine Learning Integration (Machine-Learning-Web)
- **Recommendations**: Personalized book suggestions based on reading history
- **Smart Search**: AI-enhanced search with content analysis
- **User Behavior**: Learning from user interactions to improve suggestions

### 🗄️ Database Integration (Database-Web)
- **Data Storage**: PostgreSQL with full user libraries and book metadata
- **Admin Access**: Web-based database administration panel
- **Backup**: Automated data backup and recovery

### 🚀 DevOps Integration (DevOps-Web)
- **Containerization**: Docker support for consistent deployment
- **CI/CD**: Automated testing and deployment pipelines
- **Monitoring**: Real-time performance and error tracking

---

## 🛠️ Setup & Installation

### Prerequisites
- **Node.js 18+** and **npm**
- **Git** for version control
- **Backend services** (optional for full functionality)

### Quick Start

1. **Clone and Install**
   ```bash
   cd Front-End-Web/Ghibli-Food-Receipt
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Configure the following variables:
   ```env
   VITE_API_URL=http://localhost:5000/api/v1
   VITE_ML_URL=http://localhost:8001
   VITE_APP_MODE=development
   ```

3. **Development Server**
   ```bash
   npm run dev
   ```
   Access at: `http://localhost:3000`

4. **Production Build**
   ```bash
   npm run build
   npm run preview
   ```

### Integration Setup (Full Stack)

For complete integration with all services:

1. **Start Backend Services**
   ```bash
   # Database
   cd Database-Web/Ghibli-Food-Database
   npm run dev
   
   # Backend API
   cd Back-End-Web/Ghibli-Food-Receipt-API
   npm run dev
   
   # ML Service
   cd Machine-Learnimg-Web/Ghibli-Food-ML
   python src/main.py
   ```

2. **Start Frontend**
   ```bash
   cd Front-End-Web/Ghibli-Food-Receipt
   npm run dev
   ```

### Docker Integration

Use the integrated Docker setup:
```bash
cd DevOps-Web/Ghibli-Food-DevOps
docker-compose up -d
```

---

## 🔧 Tech Stack

### Core Framework & Build Tools

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | v18+ | Frontend framework with hooks and context |
| **Vite** | Latest | Lightning-fast build tool and dev server |
| **JavaScript** | ES6+ | Modern JavaScript with modules and async/await |

### Styling & UI

| Technology | Purpose |
|------------|---------|
| **Tailwind CSS** | Utility-first CSS framework |
| **Custom CSS** | Component-specific styling with CSS variables |
| **Google Fonts** | Typography (Lora, Patrick Hand, Quicksand) |
| **Responsive Design** | Mobile-first approach with breakpoints |

### State Management & Routing

| Technology | Purpose |
|------------|---------|
| **React Hooks** | `useState`, `useEffect`, `useRef`, `useContext` |
| **React Router DOM** | Client-side routing and navigation |
| **Context API** | Global state management for user and app state |

### UI Components & Interactions

| Technology | Purpose |
|------------|---------|
| **React Hot Toast** | Non-intrusive notifications |
| **Huge Icons React** | Comprehensive icon library |
| **Lottie React Player** | Smooth animations and micro-interactions |

### Data & API Integration

| Technology | Purpose |
|------------|---------|
| **Fetch API** | HTTP requests to backend services |
| **Local Storage** | Client-side data persistence |
| **WebSocket** | Real-time updates (when backend connected) |

---

## 🔌 API Integration

### Backend API Integration

```javascript
// API Configuration
const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  TIMEOUT: 10000,
  HEADERS: {
    'Content-Type': 'application/json'
  }
}

// Authentication API
const authAPI = {
  login: (credentials) => fetch(`${API_CONFIG.BASE_URL}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: API_CONFIG.HEADERS,
    body: JSON.stringify(credentials)
  }),
  
  register: (userData) => fetch(`${API_CONFIG.BASE_URL}/auth/register`, {
    method: 'POST',
    credentials: 'include',
    headers: API_CONFIG.HEADERS,
    body: JSON.stringify(userData)
  }),
  
  logout: () => fetch(`${API_CONFIG.BASE_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include'
  })
}

// Books API
const booksAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params)
    return fetch(`${API_CONFIG.BASE_URL}/books?${query}`)
  },
  
  getById: (id) => fetch(`${API_CONFIG.BASE_URL}/books/${id}`),
  
  create: (bookData) => fetch(`${API_CONFIG.BASE_URL}/books`, {
    method: 'POST',
    credentials: 'include',
    headers: API_CONFIG.HEADERS,
    body: JSON.stringify(bookData)
  }),
  
  update: (id, bookData) => fetch(`${API_CONFIG.BASE_URL}/books/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: API_CONFIG.HEADERS,
    body: JSON.stringify(bookData)
  })
}

// User Library API
const libraryAPI = {
  getBooks: () => fetch(`${API_CONFIG.BASE_URL}/library`, {
    credentials: 'include'
  }),
  
  addBook: (bookId, data = {}) => fetch(`${API_CONFIG.BASE_URL}/library/${bookId}`, {
    method: 'POST',
    credentials: 'include',
    headers: API_CONFIG.HEADERS,
    body: JSON.stringify(data)
  }),
  
  updateBook: (bookId, data) => fetch(`${API_CONFIG.BASE_URL}/library/${bookId}`, {
    method: 'PUT',
    credentials: 'include',
    headers: API_CONFIG.HEADERS,
    body: JSON.stringify(data)
  })
}
```

### Machine Learning API Integration

```javascript
// ML Service Configuration
const ML_API_URL = import.meta.env.VITE_ML_URL || 'http://localhost:8001'

// Recommendations API
const recommendationsAPI = {
  getPersonalized: async (userId, preferences = {}) => {
    const response = await fetch(`${ML_API_URL}/recommend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: userId,
        preferences,
        num_recommendations: 10
      })
    })
    return response.json()
  },
  
  getSimilar: async (bookId, limit = 5) => {
    const response = await fetch(`${ML_API_URL}/similar/${bookId}?limit=${limit}`)
    return response.json()
  },
  
  searchBooks: async (query, filters = {}) => {
    const response = await fetch(`${ML_API_URL}/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, filters })
    })
    return response.json()
  }
}
```

### State Management Integration

```javascript
// App Context for global state
import React, { createContext, useContext, useReducer, useEffect } from 'react'

const AppContext = createContext()

const initialState = {
  user: null,
  books: [],
  userLibrary: [],
  recommendations: [],
  loading: false,
  error: null,
  isOffline: false
}

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }
    case 'SET_BOOKS':
      return { ...state, books: action.payload }
    case 'SET_USER_LIBRARY':
      return { ...state, userLibrary: action.payload }
    case 'SET_RECOMMENDATIONS':
      return { ...state, recommendations: action.payload }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'SET_OFFLINE':
      return { ...state, isOffline: action.payload }
    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)
  
  // Auto-sync with backend when online
  useEffect(() => {
    const syncData = async () => {
      if (!state.isOffline && state.user) {
        try {
          dispatch({ type: 'SET_LOADING', payload: true })
          
          // Sync user library
          const libraryResponse = await libraryAPI.getBooks()
          const libraryData = await libraryResponse.json()
          dispatch({ type: 'SET_USER_LIBRARY', payload: libraryData })
          
          // Get personalized recommendations
          const recommendations = await recommendationsAPI.getPersonalized(state.user.id)
          dispatch({ type: 'SET_RECOMMENDATIONS', payload: recommendations })
          
        } catch (error) {
          console.error('Sync failed:', error)
          dispatch({ type: 'SET_ERROR', payload: error.message })
        } finally {
          dispatch({ type: 'SET_LOADING', payload: false })
        }
      }
    }
    
    syncData()
  }, [state.user, state.isOffline])
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
```

### Error Handling & Offline Support

```javascript
// Enhanced error handling
const apiRequest = async (requestFn, fallbackFn = null) => {
  try {
    const response = await requestFn()
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('API Request failed:', error)
    
    // Try fallback (local storage, cached data, etc.)
    if (fallbackFn) {
      return await fallbackFn()
    }
    
    // Update offline status
    if (error.name === 'NetworkError' || !navigator.onLine) {
      dispatch({ type: 'SET_OFFLINE', payload: true })
    }
    
    throw error
  }
}

// Offline detection
useEffect(() => {
  const handleOnline = () => dispatch({ type: 'SET_OFFLINE', payload: false })
  const handleOffline = () => dispatch({ type: 'SET_OFFLINE', payload: true })
  
  window.addEventListener('online', handleOnline)
  window.addEventListener('offline', handleOffline)
  
  return () => {
    window.removeEventListener('online', handleOnline)
    window.removeEventListener('offline', handleOffline)
  }
}, [])
```

---

## ⚙️ Tech Specs

| Feature                | Tech Stack                         |
|------------------------|------------------------------------|
| **Frontend Framework** | React (v18+)                       |
| **Build Tool**         | Vite                               |
| **Language**           | JavaScript (ES6+)                  |
| **State Management**   | React Hooks (`useState`, `useEffect`, `useRef`) |
| **Routing**            | `react-router-dom` (for `<Link>` navigation) |

### 🎨 Styling

- **Tailwind CSS**
- **Custom CSS** (`index.css`) using CSS Variables
- **Google Fonts:**  
  - Lora  
  - Patrick Hand  
  - Quicksand

### 🔔 Notifications

- `react-hot-toast`

### 🔍 Icons

- `@hugeicons/react`
- `@hugeicons/core-free-icons`

### ✨ Animations

- Lottie (`@lottiefiles/react-lottie-player`)

### 💾 Data Persistence

- Browser `localStorage` API

### 🧪 Development Environment

- Node.js / npm

---

## 📁 Project Status

> This is a continuously evolving project aimed at creating a whimsical, interactive bookshelf for Ghibli food lovers. Future updates may include cloud sync, sharing collections, and recipe integration.

<br>

# Basic Web Programming Learning

This project contains my learning notes and materials on the fundamentals of web programming, covering both HTML and CSS. This material is structured systematically, starting from basic concepts through to responsive layout techniques using Flexbox.

<details>
<summary>Section 1: Table of Contents</summary>
Here's a breakdown of the main areas of study:

## Table of Contents

### Introduction to HTML

- **Anatomy of HTML Elements:** Understanding the structure of HTML elements (tags and content).
- **Attributes in HTML Elements:** Explains how attributes (like `href`, `src`, `class`, `id`) are used to modify element behaviour and appearance.
- **Anatomy of an HTML Document:** Understanding the basic structure of an HTML page (like `<!DOCTYPE>`, `<html>`, `<head>`, and `<body>`).

### HTML Deep Dive

- **Paragraphs:** Using the `<p>` tag to structure text into paragraphs.
- **Headings:** Using the `<h1>` to `<h6>` tags for different levels of headings.
- **Lists:**
  - **Unordered Lists:** Creating lists with bullet points using `<ul>` and `<li>`.
  - **Ordered Lists:** Creating numbered lists using `<ol>` and `<li>`.
- **Images:** Embedding images in a web page using tag (like `<img>`, `src` and `alt`).
- **Inline Formatting Text:**
  - **Long Quotations, Preformatted Text, and Figure:** Formatting text with `<blockquote`, `<pre>`, and `<figure>`.
  - **Anchor, Emphasised Text, Important Text, and Short Quotation:** Formatting text with `<a>`, `<em>`, `<strong>`, and `<q>`.
  - **Citation, Defining Terms, Subscript, Superscript, Highlighted Text, and Line Break:** Formatting text with `<cite>`, `<dfn>`, `<sub>`, `<sup>`, `<mark>`, and `<br>`.
- **Semantic HTML:**
  - **Organising Page Content:** Using semantic HTML to structure content that describe the content's purpose.
  - **Header, Footer, Main, and Nav:** Using `<header>`, `<footer>`, `<main>`, and `<nav>` to define key sections of a page.
  - **Articles, Aside, and Section:** Using `<article>`, `<aside>`, and `<section>` to structure independent and related content.
- **Generic Elements:**
  - **Div:** A generic container element for grouping content.
  - **Span:** A generic inline container element for styling or manipulating specific parts of text.
- **Tables:**
  - **Basic Table Structure:** Creating tables with `<table>`, `<tr>`, `<th>`, and `<td>`.
  - **Spanning Cells:** Using `rowspan` and `colspan` attributes to create more complex table layouts.
- **User Input:**
  - **Input Element:** Creating interactive controls for user input (like text, button, checkbox etc.).
  - **Textarea Element:** Creating multi-line text input areas for larger text input.
  - **Label Element:** Associating labels with form controls to improve form accessibility.
- **Attributes on Input Elements:** Explains how attributes like type, name, id, value, etc. are used.
- **Submitting Form Data:** How forms send data using the method and action attributes.
- **Special Characters:** Using HTML entities to display characters like <, >, and &.

### Introduction to CSS

- **Introduction to CSS:** A basic overview of Cascading Style Sheets.
- **Advantages and How CSS Works:** Benefits of CSS and how browsers apply styles.
- **Writing Styling Rules:** Understanding CSS syntax with selectors (to target elements) and declarations (to define styles).
- **Attaching Styling to HTML Documents:**
  - **External Style Sheets:** Linking to external `.css` files from a separate file.
  - **Embedded Style Sheets:** Including CSS within the `<style>` tag in the `<head>` of an HTML document.
  - **Inline Styles:** Applying styles using the `style` directly to HTML elements.
- **CSS Concepts:**
  - **Inheritance:** How styles are passed down from parent to child elements.
  - **Group Selectors:** Using commas to select multiple elements with the same styles.
  - **Rule Order:** Explains CSS specificity and how browsers determine which styles to apply.

### CSS Deep Dive

- **Basic Selectors:**
  - **Type Selectors:**Selecting all elements of a specific type (e.g., `p`, `h1`, `div`).
  - **Class Selectors:** Selecting elements with a specific class name (e.g., `.my-class`).
  - **ID Selectors:** Selecting a single, unique element with a specific ID (e.g., `#my-id`).
  - **Attribute Selectors:** Selecting elements based on their attributes.
  - **Universal Selector:** Selecting all elements (`*`).
- **Combinators:**
  - **Adjacent Sibling Selector (+):**Selecting the next sibling element (e.g., `h1 + p`).
  - **General Sibling Selector (~):** Selecting any following sibling element (e.g., `div ~ p`).
  - **Child Selector (>):** Selecting elements that are direct children of another element (e.g., `ul > li`).
  - **Descendant Selector (space):** Selecting elements nested within another element (e.g., `div p`).
- **Pseudo Selectors:**
  - **Pseudo-class Selectors:** Selecting elements based on a state (e.g., `:hover`, `:active`, `:visited`). 
  - **Pseudo-element Selectors:** Selecting and styling a portion of an element (e.g., `::before`, `::after`, `::first-letter`).
- **Font Styling:** Controlling the appearance of text (e.g., `font-family`, `font-size`, `font-weight`).
- **Text Styling:** Controlling the layout and appearance of text (e.g., `text-align`, `line-height`, `text-decoration`).
- **Setting Colour Values:**
  - **Numeric Values:** Specifying colours using RGB, HSL, or hexadecimal values.
  - **Predefined Colour Names:** Using keywords to specify colours (e.g., `red`, `blue`, `green`).
- **Colours for Text and Background:**
  - **Text Colour:** Setting the `color` property of text.
  - **Background Colour:** Setting the `background-color` property of an element.
- **Opacity:** Controlling the `opacity` property of an element.
- **What is a Box Element:** Introduction to the concept that every HTML element can be thought of as a rectangular box.
- **Box Model:** Explains how an element's total size and appearance are affected by content, padding, border, and margin.
  - **Dimensions:** Setting the `width` and `height` properties of an element.
  - **Limiting Dimensions:** Setting `min-width`, `max-width`, `min-height`, and `max-height` properties of an element.
  - **Overflowing Content:** Handling content `overflow` property and its values (e.g., `visible`, `hidden`, `scroll`) of element's dimensions.
  - **Box-sizing:** Controlling `box-sizing` property are calculated.
  - **Border:** Adding `border` property around an element.
  - **Padding:** Creating `padding` property for space between an element's content and its border.
  - **Margin:** Creating `margin` property for space between an element and other elements.
- **Display Roles:** Controlling `display` property how elements are displayed.
  - **Inline Elements:** Elements like `<span>`, `<a>`, and `<em>` that flow within a line of text.
  - **Block Elements:** Elements like `<div>`, `<p>`, and `<h1>` that take up the full width of their container.
- **Box Shadow:** Adding a `box-shadow` property to an element's box.
- **Rounded Corners:** Creating `border-radius` property for rounded corners on elements.
- **Positioning:** Controlling `position` property for placement of elements on a page.
  - **Normal Flow/Static Flow:** How elements are positioned in the absence of specific positioning rules.
  - **Relative Positioning:** Positioning an element relative to its normal position.
  - **Absolute Positioning:** Positioning an element relative to its nearest positioned ancestor.
  - **Fixed Positioning:** Positioning an element stay in place during scrolling.
- **Floating:** Positioning elements to the left or right, allowing other content to wrap around them.
- **Issues with Float Implementation:** Explains problems like collapsing containers.
- **Clear Property:** Controlling how elements behave around floated elements. 
- **Overflow Techniques:** Methods for handling content that is too large to fit in its container.
- **Configuring the Meta Viewport Tag for Layout Responsiveness:** Setting up the viewport for different screen sizes using the `<meta name="viewport">`.
- **Specific Styles with Media Queries:** Applying different styles based on device characteristics using `@media`.

### Responsive Layout with Flexbox

- **Introduction to Flexbox:** A basic overview of the Flexbox Layout.
- **Reasons for Flexbox:** Explains the advantages of Flexbox.
- **Flexbox Basics and Terminology:** Defines terms like "flex container," "flex items," "main axis," and "cross axis.".
- **Properties of the Flex Container:** Explains properties like `display: flex`, `flex-direction`, `justify-content`, `align-items`, and `flex-wrap`.
- **Properties of Flex Items:** Explains properties like `flex-grow`, `flex-shrink`, `flex-basis`, and `align-self` that apply to the children of a flex container.

</details>

<details>
<summary>Section 2: Submission Final Website Task</summary>

## Submission: Final Website Task

### Here are the mandatory submission criteria that you must meet.

- The HTML file must contain the elements `<header>`, `<footer>`, `<main>`, `<article>`, and `<aside>`.
- Each of these elements must contain content appropriate for its purpose (applying the concept of semantic HTML in structuring the website).
- There must be no duplication of the `<main>` element.
- The `<main>` element must be located between the `<header>` and `<footer>`.
- There must be a `<header>` element before `<main>` and a `<footer>` element after `<main>`.
- If `<header>` or `<footer>` elements are present within `<article>` or `<aside>` elements, this is permissible.
- You must display a photograph relevant to the content within the `<aside>` element.
- Layout must be structured using flexbox, not float.
- The theme displayed must be related to **Book**.

Below is a sketch of the website structure that can be used as a reference for completing the submission.

![alt text](<Reference structure.png>)

### Suggestions:

- Implement an appealing application appearance.
  -- Have a suitable colour scheme for the application's theme.
  -- Appropriate element layout.
  -- Use of fonts that match the theme.
  -- Appropriate application of padding and margin.
- Implement a responsive layout.
- Use media queries to adjust the layout for various device screen sizes.
- There should be an application of JavaScript to manipulate the DOM.
  -- Creating a dropdown menu.
  -- Utilising logic such as looping to display elements and content.
  -- Creating a slider.
  -- And other features that support making the website appear more dynamic.

</details>

<details>
<summary>Section 3: Explanation</summary>

## Brief Explanation (UK English)

This project represents the outcome of my learning journey into the fundamentals of web development, with a particular emphasis on HTML for structuring content and CSS for visual presentation. I've studied how to construct the basic elements of a web page using HTML, including the application of semantic elements to organise content more meaningfully. Furthermore, I've explored CSS to style HTML elements, starting from element selection, visual properties such as colours and fonts, and layout using the box model. The concluding part of this learning encompasses responsive layout techniques, including the utilisation of Flexbox to create flexible and adaptable layouts for various screen sizes. Additionally, this project includes a final task involving the creation of a book-themed website, adhering to specific semantic HTML structure and layout requirements, along with suggestions for enhancing its visual appeal and interactivity using responsive design and JavaScript.

## Penjelasan Singkat (Bahasa Indonesia)

Proyek ini adalah hasil dari pembelajaran saya mengenai dasar-dasar pengembangan web, khususnya fokus pada HTML untuk struktur konten dan CSS untuk tampilan visual. Saya mempelajari bagaimana membangun elemen-elemen dasar halaman web menggunakan HTML, termasuk penggunaan elemen semantik untuk mengorganisir konten secara lebih bermakna. Selain itu, saya juga mendalami CSS untuk memberikan gaya pada elemen HTML, mulai dari pemilihan elemen, properti-properti visual seperti warna, font, dan layout menggunakan box model. Bagian akhir dari pembelajaran ini mencakup teknik layout responsif, termasuk penggunaan Flexbox untuk menciptakan tata letak yang fleksibel dan adaptif terhadap berbagai ukuran layar.

</details>

---
<br>

# Fundamental Front-End Web Development Learning Journey

This document outlines the key concepts and topics covered in my learning journey through fundamental front-end web development.

<details>
<summary>Section 1: Table of Contents</summary>
Here's a breakdown of the main areas of study:

## Table of Contents

### Advanced HTML Forms

- **In-depth Form Elements:** Exploring various HTML form elements beyond the basics.
- **In-depth Form Fields:** Understanding different types of form input fields.
- **In-depth Form Field Attributes:** Mastering the attributes that control form field behaviour.
- **Data Validation:** Implementing techniques to ensure the accuracy of user-submitted data.
- **The Importance of Auto-Completion:** Understanding how auto-completion enhances the user experience.
- **Styling Forms:** Applying CSS to create visually appealing and user-friendly forms.
- **Going Further with JavaScript:** Using JavaScript to add dynamic behaviour to forms.
- **Semantic is Important**: Understanding the importance of semantic HTML in forms
- **Best Practices in Building Forms:** Adhering to industry best practices for form development.

### Layouting with CSS Grid

- **Introduction to CSS Grid:** A foundational overview of CSS Grid Layout.
- **Flexbox vs. CSS Grid:** Comparing and contrasting Flexbox and CSS Grid.
- **Grid Terminology:** Understanding the key terms used in CSS Grid.
- **Grid Container and Grid Item:** Defining the structure of a grid layout.
- **Inspecting CSS Grid Layout:** Using browser developer tools to visualize grids.
- **Defining Columns and Rows:** Creating grid structures with specific dimensions.
- **Special Feature Support:**
    - **Fraction unit:** Using the `fr` unit for flexible sizing.
    - **`minmax()` Notation:** Setting minimum and maximum sizes for grid tracks.
    - **`repeat()` Notation:** Efficiently defining repeating grid patterns.
    - **Fluid column**: Creating columns that adapt to their content.
- **Controlling Position:** Precisely placing grid items within the grid.
- **Grid Area:** Positioning items by named grid areas.

### Web Component

- **What is a Web Component?:** An introduction to the concept of reusable web components.
- **Defining and Rendering Custom Elements:** Creating and displaying custom HTML elements.
- **Lifecycle Hooks:** Understanding the different stages in a web component's life.
- **Handling Custom Attributes:** Working with attributes specific to custom elements.
- **Styling Custom Elements:** Applying CSS styles to custom components.
- **Nested Custom Elements:** Creating complex components by combining simpler ones.
- **What is Shadow DOM?:** Understanding the Shadow DOM and its role in encapsulation.
- **Using Shadow DOM:** Implementing Shadow DOM to isolate component styles and markup.
- **Flexible with Slot Element:** Using `<slot>` elements to project content into components.
- **Deeper Dive into Shadow DOM:** Advanced concepts and techniques related to Shadow DOM.
- **Easy with Template Element:** Using the `<template>` element for efficient component creation.

### Package Manager

- **What is npm?:** An introduction to Node Package Manager (npm).
- **Understanding the `package.json` File:** Exploring the structure and purpose of `package.json`.
- **Using npm:** Basic npm commands and workflows.
- **Using Packages:** Installing and managing external libraries.
- **Runner Scripts:** Defining and using custom scripts in `package.json`.
- **Package Scope:** Understanding scoped packages.

### Bundling with Module Bundler

- **What is webpack?:** An introduction to webpack as a module bundler.
- **Core Concepts:** Understanding webpack's fundamental principles.
- **Installing webpack:** Setting up webpack in a project.
- **Using webpack:** Basic webpack configuration and usage.
- **Using Loaders:** Transforming different file types with loaders.
- **Using Plugins:** Extending webpack's functionality with plugins.
- **Implementing `webpack-dev-server`:** Using a development server for efficient workflows.
- **Splitting webpack Based on Environment Mode:** Configuring webpack for different environments (e.g., development, production).

### Asynchronous JavaScript Request

- **What is Asynchronous JavaScript Request?:** Understanding asynchronous operations in JavaScript.
- **Web API:** Exploring browser-provided Web APIs.
- **CORS (Cross-Origin Resource Sharing):** Understanding and handling cross-origin requests.
- **JSON (JavaScript Object Notation):** Working with JSON data format.
- **Making Requests with `XMLHttpRequest`:** Using the older `XMLHttpRequest` API.
- **Making Requests with Fetch API:** Using the modern Fetch API for making network requests.

</details>

<details>
<summary>Section 2: Submission Building Notes App</summary>

## Submission: Building Notes App

### Here are the mandatory submission criteria that you must meet.

- **Mandatory Criterion 1:** Display Notes List Properly
    The application must display the list of notes from the following data. Ensure that all the provided data is displayed correctly in the application.

    ```javascript
    const notesData = [
      {
        id: 'notes-jT-jjsyz61J8XKiI',
        title: 'Welcome to Notes, Dimas!',
        body: 'Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.',
        createdAt: '2022-07-28T10:03:12.594Z',
        archived: false,
      },
      {
        id: 'notes-aB-cdefg12345',
        title: 'Meeting Agenda',
        body: 'Discuss project updates and assign tasks for the upcoming week.',
        createdAt: '2022-08-05T15:30:00.000Z',
        archived: false,
      },
      {
        id: 'notes-XyZ-789012345',
        title: 'Shopping List',
        body: 'Milk, eggs, bread, fruits, and vegetables.',
        createdAt: '2022-08-10T08:45:23.120Z',
        archived: false,
      },
      {
        id: 'notes-1a-2b3c4d5e6f',
        title: 'Personal Goals',
        body: 'Read two books per month, exercise three times a week, learn a new language.',
        createdAt: '2022-08-15T18:12:55.789Z',
        archived: false,
      },
      {
        id: 'notes-LMN-456789',
        title: 'Recipe: Spaghetti Bolognese',
        body: 'Ingredients: ground beef, tomatoes, onions, garlic, pasta. Steps:...',
        createdAt: '2022-08-20T12:30:40.200Z',
        archived: false,
      },
      {
        id: 'notes-QwErTyUiOp',
        title: 'Workout Routine',
        body: 'Monday: Cardio, Tuesday: Upper body, Wednesday: Rest, Thursday: Lower body, Friday: Cardio.',
        createdAt: '2022-08-25T09:15:17.890Z',
        archived: false,
      },
      {
        id: 'notes-abcdef-987654',
        title: 'Book Recommendations',
        body: "1. 'The Alchemist' by Paulo Coelho\\n2. '1984' by George Orwell\\n3. 'To Kill a Mockingbird' by Harper Lee",
        createdAt: '2022-09-01T14:20:05.321Z',
        archived: false,
      },
      {
        id: 'notes-zyxwv-54321',
        title: 'Daily Reflections',
        body: 'Write down three positive things that happened today and one thing to improve tomorrow.',
        createdAt: '2022-09-07T20:40:30.150Z',
        archived: false,
      },
      {
        id: 'notes-poiuyt-987654',
        title: 'Travel Bucket List',
        body: '1. Paris, France\\n2. Kyoto, Japan\\n3. Santorini, Greece\\n4. New York City, USA',
        createdAt: '2022-09-15T11:55:44.678Z',
        archived: false,
      },
      {
        id: 'notes-asdfgh-123456',
        title: 'Coding Projects',
        body: '1. Build a personal website\\n2. Create a mobile app\\n3. Contribute to an open-source project',
        createdAt: '2022-09-20T17:10:12.987Z',
        archived: false,
      },
      {
        id: 'notes-5678-abcd-efgh',
        title: 'Project Deadline',
        body: 'Complete project tasks by the deadline on October 1st.',
        createdAt: '2022-09-28T14:00:00.000Z',
        archived: false,
      },
      {
        id: 'notes-9876-wxyz-1234',
        title: 'Health Checkup',
        body: 'Schedule a routine health checkup with the doctor.',
        createdAt: '2022-10-05T09:30:45.600Z',
        archived: false,
      },
      {
        id: 'notes-qwerty-8765-4321',
        title: 'Financial Goals',
        body: '1. Create a monthly budget\\n2. Save 20% of income\\n3. Invest in a retirement fund.',
        createdAt: '2022-10-12T12:15:30.890Z',
        archived: false,
      },
      {
        id: 'notes-98765-54321-12345',
        title: 'Holiday Plans',
        body: 'Research and plan for the upcoming holiday destination.',
        createdAt: '2022-10-20T16:45:00.000Z',
        archived: false,
      },
      {
        id: 'notes-1234-abcd-5678',
        title: 'Language Learning',
        body: 'Practice Spanish vocabulary for 30 minutes every day.',
        createdAt: '2022-10-28T08:00:20.120Z',
        archived: false,
      },
    ];
    ```

- **Mandatory Criterion 2:** Add Note Form
    As this is a note-taking application, you are required to create a form with the following specifications:

    -   There are two input fields representing the title and content (body) of the note.
    -   Use appropriate input types for each field. For example, use `<textarea>` for the body.

- **Mandatory Criterion 3:** CSS Grid as Layout Method
    Use CSS Grid at least to arrange the layout of the displayed list of notes. For other elements, you can use CSS Grid, Flexbox, or other techniques.

- **Mandatory Criterion 4:** Build UI Components with Web Components
    There must be at least three implementations of custom elements in the application you create. You can use custom elements for any UI component, for example, note items, app bar, note input, and others.

### Suggestions:

- **Optional Criterion 1:** Have an Attractive Look
    You are strongly advised to build the application as appealing as possible. You are free to be as creative as you want. Below are some aspects that can be your reference:

    -   Have suitable and matching colour choices. You can find references from colorhunt.co.
    -   Have a proper layout of elements. Ensure there is no overlapping content.
    -   Use fonts that are easy to read.
    -   Apply appropriate padding and margin.

- **Optional Criterion 2:** Implement Realtime Validation on Forms
    Besides having a good form, good user experience is also important. One of them is implementing real-time validation. You are recommended to implement this aspect.

- **Optional Criterion 3:** Implement Custom Attributes on Custom Elements
    Not just simply using custom elements, to meet this optional criterion, you must at least have handling of custom attributes in your custom element implementations and apply them in the HTML document.

- **Optional Criterion 4:** Have a Responsive Look on Various Devices
    The application will be excellent if it has a responsive layout for various devices.

</details>

<details>
<summary>Section 3: Submission Notes App Integration with RESTful API</summary>

## Submission: Notes App Integration with RESTful API

### Here are the mandatory submission criteria that you must meet.

- **Mandatory Criterion 1:** Maintain Previous Submission Criteria
    This is a continuation of the previous submission. Ensure that the project you have built still meets all the criteria from the previous submission.

- **Mandatory Criterion 2:** Utilise RESTful API as Data Source
    The application must utilise the RESTful API that we have provided as the data source. The RESTful API to be used is https://notes-api.dicoding.dev/v2. You can access the API documentation at that link.

    There are several features that you must adopt using the API above:

    -   Creating or adding new notes.
    -   Getting and displaying a list of notes.
    -   Deleting stored notes.

    **_Note:_** This criterion also means that local data (dummy data) is no longer used. Please utilise the Notes API as the primary data for your notes app.

- **Mandatory Criterion 3:** Use webpack as Module Bundler
    The development of the Notes App must use webpack as a module bundler with the following specifications:

    -   The application must implement html-webpack-plugin in its configuration.
    -   The application must be runnable for the development phase with the command `npm run start-dev` and utilise webpack-dev-server.
    -   The application must be buildable for the production phase with the command `npm run build`.

- **Mandatory Criterion 4:** Use Fetch API
    Use the Fetch API to perform Asynchronous JavaScript Requests when interacting with the API https://notes-api.dicoding.dev/v2.

- **Mandatory Criterion 5:** Have a Loading Indicator
    You are required to display a loading indicator during the HTTP request process whilst waiting for the result. For example, display a loading indicator when the user is logging into the application or creating a new account.

    As a tip, you can also build a loading indicator using a Web component.

### Suggestions:

- **Optional Criterion 1:** Have a Note Archive Feature
    It is recommended to implement a note archive feature in the application. You can see the implementation documentation at https://notes-api.dicoding.dev/v2.

- **Optional Criterion 2:** Display Feedback When an Error Occurs
    Network requests can sometimes fail. We strongly recommend that you display a message if a failure occurs. You can utilise Browser APIs such as the `alert()` method to display a failure message. If you wish, you can utilise libraries like sweetalert2.

- **Optional Criterion 3:** Have Smooth Movement Effects or Animations
    For users, an application with smooth animations will eliminate boredom. You can implement this effect with various third-party libraries such as animejs.com, motion.dev, gsap.com, or others.

- **Optional Criterion 4:** Implement Prettier as Code Formatter
    You are advised to implement a code formatter to tidy up your code writing. One well-known code formatter is Prettier.

</details>

<details>
<summary>Section 4: Explanation</summary>

## Brief Explanation (UK English)

This learning journey has provided a comprehensive foundation in front-end web development, covering essential aspects from advanced form handling and layout techniques to component-based architecture, package management, module bundling, and asynchronous data fetching.

## Penjelasan Singkat (Bahasa Indonesia)

Perjalanan pembelajaran ini memberikan dasar yang komprehensif dalam pengembangan web front-end, mencakup aspek-aspek penting mulai dari penanganan formulir tingkat lanjut dan teknik tata letak hingga arsitektur berbasis komponen, manajemen paket, bundling modul, dan pengambilan data asinkron.

</details>

---
<br>

# Learning Front-End Web Development for Beginners

This project documents my learning journey in front-end web development, covering fundamental concepts.

<details>
<summary>Section 1: Table of Contents</summary>
Here's a breakdown of the main areas of study:

## Table of Contents

### Browser Object Model & Document Object Model

- **What is the Browser Object Model (BOM)?** The BOM represents the browser window and provides access to browser-specific functionalities.
- **Commonly Used BOM Members:** Examples include `window.innerWidth`, `window.innerHeight`, `window.location`, `window.history`, and `window.navigator`.
- **The Document Object Model (DOM):** The DOM is a programming interface for web documents. It represents the page structure as a tree of objects, allowing scripts to dynamically access and update the content, structure, and style of a document.
- **The DOM Tree:** The HTML document is structured as a tree, where each HTML element, attribute, and text node is an object in the tree.
- **DOM Manipulation Techniques:** Methods used to interact with and modify the DOM, such as `getElementById`, `getElementsByClassName`, `createElement`, `appendChild`, `removeChild`, and `innerHTML`.

### Interacting with Events

- **Types of Events:**
  - **Window Event:** Events related to the browser window, like `load`, `resize`, and `scroll`.
  - **Form Event:** Events related to HTML forms, such as `submit`, `reset`, and `change`.
  - **Keyboard Event:** Events triggered by keyboard interactions, like `keydown`, `keyup`, and `keypress`.
  - **Clipboard Event:** Events related to clipboard operations, such as `copy`, `cut`, and `paste`.
  - **Mouse Event:** Events triggered by mouse interactions, like `click`, `mouseover`, `mouseout`, and `mousemove`.
- **Adding Event Handlers to HTML Elements:**
  - **Using the `element.addEventListener` method:** A more flexible and recommended way to attach event listeners to HTML elements.
- **Custom Events:** Events whose names and triggering mechanisms are defined by the developer.
- **Event Bubbling and Event Capturing Concepts:**
  - **Event Bubbling:** The event propagates upwards from the target element to its parent elements in the DOM tree.
  - **Event Capturing:** The event propagates downwards from the window to the target element.
- **Events on the `<form>` element:**
  - **`onSubmit`:** Triggered when the submit button in a form is clicked.
- **Events on the `<input>` element:**
  - **`onInput`:** Triggered every time the value of an input element is changed (when typing or deleting).
  - **`onFocus`:** Triggered when the input element gains focus.
  - **`onBlur`:** Triggered when the input element loses focus.
  - **`onChange`:** Triggered when the value of an input element has been changed and the element loses focus.
  - **`onCopy`:** Triggered when the user copies the value from the input element.
  - **`onPaste`:** Triggered when the user pastes a value into the input element.

### Data Storage with Web Storage

- **Web Storage:** A browser API that allows web applications to store key-value pairs locally within the user's browser. Web Storage can store up to 10MB of data per domain.
- **Functions of Web Storage:** Persisting data generated by web pages as strings for offline access. Suitable for storing user preferences and configuration data for web applications.
- **Types of Web Storage:**
  - **Local Storage:** Stores data with no expiration time. Data persists even when the browser or browser tabs are closed, unless explicitly deleted.
  - **Session Storage:** Stores data for the duration of the current session. Data is cleared when the browser or the specific tab is closed.
- **Functions Available in Web Storage:**
  - **`setItem(key, value)`:** Used to store data in Web Storage. It requires a `key` (to retrieve the value) and a `value` (the data to be stored). Both key and value must be strings.
  - **`getItem(key)`:** Used to retrieve data from Web Storage. It requires a `key` and returns the corresponding value as a string.
- **Storing and Retrieving Complex Data in Web Storage:**
  - To store complex JavaScript objects, they can be converted to strings using `JSON.stringify()`.
  - To retrieve complex JavaScript objects from Web Storage, the string representation can be parsed back into an object using `JSON.parse()`.

</details>

<details>
<summary>Section 2: Submission: Building a Bookshelf App</summary>

## Submission: Building a Bookshelf App

### Here are the mandatory submission criteria that you must meet.

- **Mandatory Criterion 1: Utilise Local Storage for Storage**
  Book data displayed on the shelves must persist even after the web page is closed. Therefore, you must store book data in `localStorage`.
  Each book must be a JavaScript object with the following data. Ensure the property names and their value data types are correct.
  Object format and value data types:
  ```javascript
  {
    id: string | number,
    title: string,
    author: string,
    year: number,
    isComplete: boolean,
  }
  ```
  Example of real book data implementation:
  ```javascript
    {
  {
    id: 3657848524,
    title: 'Harry Potter and the Philosopher\'s Stone',
    author: 'J.K Rowling',
    year: 1997,
    isComplete: false,
  }
  ```
- **Mandatory Criterion 2: Able to Add Books**
  The application must be capable of saving new books using the form provided in the starter project.
  Book IDs must be generated automatically and uniquely. As a tip, you can use a timestamp as its value. The timestamp value can be obtained with the code `new Date().getTime()` or `Number(new Date())`.
  The form should at least be able to produce the following four data points:
  - `title`: the book's title.
  - `author`: the book's author.
  - `year`: the book's release year (number data type).
  - `isComplete`: the status of whether it has been read or not (boolean).

- **Mandatory Criterion 3: Has Two Bookshelves**
  The application must have 2 bookshelves: "Unfinished Reading" and "Finished Reading".
  The "Unfinished Reading" shelf should only store books with an `isComplete` value of `false`.
  The "Finished Reading" shelf should only store books with an `isComplete` value of `true`.

- **Mandatory Criterion 4: Able to Move Books Between Shelves**
  Books on the shelves must be capable of being moved to other shelves, either "Unfinished Reading" or "Finished Reading". Ensure that this change is also saved in localStorage.

- **Mandatory Criterion 5: Able to Delete Book Data**
  Books displayed on the shelves, whether "Unfinished Reading" or "Finished Reading", must be able to be deleted. In addition to disappearing from the page, the book data in localStorage must also be deleted.

### Suggestions:

- **Optional Criterion 1: Add Book Search Feature**
  Implement a feature to search for stored books and display them on the shelves based on the book title entered in the search field.

- **Optional Criterion 2: Add Book Edit Feature**
  In addition to adding new books, it is expected that stored books can be edited.

- **Optional Criterion 3: Code Written Neatly and Cleanly**
  Here are some indicators that can be achieved so that you can write neat and clean code:
  - Remove unused comments and code.
  - Use appropriate and consistent indentation.
  - Use unit naming (variables and functions) according to their meaning, both the value they hold and their purpose.

- **Optional Criterion 4: Apply Styling**
  In the starter project, we only provide HTML and JavaScript. Please feel free to get creative with CSS to create an attractive appearance. However, make sure to still comply with the existing HTML structure.

</details>

<details>
<summary>Section 3: Explanation</summary>

## Brief Explanation (UK English):

This web application provides users with a system for managing their personal book collection. Leveraging the web browser's local storage capabilities, the application persists book data across sessions. Key functionalities include the ability to add new book entries, specifying the title, author, publication year, and reading status. The application features two distinct virtual shelves: "Unread" for books yet to be completed and "Read" for finished books. Users can seamlessly transition books between these shelves and remove entries as needed. Potential enhancements for future development include implementing search functionality, enabling the editing of book details, refactoring the codebase for improved maintainability, and enhancing the user interface through styling.

## Penjelasan Singkat (Bahasa Indonesia)

Aplikasi web ini menyediakan sistem bagi pengguna untuk mengelola koleksi buku pribadi mereka. Memanfaatkan kemampuan penyimpanan lokal peramban web, aplikasi ini menyimpan data buku lintas sesi. Fungsionalitas utama meliputi kemampuan untuk menambahkan entri buku baru, dengan menentukan judul, penulis, tahun terbit, dan status baca. Aplikasi ini menampilkan dua rak virtual yang berbeda: "Belum Dibaca" untuk buku yang belum selesai dan "Sudah Dibaca" untuk buku yang sudah selesai. Pengguna dapat dengan mudah memindahkan buku antar rak ini dan menghapus entri jika diperlukan. Peningkatan potensial untuk pengembangan di masa depan meliputi implementasi fungsi pencarian, memungkinkan pengeditan detail buku, pemfaktoran ulang basis kode untuk meningkatkan pemeliharaan, dan meningkatkan antarmuka pengguna melalui penataan gaya.

</details>

---
<br>

# Intermediate Web Development Learning

This repository documents my learning journey through intermediate web development topics. It covers a range of essential concepts and practical applications.

<details>
<summary>Section 1: Table of Contents</summary>
Here's a breakdown of the main areas of study:

## Table of Contents

### Accessibility

- **Introduction to Accessibility:** Understanding the importance and principles of making the web inclusive.
- **Principles of Accessibility (POUR):** Core guidelines: Perceivable, Operable, Understandable, and Robust.
- **Keyboard Navigation:** Enabling users to navigate and interact using only a keyboard.
- **Managing Focusable Elements:** Controlling the order and visibility of elements that receive keyboard focus.
- **"Skip to Content" Links:** Providing a way for users to bypass repetitive navigation.
- **Semantics and Screen Readers:** Using meaningful HTML to convey content effectively to assistive technologies.
- **Exploring Screen Readers:** Hands-on experience with tools used by visually impaired users.
- **Semantic Properties and the Accessibility Tree:** How semantic HTML creates a structured representation for accessibility.
- **ARIA and HTML Integration:** Using ARIA attributes to enhance accessibility where semantic HTML is insufficient.
- **Headings and Sectioning for Structure:** Organizing content logically using heading tags and sectioning elements.
- **Labels and Alternative Text for Media:** Providing textual alternatives for form controls and images.
- **Typography Considerations:** Choosing readable fonts, sizes, and contrasts for better usability.
- **The Role of JavaScript in Accessibility:** Ensuring dynamic content and interactions are also accessible.

### Transitions and Animations

- **Introduction to View Transitions API:** A modern browser API for creating seamless transitions between page views.
- **Transitions for Single-Page Applications (SPAs) and Multi-Page Applications (MPAs):** Implementing transitions for different web application architectures.
- **SPAs with the Model-View-Presenter (MVP) Pattern:** An architectural pattern for SPAs, separating concerns for better organisation.
    - **Model:** Manages the application's data.
    - **View:** Displays the user interface.
    - **Presenter:** Handles user interactions and updates the Model and View.
- **Page Transitions for SPAs:** Creating smooth visual transitions between different views within an SPA.
- **Pseudo-Element Tree in Transitions:** Understanding how pseudo-elements are involved in creating transition effects.
- **Animation API for Custom Transitions:** Using JavaScript's `Element.animate()` for more complex and tailored animations.
- **Debugging Transitions:** Techniques for identifying and resolving issues with transitions and animations.
- **Page Transitions for MPAs:** Handling visual transitions between full page loads in traditional websites.
- **Managing Transitions for Multiple Elements:** Coordinating animations across several elements simultaneously.
- **Transitions for Different Element Types:** Applying specific transition styles to various HTML elements.
- **Accessibility Considerations for Animations:** Ensuring animations are performant and do not cause discomfort or accessibility issues.

### The World of Media

- **Introduction to the Media Stream API:** Accessing user's camera and microphone for media input.
- **Working with Media Streams:** Capturing and manipulating audio and video data.
    - **Creating Media Streams (accessing camera/microphone):** Requesting and obtaining access to media devices.
    - **Displaying Streams (e.g., video playback):** Rendering the captured media within HTML elements.
- **Canvas API for Graphics and Manipulation:** Drawing 2D and 3D graphics, animations, and image manipulation using JavaScript.
- **Configuring Media Stream Constraints:** Setting parameters for media quality and device preferences.
- **Accessing Front and Rear Cameras on Mobile Devices:** Programmatically selecting the desired camera on mobile devices.
- **Saving Media to the Local Machine:** Allowing users to download captured audio or video data.

### Maps and Location

- **Introduction to Maps and Location Services:** Basics of displaying maps and using geolocation data in web applications.
- **Fundamentals of Digital Maps:** Key concepts behind online map services.
    - **Map Services (e.g., map providers):** Companies providing map data and APIs.
    - **Spatial Data (geographic information):** Data describing locations and features on Earth.
    - **Interactivity in Maps:** Enabling user interaction like zooming and panning.
- **Getting Started with Digital Maps:** Initial steps in embedding and using map libraries.
    - **Basic Map Implementation:** Displaying a static or minimally interactive map.
    - **Interactive Map Libraries (e.g., Leaflet, MapLibre GL JS):** JavaScript libraries for creating rich, interactive maps.
- **Markers and Custom Icons:** Placing points of interest on a map with customisable visuals.
- **User Interaction with Maps:** Handling user events like clicks and movements on the map.
- **GeoJSON, Custom Data Map:** Using GeoJSON format to display custom geographical data on maps.
- **Geolocation API, Real-Time Location:** Obtaining the user's current location in real-time.
- **MapTiler, Map Service Alternative:** Exploring an alternative provider for map tiles and services.
- **Working with Layer Group and Control:** Organising map features into layers and adding interactive controls.

### JavaScript Behind the Scenes

- **Importance of JavaScript Background:** Understanding why background tasks are crucial for performance.
- **Detecting JavaScript Background:** Checking browser support for background processing capabilities.
- **Introduction to Service Worker API:** Enabling offline capabilities and push notifications by acting as a proxy.
- **Service Worker Registration:** The process of installing a Service Worker for a web application.
- **Service Worker Lifecycles:** The different stages a Service Worker goes through during its operation.
- **Service Worker Events:** Listening for and responding to events like network requests and installations.
- **Notification API:** Displaying system-level notifications to the user.
- **Web Push Notification:** Sending notifications to users even when the website is not actively open.
- **Cara Kerja Web Push Notification:** Understanding the underlying mechanisms of push notifications.

### Progressive Web Apps

- **Introduction to Progressive Web Apps:** Understanding the concept and benefits of PWAs.
- **Kriteria-Kriteria PWA:** The key characteristics that define a Progressive Web App.
- **Komponen Pembentuk PWA:** The essential technologies and concepts behind PWAs.
- **Application Shell:** A minimal HTML, CSS, and JavaScript structure that loads quickly.
- **CacheStorage API:** Storing network requests and responses for offline access.
- **Dasar Penggunaan Cache Storage:** Fundamental operations with the CacheStorage API.
    - **Menyimpan Data:** Adding resources to the cache.
    - **Menggunakan `Cache.add()`:** Caching a single network request.
    - **Menggunakan `Cache.addAll()`:** Caching multiple network requests.
    - **Menggunakan `Cache.put()`:** Caching a specific request-response pair.
    - **Mengambil Data:** Retrieving cached resources.
    - **Menghapus Data:** Removing resources from the cache.
- **Caching Strategies:** Different approaches to managing cached resources based on their nature.
- **Workbox, Caching Abstraction:** A library simplifying PWA development, especially caching.
- **Workbox Precaching:** Caching assets during the Service Worker installation.
    - **`generateSW`:** Workbox automatically generates the Service Worker file.
    - **`injectManifest`:** You provide a Service Worker file, and Workbox injects precaching logic.
- **Workbox Runtime Caching:** Caching assets dynamically as they are requested during runtime.
- **Web Application Manifest:** A JSON file providing metadata about the PWA (name, icons, etc.).
- **IndexedDB API:** A NoSQL database for storing structured data in the browser.
- **Dasar Penggunaan IndexedDB:** Fundamental operations with the IndexedDB API.
- **Operasi CRUD pada IndexedDB:** Basic database operations: Create, Read, Update, Delete.
    - **Get Data:** Retrieving data from IndexedDB.
    - **Input Data:** Adding new data to IndexedDB.
    - **Update Data:** Modifying existing data in IndexedDB.
    - **Delete Data:** Removing data from IndexedDB.

### Deployment Aplikasi

- **Pengenalan Deployment Aplikasi:** Understanding the process of making a web application live.
- **Platform untuk Deployment:** Services used to host and serve web applications.
    - **GitHub Pages:** Free hosting for static websites directly from GitHub repositories.
    - **Netlify:** A platform for automated builds and hosting of web applications.
    - **Firebase Hosting:** Scalable and secure hosting provided by Google Firebase.
- **Pengelolaan Source Code Aplikasi:** Using version control systems like Git.
- **Deployment dengan GitHub Pages:** Steps to deploy a static website using GitHub Pages.
- **Deployment dengan Netlify:** Steps to deploy a web application using Netlify.
- **Deployment dengan Firebase Hosting:** Steps to deploy a web application using Firebase Hosting.

</details>

<details>
<summary>Section 2: First Project</summary>

## Submission: First Project

### Here are the mandatory submission criteria that you must meet.

- **Mandatory Criterion 1: Utilize One API as Data Source**
    - You MUST use a single API as the source of your application's data. This choice will also determine the topic of your application. Please leverage the provided API.

    [Story API Documentation](https://story-api.dicoding.dev/v1/#/)

- **Mandatory Criterion 2: Use Single-Page Application Architecture**
    - Your application MUST adopt the Single-Page Application (SPA) architecture as demonstrated in the practice projects. The following requirements MUST be implemented:
        - Utilize the hash (#) technique for handling browser routing.
        - Implement the Model-View-Presenter (MVP) pattern for managing data to the user interface.

- **Mandatory Criterion 3: Display Data**
    - The application must have a page that displays data from the chosen API. The following requirements MUST be implemented:
        - Data is displayed as a list and sourced from your chosen API.
        - Each list item must display at least one image and three text data points.
        - Include a digital map to show the location of the data.
        - Ensure the map has markers and displays a popup on click.
        - **Important:** INCLUDE the API key for the map service used in `STUDENT.txt` if your application requires one. If this file doesn't exist, please create it in the root project.

- **Mandatory Criterion 4: Have a Feature to Add New Data**
    - In addition to displaying data, the application MUST have the ability to add new data to the API. This will likely require a new page with a form. Ensure this page contains the necessary input fields to collect data from the user.
    - Although each API has different requirements, there are some data similarities. The following are MANDATORY requirements:
        - Capture image data using the device camera. Ensure the created stream is deactivated when not needed.
        - Use a digital map and click events to capture latitude and longitude data. You are allowed to use any library other than those taught in class.

- **Mandatory Criterion 5: Implement Accessibility according to Standards**
    - There are several aspects to improving application accessibility. Pay attention to the following MANDATORY requirements:
        - Implement "skip to content".
        - Have alternative text for essential image content.
        - Ensure every form control, such as `<input>`, is associated with a `<label>` for easy access.
        - Use semantic elements to structure the page and for HTML landmarking.

- **Mandatory Criterion 6: Design Smooth Page Transitions**
    - For a better user experience, your application MUST implement smooth page transition styles using the View Transition API.

### Suggestions:

- **Optional Criterion 1: Have an Attractive Appearance**
    - You can build your application as appealing as possible. Feel free to be as creative as you want. Here is a list of MINIMAL CRITERIA for an attractive appearance:
        - Have suitable and matching color choices. You can find references from [colorhunt.co](https://colorhunt.co/).
        - Have a proper layout of elements. Ensure no content overlaps.
        - Selection of easy-to-read font styles.
        - Proper application of padding and margin.
        - Display icon images to enrich captions, such as Font Awesome, Feather Icons, etc.

- **Optional Criterion 2: Mobile Friendly**
    - The application has a responsive design for users of small devices. This means the application is easily accessible on all devices. This also falls under improving accessibility.

- **Optional Criterion 3: Customize Page Transitions with Animation API**
    - To give your application uniqueness, you can utilize the Animation API to create custom page transitions.

- **Optional Criterion 4: Have Various Map Styles in Layer Control**
    - To enhance user experience, you are recommended to implement layer control and two or more tile layers. You can use any map service, such as MapTiler, and ensure you use additional plugins if using Leaflet and vector tiles.

</details>

<details>
<summary>Section 3: Second Project</summary>

## Submission: Second Project

### Here are the mandatory submission criteria that you must meet.

- **Mandatory Criterion 1: Maintain All Mandatory Criteria from the Previous Submission**
    - Before submitting your results, ensure that all the mandatory requirements for the first submission are still well met.
    - Here is a list of criteria from the previous submission that need to be maintained:
        - Utilize one API as a data source.
        - Use a single-page application architecture.
        - Display data from the API.
        - Have a feature to add new data.
        - Implement accessibility according to standards.
        - Design smooth page transitions.

- **Mandatory Criterion 2: Implement Push Notification**
    - One of the background executions in web applications is push notification. You are required to implement push notifications from the API we have provided. So, please refer back to the REST API documentation you used previously to obtain the public VAPID keys.

- **Mandatory Criterion 3: Adopt PWA (Installable & Offline)**
    - The application adopts progressive web apps (PWA) with the following MANDATORY requirements:
        - Adopt the Application Shell architecture: separating static and dynamic content sections.
        - The application can be installed to the Homescreen: indicated by the appearance of the "add to homescreen" icon in the browser.
        - The application can be accessed offline without any UI parts failing to display.

- **Mandatory Criterion 4: Utilize IndexedDB to Store Data**
    - In this submission, you MUST implement the IndexedDB API to enhance the offline experience. The application MUST provide a way to:
        - store,
        - display, and
        - delete stored data.
    - You are free to store data in any form and context as long as it is relevant to the application. For example, you can store data from the API and display it on a page as we demonstrated in class exercises.

- **Mandatory Criterion 5: Distribute Publicly**
    - The application must be distributed or deployed so that it can be accessed publicly. The following are MANDATORY requirements that you need to follow:
        - Utilize one of the following platforms:
            - GitHub Pages
            - Netlify
            - Firebase Hosting
        - Attach the deployment URL in `STUDENT.txt`. Otherwise, your submission will be rejected.

### Suggestions:

- **Optional Criterion 1: Have Shortcuts and Screenshots for Desktop and Mobile**
    - To maximize the experience like a native application (platform-specific app), you are encouraged to add shortcut components and screenshots in the web app manifest.
        - Provide at least one shortcut button to the new data addition page.
        - Provide at least one screenshot for large-screen (desktop) and small-screen (mobile) devices.

- **Optional Criterion 2: Use Workbox for Offline Capability**
    - Building offline capability can be challenging if you build the caching strategy logic from scratch. You are advised to utilize the Workbox library for this issue.

- **Optional Criterion 3: Provide a Not Found Page**
    - It is possible that users may access addresses not recognized by the application. You can add and display a "Not Found" page in this case so that users understand they are accessing an unknown address.

</details>

<details>
<summary>Section 4: Explanation</summary>

## Brief Explanation (UK English)

This project portfolio showcases the practical application of intermediate web development principles acquired through the "Intermediate Web Development Learning Journey". The initial phase, "First Project", demonstrates proficiency in building a Single-Page Application leveraging an external API for dynamic data integration. Key functionalities include data presentation with geographical mapping, user-initiated data creation incorporating device media and location services, adherence to accessibility standards, and the implementation of seamless page transitions via the View Transition API. While optional enhancements for visual appeal and mobile responsiveness were explored, the core focus remained on meeting the defined mandatory criteria.

The subsequent phase, "Second Project", builds upon this foundation by integrating more advanced web technologies. Maintaining all mandatory requirements from the first project, it further demonstrates the implementation of push notifications for enhanced user engagement and the adoption of Progressive Web App (PWA) principles, ensuring installability and offline accessibility through Application Shell architecture and Service Workers. Local data persistence is achieved through the strategic use of the IndexedDB API. Finally, the project emphasizes professional deployment practices by requiring public distribution via platforms such as GitHub Pages, Netlify, or Firebase Hosting. Optional extensions explored include web app manifest enhancements for a more native-like experience and the utilisation of Workbox for robust offline capabilities.

## Penjelasan Singkat (Bahasa Indonesia)

Portofolio proyek ini merepresentasikan hasil dari perjalanan pembelajaran saya dalam Pengembangan Web Tingkat Menengah ("Intermediate Web Development Learning Journey"). Fase awal, "Proyek Pertama", mendemonstrasikan kemahiran dalam membangun Aplikasi Satu Halaman (Single-Page Application) yang memanfaatkan API eksternal untuk integrasi data dinamis. Fungsionalitas utama mencakup presentasi data dengan pemetaan geografis, pembuatan data oleh pengguna yang mengintegrasikan media perangkat dan layanan lokasi, kepatuhan terhadap standar aksesibilitas, serta implementasi transisi halaman yang mulus melalui View Transition API. Meskipun peningkatan opsional untuk daya tarik visual dan responsivitas seluler dieksplorasi, fokus utama tetap pada pemenuhan kriteria wajib yang telah ditetapkan.

Fase selanjutnya, "Proyek Kedua", dibangun di atas fondasi ini dengan mengintegrasikan teknologi web yang lebih canggih. Mempertahankan semua persyaratan wajib dari proyek pertama, proyek ini lebih lanjut mendemonstrasikan implementasi notifikasi push untuk meningkatkan keterlibatan pengguna dan adopsi prinsip-prinsip Progressive Web App (PWA), memastikan kemampuan instalasi dan aksesibilitas offline melalui arsitektur Application Shell dan Service Workers. Persistensi data lokal dicapai melalui penggunaan strategis IndexedDB API. Terakhir, proyek ini menekankan praktik deployment profesional dengan mewajibkan distribusi publik melalui platform seperti GitHub Pages, Netlify, atau Firebase Hosting. Ekstensi opsional yang dieksplorasi mencakup peningkatan web app manifest untuk pengalaman yang lebih mirip aplikasi natif dan pemanfaatan Workbox untuk kapabilitas offline yang kuat.

</details>