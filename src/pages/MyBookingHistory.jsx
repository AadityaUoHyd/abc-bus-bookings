import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import {
  FaBus,
  FaMapMarkerAlt,
  FaChair,
  FaCalendarAlt,
  FaCheckCircle,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaArrowRight,
} from 'react-icons/fa';
import Logo from '../assets/logo.png';
import History from '../assets/history.jpg';
import { ThemeContext } from '../components/ThemeContext';
import Loading from '../components/Loading';

const MyBookingHistory = ({ token }) => {
  const { theme } = useContext(ThemeContext);
  const { userId } = useParams();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

  useEffect(() => {
    if (!token || !userId) {
      setError('Please log in to view your booking history');
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${URL}/api/bookings/user/${userId}/bookings/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setBookings(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.response?.data?.error || 'Failed to fetch booking history');
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token, userId]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-[var(--background)] text-[var(--foreground)]">
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-6 py-4 rounded-lg flex items-center">
          <FaExclamationTriangle className="text-2xl mr-3" />
          <div>
            <strong className="font-bold">Error!</strong>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Filter bookings to show only past travel dates (travel_date < today)
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Start of today in local timezone
  const pastBookings = bookings.filter(booking => {
    const travelDate = new Date(booking.travel_date);
    travelDate.setHours(0, 0, 0, 0); // Normalize to start of day
    return travelDate < today;
  });

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
            Your Travel History at a Glance
          </h1>
          <p className="text-lg md:text-xl text-white opacity-90 mb-6">
            Review your past and upcoming bus bookings with ease.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-100 dark:bg-gray-800 dark:text-blue-300 dark:hover:bg-gray-700 transition duration-300"
          >
            Book a Bus <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
      <img
            src={History}
            alt="ABC Bus Bookings History"
            className="h-full mx-auto mb-4"
          />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-500 dark:text-gray-500 mb-8">
          My Booking History
        </h2>
        {pastBookings.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <FaExclamationCircle className="text-4xl text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              No Bookings Found
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Book a bus to start your journey!
            </p>
            <Link
              to="/"
              className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 dark:hover:bg-blue-500 transition duration-300"
            >
              Book Now
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="flex items-center mb-4">
                  <FaBus className="text-blue-500 text-2xl mr-2" />
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    {booking.bus ? `${booking.bus.bus_name} (${booking.bus.number})` : 'N/A'}
                  </h3>
                </div>
                <div className="space-y-3 text-gray-600 dark:text-gray-300">
                  <p className="flex items-center">
                    <FaMapMarkerAlt className="text-blue-500 mr-2" />
                    <span>
                      <strong>Origin:</strong> {booking.origin || 'N/A'}
                    </span>
                  </p>
                  <p className="flex items-center">
                    <FaMapMarkerAlt className="text-blue-500 mr-2" />
                    <span>
                      <strong>Destination:</strong> {booking.destination || 'N/A'}
                    </span>
                  </p>
                  <p className="flex items-center">
                    <FaChair className="text-blue-500 mr-2" />
                    <span>
                      <strong>Seat Number:</strong> {booking.seat ? booking.seat.seat_number : 'N/A'}
                    </span>
                  </p>
                  <p className="flex items-center">
                    <FaCalendarAlt className="text-blue-500 mr-2" />
                    <span>
                      <strong>Travel Date:</strong>{' '}
                      {new Date(booking.travel_date).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="flex items-center">
                    <FaCheckCircle
                      className={`mr-2 ${booking.is_paid ? 'text-green-500' : 'text-yellow-500'}`}
                    />
                    <span>
                      <strong>Status:</strong> Travelling Schedule Completed
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingHistory;