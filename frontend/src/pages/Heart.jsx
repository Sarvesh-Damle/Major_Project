import { AiFillHeart } from 'react-icons/ai';
import useFavorite from '@/hooks/useFavorite.js';

const Heart = ({ id, propertyTag }) => {
  const { liked, isLoading, toggleFavorite } = useFavorite(id, propertyTag);

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
        toggleFavorite();
      }}
    />
  );
};

export default Heart;
