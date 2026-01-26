# Buddies Backend

Node.js + Express API server for the Buddies property rental platform.

## Commands

```bash
npm start         # Start with nodemon (development)
npm test          # Run tests (not configured yet)
```

## Architecture

### Entry Points
- `src/index.js` - Server bootstrap, DB connection
- `src/app.js` - Express app configuration, middleware, routes

### Folder Structure
```
src/
├── controllers/    # Request handlers (business logic)
├── models/         # Mongoose schemas
├── routes/         # Route definitions
├── middlewares/    # Auth, file upload
├── utils/          # Helper classes and functions
└── db/             # Database connection
```

## MVC Pattern

```
Request → Route → Controller → Model → Database
                      ↓
                  Response (ApiResponse)
```

## Key Patterns

### Controller Pattern
```javascript
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';

export const getItems = asyncHandler(async (req, res) => {
  const items = await Model.find();
  return res.status(200).json(new ApiResponse(200, items, 'Success'));
});
```

### Error Handling
```javascript
// Always use ApiError for throwing errors
throw new ApiError(404, 'Resource not found');
throw new ApiError(400, 'Validation failed', errors);

// asyncHandler wraps async functions and catches errors
```

### Response Format
```javascript
// Always use ApiResponse for consistent responses
new ApiResponse(statusCode, data, message)

// Response structure:
{
  statusCode: 200,
  data: { ... },
  message: "Success",
  success: true
}
```

## API Routes

| Route | Controller | Description |
|-------|------------|-------------|
| `/api/v1/auth` | auth.controllers.js | Register, Login, Logout, Refresh |
| `/api/v1/users` | users.controllers.js | User CRUD, Profile |
| `/api/v1/hostels` | hostels.controllers.js | Hostel listings |
| `/api/v1/pgs` | pgs.controllers.js | PG listings |
| `/api/v1/flats` | flats.controllers.js | Flat listings |
| `/api/v1/favourites` | favourites.controllers.js | User favorites |
| `/api/v1/contact` | contact.controllers.js | Contact submissions |

## Authentication

### JWT Strategy
- **Access Token** - Short-lived, sent in Authorization header
- **Refresh Token** - Long-lived, stored in HTTP-only cookie

### Middleware
```javascript
import { verifyJWT } from '../middlewares/auth.middleware.js';

// Protected route
router.get('/protected', verifyJWT, controller);
```

## File Upload

### Cloudinary Integration
```javascript
import { upload } from '../middlewares/multer.middleware.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

// Route with file upload
router.post('/upload', upload.single('image'), controller);

// In controller
const result = await uploadOnCloudinary(req.file.path);
```

## Models

| Model | File | Key Fields |
|-------|------|------------|
| User | users.models.js | email, password, refreshToken |
| Hostel | hostels.models.js | name, address, price, amenities |
| PG | pgs.models.js | name, address, price, amenities |
| Flat | flats.models.js | name, address, price, amenities |
| Favourite | favourites.models.js | user, propertyType, propertyId |
| Contact | contact.models.js | name, email, message |

## Environment Variables

Required in `.env`:
```
PORT=8000
MONGO_URI=mongodb://localhost:27017/buddies
CORS_ORIGIN=http://localhost:5173

ACCESS_TOKEN_SECRET=your_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_secret
REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## Code Quality

- **ES Modules** - Use `import`/`export` syntax
- **Prettier** - Code formatting (`.prettierrc`)
- Run `npx prettier --write .` before committing

## Development Guidelines

1. Always wrap async controllers with `asyncHandler`
2. Use `ApiError` for all error responses
3. Use `ApiResponse` for all success responses
4. Validate request data before processing
5. Handle file cleanup on upload errors
6. Use meaningful HTTP status codes
