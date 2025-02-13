import React, { useEffect, useState } from 'react';
import './App.css'; 
import { AirOutlined, CleaningServices, Dining, Discount, Event, EventSeat, Iron, Kitchen, ParkOutlined, People, Security, SolarPower, Tv, Water, Wifi } from '@mui/icons-material';
import { icon } from '@fortawesome/fontawesome-svg-core';



const Amenities = () => {
  const amenities =[
    {
      item: 'Free Wi-FI',
      icon: <Wifi style={{ color: '#A86A00', height: '50px', width: '50px'}} />
    },
    {
      item: '24/7 Electricity (Inverter & Generator)',
      icon: <SolarPower style={{ color: '#A86A00', height: '50px', width: '50px'}} />
    },
    {
      item: 'Complimentary Breakfast',
      icon: <Dining style={{ color: '#A86A00', height: '50px', width: '50px'}} />
    },
    {
      item: 'Event Space for Small Gathering',
      icon: <People style={{ color: '#A86A00', height: '50px', width: '50px'}} />
    },
    {
      item: 'Smart Tv',
      icon: <Tv style={{ color: '#A86A00', height: '50px', width: '50px'}} />
    },
    {
      item: 'Netflix',
      icon: <Tv style={{ color: '#A86A00', height: '50px', width: '50px'}} />
    },
    {
      item: 'Mini Fridge',
      icon: <Kitchen style={{ color: '#A86A00', height: '50px', width: '50px'}}/>
    },
    {
      item: 'Laundary Service',
      icon: <Iron style={{ color: '#A86A00', height: '50px', width: '50px'}} />
    },
    {
      item: 'House Keeping',
      icon: <CleaningServices style={{ color: '#A86A00', height: '50px', width: '50px'}} />
    },
    
    {
      item:'Parking Space',
      icon: <ParkOutlined style={{ color: '#A86A00', height: '50px', width: '50px'}} />
    },
    {
      item: '4/7 Security',
      icon: <Security style={{ color: '#A86A00', height: '50px', width: '50px'}}/>
    },
    {
      item:'Fully Equipped Kitchen',
      icon: <Kitchen style={{ color: '#A86A00', height: '50px', width: '50px'}} />
    },
    {
      item: 'Inhouse Chefs',
      icon: <Dining style={{ color: '#A86A00', height: '50px', width: '50px'}} />
    },
    {
      item: 'Discount available for longer stay',
      icon: <Discount style={{ color: '#A86A00', height: '50px', width: '50px'}} />
    },
    {
      item:'Air Conditioned Rooms',
      icon: <AirOutlined style={{ color: '#A86A00', height: '50px', width: '50px'}} />
    },
    {
      item:'Indoor/Outdoor Relaxation Area',
      icon: <EventSeat style={{ color: '#A86A00', height: '50px', width: '50px'}} />
    }
  ]

  return (
    <div className="app-container">
      <main>
          <section className="content-section">
            <h2 className="text-xl font-bold text-center mb-8">Our Amenities</h2>

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