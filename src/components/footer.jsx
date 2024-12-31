import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './App.css'; // Import your CSS file

const Footer = () => {
  
  return (
      <footer>
      <div className="footer-content">
        <div className="social-links">
          {/* <a href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="https://twitter.com/yourtwitter" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} />
          </a> */}
          <a href="https://www.instagram.com/tranquilitylodgekd" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          {/* Add more social media links as needed */}
        </div>
        <p>&copy; {new Date().getFullYear()} Tranquility Lodge</p>
      </div>
      </footer>
  );
};

export default Footer;