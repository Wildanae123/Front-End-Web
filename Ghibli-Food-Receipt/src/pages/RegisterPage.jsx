// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isFormLoading, setIsFormLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      toast.error('All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }    
    setIsFormLoading(true);
        try {
          const registerSuccess = await register({ name, email, password });
          if (registerSuccess) {
            toast.success('Registered successfully! You are now logged in.');
            navigate('/ghibli-food-bookshelf');
          }
        } catch (error) {
          toast.error(error.message || 'Registration failed. Please try again.');
        } finally {
          setIsFormLoading(false);
        }
      };

  return (
    <div className="auth-page-container">
      <div className="auth-form-wrapper"> {/* Changed class name */}
        <h2 className="auth-title">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="auth-form-group">
            <label htmlFor="name" className="auth-label">Full Name</label>
            <input
              type="text"
              id="name"
              className="auth-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jiji Cat"
              required
              disabled={isFormLoading}
            />
          </div>
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
              placeholder="Minimum 6 characters"
              required
              disabled={isFormLoading}
            />
          </div>
          <div className="auth-form-group">
            <label htmlFor="confirmPassword" className="auth-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="auth-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              required
              disabled={isFormLoading}
            />
          </div>
          <button type="submit" className="auth-main-button auth-submit-button" disabled={isFormLoading}>
                      {isFormLoading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                  </form>
                  <p className="auth-link-text">
                    Already have an account? <Link to="/login" className="auth-link">Sign In</Link>
                  </p>
      </div>
    </div>
  );
}

export default RegisterPage;