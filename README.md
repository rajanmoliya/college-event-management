# College Event Management System (MERN Stack)

## Overview

The College Event Management System is designed to help college administrators create and manage events, while allowing students to browse, register for, and attend these events. The system features user authentication, event management, registration tracking, and reporting.

## Key Features

### a. User Authentication

- **Student and Admin Registration**
- **Login/Logout Functionality**
- **Password Reset**

### b. Event Management (CRUD Operations)

- **Create New Events (Admin)**
- **Read/View Event Details (All Users)**
- **Update Event Information (Admin)**
- **Delete Events (Admin)**

### c. Event Registration

- **Students Can Register for Events**
- **Capacity Management for Events**
- **Waitlist Functionality**

### d. Event Discovery

- **Browse All Events**
- **Filter Events by Category, Date, or Department**
- **Search Functionality**

### e. Attendance Tracking

- **QR Code Generation for Each Registration**
- **Attendance Marking System**

### f. User Dashboard

- **For Students:** View Registered Events, Past Events Attended
- **For Admins:** Manage Events, View Registrations

### g. Notifications

- **Email Notifications for Event Reminders**
- **System Notifications for Updates or Changes**

### h. Reports Generation

- **Event Popularity Report**
- **Attendance Statistics**
- **User Engagement Metrics**

## Technical Implementation (MERN Stack)

### a. Frontend (React.js)

- **Create Responsive UI Components**
- **Implement State Management (e.g., Redux or Context API)**
- **Use React Router for Navigation**
- **Implement Form Validations**
- **Create Dynamic Filtering and Search Functionality**

### b. Backend (Node.js & Express.js)

- **Set Up RESTful API Endpoints for CRUD Operations**
- **Implement User Authentication (e.g., Using JWT)**
- **Handle File Uploads for Event Images**
- **Implement Email Sending Functionality**

### c. Database (MongoDB)

- **Design Schema for Users, Events, Registrations**
- **Implement Database Queries and Aggregations for Reports**

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB database setup
- Git for version control

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/rajanmoliya/college-event-management.git
    ```
2. **Navigate to the project directory:**
    ```bash
    cd college-event-management
    ```
3. **Install dependencies for both frontend and backend:**
    ```bash
    cd backend
    npm install
    cd ../frontend
    npm install
    ```

### Running the Application

1. **Start the backend server:**
    ```bash
    cd backend
    npm run dev
    ```
2. **Start the frontend server:**
    ```bash
    cd frontend
    npm run dev
    ```

The application should now be running on `http://localhost:5173`.

## Contributing

We welcome contributions to the College Event Management System! If you have any ideas, suggestions, or issues, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or support, please reach out via [email](mailto:rajanmoliya2801@gmail.com).

---

Thank you for using the College Event Management System! We hope it helps streamline event management at your institution.
