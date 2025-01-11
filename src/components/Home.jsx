import React, { useEffect, useState } from 'react';
import './App.css'; 

import { baseUrl } from './services/config';
import { hideLoader } from '../utils/loader';




const Home = () => {
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

// if (loading) return <div>Loading...</div>
// if (error) return <div>Error: {error.message}</div>

  return (
    <div className="app-container">
      <main>
          <section className="content-section">
            <div className="hero-carousel z-0">
              {/* <div className="carousel-slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {heroContent?.map((item, index) => (
                  <div className="carousel-item" key={index}>
                      <img src={item.image} alt={item.title} />
                      <div className="carousel-caption">
                          <h1>{item.title}</h1>
                          <p>{item.description}</p>
                      </div>
                  </div>
              ))}
              </div> */}
              <div className="hero-carousel relative h-[60vh] w-full overflow-hidden"> {/* Added relative for absolute positioning */}
                <div className="carousel-inner h-full w-full transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                    {heroContent.map((item, index) => (
                        <div className="carousel-item relative h-full w-full flex-shrink-0" key={index}>
                            <img src={item.image} alt={item.title} className="object-cover w-full h-full" />
                            <div className="carousel-caption absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white p-8 bg-black/50 rounded-lg">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{item.title}</h1>
                                <p className="text-lg md:text-xl">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
              {/* <div className="carousel-dots">
                {heroContent.map((_, index) => (
                  <div
                    key={index}
                    className={`carousel-dot ${currentSlide === index ? 'active' : ''}`}
                    onClick={() => goToSlide(index)}
                  ></div>
                ))}
              </div> */}
            </div>
            <div className="home-content"> {/* Added container for home page content */}
                  {/* <section className="welcome-section">
                    <h2>Welcome to Tranquility Lodge</h2>
                    <p>Nestled in the heart of Kaduna Millenium City, Tranquility Lodge offers an unforgettable escape from the everyday. Our cozy lodge provides the perfect blend of rustic charm and modern amenities, ensuring a relaxing and rejuvenating stay.</p>
                    <p>Whether you're seeking adventure on the trails, a peaceful retreat by the fire, or simply a breathtaking view from your window, you'll find it all here. Our dedicated staff is committed to providing exceptional service and creating a memorable experience for each of our guests.</p>
                  </section> */}
                  <section className='welcome-section'>
                    <h2>{welcome?.title}</h2>
                    {/* {homeContent?.welcome[0]?.content.map((p, index) => <p key={index}>{p}</p>)} */}
                    <p>{welcome?.paragraph} </p>
                  </section>

                  <section className="featured-experiences">
                    <h2>Featured Experiences</h2>
                    <div className='experience-grid'>
                        {homeContent?.experience?.map(exp => (
                            <div className='experience' key={exp.title}>
                                <img src={exp.image} alt={exp.title} />
                                <h3>{exp.title}</h3>
                                <p>{exp.paragraph}</p>
                            </div>
                        ))}
                    </div>
                  </section>

                  <section className="testimonials">
                    <h2>What Our Guests Say</h2>
                    <div className='testimonial-grid'>
                        {homeContent?.testimonials?.map(test => (
                            <div className='testimonial' key={test.author}>
                                <p>{test.description} - {test.author}</p>
                            </div>
                        ))}
                    </div>
                  </section>
                </div>

          </section>          
                 
      </main>
    </div>
  );
};

export default Home;