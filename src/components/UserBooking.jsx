import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import BusImage from '../assets/bus.png';
import Header from '../assets/header.jpg';
import {
  FaMapMarkerAlt,
  FaFlagCheckered,
  FaPhone,
  FaRupeeSign,
  FaChair,
  FaCalendarAlt,
  FaClock,
  FaCreditCard,
  FaBus,
  FaCheckCircle,
  FaPrint,
} from 'react-icons/fa';

const UserBookings = ({ token, userId }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

  // Create an array of refs for bookings
  const bookingRefs = useRef([]);

  const handlePrint = (index) => {
    const content = bookingRefs.current[index];
    if (!content) return;

    const printWindow = window.open('', '', 'height=700,width=900');
    printWindow.document.write('<html><head><title>Booking Receipt</title>');
    printWindow.document.write(
      '<style>@media print { body { font-family: sans-serif; padding: 20px; } .no-print { display: none; } }</style>'
    );
    printWindow.document.write('</head><body >');
    printWindow.document.write(content.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 500);
  };

  useEffect(() => {
    if (!token || !userId) {
      setError('Please log in to view your bookings');
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
        const paidBookings = response.data.filter((booking) => booking.is_paid);
        setBookings(paidBookings);
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.response?.data?.error || 'Failed to fetch bookings');
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token, userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 max-w-4xl mx-auto">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          <strong className="font-bold">Error! </strong>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const futureBookings = bookings.filter((booking) => {
    const travelDate = new Date(booking.travel_date);
    travelDate.setHours(0, 0, 0, 0);
    return travelDate >= today;
  });

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center mb-10">
        <img src={Header} alt="Bus" className="h-auto w-auto object-contain" />
      </div>
      <h2 className="text-3xl font-bold text-center mb-6 text-[var(--foreground)]">
        Your Bookings
      </h2>

      {futureBookings.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-[var(--foreground)]">No bookings found</h3>
          <p className="text-sm text-[var(--muted-foreground)] mt-2">Book a bus to start your journey!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {futureBookings.map((booking, index) => (
            <div
              key={booking.id}
              ref={(el) => (bookingRefs.current[index] = el)}
              className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-blue-700 rounded-t-xl"></div>

                    <h3 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-300">
                      <div className="flex items-center mb-1">
                        <FaBus className="text-blue-500 mr-2" />
                        {booking.bus ? booking.bus.bus_name : 'N/A'}
                      </div>
                      <div className="pl-7 text-base font-medium text-gray-700 dark:text-gray-300">
                        {booking.bus ? booking.bus.number : ''}
                      </div>
                    </h3>


              <hr className="my-3" />

              <div className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                <p><FaMapMarkerAlt className="inline text-blue-500 mr-1" /> <strong>Origin:</strong> {booking.origin}</p>
                <p><FaFlagCheckered className="inline text-blue-500 mr-1" /> <strong>Destination:</strong> {booking.destination}</p>
                <p><FaMapMarkerAlt className="inline text-blue-500 mr-1" /> <strong>Pickup:</strong> {booking.pickup_point}</p>
                <p><FaMapMarkerAlt className="inline text-blue-500 mr-1" /> <strong>Drop:</strong> {booking.dropping_point}</p>
                <p><FaPhone className="inline text-blue-500 mr-1" /> <strong>Mobile:</strong> {booking.mobile}</p>
                <p><FaRupeeSign className="inline text-blue-500 mr-1" /> <strong>Price:</strong> ₹{booking.price}</p>
                <p><FaChair className="inline text-blue-500 mr-1" /> <strong>Seat:</strong> {booking.seat?.seat_number || 'N/A'}</p>
                <p><FaCalendarAlt className="inline text-blue-500 mr-1" /> <strong>Travel Date:</strong> {new Date(booking.travel_date).toLocaleDateString()}</p>
                <p><FaClock className="inline text-blue-500 mr-1" /> <strong>Booked At:</strong> {new Date(booking.booking_time).toLocaleString()}</p>
                <p><FaCreditCard className="inline text-blue-500 mr-1" /> <strong>Payment ID:</strong> {booking.payment_id || 'N/A'}</p>
                <p>
                  <FaCheckCircle className={`inline mr-1 ${booking.is_paid ? 'text-green-500' : 'text-yellow-500'}`} />
                  <strong>Status:</strong> {booking.is_paid ? 'Confirmed' : 'Pending'}
                </p>
              </div>

              <button
                className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition no-print"
                onClick={() => handlePrint(index)}
              >
                <FaPrint className="mr-2" /> Print Receipt
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBookings;
