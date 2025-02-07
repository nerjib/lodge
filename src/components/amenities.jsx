import React, { useEffect, useState } from 'react';
import './App.css'; 
import { AirOutlined, CleaningServices, Dining, Discount, Event, EventSeat, Iron, Kitchen, ParkOutlined, People, Security, SolarPower, Tv, Water, Wifi } from '@mui/icons-material';
import { icon } from '@fortawesome/fontawesome-svg-core';



const Amenities = () => {
  const amenities =[
    {
      item: 'Free Wi-FI',
      icon: <Wifi />
    },
    {
      item: '24/7 Electricity (Inverter & Generator)',
      icon: <SolarPower />
    },
    {
      item: 'Complimentary Breakfast',
      icon: <Dining />
    },
    {
      item: 'Event Space for Small Gathering',
      icon: <People />
    },
    {
      item: 'Smart Tv',
      icon: <Tv />
    },
    {
      item: 'Netflix',
      icon: <Tv />
    },
    {
      item: 'Mini Fridge',
      icon: <Kitchen/>
    },
    {
      item: 'Laundary Service',
      icon: <Iron />
    },
    {
      item: 'House Keeping',
      icon: <CleaningServices />
    },
    
    {
      item:'Parking Space',
      icon: <ParkOutlined />
    },
    {
      item: '4/7 Security',
      icon: <Security />
    },
    {
      item:'Fully Equipped Kitchen',
      icon: <Kitchen />
    },
    {
      item: 'Inhouse Chefs',
      icon: <Dining />
    },
    {
      item: 'Discount available for longer stay',
      icon: <Discount />
    },
    {
      item:'Air Conditioned Rooms',
      icon: <AirOutlined />
    },
    {
      item:'Indoor/Outdoor Relaxation Area',
      icon: <EventSeat />
    }
  ]

  return (
    <div className="app-container">
      <main>
          <section className="content-section">
            <h2 className='header2'>Our Amenities</h2>
           
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {amenities?.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                {service.icon}
                <p className="text-gray-600">{service.item}</p>
              </div>
            ))}
          </div>
        </div>
            <ul className='text-xl'>
             
             
            </ul>
          </section>
      </main>
    </div>
  );
};

export default Amenities;