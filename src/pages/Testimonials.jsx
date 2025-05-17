import React, { useContext } from 'react';
import { FaStar, FaQuoteLeft, FaArrowRight } from 'react-icons/fa';
import Logo from '../assets/logo.png';
import { ThemeContext } from '../components/ThemeContext';
import Testi from '../assets/testi.jpg';

const Testimonials = () => {
  const { theme } = useContext(ThemeContext);

  const reviews = [
  {
    quote: "ABC Bus Bookings made my travel planning so easy! The platform is user-friendly, and the support team was quick to assist.",
    name: 'Priya S.',
    role: 'Frequent Traveler',
    image: 'https://images.pexels.com/photos/1231234/pexels-photo-1231234.jpeg',
  },
  {
    quote: "I love the transparent pricing and wide selection of buses. Highly recommend!",
    name: 'Arjun M.',
    role: 'Business Traveler',
    image: 'https://images.pexels.com/photos/5675678/pexels-photo-5675678.jpeg',
  },
  {
    quote: "The cancellation process was smooth, and I received my refund promptly.",
    name: 'Sneha R.',
    role: 'Student',
    image: 'https://images.pexels.com/photos/9109101/pexels-photo-9109101.jpeg',
  },
  {
    quote: "Smooth and seamless experience! Booking my family trip was a breeze.",
    name: 'Ravi T.',
    role: 'Father of 3',
    image: 'https://images.pexels.com/photos/1122334/pexels-photo-1122334.jpeg',
  },
  {
    quote: "Great app! Everything is clear and easy to navigate.",
    name: 'Ananya D.',
    role: 'Solo Adventurer',
    image: 'https://images.pexels.com/photos/4455667/pexels-photo-4455667.jpeg',
  },
  {
    quote: "Customer service is top-notch. They helped me reschedule without any hassle.",
    name: 'Karthik J.',
    role: 'Daily Commuter',
    image: 'https://images.pexels.com/photos/7788990/pexels-photo-7788990.jpeg',
  },
  {
    quote: "The mobile UI is perfect. I booked a bus while on the go!",
    name: 'Ishita M.',
    role: 'Freelancer',
    image: 'https://images.pexels.com/photos/3344556/pexels-photo-3344556.jpeg',
  },
  {
    quote: "Buses are clean and well-maintained. Very impressed with the quality control.",
    name: 'Meera B.',
    role: 'Eco Tourist',
    image: 'https://images.pexels.com/photos/6677889/pexels-photo-6677889.jpeg',
  },
  {
    quote: "Real-time updates were accurate. I knew exactly when my bus would arrive.",
    name: 'Vivek G.',
    role: 'Tech Consultant',
    image: 'https://images.pexels.com/photos/2233445/pexels-photo-2233445.jpeg',
  },
  {
    quote: "I had an issue with payment, but the support resolved it within minutes!",
    name: 'Lakshmi N.',
    role: 'College Student',
    image: 'https://images.pexels.com/photos/5566778/pexels-photo-5566778.jpeg',
  },
  {
    quote: "The multi-language support is a game changer. My parents could use it easily.",
    name: 'Ramesh K.',
    role: 'Family Planner',
    image: 'https://images.pexels.com/photos/8899001/pexels-photo-8899001.jpeg',
  },
  {
    quote: "Affordable rates, great experience. Will definitely book again!",
    name: 'Tanvi P.',
    role: 'Budget Traveler',
    image: 'https://images.pexels.com/photos/1122334/pexels-photo-1122334.jpeg',
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
            What Our Customers Say
          </h1>
          <p className="text-lg md:text-xl text-white opacity-90 mb-6">
            Real feedback from real travelers across India.
          </p>
          <a
            href="mailto:abcbusbookings@yopmail.com"
            className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-100 dark:bg-gray-800 dark:text-blue-300 dark:hover:bg-gray-700 transition duration-300"
          >
            Share Your Experience <FaArrowRight className="ml-2" />
          </a>
        </div>
      </div>
      <img
            src={Testi}
            alt="ABC Bus Bookings Testimonials"
            className="h-full mx-auto mb-4"
          />

      {/* Testimonials Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform transition duration-300 hover:scale-105"
            >
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                />
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">{review.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{review.role}</p>
                </div>
              </div>
              <FaQuoteLeft className="text-blue-500 text-2xl mb-2" />
              <p className="italic text-gray-700 dark:text-gray-300 mb-4">
                “{review.quote}”
              </p>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
