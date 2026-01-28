import { useState } from 'react';
import { usePropertyReviews } from '@/hooks/useReviews';
import StarRating from './StarRating';
import ReviewForm from './ReviewForm';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const ReviewItem = ({ review }) => {
  return (
    <div className='border-b border-gray-200 pb-4 last:border-0 last:pb-0'>
      <div className='flex items-start justify-between mb-2'>
        <div>
          <p className='font-medium text-gray-900'>{review.userName}</p>
          <p className='text-xs text-gray-500'>{formatDate(review.createdAt)}</p>
        </div>
        <StarRating rating={review.rating} size={16} />
      </div>
      <p className='text-gray-700 text-sm leading-relaxed'>{review.comment}</p>
    </div>
  );
};

const ReviewStats = ({ stats }) => {
  if (!stats || stats.totalReviews === 0) return null;

  return (
    <div className='flex items-center gap-3 mb-6 p-4 bg-blue-50 rounded-lg'>
      <div className='text-3xl font-bold text-blue-600'>{stats.averageRating.toFixed(1)}</div>
      <div>
        <StarRating rating={stats.averageRating} size={20} />
        <p className='text-sm text-gray-600 mt-1'>
          Based on {stats.totalReviews} review{stats.totalReviews !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
};

const ReviewList = ({ propertyId, propertyType }) => {
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading, isError } = usePropertyReviews(propertyId, propertyType, {
    page,
    limit,
  });

  const reviews = data?.reviews || [];
  const stats = data?.stats || { averageRating: 0, totalReviews: 0 };
  const pagination = data?.pagination || { page: 1, totalPages: 1 };

  if (isLoading) {
    return (
      <div className='space-y-4'>
        {[1, 2, 3].map((i) => (
          <div key={i} className='animate-pulse'>
            <div className='flex items-center gap-3 mb-2'>
              <div className='h-4 w-24 bg-gray-200 rounded' />
              <div className='h-4 w-20 bg-gray-200 rounded' />
            </div>
            <div className='h-16 bg-gray-200 rounded' />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p className='text-gray-500 text-center py-4'>
        Unable to load reviews. Please try again later.
      </p>
    );
  }

  return (
    <section className='mt-8'>
      <h2 className='text-2xl font-bold text-gray-900 mb-6'>Reviews & Ratings</h2>

      <ReviewStats stats={stats} />

      <ReviewForm
        propertyId={propertyId}
        propertyType={propertyType}
        onSuccess={() => setPage(1)}
      />

      <div className='mt-8'>
        {reviews.length === 0 ? (
          <p className='text-gray-500 text-center py-8'>
            No reviews yet. Be the first to share your experience!
          </p>
        ) : (
          <>
            <div className='space-y-4'>
              {reviews.map((review) => (
                <ReviewItem key={review._id} review={review} />
              ))}
            </div>

            {pagination.totalPages > 1 && (
              <div className='flex justify-center items-center gap-2 mt-6'>
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className='px-3 py-1.5 text-sm border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                  aria-label='Previous page'
                >
                  Previous
                </button>
                <span className='text-sm text-gray-600'>
                  Page {page} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                  disabled={page === pagination.totalPages}
                  className='px-3 py-1.5 text-sm border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                  aria-label='Next page'
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ReviewList;
