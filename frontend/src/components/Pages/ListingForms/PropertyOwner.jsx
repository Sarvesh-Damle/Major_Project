import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Input from './Input';
import Button from './Button';

const PropertyOwner = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");
  const [phoneNumEntered, setPhoneNumEntered] = useState(false);
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
  const handlePhoneClick = () => {
    setPhoneNumEntered(true);
  }

  return (
    <>
      <div className='flex justify-center items-center font-medium text-xl mt-4'>Listing Property - For Property Owner</div>
      <div className='flex items-center justify-center h-auto'>
        <div className='flex flex-col sm:w-1/3 w-full'>
          {error && <p className='text-red-600 mt-4 text-center'>{error}</p>}
          <form onSubmit={handleSubmit(login)} className='mt-4' action='/api/v1/--' method='post' encType='multipart/form-data'>
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
              <Input
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
              />
              {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
              <input type="file" name="propertyImage" accept="image/*" />
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

export default PropertyOwner;