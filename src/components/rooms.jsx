import React, { useEffect, useState } from 'react';
import './App.css'; 
import { useNavigate } from 'react-router-dom';
import { baseUrl } from './services/config';




const Rooms = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [roomAvailability, setRoomAvailability] = useState({});
    const [roomsData, setRoomsData] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null); // Add error state
    const [checkInDate, setCheckInDate] = useState('')
    const [checkOutDate, setCheckOutDate] = useState('')
    // useEffect(() => {
    //   const fetchRoomData = async () => {
    //     try {
    //       const response = await fetch('${baseUrl}/api/v1/lodge/rooms'); // Replace with your backend URL
    //       if (!response.ok) {
    //         throw new Error(`HTTP error! status: ${response.status}`);
    //       }
    //       const data = await response.json();
    //       setRoomsData(data);
    //     } catch (err) {
    //       console.error('Error fetching room data:', err);
    //       setError(err); // Set the error state
    //     } finally {
    //       setLoading(false); // Set loading to false regardless of success or failure
    //     }
    //   };
  
    //   fetchRoomData();
    // }, []);
    useEffect(() => {
      const fetchRoomData = async () => {
          try {
            let response;
              if (!checkInDate || !checkOutDate) {
                response = await fetch(`${baseUrl}/api/v1/lodge/rooms`);
              } else {
              response = await fetch(`${baseUrl}/api/v1/lodge/rooms/${checkInDate}/${checkOutDate}`);
              }
              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }
              const data = await response.json();
              setRoomsData(data);
          } catch (err) {
              console.error('Error fetching room data:', err);
              setError(err);
          } finally {
              setLoading(false);
          }
      };

      fetchRoomData();
  }, [checkInDate, checkOutDate]);

  const rooms = [{
    name: 'Morocco',
    description: 'Cozy room with a queen-sized bed.',
    price: 45000
  },
  {
    name: 'Jordan',
    description: 'cozy suite with a king-sized bed.',
    price: 45000
  },
  {
    name: 'Oman',
    description: 'Cozy suite with a king-sized bed.',
    price: 45000
  },
  {
    name: 'Kuwait',
    description: 'Cozy suite with a king-sized bed.',
    price: 45000
  },
  {
    name: 'Bahrain',
    description: 'Spacious suite with a 2 king-sized beds and a master bathroom.',
    price: 45000
  },
  {
    name: 'Egypt',
    description: 'Spacious suite with a 2 king-sized beds and a master bathroom.',
    price: 30000
  },
  {
    name: 'Qatar',
    description: 'Spacious suite with a 2 king-sized beds and a master bathroom.',
    price: 60000
  },
  {
    name: 'UAE',
    description: 'Spacious suite with a 2 king-sized beds and a master bathroom.',
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
    // const room = roomsData.find(r => r.name === roomName);
    // if (!room?.available) {
    //     alert(`${roomName} is currently not available for the selected dates.`);
    //     return;
    // }
    navigate(`/reservation?room=${roomName}&checkIn=${checkInDate}&checkOut=${checkOutDate}`);
}

  // if (loading) {
  //   return <div>Loading rooms...</div>; // Display loading message
  // }

  // if (error) {
  //   return <div>Error: {error.message}</div>; // Display error message
  // }
  return (
    <div className="app-container">
      <main>
        <section className="content-section">
        <h2>Our Rooms & Suites</h2>
        <div className='date-pickers'>
                    <label htmlFor="checkin">Check In</label>
                    <input type="date" name='checkin' id='checkin' value={checkInDate} onChange={e => setCheckInDate(e.target.value)} min={new Date().toISOString().split('T')[0]}/>
                    <label htmlFor="checkout">Check Out</label>
                    <input type="date" name='checkout' id='checkout' value={checkOutDate} onChange={e => setCheckOutDate(e.target.value)} min={checkInDate || new Date().toISOString().split('T')[0]} disabled={!checkInDate}/>
                </div>
                <div className="room-grid">
                  {roomsData?.map((room) => (
                    <div className="room" key={room.name}>
                      <RoomCarousel images={room.images?.filter(e=> e!==null)} roomName={room.name}/>
                      <h3>{room.name}</h3>
                      <p>{room.description}</p>
                      {/* <p className={`availability-message ${room.available ? 'available' : 'unavailable'}`}>
                        {room.available ? 'Available' : 'Not Available'}
                      </p> */}
                      <p className="room-price">N{room.price}/night</p>
                      <button className="book-button" onClick={() => handleBooking(room.name)}>
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
const RoomCarousel = ({ images, roomName }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
      setCurrentImageIndex(prev => (prev + 1) % images.length)
  }

  const prevImage = () => {
      setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length)
  }

  if (!images || images.length === 0) return null

  return (
      <div className='room-carousel'>
          <button onClick={prevImage} disabled={images.length <= 1}>{'<'}</button>
          <img src={images[currentImageIndex]} alt={`${roomName} image ${currentImageIndex + 1}`} width={200}/>
          <button onClick={nextImage} disabled={images.length <= 1}>{'>'}</button>
      </div>
  )
}
export default Rooms;