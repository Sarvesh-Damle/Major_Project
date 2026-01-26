# Buddies Frontend

React + Vite frontend for the Buddies property rental platform.

## Tech Stack

| Technology      | Purpose              |
| --------------- | -------------------- |
| React 18        | UI framework         |
| Vite            | Build tool           |
| Tailwind CSS    | Styling              |
| React Router v6 | Routing              |
| React Query     | Server state         |
| Firebase        | OAuth authentication |
| Leaflet         | Interactive maps     |

## Features

- **Property Search** - Filter by city, locality, and property type
- **Interactive Maps** - View property locations with Leaflet
- **User Dashboard** - Manage profile and favorites
- **Admin Dashboard** - Manage users and property verifications
- **Responsive Design** - Mobile and desktop optimized
- **Code Splitting** - Route-based lazy loading

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- Backend API running on localhost:8000

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup

Create a `.env` file:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_API_URL=http://localhost:8000/api/v1
```

## Scripts

| Script            | Description                               |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Start development server (localhost:5173) |
| `npm run build`   | Production build with optimizations       |
| `npm run preview` | Preview production build                  |
| `npm run lint`    | Run ESLint                                |
| `npm run format`  | Format with Prettier                      |

## Build Optimizations

- **Vendor Chunking** - Separate chunks for large dependencies
- **Code Splitting** - Route-based lazy loading with React.lazy
- **Tree Shaking** - Unused code elimination
- **Terser Minification** - Console logs removed in production
- **Asset Optimization** - Optimized images and static files

## Project Structure

```
src/
├── admin/              # Admin dashboard (protected)
│   └── components/     # Admin-specific components
├── components/         # Shared components
│   ├── Authentication/ # SignIn, SignUp, OAuth
│   ├── Home/           # Landing page (SearchBar, etc.)
│   ├── ListProperties/ # Property listings
│   ├── Map/            # Leaflet integration
│   ├── ui/             # Reusable UI (Dropdown, SearchInput)
│   └── ErrorBoundary.jsx
├── pages/              # Page components
│   └── ListingForms/   # Property listing forms
├── hooks/              # Custom hooks (useFetch, useProperties)
├── provider/           # Context providers
└── assets/             # Images, logos
```

## Key Components

| Component            | Description                                |
| -------------------- | ------------------------------------------ |
| `App.jsx`            | Root with routing, Suspense, ErrorBoundary |
| `SearchBar.jsx`      | Property search with filters               |
| `PropertiesCard.jsx` | Optimized property card (React.memo)       |
| `ErrorBoundary.jsx`  | Graceful error handling                    |
| `ProtectedRoute.jsx` | Admin route protection                     |

## Performance Features

- **React.memo** on list components
- **AbortController** in useFetch for request cancellation
- **Lazy loading** for images (`loading="lazy"`)
- **Route-based code splitting** with React.lazy

## License

ISC
