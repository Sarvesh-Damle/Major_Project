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
npm start          # Runs on http://localhost:8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev        # Runs on http://localhost:5173
```

## Tech Stack Overview

| Layer     | Technology                                    |
|-----------|-----------------------------------------------|
| Frontend  | React 18, Vite, Tailwind CSS, React Query     |
| Backend   | Node.js, Express.js, MongoDB, Mongoose        |
| Auth      | JWT (Access/Refresh tokens), Firebase (OAuth) |
| Storage   | Cloudinary (images)                           |
| Maps      | Leaflet, ESRI Geocoder                        |

## API Base URL

- Development: `http://localhost:8000/api/v1`
- Routes: `/auth`, `/users`, `/hostels`, `/pgs`, `/flats`, `/favourites`, `/contact`

## Environment Files

Both `frontend/.env` and `backend/.env` are required. See respective README files for required variables.

## Development Notes

- Both packages use ES Modules (`"type": "module"`)
- Frontend uses `react-router-dom` v5 (Switch, Route, useHistory)
- Backend follows MVC pattern with utility classes (ApiError, ApiResponse, asyncHandler)
- Run `npm run lint` and `npm run format` before committing
