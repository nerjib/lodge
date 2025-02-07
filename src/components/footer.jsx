import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faMailchimp } from '@fortawesome/free-brands-svg-icons';
import './App.css'; // Import your CSS file
import { Email, Instagram, Phone } from '@mui/icons-material';

const Footer = () => {
  
  return (
      <footer>
      <div className="footer-content">
        <div className="text-start">
          {/* <a href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="https://twitter.com/yourtwitter" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} />
          </a> */}
          <div>
          <a href="https://www.instagram.com/tranquilitylodgekd" className='' target="_blank" rel="noopener noreferrer">
            <p className='text-sm'><Instagram /> @tranquilitylodgekd</p>
          </a>
          </div>
          <div>
          <a href="mailto:reservations@tranquilitylodgekd.com" className="text-sm">
             <p className='text-sm'><Email /> reservations@tranquilitylodge.com</p>
            </a>
            </div>
            <div>
          <p className='text-sm'>
            <Phone /> (234) 810-1032-153
          </p>
          </div>
          {/* Add more social media links as needed */}
        </div>
        <p>&copy; {new Date().getFullYear()} Tranquility Lodge</p>
      </div>
      </footer>
  );
};

export default Footer;