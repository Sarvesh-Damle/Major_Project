import { useLocation } from 'react-router-dom';
import Loader from '@/pages/Loader';
import ErrorComponent from '@/pages/ErrorComponent';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

const EditUser = () => {
  const { pathname } = useLocation();
  const id = pathname.split('/').slice(-1)[0];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [admin, setAdmin] = useState(false);
  const { isLoading, isError, refetch } = useQuery({
    queryKey: ['User'],
    queryFn: async () => {
      const response = await axios.get(`/api/v1/users/get-user-info?id=${id}`, {
        withCredentials: true,
      });
      let data = response.data;
      setName(data.name);
      setEmail(data.email);
      setPhoneNumber(data.phoneNumber);
      setAdmin(data.isAdmin);
      return response.data;
    },
  });
  const mutation = useMutation({
    mutationKey: ['user-update'],
    mutationFn: () => {
      return axios.put(
        `/api/v1/users/update-user?id=${id}`,
        { name, email, admin, phoneNumber },
        { withCredentials: true }
      );
    },
    onSuccess(data) {
      toast.success(data.data.message);
      refetch();
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
        <h3 className='text-lg leading-6 font-medium text-gray-900'>User Profile</h3>
      </div>
      <div className='border-t border-gray-200 px-4 py-5 sm:p-0'>
        <dl className='sm:divide-y sm:divide-gray-200'>
          <div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Name</dt>
            <dd className='mt-1 text-sm font-medium text-gray-700 sm:mt-0 sm:col-span-2 capitalize'>
              <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
            </dd>
          </div>
          <div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Email address</dt>
            <dd className='mt-1 text-sm font-medium text-gray-700 sm:mt-0 sm:col-span-2'>
              <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </dd>
          </div>
          <div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Phone number</dt>
            <dd className='mt-1 text-sm font-medium text-gray-700 sm:mt-0 sm:col-span-2'>
              (+91){' '}
              <input
                type='number'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </dd>
          </div>
          <div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Is Admin</dt>
            <dd className='mt-1 text-sm font-medium flex gap-x-6 text-gray-700 sm:mt-0 sm:col-span-2'>
              <div className='flex gap-x-2'>
                <label htmlFor='isAdmin'>Yes</label>
                <input
                  type='radio'
                  value='Yes'
                  id='isAdmin'
                  name='admin'
                  checked={admin === true}
                  onClick={(e) => (e.target.value === 'Yes' ? setAdmin(true) : null)}
                />
              </div>
              <div className='flex gap-x-2'>
                <label htmlFor='notAdmin'>No</label>
                <input
                  type='radio'
                  value='No'
                  id='notAdmin'
                  name='admin'
                  checked={admin === false}
                  onClick={(e) => (e.target.value === 'No' ? setAdmin(false) : null)}
                />
              </div>
            </dd>
          </div>
        </dl>
      </div>
      <div className='flex justify-start items-center ml-20 mb-2 mt-10'>
        <button className='btn-primary' onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditUser;
