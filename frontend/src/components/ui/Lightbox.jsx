import { useState, useEffect, useCallback } from 'react';
import { IoClose, IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { getOptimizedUrl } from '@/utils/cloudinaryUrl.js';

const Lightbox = ({ images, initialIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, goToPrevious, goToNext]);

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/90'
      onClick={onClose}
      role='dialog'
      aria-modal='true'
      aria-label='Image gallery'
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className='absolute top-4 right-4 p-2 text-white bg-black/50 rounded-full hover:bg-black/70 transition-colors z-10'
        aria-label='Close gallery'
      >
        <IoClose size={28} />
      </button>

      {/* Previous button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToPrevious();
          }}
          className='absolute left-4 p-3 text-white bg-black/50 rounded-full hover:bg-black/70 transition-colors z-10'
          aria-label='Previous image'
        >
          <IoChevronBack size={28} />
        </button>
      )}

      {/* Main image */}
      <div
        className='max-w-[90vw] max-h-[85vh] flex items-center justify-center'
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={getOptimizedUrl(images[currentIndex], { width: 1200 })}
          alt={`Property image ${currentIndex + 1} of ${images.length}`}
          className='max-w-full max-h-[85vh] object-contain rounded-lg'
        />
      </div>

      {/* Next button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
          className='absolute right-4 p-3 text-white bg-black/50 rounded-full hover:bg-black/70 transition-colors z-10'
          aria-label='Next image'
        >
          <IoChevronForward size={28} />
        </button>
      )}

      {/* Image counter */}
      <div className='absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 text-white rounded-full text-sm'>
        {currentIndex + 1} / {images.length}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className='absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto p-2'>
          {images.map((image, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              className={`flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-all ${
                index === currentIndex
                  ? 'border-white opacity-100'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <img
                src={getOptimizedUrl(image, { width: 100 })}
                alt={`Thumbnail ${index + 1}`}
                className='w-full h-full object-cover'
                loading='lazy'
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Lightbox;
