import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { HiBookmark } from 'react-icons/hi';

const SaveSearchButton = ({ propertyType, filters }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [notifyOnNewMatches, setNotifyOnNewMatches] = useState(false);

  const saveMutation = useMutation({
    mutationFn: (data) => {
      return axios.post('/api/v1/saved-searches', data, { withCredentials: true });
    },
    onSuccess: () => {
      toast.success('Search saved successfully!');
      setIsModalOpen(false);
      setSearchName('');
      setNotifyOnNewMatches(false);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to save search';
      toast.error(message);
    },
  });

  const handleSave = () => {
    if (!searchName.trim()) {
      toast.error('Please enter a name for your search');
      return;
    }

    // Clean up filters - remove empty values
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([, v]) => v !== null && v !== '' && v !== undefined)
    );

    saveMutation.mutate({
      searchName: searchName.trim(),
      propertyType,
      filters: cleanFilters,
      notifyOnNewMatches,
    });
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className='flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-3xl font-medium px-6 py-3 transition-all duration-200 ease-in transform hover:scale-95'
        title='Save this search'
      >
        <HiBookmark className='text-lg' />
        Save Search
      </button>

      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg p-6 w-full max-w-md mx-4'>
            <h3 className='text-lg font-semibold mb-4'>Save Search</h3>

            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Search Name
              </label>
              <input
                type='text'
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder={`e.g., ${propertyType}s in ${filters.city || 'my area'}`}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                maxLength={100}
              />
            </div>

            <div className='mb-4'>
              <p className='text-sm text-gray-600 mb-2'>Current filters:</p>
              <div className='flex flex-wrap gap-2'>
                {filters.city && (
                  <span className='px-2 py-1 bg-gray-100 rounded text-xs'>City: {filters.city}</span>
                )}
                {filters.locality && (
                  <span className='px-2 py-1 bg-gray-100 rounded text-xs'>Locality: {filters.locality}</span>
                )}
                {filters.minPrice && (
                  <span className='px-2 py-1 bg-gray-100 rounded text-xs'>Min: ₹{filters.minPrice}</span>
                )}
                {filters.maxPrice && (
                  <span className='px-2 py-1 bg-gray-100 rounded text-xs'>Max: ₹{filters.maxPrice}</span>
                )}
                {filters.typeOfHostel && (
                  <span className='px-2 py-1 bg-gray-100 rounded text-xs'>{filters.typeOfHostel}</span>
                )}
                {filters.roomType && (
                  <span className='px-2 py-1 bg-gray-100 rounded text-xs'>{filters.roomType}</span>
                )}
                {filters.preferredTennats && (
                  <span className='px-2 py-1 bg-gray-100 rounded text-xs'>{filters.preferredTennats}</span>
                )}
                {filters.flatType && (
                  <span className='px-2 py-1 bg-gray-100 rounded text-xs'>{filters.flatType}</span>
                )}
              </div>
            </div>

            <div className='mb-6'>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input
                  type='checkbox'
                  checked={notifyOnNewMatches}
                  onChange={(e) => setNotifyOnNewMatches(e.target.checked)}
                  className='w-4 h-4 text-blue-600 rounded'
                />
                <span className='text-sm text-gray-700'>Notify me when new properties match</span>
              </label>
            </div>

            <div className='flex gap-3 justify-end'>
              <button
                onClick={() => setIsModalOpen(false)}
                className='px-4 py-2 text-gray-600 hover:text-gray-800'
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saveMutation.isPending}
                className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50'
              >
                {saveMutation.isPending ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SaveSearchButton;
