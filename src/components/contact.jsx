// Contact.js
import React from 'react';

function Contact() {
  return (
    <div className="contact-page container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>
      <div className="contact-content grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="contact-info bg-white p-6 rounded-lg shadow-md md:col-span-2"> {/* Make contact info span both columns on medium screens and up */}
          <h3 className="text-xl font-semibold mb-4">Tranquility Lodge</h3>
          <p className="mb-2">No 6, Apo Road</p>
          <p className="mb-2">New Millenium City, Kaduna</p>
          <p className="mb-2">Phone: (234) 123-4567</p>
          <p className="mb-2">Email: info@tranquilitylodge.com.ng</p>
          <div className='mt-4'>
            <a href="mailto:info@tranquilitylodge.com.ng" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
              Send Email
            </a>
            <a href="tel:123-4567" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;