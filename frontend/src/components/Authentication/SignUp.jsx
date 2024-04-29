import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { loginContext } from "../../provider/authContext";
import { useContext } from "react";
import OAuth from "./OAuth";


const SignUp = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const navigate = useHistory();
  const {setIsLoggedIn}=useContext(loginContext);

  const mutation = useMutation({
    mutationKey: ['register'],
    mutationFn: (formData) => { return axios.post("/api/v1/auth/register", formData, { withCredentials: true }) },
    onSuccess(data) {
      setIsLoggedIn({login: false, signup: true});
      navigate.push("/signin")
      toast.success(data.data.message, {position: "bottom-right"})
    },
    onError(error) {
      let message = error.response?.data?.message;
      toast.error(message);
    }
  })

  return (
    <>
      <section className="bg-[#F4F7FF] py-20 lg:py-[120px]">
        <div className="container mx-auto">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white py-16 px-10 text-center sm:px-12 md:px-[60px]">
              <div className="mb-10 text-center md:mb-16">
                <Link to="/" className="mx-auto inline-block max-w-[160px]">
                  <img
                    src="https://res.cloudinary.com/sarvesh-damle/image/upload/v1696435051/Buddies_MajorProject/logos/logo_black2_zrvewb.png"
                    alt="logo"
                  />
                </Link>
              </div>
              <form onSubmit={handleSubmit(formData => mutation.mutate(formData))}>
                <div className="mb-6">
                  <Controller
                    name="name"
                    defaultValue=""
                    control={control}
                    rules={{
                      required: "Name is required",
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message: "Name must contain only letters and spaces"
                      }
                    }}
                    render={({ field }) => (
                      <>
                        <input {...field} type="text" placeholder="Enter your name..." className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none" autoComplete="name" />
                        {errors.name && <p className='text-red-600'>{errors.name.message}</p>}
                      </>
                    )}
                  />
                </div>
                <div className="mb-6">
                  <Controller
                    name="email"
                    defaultValue=""
                    control={control}
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                        message: "Email address must be a valid address"
                      }
                    }}
                    render={({ field }) => (
                      <>
                        <input {...field} type="email" placeholder="Enter your email..." className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none" autoComplete="email" />
                        {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
                      </>
                    )}
                  />
                </div>
                <div className="mb-6">
                  <Controller
                    name="phoneNumber"
                    defaultValue=""
                    control={control}
                    rules={{
                      required: "Phone Number is required",
                      minLength: {
                        value: 10,
                        message: "Phone Number must be of 10 digits"
                      },
                      maxLength: {
                        value: 10,
                        message: "Phone Number must be of 10 digits"
                      }
                    }}
                    render={({ field }) => (
                      <>
                        <input {...field} type="number" placeholder="Enter your phone number..." className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none" autoComplete="tel" />
                        {errors.phoneNumber && <p className='text-red-600'>{errors.phoneNumber.message}</p>}
                      </>
                    )}
                  />
                </div>
                <div className="mb-6">
                  <Controller
                    name="password"
                    defaultValue=""
                    control={control}
                    rules={{
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be atleast 8 characters long"
                      }
                    }}
                    render={({ field }) => (
                      <>
                        <input {...field} type="password" placeholder="Enter your password..." className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none" autoComplete="current-password" />
                        {errors.password && <p className='text-red-600'>{errors.password.message}</p>}
                      </>
                    )}
                  />
                </div>

                <div className="mb-10 mt-5">
                  <button
                    className="w-full font-medium px-6 py-2 text-white border-none rounded-lg transition-all duration-200 ease-in hover:cursor-pointer transform hover:scale-95 bg-blue-gradient"
                    type="submit"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
              <div className="mb-4">
              <OAuth/>
              </div>
              <div>
                <span className="absolute top-1 right-1">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="1.39737"
                      cy="38.6026"
                      r="1.39737"
                      transform="rotate(-90 1.39737 38.6026)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.39737"
                      cy="1.99122"
                      r="1.39737"
                      transform="rotate(-90 1.39737 1.99122)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="13.6943"
                      cy="38.6026"
                      r="1.39737"
                      transform="rotate(-90 13.6943 38.6026)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="13.6943"
                      cy="1.99122"
                      r="1.39737"
                      transform="rotate(-90 13.6943 1.99122)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="25.9911"
                      cy="38.6026"
                      r="1.39737"
                      transform="rotate(-90 25.9911 38.6026)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="25.9911"
                      cy="1.99122"
                      r="1.39737"
                      transform="rotate(-90 25.9911 1.99122)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="38.288"
                      cy="38.6026"
                      r="1.39737"
                      transform="rotate(-90 38.288 38.6026)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="38.288"
                      cy="1.99122"
                      r="1.39737"
                      transform="rotate(-90 38.288 1.99122)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.39737"
                      cy="26.3057"
                      r="1.39737"
                      transform="rotate(-90 1.39737 26.3057)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="13.6943"
                      cy="26.3057"
                      r="1.39737"
                      transform="rotate(-90 13.6943 26.3057)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="25.9911"
                      cy="26.3057"
                      r="1.39737"
                      transform="rotate(-90 25.9911 26.3057)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="38.288"
                      cy="26.3057"
                      r="1.39737"
                      transform="rotate(-90 38.288 26.3057)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.39737"
                      cy="14.0086"
                      r="1.39737"
                      transform="rotate(-90 1.39737 14.0086)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="13.6943"
                      cy="14.0086"
                      r="1.39737"
                      transform="rotate(-90 13.6943 14.0086)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="25.9911"
                      cy="14.0086"
                      r="1.39737"
                      transform="rotate(-90 25.9911 14.0086)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="38.288"
                      cy="14.0086"
                      r="1.39737"
                      transform="rotate(-90 38.288 14.0086)"
                      fill="#3056D3"
                    />
                  </svg>
                </span>
                <span className="absolute left-1 bottom-1">
                  <svg
                    width="29"
                    height="40"
                    viewBox="0 0 29 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="2.288"
                      cy="25.9912"
                      r="1.39737"
                      transform="rotate(-90 2.288 25.9912)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="14.5849"
                      cy="25.9911"
                      r="1.39737"
                      transform="rotate(-90 14.5849 25.9911)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="26.7216"
                      cy="25.9911"
                      r="1.39737"
                      transform="rotate(-90 26.7216 25.9911)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="2.288"
                      cy="13.6944"
                      r="1.39737"
                      transform="rotate(-90 2.288 13.6944)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="14.5849"
                      cy="13.6943"
                      r="1.39737"
                      transform="rotate(-90 14.5849 13.6943)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="26.7216"
                      cy="13.6943"
                      r="1.39737"
                      transform="rotate(-90 26.7216 13.6943)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="2.288"
                      cy="38.0087"
                      r="1.39737"
                      transform="rotate(-90 2.288 38.0087)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="2.288"
                      cy="1.39739"
                      r="1.39737"
                      transform="rotate(-90 2.288 1.39739)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="14.5849"
                      cy="38.0089"
                      r="1.39737"
                      transform="rotate(-90 14.5849 38.0089)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="26.7216"
                      cy="38.0089"
                      r="1.39737"
                      transform="rotate(-90 26.7216 38.0089)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="14.5849"
                      cy="1.39761"
                      r="1.39737"
                      transform="rotate(-90 14.5849 1.39761)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="26.7216"
                      cy="1.39761"
                      r="1.39737"
                      transform="rotate(-90 26.7216 1.39761)"
                      fill="#3056D3"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;

// const InputBox = ({ type, placeholder, name }) => {
//   return (
//     <div className="mb-6">
//       <input
//         type={type}
//         placeholder={placeholder}
//         name={name}
//         required
//         className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
//       />
//     </div>
//   );
// };
