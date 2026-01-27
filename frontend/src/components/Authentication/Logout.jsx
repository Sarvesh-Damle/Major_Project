import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await fetch('/api/v1/logout', {
        method: 'POST',
        credentials: 'include',
      });
      navigate('/');
    } catch (error) {
      toast.error('Logout failed');
      if (import.meta.env.DEV) {
        console.error('Logout error:', error);
      }
    }
  };

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Logout;
