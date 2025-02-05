import React from 'react';
import gal1 from '../assets/gallery/gal1.jpg'
import gal4 from '../assets/gallery/gal4.PNG'


const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-6">
        {/* Welcome Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Welcome to Our Lodge</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                src={gal1}
                alt="Welcome to Our Lodge"
                className="w-full h-96 object-cover rounded-lg shadow-md"
              />
            </div>
            <div>
              <p className="text-gray-600 mb-4">
                Nestled in the heart of nature, our lodge offers a unique blend of comfort and adventure. Whether you're here to relax or explore, we provide an unforgettable experience for all our guests.
              </p>
              <p className="text-gray-600">
                Our team is dedicated to ensuring your stay is as comfortable and enjoyable as possible. From luxurious accommodations to exciting activities, we have something for everyone.
              </p>
            </div>
          </div>
        </section>

        {/* History Section */}
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Our History</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                <p className="text-gray-600 mb-4">
                    Established in 2024, our lodge was born out of a shared passion for nature, hospitality, and creating unforgettable experiences. Nestled in the heart of New Kaduna Millenium City, we set out to build a sanctuary where guests could escape the hustle and bustle of everyday life and reconnect with the beauty of the natural world.
                </p>
                <p className="text-gray-600 mb-4">
                    Our founders, envisioned a place where luxury meets wilderness—a retreat that offers the perfect balance of comfort and adventure. Inspired by their travels and love for the outdoors, they carefully designed every aspect of the lodge to reflect the serenity and charm of its surroundings.
                </p>
                <p className="text-gray-600">
                    From the very beginning, our mission has been to provide a warm, welcoming environment where guests can create lasting memories. Whether it's enjoying a quiet evening by the fireplace, exploring the nearby trails, or simply soaking in the breathtaking views, we strive to make every moment at our lodge special.
                </p>
                </div>
                <div>
                <img
                    src={gal4}
                    alt="Our History"
                    className="w-full h-96 object-cover rounded-lg shadow-md"
                />
                </div>
            </div>
            </section>

        {/* Mission Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Mission</h2>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-gray-600">
              Our mission is to provide a memorable and enriching experience for our guests by offering exceptional service, luxurious accommodations, and a wide range of activities that connect them with nature and local culture.
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Team Member 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://example.com/team1.jpg"
                alt="Team Member 1"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Rukayya</h3>
                <p className="text-gray-600">General Manager</p>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://example.com/team2.jpg"
                alt="Team Member 2"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">John Doe</h3>
                <p className="text-gray-600">Head Chef</p>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://example.com/team3.jpg"
                alt="Team Member 3"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">John D</h3>
                <p className="text-gray-600">Activities Coordinator</p>
              </div>
            </div>

            {/* Team Member 4 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://example.com/team4.jpg"
                alt="Team Member 4"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Sarah Brown</h3>
                <p className="text-gray-600">Guest Relations Manager</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUsPage;