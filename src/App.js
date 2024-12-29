import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'; // Import your CSS file
import img1 from './assets/front1.jpg'
import img2 from './assets/front2.jpg'
import img3 from './assets/front3.jpg'
import room1 from './assets/room1.jpg'
import room2 from './assets/room2.jpg'
import room3 from './assets/room3.jpg'
import room4 from './assets/room4.jpg'
import room5 from './assets/room5.jpg'
import room6 from './assets/room6.jpg'
import room7 from './assets/room7.jpg'
import Home from './components/Home';
import ReservationPage from './components/reservations';
import Footer from './components/footer';
import Header from './components/header';
import Contact from './components/contact';
import Rooms from './components/rooms';
import Amenities from './components/amenities';



const App = () => {
  
  return (
      
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/rooms" element={<Rooms />} /> */}
          <Route path="/reservation" element={<ReservationPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/amenities" element={<Amenities />} />

        </Routes>
        <Footer />
      </Router>
  );
};

export default App;