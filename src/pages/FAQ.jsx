import React, { useContext, useState } from 'react';
import { FaQuestionCircle, FaChevronDown, FaChevronUp, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import FaqImage from '../assets/faqImage.jpg';
import { ThemeContext } from '../components/ThemeContext';

const FAQ = () => {
  const { theme } = useContext(ThemeContext);
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I book a bus ticket?',
      answer:
        'Search for your desired route, select a bus, choose a seat, and complete the payment process through our secure platform.',
    },
    {
      question: 'Can I cancel my booking?',
      answer: (
        <>
          Yes, cancellations are allowed based on our{' '}
          <Link to="/cancellation-refund" className="text-blue-500 hover:underline">
            Cancellation & Refund Policy
          </Link>.
        </>
      ),
    },
    {
      question: 'Is my payment information secure?',
      answer:
        'We use industry-standard encryption and secure payment gateways to protect your information.',
    },
    {
      question: 'How can I contact support?',
      answer: (
        <>
          Reach out to us at{' '}
          <a
            href="mailto:support@abcbusbookings.com"
            className="text-blue-500 hover:underline"
          >
            support@abcbusbookings.com
          </a>{' '}
          or call +91-999-999-9999.
        </>
      ),
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
            Got Questions? We’ve Got Answers!
          </h1>
          <p className="text-lg md:text-xl text-white opacity-90 mb-6">
            Find solutions to common queries or reach out to our support team.
          </p>
          <a
            href="mailto:abcbusbookings@yopmail.com"
            className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-100 dark:bg-gray-800 dark:text-blue-300 dark:hover:bg-gray-700 transition duration-300"
          >
            Contact Support <FaArrowRight className="ml-2" />
          </a>
        </div>
      </div>
      <img
            src={FaqImage}
            alt="ABC Bus Bookings faqImage"
            className="h-full mx-auto mb-4"
          />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-center text-blue-500 dark:text-blue-500 mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:shadow-xl"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between px-6 py-4 text-left text-gray-800 dark:text-gray-200 focus:outline-none"
              >
                <div className="flex items-center">
                  <FaQuestionCircle className="text-blue-500 text-xl mr-3" />
                  <span className="text-xl font-semibold">{faq.question}</span>
                </div>
                {openIndex === index ? (
                  <FaChevronUp className="text-blue-500" />
                ) : (
                  <FaChevronDown className="text-blue-500" />
                )}
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 py-4 text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;