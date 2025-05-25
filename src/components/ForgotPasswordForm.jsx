import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../assets/logo.png';
import LoginBg from '../assets/login.png';

const ForgotPasswordForm = () => {
    const [form, setForm] = useState({
        email: '',
        otp: '',
        new_password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const navigate = useNavigate();

    const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRequestOtp = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(`${URL}/api/users/password/reset/request/`, {
                email: form.email,
            });
            toast.success(response.data.message || 'OTP sent to your email. Please verify.', {
                position: 'top-right',
                autoClose: 3000,
            });
            setIsOtpSent(true);
        } catch (error) {
            console.error('Error sending OTP:', error.response?.data || error.message);
            toast.error(
                error.response?.data?.error || 'Failed to send OTP. Please check the email and try again.',
                { position: 'top-right', autoClose: 3000 }
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (form.new_password.length < 8) {
            toast.error('New password must be at least 8 characters long', {
                position: 'top-right',
                autoClose: 3000,
            });
            return;
        }
        if (!/^[0-9]{6}$/.test(form.otp)) {
            toast.error('OTP must be a 6-digit number', {
                position: 'top-right',
                autoClose: 3000,
            });
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.post(`${URL}/api/users/password/reset/confirm/`, {
                email: form.email,
                otp: form.otp,
                new_password: form.new_password,
            });
            toast.success(response.data.message || 'Password reset successfully! Redirecting to login...', {
                position: 'top-right',
                autoClose: 2000,
            });
            setForm({ email: '', otp: '', new_password: '' });
            setIsOtpSent(false);
            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            console.error('Error resetting password:', error.response?.data || error.message);
            toast.error(
                error.response?.data?.error || 'Failed to reset password. Please check OTP and try again.',
                { position: 'top-right', autoClose: 3000 }
            );
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
                    Reset Your Password
                </h2>
                <form onSubmit={isOtpSent ? handleResetPassword : handleRequestOtp} className="space-y-5">
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
                    {isOtpSent && (
                        <>
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
                            <div>
                                <label
                                    htmlFor="new_password"
                                    className="block text-sm font-medium text-black dark:text-gray-500"
                                >
                                    New Password (minimum 8 characters)
                                </label>
                                <input
                                    id="new_password"
                                    name="new_password"
                                    type="password"
                                    required
                                    className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white dark:bg-gray-900 text-black dark:text-white transition duration-200"
                                    value={form.new_password}
                                    onChange={handleChange}
                                    placeholder="Enter new password"
                                />
                            </div>
                        </>
                    )}

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
                                <span>{isOtpSent ? 'Resetting...' : 'Sending OTP...'}</span>
                            </div>
                        ) : (
                            <span>{isOtpSent ? 'Reset Password' : 'Send OTP'}</span>
                        )}

                    </button>
                </form>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                    Remembered your password?{' '}
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

export default ForgotPasswordForm;