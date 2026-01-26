import { useState, useCallback } from 'react';
import { HiLocationMarker } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { searchData } from '../../data/Search.js';
import Dropdown from '../ui/Dropdown.jsx';
import SearchInput from '../ui/SearchInput.jsx';

const CITIES = [{ value: 'Mumbai', label: 'Mumbai' }];

const LOCALITIES = [
  { value: 'Wadala', label: 'Wadala' },
  { value: 'Dadar', label: 'Dadar' },
  { value: 'Thane', label: 'Thane' },
  { value: 'Andheri', label: 'Andheri' },
  { value: 'Matunga', label: 'Matunga' },
  { value: 'Vashi', label: 'Vashi' },
];

const PROPERTY_TYPES = [
  { value: 'Hostels', label: 'Hostels' },
  { value: 'PGs', label: 'PGs' },
  { value: 'Flats', label: 'Flats' },
];

const TYPE_TO_URL = {
  Hostels: '/hostels',
  PGs: '/pgs',
  Flats: '/flats',
};

function SearchBar() {
  const [city, setCity] = useState('');
  const [locality, setLocality] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const navigate = useNavigate();

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();

      if (!propertyType) {
        toast.error('Please select type!');
        return;
      }
      if (!city) {
        toast.error('Please select city!');
        return;
      }

      let url = TYPE_TO_URL[propertyType];
      url += `?city=${city.toLowerCase()}`;

      if (locality) {
        url += `&locality=${locality.toLowerCase()}`;
      }

      navigate(url);
    },
    [propertyType, city, locality, navigate]
  );

  const handleInstitutionSelect = useCallback((item) => {
    const localityFromName = item.name.split(',').pop().trim();
    setLocality(localityFromName);
  }, []);

  return (
    <form
      onSubmit={handleSearch}
      className='flex flex-col sm:flex-row sm:justify-center max-lg:flex-wrap mt-8 mb-14'
    >
      {/* City dropdown */}
      <Dropdown
        value={city}
        placeholder='Select city'
        options={CITIES}
        onChange={setCity}
        className='max-sm:mb-4 max-sm:mx-8'
      />

      {/* Locality dropdown */}
      <Dropdown
        value={locality}
        placeholder='Select Locality'
        options={LOCALITIES}
        onChange={setLocality}
        className='max-sm:mb-4 max-sm:mx-7 mx-1'
      />

      {/* Property type dropdown */}
      <Dropdown
        value={propertyType}
        placeholder='Select type'
        options={PROPERTY_TYPES}
        onChange={setPropertyType}
        className='max-sm:mb-4 max-sm:mx-6 mx-2'
      />

      {/* Search input and button */}
      <div className='w-1/3 flex max-sm:flex-col max-sm:flex-wrap max-sm:w-96 gap-0.5 max-sm:gap-3 max-sm:justify-center max-sm:items-center justify-center mx-1 ml-3'>
        <SearchInput
          data={searchData}
          placeholder='Search near your College, Company...'
          onSelect={handleInstitutionSelect}
          className='w-full'
        />
        <button
          type='submit'
          className='px-1.5 gap-3 w-32 max-sm:w-40 h-14 flex justify-center items-center font-medium ml-0.5 bg-blue-gradient text-white rounded-lg border-none transition-all duration-200 ease-in hover:cursor-pointer transform hover:scale-95'
        >
          <svg
            className='w-4 h-4 mt-1'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 20 20'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
            />
          </svg>
          <span>Search</span>
        </button>
      </div>
    </form>
  );
}

export const SearchBar2 = () => {
  return (
    <div className='flex flex-wrap gap-y-8 items-center bg-white rounded border-2 border-solid border-gray-400 border-opacity-50 py-2 px-4 justify-between w-[100%] search-bar'>
      <HiLocationMarker className='text-blue' size={25} />
      <input
        type='text'
        placeholder='Enter locality, city...'
        className='border-none outline-none text-black font-medium text-lg'
      />
      <button className='font-medium px-6 py-2.5 text-white border-none rounded transition-all duration-200 ease-in hover:cursor-pointer transform hover:scale-110 bg-blue-gradient'>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
