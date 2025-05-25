import React, { useState, useContext, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from '../assets/logo.png';
import {
    FaUserCircle,
    FaTimes,
    FaBook,
    FaUserPlus,
    FaSignInAlt,
    FaSun,
    FaMoon,
    FaLaptop,
    FaSignOutAlt,
    FaTwitter,
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaUser,
    FaInfoCircle,
    FaPhone,
    FaUndo,
    FaAutoprefixer,
} from 'react-icons/fa';
import { ThemeContext } from './ThemeContext';

const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

const Wrapper = ({ token, handleLogout, children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const dropdownRef = useRef(null);
    const mobileDropdownRef = useRef(null);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!token) {
                setProfileImage(null);
                return;
            }

            const userId = localStorage.getItem('userId');
            if (!userId) {
                console.error('No userId found in localStorage');
                setProfileImage(null);
                return;
            }

            try {
                const response = await fetch(`http://localhost:8000/api/users/user/${userId}/profile/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setProfileImage(data.profile_image || null);
                } else {
                    console.error('Failed to fetch profile:', data.error);
                    setProfileImage(null);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                setProfileImage(null);
            }
        };

        fetchProfile();
    }, [token]);

    const logout = () => {
        handleLogout();
        navigate('/login');
        setIsDropdownOpen(false);
        setIsMenuOpen(false);
        setProfileImage(null);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!isDropdownOpen) return;

            const isOutsideDesktop =
                dropdownRef.current && !dropdownRef.current.contains(event.target);
            const isOutsideMobile =
                mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target);

            if (
                (dropdownRef.current && isOutsideDesktop) ||
                (mobileDropdownRef.current && isOutsideMobile)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isDropdownOpen]);

    return (
        <div className="min-h-screen flex flex-col bg-[var(--background)]">
            <nav className="header sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center space-x-2">
                                <img src={Logo} alt="ABC Bus Bookings Logo" className="h-10 w-auto" />
                                <span className="text-xl font-bold text-pink dark:text-pink hover:text-blue-500">ABC Bus Bookings</span>
                            </Link>
                        </div>
                        <div className="hidden md:flex items-center space-x-4">
                            <Link
                                to="/"
                                className={`font-medium transition duration-200 flex items-center ${
                                    location.pathname === '/'
                                        ? 'text-blue-500 font-bold'
                                        : 'text-pink dark:text-pink hover:text-blue-500'
                                }`}
                            >
                                Home
                            </Link>
                            <Link
                                to="/about"
                                className={`font-medium transition duration-200 flex items-center ${
                                    location.pathname === '/about'
                                        ? 'text-blue-500 font-bold'
                                        : 'text-pink dark:text-pink hover:text-blue-500'
                                }`}
                            >
                                About
                            </Link>
                            <Link
                                to="/customer-service"
                                className={`font-medium transition duration-200 flex items-center ${
                                    location.pathname === '/customer-service'
                                        ? 'text-blue-500 font-bold'
                                        : 'text-pink dark:text-pink hover:text-blue-500'
                                }`}
                            >
                                Customer Service
                            </Link>
                            {token && (
                                <Link
                                    to="/my-bookings"
                                    className={`font-medium transition duration-200 flex items-center ${
                                        location.pathname === '/my-bookings'
                                            ? 'text-blue-500 font-bold'
                                        : 'text-pink dark:text-pink hover:text-blue-500'
                                    }`}
                                >
                                    My Travel Schedule
                                </Link>
                            )}
                            {token ? (
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="flex items-center text-pink-800 dark:text-gray-500 hover:text-blue-500 focus:outline-none"
                                    >
                                        {profileImage ? (
                                            <img
                                                src={profileImage}
                                                alt="Profile"
                                                className="h-8 w-8 rounded-full object-cover"
                                            />
                                        ) : (
                                            <FaUserCircle className="h-8 w-8" />
                                        )}
                                    </button>
                                    {isDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-10">
                                            <Link
                                                to={`/user/${localStorage.getItem('userId')}/bookings`}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-200 transition duration-200 flex items-center"
                                                onClick={() => setIsDropdownOpen(false)}
                                            >
                                                <FaBook className="mr-2" />
                                                Booking History
                                            </Link>
                                            <Link
                                                to="/cancellation-refund"
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-200 transition duration-200 flex items-center"
                                                onClick={() => setIsDropdownOpen(false)}
                                            >
                                                <FaTimes className="mr-2" />
                                                Cancellation & Refund
                                            </Link>
                                            {localStorage.getItem('userId') ? (
                                                <Link
                                                    to={`/user/${localStorage.getItem('userId')}/profile`}
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-200 transition duration-200 flex items-center"
                                                >
                                                    <FaUser className="mr-2" />
                                                    Profile
                                                </Link>
                                            ) : (
                                                <button
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-400 dark:text-gray-500 cursor-not-allowed"
                                                    disabled
                                                >
                                                    <FaUser className="mr-2" />
                                                    Profile (Login Required)
                                                </button>
                                            )}
                                            <hr />
                                            <button
                                                onClick={() => toggleTheme('light')}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-200 transition duration-200 flex items-center"
                                            >
                                                <FaSun className="mr-2" />
                                                Light Mode
                                            </button>
                                            <button
                                                onClick={() => toggleTheme('dark')}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-200 transition duration-200 flex items-center"
                                            >
                                                <FaMoon className="mr-2" />
                                                Dark Mode
                                            </button>
                                            <button
                                                onClick={() => toggleTheme('system')}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-200 transition duration-200 flex items-center"
                                            >
                                                <FaLaptop className="mr-2" />
                                                System Mode
                                            </button>
                                            <hr />
                                            <button
                                                onClick={logout}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-red-100 dark:hover:bg-red-700 hover:text-white transition duration-200 flex items-center"
                                            >
                                                <FaSignOutAlt className="mr-2" />
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <Link
                                        to="/register"
                                        className="text-pink dark:text-pink hover:text-blue-500 font-medium transition duration-200 flex items-center"
                                    >
                                        <FaUserPlus className="mr-2" />
                                        Register
                                    </Link>
                                    <Link
                                        to="/login"
                                        className="bg-blue-600 text-white hover:bg-blue-700 dark:hover:bg-blue-500 px-4 py-2 rounded-lg font-medium transition duration-200 flex items-center"
                                    >
                                        <FaSignInAlt className="mr-2" />
                                        Login
                                    </Link>
                                    <a
                                        href={`${URL}/admin/login/`}
                                        className="bg-blue-600 text-white hover:bg-blue-700 dark:hover:bg-blue-500 px-4 py-2 rounded-lg font-medium transition duration-200 flex items-center"
                                    >
                                        <FaAutoprefixer className="mr-2" />
                                        Admin
                                    </a>
                                </>
                            )}
                        </div>
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-gray-800 dark:text-gray-200 hover:text-blue-600 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    {isMenuOpen && (
                        <div className="md:hidden bg-white dark:bg-gray-800 shadow-md">
                            <div className="px-4 py-2 space-y-2">
                                <Link
                                    to="/about"
                                    className={`block font-medium transition duration-200 flex items-center ${
                                        location.pathname === '/about'
                                            ? 'text-blue-600 font-bold'
                                            : 'text-gray-800 dark:text-gray-200 hover:text-blue-600'
                                    }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <FaInfoCircle className="mr-2" />
                                    About
                                </Link>
                                <Link
                                    to="/customer-service"
                                    className={`block font-medium transition duration-200 flex items-center ${
                                        location.pathname === '/customer-service'
                                            ? 'text-blue-600 font-bold'
                                            : 'text-gray-800 dark:text-gray-200 hover:text-blue-600'
                                    }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <FaPhone className="mr-2" />
                                    Customer Service
                                </Link>
                                <Link
                                    to="/cancellation-refund"
                                    className={`block font-medium transition duration-200 flex items-center ${
                                        location.pathname === '/cancellation-refund'
                                            ? 'text-blue-600 font-bold'
                                        : 'text-gray-800 dark:text-gray-200 hover:text-blue-600'
                                    }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <FaUndo className="mr-2" />
                                    Cancellation
                                </Link>
                                {token && (
                                    <Link
                                        to="/my-bookings"
                                        className={`block font-medium transition duration-200 flex items-center ${
                                            location.pathname === '/my-bookings'
                                                ? 'text-blue-600 font-bold'
                                                : 'text-gray-800 dark:text-gray-200 hover:text-blue-600'
                                        }`}
                                    >
                                        <FaBook className="mr-2" />
                                        My Bookings
                                    </Link>
                                )}
                                {token ? (
                                    <div className="relative" ref={mobileDropdownRef}>
                                        <button
                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                            className="flex items-center text-gray-800 dark:text-gray-200 hover:text-blue-600 transition duration-200"
                                        >
                                            {profileImage ? (
                                                <img
                                                    src={profileImage}
                                                    alt="Profile"
                                                    className="h-6 w-6 rounded-full object-cover mr-2"
                                                />
                                            ) : (
                                                <FaUserCircle className="h-6 w-6 mr-2" />
                                            )}
                                            <span className="font-medium">Profile</span>
                                        </button>
                                        {isDropdownOpen && (
                                            <div className="mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl">
                                                <Link
                                                    to={`/user/${localStorage.getItem('userId')}/bookings`}
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 transition duration-200 flex items-center"
                                                    onClick={() => {
                                                        setIsDropdownOpen(false);
                                                        setIsMenuOpen(false);
                                                    }}
                                                >
                                                    <FaBook className="mr-2" />
                                                    Booking History
                                                </Link>
                                                <Link
                                                    to={`/user/${localStorage.getItem('userId')}/profile`}
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 transition duration-200 flex items-center"
                                                    onClick={() => {
                                                        setIsDropdownOpen(false);
                                                        setIsMenuOpen(false);
                                                    }}
                                                >
                                                    <FaUser className="mr-2" />
                                                    Profile
                                                </Link>
                                                <button
                                                    onClick={() => toggleTheme('light')}
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 transition duration-200 flex items-center"
                                                >
                                                    <FaSun className="mr-2" />
                                                    Light Mode
                                                </button>
                                                <button
                                                    onClick={() => toggleTheme('dark')}
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 transition duration-200 flex items-center"
                                                >
                                                    <FaMoon className="mr-2" />
                                                    Dark Mode
                                                </button>
                                                <button
                                                    onClick={() => toggleTheme('system')}
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 transition duration-200 flex items-center"
                                                >
                                                    <FaLaptop className="mr-2" />
                                                    System Mode
                                                </button>
                                                <button
                                                    onClick={logout}
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-red-100 dark:hover:bg-red-700 hover:text-blue-600 transition duration-200 flex items-center"
                                                >
                                                    <FaSignOutAlt className="mr-2" />
                                                    Logout
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <>
                                        <Link
                                            to="/register"
                                            className="block text-gray-800 dark:text-gray-200 hover:text-blue-600 font-medium transition duration-200 flex items-center"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <FaUserPlus className="mr-2" />
                                            Register
                                        </Link>
                                        <Link
                                            to="/login"
                                            className="block text-gray-800 dark:text-gray-200 hover:text-blue-600 font-medium transition duration-200 flex items-center"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <FaSignInAlt className="mr-2" />
                                            Login
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                {children}
            </main>



<footer className="bg-gray-800 dark:bg-gray-950 text-white dark:text-gray-200">
  <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center sm:text-center md:text-left">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="footer-column flex flex-col items-center md:items-start">
        <h3 className="text-lg font-semibold mb-4">ABC Bus Bookings</h3>
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <a href="/">
            <img src={Logo} alt="ABC Bus Bookings Logo" className="h-12 w-auto" />
          </a>
          <a
            href="/offers"
            className="gradient-glow-button text-black hover:text-white font-semibold px-6 py-3 rounded-md shadow-md animate-pulse"
            style={{
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Offers
          </a>
        </div>
        <p className="text-gray-400 text-sm mt-4">
          Your trusted platform for hassle-free bus travel across the country.
        </p>
        <p className="text-gray-400 text-sm mt-2">
          Developed by -{' '}
          <span className="text-yellow-600 hover:text-blue-500">
            <a href="https://www.linkedin.com/in/aaditya-bachchu-chatterjee-0485933b/">
              Aaditya B Chatterjee
            </a>
          </span>
          .
        </p>
      </div>
      <div className="footer-column flex flex-col items-center md:items-start">
        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
        <ul className="space-y-2 text-sm">
          <li>
            <Link to="/" className="text-gray-400 hover:text-white">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-gray-400 hover:text-white">
              About
            </Link>
          </li>
          <li>
            <Link to="/customer-service" className="text-gray-400 hover:text-white">
              Customer Service
            </Link>
          </li>
          <li>
            <Link to="/cancellation-refund" className="text-gray-400 hover:text-white">
              Cancellation & Refund
            </Link>
          </li>
          <li>
            <Link to="/partners" className="text-gray-400 hover:text-white">
              Our Partners
            </Link>
          </li>
        </ul>
      </div>
      <div className="footer-column flex flex-col items-center md:items-start">
        <h3 className="text-lg font-semibold mb-4">Support</h3>
        <ul className="space-y-2 text-sm">
          <li>
            <Link to="/faq" className="text-gray-400 hover:text-white">
              FAQ
            </Link>
          </li>
          <li>
            <Link to="/testimonials" className="text-gray-400 hover:text-white">
              Testimonials
            </Link>
          </li>
          <li>
            <Link to="/careers" className="text-gray-400 hover:text-white">
              Careers
            </Link>
          </li>
          <li>
            <Link to="/privacy" className="text-gray-400 hover:text-white">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to="/our-team" className="text-gray-400 hover:text-white">
              Our Team
            </Link>
          </li>
        </ul>
      </div>
      <div className="footer-column flex flex-col items-center md:items-end">
        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
        <ul className="space-y-2 text-sm">
          <li>
            <a
              href="https://twitter.com/abcbusbookings"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white flex items-center"
            >
              <FaTwitter className="mr-2" />
              Twitter
            </a>
          </li>
          <li>
            <a
              href="https://facebook.com/abcbusbookings"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white flex items-center"
            >
              <FaFacebook className="mr-2" />
              Facebook
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com/abcbusbookings"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white flex items-center"
            >
              <FaInstagram className="mr-2" />
              Instagram
            </a>
          </li>
          <li>
            <a
              href="https://linkedin.com/company/abcbusbookings"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white flex items-center"
            >
              <FaLinkedin className="mr-2" />
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div className="mt-8 border-t border-gray-700 pt-6">
      <p className="text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} ABC Bus Bookings. All rights reserved.
      </p>
    </div>
  </div>
</footer>




        </div>
    );
};

export default Wrapper;