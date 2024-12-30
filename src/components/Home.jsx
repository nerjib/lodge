import React, { useEffect, useState } from 'react';
import './App.css'; 
import img1 from '../assets/front1.jpg'
import img2 from '../assets/front2.jpg'
import img3 from '../assets/front3.jpg'
import img4 from '../assets/sitting1.jpg'




const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { image: img1, alt: 'Lodge View 1', caption: 'Breathtaking Mountain Views' },
    { image: img2, alt: 'Lodge View 2', caption: 'Cozy Fireplace in the Lobby' },
    { image: img3, alt: 'Lodge View 3', caption: 'Relaxing Outdoor Patio' },
  ];


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Clear interval on unmount
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };
  return (
    <div className="app-container">
      <main>
          <section className="content-section">
            <div className="hero-carousel">
              <div className="carousel-slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {slides.map((slide, index) => (
                  <div className="carousel-slide" key={index}>
                    <img src={slide.image} alt={slide.alt} />
                    <div className="slide-caption">{slide.caption}</div>
                  </div>
                ))}
              </div>
              <div className="carousel-dots">
                {slides.map((_, index) => (
                  <div
                    key={index}
                    className={`carousel-dot ${currentSlide === index ? 'active' : ''}`}
                    onClick={() => goToSlide(index)}
                  ></div>
                ))}
              </div>
            </div>
            <div className="home-content"> {/* Added container for home page content */}
                  <section className="welcome-section">
                    <h2>Welcome to Tranquility Lodge</h2>
                    <p>Nestled in the heart of Kaduna Millenium City, Tranquility Lodge offers an unforgettable escape from the everyday. Our cozy lodge provides the perfect blend of rustic charm and modern amenities, ensuring a relaxing and rejuvenating stay.</p>
                    <p>Whether you're seeking adventure on the trails, a peaceful retreat by the fire, or simply a breathtaking view from your window, you'll find it all here. Our dedicated staff is committed to providing exceptional service and creating a memorable experience for each of our guests.</p>
                  </section>

                  <section className="featured-experiences">
                    <h2>Featured Experiences</h2>
                    <div className="experience-grid">
                      {/* <div className="experience">
                        <img src="hiking.jpg" alt="Hiking" />
                        <h3>Hiking & Nature Trails</h3>
                        <p>Explore the stunning natural beauty of the surrounding mountains with our well-maintained hiking trails. From leisurely strolls to challenging climbs, there's a trail for every level.</p>
                      </div> */}
                      <div className="experience">
                        <img src={img4} alt="Relaxation" />
                        <h3>Relaxation & Wellness</h3>
                        <p>Unwind and rejuvenate in our tranquil setting. Enjoy a soothing massage, relax by the fireplace, or simply soak in the peaceful atmosphere.</p>
                      </div>
                      <div className="experience">
                        <img src={img4} alt="Dining" />
                        <h3>Fine Dining</h3>
                        <p>Savor delectable cuisine prepared with fresh, local ingredients in our on-site restaurant. Our menu features a variety of dishes to satisfy every palate.</p>
                      </div>
                    </div>
                  </section>

                  <section className="testimonials">
                    <h2>What Our Guests Say</h2>
                    <div className="testimonial-grid">
                      <div className="testimonial">
                        <p>"Absolutely stunning location and incredibly friendly staff. We had a wonderful time and can't wait to return!" - Awwal Salis</p>
                      </div>
                      <div className="testimonial">
                        <p>"The perfect place to escape and recharge. The views are breathtaking, and the lodge is so cozy and comfortable." - Aliyu Skillz</p>
                      </div>
                    </div>
                  </section>
                </div>

          </section>          
                 
      </main>
    </div>
  );
};

export default Home;