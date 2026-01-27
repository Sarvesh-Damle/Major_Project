import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '@/pages/Loader';
import ErrorComponent from '@/pages/ErrorComponent';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

const EditFlat = () => {
  const { pathname } = useLocation();
  const id = pathname.split('/').slice(-1)[0];
  const [flatType, setFlatType] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerPhoneNumber, setOwnerPhoneNumber] = useState('');
  const [furnishedStatus, setFurnishedStatus] = useState('');
  const [preferredTennats, setPreferredTennats] = useState('');
  const [flatArea, setFlatArea] = useState('');
  const [locality, setLocality] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState(0);
  const [rentAmount, setRentAmount] = useState(0);
  const [securityDeposit, setSecurityDeposit] = useState(0);
  const [verified, setVerified] = useState('');
  const [address, setAddress] = useState('');
  const [distanceFromRailwayStation, setDistanceFromRailwayStation] = useState(0);
  const [distanceFromBusStop, setDistanceFromBusStop] = useState(0);
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const { isLoading, isError } = useQuery({
    queryKey: ['Flat'],

    queryFn: async () => {
      const response = await axios.get(`/api/v1/flats/find-flat?id=${id}`, {
        withCredentials: true,
      });
      let data = response.data.data;
      setFlatType(data.flat_type);
      setOwnerName(data.owner_name);
      setOwnerEmail(data.owner_email);
      setOwnerPhoneNumber(data.owner_phoneNumber);
      setFurnishedStatus(data.furnished_status);
      setPreferredTennats(data.preferred_tennats);
      setFlatArea(data.flat_area);
      setLocality(data.locality);
      setRentAmount(data.rent_amount);
      setSecurityDeposit(data.security_deposit);
      setVerified(data.featured);
      setCity(data.city);
      setPincode(data.pincode);
      setAddress(data.address);
      setDistanceFromRailwayStation(data.distance_from_nearest_railway_station);
      setDistanceFromBusStop(data.distance_from_bus_stop);
      setDescription(data.description);
      return response.data;
    },
  });
  const mutation = useMutation({
    mutationKey: ['flat-update'],
    mutationFn: () => {
      return axios.put(
        `/api/v1/flats/update-flat?id=${id}`,
        {
          flatType,
          preferredTennats,
          flatArea,
          furnishedStatus,
          locality,
          rentAmount,
          securityDeposit,
          verified,
          city,
          ownerName,
          ownerEmail,
          ownerPhoneNumber,
          pincode,
          address,
          distanceFromRailwayStation,
          distanceFromBusStop,
          description,
        },
        { withCredentials: true }
      );
    },
    onSuccess(data) {
      toast.success(data.data.message);
      navigate('/dashboard/flats');
    },
    onError(error) {
      let message = error.response?.data?.message;
      toast.error(message);
    },
  });

  const handleSave = () => {
    mutation.mutate();
  };

  if (isLoading) return <Loader />;
  if (isError) return <ErrorComponent />;

  return (
    <div className='bg-white w-screen overflow-hidden shadow rounded-lg border'>
      <div className='px-4 py-5 sm:px-6'>
        <h3 className='text-lg leading-6 font-medium text-gray-900'>Flat Property Details</h3>
      </div>
      <div className='border-t border-gray-200 px-4 py-5 sm:p-0'>
        <dl className='sm:divide-y sm:divide-gray-200'>
          <div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Owner Name</dt>
            <dd className='mt-1 text-sm font-medium text-gray-700 sm:mt-0 sm:col-span-2 capitalize'>
              <input type='text' value={ownerName} onChange={(e) => setOwnerName(e.target.value)} />
            </dd>
          </div>
          <div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Owner Email</dt>
            <dd className='mt-1 text-sm font-medium text-gray-700 sm:mt-0 sm:col-span-2 capitalize'>
              <input
                type='text'
                value={ownerEmail}
                size={25}
                onChange={(e) => setOwnerEmail(e.target.value)}
              />
            </dd>
          </div>
          <div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Owner Phone Number</dt>
            <dd className='mt-1 text-sm font-medium text-gray-700 sm:mt-0 sm:col-span-2 capitalize'>
              <input
                type='number'
                value={ownerPhoneNumber}
                onChange={(e) => setOwnerPhoneNumber(e.target.value)}
              />
            </dd>
          </div>
          <div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Flat Type</dt>
            <dd className='mt-1 text-sm font-medium text-gray-700 sm:mt-0 sm:col-span-2 capitalize'>
              <input type='text' value={flatType} onChange={(e) => setFlatType(e.target.value)} />
            </dd>
          </div>
          <div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Preferred Tenants</dt>
            <dd className='mt-1 text-sm font-medium text-gray-700 sm:mt-0 sm:col-span-2'>
              <input
                type='text'
                value={preferredTennats}
                onChange={(e) => setPreferredTennats(e.target.value)}
              />
            </dd>
          </div>
          <div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Furnished Status</dt>
            <dd className='mt-1 text-sm font-medium text-gray-700 sm:mt-0 sm:col-span-2'>
              <input
                type='text'
                value={furnishedStatus}
                onChange={(e) => setFurnishedStatus(e.target.value)}
              />
            </dd>
          </div>
          <div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Locality</dt>
            <dd className='mt-1 text-sm font-medium text-gray-700 sm:mt-0 sm:col-span-2'>
              <input type='text' value={locality} onChange={(e) => setLocality(e.target.value)} />
            </dd>
          </div>
          <div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>City</dt>
            <dd className='mt-1 text-sm font-medium text-gray-700 sm:mt-0 sm:col-span-2'>
              <input type='text' value={city} onChange={(e) => setCity(e.target.value)} />
            </dd>
          </div>
          <div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Pincode</dt>
            <dd className='mt-1 text-sm font-medium text-gray-700 sm:mt-0 sm:col-span-2'>
              <input type='number' value={pincode} onChange={(e) => setPincode(e.target.value)} />
            </dd>
          </div>
          <div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Address</dt>
            <dd className='mt-1 text-sm font-medium text-gray-700 sm:mt-0 sm:col-span-2'>
              <input type='text' value={address} onChange={(e) => setAddress(e.target.value)} />
            </dd>
          </div>
          <div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Description</dt>
            <dd className='mt-1 text-sm font-medium text-gray-700 sm:mt-0 sm:col-span-2'>
              <input
                type='text'
                size={30}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </dd>
          </div>
          <div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Rent Amount</dt>
            <dd className='mt-1 text-sm font-medium flex gap-x-6 text-gray-700 sm:mt-0 sm:col-span-2'>
              <input
                type='number'
                value={rentAmount}
                onChange={(e) => setRentAmount(e.target.value)}
              />
            </dd>
          </div>
          <div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Security Deposit</dt>
            <dd className='mt-1 text-sm font-medium flex gap-x-6 text-gray-700 sm:mt-0 sm:col-span-2'>
              <input
                type='number'
                value={securityDeposit}
                onChange={(e) => setSecurityDeposit(e.target.value)}
              />
            </dd>
          </div>
          <div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Flat Area</dt>
            <dd className='mt-1 text-sm font-medium text-gray-700 sm:mt-0 sm:col-span-2'>
              <input type='text' value={flatArea} onChange={(e) => setFlatArea(e.target.value)} />
            </dd>
          </div>
          <div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Verified</dt>
            <dd className='mt-1 text-sm font-medium flex gap-x-6 text-gray-700 sm:mt-0 sm:col-span-2'>
              <div className='flex gap-x-2'>
                <label htmlFor='isVerified'>Yes</label>
                <input
                  type='radio'
                  value='Yes'
                  id='isVerified'
                  name='verified'
                  checked={verified === true}
                  onClick={(e) => (e.target.value === 'Yes' ? setVerified(true) : null)}
                />
              </div>
              <div className='flex gap-x-2'>
                <label htmlFor='notVerified'>No</label>
                <input
                  type='radio'
                  value='No'
                  id='notVerified'
                  name='verified'
                  checked={verified === false}
                  onClick={(e) => (e.target.value === 'No' ? setVerified(false) : null)}
                />
              </div>
            </dd>
          </div>
          <div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>
              Distance from nearest railway station
            </dt>
            <dd className='mt-1 text-sm font-medium flex gap-x-6 text-gray-700 sm:mt-0 sm:col-span-2'>
              <input
                type='number'
                value={distanceFromRailwayStation}
                onChange={(e) => setDistanceFromRailwayStation(e.target.value)}
              />
            </dd>
          </div>
          <div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Distance from nearest bus stop</dt>
            <dd className='mt-1 text-sm font-medium flex gap-x-6 text-gray-700 sm:mt-0 sm:col-span-2'>
              <input
                type='number'
                value={distanceFromBusStop}
                onChange={(e) => setDistanceFromBusStop(e.target.value)}
              />
            </dd>
          </div>
        </dl>
      </div>
      <div className='flex justify-start items-center ml-20 mb-2 mt-10'>
        <button
          className='btn-primary'
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditFlat;
