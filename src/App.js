import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Link} from 'react-router-dom';
import './App.css'; // Import your CSS file
import Home from './components/Home';
import ReservationPage from './components/reservations';
import Footer from './components/footer';
import Header from './components/header';
import Contact from './components/contact';
import Rooms from './components/rooms';
import Amenities from './components/amenities';
import RoomManager from './components/RoomsManager';
import HomeContentManager from './components/HomeContentManager';
import BookingManager from './components/bookingManager';
import HeroManager from './components/HeroManager';
import Navbar from './components/navbar';
import Payment from './components/payments';
import BookingConfirmation from './components/bookingConfirmation';



const App = () => {
  
  return (
      
      <Router>
        <Header />
        {/* <Navbar /> */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          {/* <Route path="/rooms" element={<Rooms />} /> */}
          <Route exact path="/reservation" element={<ReservationPage />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/rooms" element={<Rooms />} />
          <Route exact path="/amenities" element={<Amenities />} />
          <Route exact path="/admin" element={<RoomManager />} />
          <Route exact path="/admin/home" element={<HomeContentManager />} />
          <Route exact path="/admin/bookings" element={<BookingManager />} />
          <Route exact path="/admin/hero" element={<HeroManager />} />
          <Route exact path="/payment/:id" element={<Payment />} />
          <Route exact path="/booking-confirmation" element={<BookingConfirmation />} />          

        </Routes>
        <Footer />
      </Router>
  );
};

export default App;