import React, { useState } from 'react';
import { baseUrl } from './services/config';

const Feedback = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'error', null

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmissionStatus('pending'); // Set status to pending during submission

        try {
            const response = await fetch(`${baseUrl}/api/v1/lodge/feedback`, { // Your backend API endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setFormData({ name: '', email: '', message: '' }); // Clear the form
                setSubmissionStatus('success');
            } else {
                const errorData = await response.json()
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
            setSubmissionStatus('error');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className=" text-black font-bold mb-4 header3">Leave us a feedback</h2>
            <p className="text-sm mb-4">
            We value your feedback and are here to assist with any inquiries or requests. Whether you need information, have special requirements, or want to share your experience, our team is eager to hear from you and ensure your stay is exceptional. Contact us today!
            </p>

            {submissionStatus === 'success' && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">Success!</strong>
                    <span className="block sm:inline">Your feedback has been submitted. Thank you!</span>
                </div>
            )}

            {submissionStatus === 'error' && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">Error!</strong>
                    <span className="block sm:inline">There was an error submitting your feedback. Please try again later.</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border rounded w-full py-2 px-3"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border rounded w-full py-2 px-3"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message:</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="border rounded w-full py-2 px-3 h-32"
                        required
                    ></textarea>
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full disabled:opacity-50 disabled:cursor-not-allowed" disabled={submissionStatus === 'pending'}>
                    {submissionStatus === 'pending' ? 'Submitting...' : 'Submit Feedback'}
                </button>
            </form>
        </div>
    );
};

export default Feedback;