import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';
import 'swiper/css';
import PropertiesCard from '@/components/ListProperties/PropertiesCard.jsx';
import EmptyState from '@/components/ui/EmptyState.jsx';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { MdDelete } from 'react-icons/md';
import { HiChartPie, HiUser, HiShoppingBag, HiHome, HiBookmark, HiBell } from 'react-icons/hi';
import { FaIndianRupeeSign, FaEye } from 'react-icons/fa6';
import { HiCheckBadge, HiTrash } from 'react-icons/hi2';

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
          <SidebarItem
            icon={<HiHome />}
            label='My Properties'
            onClick={() => handleItemClick('My Properties')}
          />
          <SidebarItem
            icon={<HiBookmark />}
            label='Saved Searches'
            onClick={() => handleItemClick('Saved Searches')}
          />
          <SidebarItem
            icon={<HiBell />}
            label='Notifications'
            onClick={() => handleItemClick('Notifications')}
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
          {selectedItem === 'My Properties' && <MyProperties />}
          {selectedItem === 'Saved Searches' && <SavedSearches />}
          {selectedItem === 'Notifications' && <NotificationPreferences />}
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
            className='btn-primary'
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      )}
      {!isEditMode && (
        <div className='flex justify-start items-center ml-20 mb-2 mt-10'>
          <button
            className='btn-primary'
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

const MyProperties = () => {
  const navigate = useNavigate();

  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ['My_Property_Stats'],
    queryFn: async () => {
      const response = await axios.get('/api/v1/users/my-property-stats', {
        withCredentials: true,
      });
      return response.data;
    },
  });

  const {
    data: properties,
    isLoading: isLoadingProperties,
    isError,
  } = useQuery({
    queryKey: ['My_Properties'],
    queryFn: async () => {
      const response = await axios.get('/api/v1/users/my-properties', {
        withCredentials: true,
      });
      return response.data;
    },
  });

  if (isLoadingStats || isLoadingProperties) return <Loader />;
  if (isError) return <ErrorComponent />;

  const propertyList = properties?.data || [];
  const statsData = stats?.data || { totalProperties: 0, totalViews: 0, verifiedCount: 0 };

  const handleViewProperty = (property) => {
    const type = property.propertyType;
    if (type === 'hostel') navigate(`/hostels/${property._id}`);
    else if (type === 'pg') navigate(`/pgs/${property._id}`);
    else if (type === 'flat') navigate(`/flats/${property._id}`);
  };

  return (
    <div className='text-black'>
      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
        <div className='bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm opacity-80'>Total Properties</p>
              <p className='text-2xl font-bold'>{statsData.totalProperties}</p>
            </div>
            <HiHome className='text-4xl opacity-80' />
          </div>
        </div>
        <div className='bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm opacity-80'>Total Views</p>
              <p className='text-2xl font-bold'>{statsData.totalViews}</p>
            </div>
            <FaEye className='text-4xl opacity-80' />
          </div>
        </div>
        <div className='bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm opacity-80'>Verified Listings</p>
              <p className='text-2xl font-bold'>{statsData.verifiedCount}</p>
            </div>
            <HiCheckBadge className='text-4xl opacity-80' />
          </div>
        </div>
      </div>

      {/* Properties List */}
      {propertyList.length === 0 ? (
        <EmptyState
          icon='search'
          title='No properties listed yet'
          message='Properties you list will appear here. Start by adding your first property!'
          actionLabel='List Property'
          actionHref='/propertyOwner'
        />
      ) : (
        <div className='bg-white rounded-lg shadow overflow-hidden'>
          <div className='px-4 py-3 border-b border-gray-200'>
            <h3 className='text-lg font-medium text-gray-900'>Your Listed Properties</h3>
          </div>
          <div className='divide-y divide-gray-200'>
            {propertyList.map((property) => (
              <div
                key={property._id}
                className='p-4 hover:bg-gray-50 cursor-pointer transition-colors'
                onClick={() => handleViewProperty(property)}
              >
                <div className='flex items-center gap-4'>
                  <img
                    src={property.property_photos?.[0] || '/placeholder.jpg'}
                    alt={property.hostel_name || property.pg_name || property.flat_type}
                    className='w-20 h-20 object-cover rounded-lg'
                  />
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center gap-2'>
                      <h4 className='text-sm font-medium text-gray-900 truncate'>
                        {property.hostel_name || property.pg_name || `${property.flat_type} Flat`}
                      </h4>
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full ${
                          property.featured
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {property.featured ? 'Verified' : 'Pending'}
                      </span>
                      <span className='px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800 capitalize'>
                        {property.propertyType}
                      </span>
                    </div>
                    <p className='text-sm text-gray-500'>
                      {property.locality}, {property.city}
                    </p>
                    <div className='flex items-center gap-4 mt-1 text-sm text-gray-600'>
                      <span>₹{property.rent_amount}/month</span>
                      <span className='flex items-center gap-1'>
                        <FaEye className='text-gray-400' /> {property.views || 0} views
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const SavedSearches = () => {
  const navigate = useNavigate();

  const {
    data: savedSearches,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['Saved_Searches'],
    queryFn: async () => {
      const response = await axios.get('/api/v1/saved-searches', { withCredentials: true });
      return response.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => {
      return axios.delete(`/api/v1/saved-searches/${id}`, { withCredentials: true });
    },
    onSuccess: () => {
      toast.success('Saved search deleted');
      refetch();
    },
    onError: () => {
      toast.error('Failed to delete saved search');
    },
  });

  const handleRunSearch = (search) => {
    const params = new URLSearchParams();
    if (search.filters.city) params.set('city', search.filters.city);
    if (search.filters.locality) params.set('locality', search.filters.locality);
    navigate(`/${search.propertyType}s?${params.toString()}`);
  };

  if (isLoading) return <Loader />;
  if (isError) return <ErrorComponent />;

  const searches = savedSearches?.data || [];

  return (
    <div className='text-black'>
      {searches.length === 0 ? (
        <EmptyState
          icon='search'
          title='No saved searches yet'
          message='Save your property searches to quickly access them later. Look for the "Save Search" button on property listing pages.'
        />
      ) : (
        <div className='bg-white rounded-lg shadow overflow-hidden'>
          <div className='px-4 py-3 border-b border-gray-200'>
            <h3 className='text-lg font-medium text-gray-900'>Your Saved Searches</h3>
            <p className='text-sm text-gray-500'>Click on a search to run it again</p>
          </div>
          <div className='divide-y divide-gray-200'>
            {searches.map((search) => (
              <div
                key={search._id}
                className='p-4 hover:bg-gray-50 cursor-pointer transition-colors flex items-center justify-between'
              >
                <div className='flex-1' onClick={() => handleRunSearch(search)}>
                  <div className='flex items-center gap-2'>
                    <h4 className='text-sm font-medium text-gray-900'>{search.searchName}</h4>
                    <span className='px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800 capitalize'>
                      {search.propertyType}
                    </span>
                    {search.notifyOnNewMatches && (
                      <span className='px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800'>
                        Notifications On
                      </span>
                    )}
                  </div>
                  <div className='flex flex-wrap gap-2 mt-2'>
                    {search.filters.city && (
                      <span className='text-xs text-gray-500'>City: {search.filters.city}</span>
                    )}
                    {search.filters.locality && (
                      <span className='text-xs text-gray-500'>• Locality: {search.filters.locality}</span>
                    )}
                    {search.filters.minPrice && (
                      <span className='text-xs text-gray-500'>• Min: ₹{search.filters.minPrice}</span>
                    )}
                    {search.filters.maxPrice && (
                      <span className='text-xs text-gray-500'>• Max: ₹{search.filters.maxPrice}</span>
                    )}
                  </div>
                  <p className='text-xs text-gray-400 mt-1'>
                    Saved on {new Date(search.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm('Delete this saved search?')) {
                      deleteMutation.mutate(search._id);
                    }
                  }}
                  className='p-2 text-gray-400 hover:text-red-500 transition-colors'
                  title='Delete saved search'
                >
                  <HiTrash className='text-xl' />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const NotificationPreferences = () => {
  const {
    data: preferences,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['Notification_Preferences'],
    queryFn: async () => {
      const response = await axios.get('/api/v1/notification-preferences', {
        withCredentials: true,
      });
      return response.data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data) => {
      return axios.put('/api/v1/notification-preferences', data, { withCredentials: true });
    },
    onSuccess: () => {
      toast.success('Preferences updated!');
      refetch();
    },
    onError: () => {
      toast.error('Failed to update preferences');
    },
  });

  const handleToggle = (key, value) => {
    updateMutation.mutate({ [key]: value });
  };

  if (isLoading) return <Loader />;
  if (isError) return <ErrorComponent />;

  const prefs = preferences?.data || {};

  return (
    <div className='bg-white overflow-hidden shadow rounded-lg border'>
      <div className='px-4 py-5 sm:px-6'>
        <h3 className='text-lg leading-6 font-medium text-gray-900'>Notification Preferences</h3>
        <p className='mt-1 text-sm text-gray-500'>Manage how and when you receive notifications</p>
      </div>
      <div className='border-t border-gray-200'>
        <div className='divide-y divide-gray-200'>
          {/* Master Toggle */}
          <div className='px-6 py-4 flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-900'>Email Notifications</p>
              <p className='text-sm text-gray-500'>Receive email notifications</p>
            </div>
            <button
              onClick={() => handleToggle('emailNotificationsEnabled', !prefs.emailNotificationsEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                prefs.emailNotificationsEnabled ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  prefs.emailNotificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Saved Search Alerts */}
          <div className='px-6 py-4 flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-900'>Saved Search Alerts</p>
              <p className='text-sm text-gray-500'>Get notified when new properties match your saved searches</p>
            </div>
            <button
              onClick={() => handleToggle('savedSearchAlerts', !prefs.savedSearchAlerts)}
              disabled={!prefs.emailNotificationsEnabled}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                prefs.savedSearchAlerts && prefs.emailNotificationsEnabled ? 'bg-blue-600' : 'bg-gray-200'
              } ${!prefs.emailNotificationsEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  prefs.savedSearchAlerts && prefs.emailNotificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Frequency Selector */}
          {prefs.savedSearchAlerts && prefs.emailNotificationsEnabled && (
            <div className='px-6 py-4'>
              <p className='text-sm font-medium text-gray-900 mb-2'>Alert Frequency</p>
              <div className='flex gap-2 flex-wrap'>
                {['immediate', 'daily', 'weekly'].map((freq) => (
                  <button
                    key={freq}
                    onClick={() => handleToggle('savedSearchFrequency', freq)}
                    className={`px-4 py-2 text-sm rounded-full capitalize transition-colors ${
                      prefs.savedSearchFrequency === freq
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {freq}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Property Verified Alert */}
          <div className='px-6 py-4 flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-900'>Property Verification Alerts</p>
              <p className='text-sm text-gray-500'>Get notified when your property is verified</p>
            </div>
            <button
              onClick={() => handleToggle('propertyVerifiedAlert', !prefs.propertyVerifiedAlert)}
              disabled={!prefs.emailNotificationsEnabled}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                prefs.propertyVerifiedAlert && prefs.emailNotificationsEnabled ? 'bg-blue-600' : 'bg-gray-200'
              } ${!prefs.emailNotificationsEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  prefs.propertyVerifiedAlert && prefs.emailNotificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Promotional Emails */}
          <div className='px-6 py-4 flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-900'>Promotional Emails</p>
              <p className='text-sm text-gray-500'>Receive offers and updates about new features</p>
            </div>
            <button
              onClick={() => handleToggle('promotionalEmails', !prefs.promotionalEmails)}
              disabled={!prefs.emailNotificationsEnabled}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                prefs.promotionalEmails && prefs.emailNotificationsEnabled ? 'bg-blue-600' : 'bg-gray-200'
              } ${!prefs.emailNotificationsEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  prefs.promotionalEmails && prefs.emailNotificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Favourites = ({ favourites, removeFavouritesMutation, selectedItem }) => {
  return (
    <div className='text-black'>
      {(favourites?.data.hostel === undefined || favourites?.data.hostel.length === 0) &&
      (favourites?.data.pg === undefined || favourites?.data.pg.length === 0) &&
      (favourites?.data.flat === undefined || favourites?.data.flat.length === 0) ? (
        <EmptyState
          icon='favorites'
          title='No favourites yet'
          message='Properties you add to favourites will appear here.'
        />
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
