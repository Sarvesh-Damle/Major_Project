import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ListProperty from "./ListingForms/ListProperty";
import { loginContext } from "../../provider/authContext";
import { FaRegCircleUser } from "react-icons/fa6";
import { BiMenuAltRight } from "react-icons/bi";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import OutsideClickHandler from "react-outside-click-handler";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(loginContext);
  const mutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => {
      return axios.post("/api/v1/auth/logout", {}, { withCredentials: true })
    },
    onSuccess(data) {
      setIsLoggedIn({ login: false, signup: false });
      navigate("/");
      toast.success(data.data.message);
    },
    onError(error) {
      setIsLoggedIn({ login: false, signup: false });
      let message = error.response?.data?.message;
      toast.error(message);
    }

  })
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <header className="bg-black text-white">
      <div className="flex items-center flex-wrap gap-y-8 p-6 innerWidth py-4 text-secondary justify-between h-container">
        <img
          src="https://res.cloudinary.com/sarvesh-damle/image/upload/v1696443430/Buddies_MajorProject/logos/logo_transparent_yf8nw4.png"
          alt="logo"
          className="w-[100px] h-auto cursor-pointer"
          onClick={() => navigate("/")}
        />
        <OutsideClickHandler onOutsideClick={() => setMenuOpened(false)}>
          <div className={menuOpened ? "flexCenter gap-8 hover:cursor-pointer max-lg:text-black max-lg:absolute max-lg:top-12 max-lg:right-16 max-lg:bg-white max-lg:flex-col max-lg:flex max-lg:font-medium max-lg:gap-8 max-lg:p-12 max-lg:rounded-[10px] max-lg:items-start max-lg:shadow-md transition-all duration-300 ease-in z-10  text-black h-menu" : "flexCenter gap-8 hover:cursor-pointer max-lg:text-black max-lg:absolute max-lg:top-12 max-lg:right-[-330px] max-lg:bg-white max-lg:flex-col max-lg:flex max-lg:font-medium max-lg:gap-8 max-lg:p-12 max-lg:rounded-[10px] max-lg:items-start max-lg:shadow-md transition-all duration-300 ease-in z-10 h-menu"}>
            <NavLink to="/" className="hover:text-white">Home</NavLink>
            <NavLink to="/contact" className="hover:text-white">Contact & Support</NavLink>
            <NavLink to="/team" className="hover:text-white">Our Team</NavLink>
            <div>
              <ListProperty />
            </div>
            {isLoggedIn.login ? (<div className="flex items-center gap-4 h-[50px] mx-2 " >
              <div className="w-[50px] h-[50px] flex justify-center items-center " >
                <FaRegCircleUser size={30} className="hover:scale-105 active:text-violet-400" onClick={() => navigate("/profile")} />
              </div>
              <button onClick={() => mutation.mutate()} className="w-full h-[40px] rounded-lg  flex items-center justify-center mr-2 text-black font-semibold bg-slate-300 hover:bg-slate-400 active:bg-slate-200 text-xl" >Logout</button>
            </div>) : (<div className="flex gap-2" >
              <Link to="/signin" className="font-medium px-6 py-2 text-white border-none rounded-lg transition-all duration-200 ease-in hover:cursor-pointer transform hover:scale-105 bg-blue-gradient">Sign in</Link>
              {isLoggedIn.signup ? (<></>) : (<Link to="/signup" className="font-medium px-6 py-2 text-white border-none rounded-lg transition-all duration-200 ease-in hover:cursor-pointer transform hover:scale-105 bg-blue-gradient">Sign Up</Link>)}
            </div>)}
          </div>
        </OutsideClickHandler>
        <div className="block lg:hidden menu-icon" onClick={() => setMenuOpened(prev => !prev)}>
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;