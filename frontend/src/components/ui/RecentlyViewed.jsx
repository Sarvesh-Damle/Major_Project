import { useNavigate } from 'react-router-dom';
import { IoClose, IoTimeOutline } from 'react-icons/io5';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed.js';
import { getOptimizedUrl } from '@/utils/cloudinaryUrl.js';

const RecentlyViewed = () => {
  const navigate = useNavigate();
  const { recentlyViewed, removeFromRecentlyViewed, clearRecentlyViewed } = useRecentlyViewed();

  if (recentlyViewed.length === 0) return null;

  const getPropertyUrl = (item) => {
    const typeMap = { hostel: 'hostels', pg: 'pgs', flat: 'flats' };
    return `/${typeMap[item.type]}/${item.id}`;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getTimeAgo = (timestamp) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-4'>
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center gap-2'>
          <IoTimeOutline size={20} className='text-gray-500' />
          <h3 className='font-semibold text-gray-800'>Recently Viewed</h3>
        </div>
        <button onClick={clearRecentlyViewed} className='text-sm text-gray-500 hover:text-gray-700 transition-colors'>
          Clear all
        </button>
      </div>

      <div className='space-y-3'>
        {recentlyViewed.slice(0, 5).map((item) => (
          <div
            key={`${item.type}-${item.id}`}
            className='flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer'
            onClick={() => navigate(getPropertyUrl(item))}
            role='button'
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate(getPropertyUrl(item));
              }
            }}
          >
            <div className='w-16 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100'>
              {item.image ? (
                <img
                  src={getOptimizedUrl(item.image, { width: 100 })}
                  alt={item.name}
                  className='w-full h-full object-cover'
                  loading='lazy'
                />
              ) : (
                <div className='w-full h-full flex items-center justify-center text-gray-400 text-xs'>No image</div>
              )}
            </div>

            <div className='flex-1 min-w-0'>
              <p className='font-medium text-gray-800 text-sm truncate'>{item.name}</p>
              <p className='text-xs text-gray-500 truncate'>{item.address}</p>
              <div className='flex items-center gap-2 mt-1'>
                <span className='text-xs font-semibold text-blue-600'>{formatPrice(item.rentAmount)}</span>
                <span className='text-xs text-gray-400'>{getTimeAgo(item.timestamp)}</span>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                removeFromRecentlyViewed(item.id, item.type);
              }}
              className='p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity'
              aria-label={`Remove ${item.name} from recently viewed`}
            >
              <IoClose size={16} />
            </button>
          </div>
        ))}
      </div>

      {recentlyViewed.length > 5 && (
        <p className='text-xs text-gray-400 text-center mt-3'>+{recentlyViewed.length - 5} more</p>
      )}
    </div>
  );
};

export default RecentlyViewed;
