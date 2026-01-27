import { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import ListProperty from './ListingForms/ListProperty';
import { loginContext } from '@/provider/authContext';
import { FaRegCircleUser } from 'react-icons/fa6';
import { BiMenuAltRight } from 'react-icons/bi';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import OutsideClickHandler from 'react-outside-click-handler';

const Navbar = () => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => {
      return axios.post('/api/v1/auth/logout', {}, { withCredentials: true });
    },
    onSuccess(data) {
      isAuthenticated({ login: false, signup: false });
      navigate('/');
      toast.success(data.data.message);
    },
    onError(error) {
      isAuthenticated({ login: false, signup: false });
      let message = error.response?.data?.message;
      toast.error(message);
    },
  });
  const [menuOpened, setMenuOpened] = useState(false);
  const { isLoggedIn, setIsLoggedIn: isAuthenticated } = useContext(loginContext);

  useEffect(() => {
    async function callData() {
      try {
        const res = await axios.get('/api/v1/users/me', { withCredentials: true });
        if (res.data.data._id) {
          isAuthenticated({ login: true, signup: false });
        } else {
          isAuthenticated({ login: false, signup: true });
        }
      } catch (error) {
        // User is not authenticated - this is expected for unauthenticated visitors
        if (import.meta.env.DEV && error.response?.status !== 401) {
          console.warn('Auth check failed:', error.response?.status || error.message);
        }
      }
    }
    callData();
  }, [isAuthenticated]);

  useEffect(() => {
    setMenuOpened(false);
  }, [isLoggedIn]);

  return (
    <header className='bg-black text-white'>
      <div className='flex items-center flex-wrap gap-y-8 p-6 innerWidth py-4 text-secondary justify-between h-container'>
        <Link to='/' aria-label='Buddies - Go to homepage'>
          <img
            src='https://res.cloudinary.com/sarvesh-damle/image/upload/v1696443430/Buddies_MajorProject/logos/logo_transparent_yf8nw4.png'
            alt='Buddies logo'
            className='w-[100px] h-auto'
          />
        </Link>
        <OutsideClickHandler onOutsideClick={() => setMenuOpened(false)}>
          <nav
            aria-label='Main navigation'
            className={
              menuOpened
                ? 'flexCenter gap-8 hover:cursor-pointer max-lg:text-black max-lg:absolute max-lg:top-12 max-lg:right-16 max-lg:bg-white max-lg:flex-col max-lg:flex max-lg:font-medium max-lg:gap-8 max-lg:p-12 max-lg:rounded-[10px] max-lg:items-start max-lg:shadow-md transition-all duration-300 ease-in z-10  text-black h-menu'
                : 'flexCenter gap-8 hover:cursor-pointer max-lg:text-black max-lg:absolute max-lg:top-12 max-lg:right-[-330px] max-lg:bg-white max-lg:flex-col max-lg:flex max-lg:font-medium max-lg:gap-8 max-lg:p-12 max-lg:rounded-[10px] max-lg:items-start max-lg:shadow-md transition-all duration-300 ease-in z-10 h-menu'
            }
          >
            <NavLink to='/' className='hover:text-white'>
              Home
            </NavLink>
            <NavLink to='/map?city=Mumbai' className='hover:text-white'>
              Map View
            </NavLink>
            <NavLink to='/contact' className='hover:text-white'>
              Contact & Support
            </NavLink>
            <NavLink to='/team' className='hover:text-white'>
              Our Team
            </NavLink>
            <div>
              <ListProperty />
            </div>
            {isLoggedIn.login ? (
              <div className='flex items-center gap-4 h-[50px] mx-2 '>
                <button
                  className='w-[50px] h-[50px] flex justify-center items-center bg-transparent border-none cursor-pointer'
                  onClick={() => navigate('/profile')}
                  aria-label='View profile'
                >
                  <FaRegCircleUser
                    size={30}
                    className='hover:scale-105 active:text-violet-400'
                  />
                </button>
                <button
                  onClick={() => mutation.mutate()}
                  className='w-full h-[40px] rounded-lg  flex items-center justify-center mr-2 text-black font-semibold bg-slate-300 hover:bg-slate-400 active:bg-slate-200 text-xl'
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className='flex gap-2'>
                <Link
                  to='/signin'
                  className='btn-primary'
                >
                  Sign in
                </Link>
                {isLoggedIn.signup ? (
                  <></>
                ) : (
                  <Link
                    to='/signup'
                    className='btn-primary'
                  >
                    Sign Up
                  </Link>
                )}
              </div>
            )}
          </nav>
        </OutsideClickHandler>
        <button
          className='block lg:hidden menu-icon bg-transparent border-none cursor-pointer'
          onClick={() => setMenuOpened((prev) => !prev)}
          aria-label={menuOpened ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpened}
        >
          <BiMenuAltRight size={30} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
