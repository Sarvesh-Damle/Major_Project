import { useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const StarRating = ({
  rating = 0,
  maxRating = 5,
  size = 20,
  interactive = false,
  onChange = () => {},
  showValue = false,
  className = '',
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const displayRating = interactive && hoverRating > 0 ? hoverRating : rating;

  const handleClick = (value) => {
    if (interactive) {
      onChange(value);
    }
  };

  const handleMouseEnter = (value) => {
    if (interactive) {
      setHoverRating(value);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(0);
    }
  };

  const handleKeyDown = (e, value) => {
    if (interactive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onChange(value);
    }
  };

  const renderStar = (index) => {
    const value = index + 1;
    const filled = displayRating >= value;
    const halfFilled = !filled && displayRating >= value - 0.5;

    const starProps = interactive
      ? {
          onClick: () => handleClick(value),
          onMouseEnter: () => handleMouseEnter(value),
          onMouseLeave: handleMouseLeave,
          onKeyDown: (e) => handleKeyDown(e, value),
          tabIndex: 0,
          role: 'button',
          'aria-label': `Rate ${value} out of ${maxRating} stars`,
          className:
            'cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded',
        }
      : {};

    let StarIcon;
    if (filled) {
      StarIcon = FaStar;
    } else if (halfFilled) {
      StarIcon = FaStarHalfAlt;
    } else {
      StarIcon = FaRegStar;
    }

    return (
      <span key={index} {...starProps}>
        <StarIcon
          size={size}
          className={`${filled || halfFilled ? 'text-yellow-400' : 'text-gray-300'} ${
            interactive ? 'hover:text-yellow-500 transition-colors' : ''
          }`}
        />
      </span>
    );
  };

  return (
    <div
      className={`inline-flex items-center gap-0.5 ${className}`}
      role={interactive ? 'group' : 'img'}
      aria-label={interactive ? 'Rating selector' : `Rating: ${rating} out of ${maxRating} stars`}
    >
      {Array.from({ length: maxRating }, (_, i) => renderStar(i))}
      {showValue && (
        <span className='ml-2 text-sm text-gray-600 font-medium'>{rating.toFixed(1)}</span>
      )}
    </div>
  );
};

export default StarRating;
