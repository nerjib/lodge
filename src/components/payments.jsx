// Payment.js (Frontend)
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { baseUrl } from './services/config';
import PaystackPop from '@paystack/inline-js'
const popup = new PaystackPop()

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [bookingData, setBookingData] = useState(null);
    const [paymentError, setPaymentError] = useState(null);

    useEffect(() => {
        if (!location.state || !location.state.totalAmount || !location.state.bookingData) {
            navigate('/rooms');
            return;
        }

        setBookingData(location.state.bookingData);
    }, [location, navigate]);

    const handlePayment = async () => {
        setPaymentError(null)
        try {
            const response = await fetch(`${baseUrl}/api/v1/lodge/initialize`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: location.state.totalAmount * 100, // Amount in kobo/cents
                    email: bookingData.email, // Ensure email is available
                }),
            });

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log({ddd: data.data.access_code})
            popup.resumeTransaction(data?.data?.access_code)

            // Open Paystack popup
            PaystackPop?.setup({
                key: 'pk_test_968344b49a2a225c36d0a5132344792a8719da75', // Replace with your public key
                email: bookingData.email,
                amount: location.state.totalAmount * 100,
                ref: data.data.reference,
                onClose: () => {
                    alert('Window closed.');
                },
                callback: async (response) => {
                    try {
                        const verifyResponse = await fetch(`${baseUrl}/api/v1/lodge/verify`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ reference: response.reference, ...bookingData }),
                        });

                        if (!verifyResponse.ok) {
                            const errorData = await verifyResponse.json()
                            throw new Error(errorData.message || `HTTP error! status: ${verifyResponse.status}`);
                        }

                        navigate('/booking-confirmation'); // Redirect on successful payment and verification
                    } catch (error) {
                        console.error("Verification error:", error);
                        setPaymentError(error.message || "An error occurred during verification.")
                    }
                },
            });
            // handler.openIframe();
        } catch (error) {
            console.error('Payment initialization error:', error);
            setPaymentError(error.message || "An error occurred during payment initialization.")
        }
    };

    if (!bookingData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Payment</h2>
             {paymentError && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline">{paymentError}</span>
            </div>}
            <div className="mb-4 bg-gray-100 p-4 rounded">
                <h3 className="font-semibold mb-2">Your Booking</h3>
                <p>Rooms: {bookingData?.roomTypes?.join(', ')}</p>
                <p>Check-in: {bookingData.checkIn}</p>
                <p>Check-out: {bookingData.checkOut}</p>
                <p>Total Amount: ${location.state.totalAmount}</p>
            </div>
            <button onClick={handlePayment} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">Pay with Paystack</button>
        </div>
    );
};

export default Payment;