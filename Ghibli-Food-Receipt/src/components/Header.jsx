// src/components/Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom'; // Use NavLink for active styling
import { useAuth } from '../contexts/AuthContext'; // Import useAuth
import BooksIcon from '../assets/books.png';
import { HugeiconsIcon } from '@hugeicons/react'; // Assuming you might use this for icons
import {
  UserCircle02Icon,
  LoginCircle01Icon,
  LogoutCircle01Icon,
  Menu01Icon,
  Cancel01Icon,
  Setting07Icon,
} from '@hugeicons/core-free-icons'; // Example icons

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isLoading } = useAuth(); // Get auth state
  const dropdownRef = useRef(null);
  const menuButtonRef = useRef(null);

  const closeMenu = () => setIsMenuOpen(false);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef, menuButtonRef]);

  const mainNavLinks = [
    { to: '/', text: 'Home' },
    { to: '/ghibli-food-bookshelf', text: 'Recipes' },
    { to: '/local', text: 'Local Notes' },
  ];

  return (
    <header className="bookshelf-header">
      <div className="header-content">
        <Link to="/" className="header-title-link" onClick={closeMenu}>
          <h1 className="header-title">
            <img src={BooksIcon} alt="Books Icon" className="header-icon" />
            Ghibli Recipe Bookshelf
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="header-nav">
          <ul>
            {mainNavLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) => (isActive ? 'nav-active' : '')}
                >
                  {link.text}
                </NavLink>
              </li>
            ))}
            {/* Example Admin Link for Desktop */}
            {user && user.role === 'Admin' && (
              <li>
                <NavLink
                  to="/admin/dashboard" // Assuming this route exists
                  className={({ isActive }) =>
                    isActive ? 'nav-active admin-link' : 'admin-link'
                  }
                >
                  Admin Panel
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        {/* Auth Navigation - Desktop */}
        <div className="auth-nav-desktop">
          {isLoading ? (
            <span className="auth-loading">Loading...</span>
          ) : user ? (
            <>
              <span className="user-greeting">
                <HugeiconsIcon icon={UserCircle02Icon} size={18} /> Hi,{' '}
                {user.name || 'User'}{' '}
                <span className="user-role">({user.role})</span>
              </span>
              <button
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="auth-button logout-button"
              >
                <HugeiconsIcon icon={LogoutCircle01Icon} size={18} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="auth-button login-button"
                onClick={closeMenu}
              >
                <HugeiconsIcon icon={LoginCircle01Icon} size={18} /> Sign In
              </Link>
              <Link
                to="/register"
                className="auth-button register-button"
                onClick={closeMenu}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          ref={menuButtonRef}
          className="dropdown-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <HugeiconsIcon
            icon={isMenuOpen ? Cancel01Icon : Menu01Icon}
            size={28}
          />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="dropdown-menu" ref={dropdownRef}>
          {mainNavLinks.map((link) => (
            <NavLink
              key={`mobile-${link.to}`}
              to={link.to}
              className={({ isActive }) =>
                isActive ? 'dropdown-link nav-active' : 'dropdown-link'
              }
              onClick={closeMenu}
            >
              {link.text}
            </NavLink>
          ))}
          {/* Example Admin Link for Mobile */}
          {user && user.role === 'Admin' && (
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                isActive
                  ? 'dropdown-link nav-active admin-link'
                  : 'dropdown-link admin-link'
              }
              onClick={closeMenu}
            >
              <HugeiconsIcon icon={Setting07Icon} size={18} /> Admin Panel
            </NavLink>
          )}
          <hr className="dropdown-divider" />
          {/* Auth links for mobile */}
          {isLoading ? (
            <span className="dropdown-link auth-loading">Loading...</span>
          ) : user ? (
            <>
              <div className="dropdown-link user-greeting-mobile">
                <HugeiconsIcon icon={UserCircle02Icon} size={18} /> Hi,{' '}
                {user.name || 'User'} ({user.role})
              </div>
              <button
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="dropdown-link auth-button logout-button-mobile"
              >
                <HugeiconsIcon icon={LogoutCircle01Icon} size={18} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="dropdown-link auth-button"
                onClick={closeMenu}
              >
                <HugeiconsIcon icon={LoginCircle01Icon} size={18} /> Sign In
              </Link>
              <Link
                to="/register"
                className="dropdown-link auth-button register-button-mobile"
                onClick={closeMenu}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
