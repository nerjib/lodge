// Payment.js (Frontend)
import React, { useState, useEffect } from 'react';
import { useLocation, useMatch, useNavigate, useSearchParams } from 'react-router-dom';
import { baseUrl } from './services/config';
import PaystackPop from '@paystack/inline-js'
import { currencyFormatter } from '../utils/helpers';
const popup = new PaystackPop()

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // const [searchParams] = useSearchParams();
    // const bookingId = searchParams.get('id');
    const match = useMatch("/payment/:id");
    const bookingId = match ? match.params.id : "";
    const [bookingData, setBookingData] = useState(null);
    const [paymentError, setPaymentError] = useState(null);
    const [roomsData, setRoomsData] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null); // Add error state
    const [paymentSummary, setPaymentSummary] = useState({roomCost: 0, cautionFee: 0, discount: 0, total: 0});

    // useEffect(() => {
    //     if (!location.state || !location.state.totalAmount || !location.state.bookingData) {
    //         navigate('/rooms');
    //         return;
    //     }

    //     setBookingData(location.state.bookingData);
    // }, [location, navigate]);

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

    useEffect(() => {
        const fetchRoomData = async () => {
            console.log({bookingId})
            try {
                const response = await fetch(`${baseUrl}/api/v1/lodge/bookings/${bookingId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setBookingData(data[0]);
            } catch (err) {
                console.error('Error fetching room data:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };
      
        fetchRoomData();
      }, [bookingId]);

    const handlePayment = async () => {
        setPaymentError(null)
        try {
            const response = await fetch(`${baseUrl}/api/v1/lodge/initialize`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: paymentSummary?.total * 100, // Amount in kobo/cents
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
                amount: paymentSummary.total * 100,
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
                            body: JSON.stringify({ reference: response.reference, booking_id: bookingId, ...bookingData }),
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

    useEffect(() => {
        const totalAmount = roomsData.filter(room => bookingData?.room_types?.includes(room.name)).reduce((acc, room) => acc + room.price, 0);
        const nights = Math.ceil((new Date(bookingData?.check_out) - new Date(bookingData?.check_in)) / (1000 * 60 * 60 * 24));
        const roomCost = totalAmount * nights;
        const cautionFee = bookingData?.room_types?.length * 20000;
        let discount =0;
        if(nights > 3 || bookingData?.room_types.length > 3){
            discount = roomCost * 0.2;
        }
        const total = roomCost + cautionFee - discount;
        setPaymentSummary({roomCost, cautionFee, discount, total});
      }, [bookingData]);

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
                <p>Rooms: {bookingData?.room_types?.join(', ')}</p>
                <p>Check-in: {new Date(bookingData.check_in).toISOString().split('T')[0]}</p>
                <p>Check-out: {new Date(bookingData.check_out).toISOString().split('T')[0]}</p>
                <p>Number of Nights: {Math.ceil((new Date(bookingData.check_out) - new Date(bookingData.check_in)) / (1000 * 60 * 60 * 24))}</p>
            </div>
            <div className="mb-4 bg-gray-100 p-4 rounded">
                <h3 className="font-semibold mb-2">Payment Summary</h3>
                <p>Rooms Cost: {currencyFormatter(paymentSummary.roomCost)}</p>
                <p>Caution Fee: {currencyFormatter(paymentSummary.cautionFee)}</p>
                <p>Discount: {currencyFormatter(paymentSummary.discount)}</p>
                <p>Total Amount: {currencyFormatter(paymentSummary.total)}</p>
            </div>
            {bookingData?.is_paid ? '' : <button onClick={handlePayment} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">Pay with Paystack</button>}
        </div>
    );
};

export default Payment;