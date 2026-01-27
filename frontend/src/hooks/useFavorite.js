import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { loginContext } from '@/provider/authContext';

/**
 * Custom hook for managing favorites functionality
 * @param {string} propertyId - The ID of the property
 * @param {string} propertyTag - The type of property ('hostel', 'pg', 'flat')
 * @returns {{ liked: boolean, isLoading: boolean, toggleFavorite: () => Promise<void> }}
 */
const useFavorite = (propertyId, propertyTag) => {
  const [liked, setLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn } = useContext(loginContext);

  const toggleFavorite = async () => {
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
          { propertyId, propertyTag },
          { withCredentials: true }
        );
        setLiked(true);
        toast.success('Added to favorites!', { position: 'bottom-right' });
      } else {
        await axios.delete('/api/v1/favourites/delete-favourite', {
          data: { propertyId },
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

  return { liked, isLoading, toggleFavorite };
};

export default useFavorite;
