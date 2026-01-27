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
      toast.error('Please sign in to add favourites');
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
        toast.success('Added to favourites');
      } else {
        await axios.delete('/api/v1/favourites/delete-favourite', {
          data: { propertyId },
          withCredentials: true,
        });
        setLiked(false);
        toast.success('Removed from favourites');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update favourites');
    } finally {
      setIsLoading(false);
    }
  };

  return { liked, isLoading, toggleFavorite };
};

export default useFavorite;
