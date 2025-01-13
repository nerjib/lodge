// Contact.js
import React from 'react';
import Feedback from './feedback';

function Contact() {
  return (
    <div className="contact-page container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>
      <div className="contact-content grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="contact-info bg-white p-6 rounded-lg shadow-md md:col-span-2"> {/* Make contact info span both columns on medium screens and up */}
          <h3 className="text-3xl font-semibold mb-4">Tranquility Lodge</h3>
          <p className="mb-2 text-xl">No 6, Apo Road</p>
          <p className="mb-2 text-xl">New Millenium City, Kaduna</p>
          <p className="mb-2 text-xl">Phone: (234) 810-1032-153</p>
          <p className="mb-2 text-xl">Email: info@tranquilitylodgekd.com</p>
          <div className='mt-4'>
            <a href="mailto:info@tranquilitylodge.com.ng" className="bg-blue-500 text-xl hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
              Send Email
            </a>
            <a href="tel:+2348101032153" className="bg-green-500 text-xl hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Call Us
            </a>
          </div>
        </div>
      </div>
      <Feedback />
    </div>
  );
}

export default Contact;