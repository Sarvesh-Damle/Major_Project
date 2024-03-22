import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { Home, SignIn, SignUp, Property, Contact, Error, Team, ListProperty, Students, Professionals, PropertyOwner, ResetPassword } from './components/index.js';
import Provider from './components/Provider.jsx';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginContext } from './provider/authContext.js';
import axios from 'axios';
import { useContext } from 'react';



const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path='/' element={<App />}>
      <Route path='' element={<Home />} />
      <Route path='signin' element={<SignIn />} />
      <Route path='signup' element={<SignUp />} />
      <Route path='property' element={<Property />} />
      <Route path='contact' element={<Contact />} />
      <Route path='team' element={<Team />} />
      <Route path='list' element={<ListProperty />} />
      <Route path='students' element={<Students />} />
      <Route path='professionals' element={<Professionals />} />
      <Route path='owner' element={<PropertyOwner />} />
      <Route path='error' element={<Error />} />
      <Route path='reset-password' element={<ResetPassword />} />
    </Route>
    <Route path='*' element={<Error />} />
  </>
))

export const AppWrapper = () => {
  const [isLoggedIn, setIsLoggedIn] = useState({login: false, signup: false});
  const {setIsLoggedIn:isAuthenticated}=useContext(loginContext)

  useEffect(() => {
    async function callData() {
      try {
        const res = await axios.get("/api/v1/users/me", { withCredentials: true });
        if(res.data.data._id){
          isAuthenticated({login: true, signup: false})
        }
        else{
           isAuthenticated({login: false, signup: true})
        }
      } catch (error) {
        console.log(error);
      }
    }
    callData();
  }, []);

  return (
    <React.StrictMode>
      <ToastContainer autoClose={1000} />
      <Provider>
        <loginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
          <RouterProvider router={router} />
        </loginContext.Provider>
      </Provider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<AppWrapper />);