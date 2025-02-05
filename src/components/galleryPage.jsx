import React, { useEffect, useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { baseUrl } from './services/config';
import gal1 from '../assets/gallery/gal1.jpg'
import gal2 from '../assets/gallery/gal2.jpg'
import gal3 from '../assets/gallery/gal3.jpg'
import gal4 from '../assets/gallery/gal4.PNG'
import gal5 from '../assets/gallery/gal5.jpg'
import gal6 from '../assets/gallery/gal6.jpg'
import gal7 from '../assets/gallery/gal7.jpg'
import gal8 from '../assets/gallery/gal8.jpg'
import gal9 from '../assets/gallery/gal9.jpg'
import gal10 from '../assets/gallery/gal10.jpg'
import gal11 from '../assets/gallery/gal11.jpg'
import gal12 from '../assets/gallery/gal12.jpg'
import gal13 from '../assets/gallery/gal13.jpg'
import gal14 from '../assets/gallery/gal14.jpg'



const GalleryPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [roomsData, setRoomsData] = useState([]); // Initialize as an empty array
  

  // Replace with your gallery images
  const images = [gal1, gal2, gal3, gal4, gal5, gal6, gal7, gal8, gal9, gal10, gal11, gal12, gal13, gal14

  ];

  const openLightbox = (index) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  useEffect(() => {
        const fetchRoomData = async () => {
            try {
              let response;
                  response = await fetch(`${baseUrl}/api/v1/lodge/rooms`);
                
                const data = await response.json();
                setRoomsData(data);
            } catch (err) {
                console.error('Error fetching room data:', err);
            } finally {
            }
        };
  
        fetchRoomData();
    }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-md cursor-pointer transform hover:scale-105 transition-transform duration-300"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300"></div>
            </div>
          ))}
        </div>

        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={closeLightbox}
            onMovePrevRequest={() =>
              setPhotoIndex((photoIndex + images.length - 1) % images.length)
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % images.length)
            }
          />
        )}
      </div>
    </div>
  );
};

export default GalleryPage;