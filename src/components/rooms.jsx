import React, { useEffect, useState } from 'react';
import './App.css'; 
import room1 from '../assets/room1.jpg'
import room2 from '../assets/room2.jpg'
import room3 from '../assets/room3.jpg'
import room4 from '../assets/room4.jpg'
import room7 from '../assets/room7.jpg'



const Rooms = () => {

  const rooms = [{
    name: 'Standard Room',
    description: 'Cozy room with a queen-sized bed.',
    image: room1,
    price: 40000
  },
  {
    name: 'Deluxe Suite',
    description: 'Spacious suite with a king-sized bed and a fireplace.',
    image: room2,
    price: 60000
  },
  {
    name: 'Deluxe Suite',
    description: 'Spacious suite with a king-sized bed and a fireplace.',
    image: room3,
    price: 60000
  },
  {
    name: 'Deluxe Suite',
    description: 'Spacious suite with a king-sized bed and a fireplace.',
    image: room4,
    price: 60000
  },
  {
    name: 'Deluxe Suite',
    description: 'Spacious suite with a king-sized bed and a fireplace.',
    image: room7,
    price: 60000
  }
];

function handleBooking(roomName){
  alert(`Booking for ${roomName} is in progress.`) // Replace with your booking logic
  // You could redirect to a booking page, open a modal, etc.
}

  return (
    <div className="app-container">
      <main>
        <section className="content-section">
        <h2>Our Rooms & Suites</h2>
        <div className="room-grid">
            {(rooms || []).map((room, index) => (
            <div className="room" key={index}>
                <h3>{room.name}</h3>
                <p>{room.description}</p>
                {/* Add room images and details */}
                <img src={room.image} alt={room.name} width="400"/>
                <p className="room-price">{room.price}</p> {/* Display price */}
                <button className="book-button" onClick={() => handleBooking(room.name)}> {/* Booking button */}
                Book Now
                </button>
            </div>
            ))}
        </div>
        </section>
      </main>
    </div>
  );
};

export default Rooms;