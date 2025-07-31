// src/pages/LandingPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    // We use a new main class to apply a more focused layout
    <div className="landing-page">
      <div className="main-feature">
        <h1>Welcome to the Ghibli Recipe Bookshelf</h1>
        <p>
          Your magical journey into the world of Ghibli-inspired cuisine begins here. 
          Browse delightful recipes and keep your personal cooking notes for each dish, saved directly to your device.
        </p>
        <Link to="/ghibli-food-bookshelf" className="main-feature-button">
          Start Exploring Recipes
        </Link>
      </div>

      <div className="separator">
        <span>Or, use a classic notes app</span>
      </div>

      <div className="secondary-choices">
        <Link to="/local" className="choice-button local-button">
          <h2>Standalone Notes (Local)</h2>
          <p>A simple, offline-first notes app saved in your browser.</p>
        </Link>
        <Link to="/api" className="choice-button api-button">
          <h2>Standalone Notes (API)</h2>
          <p>A powerful, cloud-synced notes app.</p>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;