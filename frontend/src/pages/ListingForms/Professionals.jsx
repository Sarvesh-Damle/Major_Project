import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Input from './Input';

const Professionals = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState('');
  const [companyCloser, setCompanyCloser] = useState(false);
  const [phoneNumEntered, setPhoneNumEntered] = useState(false);
  const [tiffins, setTiffins] = useState(false);
  const navigate = useNavigate();

  const login = async () => {
    setError('');
    try {
      navigate('/');
    } catch {
      setError('An error occurred while logging in. Please try again.');
    }
  };

  const handleClickCompanyCloser = () => {
    setCompanyCloser(true);
  };
  const handleClickCompanyNotCloser = () => {
    setCompanyCloser(false);
  };
  const handlePhoneClick = () => {
    setPhoneNumEntered(true);
  };
  const handleClickTiffins = () => {
    setTiffins(true);
  };
  const handleClickNotTiffins = () => {
    setTiffins(false);
  };

  return (
    <>
      <div className='flex justify-center items-center font-medium text-xl mt-4'>
        Listing Property - For Professionals
      </div>
      <div className='flex items-center justify-center h-auto'>
        <div className='flex flex-col sm:w-1/3 w-full'>
          {error && <p className='text-red-600 mt-4 text-center'>{error}</p>}
          <form onSubmit={handleSubmit(login)} className='mt-4'>
            <div className='space-y-5 m-4 p-5 shadow-md rounded-lg'>
              <Input
                label='Name: '
                placeholder='Enter your name...'
                type='text'
                // autoComplete='username'
                // {...register("name", {
                //   required: "Name is required",
                //   pattern: {
                //     value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                //     message: "Name must be a valid name"
                //   }
                // })}
              />
              {errors.name && <p className='text-red-600'>{errors.name.message}</p>}
              <Input
                label='Phone Number: '
                type='number'
                placeholder='Enter your phone number...'
                onClick={handlePhoneClick}
                // autoComplete='current-password'
                {...register('phone', {
                  required: 'Phone Number is required',
                  minLength: {
                    value: 10,
                    message: 'Phone Number must be of 10 digits',
                  },
                  maxLength: {
                    value: 10,
                    message: 'Phone Number must be of 10 digits',
                  },
                })}
              />
              {errors.phone && <p className='text-red-600'>{errors.phone.message}</p>}
              {phoneNumEntered ? (
                <Input
                  label='OTP: '
                  type='number'
                  placeholder='Enter OTP...'
                  // autoComplete='current-password'
                  {...register('otp', {
                    required: 'Phone Number is required',
                    minLength: {
                      value: 4,
                      message: 'OTP must be of 4 digits',
                    },
                    maxLength: {
                      value: 4,
                      message: 'OTP must be of 4 digits',
                    },
                  })}
                />
              ) : null}
              {errors.otp && <p className='text-red-600'>{errors.otp.message}</p>}
              {/* <Input
                label='Email: '
                placeholder='Enter your email...'
                type='email'
                autoComplete='username'
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Email address must be a valid address"
                  }
                })}
              /> */}
              {/* {errors.email && <p className='text-red-600'>{errors.email.message}</p>} */}
              <div>
                <label htmlFor='Company'>Is this property closer to your company? </label>
                <label htmlFor='Yes'>Yes</label>
                <input type='radio' required name='Company' onClick={handleClickCompanyCloser} />
                <label htmlFor='No'>No</label>
                <input type='radio' required name='Company' onClick={handleClickCompanyNotCloser} />
              </div>
              {companyCloser ? (
                <Input
                  label='Company Name: '
                  placeholder='Enter your Company Name...'
                  type='text'
                  autoComplete='username'
                  {...register('company', {
                    required: 'Company name is required',
                    pattern: {
                      value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                      message: 'Email address must be a valid address',
                    },
                  })}
                />
              ) : null}
              {errors.company && <p className='text-red-600'>{errors.company.message}</p>}
              {companyCloser ? (
                <Input label='Property Distance from company in minutes' type='number' />
              ) : null}
              <Input
                label="Property Owner's Name: "
                placeholder="Enter Owner's Name..."
                type='text'
                // autoComplete='username'
                // {...register("owner", {
                //   required: "Owner Name is required",
                //   pattern: {
                //     value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                //     message: "Email address must be a valid address"
                //   }
                // })}
              />
              {/* {errors.email && <p className='text-red-600'>{errors.email.message}</p>} */}
              <Input
                label="Owner's Phone Number: "
                type='number'
                placeholder="Enter Owner's phone number..."
                // autoComplete='current-password'
                {...register('ownerPhone', {
                  required: "Owner's Phone Number is required",
                  minLength: {
                    value: 10,
                    message: 'Phone Number must be of 10 digits',
                  },
                  maxLength: {
                    value: 10,
                    message: 'Phone Number must be of 10 digits',
                  },
                })}
              />
              {errors.ownerPhone && <p className='text-red-600'>{errors.ownerPhone.message}</p>}
              <div>
                <label htmlFor='College'>
                  Do you have any tiffin services phone number, that you recommend?{' '}
                </label>
                <label htmlFor='Yes'>Yes</label>
                <input type='radio' required name='Tiffins' onClick={handleClickTiffins} />
                <label htmlFor='No'>No</label>
                <input type='radio' required name='Tiffins' onClick={handleClickNotTiffins} />
              </div>
              {tiffins ? (
                <Input
                  label='Tiffin Services Phone Number'
                  type='number'
                  {...register('tiffinPhone', {
                    required: 'Tiffin Services Phone Number is required',
                    minLength: {
                      value: 10,
                      message: 'Phone Number must be of 10 digits',
                    },
                    maxLength: {
                      value: 10,
                      message: 'Phone Number must be of 10 digits',
                    },
                  })}
                />
              ) : null}
              {errors.tiffinPhone && <p className='text-red-600'>{errors.tiffinPhone.message}</p>}
              <div className='flex justify-center'>
                <button type='submit' className='w-full btn-primary'>
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Professionals;
