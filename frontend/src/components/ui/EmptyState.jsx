import { HiOutlineSearch, HiOutlineHeart, HiOutlineHome, HiOutlineInbox } from 'react-icons/hi';

const icons = {
  search: HiOutlineSearch,
  favorites: HiOutlineHeart,
  properties: HiOutlineHome,
  default: HiOutlineInbox,
};

const EmptyState = ({
  icon = 'default',
  title = 'Nothing here yet',
  message = '',
  actionLabel,
  onAction,
}) => {
  const IconComponent = icons[icon] || icons.default;

  return (
    <div className='flex flex-col items-center justify-center py-16 px-4 w-full'>
      <div className='bg-gray-100 rounded-full p-5 mb-4'>
        <IconComponent className='w-10 h-10 text-gray-400' />
      </div>
      <h3 className='text-lg font-semibold text-gray-700 mb-1'>{title}</h3>
      {message && <p className='text-sm text-gray-500 text-center max-w-sm'>{message}</p>}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className='mt-4 px-5 py-2 text-sm font-medium text-white rounded-lg bg-blue-gradient transition-all duration-200 hover:scale-105'
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
