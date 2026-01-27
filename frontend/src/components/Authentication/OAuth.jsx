import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../../firebase';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { loginContext } from '../../provider/authContext';

const OAuth = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(loginContext);
  const handleGoogleClick = async () => {
    if (!app) {
      toast.error('Google sign-in is not configured');
      return;
    }
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const res = await axios.post('/api/v1/auth/google', {
        name: result.user.displayName,
        email: result.user.email,
      });
      toast.success(res.data.message);
      setIsLoggedIn({ login: true, signup: false });
      navigate('/');
    } catch (error) {
      toast.error('Could not sign in with Google');
      if (import.meta.env.DEV) {
        console.error('Google sign-in error:', error);
      }
    }
  };
  return (
    <button
      type='button'
      onClick={handleGoogleClick}
      className='bg-red-500 hover:bg-red-700 text-white p-3 rounded-lg uppercase w-full flex gap-x-8 justify-center items-center transition-all duration-200 ease-in hover:cursor-pointer transform hover:scale-95'
    >
      <svg
        width='18'
        height='18'
        viewBox='0 0 18 18'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M17.8477 8.17132H9.29628V10.643H15.4342C15.1065 14.0743 12.2461 15.5574 9.47506 15.5574C5.95916 15.5574 2.8306 12.8821 2.8306 9.01461C2.8306 5.29251 5.81018 2.47185 9.47506 2.47185C12.2759 2.47185 13.9742 4.24567 13.9742 4.24567L15.7024 2.47185C15.7024 2.47185 13.3783 0.000145544 9.35587 0.000145544C4.05223 -0.0289334 0 4.30383 0 8.98553C0 13.5218 3.81386 18 9.44526 18C14.4212 18 17.9967 14.7141 17.9967 9.79974C18.0264 8.78198 17.8477 8.17132 17.8477 8.17132Z'
          fill='white'
        />
      </svg>
      Connect with Google
    </button>
  );
};

export default OAuth;
