# Front-End-Web - Ghibli Food Recipe Platform

A delightful React application providing an intuitive web interface for users to curate and explore personal collections of recipe books inspired by Studio Ghibli films, with smart recommendations and seamless cloud synchronization.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Integration](#project-integration)
- [Quick Setup Guide](#quick-setup-guide)
- [Technology Stack](#technology-stack)
- [Configuration](#configuration)
- [Integration Examples](#integration-examples)
- [Development](#development)
- [Contributing](#contributing)

---

## Overview

The **Front-End-Web** component serves as the user-facing interface for the Ghibli Food Recipe platform, providing an engaging and intuitive web application built with React and modern web technologies. Users can manage their personal recipe book collections, discover new books through intelligent recommendations, and enjoy a seamless experience across devices.

This application features local storage capabilities for offline use, real-time synchronization with backend services, intelligent search and filtering, user authentication, and responsive design optimized for both desktop and mobile experiences.

---

## Features

### Core Features
- **Recipe Book Management** - Add, edit, delete, and organize recipe books with rich metadata
- **Personal Library System** - Track reading status, ratings, and personal notes for each book
- **Intelligent Search & Filtering** - Real-time search with advanced filtering by genre, author, and difficulty
- **User Authentication** - Secure login system with JWT token management
- **Responsive Design** - Optimized experience across desktop, tablet, and mobile devices

### Advanced Features
- **Smart Recommendations** - AI-powered book suggestions based on user preferences and behavior
- **Offline Support** - Local storage with automatic sync when connection is restored
- **Real-time Updates** - Live notifications and updates via WebSocket connections
- **Interactive UI Components** - Dynamic forms, image upload, and visual feedback
- **Performance Optimized** - Lazy loading, code splitting, and efficient state management

---

## Project Integration

This frontend application provides the user interface for the entire Ghibli Food Recipe platform:

### 🔧 **Backend Integration** (Back-End-Web)
- **REST API Communication** - Consumes all backend endpoints for data management
- **Authentication Flow** - Secure JWT-based authentication with HttpOnly cookies
- **File Upload Support** - Image upload capabilities for book covers and user content
- **Error Handling** - Graceful handling of API errors with user-friendly feedback

### 🗄️ **Database Integration** (Database-Web)
- **Admin Interface Access** - Web-based database administration for authorized users
- **Data Synchronization** - Automatic sync between local storage and database
- **Performance Monitoring** - Database metrics visualization for administrators
- **Content Management** - Interface for managing books, users, and application data

### 🤖 **ML Integration** (Machine-Learning-Web)
- **Smart Recommendations** - Displays personalized book recommendations
- **Enhanced Search** - ML-powered search with semantic similarity and relevance scoring
- **User Behavior Tracking** - Captures user interactions for continuous model improvement
- **Preference Learning** - Adapts interface and recommendations based on user patterns

### 🚀 **DevOps Integration** (DevOps-Web)
- **Container Deployment** - Optimized Docker containers for production deployment
- **CI/CD Pipeline** - Automated testing, building, and deployment workflows
- **Performance Monitoring** - Real User Monitoring (RUM) and Core Web Vitals tracking
- **Environment Configuration** - Dynamic configuration management across deployment stages

---

## Quick Setup Guide

### Prerequisites
- **Node.js 18+** and **npm**
- **Git** for version control
- **Backend services** running (for full functionality)
- **Modern web browser** with JavaScript enabled

### Local Development Setup

1. **Clone and Install Dependencies**
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
   # API Endpoints
   VITE_API_URL=http://localhost:5000/api/v1
   VITE_ML_URL=http://localhost:8001
   
   # Application Configuration
   VITE_APP_NAME=Ghibli Food Bookshelf
   VITE_APP_MODE=development
   
   # Features
   VITE_ENABLE_OFFLINE=true
   VITE_ENABLE_ANALYTICS=false
   
   # External Services
   VITE_SENTRY_DSN=your_sentry_dsn_here
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   
   Access the application at: `http://localhost:3000`

4. **Build for Production**
   ```bash
   npm run build
   npm run preview
   ```

### Integrated Development Setup

1. **Start All Backend Services**
   ```bash
   # Database service
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
```bash
# Using integrated Docker setup
cd DevOps-Web/Ghibli-Food-DevOps
docker-compose up -d frontend
```

---

## Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18+ | Frontend framework with hooks and context |
| **Vite** | 5+ | Lightning-fast build tool and dev server |
| **JavaScript** | ES6+ | Modern JavaScript with modules and async/await |
| **Tailwind CSS** | 3.x | Utility-first CSS framework |
| **React Router** | 6.x | Client-side routing and navigation |

### UI & Styling
| Technology | Purpose |
|------------|---------|
| **Tailwind CSS** | Utility-first CSS framework |
| **Google Fonts** | Typography (Lora, Patrick Hand, Quicksand) |
| **Huge Icons** | Comprehensive icon library |
| **Lottie** | Smooth animations and micro-interactions |

### State Management & Data
| Technology | Purpose |
|------------|---------|
| **React Context** | Global state management |
| **React Hooks** | Component state and lifecycle management |
| **Fetch API** | HTTP requests to backend services |
| **Local Storage** | Client-side data persistence |

### Development Tools
| Technology | Purpose |
|------------|---------|
| **ESLint** | Code linting and quality enforcement |
| **Prettier** | Code formatting |
| **Vitest** | Unit and integration testing |
| **React Hot Toast** | User notifications |

---

## Configuration

### Environment Variables

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api/v1
VITE_ML_URL=http://localhost:8001
VITE_DATABASE_ADMIN_URL=http://localhost:3001

# Application Settings
VITE_APP_NAME=Ghibli Food Bookshelf
VITE_APP_MODE=development
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_OFFLINE=true
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_RECOMMENDATIONS=true
VITE_ENABLE_NOTIFICATIONS=true

# Authentication
VITE_JWT_STORAGE_KEY=ghibli_auth_token
VITE_SESSION_TIMEOUT=86400000

# UI Configuration
VITE_DEFAULT_THEME=light
VITE_ENABLE_DARK_MODE=true
VITE_ITEMS_PER_PAGE=12

# External Services
VITE_SENTRY_DSN=your_sentry_dsn_here
VITE_GOOGLE_ANALYTICS_ID=your_ga_id_here
```

### Build Configuration
```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: process.env.NODE_ENV === 'development',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@hugeicons/react', 'react-hot-toast'],
          router: ['react-router-dom']
        }
      }
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
```

---

## Integration Examples

### API Service Integration
```javascript
// services/apiService.js
class APIService {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'
    this.mlURL = import.meta.env.VITE_ML_URL || 'http://localhost:8001'
  }

  // Authentication
  async login(credentials) {
    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
    
    if (!response.ok) {
      throw new Error(`Authentication failed: ${response.status}`)
    }
    
    return response.json()
  }

  // Book management
  async getBooks(params = {}) {
    const query = new URLSearchParams(params)
    const response = await fetch(`${this.baseURL}/books?${query}`, {
      credentials: 'include'
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch books: ${response.status}`)
    }
    
    return response.json()
  }

  async createBook(bookData) {
    const response = await fetch(`${this.baseURL}/books`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookData)
    })
    
    if (!response.ok) {
      throw new Error(`Failed to create book: ${response.status}`)
    }
    
    return response.json()
  }

  // ML Recommendations
  async getRecommendations(userId, preferences = {}) {
    try {
      const response = await fetch(`${this.mlURL}/recommend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          preferences,
          num_recommendations: 10
        })
      })
      
      if (!response.ok) {
        throw new Error(`ML service error: ${response.status}`)
      }
      
      return response.json()
    } catch (error) {
      console.error('Recommendations service unavailable:', error)
      return { recommendations: [], fallback: true }
    }
  }
}

export default new APIService()
```

### State Management
```javascript
// context/AppContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from 'react'
import apiService from '../services/apiService'

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
          
          // Fetch user data
          const [books, library, recommendations] = await Promise.all([
            apiService.getBooks(),
            apiService.getUserLibrary(),
            apiService.getRecommendations(state.user.id)
          ])
          
          dispatch({ type: 'SET_BOOKS', payload: books.data })
          dispatch({ type: 'SET_USER_LIBRARY', payload: library.data })
          dispatch({ type: 'SET_RECOMMENDATIONS', payload: recommendations.recommendations })
          
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
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
```

### Component Integration
```javascript
// components/BookCard.jsx
import React from 'react'
import { useApp } from '../context/AppContext'
import { Star01Icon, BookOpen02Icon } from '@hugeicons/react'
import toast from 'react-hot-toast'

export default function BookCard({ book, onEdit, onDelete }) {
  const { state, dispatch } = useApp()
  
  const handleAddToLibrary = async () => {
    try {
      await apiService.addToLibrary(book.id, { status: 'want_to_read' })
      toast.success('Book added to your library!')
      
      // Track behavior for ML
      if (state.user) {
        apiService.trackBehavior(state.user.id, book.id, 'add_to_library')
      }
      
      // Refresh library
      const library = await apiService.getUserLibrary()
      dispatch({ type: 'SET_USER_LIBRARY', payload: library.data })
      
    } catch (error) {
      toast.error('Failed to add book to library')
      console.error('Add to library error:', error)
    }
  }
  
  const handleRating = async (rating) => {
    try {
      await apiService.updateLibraryEntry(book.id, { rating })
      toast.success('Rating updated!')
      
      // Track for ML
      if (state.user) {
        apiService.trackBehavior(state.user.id, book.id, 'rate', { rating })
      }
      
    } catch (error) {
      toast.error('Failed to update rating')
    }
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <img 
        src={book.cover_image || '/default-book-cover.jpg'} 
        alt={book.title}
        className="w-full h-48 object-cover rounded-md mb-4"
        loading="lazy"
      />
      
      <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
      <p className="text-gray-600 mb-2">by {book.author}</p>
      <p className="text-sm text-gray-500 mb-4">{book.genre}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((rating) => (
            <Star01Icon
              key={rating}
              className={`w-4 h-4 cursor-pointer ${
                rating <= (book.average_rating || 0) 
                  ? 'text-yellow-400 fill-current' 
                  : 'text-gray-300'
              }`}
              onClick={() => handleRating(rating)}
            />
          ))}
        </div>
        
        <button
          onClick={handleAddToLibrary}
          className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors"
        >
          <BookOpen02Icon className="w-4 h-4" />
          <span>Add to Library</span>
        </button>
      </div>
    </div>
  )
}
```

---

## Development

### Development Scripts
```bash
# Development server
npm run dev              # Start dev server with hot reload
npm run dev:host         # Start dev server accessible from network

# Building
npm run build            # Production build
npm run build:analyze    # Build with bundle analyzer
npm run preview          # Preview production build

# Testing
npm test                 # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage report
npm run test:ui          # Run tests with UI

# Code Quality
npm run lint             # ESLint code analysis
npm run lint:fix         # Fix ESLint issues automatically
npm run format           # Format code with Prettier
npm run type-check       # TypeScript type checking (if using TS)
```

### Testing Strategy
- **Unit Tests**: Component functionality testing with Vitest and React Testing Library
- **Integration Tests**: User interaction flows and API integration testing  
- **E2E Tests**: Full application workflow testing with Playwright
- **Visual Testing**: Component visual regression testing
- **Performance Tests**: Core Web Vitals and loading performance validation

### Performance Optimization
```javascript
// Lazy loading components
const BookDetail = lazy(() => import('./components/BookDetail'))
const UserProfile = lazy(() => import('./components/UserProfile'))

// Performance monitoring
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

function sendToAnalytics(metric) {
  if (import.meta.env.VITE_ENABLE_ANALYTICS) {
    // Send to your analytics service
    console.log('Performance metric:', metric)
  }
}

getCLS(sendToAnalytics)
getFID(sendToAnalytics)
getFCP(sendToAnalytics)
getLCP(sendToAnalytics)
getTTFB(sendToAnalytics)
```

### Debugging Tools
- **React Developer Tools**: Component tree and state inspection
- **Network Tab**: API request/response monitoring
- **Performance Tab**: React component performance profiling
- **Lighthouse**: Performance, accessibility, and SEO auditing

---

## Contributing

1. **Development Standards**
   - Follow React best practices and hooks patterns
   - Use functional components with hooks over class components
   - Implement proper error boundaries and loading states
   - Follow accessibility guidelines (WCAG 2.1)

2. **Code Quality**
   - ESLint and Prettier configurations enforced
   - Consistent naming conventions (camelCase for variables, PascalCase for components)
   - Comprehensive JSDoc comments for complex functions
   - Maintain 80%+ test coverage

3. **Component Guidelines**
   - Create reusable, composable components
   - Use Tailwind CSS for styling consistency
   - Implement proper prop validation
   - Follow atomic design principles

4. **Performance Requirements**
   - Lazy load routes and heavy components
   - Optimize images and assets
   - Implement proper caching strategies
   - Monitor and maintain Core Web Vitals scores

---

**Part of the Ghibli Food Recipe Platform Ecosystem** 🍜✨