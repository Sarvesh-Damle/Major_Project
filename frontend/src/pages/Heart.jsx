import { AiFillHeart } from 'react-icons/ai';
import useFavorite from '@/hooks/useFavorite.js';

const Heart = ({ id, propertyTag }) => {
  const { liked, isLoading, toggleFavorite } = useFavorite(id, propertyTag);

  return (
    <button
      className='absolute top-[25px] right-[30px] z-[1] cursor-pointer bg-transparent border-none p-0 transition-transform hover:scale-110'
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite();
      }}
      aria-label={liked ? 'Remove from favorites' : 'Add to favorites'}
      disabled={isLoading}
    >
      <AiFillHeart
        size={24}
        style={{
          color: liked ? '#fa3e5f' : 'white',
          opacity: isLoading ? 0.5 : 1,
        }}
      />
    </button>
  );
};

export default Heart;
