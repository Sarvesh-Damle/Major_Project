import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { loginContext } from '@/provider/authContext';
import { useCreateReview } from '@/hooks/useReviews';
import StarRating from './StarRating';

const ReviewForm = ({ propertyId, propertyType, onSuccess }) => {
  const { isLoggedIn } = useContext(loginContext);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const createReview = useCreateReview();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn.login) {
      toast.error('Please sign in to submit a review');
      return;
    }

    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    if (comment.trim().length < 10) {
      toast.error('Comment must be at least 10 characters');
      return;
    }

    try {
      await createReview.mutateAsync({
        propertyId,
        propertyType,
        rating,
        comment: comment.trim(),
      });
      toast.success('Review submitted successfully');
      setRating(0);
      setComment('');
      onSuccess?.();
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to submit review';
      toast.error(message);
    }
  };

  if (!isLoggedIn.login) {
    return (
      <div className='bg-gray-50 rounded-lg p-6 text-center'>
        <p className='text-gray-600'>
          Please{' '}
          <a href='/signin' className='text-blue-600 hover:underline font-medium'>
            sign in
          </a>{' '}
          to leave a review.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className='bg-gray-50 rounded-lg p-6'>
      <h3 className='text-lg font-semibold text-gray-900 mb-4'>Write a Review</h3>

      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700 mb-2'>
          Your Rating
        </label>
        <StarRating
          rating={rating}
          interactive={true}
          onChange={setRating}
          size={28}
        />
      </div>

      <div className='mb-4'>
        <label htmlFor='review-comment' className='block text-sm font-medium text-gray-700 mb-2'>
          Your Review
        </label>
        <textarea
          id='review-comment'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder='Share your experience with this property...'
          rows={4}
          maxLength={500}
          className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none'
        />
        <p className='text-xs text-gray-500 mt-1 text-right'>
          {comment.length}/500 characters
        </p>
      </div>

      <button
        type='submit'
        disabled={createReview.isPending}
        className='w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
      >
        {createReview.isPending ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
};

export default ReviewForm;
