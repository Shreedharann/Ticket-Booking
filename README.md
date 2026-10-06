# 🚌 Bus Ticket Booking System

A modern and responsive **Bus Ticket Booking Web Application** built using **React.js**. The application allows users to search for buses, select seats, and complete bookings, while administrators can manage bus-related data.

## 📌 Project Overview

The **Bus Ticket Booking System** is a full-stack web application designed to simplify the bus reservation process. It provides a user-friendly interface for searching available buses, selecting seats, and managing bookings.

The application implements **role-based authentication** for Admin and User accounts, along with dynamic seat selection and seat-locking functionality to prevent booking conflicts.

## ✨ Features

### 👤 User Features

- User registration and login
- Role-based authentication
- Search buses based on travel details
- View available buses
- Select preferred seats
- Dynamic seat availability
- Seat locking during booking
- Booking summary
- Responsive user interface

### 🛠️ Admin Features

- Admin authentication
- Manage bus information
- Add and update bus details
- Manage available seats
- View booking-related information

### 🎫 Booking Features

- Dynamic seat selection
- Real-time seat availability
- Seat locking mechanism
- Booking confirmation
- Booking summary
- Prevention of duplicate seat selection

## 🧑‍💻 Tech Stack

### Frontend

- **React.js**
- **React Router**
- **JavaScript (ES6+)**
- **HTML5**
- **CSS3**
- **Axios**
- **Custom React Hooks**

### Backend / Data

- **JSON Server**
- **REST API**

### Development Tools

- **Visual Studio Code**
- **Git**
- **GitHub**
- **npm**

## 🏗️ Project Structure

```text
Bus-Ticket-Booking/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Signup.jsx
│   │   ├── Login.jsx
│   │   ├── SearchBus.jsx
│   │   ├── BusList.jsx
│   │   ├── SeatSelection.jsx
│   │   └── BookingSummary.jsx
│   │
│   ├── context/
│   │
│   ├── pages/
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── db.json
├── package.json
└── README.md
```

> Project structure may vary depending on the final implementation.

## 🔄 Application Flow

```text
User
 │
 ▼
Signup / Login
 │
 ▼
Search Bus
 │
 ▼
View Available Buses
 │
 ▼
Select Bus
 │
 ▼
Select Seats
 │
 ▼
Seat Locking
 │
 ▼
Booking Summary
 │
 ▼
Confirm Booking
```

## 🔐 Authentication

The application provides **role-based authentication**:

```text
                    Login
                      │
             ┌────────┴────────┐
             ▼                 ▼
           User              Admin
             │                 │
             ▼                 ▼
       Search & Book       Manage Buses
           Seats
```

Users can access booking functionality, while administrators have access to management features.

## 💺 Seat Selection

The seat selection module dynamically displays available and unavailable seats.

### Seat States

- 🟢 Available
- 🔴 Booked
- 🟡 Selected
- 🔒 Locked

The system prevents users from selecting seats that are already booked or temporarily locked.

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Shreedharann/Ticket-Booking.git
```

### 2. Navigate to the Project

```bash
cd Ticket-Booking
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start JSON Server

If your project uses `db.json`:

```bash
npx json-server --watch db.json --port 8000
```

The API will be available at:

```text
http://localhost:8000
```

### 5. Start the React Application

Open another terminal and run:

```bash
npm start
```

or, if the project uses Vite:

```bash
npm run dev
```

The application will then be available through the local URL shown in your terminal.

## 🔌 API

The application communicates with the JSON Server backend through REST APIs.

Example:

```text
GET    /api/buses
POST   /api/buses
GET    /api/buses/:id
PUT    /api/buses/:id
DELETE /api/buses/:id
```

> Update the API endpoints according to your actual `db.json` structure.

## 📱 Responsive Design

The application is designed to work across different screen sizes:

- 💻 Desktop
- 💻 Laptop
- 📱 Mobile
- 📱 Tablet

The interface focuses on usability, clear navigation, and responsive layouts.

## 🧠 Key Concepts Implemented

This project demonstrates practical knowledge of:

- React Components
- React Hooks
- Custom Hooks
- React Router
- Context API
- State Management
- REST API Integration
- Axios
- CRUD Operations
- Role-Based Authentication
- Dynamic Seat Selection
- Seat Locking
- Form Validation
- Responsive Web Design
- JSON Server

## 📸 Screenshots

Add your project screenshots here:

```markdown
![Login Page](screenshots/login.png)

![Bus Search](screenshots/bus-search.png)

![Bus List](screenshots/bus-list.png)

![Seat Selection](screenshots/seat-selection.png)

![Booking Summary](screenshots/booking-summary.png)
```

## 🔮 Future Enhancements

- Online payment integration
- Email/SMS booking confirmation
- JWT-based authentication
- Real backend using Spring Boot / Node.js
- Database integration with MySQL or PostgreSQL
- Booking history
- PDF ticket generation
- Cancellation and refund functionality
- Admin dashboard with analytics
- Deployment to cloud platforms

## 👨‍💻 Author

**Shreedharan S**

B.Sc. Information Technology  
Full Stack Developer

### Technologies

`Java` `Spring Boot` `React.js` `JavaScript` `MySQL` `REST API` `Git` `GitHub`

---
