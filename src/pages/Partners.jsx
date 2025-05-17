import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaHandshake, FaArrowRight, FaGlobe } from 'react-icons/fa';
import Logo from '../assets/logo.png';
import Part from '../assets/part.png';
import { ThemeContext } from '../components/ThemeContext';

const partners = [
  {
    name: 'Goibibo',
    category: 'Travel Aggregator',
    bio: 'Helping our customers find the best hotel stays near bus terminals and late-night layovers.',
    image: 'https://images.seeklogo.com/logo-png/30/1/goibibo-logo-png_seeklogo-305530.png',
    website: 'https://www.goibibo.com',
  },
  {
    name: 'OYO Rooms',
    category: 'Budget Hotels',
    bio: 'Seamless integration for instant hotel booking before or after your journey.',
    image: 'data:image/png;base64,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',
    website: 'https://www.oyorooms.com',
  },
  {
    name: 'Zomato',
    category: 'Food Partner',
    bio: 'Curated late-night meal options for passengers at popular highway stops.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Zomato_logo.png/768px-Zomato_logo.png',
    website: 'https://www.zomato.com',
  },
  {
    name: 'IRCTC eCatering',
    category: 'In-Transit Meals',
    bio: 'Partnered for scheduled food deliveries at major intercity bus points.',
    image: 'https://images.seeklogo.com/logo-png/18/1/irctc-logo-png_seeklogo-184098.png',
    website: 'https://www.ecatering.irctc.co.in',
  },
  {
    name: 'Blinkit',
    category: 'Quick Essentials',
    bio: 'Get travel snacks and necessities delivered just before your journey.',
    image: 'https://images.seeklogo.com/logo-png/43/1/blinkit-logo-png_seeklogo-438944.png',
    website: 'https://www.blinkit.com',
  },
  {
  name: 'Bisleri',
  category: 'Packaged Drinking Water',
  bio: 'India’s most trusted brand for pure and safe drinking water, available nationwide in convenient pack sizes.',
  image: 'https://images.seeklogo.com/logo-png/23/1/bisleri-logo-png_seeklogo-237556.png',
  website: 'https://www.bisleri.com',
},
  {
    name: 'Swiggy',
    category: 'On-the-Go Delivery',
    bio: 'Provides last-minute travel essentials before departure, right to your boarding point.',
    image: 'https://images.seeklogo.com/logo-png/34/1/swiggy-logo-png_seeklogo-348257.png',
    website: 'https://www.swiggy.com/instamart',
  },
  {
    name: 'RedBus',
    category: 'Bus Network Integration',
    bio: 'Collaborating on cross-platform bookings and route intelligence.',
    image: 'data:image/jpeg;base64,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',
    website: 'https://www.redbus.in',
  },
];

const OurPartners = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-800 dark:to-blue-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img
            src={Logo}
            alt="ABC Bus Bookings Logo"
            className="h-30 mx-auto mb-4 animate-pulse"
          />
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Our Partners
          </h1>
          <p className="text-lg md:text-xl text-white opacity-90 mb-6 max-w-3xl mx-auto">
            We’re proud to collaborate with leading companies in hospitality, dining, and technology — all to enhance your bus travel experience.
          </p>
          <Link
            to="/partner-with-us"
            className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-100 dark:bg-gray-800 dark:text-blue-300 dark:hover:bg-gray-700 transition duration-300"
          >
            Become a Partner <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
      <img
            src={Part}
            alt="ABC Bus Bookings Partner"
            className="h-full mx-auto mb-4"
          />

      {/* Partner Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="relative group bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="relative h-60 flex items-center justify-center bg-gray-100 dark:bg-gray-700 p-4">
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="h-48 object-contain max-w-full rounded-lg shadow-lg"
                />
              </div>
              <div className="p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <FaHandshake className="text-blue-500 text-xl mr-2" />
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                    {partner.name}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  {partner.category}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {partner.bio}
                </p>


                <a
  href={partner.website}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline text-sm"
>
  <FaGlobe className="mr-1" /> Visit Website
</a>



              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurPartners;
