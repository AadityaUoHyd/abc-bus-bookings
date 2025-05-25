import React from 'react';
import logo from '../assets/logo.png'; // Adjust path if needed

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <img
        src={logo}
        alt="Loading..."
        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 animate-spin"
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loading;
