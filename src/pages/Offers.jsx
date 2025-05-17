import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBus, FaClock, FaTicketAlt } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import Logo from '../assets/logo.png';
import Offer from '../assets/offers.png';

const Offers = () => {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

    // Sample offer data (replace with API call if backend provides offers)
    const offers = [
        {
            id: 1,
            route: 'Mumbai to Pune',
            originalPrice: 1600,
            discountedPrice: 1440,
            discount: '10% OFF',
            image: 'https://images.unsplash.com/photo-1551178454-604e57c219c0?q=80&w=2070?auto=format&fit=crop&w=600&q=80',
        },
        {
            id: 2,
            route: 'Delhi to Jaipur',
            originalPrice: 2000,
            discountedPrice: 1700,
            discount: '15% OFF',
            image: 'https://plus.unsplash.com/premium_photo-1664302152991-d013ff125f3f?q=80&w=2070?auto=format&fit=crop&w=600&q=80',
        },
        {
            id: 3,
            route: 'Bangalore to Chennai',
            originalPrice: 2000,
            discountedPrice: 1900,
            discount: '5% OFF',
            image: 'https://images.unsplash.com/photo-1663174557120-877d2610049b?q=80&w=2071?auto=format&fit=crop&w=600&q=80',
        },
    ];

    // Countdown timer logic
    useEffect(() => {
        const offerEndTime = new Date().getTime() + 48 * 60 * 60 * 1000; // 48 hours from now
        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = offerEndTime - now;

            if (distance < 0) {
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            setTimeLeft({ hours, minutes, seconds });
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleBookNow = (route) => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Please log in to book a ticket');
            navigate('/login');
            return;
        }
        // Navigate to booking page with route details (adjust as per your booking flow)
        navigate('/booking', { state: { route } });
    };

    return (
        <div className="min-h-screen bg-[var(--background)] dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <Toaster position="top-right" reverseOrder={false} />
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                <img
            src={Logo}
            alt="ABC Bus Bookings Logo"
            className="h-30 mx-auto mb-4 animate-pulse"
          />
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Exclusive Discount Offer!</h1>
                    <p className="text-xl mb-6">Get 20% OFF on select routes with ABC Bus Bookings</p>
                    <div className="flex justify-center items-center space-x-4 text-2xl font-semibold">
                        <FaClock className="text-yellow-300" />
                        <span>
                            Offer ends in: {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                        </span>
                    </div>
                    <button
                        onClick={() => navigate('/booking')}
                        className="mt-6 bg-yellow-500 text-gray-900 py-3 px-8 rounded-lg hover:bg-yellow-600 transition duration-200 font-semibold"
                    >
                        Book Now
                    </button>
                </div>
            </section>
            <img
            src={Offer}
            alt="ABC Bus Bookings Offer"
            className="h-auto mx-auto mb-4"
          />

            {/* Offer Cards */}
            <section className="container mx-auto px-6 py-12">

                <h2 className="text-3xl font-bold mb-8 text-center text-grey-500">Featured Discounted Routes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {offers.map((offer) => (
                        <div
                            key={offer.id}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
                        >
                            <img
                                src={offer.image}
                                alt={offer.route}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <FaBus className="text-blue-500 mr-2" />
                                    <h3 className="text-xl font-semibold">{offer.route}</h3>
                                </div>
                                <div className="flex items-center mb-4">
                                    <FaTicketAlt className="text-green-500 mr-2" />
                                    <p className="text-lg">
                                        <span className="line-through text-gray-500 dark:text-gray-400">
                                            ₹{offer.originalPrice}
                                        </span>
                                        <span className="ml-2 font-bold text-green-600 dark:text-green-400">
                                            ₹{offer.discountedPrice}
                                        </span>
                                        <span className="ml-2 text-sm text-red-500 font-semibold">
                                            {offer.discount}
                                        </span>
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleBookNow(offer.route)}
                                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gray-100 dark:bg-gray-700 py-12">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-2xl font-bold mb-4">Don't Miss Out!</h2>
                    <p className="text-lg mb-6">
                        Book your tickets now and save big with ABC Bus Bookings.
                    </p>
                    <button
                        onClick={() => navigate('/booking')}
                        className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
                    >
                        Explore All Routes
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Offers;