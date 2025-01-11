import React, { useEffect, useState } from 'react';
import './index.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { baseUrl } from './services/config';
import { httpGet, httpPost } from './services/http';
import Swal from 'sweetalert2';

const ReservationPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // Get URL parameters
  const roomName = searchParams.get('room'); // Get the room parameter
    const checkIn = searchParams.get('checkIn')
    const checkOut = searchParams.get('checkOut')
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        checkIn: checkIn || '',
        checkOut: checkOut || '',
        guests: 1,
        roomTypes: [], // Initialize as an array
        specialRequests: '',
    });

const [roomsData, setRoomsData] = useState([]); // Initialize as an empty array
const [loading, setLoading] = useState(true); // Add loading state
const [error, setError] = useState(null); // Add error state

const handleAvailabilityCheck = async(roomType) => {
  if (!formData.checkIn || !formData.checkOut) return Swal.fire('Checkin and Checkout dates must be selected!')
    // Swal.fire('Checking room availalability')
  const res = await httpGet(`/api/v1/lodge/rooms/availability/${roomType}/${formData.checkIn}/${formData.checkOut}`)
  let avail = false;
  if (res.status){
    avail = res?.isAvalable;
  }
  return avail;
}

const handleChange = async (e) => {
  const { name, value, type, checked } = e.target;
  if (name === 'checkIn') {
    if ( new Date(value)>= new Date(formData?.checkOut)){
      return Swal.fire('Check out date must be after check in date')
  }
  }
  if (name === 'checkOut') {
    if ( new Date(value) <= new Date(formData?.checkIn)){
      return Swal.fire('Check out date must be after check in date')
  }
  }
  if (name === 'roomTypes') {
    const avail = await handleAvailabilityCheck(value);
    if (!avail) return Swal.fire(`${value} is not available for the dates selected!` );
  }
  setFormData(prevFormData => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? (checked ? [...prevFormData[name], value] : prevFormData[name].filter(item => item !== value)) : value
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
      // const response = await fetch(`${baseUrl}/api/v1/lodge/bookings`, {
      //     method: 'POST',
      //     headers: {
      //         'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(formData),
      // });

      // if (!response.ok) {
      //     const errorData = await response.json();
      //     throw new Error(errorData.message || 'Booking failed');
      // }
    const res = await httpPost('/api/v1/lodge/booking', formData)
    const totalAmount = roomsData.filter(room => formData.roomTypes.includes(room.name)).reduce((acc, room) => acc + room.price, 0);
    if (res?.status && res?.data[0]?.booking_id) {
      // Swal.fire('Successful', 'Invoice and payment link has been sent to your email', 'Done')
      navigate('/payment', { state: { bookingData: {...formData, booking_id: res?.data?.booking_id} , totalAmount: totalAmount } });
    }
  } catch (error) {
      console.error('Booking error:', error);
      Swal.fire('Oops!', 'Booking Error!', 'error')
  }
};

useEffect(() => {
  const fetchRoomData = async () => {
      try {
          const response = await fetch(`${baseUrl}/api/v1/lodge/rooms`);
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
}, []);


  // useEffect(() => {
  //   // Update roomType if the URL parameter changes
  //   setFormData(prevFormData => ({ ...prevFormData, roomType: roomName || '' }));
  // }, [roomName]);
  return (
    <div className="reservation-page">
      <h2>Make a Reservation</h2>
      {roomName && <h3>You are booking: {roomName}</h3>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="form-group">
                    <label htmlFor="checkIn">Check-in Date:</label>
                    <input
                        type="date"
                        id="checkIn"
                        name="checkIn"
                        value={formData.checkIn}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split('T')[0]} // Disable past dates
                        // disabled
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="checkOut">Check-out Date:</label>
                    <input
                        type="date"
                        id="checkOut"
                        name="checkOut"
                        value={formData.checkOut}
                        onChange={handleChange}
                        required
                        min={formData.checkIn || new Date().toISOString().split('T')[0]}
                        // disabled
                    />
                </div>
        <div className="form-group">
          <label htmlFor="guests">Number of Guests:</label>
          <input type="number" id="guests" name="guests" value={formData.guests} onChange={handleChange} min="1" required/>
        </div>
        <div className="form-group">
          <label>Room Types:</label>
          <div>
          {roomsData.map((room) => (
            <label>
            <input type="checkbox" name="roomTypes" value={room?.name}
              checked={formData.roomTypes.includes(room?.name)}
              onChange={handleChange}
              // disabled={roomName !== null && roomName !== room?.name}
            />
              {room?.name}
            </label>
            ))}
              {/* <label>
                  <input type="checkbox" name="roomTypes" value="Standard Room" checked={formData.roomTypes.includes('Standard Room')} onChange={handleChange} disabled={roomName !== null && roomName !== 'Standard Room'}/>
                  Standard Room
              </label>
              <label>
                  <input type="checkbox" name="roomTypes" value="Deluxe Suite" checked={formData.roomTypes.includes('Deluxe Suite')} onChange={handleChange} disabled={roomName !== null && roomName !== 'Deluxe Suite'}/>
                  Deluxe Suite
              </label>
              <label>
                  <input type="checkbox" name="roomTypes" value="Family Suite" checked={formData.roomTypes.includes('Family Suite')} onChange={handleChange} disabled={roomName !== null && roomName !== 'Family Suite'}/>
                  Family Suite
              </label> */}
          </div>
      </div>
        <div className="form-group">
          <label htmlFor="specialRequests">Special Requests:</label>
          <textarea id="specialRequests" name="specialRequests" value={formData.specialRequests} onChange={handleChange}></textarea>
        </div>
        <button type="submit">Submit Reservation</button>
      </form>
    </div>
  );
};

export default ReservationPage;