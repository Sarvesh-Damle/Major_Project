# Buddies Backend Context

## Project Overview
This is the backend for the "Buddies" major project, a property rental platform. It is built using Node.js, Express, and MongoDB. It handles user authentication, property listings (Flats, PGs, Hostels), favoriting properties, and contact form submissions.

## Key Technologies
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose ODM)
- **Authentication:** JWT (Access & Refresh Tokens), bcryptjs for hashing.
- **File Storage:** Cloudinary (via Multer).
- **External Services:** Firebase (Auth support mentioned in frontend), Axios for internal/external calls.

## Architecture
- **Pattern:** MVC (Model-View-Controller) architecture.
- **Entry Point:** `src/index.js` (Server setup).
- **App Configuration:** `src/app.js` (Middleware, Routes, CORS).
- **Folder Structure:**
  - `src/controllers`: Request logic.
  - `src/models`: Mongoose schemas.
  - `src/routes`: Route definitions.
  - `src/middlewares`: Auth (`verifyJWT`), File Upload (`multer`).
  - `src/utils`: Helper classes (`ApiError`, `ApiResponse`, `asyncHandler`).

## Scripts
- `npm start`: Runs the server using `nodemon` (development mode).

## Environment Variables
The application requires a `.env` file with the following keys:
- `PORT`: Server port (default 8000).
- `MONGO_URI`: MongoDB connection string.
- `CORS_ORIGIN`: Allowed origins.
- `ACCESS_TOKEN_SECRET` & `ACCESS_TOKEN_EXPIRY`.
- `REFRESH_TOKEN_SECRET` & `REFRESH_TOKEN_EXPIRY`.
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.

## Development Guidelines
- **ES Modules:** The project uses `"type": "module"` in `package.json`. Use `import`/`export` syntax.
- **Error Handling:** Always use the `ApiError` class for throwing errors and wrap async controllers with `asyncHandler`.
- **Response Format:** Return responses using the `ApiResponse` class.
- **Code Style:** Prettier is configured (`.prettierrc`). Ensure code is formatted before committing.
