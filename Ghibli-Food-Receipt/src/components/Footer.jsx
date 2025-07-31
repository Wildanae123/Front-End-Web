// src/components/Footer.jsx
import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bookshelf-footer">
      <p>&copy; {currentYear} Ghibli Food Receipt. All rights reserved.</p>
    </footer>
  );
}

export default Footer;