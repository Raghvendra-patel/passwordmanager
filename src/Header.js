
// Header.js

import React from 'react';
import './Header.css'; // Import the CSS file for styling

function Header() {
  return (
    <header className="header">
      <h1>To Do List...</h1>
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
