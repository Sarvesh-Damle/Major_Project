import { Navigate } from 'react-router-dom';
import Navbar from './Home/Navbar';
import Sidebar from './Home/Sidebar';
import useAuth from '@/hooks/useAuth';
import Loader from '@/pages/Loader';

const ProtectedRoute = ({ children }) => {
  const { isLoading, isAuthenticated, isAdmin } = useAuth();

  // Show loading while checking auth status
  if (isLoading) {
    return (
      <div className='flex h-screen w-screen justify-center items-center'>
        <Loader />
      </div>
    );
  }

  // Redirect to signin if not authenticated
  if (!isAuthenticated) {
    return <Navigate to='/signin' replace />;
  }

  // Redirect to home if authenticated but not admin
  if (!isAdmin) {
    return <Navigate to='/' replace />;
  }

  // Render protected content for authenticated admins
  return (
    <>
      <Navbar />
      <div className='flex w-full bg-[#edf2f4] opacity-80'>
        <Sidebar />
        {children}
      </div>
    </>
  );
};

export default ProtectedRoute;
