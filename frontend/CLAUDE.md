# Buddies Frontend

React + Vite frontend for the Buddies property rental platform.

## Commands

```bash
npm run dev       # Start development server (http://localhost:5173)
npm run build     # Production build
npm run lint      # Run ESLint
npm run format    # Format with Prettier
npm run preview   # Preview production build
```

## Architecture

### Entry Points

- `src/main.jsx` - App bootstrap with providers
- `src/App.jsx` - Root component with routing, Suspense, ErrorBoundary

### Folder Structure

```
src/
├── admin/              # Admin dashboard (protected)
│   └── components/     # Admin-specific components
├── components/         # Shared/public components
│   ├── Authentication/ # SignIn, SignUp, OAuth, ResetPassword
│   ├── Home/           # Landing page components
│   ├── ListProperties/ # Property listing views
│   ├── Map/            # Leaflet map integration
│   ├── ui/             # Reusable UI components
│   └── ErrorBoundary.jsx
├── pages/              # Page components (Contact, Profile, etc.)
│   └── ListingForms/   # Property listing forms
├── hooks/              # Custom React hooks
├── provider/           # Context providers
├── data/               # Static data files
└── assets/             # Images, logos
```

## Key Patterns

### State Management

- **React Query** - Server state (`useQuery`, `useMutation`)
- **Context API** - Auth state (`authContext.js`)

### Data Fetching

```javascript
// Preferred: React Query
import { useQuery } from '@tanstack/react-query';
const { data, isLoading } = useQuery({ queryKey: ['key'], queryFn: fetchFn });

// Custom hooks available
import { useFetch } from '@/hooks/useFetch'; // With AbortController
import { useProperties } from '@/hooks/useProperties';
```

### Routing (React Router v6)

```javascript
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';

// Navigation
const navigate = useNavigate();
navigate('/path');
navigate('/path', { replace: true });
```

### Code Splitting

```javascript
// Route-based lazy loading in App.jsx
const Home = lazy(() => import('./components/Home/Home.jsx'));
const SignIn = lazy(() => import('./components/Authentication/SignIn.jsx'));

// Wrap with Suspense
<Suspense fallback={<Loader />}>
  <Routes>...</Routes>
</Suspense>;
```

### Error Handling

```javascript
// ErrorBoundary wraps all routes
<ErrorBoundary>
  <Suspense fallback={<Loader />}>
    <Routes>...</Routes>
  </Suspense>
</ErrorBoundary>
```

### Styling

- **Tailwind CSS** - Utility-first, configured in `tailwind.config.js`
- Class-based styling, no CSS modules

## Important Files

| File                                | Purpose                               |
| ----------------------------------- | ------------------------------------- |
| `src/App.jsx`                       | Routes, lazy loading, error boundary  |
| `src/firebase.js`                   | Firebase configuration (env vars)     |
| `src/provider/authContext.js`       | Authentication context                |
| `src/hooks/useFetch.js`             | Generic fetching with AbortController |
| `src/hooks/useProperties.js`        | Property-specific queries             |
| `src/components/ui/Dropdown.jsx`    | Reusable dropdown component           |
| `src/components/ui/SearchInput.jsx` | Reusable search input                 |
| `src/components/ErrorBoundary.jsx`  | Error boundary component              |

## Environment Variables

Required in `.env`:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_API_URL=http://localhost:8000/api/v1
```

## Build Configuration

### Vite Config (`vite.config.js`)

```javascript
// Manual chunks for vendor splitting
manualChunks: {
  vendor: ['react', 'react-dom', 'react-router-dom'],
  firebase: ['firebase/app', 'firebase/auth'],
  maps: ['leaflet', 'react-leaflet'],
}

// Terser options - remove console in production
terserOptions: {
  compress: { drop_console: true }
}
```

## Performance Optimizations

1. **React.memo** on list components (PropertiesCard)
2. **useCallback** for memoized handlers
3. **AbortController** in useFetch for request cancellation
4. **Lazy loading** for images (`loading="lazy"`)
5. **Route-based code splitting** with React.lazy
6. **Vendor chunking** in Vite config

## Code Quality

- **ESLint** - Configured with React and Prettier plugins
- **Prettier** - Code formatting (`.prettierrc`)
- **Husky** - Pre-commit hooks for lint-staged
- **lint-staged** - Runs linting on staged files

## Component Guidelines

1. Use functional components with hooks
2. Prefer named exports for components
3. Keep components focused and single-purpose
4. Use React Query for API data, Context for auth state
5. Handle loading/error states explicitly
6. Wrap route components with React.lazy for code splitting
7. Use ErrorBoundary for graceful error handling
8. Memoize expensive list components with React.memo
