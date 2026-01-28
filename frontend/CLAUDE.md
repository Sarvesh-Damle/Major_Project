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
│       ├── Charts/     # BarChart, PieChart
│       ├── Flats/      # Flat management with bulk ops
│       ├── Home/       # AdminHome dashboard
│       ├── Hostels/    # Hostel management with bulk ops
│       ├── PGs/        # PG management with bulk ops
│       └── Table/      # AG-Grid wrapper with selection
├── components/         # Shared/public components
│   ├── Authentication/ # SignIn, SignUp, OAuth, ResetPassword
│   ├── Home/           # Landing page components
│   ├── ListProperties/ # Property listing views with filters
│   ├── Map/            # Leaflet map integration
│   ├── ui/             # Reusable UI components
│   └── ErrorBoundary.jsx
├── pages/              # Page components
│   ├── Profile.jsx     # User profile with dashboard sections
│   ├── ListingForms/   # Property listing forms
│   └── ...
├── hooks/              # Custom React hooks
├── provider/           # Context providers
├── data/               # Static data files
└── assets/             # Images, logos
```

## Key Patterns

### State Management

- **React Query** - Server state (`useQuery`, `useMutation`)
- **Context API** - Auth state (`authContext.js`)
- **useState** - Local component state

### Data Fetching

```javascript
// Preferred: React Query
import { useQuery, useMutation } from '@tanstack/react-query';

const { data, isLoading, isError, refetch } = useQuery({
  queryKey: ['key'],
  queryFn: async () => { ... }
});

const mutation = useMutation({
  mutationFn: (data) => axios.post('/api', data),
  onSuccess: () => refetch(),
  onError: (error) => toast.error(error.response?.data?.message)
});

// Custom hooks available
import { useFetch } from '@/hooks/useFetch'; // With AbortController
import { useProperties } from '@/hooks/useProperties';
import useDebounce from '@/hooks/useDebounce';
```

### Routing (React Router v6)

```javascript
import { Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';

// Navigation
const navigate = useNavigate();
navigate('/path');
navigate('/path', { replace: true });

// URL params
const { id } = useParams();
const location = useLocation();
const queryParams = new URLSearchParams(location.search);
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

| File                                | Purpose                                    |
| ----------------------------------- | ------------------------------------------ |
| `src/App.jsx`                       | Routes, lazy loading, error boundary       |
| `src/firebase.js`                   | Firebase configuration (env vars)          |
| `src/provider/authContext.js`       | Authentication context                     |
| `src/hooks/useFetch.js`             | Generic fetching with AbortController      |
| `src/hooks/useProperties.js`        | Property-specific queries                  |
| `src/hooks/useDebounce.js`          | Debounce hook for search filters           |
| `src/components/ui/Dropdown.jsx`    | Reusable dropdown component                |
| `src/components/ui/EmptyState.jsx`  | Empty state with icons and actions         |
| `src/components/ui/SaveSearchButton.jsx` | Save search modal component           |
| `src/components/ErrorBoundary.jsx`  | Error boundary component                   |

## Profile Page Sections

The Profile page (`src/pages/Profile.jsx`) contains multiple sections:

| Section | Component | Description |
|---------|-----------|-------------|
| User Details | `UserProfile` | Edit name, email, phone |
| See Favourites | `Favourites` | View/remove saved properties |
| My Properties | `MyProperties` | Owner dashboard with stats and listings |
| Saved Searches | `SavedSearches` | View/run/delete saved searches |
| Notifications | `NotificationPreferences` | Email notification toggles |
| My Credits | `Credits` | Credit balance display |
| View Dashboard | (Admin only) | Link to admin dashboard |

## Admin Dashboard

### AG-Grid Tables (`src/admin/components/Table/Table.jsx`)

```javascript
// Table with row selection
<Table
  ref={gridRef}
  rowData={data}
  colDefs={columns}
  rowSelection='multiple'
  onSelectionChanged={onSelectionChanged}
/>

// Column with checkbox selection
{ headerCheckboxSelection: true, checkboxSelection: true, width: 50, pinned: 'left' }
```

### Bulk Operations Pattern

```javascript
// Get selected rows
const onSelectionChanged = useCallback(() => {
  const selected = gridRef.current?.api?.getSelectedRows() || [];
  setSelectedRows(selected);
}, []);

// Bulk mutation
const bulkVerifyMutation = useMutation({
  mutationFn: ({ ids, featured }) =>
    axios.put('/api/v1/hostels/bulk-verify', { ids, featured }, { withCredentials: true }),
  onSuccess: () => {
    gridRef.current?.api?.deselectAll();
    refetch();
  }
});

// Bulk action toolbar
{selectedRows.length > 0 && (
  <div className='flex items-center gap-3'>
    <span>{selectedRows.length} selected</span>
    <button onClick={() => handleBulkVerify(true)}>Verify</button>
    <button onClick={() => handleBulkVerify(false)}>Unverify</button>
    <button onClick={handleBulkDelete}>Delete</button>
  </div>
)}
```

## Save Search Feature

```javascript
// SaveSearchButton component on listing pages
<SaveSearchButton
  propertyType='hostel'
  filters={{
    city,
    locality: filters.locality,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    typeOfHostel: filters.typeOfHostel?.[0],
  }}
/>

// Opens modal to name search and optionally enable notifications
```

## Notification Preferences

Toggle switches for:
- Email Notifications (master toggle)
- Saved Search Alerts (with frequency: immediate/daily/weekly)
- Property Verification Alerts
- Promotional Emails

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
  'vendor-query': ['@tanstack/react-query'],
  'vendor-firebase': ['firebase/app', 'firebase/auth'],
  'vendor-maps': ['leaflet', 'react-leaflet'],
  'vendor-charts': ['recharts'],
  'vendor-grid': ['ag-grid-react', 'ag-grid-community'],
  'vendor-ui': ['react-toastify', 'swiper', 'react-icons'],
}

// Terser options - remove console in production
terserOptions: {
  compress: { drop_console: true }
}
```

## Performance Optimizations

1. **React.memo** on list components (PropertiesCard)
2. **useCallback** for memoized handlers
3. **useDebounce** for search filter inputs (300ms delay)
4. **AbortController** in useFetch for request cancellation
5. **Lazy loading** for images (`loading="lazy"`)
6. **Route-based code splitting** with React.lazy
7. **Vendor chunking** in Vite config
8. **forwardRef** for Table component to expose AG-Grid API

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
9. Use useCallback for handlers passed to child components
10. Use forwardRef when parent needs access to child's imperative handle (e.g., AG-Grid API)
