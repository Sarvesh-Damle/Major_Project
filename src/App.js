import About from "./components/About";
import Signin from "./components/Authentication/SignIn";
import Contact from "./components/Contact";
import Home from "./components/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Team from "./components/Team";
import Error from "./components/Error";
import SignUp from "./components/Authentication/SignUp";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/team" element={<Team />} />
          <Route path="/sa" element={<Error/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
