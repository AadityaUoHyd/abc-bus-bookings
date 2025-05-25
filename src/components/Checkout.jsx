import axios from 'axios';
import React, { useContext, useState, useRef, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ThemeContext } from '../components/ThemeContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmDialog from './ConfirmDialog';
import payImage from '../assets/pay.png';
import { FaChair, FaTicketAlt, FaRupeeSign, FaCalculator, FaDonate, FaTag, FaMoneyBillWave } from 'react-icons/fa';

const Checkout = ({ token }) => {
  const { theme } = useContext(ThemeContext);
  const { busId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedSeats, travelDate, bus, seats } = location.state || {};
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const paymentSummaryRef = useRef(null);

  const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

  useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);


  // Validate required data
  if (!selectedSeats || !travelDate || !bus || !seats) {
    return (
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex items-center justify-center">
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-6 py-4 rounded-lg">
          <strong className="font-bold">Error!</strong>
          <p>Invalid checkout data. Please select seats again.</p>
          <button
            onClick={() => navigate(`/bus/${busId}`)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Seat Selection
          </button>
        </div>
      </div>
    );
  }

  // Calculate payment summary
  const pricePerSeat = parseFloat(bus?.price) || 0;
  const numberOfTickets = selectedSeats.length;
  const subtotal = numberOfTickets * pricePerSeat;
  const gstAmount = (subtotal * (parseFloat(bus?.gst) || 5)) / 100;
  const discount = (subtotal * (parseFloat(bus?.discount) || 0)) / 100;
  const totalPrice = Math.max(0, subtotal + gstAmount - discount);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const refreshSeatData = async () => {
    try {
      const response = await axios.get(`${URL}/api/bookings/buses/${busId}/?travel_date=${format(travelDate, 'yyyy-MM-dd')}`);
      navigate(`/bus/${busId}`, { replace: true });
    } catch (error) {
      console.error('Error refreshing seat data:', error.response || error.message);
      navigate(`/bus/${busId}`, { replace: true });
    }
  };

  const handlePaymentFailure = async (orderId, status = 'cancelled') => {
    try {
      await axios.post(
        `${URL}/api/bookings/handle-payment-failure/`,
        { razorpay_order_id: orderId, payment_status: status },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.info(`Payment failure recorded for order ${orderId} with status ${status}`);
    } catch (error) {
      console.error(`Failed to record payment failure for order ${orderId}:`, error.response || error.message);
    }
  };

  const handleBook = async () => {
    if (!token) {
      toast.error('Please login to book seats', {
        position: 'top-right',
        autoClose: 3000,
      });
      navigate('/login');
      return;
    }

    if (!travelDate) {
      toast.error('Invalid travel date', {
        position: 'top-right',
        autoClose: 3000,
      });
      navigate(`/bus/${busId}`);
      return;
    }

    if (selectedSeats.length === 0) {
      toast.error('No seats selected', {
        position: 'top-right',
        autoClose: 3000,
      });
      navigate(`/bus/${busId}`);
      return;
    }

    try {
      const res = await axios.post(
        `${URL}/api/bookings/booking/`,
        { seats: selectedSeats, travel_date: format(travelDate, 'yyyy-MM-dd') },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      const { razorpay_order_id, razorpay_key_id, amount, bookings } = res.data;

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error('Failed to load Razorpay SDK. Please try again.', {
          position: 'top-right',
          autoClose: 3000,
        });
        await handlePaymentFailure(razorpay_order_id, 'failed');
        await refreshSeatData();
        return;
      }

      const options = {
        key: razorpay_key_id,
        amount: amount,
        currency: 'INR',
        order_id: razorpay_order_id,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              `${URL}/api/bookings/verify-payment/`,
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              },
              {
                headers: {
                  Authorization: `Token ${token}`,
                },
              }
            );

            if (verifyRes.data.is_paid) {
              toast.success('Bookings and payment successful!', {
                position: 'top-right',
                autoClose: 3000,
              });
              await refreshSeatData();
              navigate('/my-bookings');
            } else {
              toast.error('Payment not verified. Seats not booked.', {
                position: 'top-right',
                autoClose: 3000,
              });
              await handlePaymentFailure(response.razorpay_order_id, verifyRes.data.error.includes('failed') ? 'failed' : 'cancelled');
              await refreshSeatData();
            }
          } catch (error) {
            console.error('Payment verification failed:', error.response || error.message);
            toast.error('Payment verification failed. Please contact support.', {
              position: 'top-right',
              autoClose: 3000,
            });
            await handlePaymentFailure(response.razorpay_order_id, 'failed');
            await refreshSeatData();
          }
        },
        modal: {
          ondismiss: async function () {
            toast.error('Payment canceled. Seats not booked.', {
              position: 'top-right',
              autoClose: 3000,
            });
            await handlePaymentFailure(razorpay_order_id, 'cancelled');
            await refreshSeatData();
          },
        },
        prefill: {
          name: bookings[0]?.user || '',
          email: bookings[0]?.user_email || '',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', async function (response) {
        toast.error('Payment failed. Seats not booked.', {
          position: 'top-right',
          autoClose: 3000,
        });
        await handlePaymentFailure(razorpay_order_id, 'failed');
        await refreshSeatData();
      });
      rzp.open();
    } catch (error) {
      console.error('Booking failed:', error.response || error.message);
      toast.error(error.response?.data?.error || 'Booking failed. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
      });
      await refreshSeatData();
    }
  };

  const handleCancel = () => {
    setConfirmAction(() => () => navigate(`/bus/${busId}`));
    setIsConfirmOpen(true);
  };

  return (
      <div
        className="min-h-screen flex items-center justify-center bg-[var(--background)] text-[var(--foreground')] bg-cover bg-center"
        style={{
        backgroundImage: `url(${payImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        }}
      >

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
      />

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => {
          confirmAction();
          setIsConfirmOpen(false);
        }}
        title="Cancel Booking"
        message="Are you sure you want to cancel and return to seat selection? Your selected seats will not be reserved."
      />

      <div ref={paymentSummaryRef} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg max-w-md w-full">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-blue-500 mb-4">
          Payment Summary
        </h3>
        <div className="text-gray-600 dark:text-gray-300 mb-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="font-medium flex items-center gap-1"><FaChair />Selected Seats:</span>
            <span>{selectedSeats.map((seatId) => seats.find((s) => s.id === seatId)?.seat_number).join(', ')}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium flex items-center gap-1"><FaTicketAlt /> Number of Tickets:</span>
            <span>{numberOfTickets}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium flex items-center gap-1"><FaRupeeSign /> Price per Ticket:</span>
            <span>₹{pricePerSeat.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium flex items-center gap-1"><FaCalculator /> Subtotal:</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium flex items-center gap-1"><FaDonate /> GST ({parseFloat(bus?.gst) || 5}%):</span>
            <span>₹{gstAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium flex items-center gap-1"><FaTag /> Discount:</span>
            <span>₹{discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-blue-700 dark:text-blue-400 font-semibold border-t pt-2 mt-2">
            <span className="flex items-center gap-1"><FaMoneyBillWave /> Total:</span>
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleBook}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 dark:hover:bg-blue-500 transition duration-200"
          >
            Let's Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;