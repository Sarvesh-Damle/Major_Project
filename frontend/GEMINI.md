# Buddies Frontend Context

## Project Overview

The frontend for "Buddies", a web application for finding rental properties (Hostels, PGs, Flats). It includes a public-facing search and listing interface, as well as a protected admin dashboard.

## Key Technologies

- **Build Tool:** Vite
- **Framework:** React (v18)
- **Styling:** Tailwind CSS, PostCSS.
- **State Management:** React Query (`@tanstack/react-query`), Context API (`loginContext`).
- **Routing:** `react-router-dom` (v5).
- **Forms:** `react-hook-form`.
- **Maps:** `react-leaflet`, `leaflet`, `esri-leaflet-geocoder`.
- **UI Components:** `ag-grid-react` (Admin tables), `swiper` (Carousels), `react-toastify` (Notifications).

## Architecture

- **Entry Point:** `src/main.jsx`.
- **Main Layout:** `src/App.jsx` handles routing and global providers.
- **Folder Structure:**
  - `src/components`: Reusable UI components and public pages.
  - `src/admin`: Admin dashboard specific components.
  - `src/hooks`: Custom hooks (e.g., `useFetch`, `useProperties`).
  - `src/provider`: Context providers.
  - `src/data`: Static data files.

## Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the application for production.
- `npm run lint`: Runs ESLint.

## Development Guidelines

- **Component Style:** Functional components with Hooks.
- **API Interaction:** Use `useQuery` and `useMutation` for data fetching where possible. Direct `axios` calls are also used in some components.
- **Styling:** Utility-first CSS using Tailwind.
- **Routing:** Note that `react-router-dom` v5 is used (Switch, Route, useHistory).
- **Authentication:** Managed via `authContext` and stored in local state/cookies.
