import { getOptimizedUrl } from '@/utils/cloudinaryUrl.js';

const Testimonials = ({ testimonials }) => {
  return (
    <>
      <h1 className='primaryText max-md:text-2xl flex justify-center items-center mt-8 mb-3'>
        Testimonials
      </h1>
      <div className='p-6 w-full m-4 max-sm:m-0 h-auto overflow-hidden flex flex-wrap justify-center gap-8'>
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className='flex justify-center items-center gap-2 p-4 rounded-xl w-full sm:w-[430px] transition-all duration-300 ease-in hover:scale-105 hover:bg-gradient-to-b from-[#ffffff] to-[#eeeef7] shadow hover:shadow-lg'
          >
            <div className='flex flex-1 flex-col justify-between p-8'>
              <div className='mb-4 flex space-x-2'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                      className='h-6 w-6 text-yellow-500'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </span>
                ))}
              </div>
              <div className='flex-1 pt-2'>
                <blockquote>
                  <p className='text-lg text-gray-800'>&quot;{testimonial.text}&quot;</p>
                </blockquote>
              </div>

              <div className='mt-8 border-t border-gray-300 pt-4 dark:border-gray-800'>
                <div className='flex items-center'>
                  <img
                    className='h-10 w-10 flex-shrink-0 rounded-full object-cover'
                    src={getOptimizedUrl(testimonial.imageUrl, { width: 80 })}
                    alt='profile_photo'
                    loading='lazy'
                  />
                  <div className='ml-3 min-w-0'>
                    <p className='truncate text-base font-semibold text-gray-800'>
                      {testimonial.name}
                    </p>
                    <p className='truncate text-base text-gray-500'>{testimonial.city}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Testimonials;
