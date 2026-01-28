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
| Frontend  | React 18, Vite, Tailwind CSS, React Query, AG-Grid |
| Backend   | Node.js 18+, Express.js, MongoDB, Mongoose    |
| Auth      | JWT (Access/Refresh tokens), Firebase (OAuth) |
| Storage   | Cloudinary (images with auto-cleanup)         |
| Maps      | Leaflet, ESRI Geocoder                        |
| Security  | Helmet, express-rate-limit, express-validator |
| Logging   | Winston (backend)                             |

## API Base URL

- Development: `http://localhost:8000/api/v1`
- Routes: `/auth`, `/users`, `/hostels`, `/pgs`, `/flats`, `/favourites`, `/contact`, `/reviews`, `/saved-searches`, `/notification-preferences`

## Environment Files

Both `frontend/.env` and `backend/.env` are required. See:
- `backend/.env.example` for backend variables
- `frontend/README.md` for frontend variables

## Development Notes

- Both packages use ES Modules (`"type": "module"`)
- Frontend uses **React Router v6** (Routes, Route, useNavigate)
- Backend follows MVC pattern with validators and middleware
- Run `npm run lint` and `npm run format` before committing

## Git Commit Rules

- Do NOT add `Co-Authored-By` lines in commit messages
- Keep commit messages concise and descriptive

## Key Features

### Property Management
- Three property types: Hostels, PGs, Flats
- Property verification system (`featured` field)
- Views tracking per property
- Cloudinary photo storage with automatic cleanup on update/delete
- Bulk verify/unverify/delete operations (admin)

### User Features
- **User Dashboard** - Property owners see their listings with stats (total properties, views, verified count)
- **Saved Searches** - Save search filters, run saved searches, max 10 per user
- **Notification Preferences** - Email toggles for alerts, verification notices, promotions
- **Favorites** - Save properties to favorites list
- **Reviews** - Leave reviews on properties

### Admin Dashboard
- AG-Grid tables with filtering, sorting, pagination
- Bulk operations (multi-select with checkboxes)
- Property verification workflow
- Stats cards (total properties, views by type)
- Charts (Bar, Pie) for property distribution

### Frontend Optimizations
- Route-based code splitting with React.lazy
- Vendor chunking in Vite config (react, firebase, maps, charts, grid)
- React.memo on list components
- useCallback for memoized handlers
- Debounced search filters
- AbortController for request cancellation
- ErrorBoundary for graceful error handling

### Backend Security
- Helmet for secure HTTP headers
- Rate limiting (100/15min general, 10/15min auth)
- Input validation with express-validator
- CORS with configurable origins
- Stack traces hidden in production
- Cloudinary URL parsing for secure photo deletion

### Database
- MongoDB indexes on frequently queried fields
- Batch queries for favorites (no N+1)
- Mongoose aggregate pipelines for stats
- Atomic operations with $inc for view counters
