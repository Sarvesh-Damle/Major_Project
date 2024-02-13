import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Input from './Input';
import Button from './Button';

const Students = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");
  const [collegeCloser, setCollegeCloser] = useState(false);
  const [phoneNumEntered, setPhoneNumEntered] = useState(false);
  const [tiffins, setTiffins] = useState(false);
  const navigate = useNavigate();

  const login = async (data) => {
    setError("");
    try {
      // Your login logic here
      console.log(data);
      navigate("/");
    } catch (error) {
      setError("An error occurred while logging in. Please try again."); // General error message
    }
  }

  const handleClickCollegeCloser = () => {
    setCollegeCloser(true);
  }
  const handleClickCollegeNotCloser = () => {
    setCollegeCloser(false);
  }
  const handlePhoneClick = () => {
    setPhoneNumEntered(true);
  }
  const handleClickTiffins = () => {
    setTiffins(true);
  }
  const handleClickNotTiffins = () => {
    setTiffins(false);
  }

  return (
    <>
      <div className='flex justify-center items-center font-medium text-xl mt-4'>Listing Property - For Students</div>
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
                {...register("phone", {
                  required: "Phone Number is required",
                  minLength: {
                    value: 10,
                    message: "Phone Number must be of 10 digits"
                  },
                  maxLength: {
                    value: 10,
                    message: "Phone Number must be of 10 digits"
                  },
                })}
              />
              {errors.phone && <p className='text-red-600'>{errors.phone.message}</p>}
              {phoneNumEntered ? (<Input
                label='OTP: '
                type='number'
                placeholder='Enter OTP...'
                // autoComplete='current-password'
                {...register("otp", {
                  required: "Phone Number is required",
                  minLength: {
                    value: 4,
                    message: "OTP must be of 4 digits"
                  },
                  maxLength: {
                    value: 4,
                    message: "OTP must be of 4 digits"
                  },
                })}
              />) : null}
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
              <label htmlFor="College">Is this property closer to your college? </label>
              <label htmlFor="Yes">Yes</label>
              <input type="radio" required name='College' onClick={handleClickCollegeCloser} />
              <label htmlFor="No">No</label>
              <input type="radio" required name='College' onClick={handleClickCollegeNotCloser} />
              </div>
              {collegeCloser ? (<Input
                label='College Name: '
                placeholder='Enter your College Name...'
                type='text'
                autoComplete='username'
                {...register("college", {
                  required: "College name is required",
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Email address must be a valid address"
                  }
                })}
              />) : null}
              {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
              {collegeCloser ? (
                <Input
                  label='Property Distance from college in minutes'
                  type='number'
                />
              ) : null}
              <Input
                label='Property Owner&apos;s Name: '
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
                label='Owner&apos;s Phone Number: '
                type='number'
                placeholder="Enter Owner's phone number..."
                // autoComplete='current-password'
                {...register("ownerPhone", {
                  required: "Owner's Phone Number is required",
                  minLength: {
                    value: 10,
                    message: "Phone Number must be of 10 digits"
                  },
                  maxLength: {
                    value: 10,
                    message: "Phone Number must be of 10 digits"
                  },
                })}
              />
              {errors.ownerPhone && <p className='text-red-600'>{errors.ownerPhone.message}</p>}
              <div>
              <label htmlFor="College">Do you have any tiffin services phone number, that you recommend? </label>
              <label htmlFor="Yes">Yes</label>
              <input type="radio" required name='Tiffins' onClick={handleClickTiffins} />
              <label htmlFor="No">No</label>
              <input type="radio" required name='Tiffins' onClick={handleClickNotTiffins} />
              </div>
              {tiffins ? (
                <Input
                  label='Tiffin Services Phone Number'
                  type='number'
                  {...register("tiffinPhone", {
                    required: "Tiffin Services Phone Number is required",
                    minLength: {
                      value: 10,
                      message: "Phone Number must be of 10 digits"
                    },
                    maxLength: {
                      value: 10,
                      message: "Phone Number must be of 10 digits"
                    },
                  })}
                />
              ) : null}
              {errors.tiffinPhone && <p className='text-red-600'>{errors.tiffinPhone.message}</p>}
              <Button
                type='submit'
                className='w-full'
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Students;