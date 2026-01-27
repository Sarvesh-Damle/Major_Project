const CardSkeleton = () => {
  return (
    <div className='flex flex-col w-72 gap-2 p-4 rounded-xl max-w-max animate-pulse'>
      <div className='w-60 h-40 rounded-[10px] bg-gray-200' />
      <div className='h-5 w-24 bg-gray-200 rounded mt-1' />
      <div className='h-6 w-40 bg-gray-200 rounded' />
      <div className='h-4 w-full bg-gray-200 rounded' />
      <div className='h-4 w-32 bg-gray-200 rounded' />
    </div>
  );
};

const CardSkeletonGrid = ({ count = 8 }) => {
  return (
    <div className='p-6 w-full flex justify-center items-center gap-y-8 gap-9 flex-wrap'>
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
};

export { CardSkeleton, CardSkeletonGrid };
export default CardSkeleton;
