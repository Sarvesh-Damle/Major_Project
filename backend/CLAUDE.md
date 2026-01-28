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
| `/api/v1/users` | users.controllers.js | User CRUD, Profile, My Properties, Property Stats |
| `/api/v1/hostels` | hostels.controllers.js | Hostel CRUD, Verify, Bulk ops, Views |
| `/api/v1/pgs` | pgs.controllers.js | PG CRUD, Verify, Bulk ops, Views |
| `/api/v1/flats` | flats.controllers.js | Flat CRUD, Verify, Bulk ops, Views |
| `/api/v1/favourites` | favourites.controllers.js | User favorites |
| `/api/v1/contact` | contact.controllers.js | Contact submissions |
| `/api/v1/reviews` | reviews.controllers.js | Property reviews |
| `/api/v1/saved-searches` | savedSearches.controllers.js | Save/manage search filters |
| `/api/v1/notification-preferences` | notificationPreferences.controllers.js | Email notification settings |

## Property Endpoints (Hostels/PGs/Flats)

Each property type supports:
```
POST   /add-property[-type]     # Create (with photos)
PUT    /update-[type]?id=       # Update (replaces photos, cleans up old ones)
DELETE /delete-[type]?id=       # Delete (cleans up Cloudinary photos)
GET    /find-[type]?id=         # Get single property
GET    /find-all-[type]s        # List with pagination & filters
GET    /find-all-[type]s-info   # Admin: all properties
PUT    /verify-[type]           # Admin: verify property
GET    /count-verified-[type]s  # Count verified
GET    /count-unverified-[type]s # Count unverified

# Views tracking
POST   /increment-views?id=     # Public: increment view counter
GET    /total-views             # Admin: total views across all

# Bulk operations (Admin)
PUT    /bulk-verify             # Body: { ids: [], featured: boolean }
DELETE /bulk-delete             # Body: { ids: [] }
```

## User Dashboard Endpoints

```javascript
// Get all properties owned by current user (matches by owner_email)
GET /api/v1/users/my-properties

// Get stats for user's properties
GET /api/v1/users/my-property-stats
// Returns: { totalProperties, totalViews, verifiedCount, byType: {...} }
```

## Saved Searches

```javascript
// CRUD operations (max 10 per user)
POST   /api/v1/saved-searches       // Create saved search
GET    /api/v1/saved-searches       // List user's saved searches
GET    /api/v1/saved-searches/:id   // Get single
PUT    /api/v1/saved-searches/:id   // Update
DELETE /api/v1/saved-searches/:id   // Delete

// SavedSearch schema
{
  userId, searchName, propertyType,
  filters: { city, locality, minPrice, maxPrice, typeOfHostel, roomType, ... },
  notifyOnNewMatches: boolean
}
```

## Notification Preferences

```javascript
GET /api/v1/notification-preferences    // Get (auto-creates if none)
PUT /api/v1/notification-preferences    // Update

// Schema
{
  userId,
  emailNotificationsEnabled: boolean,
  savedSearchAlerts: boolean,
  savedSearchFrequency: 'immediate' | 'daily' | 'weekly' | 'never',
  propertyVerifiedAlert: boolean,
  promotionalEmails: boolean
}
```

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

## File Upload & Cloudinary

### Upload
```javascript
import { upload } from '../middlewares/multer.middleware.js';
import { uploadFilesToCloudinary } from '../utils/cloudinary.js';

// Route with file upload
router.post('/upload', upload.fields([{ name: 'photos', maxCount: 5 }]), controller);

// In controller
const result = await uploadFilesToCloudinary(req.files.photos[0].path);
```

### Delete (Photo Cleanup)
```javascript
import { deleteFromCloudinary } from '../utils/cloudinary.js';

// Extracts public_id from Cloudinary URL and deletes
await deleteFromCloudinary(imageUrl);

// Used in:
// - updateProperty: deletes old photos before uploading new ones
// - deleteProperty: deletes all photos before removing from DB
// - bulkDelete: collects all photo URLs and deletes them
```

## Models

| Model | File | Key Fields | Indexes |
|-------|------|------------|---------|
| User | users.models.js | email, password, refreshToken, credits | email (unique) |
| Hostel | hostels.models.js | hostel_name, city, rent_amount, views, featured | city+locality, featured, type |
| PG | pgs.models.js | pg_name, city, rent_amount, views, featured | city+locality, featured, tenant |
| Flat | flats.models.js | flat_type, city, rent_amount, views, featured | city+locality, featured, type |
| Favourite | favourites.models.js | userId, properties | userId |
| Contact | contact.models.js | name, email, message | - |
| Review | reviews.models.js | userId, propertyId, rating, comment | propertyId |
| SavedSearch | savedSearches.models.js | userId, searchName, propertyType, filters | userId+createdAt |
| NotificationPreference | notificationPreferences.models.js | userId, emailNotificationsEnabled, ... | userId (unique) |

## MongoDB Aggregation Examples

### Property Stats
```javascript
// Get total views across all properties
const result = await Hostel.aggregate([
  { $group: { _id: null, totalViews: { $sum: "$views" } } }
]);

// Get stats with conditional count
const stats = await Hostel.aggregate([
  { $match: { owner_email: userEmail } },
  {
    $group: {
      _id: null,
      count: { $sum: 1 },
      totalViews: { $sum: "$views" },
      verifiedCount: { $sum: { $cond: ["$featured", 1, 0] } },
    },
  },
]);
```

### Bulk Operations
```javascript
// Bulk verify
await Hostel.updateMany(
  { _id: { $in: ids } },
  { $set: { featured: true } }
);

// Bulk delete with photo cleanup
const hostels = await Hostel.find({ _id: { $in: ids } }, { property_photos: 1 });
const photoUrls = hostels.flatMap(h => h.property_photos || []);
await Promise.all(photoUrls.map(url => deleteFromCloudinary(url)));
await Hostel.deleteMany({ _id: { $in: ids } });
```

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
7. Handle file cleanup on upload errors and property deletion
8. Use database indexes for frequently queried fields
9. Use `$inc` for atomic counter increments (views)
10. Clean up Cloudinary photos when updating/deleting properties
