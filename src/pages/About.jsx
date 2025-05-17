import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaBus, FaStar, FaLightbulb, FaArrowRight } from 'react-icons/fa';
import Logo from '../assets/logo.png';
import { ThemeContext } from '../components/ThemeContext';
import AboutImage from '../assets/about.png';
import AbtImage from '../assets/abt.png';
import AboutMain from '../assets/aboutMain.png';

const About = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Hero Section */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-4">
          <img
            src={AbtImage}
            alt="ABC Bus Bookings AbtImage"
            className="h-full mx-auto mb-8"
          />

          <h1 className="text-4xl md:text-5xl font-bold text-pink-500 mb-8">
            Welcome to ABC Bus Bookings
          </h1>
          <p className="text-lg md:text-xl text-gray-500 opacity-90 mb-6">
            Your trusted partner for seamless, affordable bus travel across the country.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-blue-800 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 dark:bg-blue-800 dark:text-white dark:hover:bg-blue-500 transition duration-300"
          >
            Book Now <FaArrowRight className="ml-2" />
          </Link>
        </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Our Story */}
        <div className="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transform transition duration-300 hover:scale-105">
          <div className="flex items-center mb-4">
            <FaBus className="text-blue-500 text-3xl mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
              Our Story
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Founded in 2023, ABC Bus Bookings was created to address the challenges of bus travel booking. We partner with top bus operators to offer a wide range of routes and schedules.
          </p>
          <img
            src={AboutMain}
            alt="ABC Bus Bookings AboutMain"
            className="h-full mx-auto mb-4 mt-4"
          />
        </div>



        {/* Our Mission */}
        <div className="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transform transition duration-300 hover:scale-105">
          <div className="flex items-center mb-4">
            <FaStar className="text-blue-500 text-3xl mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
              Our Mission
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            ABC Bus Bookings is your trusted platform for seamless bus travel across the country and beyond. Our mission is to make bus booking simple, affordable, and reliable for everyone.
          </p>
          <div className="flex justify-center">
            <img src={AboutImage} alt="Main2" className="h-100 w-100 object-cover" />
          </div>
        </div>

        {/* Our Values */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center transform transition duration-300 hover:scale-105">
              <FaStar className="text-blue-500 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                Customer Satisfaction
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your comfort is our priority.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center transform transition duration-300 hover:scale-105">
              <FaLightbulb className="text-blue-500 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                Transparency
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Clear pricing with no hidden fees.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center transform transition duration-300 hover:scale-105">
              <FaBus className="text-blue-500 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                Innovation
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Continuously improving our platform for a better experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;