import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import ProfileLogo from '../assets/history.png';

const Profile = ({ token }) => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        full_name: '',
        email: '',
        user_mobile: '',
        profile_image: null,
    });
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

    useEffect(() => {
        const effectiveUserId = userId || localStorage.getItem('userId');

        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${URL}/api/users/user/${effectiveUserId}/profile/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                setProfile({
                    full_name: response.data.full_name || '',
                    email: response.data.email || '',
                    user_mobile: response.data.user_mobile || '',
                    profile_image: response.data.profile_image || null,
                });
            } catch (error) {
                console.error('Error fetching profile:', error);
                toast.error(`Failed to fetch profile: ${error.response?.data?.error || 'Unknown error'}`);
                if (error.response?.status === 401) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('userId');
                    navigate('/login');
                } else {
                    navigate('/');
                }
            }
        };

        if (token && effectiveUserId) {
            fetchProfile();
        } else {
            toast.error('Please log in to view your profile');
            navigate('/login');
        }
    }, [token, userId, navigate]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedImage(file);
            try {
                const previewUrl = window.URL.createObjectURL(file);
                setImagePreview(previewUrl);
            } catch (error) {
                console.error('Error creating image preview:', error);
                toast.error('Failed to preview image');
                setSelectedImage(null);
                setImagePreview(null);
            }
        } else {
            toast.error('Please select a valid image file');
            setSelectedImage(null);
            setImagePreview(null);
        }
    };

    const handleImageUpload = async (e) => {
        e.preventDefault();
        if (!selectedImage) {
            toast.error('Please select an image to upload');
            return;
        }

        const effectiveUserId = userId || localStorage.getItem('userId');
        const formData = new FormData();
        formData.append('profile_image', selectedImage);

        try {
            const response = await axios.post(`${URL}/api/users/user/${effectiveUserId}/profile/`, formData, {
                headers: {
                    Authorization: `Token ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setProfile((prev) => ({
                ...prev,
                profile_image: response.data.profile_image,
            }));
            setSelectedImage(null);
            setImagePreview(null);
            toast.success('Profile image updated successfully');

            const profileResponse = await axios.get(`${URL}/api/users/user/${effectiveUserId}/profile/`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            setProfile({
                full_name: profileResponse.data.full_name || '',
                email: profileResponse.data.email || '',
                user_mobile: profileResponse.data.user_mobile || '',
                profile_image: profileResponse.data.profile_image || null,
            });
            if (imagePreview) {
                window.URL.revokeObjectURL(imagePreview);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error(`Failed to update profile image: ${error.response?.data?.error || 'Unknown error'}`);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        const effectiveUserId = userId || localStorage.getItem('userId');
        const passwordData = {
            current_password: currentPassword,
            new_password: newPassword,
            confirm_new_password: confirmNewPassword,
        };

        try {
            const response = await axios.post(`${URL}/api/users/user/${effectiveUserId}/profile/`, passwordData, {
                headers: {
                    Authorization: `Token ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            toast.success('Password updated successfully');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
        } catch (error) {
            console.error('Error changing password:', error);
            toast.error(`Failed to change password: ${error.response?.data?.error || 'Unknown error'}`);
        }
    };

    useEffect(() => {
        return () => {
            if (imagePreview) {
                window.URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-start bg-[var(--background)] px-4 pt-6 relative"
            style={{
                backgroundImage: `url(${ProfileLogo})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute inset-0 backdrop-blur-s bg-white/30 dark:bg-black/30 z-0"></div>
            <Toaster position="top-right" reverseOrder={false} />

            <div className="mb-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-xl relative z-10">
                <h2 className="px-2 py-0 mt-0 text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">User Profile</h2>

                <div className="flex justify-center mb-4">
                    {profile.profile_image ? (
                        <img
                            src={profile.profile_image}
                            alt="Profile"
                            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover"
                            onError={() => setProfile((prev) => ({ ...prev, profile_image: null }))}
                        />
                    ) : (
                        <FaUserCircle className="w-24 h-24 sm:w-32 sm:h-32 text-gray-400" />
                    )}
                </div>

                <div className="mb-4 flex items-center">
                    <label className="text-blue-500 dark:text-blue-500 font-semibold mr-2">
                        Full Name:
                    </label>
                    <p className="text-gray-800 dark:text-gray-200">{profile.full_name}</p>
                </div>

                <div className="mb-4 flex items-center">
                    <label className="text-blue-500 dark:text-blue-500 font-semibold mr-2">
                        Email:
                    </label>
                    <p className="text-gray-800 dark:text-gray-200">{profile.email}</p>
                </div>

                <div className="mb-4 flex items-center">
                    <label className="text-blue-500 dark:text-blue-500 font-semibold mr-2">
                        Mobile Number:
                    </label>
                    <p className="text-gray-800 dark:text-gray-200">{profile.user_mobile}</p>
                </div>

                <div className="mb-6 flex items-center space-x-4">
                    <label className="text-blue-500 dark:text-blue-500 font-semibold whitespace-nowrap">
                        Profile Image:
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="text-sm text-gray-500
                                   file:mr-2 file:py-2 file:px-4
                                   file:rounded-lg file:border-0
                                   file:text-sm file:font-medium
                                   file:bg-blue-100 file:text-blue-700
                                   hover:file:bg-blue-200"
                    />

                    {imagePreview && (
                        <div className="flex items-center space-x-4 mt-2">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="h-12 w-12 rounded-full object-cover"
                                onError={() => {
                                    setImagePreview(null);
                                    setSelectedImage(null);
                                    toast.error('Failed to load image preview');
                                }}
                            />
                            <button
                                onClick={handleImageUpload}
                                className="bg-blue-600 text-white py-1 px-3 rounded-lg hover:bg-blue-700 transition duration-200 text-sm"
                            >
                                Upload
                            </button>
                        </div>
                    )}
                </div>

                <h3 className="text-xl font-semibold mb-4 text-blue-500 dark:text-blue-500 mt-10">Change Your Password</h3>
                <form onSubmit={handlePasswordChange}>
                    <div className="mb-4">
                        <label htmlFor="current-password" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                            Current Password
                        </label>
                        <input
                            type="password"
                            id="current-password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                            autoComplete="current-password"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="new-password" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="new-password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                            autoComplete="new-password"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="confirm-new-password" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            id="confirm-new-password"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                            autoComplete="new-password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Change Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
