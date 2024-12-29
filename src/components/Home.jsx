import React, { useEffect, useState } from 'react';
import './App.css'; 
import img1 from '../assets/front1.jpg'
import img2 from '../assets/front2.jpg'
import img3 from '../assets/front3.jpg'
import room1 from '../assets/room1.jpg'
import room2 from '../assets/room2.jpg'
import room3 from '../assets/room3.jpg'
import room4 from '../assets/room4.jpg'
import room5 from '../assets/room5.jpg'
import room6 from '../assets/room6.jpg'
import room7 from '../assets/room7.jpg'



const Home = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { image: img1, alt: 'Lodge View 1', caption: 'Breathtaking Mountain Views' },
    { image: img2, alt: 'Lodge View 2', caption: 'Cozy Fireplace in the Lobby' },
    { image: img3, alt: 'Lodge View 3', caption: 'Relaxing Outdoor Patio' },
  ];

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Clear interval on unmount
  }, [slides.length]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };
  return (
    <div className="app-container">
      <main>
        {activeTab === 'home' && (
          <section className="content-section">
            <div className="hero-carousel">
              <div className="carousel-slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {slides.map((slide, index) => (
                  <div className="carousel-slide" key={index}>
                    <img src={slide.image} alt={slide.alt} />
                    <div className="slide-caption">{slide.caption}</div>
                  </div>
                ))}
              </div>
              <div className="carousel-dots">
                {slides.map((_, index) => (
                  <div
                    key={index}
                    className={`carousel-dot ${currentSlide === index ? 'active' : ''}`}
                    onClick={() => goToSlide(index)}
                  ></div>
                ))}
              </div>
            </div>
            <h2>Welcome to Serene Tranquility Lodge</h2>
            <p>Escape to the tranquility of the mountains. Our lodge offers comfortable accommodations, breathtaking views, and a relaxing atmosphere.</p>
            {/* ... rest of the home section */}
          </section>
        )}

        {activeTab === 'rooms' && (
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
        )}

        {activeTab === 'amenities' && (
          <section className="content-section">
            <h2>Our Amenities</h2>
            <ul>
              <li>Free Wi-Fi</li>
              <li>On-site Restaurant</li>
              <li>Swimming Pool</li>
              <li>Hiking Trails</li>
            </ul>
          </section>
        )}

        {activeTab === 'contact' && (
          <section className="content-section">
            <h2>Contact Us</h2>
            <p>6 Apo Road<br/>Millenium City, Kaduna State<br/>Phone: (+234)80xxxxx</p>
          </section>
        )}
      </main>
    </div>
  );
};

export default Home;