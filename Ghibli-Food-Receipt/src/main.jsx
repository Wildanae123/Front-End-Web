// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx'; // Import AuthProvider
import App from './App.jsx';
import './index.css';
import { Toaster } from 'react-hot-toast';

// Import your pages
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import GhibliFoodBookshelf from './pages/GhibliFoodBookshelf.jsx';
import LocalNotesPage from './pages/LocalNotesPage.jsx';
import ApiNotesPage from './pages/ApiNotesPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
// You might want a NotFoundPage as well
// import NotFoundPage from './pages/NotFoundPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      {
        path: "ghibli-food-bookshelf",
        element: <ProtectedRoute><GhibliFoodBookshelf /></ProtectedRoute>,
      },
      {
        path: "notes/recipe/:recipeId", // For specific recipe notes
        element: <ProtectedRoute><ApiNotesPage /></ProtectedRoute>,
      },
      {
        path: "local",
        element: <ProtectedRoute><LocalNotesPage /></ProtectedRoute>,
      },
      {
        path: "api", // For simple book creation
        element: <ProtectedRoute><ApiNotesPage /></ProtectedRoute>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position="top-center" reverseOrder={false} />
    </AuthProvider>
  </React.StrictMode>
);