import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaUserTie, FaCamera, FaArrowRight } from 'react-icons/fa';
import Logo from '../assets/logo.png';
import { ThemeContext } from '../components/ThemeContext';
import Team from '../assets/team.png';

const teamMembers = [
   {
    name: 'Aaditya B Chatterjee',
    title: 'CEO & Founder',
    bio: 'Aaditya drives our vision with lot of years of experience in history, geography nd travel tech.',
    image: 'https://avatars.githubusercontent.com/u/57300089?s=400&u=f3713021dc5fec60d3182cc9f83b7683b0bd997b&v=4',
    photographer: 'friends ',
  },
  {
    name: 'Julie Agarwal',
    title: 'Financial Analyst',
    bio: 'Alice keeps our finances on track for sustainable growth.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    photographer: 'Ayo Ogunseinde',
  },
  {
    name: 'Bobby Gupta',
    title: 'CTO',
    bio: 'Bob leads our tech team, ensuring seamless booking experiences.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    photographer: 'Joseph Gonzalez',
  },
  {
    name: 'Amrita Singh',
    title: 'Head of Operations',
    bio: 'Clara optimizes our logistics for smooth operations nationwide.',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f',
    photographer: 'Priscilla Du Preez',
  },
  {
    name: 'Rajeev Ranjan',
    title: 'Marketing Director',
    bio: 'David crafts campaigns to connect travelers with our services.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    photographer: 'Rafael Barros',
  },
  {
    name: 'Payal Rastogi',
    title: 'Customer Success Manager',
    bio: 'Emma ensures every customer has a delightful experience.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    photographer: 'Thought Catalog',
  },
  {
    name: 'Hriday Kumar',
    title: 'Lead Developer',
    bio: 'Frank builds robust systems to power our platform.',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
    photographer: 'Ayo Ogunseinde',
  },
  {
    name: 'Shreya Sharma',
    title: 'UX Designer',
    bio: 'Grace designs intuitive interfaces for effortless navigation.',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
    photographer: 'Ayo Ogunseinde',
  },

];

const OurTeam = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-800 dark:to-blue-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img
            src={Logo}
            alt="ABC Bus Bookings Logo"
            className="h-30 mx-auto mb-4 animate-pulse"
          />
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Meet Our Team
          </h1>
          <p className="text-lg md:text-xl text-white opacity-90 mb-6 max-w-3xl mx-auto">
            We're a passionate group dedicated to making bus travel seamless and enjoyable. Get to know the faces behind ABC Bus Bookings!
          </p>
          <Link
            to="/careers"
            className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-100 dark:bg-gray-800 dark:text-blue-300 dark:hover:bg-gray-700 transition duration-300"
          >
            Join Our Team <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
      <img
            src={Team}
            alt="ABC Bus Bookings Team"
            className="h-auto mx-auto mb-4"
          />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="relative group bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                  <p className="text-white text-sm text-center">{member.bio}</p>
                </div>
              </div>
              <div className="p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <FaUserTie className="text-blue-500 text-xl mr-2" />
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                    {member.name}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {member.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center">
                  <FaCamera className="mr-1 text-blue-500" />
                  Photo by{' '}
                  <a
                    href={`https://unsplash.com/@${member.photographer
                      .toLowerCase()
                      .replace(/\s+/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-500 ml-1"
                  >
                    {member.photographer}
                  </a>{' '}
                  on Unsplash
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurTeam;