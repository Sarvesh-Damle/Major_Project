import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ListProperty from "./ListingForms/ListProperty";
import { signedUp } from "../Authentication/SignUp";
import { loggedIn, username } from "../Authentication/SignIn";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className={`flex items-center w-full bg-white`}>
      <div className="container">
        <div className="relative flex items-center justify-between -mx-4">
          <div className="max-w-full px-4 w-60"  >
            <div className="block w-full py-5 cursor-pointer" onClick={()=>navigate("/")} >
              <img
                src="https://res.cloudinary.com/sarvesh-damle/image/upload/v1696435051/Buddies_MajorProject/logos/logo_black2_zrvewb.png"
                alt="logo"
                className="w-full"
              />
            </div>
          </div>
          <div className="flex items-center justify-between w-full px-4">
            <div>
              <button
                // @click="navbarOpen = !navbarOpen"
                onClick={() => setOpen(!open)}
                // :className="navbarOpen && 'navbarTogglerActive' "
                id="navbarToggler"
                className={` ${
                  open && "navbarTogglerActive"
                } absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden`}
               >
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-black"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-black"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-black"></span>
              </button>
              <nav
                // :className="!navbarOpen && 'hidden' "
                id="navbarCollapse"
                className={`absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-white py-5 px-6 shadow lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none ${
                  !open && "hidden"
                } `}
              >
                <ul className="block lg:flex">
                  <ListItem
                    navItemStyles="text-dark hover:text-primary"
                    NavLink="/"
                  >
                    Home
                  </ListItem>
                  <ListItem
                    navItemStyles="text-dark hover:text-primary"
                    NavLink="/about"
                  >
                    About
                  </ListItem>
                  <ListItem
                    navItemStyles="text-dark hover:text-primary"
                    NavLink="/contact"
                  >
                    Contact & Support
                  </ListItem>
                  <ListItem
                    navItemStyles="text-dark hover:text-primary"
                    NavLink="/team"
                  >
                    Our Team
                  </ListItem>
                </ul>
              </nav>
            </div>
            <div className="justify-end hidden pr-16 sm:flex lg:pr-0">
                <ListProperty/>
                {loggedIn ? username : (<Link to="/signin" className="py-3 text-base font-medium px-7 text-dark hover:text-primary">Sign in</Link>)}
                {signedUp ? null : (<Link to="/signup" className="py-3 text-base font-medium text-dark rounded-lg bg-primary px-7 hover:bg-opacity-90">Sign Up</Link>)}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

const ListItem = ({ children, navItemStyles, NavLink }) => {
  const navigate = useNavigate();
  return (
    <>
      <li>
        <div
          onClick={()=>navigate(NavLink)}
          className={`flex py-2 text-base font-medium lg:ml-12 lg:inline-flex cursor-pointer ${navItemStyles}`}
        >
          {children}
        </div>
      </li>
    </>
  );
};
