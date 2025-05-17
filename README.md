# ABC-BUS-BOOKINGS
A basic Bus online ticket booking project. ABC Bus Bookings is a full-stack web application for booking bus tickets,
offering a seamless user experience with features like user authentication, seat selection, payment integration, 
and an admin dashboard. Built with React, Django, PostgreSQL, and Tailwind CSS, it provides a modern, responsive 
interface and robust backend functionality. This Repository consist React frontend source code.

![](https://github.com/AadityaUoHyd/abc-bus-bookings/blob/main/Screenshot.png)

# Frontend Project Structure
```
abc-bus-bookings/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── BusList.jsx
│   │   ├── BusSeats.jsx
│   │   └── Checkout.jsx
|   |        ......
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── MyBookingHistory.jsx
│   │   └── Profile.jsx
|   |        ......
│   ├── App.jsx
│   ├── index.css
│   ├── App.css
│   └── main.jsx
├── public/
├── .env
├── package.json
├── tailwind.config.js
├── index.html
├── vite.config.js
├── vercel.json  # New file for Vercel configuration
├── README.md
└── .gitignore
```

# Table of Contents
- Features
- Tech Stack
- Installation
- Usage
- API Endpoints


## Features
- User Authentication: Register, login, and manage profiles with token-based authentication.
- Bus Booking: Search buses, select seats, and book tickets with real-time availability.
- Payment Integration: Secure payments via Razorpay with success and failure handling.
- Profile Management: Update user details and profile images with preview functionality.
- Admin Dashboard: Visualize revenue, booking trends, and success rates with Chart.js.
- Discount Offers: Public offer page with countdown timers and discounted routes.
- Responsive Design: Mobile-friendly UI with dark mode support using Tailwind CSS.
- Error Handling: Toast notifications for user feedback and robust error boundaries.

## Tech Stack
### Frontend:
- React 18 (Vite for development)
- Tailwind CSS (via CDN)
- React Router DOM (routing)
- Axios (API requests)
- React Hot Toast (notifications)
- React Icons (icons)
- Neon DB (PostgreSQL 17)

### Backend:
- Django 5.2 (Python 3.11)
- Django REST Framework (API)
- PostgreSQL (database)
- Razorpay (payment gateway)

## How to run backend (Django)
```
- From root directory => pip install -r requirements.txt
- Create admin user if you want.
- Come inside of travels => python manage.py makemigrations
                            python manage.py migrate 
                            python manage.py runserver
```

## Tools:
- Vite (frontend build tool)
- Django Admin (backend management)
- Git (version control)

## Installation
- Prerequisites

[//]: # (Node.js &#40;>=18.x&#41;)

[//]: # (Python &#40;>=3.11&#41;)

[//]: # (PostgreSQL &#40;>=13.x&#41;)

[//]: # (Git)

[//]: # (Razorpay account &#40;for payment integration&#41;)

## Backend Setup

- Clone the repository:git clone https://github.com/AadityaUoHyd/abc-bus-bookings.git
- cd abc-bus-bookings
- Create a virtual environment and install dependencies:python -m venv venv
- source venv/bin/activate  # On Windows: venv\Scripts\activate
- pip install -r requirements.txt

## Configure environment variables in .env:
- SECRET_KEY=your_django_secret_key
- DEBUG=True
- DATABASE_URL=postgresql://user:password@localhost:5432/abc_bus
- RAZORPAY_KEY_ID=your_razorpay_key_id
- RAZORPAY_SECRET_KEY=your_razorpay_secret_key
- VITE_BACKEND_URL=http://localhost:8000

- Set up the database:python manage.py migrate
- python manage.py createsuperuser

- Run the Django server:python manage.py runserver

## Frontend Setup (React Js)
- Navigate to the frontend directory (if separate, else root):cd frontend  # Adjust if frontend is in root
- Install dependencies : npm install
- Build your frontend : npm run build
- Configure environment variables in .env:VITE_BACKEND_URL=http://localhost:8000
- Run the development server : npm run dev

## Accessing the Application
- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- Admin Dashboard: http://localhost:8000/admin/ (login with superuser credentials)

## Usage
- Register/Login: Create an account or log in at /register or /login.
- Book a Ticket:
  Navigate to /booking, select a bus and seats.
  Complete payment via Razorpay.


### View Profile: Update details or profile image at /profile/:userId.
### Explore Offers: Check discounts at /offers.
### Admin Dashboard:
- Log in as a staff user at /admin/bookings/admin-dashboard/.
- View revenue, booking stats, and export CSVs.



## API Endpoints
### Users:
- POST /api/users/register/ - Register a new user
- POST /api/users/login/ - User login (returns token)
- GET/POST /api/users/user/:id/profile/ - Get/update user profile

### Bookings:
- GET /api/bookings/buses/ - List all buses
- POST /api/bookings/book/ - Create a booking
- POST /api/bookings/verify-payment/ - Verify Razorpay payment
- GET /api/bookings/user/:userId/ - Get user bookings

### Admin:
- GET /admin/bookings/admin-dashboard/ - Admin dashboard
- GET /admin/bookings/export/csv/ - Export booking CSVs

### Offers (proposed):
- GET /api/offers/ - List active offers...and so on...


### Developed by - Aaditya B Chatterjee
- Find Demo: https://abc-bus-bookings.vercel.app