import { useState } from 'react';
import { BiUserCircle } from 'react-icons/bi';
import { CiDiscount1 } from 'react-icons/ci';
import { RxHamburgerMenu } from 'react-icons/rx';
import { AiOutlineClose, AiOutlineInbox, AiOutlineSetting } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineDashboard } from 'react-icons/md';
import { FiUsers } from 'react-icons/fi';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { BsShieldLockFill } from 'react-icons/bs';
import { ImImages, ImProfile } from 'react-icons/im';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [prod, setProd] = useState(false);
  const [settings, setSettings] = useState(false);
  const navigate = useNavigate();

  return (
    <div className=''>
      <nav className='relative px-8 py-4 flex justify-between items-center border-y border-gray-400 '>
        <p className='text-3xl font-bold leading-none flex items-center space-x-4'>
          <img
            src='https://res.cloudinary.com/sarvesh-damle/image/upload/v1696443430/Buddies_MajorProject/logos/logo_transparent_yf8nw4.png'
            alt='logo'
            className='w-[100px] h-auto cursor-pointer'
            onClick={() => navigate('/')}
          />
        </p>
        <div className='flex gap-5'>
          <div className=''>
            <div className='flex items-center space-x-2'>
              <span className='flex flex-col'>
                <div className='cursor-pointer' onClick={() => navigate('/profile')}>
                  <BiUserCircle size={30} />
                </div>
              </span>
            </div>
          </div>
          <div className='lg:hidden cursor-pointer'>
            {open ? (
              <div onClick={() => setOpen(!open)}>{<AiOutlineClose size={30} />}</div>
            ) : (
              <div onClick={() => setOpen(!open)}>{<RxHamburgerMenu size={30} />}</div>
            )}
          </div>
        </div>
      </nav>
      {/* mobile  */}
      <div
        className={
          open
            ? ' lg:hidden h-[90vh] w-[220px] absolute overflow-y-scroll  ease-in-out duration-500  bg-[#fbfbfb] z-20 left-[0px] '
            : ' lg:hidden fixed left-[-100%]'
        }
      >
        <Link to='/home'>
          <div className='h-[40px] flex mt-3  w-[100%] pl-5 text-xl' onClick={() => setOpen(false)}>
            <MdOutlineDashboard size={30} />
            <div className='mx-5'>Dashboard</div>
          </div>
        </Link>
        <hr className='text-black h-2' />
        <div
          onClick={() => setProd(!prod)}
          className=' cursor-pointer h-[40px] flex mt-3  w-[100%] pl-5 text-xl'
        >
          <AiOutlineInbox size={30} />
          <div className='mx-5'>Product</div>
          {prod ? <RiArrowDropUpLine size={30} /> : <RiArrowDropDownLine size={30} />}
        </div>
        {prod ? (
          <div className='bg-[#ebf7f7]'>
            <Link to='/categories'>
              <div
                className='h-[40px] flex mt-3 items-center  w-[100%] pl-5 text-xl'
                onClick={() => {
                  setProd(!prod);
                  setOpen(false);
                }}
              >
                <div className='mx-5'>Categories</div>
              </div>
            </Link>
            <Link to='/subcategories'>
              <div
                className='h-[40px] flex mt-3 items-center w-[100%] pl-5 text-xl'
                onClick={() => {
                  setProd(!prod);
                  setOpen(false);
                }}
              >
                <div className='mx-5'>SubCategories</div>
              </div>
            </Link>
            <Link to='/attributes'>
              <div
                className='h-[40px] flex mt-3 items-center  w-[200px] pl-5 text-xl'
                onClick={() => {
                  setProd(!prod);
                  setOpen(false);
                }}
              >
                <div className='mx-5'>Attributes</div>
              </div>
            </Link>
            <Link to='/products'>
              <div
                className='h-[40px] flex mt-3 items-center  w-[200px] pl-5 text-xl'
                onClick={() => {
                  setProd(!prod);
                  setOpen(false);
                }}
              >
                <div className='mx-5'>Products</div>
              </div>
            </Link>
          </div>
        ) : (
          ''
        )}
        <hr className='text-black h-2' />
        <Link to='/banner'>
          <div
            className='h-[40px] flex mt-3  w-[200px] pl-5 text-xl'
            onClick={() => setOpen(false)}
          >
            <ImImages size={30} />
            <div className='mx-5'>Banner</div>
          </div>
        </Link>
        <hr className='text-black h-2' />
        <Link to='/subbanner'>
          <div
            className='h-[40px] flex mt-3  w-[200px] pl-5 text-xl'
            onClick={() => setOpen(false)}
          >
            <ImImages size={30} />
            <div className='mx-5'>Sub Banner</div>
          </div>
        </Link>
        <hr className='text-black h-2' />
        <Link to='/orders'>
          <div
            className='h-[40px] flex mt-3  w-[200px] pl-5 text-xl'
            onClick={() => setOpen(false)}
          >
            <MdOutlineDashboard size={30} />
            <div className='mx-5'>Orders</div>
          </div>
        </Link>
        <hr className='text-black h-2' />
        <Link to='/coupons'>
          <div
            className='h-[40px] flex mt-3  w-[200px] pl-5 text-xl'
            onClick={() => setOpen(false)}
          >
            <CiDiscount1 size={30} />
            <div className='mx-5'>Coupons</div>
          </div>
        </Link>
        <hr className='text-black h-2' />
        <Link to='/users'>
          <div
            className='h-[40px] flex my-3  w-[200px] pl-5 text-xl'
            onClick={() => setOpen(false)}
          >
            <FiUsers size={30} />
            <div className='mx-5'>Users</div>
          </div>
        </Link>

        <hr className='text-black h-2' />
        <Link to='/permissions'>
          <div
            className='h-[40px] flex mt-3  w-[200px] pl-5 text-xl'
            onClick={() => setOpen(false)}
          >
            <BsShieldLockFill size={30} />
            <div className='mx-5'>Permissions</div>
          </div>
        </Link>
        <hr className='text-black h-2' />
        <Link to='/profile'>
          <div
            className='h-[40px] flex mt-3  w-[200px] pl-5 text-xl'
            onClick={() => setOpen(false)}
          >
            <ImProfile size={30} />
            <div className='mx-5'>Profile</div>
          </div>
        </Link>
        <hr className='text-black h-2' />
        <div
          onClick={() => setSettings(!settings)}
          className=' cursor-pointer h-[40px] flex mt-3  w-[100%] pl-5 text-xl'
        >
          <AiOutlineSetting size={30} />
          <div className='mx-5'>Settings</div>
          {settings ? <RiArrowDropUpLine size={30} /> : <RiArrowDropDownLine size={30} />}
        </div>
        {settings ? (
          <div className='bg-[#ebf7f7]'>
            <Link to='/return'>
              <div
                className='h-[40px] flex mt-3 items-center  w-[100%] pl-5 text-xl'
                onClick={() => setOpen(false)}
              >
                <div className='mx-5'>Return</div>
              </div>
            </Link>
            <Link to='/t&c'>
              <div
                className='h-[40px] flex mt-3 items-center w-[100%] pl-5 text-xl'
                onClick={() => setOpen(false)}
              >
                <div className='mx-5'>T&C</div>
              </div>
            </Link>
            <Link to='/policy'>
              <div
                className='h-[40px] flex mt-3 items-center  w-[200px] pl-5 text-xl'
                onClick={() => setOpen(false)}
              >
                <div className='mx-5'>Privacy Policy</div>
              </div>
            </Link>
            <Link to='/analytics'>
              <div
                className='h-[40px] flex mt-3 items-center  w-[200px] pl-5 text-xl'
                onClick={() => setOpen(false)}
              >
                <div className='mx-5'>Analytics</div>
              </div>
            </Link>
          </div>
        ) : (
          ''
        )}
        <hr className='text-black h-2' />
      </div>
      {/* laptop */}
    </div>
  );
};

export default Navbar;
