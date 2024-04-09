import { useState } from "react";
// import { toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/");
  }
  return (
    <>
      <section className="bg-[#F4F7FF] py-20 lg:py-[120px]">
        <div className="container mx-auto">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white py-16 px-10 text-center sm:px-12 md:px-[60px]">
              <div className="mb-10 text-center">
                <Link to="/" className="mx-auto inline-block max-w-[160px]">
                  <img
                    src="https://res.cloudinary.com/sarvesh-damle/image/upload/v1696435051/Buddies_MajorProject/logos/logo_black2_zrvewb.png"
                    alt="logo"
                  />
                </Link>
                <div className="pt-10 text-xl font-semibold">
                Reset Password
                </div>
              </div>
              <form action="/api/v1/reset-password" method="post">
                <InputBox
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <InputBox
                  type="password"
                  name="confirm-password"
                  placeholder="Confirm-Password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
                <div className="mb-10">
                  <button
                    className="w-full font-medium px-6 py-2 text-white border-none rounded-lg transition-all duration-200 ease-in hover:cursor-pointer transform hover:scale-105 bg-blue-gradient"
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResetPassword;

const InputBox = ({ type, placeholder, name, value, onChange }) => {
  return (
    <div className="mb-6">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
