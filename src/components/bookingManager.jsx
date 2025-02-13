// BookingManager.js
import React, { useState, useEffect } from 'react';
import { baseUrl } from './services/config';

const BookingManager = ({ onClose }) => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetch(`${baseUrl}/api/v1/lodge/bookings`)
            .then(res => res.json())
            .then(data => setBookings(data));
    }, []);

    const handleDeleteBooking = (id) => {
        fetch(`${baseUrl}/api/v1/lodge/bookings/${id}`, { method: 'DELETE' })
            .then(() => setBookings(bookings.filter(booking => booking.id !== id)));
    };

    return (
        <div className="booking-manager">
            <h2>Manage Bookings</h2>
            <button onClick={onClose}>Close</button>
            {bookings.length === 0 ? (
                <p>No bookings yet.</p>
            ) : (
                <table
                className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'
                >
                    <thead
                    className='text-xs w-1/2 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'
                    >
                        <tr>
                            <th scope="col" className="px-6 py-3">ID</th>
                            <th scope="col" className="px-6 py-3">Room Types</th>
                            <th scope="col" className="px-6 py-3">Check-in</th>
                            <th scope="col" className="px-6 py-3">Check-out</th>
                            <th scope="col" className="px-6 py-3">Payment Status</th>
                            <th scope="col" className="px-6 py-3">Booking Status</th>
                            <th scope="col" className="px-6 py-3">Paid Amount</th>
                            <th scope="col" className="px-6 py-3">Discount</th>

                            {/* Add other relevant table headers */}
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(booking => (
                            <tr key={booking.id}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                                <td className="px-6 py-4">{booking?.id}</td>
                                <td className="px-6 py-4">{booking?.room_types?.join(', ')}</td>
                                <td className="px-6 py-4">{booking?.check_in}</td>
                                <td className="px-6 py-4">{booking?.check_out}</td>
                                <td className="px-6 py-4">{booking?.status ?? 'pending'}</td>
                                <td className="px-6 py-4">{booking?.booking_status}</td>
                                <td className="px-6 py-4">{booking?.amount ?? 'Nill' }</td>
                                <td className="px-6 py-4">{booking?.discount}</td>

                                {/* Add other relevant table data */}
                                <td className="px-6 py-4">
                                    <button 
                                        className='focus:outline-none my-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                                    onClick={() => handleDeleteBooking(booking.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default BookingManager;