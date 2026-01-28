import { useEffect, useState, useCallback } from 'react';

const STORAGE_KEY = 'recentlyViewed';
const MAX_ITEMS = 10;

export const useRecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setRecentlyViewed(JSON.parse(stored));
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const addToRecentlyViewed = useCallback((property) => {
    if (!property || !property.id) return;

    setRecentlyViewed((prev) => {
      const filtered = prev.filter(
        (item) => !(item.id === property.id && item.type === property.type)
      );
      const updated = [
        {
          id: property.id,
          type: property.type,
          name: property.name,
          address: property.address,
          image: property.image,
          rentAmount: property.rentAmount,
          timestamp: Date.now(),
        },
        ...filtered,
      ].slice(0, MAX_ITEMS);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearRecentlyViewed = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setRecentlyViewed([]);
  }, []);

  const removeFromRecentlyViewed = useCallback((id, type) => {
    setRecentlyViewed((prev) => {
      const updated = prev.filter((item) => !(item.id === id && item.type === type));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return {
    recentlyViewed,
    addToRecentlyViewed,
    clearRecentlyViewed,
    removeFromRecentlyViewed,
  };
};

export const useTrackPropertyView = (property, type) => {
  const { addToRecentlyViewed } = useRecentlyViewed();

  useEffect(() => {
    if (property && property._id) {
      const name =
        type === 'hostel'
          ? property.hostel_name
          : type === 'pg'
            ? property.pg_name
            : `${property.flat_type} Flat`;

      addToRecentlyViewed({
        id: property._id,
        type,
        name,
        address: property.address,
        image: property.property_photos?.[0],
        rentAmount: property.rent_amount,
      });
    }
  }, [property, type, addToRecentlyViewed]);
};

export default useRecentlyViewed;
