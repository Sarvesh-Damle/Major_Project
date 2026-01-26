# Buddies Backend

Backend API for the Buddies property rental platform. Built with Node.js, Express, and MongoDB.

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js 18+ | Runtime |
| Express.js | Web framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| Cloudinary | Image storage |
| Winston | Logging |

## Getting Started

### Prerequisites
- Node.js >= 18.0.0
- MongoDB instance
- Cloudinary account

### Installation

```bash
# Install dependencies
npm install

# Validate environment variables
npm run validate-env

# Start development server
npm run dev
```

### Environment Setup

Copy `.env.example` to `.env` and configure:

```env
# Server
PORT=8000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:8000

# Database
MONGO_URI=mongodb+srv://...

# JWT
ACCESS_TOKEN_SECRET=your-secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your-secret
REFRESH_TOKEN_EXPIRY=10d

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start with nodemon (hot reload) |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors |
| `npm run format` | Format with Prettier |
| `npm run validate-env` | Validate environment variables |

## API Endpoints

| Route | Description |
|-------|-------------|
| `POST /api/v1/auth/register` | User registration |
| `POST /api/v1/auth/login` | User login |
| `POST /api/v1/auth/google` | Google OAuth |
| `POST /api/v1/auth/logout` | User logout |
| `POST /api/v1/auth/refresh-token` | Refresh access token |
| `GET /api/v1/users/me` | Get current user |
| `GET /api/v1/hostels/find-all-hostels` | List hostels |
| `GET /api/v1/pgs/find-all-pgs` | List PGs |
| `GET /api/v1/flats/find-all-flats` | List flats |
| `GET /api/v1/favourites` | Get user favorites |
| `POST /api/v1/contact` | Submit contact form |

## Security Features

- **Helmet** - Secure HTTP headers
- **Rate Limiting** - 100 req/15min general, 10 req/15min auth
- **CORS** - Configurable allowed origins
- **Input Validation** - express-validator on all endpoints
- **JWT Auth** - Access + Refresh token strategy

## Project Structure

```
src/
├── controllers/     # Request handlers
├── models/          # Mongoose schemas (with indexes)
├── routes/          # Route definitions with validators
├── middlewares/     # Auth, file upload, validation
├── validators/      # Input validation schemas
├── utils/           # Helper functions (logger, cloudinary, etc.)
└── db/              # Database connection
```

## Response Format

All API responses follow this structure:

```json
{
  "statusCode": 200,
  "data": { },
  "message": "Success",
  "success": true
}
```

## Error Handling

Errors are returned with appropriate HTTP status codes:

```json
{
  "success": false,
  "status": 400,
  "message": "Validation failed",
  "errors": [{ "field": "email", "message": "Invalid email" }]
}
```

## Logging

Winston logger with:
- Console output (colored, timestamped)
- File logging in production (`logs/error.log`, `logs/combined.log`)
- Request/response logging middleware
- Error logging with stack traces

## License

ISC
