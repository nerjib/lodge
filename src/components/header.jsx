// Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/icon.png'; // Import your logo image
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { id: 1, text: 'Home', to: '/' },
    { id: 2, text: 'Rooms' , to: '/rooms'},
    { id: 3, text: 'Services', to: '/amenities'},
    { id: 4, text: 'Reservations', to: '/reservation' },
    { id: 5, text: 'About Us', to: '/about' },
    { id: 6, text: 'Contact Us', to: '/contact' },
  ];

  return (
    <header className="bg-black py-4 shadow-md sticky top-0 z-50">
    <div className="container mx-auto px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-10 mr-3" />
            <span className="text-xl font-bold text-gray-100 text-gray-100">Tranquility Lodge</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 text-gray-600">
            {navItems.map(item => (
            <Link ey={item.id} to={item.to} className="hover:text-gray-900 transition duration-300">{item.text}</Link>

            ))}
            {/* <Link to="/" className="hover:text-gray-900 transition duration-300">Home</Link>
            <Link to="/rooms" className="hover:text-gray-900 transition duration-300">Rooms</Link>
            <Link to="/contact" className="hover:text-gray-900 transition duration-300">Contact</Link> */}
            {/* <button onClick={() => setShowRoomManager(true)} className="hover:text-gray-900 transition duration-300">Manage Rooms</button>
            <button onClick={() => setShowHomeContentManager(true)} className="hover:text-gray-900 transition duration-300">Manage Home Content</button>
            <button onClick={() => setShowBookingManager(true)} className="hover:text-gray-900 transition duration-300">Manage Bookings</button>
            <button onClick={() => setShowHeroManager(true)} className="hover:text-gray-900 transition duration-300">Manage Hero</button> */}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden"> {/* Container for better alignment */}
            <button onClick={toggleMobileMenu} className="text-gray-600 hover:text-gray-900 focus:outline-none">
                {isMobileMenuOpen ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
            </button>
        </div>
    </div>

    {/* Mobile Menu */}
    {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-50 py-2 px-6">
            <nav className="flex flex-col space-y-3 text-gray-600">
            {navItems.map(item => (
            <Link ey={item.id} to={item.to} className="hover:text-gray-900 hover:bg-gray-300 transition duration-300">{item.text}</Link>

            ))}
                {/* <Link to="/" className="block py-2 hover:bg-gray-100 rounded transition duration-300" onClick={toggleMobileMenu}>Home</Link>
                <Link to="/rooms" className="block py-2 hover:bg-gray-100 rounded transition duration-300" onClick={toggleMobileMenu}>Rooms</Link>
                <Link to="/contact" className="block py-2 hover:bg-gray-100 rounded transition duration-300" onClick={toggleMobileMenu}>Contact</Link> */}
                {/* <button onClick={() => { setShowRoomManager(true); toggleMobileMenu(); }} className="block py-2 hover:bg-gray-100 rounded transition duration-300 text-left">Manage Rooms</button>
                <button onClick={() => { setShowHomeContentManager(true); toggleMobileMenu(); }} className="block py-2 hover:bg-gray-100 rounded transition duration-300 text-left">Manage Home Content</button>
                <button onClick={() => { setShowBookingManager(true); toggleMobileMenu(); }} className="block py-2 hover:bg-gray-100 rounded transition duration-300 text-left">Manage Bookings</button>
                <button onClick={() => { setShowHeroManager(true); toggleMobileMenu(); }} className="block py-2 hover:bg-gray-100 rounded transition duration-300 text-left">Manage Hero</button> */}
            </nav>
        </div>
    )}
</header>
  );
};

export default Header;