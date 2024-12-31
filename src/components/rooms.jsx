import React, { useEffect, useState } from 'react';
import './App.css'; 
import room1 from '../assets/room1.jpg'
import room2 from '../assets/room2.jpg'
import room3 from '../assets/room3.jpg'
import room4 from '../assets/room4.jpg'
import room7 from '../assets/room7.jpg'
import room10 from '../assets/room10.jpg'
import room11 from '../assets/room11.jpg'
import { useNavigate } from 'react-router-dom';




const Rooms = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [roomAvailability, setRoomAvailability] = useState({});

  const rooms = [{
    name: 'Morocco',
    description: 'Cozy room with a queen-sized bed.',
    image: room1,
    price: 45000
  },
  {
    name: 'Jordan',
    description: 'cozy suite with a king-sized bed.',
    image: room2,
    price: 45000
  },
  {
    name: 'Oman',
    description: 'Cozy suite with a king-sized bed.',
    image: room3,
    price: 45000
  },
  {
    name: 'Kuwait',
    description: 'Cozy suite with a king-sized bed.',
    image: room11,
    price: 45000
  },
  {
    name: 'Bahrain',
    description: 'Spacious suite with a 2 king-sized beds and a master bathroom.',
    image: room10,
    price: 45000
  },
  {
    name: 'Egypt',
    description: 'Spacious suite with a 2 king-sized beds and a master bathroom.',
    image: room10,
    price: 30000
  },
  {
    name: 'Qatar',
    description: 'Spacious suite with a 2 king-sized beds and a master bathroom.',
    image: room10,
    price: 60000
  },
  {
    name: 'UAE',
    description: 'Spacious suite with a 2 king-sized beds and a master bathroom.',
    image: room10,
    price: 55000
   }
];


  useEffect(() => {
    // Simulate fetching availability data from an API or database
    const fetchAvailability = async () => {
      // Replace this with your actual data fetching logic
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay

      const availabilityData = {
        'Standard Room': { available: Math.random() < 0.5, message: Math.random() < 0.5? 'Available' : 'Not Available'},
        'Deluxe Suite 1': { available: Math.random() < 0.5, message: Math.random() < 0.5? 'Available' : 'Not Available'},
        'Deluxe Suite 2': { available: Math.random() < 0.5, message: Math.random() < 0.5? 'Available' : 'Not Available'},
        'Deluxe Suite 3': { available: Math.random() < 0.5, message: Math.random() < 0.5? 'Available' : 'Not Available'},
        'King Suite': { available: Math.random() < 0.5, message: Math.random() < 0.5? 'Available' : 'Not Available'},
        'Family Suite': { available: Math.random() < 0.5, message: Math.random() < 0.5? 'Available' : 'Not Available'},
      };
      setRoomAvailability(availabilityData);
    };

    fetchAvailability();
  }, []);

  function handleBooking(roomName) {
    if (roomAvailability[roomName] && !roomAvailability[roomName].available) {
      alert(`${roomName} is currently not available.`);
      return;
    }

    // Navigate to the reservation page with room information
    navigate(`/reservation?room=${roomName}`); // Use template literal
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
                <p className={`availability-message ${roomAvailability[room.name]?.available ? 'available' : 'unavailable'}`}>
                  {roomAvailability[room.name]?.message || 'Loading...'}
                </p>
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