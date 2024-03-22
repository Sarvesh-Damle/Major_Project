import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import {  Navbar, Footer } from './components';
import axios from "axios";
import { useContext } from 'react';
import { loginContext } from "./provider/authContext";
function App() {
  const {setIsLoggedIn:isAuthenticated}=useContext(loginContext)

  useEffect(() => {
    async function callData() {
      try {
        const res = await axios.get("/api/v1/users/me", { withCredentials: true });
        if(res.data.data._id){
          isAuthenticated({login: true, signup: true})
        }
        else{
           isAuthenticated({login: false, signup: false})
        }
      } catch (error) {
        console.log(error);
      }
    }
    callData();
  }, []);
  return (
    <>
    <div className="relative overflow-hidden">
      <Navbar />
      <Outlet />
      <Footer />
      </div>
    </>
  )
}

export default App