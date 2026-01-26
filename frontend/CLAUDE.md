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
- `src/App.jsx` - Root component with routing

### Folder Structure

```
src/
├── admin/              # Admin dashboard (protected)
│   └── components/     # Admin-specific components
├── components/         # Shared/public components
│   ├── Authentication/ # SignIn, SignUp, OAuth, ResetPassword
│   ├── Home/           # Landing page components
│   ├── ListProperties/ # Property listing views
│   └── Map/            # Leaflet map integration
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
- **Redux Toolkit** - Available but sparingly used

### Data Fetching

```javascript
// Preferred: React Query
import { useQuery } from '@tanstack/react-query';
const { data, isLoading } = useQuery({ queryKey: ['key'], queryFn: fetchFn });

// Custom hooks available
import { useFetch } from '@/hooks/useFetch';
import { useProperties } from '@/hooks/useProperties';
```

### Routing (React Router v5)

```javascript
import { Switch, Route, useHistory, useParams } from 'react-router-dom';
// Note: NOT v6 - uses Switch instead of Routes
```

### Styling

- **Tailwind CSS** - Utility-first, configured in `tailwind.config.js`
- Class-based styling, no CSS modules

### Forms

- **react-hook-form** for form state management
- Validation handled within form components

## Important Files

| File                          | Purpose                                |
| ----------------------------- | -------------------------------------- |
| `src/firebase.js`             | Firebase configuration                 |
| `src/provider/authContext.js` | Authentication context                 |
| `src/hooks/useFetch.js`       | Generic data fetching hook             |
| `src/hooks/useProperties.js`  | Property-specific queries              |
| `src/data/Property.js`        | Static property data                   |
| `src/data/Search.js`          | Search constants (colleges, companies) |

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
