import React, { useEffect, useState } from 'react';
import './App.css'; // Import your CSS file

const Footer = () => {
  
  return (
    <div className="app-container">
      <footer>
        <p>&copy; {new Date().getFullYear()} Tranquility Lodge</p>
      </footer>
    </div>
  );
};

export default Footer;