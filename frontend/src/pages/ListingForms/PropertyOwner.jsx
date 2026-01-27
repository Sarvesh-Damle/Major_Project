import { useContext, useState } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import Hostels from './Hostels.jsx';
import PGs from './PGs.jsx';
import Flats from './Flats.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import { loginContext } from '@/provider/authContext.js';

const PropertyOwner = () => {
  const methods = useForm();
  const control = methods.control;
  const errors = methods.formState.errors;
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(loginContext);
  const mutation = useMutation({
    mutationKey: ['listing-property'],
    mutationFn: (formData) => {
      let url;
      if (showHostelsForm) {
        url = 'hostels/add-property';
      }
      if (showFlatsForm) {
        url = 'flats/add-property-flat';
      }
      if (showPGsForm) {
        url = 'pgs/add-property-pg';
      }
      return axios.post(`/api/v1/${url}`, formData, { withCredentials: true });
    },
    onSuccess(data) {
      navigate('/');
      toast.success(data.data.message);
    },
    onError(error) {
      let message = error.response?.data?.message;
      toast.error(message);
    },
  });

  const [showHostelsForm, setShowHostelsForm] = useState(false);
  const [showPGsForm, setShowPGsForm] = useState(false);
  const [showFlatsForm, setShowFlatsForm] = useState(false);

  const handleHostelsForm = () => {
    if (!isLoggedIn.login) {
      toast.error('Please login!!');
    } else {
      setShowHostelsForm(true);
      setShowFlatsForm(false);
      setShowPGsForm(false);
    }
  };
  const handleFlatsForm = () => {
    if (!isLoggedIn.login) {
      toast.error('Please login!!');
    } else {
      setShowFlatsForm(true);
      setShowHostelsForm(false);
      setShowPGsForm(false);
    }
  };
  const handlePGsForm = () => {
    if (!isLoggedIn.login) {
      toast.error('Please login!!');
    } else {
      setShowPGsForm(true);
      setShowFlatsForm(false);
      setShowHostelsForm(false);
    }
  };

  return (
    <>
      <div className='flex justify-center items-center font-medium text-xl mt-8'>
        Listing Property - For Property Owner
      </div>
      <div className='flex items-center justify-center h-auto'>
        <div className='flex flex-col sm:w-1/3 w-full'>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit((formData) => {
                mutation.mutate(formData);
              })}
              className='mt-4'
              encType='multipart/form-data'
            >
              <div className='space-y-5 m-4 p-5 shadow-md rounded-lg'>
                <div className='mb-6'>
                  <Controller
                    name='name'
                    defaultValue=''
                    control={control}
                    rules={{
                      required: 'Name is required',
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message: 'Name must contain only letters and spaces',
                      },
                    }}
                    render={({ field }) => (
                      <>
                        <label htmlFor='name'>Name: </label>
                        <input
                          {...field}
                          type='name'
                          placeholder='Enter your name...'
                          className='border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none'
                          autoComplete='name'
                        />
                        {errors.name && <p className='text-red-600'>{errors.name.message}</p>}
                      </>
                    )}
                  />
                </div>
                <div className='mb-6'>
                  <Controller
                    name='phoneNumber'
                    defaultValue=''
                    control={control}
                    rules={{
                      required: 'Phone Number is required',
                      minLength: {
                        value: 10,
                        message: 'Phone Number must be of 10 digits',
                      },
                      maxLength: {
                        value: 10,
                        message: 'Phone Number must be of 10 digits',
                      },
                    }}
                    render={({ field }) => (
                      <>
                        <label htmlFor='phoneNumber'>Phone Number: </label>
                        <input
                          {...field}
                          type='number'
                          placeholder='Enter your phone number...'
                          className='border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none'
                          autoComplete='tel'
                        />
                        {errors.phoneNumber && (
                          <p className='text-red-600'>{errors.phoneNumber.message}</p>
                        )}
                      </>
                    )}
                  />
                </div>
                <div className='mb-6'>
                  <Controller
                    name='email'
                    defaultValue=''
                    control={control}
                    rules={{
                      required: 'Email is required',
                      pattern: {
                        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                        message: 'Email address must be a valid address',
                      },
                    }}
                    render={({ field }) => (
                      <>
                        <label htmlFor='email'>Email: </label>
                        <input
                          {...field}
                          type='email'
                          placeholder='Enter your email...'
                          className='border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none'
                          autoComplete='email'
                        />
                        {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
                      </>
                    )}
                  />
                </div>
                <div className='flex gap-1.5'>
                  <label htmlFor='property-type'>Choose Property to list: </label>
                  <input
                    type='radio'
                    name='property-type'
                    id='property-type'
                    onClick={handleHostelsForm}
                  />
                  Hostels
                  <input
                    type='radio'
                    name='property-type'
                    id='property-type'
                    onClick={handleFlatsForm}
                  />
                  Flats
                  <input
                    type='radio'
                    name='property-type'
                    id='property-type'
                    onClick={handlePGsForm}
                  />
                  PGs
                </div>
                {(showHostelsForm || showFlatsForm || showPGsForm) && (
                  <div>
                    {showHostelsForm && <Hostels />}
                    {showPGsForm && <PGs />}
                    {showFlatsForm && <Flats />}
                    <div className='flex justify-center'>
                      <button
                        type='submit'
                        className='w-full btn-primary'
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  );
};

export default PropertyOwner;
