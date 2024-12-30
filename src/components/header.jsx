// Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/icon.png'; // Import your logo image

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
        <header>
        <div className="header-content"> {/* Container for logo and nav */}
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <Link to="/" className="logo-link"> 
                <img src={logo} alt="Serene Mountain Lodge Logo" className="logo" />
                </Link>
                <h1>Tranquility Lodge</h1>
            </div>
            {/* <nav>
            <Link to="/">Home</Link>
            <Link to="/rooms">Rooms & Suites</Link>
            <Link to="/amenities">Amenities</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/reservation">Reservation</Link>
            </nav> */}
            <nav className={`main-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}> {/* Conditionally add class */}
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                <Link to="/rooms" onClick={() => setIsMobileMenuOpen(false)}>Rooms & Suites</Link>
                <Link to="/amenities" onClick={() => setIsMobileMenuOpen(false)}>Amenities</Link>
                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
                <Link to="/reservation" onClick={() => setIsMobileMenuOpen(false)}>Reservation</Link>
            </nav>
            <button style={{color: 'red'}} className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                jjjjjjjjjjjjjjj
            </button>
        </div>
        </header>
  );
};

export default Header;