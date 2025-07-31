// src/App.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header'; // Global Header
import Footer from './components/Footer'; // Global Footer
// import { useAuth } from './contexts/AuthContext'; // If needed for layout decisions

function App() {
  // const { user, isLoading } = useAuth();
  // const location = useLocation();
  // const noLayoutPaths = ['/login', '/register'];
  // const showLayout = !noLayoutPaths.includes(location.pathname);

  return (
    <div className="app-container"> {/* Or your main app wrapper class like "notes-app" if it defines page structure */}
      <Header /> {/* Rendered once globally */}
      <main className="content-wrap"> {/* Or "notes-app-main" if that's the main content class */}
        <Outlet /> {/* ApiNotesPage and other pages render here */}
      </main>
      <Footer /> {/* Rendered once globally */}
    </div>
  );
}

export default App;