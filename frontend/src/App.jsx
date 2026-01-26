import { lazy, Suspense, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginContext } from './provider/authContext.js';
import Loader from './pages/Loader.jsx';
import Navbar from './pages/Navbar.jsx';
import Footer from './pages/Footer.jsx';

// Lazy load route components
const Home = lazy(() => import('./components/Home/Home.jsx'));
const SignIn = lazy(() => import('./components/Authentication/SignIn.jsx'));
const SignUp = lazy(() => import('./components/Authentication/SignUp.jsx'));
const ResetPassword = lazy(() => import('./components/Authentication/ResetPassword.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const Team = lazy(() => import('./pages/Team.jsx'));
const Profile = lazy(() => import('./pages/Profile.jsx'));
const Error = lazy(() => import('./pages/Error.jsx'));

// Property pages
const HostelProperties = lazy(() => import('./components/ListProperties/HostelProperties.jsx'));
const PGProperties = lazy(() => import('./components/ListProperties/PGProperties.jsx'));
const FlatProperties = lazy(() => import('./components/ListProperties/FlatProperties.jsx'));
const HostelProperty = lazy(() => import('./components/Home/HostelProperty.jsx'));
const PGProperty = lazy(() => import('./components/Home/PGProperty.jsx'));
const FlatProperty = lazy(() => import('./components/Home/FlatProperty.jsx'));

// Listing forms
const ListProperty = lazy(() => import('./pages/ListingForms/ListProperty.jsx'));
const PropertyOwner = lazy(() => import('./pages/ListingForms/PropertyOwner.jsx'));
const Students = lazy(() => import('./pages/ListingForms/Students.jsx'));

// Admin components
const ProtectedRoute = lazy(() => import('./admin/components/ProtectedRoute.jsx'));
const AdminHome = lazy(() => import('./admin/components/Home/AdminHome.jsx'));
const User = lazy(() => import('./admin/components/User/User.jsx'));
const EditUser = lazy(() => import('./admin/components/User/EditUser.jsx'));
const Hostel = lazy(() => import('./admin/components/Hostels/Hostel.jsx'));
const EditHostel = lazy(() => import('./admin/components/Hostels/EditHostel.jsx'));
const PG = lazy(() => import('./admin/components/PGs/PG.jsx'));
const EditPG = lazy(() => import('./admin/components/PGs/EditPG.jsx'));
const Flat = lazy(() => import('./admin/components/Flats/Flat.jsx'));
const EditFlat = lazy(() => import('./admin/components/Flats/EditFlat.jsx'));

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState({ login: false, signup: false });
  const { pathname } = useLocation();
  const url_name = pathname.split('/')[1];

  return (
    <div className='relative w-screen overflow-hidden'>
      <ToastContainer autoClose={1000} />
      <loginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        {url_name === 'dashboard' ? null : <Navbar />}
        <ScrollToTop />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/hostels' element={<HostelProperties />} />
            <Route path='/hostels/:propertyId' element={<HostelProperty />} />
            <Route path='/pgs' element={<PGProperties />} />
            <Route path='/pgs/:propertyId' element={<PGProperty />} />
            <Route path='/flats' element={<FlatProperties />} />
            <Route path='/flats/:propertyId' element={<FlatProperty />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/team' element={<Team />} />
            <Route path='/list' element={<ListProperty />} />
            <Route path='/owner' element={<PropertyOwner />} />
            <Route path='/students' element={<Students />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route
              path='/dashboard'
              element={
                <ProtectedRoute>
                  <AdminHome />
                </ProtectedRoute>
              }
            />
            <Route
              path='/dashboard/users'
              element={
                <ProtectedRoute>
                  <User />
                </ProtectedRoute>
              }
            />
            <Route
              path='/dashboard/users/edit-user/:id'
              element={
                <ProtectedRoute>
                  <EditUser />
                </ProtectedRoute>
              }
            />
            <Route
              path='/dashboard/hostels'
              element={
                <ProtectedRoute>
                  <Hostel />
                </ProtectedRoute>
              }
            />
            <Route
              path='/dashboard/hostels/edit-hostel/:id'
              element={
                <ProtectedRoute>
                  <EditHostel />
                </ProtectedRoute>
              }
            />
            <Route
              path='/dashboard/pgs'
              element={
                <ProtectedRoute>
                  <PG />
                </ProtectedRoute>
              }
            />
            <Route
              path='/dashboard/pgs/edit-pg/:id'
              element={
                <ProtectedRoute>
                  <EditPG />
                </ProtectedRoute>
              }
            />
            <Route
              path='/dashboard/flats'
              element={
                <ProtectedRoute>
                  <Flat />
                </ProtectedRoute>
              }
            />
            <Route
              path='/dashboard/flats/edit-flat/:id'
              element={
                <ProtectedRoute>
                  <EditFlat />
                </ProtectedRoute>
              }
            />
            <Route path='*' element={<Error />} />
          </Routes>
        </Suspense>
        {url_name === 'dashboard' ? null : <Footer />}
      </loginContext.Provider>
    </div>
  );
};

export default App;
