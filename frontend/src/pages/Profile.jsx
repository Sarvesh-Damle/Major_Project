import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';
import 'swiper/css';
import PropertiesCard from '@/components/ListProperties/PropertiesCard.jsx';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { MdDelete } from 'react-icons/md';
import { HiChartPie, HiUser, HiShoppingBag } from 'react-icons/hi';
import { FaIndianRupeeSign } from 'react-icons/fa6';

const Profile = () => {
  const navigate = useNavigate();

  const [selectedItem, setSelectedItem] = useState('User Details');

  const handleItemClick = (label) => {
    setSelectedItem(label);
  };

  const {
    data,
    isLoading,
    isError,
    refetch: refetchUserDetails,
  } = useQuery({
    queryKey: ['User_Details'],
    queryFn: async () => {
      const response = await axios.get(`/api/v1/users/me`, { withCredentials: true });
      return response.data;
    },
  });
  const {
    data: favourites,
    isLoading: isLoadingFavourites,
    isError: isErrorFavourites,
    refetch: refetchFavourites,
  } = useQuery({
    queryKey: ['Favourites'],
    queryFn: async () => {
      const response = await axios.get(`/api/v1/favourites/get-favourite`, {
        withCredentials: true,
      });
      return response.data;
    },
  });

  const handleRedirect = () => {
    if (data?.data.isAdmin) {
      toast.success('Admin Dashboard opened!');
      navigate('/dashboard');
    } else {
      toast.error('You are not authorized!!');
    }
  };

  const removeFavouritesMutation = useMutation({
    mutationKey: ['remove favourites'],
    mutationFn: (propertyId) => {
      return axios.delete('/api/v1/favourites/delete-favourite', { data: { propertyId } });
    },
    onSuccess() {
      refetchFavourites();
      toast.success('Property removed from favourites');
    },
    onError() {
      toast.error('Failed to Remove Property from Favourites');
    },
  });

  if (isLoading || isLoadingFavourites) return <Loader />;
  if (isError || isErrorFavourites) return <ErrorComponent />;

  return (
    <>
      <div className='flex h-full flex-wrap'>
        <div className='w-60 max-md:w-full bg-gray-100 p-4 text-xl flex flex-col gap-5'>
          <SidebarItem
            icon={<HiUser />}
            label='User Details'
            onClick={() => handleItemClick('User Details')}
          />
          <SidebarItem
            icon={<HiShoppingBag />}
            label='See Favourites'
            onClick={() => handleItemClick('See Favourites')}
          />
          {data.data.isAdmin && (
            <SidebarItem
              icon={<HiChartPie />}
              label='View Dashboard'
              onClick={() => handleRedirect()}
            />
          )}
          <SidebarItem
            icon={<FaIndianRupeeSign />}
            label='My Credits'
            onClick={() => handleItemClick('My Credits')}
          />
        </div>
        <div className='flex-1 p-4'>
          {selectedItem === 'User Details' && (
            <UserProfile data={data} refetchUserDetails={refetchUserDetails} />
          )}
          {selectedItem === 'See Favourites' && (
            <Favourites
              favourites={favourites}
              removeFavouritesMutation={removeFavouritesMutation}
              selectedItem={selectedItem}
            />
          )}
          {selectedItem === 'My Credits' && <Credits data={data} />}
        </div>
      </div>
    </>
  );
};

