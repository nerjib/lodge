// Contact.js
import React from 'react';
import Feedback from './feedback';
import { Email, Instagram, MyLocation, Phone, Place } from '@mui/icons-material';

function Contact() {
  return (
    <div className=" container mx-auto px-4 py-8">
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      <div className='mx-5'>
        <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
      <div className="contact-content grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="contact-info bg-white p-6 rounded-lg shadow-md md:col-span-2"> {/* Make contact info span both columns on medium screens and up */}
          <h3 className="text-3xl font-semibold mb-4 header3">Tranquility Lodge</h3>
          <p className="mb-2 text-sm"><Place style={{ color: '#A86A00'}} /> No 6, Apo Road,</p>
          <p className="mb-2 text-sm px-3 mx-4">New Millenium City, Kaduna</p>
          <p className="mb-2 text-sm"><Phone  style={{ color: '#A86A00'}} /> (234) 810-1032-153</p>
          <p className="mb-2 text-sm"><Email  style={{ color: '#A86A00'}} /> info@tranquilitylodgekd.com</p>
          <p className='mb-2 text-sm'><Instagram style={{ color: '#A86A00'}}/> @tranquilitylodgekd</p>
          <div className='mt-4'>
            <a href="mailto:info@tranquilitylodgekd.com" className="bg-white-500 border  text-xl hover:bg-white-700 text-gray-900 font-bold py-2 px-4 rounded mr-2 contact-label">
              Send Email
            </a>
            <a href="tel:+2348101032153" className="bg-white-500 border text-xl hover:bg-white-700 text-gray-900 font-bold py-2 px-4 rounded contact-label">
              Call Us
            </a>
          </div>
        </div>
      </div>
      </div>
      <div className='mx-'>
      <Feedback />
      </div>
    </div>
    </div>
  );
}

export default Contact;