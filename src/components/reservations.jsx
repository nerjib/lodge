import React, { useState } from 'react';
import './index.css';

const ReservationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    roomType: '',
    specialRequests: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend or booking system
    console.log('Reservation submitted:', formData);
    alert('Reservation Submitted (Check console for details)');
    // Reset the form after submission (optional)
    setFormData({
        name: '',
        email: '',
        phone: '',
        checkIn: '',
        checkOut: '',
        guests: 1,
        roomType: '',
        specialRequests: '',
      });
  };

  return (
    <div className="reservation-page">
      <h2>Make a Reservation</h2>
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
          <input type="date" id="checkIn" name="checkIn" value={formData.checkIn} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="checkOut">Check-out Date:</label>
          <input type="date" id="checkOut" name="checkOut" value={formData.checkOut} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="guests">Number of Guests:</label>
          <input type="number" id="guests" name="guests" value={formData.guests} onChange={handleChange} min="1" required/>
        </div>
        <div className="form-group">
          <label htmlFor="roomType">Room Type:</label>
          <select id="roomType" name="roomType" value={formData.roomType} onChange={handleChange} required>
            <option value="">Select a room type</option>
            <option value="standard">Standard Room</option>
            <option value="deluxe">Deluxe Suite</option>
            <option value="family">Family Suite</option>
          </select>
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