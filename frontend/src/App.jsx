import { useEffect, useState } from 'react';
import { Switch, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Contact, FlatProperties, FlatProperty, Footer, Home, HostelProperties, HostelProperty, ListProperty, Navbar, PGProperties, PGProperty, Profile, PropertyOwner, ResetPassword, SignIn, SignUp, Students, Team, Error } from "./components/index.js"
import { loginContext } from './provider/authContext.js';
import ProtectedRoute from './admin/components/ProtectedRoute.jsx';
import AdminHome from "./admin/components/Home/AdminHome.jsx"
import { useLocation } from 'react-router-dom';
import { User, Hostel, PG, Flat, EditUser, EditHostel, EditPG, EditFlat } from './admin/index.js';

const ScrollToTop = () => {
  const {pathname} = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState({ login: false, signup: false });
  const { pathname } = useLocation();
  const url_name = pathname.split("/")[1];
  
  return (
    <div className="relative w-screen overflow-hidden" >
      <ToastContainer autoClose={1000} />
      <loginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {url_name === "dashboard" ? null : <Navbar />}
      <ScrollToTop/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path='/signin' component={SignIn} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/hostels' component={HostelProperties} />
          <Route path='/hostels/:propertyId' component={HostelProperty} />
          <Route exact path='/pgs' component={PGProperties} />
          <Route exact path='/pgs/:propertyId' component={PGProperty} />
          <Route exact path='/flats' component={FlatProperties} />
          <Route exact path='/flats/:propertyId' component={FlatProperty} />
          <Route exact path='/profile' component={Profile} />
          <Route exact path='/contact' component={Contact} />
          <Route exact path='/team' component={Team} />
          <Route exact path='/list' component={ListProperty} />
          <Route exact path='/owner' component={PropertyOwner} />
          <Route exact path='/students' component={Students} />
          <Route exact path='/reset-password' component={ResetPassword} />
          <ProtectedRoute exact path="/dashboard" component={AdminHome}  />
          <ProtectedRoute exact path="/dashboard/users" component={User}  />
          <ProtectedRoute exact path="/dashboard/users/edit-user/:id" component={EditUser} />
          <ProtectedRoute exact path="/dashboard/hostels" component={Hostel}  />
          <ProtectedRoute exact path="/dashboard/hostels/edit-hostel/:id" component={EditHostel} />
          <ProtectedRoute exact path="/dashboard/pgs" component={PG}  />
          <ProtectedRoute exact path="/dashboard/pgs/edit-pg/:id" component={EditPG} />
          <ProtectedRoute exact path="/dashboard/flats" component={Flat}  />
          <ProtectedRoute exact path="/dashboard/flats/edit-flat/:id" component={EditFlat} />
          <Route path='*'><Error/></Route>
        </Switch>
        {url_name === "dashboard" ? null : <Footer />}
      </loginContext.Provider>
    </div>
  )
}

export default App