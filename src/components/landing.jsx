import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { hideLoader } from '../utils/loader';
import { baseUrl } from './services/config';
import gal2 from '../assets/gallery/gal2.jpg'
import { Dining, SolarPower, Wifi } from '@mui/icons-material';


const LandingPage = () => {
  const [data, setData] = useState(null);
  const [heroContent, setHeroContent] = useState([])
    const [currentSlide, setCurrentSlide] = useState(0);
    const [homeContent, setHomeContent] = useState([])
    const [welcome, setWelcome]= useState([]);
    const [testimony, setTestimony] = useState([]);
    const [experience, setExperience] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
  
  
  useEffect(() => {
    const fetchHeroContent = async () => {
        try {
            const res = await fetch(`${baseUrl}/api/v1/lodge/hero`);
            if (!res.ok) throw new Error(`status: ${res.status}`)
            const data = await res.json()
            setHeroContent(data[0]?.content)
        } catch (error) {
            console.error('Error fetching hero data', error)
        }
    }
  
    fetchHeroContent()
  }, [])
  
  useEffect(() => {
    const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % heroContent.length);
    }, 5000); // Change slide every 5 seconds
  
    return () => clearInterval(interval); // Clear interval on unmount
  }, [heroContent]);
  
    const goToSlide = (index) => {
      setCurrentSlide(index);
    };
    useEffect(() => {
      const fetchHomeContent = async () => {
        // showLoader();
          try {
              const res = await fetch(`${baseUrl}/api/v1/lodge/home`)
              if (!res.ok) throw new Error(`status: ${res.status}`)
              const data = await res.json()
              console.log({ jjjjj: data.data?.welcome})
              setHomeContent(data.data);
              setWelcome(data?.data?.welcome[0] ?? [])
          } catch (error) {
              console.error('Error fetching home data', error)
              setError(error)
          } finally{
              setLoading(false)
              hideLoader();
          }
      }
  
      fetchHomeContent()
  }, [])

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Menu */}
      {/* <nav className="bg-white shadow">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">{data?.name}</h1>
          <div className="flex space-x-4">
            <a href="#hero" className="text-gray-800 hover:text-gray-600">Home</a>
            <a href="#about" className="text-gray-800 hover:text-gray-600">About</a>
            <a href="#services" className="text-gray-800 hover:text-gray-600">Services</a>
            <a href="#testimonials" className="text-gray-800 hover:text-gray-600">Testimonials</a>
            <a href="#contact" className="text-gray-800 hover:text-gray-600">Contact</a>
          </div>
        </div>
      </nav> */}

      {/* Hero Section - Carousel */}
      <section id="hero" className="relative h-screen">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          loop
          className="w-full h-full"
        >
          {heroContent?.map((data, index) => (
            <SwiperSlide key={index}>
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${data?.image})` }}
              >
                <div className="container mx-auto px-6 py-20 text-center">
                <p className="text-xl text-white mb-8"
                    style={{
                        display: 'block',
                        letterSpacing: '3px',
                        margin:'0 0 10px 0',
                        color: '#A86A00',
                        fontWeight: '600',
                        fontSize: '.875em'
                    }}
                >{data?.description.toUpperCase()}</p>
                  <h1 className="text-4xl font-bold text-white mb-4 my-4"
                    style={{
                        fontSize: '2.25rem',
                        margin:'30px 0 30px 0',
                        fontWeight: '600',
                        
                    }}
                  ></h1>
                  <a href="#rooms" className="bg-white text-gray-800 my-5 mx-2 px-6 py-3 rounded-full font-semibold hover:bg-gray-200">
                    Explore More
                  </a>
                  <a href="#reservation" className="bg-white text-gray-800 my-5 mx-2 px-6 py-3 rounded-full font-semibold hover:bg-gray-200">
                    Book Now
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* <section id="about" className="container mx-auto px-6 py-16">
        <h2 className="header2">Featured Experiences</h2>
        <div className='experience-grid'>
            {homeContent?.experience?.map(exp => (
                <div className='experience' key={exp.title}>
                    <img src={exp.image} alt={exp.title} />
                    <h3 className='text-2xl'>{exp.title}</h3>
                    <p className="text-sm">{exp.paragraph}</p>
                </div>
            ))}
        </div>
      </section> */}
      {/* About Section */}
      <section id="about" className="mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div>
            <img src={gal2} alt="About Us" className="rounded-lg shadow-md" />
          </div>
          <div className='my-5'>
          <h2 className="font-bold text-start mb-8 my-2"
            style={{
                display: 'block',
                letterSpacing: '3px',
                margin:'0 0 10px 0',
                color: '#A86A00',
                fontWeight: '600',
                fontSize: '.875em'
            }}
          >ABOUT US</h2>
            <h2 className="about-header my-2"
            
                style={{
                    color: '#333',
                    fontWeight: '700',
                    letterSpacing: '-.03em',
                    fontSize: '2.375rem',
                    marginBottom: '15px',
                }}
            >
                Welcome to Tranquility Lodge Kaduna
            </h2>
            <p className="text-sm">A home away from home</p>
            <p className="text-sm">A seven bedroom apartment and a studio apartment that can be booked for short or longs stays, events and gatherings with fully equipped kitchen, laundry and fully furnished bedrooms and living rooms Nestled in the heart of Kaduna Millenium City, Tranquility lodge offers an unforgettable escape. Our cozy lodge provides the perfect blend of rustic charm and modern amenities, ensuring a relaxing and rejuvenating stay.
            Whether you're seeking adventure or a getaway, staycation, intimate gathering, you'll find it all here. Our dedicated staff are committed to providing exceptional service and creating a memorable experience for each of our guests.</p>
            <p className="text-gray-600"></p>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section id="services" className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="header2">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {homeContent?.experience?.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                  {service?.title.includes('Wi-Fi') ? <Wifi />
                  : service?.title.includes('breakfast') ? <Dining />
                  :service?.title.includes('Electricity') ? <SolarPower />
                : ''}
                <h3 className="text-xl font-semibold text-gray-800 header3">{service.title}</h3>
                <p className="text-gray-600">{service.paragraph}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="container mx-auto px-6 py-16">
        <h2 className="header2">What Our Guests Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {homeContent?.testimonials?.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600 mb-4">"{testimonial.description}"</p>
              <p className="text-gray-800 font-semibold">- {testimonial.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="header2">Contact Us</h2>
          <form className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <div className="mb-4">
              <label className="block text-gray-800 mb-2">Name</label>
              <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 mb-2">Email</label>
              <input type="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 mb-2">Message</label>
              <textarea className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" rows="4"></textarea>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">Send Message</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;