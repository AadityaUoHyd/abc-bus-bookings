import React, { useContext } from 'react';
import { FaUndo, FaMoneyBillWave, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import Logo from '../assets/logo.png';
import Cancel from '../assets/cancel.jpg';
import { ThemeContext } from '../components/ThemeContext';

const CancellationRefund = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Flexible Policies for Your Peace of Mind
          </h1>
          <p className="text-lg md:text-xl text-white opacity-90 mb-6">
            At ABC Bus Bookings, we strive to provide hassle-free cancellation and refund options.
          </p>
          <a
            href="mailto:support@abcbusbookings.com"
            className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-100 dark:bg-gray-800 dark:text-blue-300 dark:hover:bg-gray-700 transition duration-300"
          >
            Contact Support <FaArrowRight className="ml-2" />
          </a>
        </div>
      </div>
      <img
            src={Cancel}
            alt="ABC Bus Bookings Cancel"
            className="h-full mx-auto mb-4"
          />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-grey dark:text-grey-500 mb-4">
            Our Commitment to Flexibility
          </h2>
          <p className="text-lg text-black-600 dark:text-gray-500 max-w-3xl mx-auto">
            We understand plans change. Our cancellation and refund policies are designed to ensure a seamless experience for all travelers.
          </p>
        </div>

        {/* Cancellation Policy */}
        <div className="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transform transition duration-300 hover:scale-105">
          <div className="flex items-center mb-4">
            <FaUndo className="text-blue-500 text-3xl mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
              Cancellation Policy
            </h2>
          </div>
          <ul className="space-y-4 text-gray-600 dark:text-gray-300">
            <li className="flex items-start">
              <FaCheckCircle className="text-blue-500 mr-2 mt-1" />
              <span>Cancellations made 24 hours before the scheduled departure are eligible for a full refund.</span>
            </li>
            <li className="flex items-start">
              <FaCheckCircle className="text-blue-500 mr-2 mt-1" />
              <span>Cancellations within 24 hours of departure may incur a 50% cancellation fee.</span>
            </li>
            <li className="flex items-start">
              <FaCheckCircle className="text-blue-500 mr-2 mt-1" />
              <span>No refunds for cancellations made after the bus departs.</span>
            </li>

          </ul>
        </div>

        {/* Refund Process */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transform transition duration-300 hover:scale-105">
          <div className="flex items-center mb-4">
            <FaMoneyBillWave className="text-blue-500 text-3xl mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
              Refund Process
            </h2>
          </div>
          <ul className="space-y-4 text-gray-600 dark:text-gray-300">
            <li className="flex items-start">
              <FaCheckCircle className="text-blue-500 mr-2 mt-1" />
              <span>Refunds are processed within 5-6 business days.</span>
            </li>
            <li className="flex items-start">
              <FaCheckCircle className="text-blue-500 mr-2 mt-1" />
              <span>It is advised to connect instantly to our customer care support for your transaction failure report.

              </span>
            </li>
            <li className="flex items-start">
              <FaCheckCircle className="text-blue-500 mr-2 mt-1" />
              <span>You are suppose to resolve complaint within six days to our customer support for any kind of refund during
              booking payment transaction failures.</span>
            </li>

             <li className="flex items-start">
              <FaCheckCircle className="text-blue-500 mr-2 mt-1" />
              <span>Later won't be entertained as we don't store your transaction data for longer period of time.</span>
            </li>
            <li className="flex items-start">
              <FaCheckCircle className="text-blue-500 mr-2 mt-1" />
              <span>Refunds will be credited to the original payment method.</span>
            </li>

            <li className="flex items-start">
              <FaCheckCircle className="text-blue-500 mr-2 mt-1" />
              <span>
                Contact our support team at{' '}
                <a
                  href="mailto:support@abcbusbookings.com"
                  className="text-blue-500 hover:underline"
                >
                  support@abcbusbookings.com
                </a>{' '}
                for assistance.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CancellationRefund;