const UserProfile = ({ data, refetchUserDetails }) => {
  let userData = data.data;
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber);
  const id = userData._id;

  useEffect(() => {
    setName(userData.name);
    setEmail(userData.email);
    setPhoneNumber(userData.phoneNumber);
  }, [userData]);

  const mutation = useMutation({
    mutationKey: ['user-update'],
    mutationFn: () => {
      return axios.put(
        `/api/v1/users/update-user?id=${id}`,
        { name, email, phoneNumber },
        { withCredentials: true }
      );
    },
    onSuccess(data) {
      toast.success(data.data.message);
      refetchUserDetails();
      setIsEditMode(false);
    },
    onError(error) {
      let message = error.response?.data?.message;
      toast.error(message);
    },
  });

  const handleSave = () => {
    mutation.mutate();
  };

  return (
    <div className='bg-white overflow-hidden shadow rounded-lg border'>
      <div className='px-4 py-5 sm:px-6'>
        <h3 className='text-lg leading-6 font-medium text-gray-900'>User Profile</h3>
      </div>
      <div className='border-t border-gray-200 px-4 py-5 sm:p-0'>
        <dl className='sm:divide-y sm:divide-gray-200'>
          <div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Full name</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
              {isEditMode ? (
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
              ) : (
                name
              )}
            </dd>
          </div>
          <div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Email address</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
              {isEditMode ? (
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
              ) : (
                email
              )}
            </dd>
          </div>
          <div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Phone number</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
              {isEditMode ? (
                <input
                  type='number'
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              ) : (
                `(+91) ${phoneNumber}`
              )}
            </dd>
          </div>
        </dl>
      </div>
      {isEditMode && (
        <div className='flex justify-start items-center ml-20 mb-2 mt-10'>
          <button
            className='font-medium px-6 py-2 text-white border-none rounded-lg transition-all duration-200 ease-in hover:cursor-pointer transform hover:scale-105 bg-blue-gradient'
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      )}
      {!isEditMode && (
        <div className='flex justify-start items-center ml-20 mb-2 mt-10'>
          <button
            className='font-medium px-6 py-2 text-white border-none rounded-lg transition-all duration-200 ease-in hover:cursor-pointer transform hover:scale-105 bg-blue-gradient'
            onClick={() => setIsEditMode(true)}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

const Credits = ({ data }) => {
  return (
    <div className='bg-white overflow-hidden shadow rounded-lg border'>
      <div className='px-4 py-5 sm:px-6'>
        <h3 className='text-lg leading-6 font-medium text-gray-900'>User Credits</h3>
        <p className='mt-1 max-w-2xl text-sm text-gray-500'>
          Credits can be used as an alternative to pay, 1&#8377; = 1 credit
        </p>
      </div>
      <div className='border-t border-gray-200 px-4 py-5 sm:p-0'>
        <dl className='sm:divide-y sm:divide-gray-200'>
          <div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Credits</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize'>
              {data.data.credits || 0}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, onClick }) => {
  return (
    <div
      className='flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-200'
      onClick={onClick}
    >
      <div className='mr-2'>{icon}</div>
      <div className='ml-1 mb-0.5'>{label}</div>
    </div>
  );
};

const Favourites = ({ favourites, removeFavouritesMutation, selectedItem }) => {
  return (
    <div className='text-black'>
      {(favourites?.data.hostel === undefined || favourites?.data.hostel.length === 0) &&
      (favourites?.data.pg === undefined || favourites?.data.pg.length === 0) &&
      (favourites?.data.flat === undefined || favourites?.data.flat.length === 0) ? (
        <div className='flex justify-start p-2 mt-10 items-center'>Empty Favourites</div>
      ) : (
        <>
          {selectedItem === 'See Favourites' && (
            <div className='p-6 w-full flex flex-col justify-center items-center gap-2 overflow-hidden r-container'>
              {favourites?.data.hostel.length !== 0 && (
                <>
                  <div className='flex justify-center items-center mb-8 max-lg:items-center r-head'>
                    <span className='primaryText max-md:text-2xl'>Favourite Hostel Properties</span>
                  </div>
                  <div className='flex flex-wrap gap-x-12'>
                    {favourites?.data.hostel &&
                      favourites?.data.hostel.map((card, index) => {
                        return (
                          <div key={index} className='relative'>
                            <PropertiesCard card={card} />
                            <button
                              className='absolute top-0 right-0 py-2 pr-1 text-2xl font-bold transition-all duration-300 ease-in hover:scale-125 hover:cursor-pointer'
                              onClick={() => removeFavouritesMutation.mutate(card._id)}
                            >
                              <MdDelete />
                            </button>
                          </div>
                        );
                      })}
                  </div>
                </>
              )}
              {favourites?.data.pg.length !== 0 && (
                <>
                  <div className='flex justify-center items-center my-8 max-lg:items-center r-head'>
                    <span className='primaryText max-md:text-2xl'>Favourite PGs</span>
                  </div>
                  <div className='flex flex-wrap gap-x-12'>
                    {favourites?.data.pg &&
                      favourites?.data.pg.map((card, index) => {
                        return (
                          <div key={index} className='relative'>
                            <PropertiesCard card={card} />
                            <button
                              className='absolute top-0 right-0 pt-0.5 text-2xl font-bold transition-all duration-300 ease-in hover:scale-125 hover:cursor-pointer'
                              onClick={() => removeFavouritesMutation.mutate(card._id)}
                            >
                              <MdDelete />
                            </button>
                          </div>
                        );
                      })}
                  </div>
                </>
              )}
              {favourites?.data.flat.length !== 0 && (
                <>
                  <div className='flex justify-center items-center my-8 max-lg:items-center r-head'>
                    <span className='primaryText max-md:text-2xl'>Favourite Flats</span>
                  </div>
                  <div className='flex flex-wrap gap-x-12'>
                    {favourites?.data.flat &&
                      favourites?.data.flat.map((card, index) => {
                        return (
                          <div key={index} className='relative'>
                            <PropertiesCard card={card} />
                            <button
                              className='absolute top-0 right-0 py-2 pr-1 text-2xl font-bold transition-all duration-300 ease-in hover:scale-125 hover:cursor-pointer'
                              onClick={() => removeFavouritesMutation.mutate(card._id)}
                            >
                              <MdDelete />
                            </button>
                          </div>
                        );
                      })}
                  </div>
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
