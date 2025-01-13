import React, { useEffect, useState } from 'react';
import './App.css'; 



const Amenities = () => {

  return (
    <div className="app-container">
      <main>
          <section className="content-section">
            <h2 className='text-3xl'>Our Amenities</h2>
            <ul className='text-xl'>
              <li>Free Wi-Fi</li>
              <li>24/7 Electricity (Inverter & Generator)</li>
              <li>Complimentary Breakfast</li>
              <li>Event Space for Small Gathering</li>
              <li>Smart TV</li>
              <li>Netflix</li>
              <li>DSTV</li>
              <li>Mini Fridge</li>
             <li>Laundry Service</li>
             <li>House Keeping</li>
             <li>24/7 Security</li>
             <li>Fully Equipped Kitchen</li>
            <li>Parking Space</li>
            <li>Inhouse Chefs</li>
            <li>Discount available for longer stay</li>
            <li>Air Conditioned Rooms</li>
            <li>Indoor/Outdoor Relaxation Area</li>
            </ul>
          </section>
      </main>
    </div>
  );
};

export default Amenities;