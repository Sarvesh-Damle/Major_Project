# Buddies - Property Rental Platform

A full-stack web application for finding rental properties including Hostels, PGs, and Flats.

## Repository Structure

```
Major_Project/
├── frontend/          # React + Vite frontend application
├── backend/           # Node.js + Express API server
└── README.md
```

## Quick Start

### Backend
```bash
cd backend
npm install
npm run validate-env   # Check environment variables
npm run dev            # Development with hot reload (http://localhost:8000)
npm start              # Production mode
```

### Frontend
```bash
cd frontend
npm install
npm run dev            # Development (http://localhost:5173)
npm run build          # Production build
```

## Tech Stack Overview

| Layer     | Technology                                    |
|-----------|-----------------------------------------------|
| Frontend  | React 18, Vite, Tailwind CSS, React Query     |
| Backend   | Node.js 18+, Express.js, MongoDB, Mongoose    |
| Auth      | JWT (Access/Refresh tokens), Firebase (OAuth) |
| Storage   | Cloudinary (images)                           |
| Maps      | Leaflet, ESRI Geocoder                        |
| Security  | Helmet, express-rate-limit, express-validator |
| Logging   | Winston (backend)                             |

## API Base URL

- Development: `http://localhost:8000/api/v1`
- Routes: `/auth`, `/users`, `/hostels`, `/pgs`, `/flats`, `/favourites`, `/contact`

## Environment Files

Both `frontend/.env` and `backend/.env` are required. See:
- `backend/.env.example` for backend variables
- `frontend/README.md` for frontend variables

## Development Notes

- Both packages use ES Modules (`"type": "module"`)
- Frontend uses **React Router v6** (Routes, Route, useNavigate)
- Backend follows MVC pattern with validators and middleware
- Run `npm run lint` and `npm run format` before committing

## Key Features

### Frontend Optimizations
- Route-based code splitting with React.lazy
- Vendor chunking in Vite config
- React.memo on list components
- AbortController for request cancellation
- ErrorBoundary for graceful error handling

### Backend Security
- Helmet for secure HTTP headers
- Rate limiting (100/15min general, 10/15min auth)
- Input validation with express-validator
- CORS with configurable origins
- Stack traces hidden in production

### Database
- MongoDB indexes on frequently queried fields
- Batch queries for favorites (no N+1)
- Mongoose with aggregate pagination support
