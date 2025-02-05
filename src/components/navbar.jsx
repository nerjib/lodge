import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import logo from '../assets/icon.png'; // Import your logo image
import { Link } from 'react-router-dom';

const Navbar = () => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  // Array containing navigation items
  const navItems = [
    { id: 1, text: 'Home', to: '/' },
    { id: 2, text: 'Rooms' , to: '/rooms'},
    { id: 3, text: 'Services', to: '/amenities'},
    { id: 4, text: 'Reservations', to: '/reservation' },
    { id: 4, text: 'Gallery', to: '/gallery' },
    { id: 5, text: 'About Us', to: '/about' },
    { id: 6, text: 'Contact Us', to: '/contact' },
  ];

  return (
    <div className='z-50 bg-black flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white'>
      <div className='grid grid-cols-2 content-center'>
      <Link to="/" className="logo-link"> 
        <img src={logo} alt="tranquility Lodge Logo" className="logo" />
      </Link>
      <h3 className="my-auto fw-600 text-3xl">Tranquility Lodge</h3>
      </div>

      {/* Desktop Navigation */}
      <ul className='hidden md:flex'>
        {navItems.map(item => (
          <li
            key={item.id}
            className='p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black'
          >
            <Link to={item.to}>{item.text}</Link>
            
          </li>
        ))}
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className="flex flex-col space-y-3 text-gray-600"
      >
        {/* Mobile Logo */}
        <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>Tranquility.</h1>

        {/* Mobile Navigation Items */}
        {navItems.map(item => (
          <li
            key={item.id}
            className='p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600'
          >
            <Link to={item.to}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;