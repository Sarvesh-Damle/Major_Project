# Buddies Backend

Node.js + Express API server for the Buddies property rental platform.

## Commands

```bash
npm run dev           # Start with nodemon (development)
npm start             # Start production server
npm run lint          # Run ESLint
npm run lint:fix      # Fix ESLint errors
npm run format        # Format with Prettier
npm run validate-env  # Validate environment variables
```

## Architecture

### Entry Points
- `src/index.js` - Server bootstrap, DB connection
- `src/app.js` - Express app configuration, middleware, routes

### Folder Structure
```
src/
├── controllers/    # Request handlers (business logic)
├── models/         # Mongoose schemas with indexes
├── routes/         # Route definitions with validators
├── middlewares/    # Auth, file upload, validation
├── validators/     # Input validation schemas
├── utils/          # Helper classes and functions
└── db/             # Database connection
```

## MVC Pattern

```
Request → Route → Validator → Controller → Model → Database
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
throw new ApiError(400, 'Validation failed');

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

### Input Validation
```javascript
// validators/property.validators.js
import { body, query } from 'express-validator';

export const createPropertyValidator = [
  body('owner_name').trim().notEmpty(),
  body('owner_email').isEmail().normalizeEmail(),
  body('rent_amount').isInt({ min: 0 }),
];

// In routes
router.post('/add', verifyJWT, createPropertyValidator, validate, controller);
```

### Logging
```javascript
import logger from '../utils/logger.js';

logger.info('Operation completed', { userId, action });
logger.error('Error occurred', { error: err.message, stack: err.stack });
logger.warn('Warning', { details });
```

## API Routes

| Route | Controller | Description |
|-------|------------|-------------|
| `/api/v1/auth` | auth.controllers.js | Register, Login, Logout, Refresh, Google OAuth |
| `/api/v1/users` | users.controllers.js | User CRUD, Profile |
| `/api/v1/hostels` | hostels.controllers.js | Hostel listings |
| `/api/v1/pgs` | pgs.controllers.js | PG listings |
| `/api/v1/flats` | flats.controllers.js | Flat listings |
| `/api/v1/favourites` | favourites.controllers.js | User favorites |
| `/api/v1/contact` | contact.controllers.js | Contact submissions |

## Authentication

### JWT Strategy
- **Access Token** - Short-lived (1d), sent in Authorization header or cookie
- **Refresh Token** - Long-lived (10d), stored in HTTP-only cookie

### Middleware
```javascript
import { verifyJWT, verifyAdmin } from '../middlewares/auth.middleware.js';

// Protected route
router.get('/protected', verifyJWT, controller);

// Admin-only route
router.delete('/admin-only', verifyJWT, verifyAdmin, controller);
```

## Security Middleware

```javascript
// app.js - Applied in order
app.use(helmet());                    // Secure HTTP headers
app.use(compression());               // Response compression
app.use('/api/v1', generalLimiter);   // Rate limiting (100/15min)
app.use('/api/v1/auth', authLimiter); // Stricter for auth (10/15min)
app.use(cors({ ... }));               // CORS with env-based origins
app.use(express.json({ limit: '10kb' })); // Body size limit
app.use(requestLogger);               // Winston request logging
```

## File Upload

### Cloudinary Integration
```javascript
import { upload } from '../middlewares/multer.middleware.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

// Route with file upload
router.post('/upload', upload.fields([{ name: 'photos', maxCount: 5 }]), controller);

// In controller
const result = await uploadOnCloudinary(req.files.photos[0].path);
```

## Models

| Model | File | Key Fields | Indexes |
|-------|------|------------|---------|
| User | users.models.js | email, password, refreshToken | email (unique) |
| Hostel | hostels.models.js | hostel_name, city, rent_amount | city+locality, featured, type |
| PG | pgs.models.js | pg_name, city, rent_amount | city+locality, featured, tenant |
| Flat | flats.models.js | flat_type, city, rent_amount | city+locality, featured, type |
| Favourite | favourites.models.js | userId, properties | userId |
| Contact | contact.models.js | name, email, message | - |

## Environment Variables

Required in `.env`:
```
PORT=8000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:8000

MONGO_URI=mongodb+srv://...

ACCESS_TOKEN_SECRET=your-secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your-secret
REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

EMAIL_SERVICE_URL=http://localhost:4000  # Optional
```

## Code Quality

- **ES Modules** - Use `import`/`export` syntax
- **ESLint** - Configured in `.eslintrc.cjs`
- **Prettier** - Code formatting (`.prettierrc`)
- Run `npm run lint` before committing

## Development Guidelines

1. Always wrap async controllers with `asyncHandler`
2. Use `ApiError` for all error responses
3. Use `ApiResponse` for all success responses
4. Add validators for all routes accepting user input
5. Use proper HTTP status codes (201 create, 404 not found, etc.)
6. Log errors with `logger.error()`, info with `logger.info()`
7. Handle file cleanup on upload errors
8. Use database indexes for frequently queried fields
