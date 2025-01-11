// BookingConfirmation.js
import React from 'react';
import { Link } from 'react-router-dom';

const BookingConfirmation = () => {
    return (
        <div className="container mx-auto p-4">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-green-600 mb-4">Booking Confirmed!</h2>
                <p className="text-gray-700 mb-6">Thank you for your booking. We look forward to welcoming you to Tranqulity Lodge.</p>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Booking Details:</h3>
                    {/* You can retrieve booking details from local storage or context if needed */}
                    {/* Example: */}
                    {/* <p>Booking ID: {bookingId}</p> */}
                    {/* <p>Check-in Date: {checkInDate}</p> */}
                    {/* <p>Check-out Date: {checkOutDate}</p> */}
                </div>

                <div className="flex justify-center">
                  <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Back to Home
                  </Link>
                </div>
            </div>
        </div>
    );
};

export default BookingConfirmation;