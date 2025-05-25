import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../assets/logo.png';
import LoginBg from '../assets/login.png';

const LoginForm = ({ onLogin }) => {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(`${URL}/api/bookings/login/`, form);
            toast.success('Login Success', {
                position: 'top-right',
                autoClose: 3000,
            });
            if (onLogin) {
                onLogin(response.data.token, response.data.user_id);
            }
            navigate(from, { replace: true });
        } catch (error) {
            console.error('Error logging in:', error.response || error.message);
            if (error.response?.data?.error === 'Email not verified') {
                toast.error('User required to verify email', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            } else {
                toast.error(
                    'Login Failed: ' + (error.response?.data?.error || 'Invalid credentials'),
                    { position: 'top-right', autoClose: 3000 }
                );
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
            style={{ backgroundImage: `url(${LoginBg})`, backgroundSize: 'cover' }}
        >
            <ToastContainer />
            <div className="absolute inset-0 bg-black/40 dark:bg-black/50"></div>
            <div className="relative max-w-md w-full card p-8 space-y-6 transform transition-all hover:shadow-2xl">
                <div className="flex justify-center">
                    <img src={Logo} alt="ABC Bus Bookings Logo" className="h-12 w-auto" />
                </div>
                <h2 className="text-center text-2xl sm:text-3xl font-bold text-black dark:text-gray-500">
                    Sign in to ABC Bus Bookings
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
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
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-black dark:text-gray-500"
                        >
                            Password
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

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2 px-4 btn-primary font-medium disabled:opacity-50 flex items-center justify-center"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center gap-2">
                                <img
                                    src={Logo}
                                    alt="Loading..."
                                    className="h-5 w-5 sm:h-6 sm:w-6 animate-spin"
                                />
                                <span>Signing in...</span>
                            </div>
                        ) : (
                            'Sign in'
                        )}
                    </button>

                </form>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                    Don't have an account?{' '}
                    <a
                        href="/register"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        Register
                    </a>
                    {' | '}
                    <a
                        href="/forgot-password"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        Forgot Password?
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;