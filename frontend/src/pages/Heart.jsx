import { useContext, useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { loginContext } from '@/provider/authContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Heart = ({ id, propertyTag }) => {
  const [liked, setLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn } = useContext(loginContext);

  const handleLike = async () => {
    if (!isLoggedIn.login) {
      toast.error('Please login to add favorites!', { position: 'bottom-right' });
      return;
    }

    if (isLoading) return;

    setIsLoading(true);
    try {
      if (!liked) {
        await axios.post(
          '/api/v1/favourites/add-favourites',
          { propertyId: id, propertyTag },
          { withCredentials: true }
        );
        setLiked(true);
        toast.success('Added to favorites!', { position: 'bottom-right' });
      } else {
        await axios.delete('/api/v1/favourites/delete-favourite', {
          data: { propertyId: id },
          withCredentials: true,
        });
        setLiked(false);
        toast.success('Removed from favorites!', { position: 'bottom-right' });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update favorites', {
        position: 'bottom-right',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AiFillHeart
      size={24}
      className='absolute top-[25px] right-[30px] z-[1] cursor-pointer transition-transform hover:scale-110'
      style={{
        color: liked ? '#fa3e5f' : 'white',
        opacity: isLoading ? 0.5 : 1,
      }}
      onClick={(e) => {
        e.stopPropagation();
        handleLike();
      }}
    />
  );
};

export default Heart;
