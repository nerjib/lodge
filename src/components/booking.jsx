import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookingPage = () => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [roomType, setRoomType] = useState('standard');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Booking confirmed for ${guests} guests in a ${roomType} room from ${checkInDate.toDateString()} to ${checkOutDate.toDateString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Book Your Stay</h2>
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
          {/* Check-In Date */}
          <div className="mb-6">
            <label className="block text-gray-800 mb-2">Check-In Date</label>
            <DatePicker
              selected={checkInDate}
              onChange={(date) => setCheckInDate(date)}
              minDate={new Date()}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholderText="Select check-in date"
            />
          </div>

          {/* Check-Out Date */}
          <div className="mb-6">
            <label className="block text-gray-800 mb-2">Check-Out Date</label>
            <DatePicker
              selected={checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
              minDate={checkInDate || new Date()}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholderText="Select check-out date"
            />
          </div>

          {/* Number of Guests */}
          <div className="mb-6">
            <label className="block text-gray-800 mb-2">Number of Guests</label>
            <input
              type="number"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              min="1"
              max="10"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Room Type */}
          <div className="mb-6">
            <label className="block text-gray-800 mb-2">Room Type</label>
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="standard">Standard Room</option>
              <option value="deluxe">Deluxe Room</option>
              <option value="suite">Suite</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;