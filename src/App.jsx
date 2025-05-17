import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RegisterForm from './components/RegisterForm.jsx';
import LoginForm from './components/LoginForm.jsx';
import BusList from './components/BusList.jsx';
import BusSeats from './components/BusSeats.jsx';
import UserBookings from './components/UserBooking.jsx';
import Wrapper from './components/Wrapper.jsx';
import ThemeProvider from './components/ThemeContext.jsx';
import Privacy from './pages/Privacy';
import About from './pages/About';
import CustomerService from './pages/CustomerService';
import CancellationRefund from './pages/CancellationRefund';
import FAQ from './pages/FAQ';
import Testimonials from './pages/Testimonials';
import Career from './pages/Career';
import MyBookingHistory from './pages/MyBookingHistory';
import Profile from './pages/Profile';
import OurTeam from './pages/OurTeam';
import Partners from './pages/Partners';
import ForgotPasswordForm from './components/ForgotPasswordForm.jsx';
import Checkout from './components/Checkout.jsx';
import Offers from './pages/Offers.jsx';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userId, setUserId] = useState(localStorage.getItem('userId'));
    const [selectedBusId, setSelectedBusId] = useState(null);


    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUserId = localStorage.getItem('userId');
        if (!storedToken || !storedUserId) {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            setToken(null);
            setUserId(null);
        }
    }, []);

    const handleLogin = (token, userId) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        setToken(token);
        setUserId(userId);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setToken(null);
        setUserId(null);
        setSelectedBusId(null);
    };

    // ProtectedRoute component to guard routes
    const ProtectedRoute = ({ children }) => {
        return token ? children : <Navigate to="/login" />;
    };

    return (
        <ThemeProvider>
            <Wrapper token={token} handleLogout={handleLogout}>
                <Routes>
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
                    <Route path='/forgot-password' element={<ForgotPasswordForm />} />
                    <Route path="/" element={<BusList onSelectBus={(id) => setSelectedBusId(id)} token={token} />} />
                    <Route path="/bus/:busId" element={<BusSeats token={token} selectedBusId={selectedBusId} />} />
                    <Route path="/my-bookings" element={<UserBookings token={token} userId={userId} />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/customer-service" element={<CustomerService />} />
                    <Route path="/cancellation-refund" element={<CancellationRefund />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/testimonials" element={<Testimonials />} />
                    <Route path="/careers" element={<Career />} />
                    <Route path="/our-team" element={<OurTeam />} />
                    <Route path="/partners" element={<Partners />} />
                    <Route path="/offers" element={<Offers />} />
                    <Route
                        path="/user/:userId/bookings"
                        element={
                            <ProtectedRoute>
                                <MyBookingHistory token={token} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/user/:userId/profile"
                        element={
                            <ProtectedRoute>
                                <Profile token={token} />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/bus/:busId/checkout" element={<Checkout token={token} />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Wrapper>
        </ThemeProvider>
    );
};

export default App;