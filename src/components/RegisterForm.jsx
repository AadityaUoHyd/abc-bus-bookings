import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../assets/logo.png';
import RegisterBg from '../assets/register.png';

const RegisterForm = () => {
    const [form, setForm] = useState({
        full_name: '',
        email: '',
        country_code: '+91',
        mobile_number: '',
        password: '',
        otp: '',
    });
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

    const countries = [
        { code: '+1', name: 'United States', flag: '🇺🇸', iso: 'US' },
        { code: '+20', name: 'Egypt', flag: '🇪🇬', iso: 'EG' },
        { code: '+62', name: 'Indonesia', flag: '🇮🇩', iso: 'ID' },
        { code: '+63', name: 'Philippines', flag: '🇵🇭', iso: 'PH' },
        { code: '+66', name: 'Thailand', flag: '🇹🇭', iso: 'TH' },
        { code: '+84', name: 'Vietnam', flag: '🇻🇳', iso: 'VN' },
        { code: '+91', name: 'India', flag: '🇮🇳', iso: 'IN' },
        { code: '+880', name: 'Bangladesh', flag: '🇧🇩', iso: 'BD' },
        { code: '+234', name: 'Nigeria', flag: '🇳🇬', iso: 'NG' },
        { code: '+251', name: 'Ethiopia', flag: '🇪🇹', iso: 'ET' },
        { code: '+254', name: 'Kenya', flag: '🇰🇪', iso: 'KE' },
        { code: '+233', name: 'Ghana', flag: '🇬🇭', iso: 'GH' },
        { code: '+593', name: 'Ecuador', flag: '🇪🇨', iso: 'EC' },
        { code: '+964', name: 'Iraq', flag: '🇮🇶', iso: 'IQ' },
        { code: '+98', name: 'Iran', flag: '🇮🇷', iso: 'IR' },
        { code: '+7', name: 'Russia', flag: '🇷🇺', iso: 'RU' },
    ];

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCountrySelect = (code) => {
        setForm({ ...form, country_code: code });
        setIsDropdownOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password.length < 8) {
            toast.error('Password must be at least 8 characters long', {
                position: 'top-right',
                autoClose: 3000,
            });
            return;
        }
        if (!/^[0-9]{10}$/.test(form.mobile_number)) {
            toast.error('Mobile number must be a 10-digit number', {
                position: 'top-right',
                autoClose: 3000,
            });
            return;
        }
        setIsLoading(true);
        try {
            const user_mobile = `${form.country_code}${form.mobile_number}`;
            await axios.post(`${URL}/api/users/register/`, {
                full_name: form.full_name,
                email: form.email,
                user_mobile,
                password: form.password,
            });
            setMessage('OTP sent to your email. Please verify.');
            setIsOtpSent(true);
        } catch (error) {
            console.error('Error registering:', error.response?.data || error.message);
            toast.error(
                error.response?.data?.error ||
                error.response?.data?.full_name?.[0] ||
                error.response?.data?.email?.[0] ||
                error.response?.data?.user_mobile?.[0] ||
                'Registration failed. Please check your details.',
                { position: 'top-right', autoClose: 3000 }
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleOtpVerify = async (e) => {
        e.preventDefault();
        if (!/^[0-9]{6}$/.test(form.otp)) {
            toast.error('OTP must be a 6-digit number', {
                position: 'top-right',
                autoClose: 3000,
            });
            return;
        }
        setIsLoading(true);
        try {
            await axios.post(`${URL}/api/users/otp/verify/`, {
                email: form.email,
                otp: form.otp,
            });
            setMessage('Email verified! Redirecting to login...');
            setForm({ full_name: '', email: '', country_code: '+91', mobile_number: '', password: '', otp: '' });
            setIsOtpSent(false);
            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            console.error('Error verifying OTP:', error.response?.data || error.message);
            toast.error(
                error.response?.data?.error || 'Failed to verify OTP. Please check the OTP and try again.',
                { position: 'top-right', autoClose: 3000 }
            );
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div
            className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
            style={{ backgroundImage: `url(${RegisterBg})`, backgroundSize: 'cover' }}
        >
            <ToastContainer />
            <div className="absolute inset-0 bg-black/40 dark:bg-black/50"></div>
            <div className="relative max-w-md w-full card p-8 space-y-6 transform transition-all hover:shadow-2xl">
                <div className="flex justify-center">
                    <img src={Logo} alt="ABC Bus Bookings Logo" className="h-12 w-auto" />
                </div>
                <h2 className="text-center text-2xl sm:text-3xl font-bold text-black dark:text-gray-500">
                    Join ABC Bus Bookings
                </h2>
                <form onSubmit={isOtpSent ? handleOtpVerify : handleSubmit} className="space-y-5">
                    {!isOtpSent ? (
                        <>
                            <div>
                                <label
                                    htmlFor="full_name"
                                    className="block text-sm font-medium text-black dark:text-gray-500"
                                >
                                    Full Name
                                </label>
                                <input
                                    id="full_name"
                                    name="full_name"
                                    type="text"
                                    required
                                    className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white dark:bg-gray-900 text-black dark:text-white transition duration-200"
                                    value={form.full_name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-black dark:text-gray-500"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white dark:bg-gray-900 text-black dark:text-white transition duration-200"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div ref={dropdownRef}>
                                <label
                                    htmlFor="country_code"
                                    className="block text-sm font-medium text-black dark:text-gray-500"
                                >
                                    Country Code
                                </label>
                                <div className="relative">
                                    <div
                                        className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-white dark:text-gray-500 cursor-pointer flex items-center justify-between"
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        style={{ fontFamily: "'Segoe UI Emoji', 'Noto Color Emoji', Arial, sans-serif" }}
                                    >
                                        <span>
                                            {countries.find(c => c.code === form.country_code)?.flag}{' '}
                                            {countries.find(c => c.code === form.country_code)?.name} ({form.country_code})
                                        </span>
                                        <svg
                                            className={`w-5 h-5 transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </div>
                                    {isDropdownOpen && (
                                        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-500 border border-gray-500 dark:border-gray-400 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                            {countries.map(country => (
                                                <div
                                                    key={country.code}
                                                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-300 cursor-pointer flex items-center"
                                                    onClick={() => handleCountrySelect(country.code)}
                                                    style={{ fontFamily: "'Segoe UI Emoji', 'Noto Color Emoji', Arial, sans-serif" }}
                                                >
                                                    <span>{country.flag} {country.name} ({country.code})</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="mobile_number"
                                    className="block text-sm font-medium text-black dark:text-gray-500"
                                >
                                    Mobile Number (10 digits)
                                </label>
                                <input
                                    id="mobile_number"
                                    name="mobile_number"
                                    type="tel"
                                    required
                                    pattern="[0-9]{10}"
                                    className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white dark:bg-gray-900 text-black dark:text-white transition duration-200"
                                    value={form.mobile_number}
                                    onChange={handleChange}
                                    placeholder="Enter 10-digit number (e.g., 9876543210)"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-black dark:text-gray-500"
                                >
                                    Password (minimum 8 characters)
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white dark:bg-gray-900 text-black dark:text-white transition duration-200"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                />
                            </div>
                        </>
                    ) : (
                        <div>
                            <label
                                htmlFor="otp"
                                className="block text-sm font-medium text-black dark:text-white"
                            >
                                OTP (sent to {form.email})
                            </label>
                            <input
                                id="otp"
                                name="otp"
                                type="text"
                                required
                                maxLength="6"
                                pattern="[0-9]{6}"
                                className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white dark:bg-gray-900 text-black dark:text-white transition duration-200"
                                value={form.otp}
                                onChange={handleChange}
                                placeholder="Enter 6-digit OTP"
                            />
                        </div>
                    )}

                    {message && (
                        <div
                            className={`rounded-lg p-3 text-sm ${
                                message.includes('successful') || message.includes('verified')
                                    ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                                    : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                            }`}
                        >
                            {message}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2 px-4 btn-primary font-medium disabled:opacity-50 flex items-center justify-center"
                    >
                        {isLoading ? (
                            <>
                                <svg
                                    className="animate-spin h-5 w-5 mr-2 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                {isOtpSent ? 'Verifying...' : 'Registering...'}
                            </>
                        ) : (
                            isOtpSent ? 'Verify OTP' : 'Register'
                        )}
                    </button>
                </form>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                    Already have an account?{' '}
                    <a
                        href="/login"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
};

export default RegisterForm;