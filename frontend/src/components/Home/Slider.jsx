import { useState } from 'react';
import { getOptimizedUrl } from '@/utils/cloudinaryUrl.js';
import Lightbox from '@/components/ui/Lightbox.jsx';

const Slider = ({ images }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <div className='w-full h-[250px] sm:h-[350px] flex gap-3 sm:gap-5 slider'>
        <div className='w-full sm:w-3/4 bigImage'>
          <img
            src={getOptimizedUrl(images[0], { width: 800 })}
            alt='Property main image - click to enlarge'
            className='w-full h-full object-cover rounded-[10px] cursor-pointer hover:opacity-90 transition-opacity'
            loading='lazy'
            onClick={() => openLightbox(0)}
            role='button'
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(0);
              }
            }}
          />
        </div>
        <div className='hidden sm:flex w-1/4 flex-col justify-between gap-3 sm:gap-5 smallImages'>
          {images.slice(1).map((image, index) => (
            <img
              src={getOptimizedUrl(image, { width: 250 })}
              alt={`Property image ${index + 2} - click to enlarge`}
              key={index}
              className='w-full h-[100px] object-cover rounded-[10px] cursor-pointer hover:opacity-90 transition-opacity'
              loading='lazy'
              onClick={() => openLightbox(index + 1)}
              role='button'
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openLightbox(index + 1);
                }
              }}
            />
          ))}
        </div>
      </div>

      {lightboxOpen && (
        <Lightbox
          images={images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
};

export default Slider;
