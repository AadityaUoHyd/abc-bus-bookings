import React, { useContext } from 'react';
import { FaCode, FaHeadset, FaBullhorn, FaEnvelope, FaArrowRight } from 'react-icons/fa';
import Logo from '../assets/logo.png';
import CareerImg from '../assets/career.jpg';
import { ThemeContext } from '../components/ThemeContext';

const Career = () => {
  const { theme } = useContext(ThemeContext);

  const jobOpenings = [
    {
      title: 'Software Engineer',
      description: 'Build innovative features for our platform.',
      icon: <FaCode className="text-blue-500 text-4xl mx-auto mb-4" />,
    },
    {
      title: 'Customer Support Specialist',
      description: 'Assist our travelers with their queries.',
      icon: <FaHeadset className="text-blue-500 text-4xl mx-auto mb-4" />,
    },
    {
      title: 'Marketing Manager',
      description: 'Promote our brand and services.',
      icon: <FaBullhorn className="text-blue-500 text-4xl mx-auto mb-4" />,
    },
  ];

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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Join Our Journey!
          </h1>
          <p className="text-lg md:text-xl text-white opacity-90 mb-6">
            Help revolutionize bus travel with ABC Bus Bookings.
          </p>
          <a
            href="mailto:careers@abcbusbookings.com"
            className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-100 dark:bg-gray-800 dark:text-blue-300 dark:hover:bg-gray-700 transition duration-300"
          >
            Apply Now <FaArrowRight className="ml-2" />
          </a>
        </div>
      </div>
      <img
            src={CareerImg}
            alt="ABC Bus Bookings career image"
            className="h-full mx-auto mb-4/"
          />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-500 dark:text-blue-500 mb-4">
            Why Work With Us?
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-500 max-w-3xl mx-auto">
            Join the ABC Bus Bookings team and help revolutionize bus travel! We’re looking for passionate individuals to join our growing company.
          </p>
        </div>

        {/* Current Openings */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-500 dark:text-blue-500">
            Current Openings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobOpenings.map((job, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center transform transition duration-300 hover:scale-105"
              >
                {job.icon}
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  {job.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {job.description}
                </p>
                <a
                  href="mailto:careers@abcbusbookings.com"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 dark:hover:bg-blue-500 transition duration-300"
                >
                  Apply Now
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* How to Apply */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transform transition duration-300 hover:scale-105">
          <div className="flex items-center mb-4">
            <FaEnvelope className="text-blue-500 text-3xl mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
              How to Apply
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Send your resume and cover letter to{' '}
            <a
              href="mailto:careers@abcbusbookings.com"
              className="text-blue-500 hover:underline"
            >
              careers@abcbusbookings.com
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Career;