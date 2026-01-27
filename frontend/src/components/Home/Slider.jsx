import { getOptimizedUrl } from '@/utils/cloudinaryUrl.js';

const Slider = ({ images }) => {
  return (
    <div className='w-full h-[250px] sm:h-[350px] flex gap-3 sm:gap-5 slider'>
      <div className='w-full sm:w-3/4 bigImage'>
        <img
          src={getOptimizedUrl(images[0], { width: 800 })}
          alt='property_image'
          className='w-full h-full object-cover rounded-[10px] cursor-pointer'
          loading='lazy'
        />
      </div>
      <div className='hidden sm:flex w-1/4 flex-col justify-between gap-3 sm:gap-5 smallImages'>
        {images.slice(1).map((image, index) => (
          <img
            src={getOptimizedUrl(image, { width: 250 })}
            alt='property_image'
            key={index}
            className='w-full h-[100px] object-cover rounded-[10px] cursor-pointer'
            loading='lazy'
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
