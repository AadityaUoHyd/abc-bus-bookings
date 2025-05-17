import React, { useContext } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaArrowRight } from 'react-icons/fa';
import Logo from '../assets/logo.png';
import Care from '../assets/care.png';
import Services from '../assets/cs.jpg';
import { ThemeContext } from '../components/ThemeContext';

const CustomerService = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-800 dark:to-blue-900">
        <div className="max-w-7xl mx-auto  text-center">
          <img
            src={Services}
            alt="ABC Bus Bookings services"
            className="h-full mx-auto mb-4"
          />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 mt-8">
            We’re Here to Help!
          </h1>
          <p className="text-lg md:text-xl text-white opacity-90 mb-6">
            Reach out with any questions, feedback, or support inquiries.
          </p>
          <a
            href="mailto:abcbusbookings@yopmail.com"
            className="mb-8 inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-100 dark:bg-gray-800 dark:text-blue-300 dark:hover:bg-gray-700 transition duration-300"
          >
            Email Us <FaArrowRight className="ml-2" />
          </a>
        </div>
      </div>
      <img
            src={Care}
            alt="ABC Bus Bookings Care"
            className="h-auto mx-auto mb-4"
          />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Details */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transform transition duration-300 hover:scale-105">
            <div className="flex items-center mb-4">
              <FaEnvelope className="text-blue-500 text-3xl mr-3" />
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                Get in Touch
              </h2>
            </div>
            <ul className="space-y-4 text-gray-600 dark:text-gray-300">
              <li className="flex items-center">
                <FaEnvelope className="text-blue-500 mr-2" />
                <span>
                  Email:{' '}
                  <a
                    href="mailto:abcbusbookings@yopmail.com"
                    className="text-blue-500 hover:underline"
                  >
                    support@abcbusbookings.com
                  </a>
                </span>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-blue-500 mr-2" />
                <span>Phone: +91-900-000-0001</span>
              </li>
              <li className="flex items-center">
                <FaMapMarkerAlt className="text-blue-500 mr-2" />
                <span>Address: Hitech City Travel Lane, Hyderabad, India </span>
              </li>
            </ul>
            <div className="mt-6">
              <div className="flex items-center mb-4">
                <FaClock className="text-blue-500 text-3xl mr-3" />
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                  Support Hours
                </h2>
              </div>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
                <li>Saturday: 10:00 AM - 4:00 PM</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transform transition duration-300 hover:scale-105">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Send Us a Message
            </h2>

            <form action="https://api.web3forms.com/submit" className="space-y-4" method="POST">
              <input type="hidden" name="access_key" value="37999cff-fd32-4d30-9b2a-89de0477bd4e" />

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
                  placeholder="Your Name"

                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
                  placeholder="Your Email"

                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  name="message"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
                  placeholder="Your Message"

                  required
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 dark:hover:bg-blue-500 transition duration-300"

                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerService;