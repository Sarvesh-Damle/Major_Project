import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Contact,
  FlatProperties,
  FlatProperty,
  Footer,
  Home,
  HostelProperties,
  HostelProperty,
  ListProperty,
  Navbar,
  PGProperties,
  PGProperty,
  Profile,
  PropertyOwner,
  ResetPassword,
  SignIn,
  SignUp,
  Students,
  Team,
  Error,
} from './components/index.js';
import { loginContext } from './provider/authContext.js';
import ProtectedRoute from './admin/components/ProtectedRoute.jsx';
import AdminHome from './admin/components/Home/AdminHome.jsx';
import { User, Hostel, PG, Flat, EditUser, EditHostel, EditPG, EditFlat } from './admin/index.js';

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
        {url_name === 'dashboard' ? null : <Footer />}
      </loginContext.Provider>
    </div>
  );
};

export default App;
