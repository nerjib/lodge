// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/icon.png'; // Import your logo image

const Header = () => {
  return (
    <header>
      <div className="header-content"> {/* Container for logo and nav */}
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}> {/* Flex container for logo and title */}
            <Link to="/" className="logo-link"> {/* Link for the logo */}
            <img src={logo} alt="Serene Mountain Lodge Logo" className="logo" />
            </Link>
            <h1>Tranquility Lodge</h1>
        </div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/rooms">Rooms & Suites</Link>
          <Link to="/amenities">Amenities</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/reservation">Reservation</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;