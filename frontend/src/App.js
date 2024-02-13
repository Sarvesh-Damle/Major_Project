import About from "./components/About";
import Signin from "./components/Authentication/SignIn";
import Contact from "./components/Contact";
import Home from "./components/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Team from "./components/Team";
import Error from "./components/Error";
import SignUp from "./components/Authentication/SignUp";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Product from "./components/Product";

function App() {
  return (
    <div className="overflow-hidden">
      <BrowserRouter>
        <Navbar />
        <ToastContainer autoClose={1000} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Product />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/team" element={<Team />} />
          <Route path="/sa" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
