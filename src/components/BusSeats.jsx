import axios from 'axios';
import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaBus, FaBolt, FaRupeeSign, FaDice, FaBusAlt, FaArrowRight, FaDonate, FaMapMarkerAlt, FaPhone, FaCalendarAlt, FaClock, FaHashtag } from 'react-icons/fa';
import { ThemeContext } from '../components/ThemeContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, startOfDay } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BusSeats = ({ token }) => {
  const { theme } = useContext(ThemeContext);
  const [bus, setBus] = useState(null);
  const [seats, setSeats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [travelDate, setTravelDate] = useState(null);
  const [showDateError, setShowDateError] = useState(false);
  const datePickerRef = useRef(null);

  const { busId } = useParams();
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
  const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  const getMinDate = () => {
    const now = new Date();
    const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let istDate;
    if (browserTimezone === 'Asia/Kolkata' || browserTimezone === 'Asia/Calcutta') {
      istDate = now;
    } else {
      const browserOffset = now.getTimezoneOffset() * 60 * 1000;
      const istOffset = 5.5 * 60 * 60 * 1000;
      istDate = new Date(now.getTime() - browserOffset + istOffset);
    }
    return startOfDay(istDate);
  };

  const isBookingClosed = () => {
    if (!bus || !travelDate || !bus.start_time) return false;
    const now = new Date();
    const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let currentIST;
    if (browserTimezone === 'Asia/Kolkata' || browserTimezone === 'Asia/Calcutta') {
      currentIST = now;
    } else {
      const browserOffset = now.getTimezoneOffset() * 60 * 1000;
      const istOffset = 5.5 * 60 * 60 * 1000;
      currentIST = new Date(now.getTime() - browserOffset + istOffset);
    }
    const travelDateObj = new Date(travelDate);
    if (
      travelDateObj.getFullYear() === currentIST.getFullYear() &&
      travelDateObj.getMonth() === currentIST.getMonth() &&
      travelDateObj.getDate() === currentIST.getDate()
    ) {
      const departureTime = new Date(travelDateObj);
      departureTime.setHours(bus.start_time.hour, bus.start_time.minute, 0, 0);
      const cutoffTime = new Date(departureTime.getTime() - 60 * 60 * 1000);
      return currentIST >= cutoffTime;
    }
    return false;
  };

  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        const response = await axios.get(`${URL}/api/bookings/buses/${busId}/`);
        const busData = {
          ...response.data,
          price: parseFloat(response.data.price) || 0,
          discount: parseFloat(response.data.discount) || 0,
          gst: parseFloat(response.data.gst) || 5
        };
        setBus(busData);
        setSeats(response.data.seats || []);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching bus details:', error.response || error.message);
        setError('Failed to load bus details. Please try again later.');
        setIsLoading(false);
      }
    };
    fetchBusDetails();
  }, [busId, URL]);

  const handleDateChange = async (date) => {
    const selectedDate = date ? format(date, 'yyyy-MM-dd') : null;
    setTravelDate(date);
    setShowDateError(false); // Reset error state when date is selected
    try {
      const response = await axios.get(`${URL}/api/bookings/buses/${busId}/?travel_date=${selectedDate}`);
      const busData = {
        ...response.data,
        price: parseFloat(response.data.price) || 0,
        discount: parseFloat(response.data.discount) || 0,
        gst: parseFloat(response.data.gst) || 5
      };
      setSeats(response.data.seats || []);
      setBus({ ...bus, ...busData, suspended: response.data.suspended, suspension_reason: response.data.suspension_reason });
      setSelectedSeats([]);
    } catch (error) {
      console.error('Error fetching seats for date:', error.response || error.message);
      setError('Failed to load seats for selected date.');
    }
  };

  const handleSeatClick = (seatId) => {
    if (!travelDate) {
      toast.error('Please select a travel date from the calendar.', {
        position: 'top-right',
        autoClose: 3000,
      });
      setShowDateError(true);
      if (datePickerRef.current) {
        datePickerRef.current.input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    if (isBookingClosed()) {
      toast.error('Booking is closed for this bus.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    const seat = seats.find((s) => s.id === seatId);
    if (!seat.is_booked) {
      setSelectedSeats((prev) =>
        prev.includes(seatId)
          ? prev.filter((id) => id !== seatId)
          : [...prev, seatId]
      );
    }
  };

  const handleProceedToCheckout = () => {
    if (selectedSeats.length === 0) {
      toast.error('Please select at least one seat.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }
    navigate(`/bus/${busId}/checkout`, {
      state: { selectedSeats, travelDate, bus, seats }
    });
  };

  // Calculate payment summary
  const pricePerSeat = bus?.price || 0;
  const numberOfTickets = selectedSeats.length;
  const subtotal = numberOfTickets * pricePerSeat;
  const gstAmount = (subtotal * (bus?.gst || 5)) / 100;
  const discount = (subtotal * (bus?.discount || 0)) / 100;
  const totalPrice = Math.max(0, subtotal + gstAmount - discount);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[var(--background)]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-[var(--background)] text-[var(--foreground)]">
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-6 py-4 rounded-lg flex items-center">
          <svg
            className="w-6 h-6 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <div>
            <strong className="font-bold">Error!</strong>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme === 'dark' ? 'dark' : 'light'}
        className="mt-12"
      />
      <div className="relative bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-800 dark:to-blue-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {bus?.bus_name || 'Bus Booking'}
          </h1>
          <p className="text-lg md:text-xl text-white opacity-90 mb-6">
            Choose your seats and book your journey with ease!
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-100 dark:bg-gray-800 dark:text-blue-300 dark:hover:bg-gray-700 transition duration-300"
          >
            Browse Buses <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {bus && (
          <div className="p-6 mb-8">
            <div className="mb-6">
              <img
                src={
                  bus.bus_image
                    ? `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${bus.bus_image}`
                    : `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/placeholder_bus_image`
                }
                alt={`${bus.bus_name} Image`}
                className="w-full h-full object-fit transition-transform duration-3000 hover:translate-x-[100px] hover:translate-y-[50px] hover:scale-105"
              />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold light:text-red-800 dark:text-blue-400 mb-6 flex items-center">
              <FaBus className="mr-2" /> {bus.bus_name}
            </h2>

            <div className="flex flex-col">
              <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-500 mb-4">Bus Details</h3>
                  <div className="space-y-3 text-gray-500 dark:text-gray-500">
                    <p className="flex items-center">
                      <FaMapMarkerAlt className="text-blue-500 mr-2" />
                      <span className="font-medium">Route : </span> {bus.origin} → {bus.destination}
                    </p>
                    <p className="flex items-center">
                      <FaClock className="text-blue-500 mr-2" />
                      <span className="font-medium">Departure : </span> {bus.start_time}
                    </p>
                    <p className="flex items-center">
                      <FaClock className="text-blue-500 mr-2" />
                      <span className="font-medium">Arrival : </span> {bus.reach_time}
                    </p>
                    <p className="flex items-center">
                      <FaHashtag className="text-blue-500 mr-2" />
                      <span className="font-medium">Bus Number : </span> {bus.number}
                    </p>
                    <p className="flex items-center">
                      <FaBusAlt  className="text-blue-500 mr-2" />
                      <span className="font-medium">Bus Model : </span> {bus.bus_model_number || 'N/A'}
                    </p>
                    <p className="flex items-center">
                      <FaBolt className="text-blue-500 mr-2" />
                      <span className="font-medium">Features : </span> {bus.features}
                    </p>
                    <p className="flex items-center">
                      <FaPhone className="text-blue-500 mr-2" />
                      <span className="font-medium">Mobile : </span> {bus.mobile}
                    </p>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-500 mb-4 invisible md:visible">
                    Journey Details
                  </h3>
                  <div className="space-y-3 text-gray-500 dark:text-gray-500">
                    <div className="flex items-center">
                      <FaCalendarAlt className="text-blue-500 mr-2" />
                      <span className="font-medium">Pick your travel date : </span>
                      <DatePicker
                        ref={datePickerRef}
                        selected={travelDate}
                        onChange={handleDateChange}
                        minDate={getMinDate()}
                        className={`ml-2 p-1 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 ${showDateError ? '!border-red-500' : ''}`}
                        dateFormat="dd-MM-yyyy"
                        placeholderText="Select date"
                      />
                    </div>
                    <p className="flex items-center">
                      <FaMapMarkerAlt className="text-blue-500 mr-2" />
                      <span className="font-medium">Pickup Point : </span> {bus.pickup_point}
                    </p>
                    <p className="flex items-center">
                      <FaMapMarkerAlt className="text-blue-500 mr-2" />
                      <span className="font-medium">Dropping Point : </span> {bus.dropping_point}
                    </p>
                    <p className="flex items-center">
                      <FaRupeeSign className="text-blue-500 mr-2" />
                      <span className="font-medium">Price per Seat : </span> ₹{pricePerSeat.toFixed(2)}
                    </p>
                    <p className="flex items-center">
                      <FaDonate className="text-blue-500 mr-2" />
                      <span className="font-medium">GST : </span>{bus?.gst || 5}%
                    </p>
                    <p className="flex items-center">
                      <FaDice  className="text-pink-500 mr-2" />
                      <span className="font-medium">Discount on Offer : </span> {bus.discount}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-500 mb-4 mt-4">Seat Legend</h3>
                <div className="flex justify-center gap-6">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-500 rounded-md mr-2"></div>
                    <span className="text-sm text-gray-800 dark:text-gray-500">Available</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-red-500 rounded-md mr-2"></div>
                    <span className="text-sm text-gray-800 dark:text-gray-500">Booked</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-yellow-500 rounded-md mr-2"></div>
                    <span className="text-sm text-gray-800 dark:text-gray-500">Selected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="light:bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200">
              Select Your Seats
            </h2>
            

            {selectedSeats.length > 0 && (
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
                <p className="flex items-center text-black dark:text-gray-300 text-base sm:text-lg">
                  <span className="font-medium">Total Price = </span> ₹ {totalPrice.toFixed(2)}
                </p>
                <button
                  onClick={handleProceedToCheckout}
                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 dark:hover:bg-blue-500 transition duration-200 w-full md:w-auto"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}

          </div>
          {bus?.suspended ? (
            <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-6 py-4 rounded-lg flex items-center">
              <svg
                className="w-6 h-6 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <div>
                <strong className="font-bold">Bus Schedule Cancelled</strong>
                <p>{bus.suspension_reason}</p>
              </div>
            </div>
          ) : isBookingClosed() ? (
            <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-6 py-4 rounded-lg flex items-center">
              <svg
                className="w-6 h-6 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <div>
                <strong className="font-bold">Booking Closed</strong>
                <p>Reservations for this bus are closed 1 hour before departure time. Please check other schedules or plan for the next available bus.</p>
              </div>
            </div>
          ) : (
            <>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Seat availability shown for {travelDate ? new Date(travelDate).toDateString() : 'selected travel date'}.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 mb-6">
                {seats.map((seat) => (
                  <button
                    key={seat.id}
                    onClick={() => handleSeatClick(seat.id)}
                    disabled={seat.is_booked}
                    className={`relative p-4 rounded-xl flex flex-col items-center justify-center transition-all duration-200 transform hover:scale-105 ${
                      seat.is_booked
                        ? 'bg-red-200 dark:bg-red-900 cursor-not-allowed'
                        : selectedSeats.includes(seat.id)
                        ? 'bg-yellow-200 dark:bg-yellow-900 border-2 border-yellow-500 dark:border-yellow-400'
                        : 'bg-green-200 dark:bg-green-900 hover:bg-green-300 dark:hover:bg-green-800 cursor-pointer'
                    }`}
                    style={{
                      backgroundImage: 'linear-gradient(145deg, #ffffff, #000000)',
                      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)',
                      borderRadius: '12px',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <svg
                      className={`w-6 h-6 mb-1 ${
                        seat.is_booked
                          ? 'text-red-800 dark:text-red-300'
                          : selectedSeats.includes(seat.id)
                          ? 'text-yellow-800 dark:text-yellow-300'
                          : 'text-green-800 dark:text-green-300'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                    <span
                      className={`text-sm font-medium ${
                        seat.is_booked
                          ? 'text-red-800 dark:text-red-300'
                          : selectedSeats.includes(seat.id)
                          ? 'text-yellow-800 dark:text-yellow-300'
                          : 'text-green-800 dark:text-green-300'
                      }`}
                    >
                      {seat.seat_number}
                    </span>
                    {seat.is_booked && (
                      <span className="text-xs text-red-600 dark:text-red-400 mt-1">Booked</span>
                    )}
                    {selectedSeats.includes(seat.id) && !seat.is_booked && (
                      <div className="absolute top-0 right-0 -mt-2 -mr-2">
                        <div className="animate-ping h-4 w-4 rounded-full bg-yellow-400 dark:bg-yellow-500 opacity-75"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="text-lg mt-10 mb-10 text-gray-500 font-bold">#{bus?.bus_name} Bus Seat Layout</div>
        <div className="mt-10 p-2">
          <img
            src={
              bus?.seat_layout
                ? `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${bus.seat_layout}`
                : `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/placeholder_seat_layout`
            }
            alt={`${bus?.bus_name} Bus Seat Layout`}
            className="w-full h-full object-contain rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate('/my-bookings')}
            className="px-6 py-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 dark:hover:bg-blue-500 transition duration-200"
          >
            View Your Booking Details
          </button>
        </div>
      </div>
      <style jsx>{`
        .Toastify__toast {
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          padding: 1rem;
          min-height: 60px;
          background: var(--background);
          color: var(--foreground);
          border: 1px solid var(--muted);
          transition: all 0.3s ease-in-out;
        }
        .Toastify__toast--error {
          background: #fef2f2;
          color: #b91c1c;
          border-color: #f87171;
        }
        .Toastify__toast--error .Toastify__toast-icon svg {
          fill: #b91c1c;
        }
        .Toastify__toast--dark .Toastify__toast--error {
          background: #7f1d1d;
          color: #fecaca;
          border-color: #b91c1c;
        }
        .Toastify__toast--dark .Toastify__toast--error .Toastify__toast-icon svg {
          fill: #fecaca;
        }
        .Toastify__toast-body {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .Toastify__close-button {
          color: var(--foreground);
          opacity: 0.7;
          transition: opacity 0.2s;
        }
        .Toastify__close-button:hover {
          opacity: 1;
        }
        .Toastify__progress-bar {
          background: var(--primary);
        }
      `}</style>
    </div>
  );
};

export default BusSeats;