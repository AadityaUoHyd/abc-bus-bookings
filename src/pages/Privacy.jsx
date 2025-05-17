import React, { useContext } from 'react';
import { FaLock, FaUserShield, FaArrowRight, FaInfoCircle, FaUser, FaShareAlt, FaShieldAlt, FaUserCheck } from 'react-icons/fa';
import Logo from '../assets/logo.png';
import Private from '../assets/privacy.jpg';
import { ThemeContext } from '../components/ThemeContext';

const Privacy = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-800 dark:to-blue-900 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/subtle-white-feathers.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <img
            src={Logo}
            alt="ABC Bus Bookings Logo"
            className="h-30 mx-auto mb-6 animate-pulse duration-1000"
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Your Privacy, Our Priority
          </h1>
          <p className="text-lg md:text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
            Learn how we handle your data and protect your information.
          </p>
          <a
            href="mailto:support@abcbusbookings.com"
            className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-lg hover:bg-blue-50 dark:bg-gray-800 dark:text-blue-300 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
          >
            Contact Support <FaArrowRight className="ml-2" />
          </a>
        </div>
      </div>
      <img
            src={Private}
            alt="ABC Bus Bookings private"
            className="h-full mx-auto mb-6"
          />


      {/* Privacy Policy Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8">
          {/* Introduction */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transform hover:-translate-y-1 transition-all duration-300 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <FaLock className="text-blue-500 dark:text-blue-400 text-3xl mr-3" />
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                Privacy Policy
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              At ABC Bus Bookings, your privacy is important to us. This policy describes how we collect, use, and protect your personal information.
            </p>
          </div>

          {/* Information We Collect */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transform hover:-translate-y-1 transition-all duration-300 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <FaInfoCircle className="text-blue-500 dark:text-blue-400 text-3xl mr-3" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                1. Information We Collect
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We collect details such as your name, email, contact number, payment information, and travel preferences when you interact with our services.
            </p>
          </div>

          {/* How We Use Your Information */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transform hover:-translate-y-1 transition-all duration-300 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <FaUser className="text-blue-500 dark:text-blue-400 text-3xl mr-3" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                2. How We Use Your Information
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">
              We use your information to:
            </p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-blue-500 dark:text-blue-400 mr-2">•</span>
                Process bookings and payments
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 dark:text-blue-400 mr-2">•</span>
                Send confirmations and trip updates
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 dark:text-blue-400 mr-2">•</span>
                Enhance user experience and app functionality
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 dark:text-blue-400 mr-2">•</span>
                Communicate support and promotional offers (if opted in)
              </li>
            </ul>
          </div>

          {/* Data Sharing */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transform hover:-translate-y-1 transition-all duration-300 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <FaShareAlt className="text-blue-500 dark:text-blue-400 text-3xl mr-3" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                3. Data Sharing
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We do not sell or trade your personal information. Data is only shared with third-party providers as needed for secure payment processing, legal obligations, or customer support.
            </p>
          </div>

          {/* Data Security */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transform hover:-translate-y-1 transition-all duration-300 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <FaShieldAlt className="text-blue-500 dark:text-blue-400 text-3xl mr-3" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                4. Data Security
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We implement strict security protocols and encryption to protect your information. Access is limited to authorized personnel only.
            </p>
          </div>

          {/* Your Rights */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transform hover:-translate-y-1 transition-all duration-300 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <FaUserCheck className="text-blue-500 dark:text-blue-400 text-3xl mr-3" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                5. Your Rights
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              You have the right to access, update, or delete your data at any time. Contact us to request data-related actions.
            </p>
          </div>

          {/* Contact Us */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-950 rounded-2xl shadow-xl p-8 transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center mb-4">
              <FaUserShield className="text-blue-500 dark:text-blue-400 text-3xl mr-3" />
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                Contact Us
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              For any questions about our privacy practices, please contact us at:{' '}
              <a
                href="mailto:support@abcbusbookings.com"
                className="text-blue-500 dark:text-blue-400 hover:underline font-medium"
              >
                support@abcbusbookings.com
              </a>
            </p>
            <a
              href="mailto:support@abcbusbookings.com"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 dark:hover:bg-blue-500 transition-all duration-300 transform hover:scale-105"
            >
              Get in Touch <FaArrowRight className="ml-2" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;