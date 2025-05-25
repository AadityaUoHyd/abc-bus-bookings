import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, startOfDay } from 'date-fns';
import Main from '../assets/main.png';
import Main2 from '../assets/main2.png';
import Stop from '../assets/stop.png';
import Man from '../assets/man.png';
import Woman from '../assets/woman.png';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';


const BusList = ({ token, onSelectBus }) => {
    const [buses, setBuses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterOrigin, setFilterOrigin] = useState('');
    const [filterDestination, setFilterDestination] = useState('');
    const [travelDate, setTravelDate] = useState(new Date());
    const [currentPage, setCurrentPage] = useState(1);
    const [specialMessage, setSpecialMessage] = useState('');
    const busesPerPage = 12;

    const navigate = useNavigate();
    const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

    // Retry function for API calls
    const retryRequest = async (fn, retries = 3, delay = 1000) => {
        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                return await fn();
            } catch (error) {
                if (attempt === retries) throw error;
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    };

    // Get current IST date/time for minDate, set to start of day
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

    useEffect(() => {
        const fetchBuses = async () => {
            try {
                const response = await retryRequest(() =>
                    axios.get(`${URL}/api/bookings/buses/`)
                );
                const sortedBuses = response.data.sort((a, b) => b.id - a.id);
                setBuses(sortedBuses);
            } catch (error) {
                setError('Unable to connect to the server. Please check your network or try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        const fetchSpecialMessage = async () => {
            try {
                const response = await retryRequest(() =>
                    axios.get(`${URL}/api/bookings/special-message/`)
                );
                if (response.data && response.data.message && response.data.is_active) {
                    setSpecialMessage(response.data.message);
                } else {
                    setSpecialMessage('');
                }
            } catch (error) {
                console.error('Error fetching special message:', error);
                setSpecialMessage('');
            }
        };

        fetchBuses();
        fetchSpecialMessage();
    }, []);

    const handleViewSeats = (id) => {
        onSelectBus(id);
        navigate(`/bus/${id}`, { state: { travelDate } });
    };

    const filteredBuses = buses.filter(bus => {
        const matchesSearch = bus.bus_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             bus.number.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesOrigin = filterOrigin ? bus.origin.toLowerCase() === filterOrigin.toLowerCase() : true;
        const matchesDestination = filterDestination ? bus.destination.toLowerCase() === filterDestination.toLowerCase() : true;
        return matchesSearch && matchesOrigin && matchesDestination;
    });

    const totalPages = Math.ceil(filteredBuses.length / busesPerPage);
    const indexOfLastBus = currentPage * busesPerPage;
    const indexOfFirstBus = indexOfLastBus - busesPerPage;
    const currentBuses = filteredBuses.slice(indexOfFirstBus, indexOfLastBus);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const uniqueOrigins = [...new Set(buses.map(bus => bus.origin))];
    const uniqueDestinations = [...new Set(buses.map(bus => bus.destination))];

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 max-w-4xl mx-auto">
                <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg">
                    <strong className="font-bold">Error! </strong>
                    <span>{error}</span>
                </div>
            </div>
        );
    }

    return (
    <>
    <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-0">
                <img src={Main} alt="Main" className="h-60 w-auto object-contain" />
                <img src={Woman} alt="woman" className="h-50 w-auto object-contain" />
                <img src={Stop} alt="Stop" className="h-60 w-auto object-contain" />
                <img src={Man} alt="Man" className="h-50 w-auto object-contain" />
                <img src={Main2} alt="Main2" className="h-60 w-auto object-contain" />
            </div>
        <div className="container mx-auto px-4 py-8">

            <hr className="border-[var(--muted)] mb-6" />
            {specialMessage && (
                <div className="relative overflow-hidden bg-blue-100 dark:bg-pink-600 text-blue-800 dark:text-white py-2 px-4 rounded-lg mb-6 shadow-md">
                    <div className="animate-marquee whitespace-nowrap">
                        <span className="text-lg font-semibold">{specialMessage}</span>
                    </div>
                </div>
            )}
            <style>{`
                .animate-marquee {
                    display: inline-block;
                    animation: marquee 15s linear infinite;
                }
                @keyframes marquee {
                    0% {
                        transform: translateX(100%);
                    }
                    100% {
                        transform: translateX(-100%);
                    }
                }
            `}</style>
            <div className="card p-6 mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Search</label>
                        <input
                            type="text"
                            placeholder="Search buses..."
                            className="w-full px-4 py-2 border border-[var(--muted)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] bg-[var(--background)] text-[var(--foreground)] transition duration-200"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[var(--foreground)] mb-1">From</label>
                        <select
                            className="w-full px-4 py-2 border border-[var(--muted)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] bg-[var(--background)] text-[var(--foreground)] transition duration-200"
                            value={filterOrigin}
                            onChange={(e) => setFilterOrigin(e.target.value)}
                        >
                            <option value="">All Origins</option>
                            {uniqueOrigins.map(origin => (
                                <option key={origin} value={origin}>{origin}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[var(--foreground)] mb-1">To</label>
                        <select
                            className="w-full px-4 py-2 border border-[var(--muted)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] bg-[var(--background)] text-[var(--foreground)] transition duration-200"
                            value={filterDestination}
                            onChange={(e) => setFilterDestination(e.target.value)}
                        >
                            <option value="">All Destinations</option>
                            {uniqueDestinations.map(destination => (
                                <option key={destination} value={destination}>{destination}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Travel Date</label>
                        <DatePicker
                            selected={travelDate}
                            onChange={(date) => setTravelDate(date)}
                            minDate={getMinDate()}
                            className="w-full px-4 py-2 border border-[var(--muted)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] bg-[var(--background)] text-[var(--foreground)] transition duration-200"
                            dateFormat="dd-MM-yyyy"
                        />
                    </div>
                    <div className="flex items-end">
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setFilterOrigin('');
                                setFilterDestination('');
                                setTravelDate(getMinDate());
                            }}
                            className="btn-primary w-full py-2 px-4 font-medium"
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>
            </div>

            {filteredBuses.length === 0 ? (
                <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-[var(--foreground)]">No buses found</h3>
                    <p className="mt-2 text-sm text-[var(--muted-foreground)]">Try adjusting your search or filter to find what you're looking for.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentBuses.map((bus) => (
                            <div key={bus.id} className="card overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                                <div className="p-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h2 className="text-xl font-bold text-red-600 dark:text-yellow-400">{bus.bus_name}</h2>
                                            <p className="text-[var(--muted-foreground)] text-sm">Bus No: {bus.number}</p>
                                        </div>
                                        <span className="bg-blue-100 dark:bg-green-700 text-blue-800 dark:text-white text-xs font-semibold px-2.5 py-0.5 rounded animate-pulse">
                                            Available
                                        </span>
                                    </div>
                                    <div className="mt-4 space-y-2">
                                        <div className="flex items-center text-[var(--muted-foreground)]">
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            </svg>
                                            <span>{bus.origin} → {bus.destination}</span>
                                        </div>
                                        <div className="flex items-center text-[var(--muted-foreground)]">
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                            <span>Depart: {bus.start_time}</span>
                                        </div>
                                        <div className="flex items-center text-[var(--muted-foreground)]">
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                            <span>Arrive: {bus.reach_time}</span>
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <button
                                            onClick={() => handleViewSeats(bus.id)}
                                            className="btn-primary w-full py-2 px-4 font-medium"
                                        >
                                            View Seats & Book
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {filteredBuses.length > busesPerPage && (
                    
                    <div className="flex justify-center items-center mt-6 space-x-2 sm:space-x-1">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`btn-secondary p-2 sm:p-1.5 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition duration-200`}
                            aria-label="Previous page"
                        >
                            <FaChevronLeft className="w-5 h-5 sm:w-4 sm:h-4" />
                        </button>
                        <span className="text-sm sm:text-xs font-medium text-[var(--foreground)]">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`btn-secondary p-2 sm:p-1.5 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition duration-200`}
                            aria-label="Next page"
                        >
                            <FaChevronRight className="w-5 h-5 sm:w-4 sm:h-4" />
                        </button>
                    </div>



                    )}
                </>
            )}
        </div>
        </>
    );
};

export default BusList;