import { usePropertiesHostels } from '../../hooks/useProperties.js';
import PropertiesCard from './PropertiesCard.jsx';
import { useState, useMemo, useCallback } from 'react';
import { CardSkeletonGrid } from '@/components/ui/CardSkeleton.jsx';
import ErrorComponent from '@/pages/ErrorComponent.jsx';
import EmptyState from '@/components/ui/EmptyState.jsx';
import { useLocation } from 'react-router-dom';
import { localities, hostel_types, room_types } from '../../data/Property.js';
import PriceRangeSlider from '@/components/ui/PriceRangeSlider.jsx';
import Pagination from '@/components/ui/Pagination.jsx';
import useDebounce from '@/hooks/useDebounce.js';

const ITEMS_PER_PAGE = 12;

const HostelProperties = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const city = queryParams.get('city') || '';
  const initialLocality = queryParams.get('locality') || '';

  const [filters, setFilters] = useState({
    locality: initialLocality,
    typeOfHostel: [],
    roomType: [],
    minPrice: null,
    maxPrice: null,
    sortBy: null,
    page: 1,
    limit: ITEMS_PER_PAGE,
  });

  const debouncedFilters = useDebounce(filters, 300);
  const { data, isLoading, isError } = usePropertiesHostels(city, debouncedFilters);

  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  }, []);

  const handlePriceChange = useCallback((min, max) => {
    setFilters((prev) => ({ ...prev, minPrice: min, maxPrice: max, page: 1 }));
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const sortByValue = useMemo(() => {
    if (filters.sortBy === 'price_asc') return 'Price: Low to High';
    if (filters.sortBy === 'price_desc') return 'Price: High to Low';
    return '';
  }, [filters.sortBy]);

  if (isLoading) return <CardSkeletonGrid count={8} />;
  if (isError) return <ErrorComponent />;

  const properties = data?.data?.hostels || data?.data || [];
  const pagination = data?.data?.pagination;

  return (
    <div className='wrapper'>
      <div className='flexColCenter p-6 innerWidth gap-8 properties-container'>
        <div className='flex w-full gap-x-10 gap-y-4 flex-wrap filters'>
          <div className='flex w-full gap-4 sm:gap-6 justify-center items-center flex-wrap'>
            <CheckBoxDropdown
              dropdownTitle='Hostel Type'
              items={hostel_types}
              selectedItems={filters.typeOfHostel}
              onItemsSelected={(value) => updateFilter('typeOfHostel', value)}
            />
            <CheckBoxDropdown
              dropdownTitle='Room Type'
              items={room_types}
              selectedItems={filters.roomType}
              onItemsSelected={(value) => updateFilter('roomType', value)}
            />
            <PriceRangeSlider
              minPrice={filters.minPrice}
              maxPrice={filters.maxPrice}
              onPriceChange={handlePriceChange}
              min={0}
              max={50000}
              step={500}
            />
            <DropdownSelect
              title='Sort'
              options={['Price: Low to High', 'Price: High to Low']}
              dropdownValue={sortByValue}
              onSelect={(_, value) => {
                const sortBy = value === 'Price: Low to High' ? 'price_asc' : 'price_desc';
                updateFilter('sortBy', sortBy);
              }}
              setDropdownValue={() => {}}
            />
            <DropdownSelect
              title='By Locality'
              options={localities}
              dropdownValue={filters.locality}
              onSelect={(_, value) => updateFilter('locality', value)}
              setDropdownValue={() => {}}
            />
          </div>
        </div>

        <div className='p-6 w-full flex justify-center items-center gap-y-8 gap-9 flex-wrap properties'>
          {properties.length > 0 ? (
            properties.map((card) => <PropertiesCard card={card} key={card._id} />)
          ) : (
            <EmptyState
              icon='search'
              title='No hostels found'
              message='Try adjusting your filters or search for a different location.'
            />
          )}
        </div>

        {pagination && pagination.totalPages > 1 && (
          <Pagination currentPage={pagination.page} totalPages={pagination.totalPages} onPageChange={handlePageChange} />
        )}
      </div>
    </div>
  );
};

export const DropdownSelect = ({ title, options, onSelect, dropdownValue, setDropdownValue }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (selectedValue) => {
    setDropdownValue(selectedValue);
    setIsOpen(false);
    onSelect(title, selectedValue);
  };

  return (
    <div className='relative inline-block text-left z-10'>
      <button
        onClick={toggleDropdown}
        className={`bg-white border hover:bg-blue-800 rounded-3xl font-medium px-6 py-3 text-center inline-flex items-center transition-all duration-200 ease-in hover:cursor-pointer transform hover:scale-95 ${dropdownValue ? 'border-blue-500 text-blue-600' : 'border-gray-500'}`}
        type='button'
        aria-expanded={isOpen}
        aria-haspopup='listbox'
      >
        {dropdownValue || title}
        <svg
          className={`w-2.5 h-2.5 ms-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 10 6'
        >
          <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m1 1 4 4 4-4' />
        </svg>
      </button>
      {isOpen && (
        <div className='absolute mt-1 w-44 bg-white divide-y divide-gray-100 rounded-lg font-medium shadow z-10'>
          <ul className='p-3 space-y-1 text-sm text-gray-700' role='listbox'>
            {options?.map((option, index) => (
              <li
                key={index}
                role='option'
                aria-selected={dropdownValue === option}
                tabIndex={0}
                className='hover:cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none rounded-lg pl-4'
                onClick={() => handleSelect(option)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelect(option);
                  }
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export const CheckBoxDropdown = ({ dropdownTitle, items, selectedItems, onItemsSelected }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (selectedValue) => {
    const newSelectedItems = selectedItems.includes(selectedValue)
      ? selectedItems.filter((item) => item !== selectedValue)
      : [...selectedItems, selectedValue];
    onItemsSelected(newSelectedItems);
  };

  return (
    <div className='relative inline-block text-left'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-white border hover:bg-blue-800 rounded-3xl font-medium px-6 py-3 text-center inline-flex items-center transition-all duration-200 ease-in hover:cursor-pointer transform hover:scale-95 ${selectedItems.length > 0 ? 'border-blue-500 text-blue-600' : 'border-gray-500'}`}
        type='button'
        aria-expanded={isOpen}
        aria-haspopup='listbox'
      >
        {dropdownTitle}
        {selectedItems.length > 0 && (
          <span className='ml-2 bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-0.5 rounded-full'>
            {selectedItems.length}
          </span>
        )}
        <svg
          className={`w-2.5 h-2.5 ms-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 10 6'
        >
          <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m1 1 4 4 4-4' />
        </svg>
      </button>
      {isOpen && (
        <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow z-10'>
          <ul className='p-3 space-y-1 text-sm text-gray-700' role='listbox'>
            {items.map((item) => (
              <li key={item} role='option' aria-selected={selectedItems.includes(item)}>
                <div className='flex items-center p-2 rounded hover:bg-gray-100'>
                  <input
                    id={`checkbox-item-${item}`}
                    type='checkbox'
                    value={item}
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer'
                    checked={selectedItems.includes(item)}
                    onChange={() => handleSelect(item)}
                  />
                  <label htmlFor={`checkbox-item-${item}`} className='ml-2 text-sm font-medium text-gray-900 cursor-pointer'>
                    {item}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HostelProperties;
