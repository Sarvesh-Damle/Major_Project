# Buddies Backend

This is the backend API for the Buddies property rental platform. It provides endpoints for managing users, hostels, PGs, flats, and handling user interactions like favorites and contact requests.

## Tech Stack

- **Node.js** & **Express.js**: Core server framework.
- **MongoDB** & **Mongoose**: Database and ODM.
- **JWT**: Secure authentication.
- **Cloudinary**: Image storage for property photos.

## Getting Started

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Environment Setup:**
    Create a `.env` file in the root directory and configure the necessary variables (Database URI, Cloudinary credentials, JWT Secrets).

3.  **Run Development Server:**
    ```bash
    npm start
    ```
    The server typically runs on `http://localhost:8000`.

## API Structure

- `/api/v1/auth`: Authentication (Register, Login, Logout).
- `/api/v1/users`: User management.
- `/api/v1/hostels`: Hostel listings and management.
- `/api/v1/pgs`: PG listings and management.
- `/api/v1/flats`: Flat listings and management.
- `/api/v1/favourites`: Manage user favorite properties.
- `/api/v1/contact`: Contact form submissions.
