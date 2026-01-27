import { IoMdPeople } from 'react-icons/io';

const Flatmates = () => {
  return (
    <div className='flex flex-col justify-center items-center bg-slate-100 py-16 gap-4'>
      <IoMdPeople size={48} className='text-blue-500' />
      <h2 className='text-2xl font-bold text-gray-800'>Find Flatmates</h2>
      <p className='text-gray-500 text-center max-w-md'>
        Looking for compatible flatmates? This premium feature is coming soon. Stay tuned!
      </p>
      <span className='px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium'>
        Coming Soon
      </span>
    </div>
  );
};

export default Flatmates;
