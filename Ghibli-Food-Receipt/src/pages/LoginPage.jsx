// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormLoading, setIsFormLoading] = useState(false);
  const { login, guestLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/ghibli-food-bookshelf"; // Redirect after login

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Email and password are required.');
      return;
    }
    setIsFormLoading(true);
        try {
          const loginSuccess = await login({ email, password }); // This calls AuthContext's login
          if (loginSuccess) {
            toast.success('Logged in successfully!');
            navigate(from, { replace: true }); // This should now work reliably
          }
          // If loginSuccess is false (though current AuthContext.login always returns true or throws)
          // or if an error was thrown, it's handled by catch.
        } catch (error) {
      toast.error(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsFormLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setIsFormLoading(true);
    try {
      const guestLoginSuccess = await guestLogin();
      if (guestLoginSuccess) {
      toast.success('Logged in as Guest!');
      navigate(from, { replace: true });
      }
    } catch (error) {
      toast.error(error.message || 'Guest login failed.');
    } finally {
      setIsFormLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-form-wrapper"> {/* Changed class name */}
        <h2 className="auth-title">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="auth-form-group">
            <label htmlFor="email" className="auth-label">Email Address</label>
            <input
              type="email"
              id="email"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              disabled={isFormLoading}
            />
          </div>
          <div className="auth-form-group">
            <label htmlFor="password" className="auth-label">Password</label>
            <input
              type="password"
              id="password"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={isFormLoading}
            />
          </div>
          <button type="submit" className="auth-main-button auth-submit-button" disabled={isFormLoading}>
            {isFormLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <button
          onClick={handleGuestLogin}
          className="auth-main-button auth-guest-button"
          disabled={isFormLoading}
        >
          {isFormLoading ? 'Loading...' : 'Continue as Guest'}
        </button>
        <p className="auth-link-text">
          Don't have an account? <Link to="/register" className="auth-link">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;