# EventEase - Full-Stack Event Management System

Welcome to EventEase, a smart event planning and management system. This repository contains the complete full-stack application, including the Node.js/Express.js backend API and the React frontend.

## Overview

EventEase provides a centralized platform where organizers can create and manage events, track registrations, and communicate with attendees, while attendees can browse, register, and stay updated on events they care about. The system supports three user roles: Organizer, Attendee, and Admin, each with a tailored experience and specific permissions.

## Features

### Backend (API)

- **User Management**: JWT-based authentication, user registration, and profile management.
- **Role-Based Access Control**: Differentiates between Attendee, Organizer, and Admin roles.
- **Full Event CRUD**: Organizers can create, read, update, and delete events.
- **Event Registration & Bookmarking**: Attendees can RSVP for and save events.
- **Notifications**: Organizers can send notifications to event attendees.
- **Admin Panel**: Admins can manage user accounts.

### Frontend (React App)

- **Responsive Design**: A mobile-first interface that works on all devices.
- **Role-Based UI**: The interface dynamically adapts to the logged-in user's role.
- **Client-Side Routing**: Fast and smooth navigation handled by React Router.
- **Global State Management**: A central `AuthContext` handles user authentication across the app.
- **Protected Routes**: Prevents unauthorized access to pages.

## Technology Stack

| Area     | Technology              |
| -------- | ----------------------- |
| Frontend | React.js (with Vite)    |
| Backend  | Node.js & Express.js    |
| Database | MongoDB (with Mongoose) |
| Routing  | React Router DOM        |
| HTTP     | Axios                   |
| Auth     | JSON Web Tokens (JWT)   |
| Styling  | Custom CSS              |

## Project Structure

```
CAPSTONE/
├── EVENTEASE-API/      # The Node.js/Express.js backend
└── EVENTEASE-REACT/    # The React.js frontend
    └── eventease/
```

## Local Development Setup

### Prerequisites

- Node.js (v18 or later recommended)
- npm (Node Package Manager)
- MongoDB (local instance or a cloud service like MongoDB Atlas)
- Git

---

### 1. Backend Setup (`EVENTEASE-API`)

First, set up and run the backend server.

**a. Navigate to the API directory and install dependencies:**

```bash
cd EVENTEASE-API
npm install
```

**b. Create and configure your `.env` file:**
Create a file named `.env` in the `EVENTEASE-API` root and add the following variables:

```env
# MongoDB Connection String
MONGO_URI=your_mongodb_connection_string

# JWT Secret Key
JWT_SECRET=your_super_secret_key_for_jwt

# Server Port (Optional)
PORT=1111
```

**c. Run the backend server:**

```bash
npm run dev
```

The API server should now be running, typically on `http://localhost:1111`.

---

### 2. Frontend Setup (`EVENTEASE-REACT`)

With the backend running, set up and run the frontend application.

**a. Navigate to the React app directory and install dependencies:**
_(Open a new, separate terminal for this step)_

```bash
cd EVENTEASE-REACT/eventease
npm install
```

**b. Create and configure your `.env` file:**
Create a file named `.env` in the `EVENTEASE-REACT/eventease` root. Vite requires these variables to be prefixed with `VITE_`.

```env
# The base URL of your local backend API
VITE_API_BASE_URL=http://localhost:1111/api
```

**c. Run the frontend application:**

```bash
npm run dev
```

The React app should now be running, typically on `http://localhost:5173`.

## API Endpoints

A brief overview of the available API routes.

- **Authentication (`/api/auth`)**: `POST /register`, `POST /login`, `GET /me`
- **Events (`/api/events`)**: Full CRUD, RSVP, Save/Unsave, Notify, etc.
- **Users (`/api/users`)**: Get all users, get saved events, update status/profile.

_For a detailed list of all endpoints, refer to the code in the `EVENTEASE-API/routes` directory._
