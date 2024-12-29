import React, { useEffect, useState } from 'react';
import './App.css'; 



const Amenities = () => {

  return (
    <div className="app-container">
      <main>
          <section className="content-section">
            <h2>Our Amenities</h2>
            <ul>
              <li>Free Wi-Fi</li>
              <li>On-site Restaurant</li>
              <li>Swimming Pool</li>
              <li>Hiking Trails</li>
            </ul>
          </section>
      </main>
    </div>
  );
};

export default Amenities;