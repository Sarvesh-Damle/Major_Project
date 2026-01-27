import { usePropertiesPGs } from '../../hooks/useProperties.js';
import PropertiesCard from './PropertiesCard.jsx';
import { useState, useMemo } from 'react';
import { CardSkeletonGrid } from '@/components/ui/CardSkeleton.jsx';
import ErrorComponent from '@/pages/ErrorComponent.jsx';
import EmptyState from '@/components/ui/EmptyState.jsx';
import { useLocation } from 'react-router-dom';
import { CheckBoxDropdown, DropdownSelect } from './HostelProperties.jsx';
import { localities, room_types, preferred_tennats } from '../../data/Property.js';
import PriceRangeSlider from '@/components/ui/PriceRangeSlider.jsx';
import Pagination from '@/components/ui/Pagination.jsx';

const ITEMS_PER_PAGE = 12;

const PGProperties = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const city = queryParams.get('city') || '';
  const initialLocality = queryParams.get('locality') || '';

  const [filters, setFilters] = useState({
    locality: initialLocality,
    preferredTennats: [],
    roomType: [],
    minPrice: null,
    maxPrice: null,
    sortBy: null,
    page: 1,
    limit: ITEMS_PER_PAGE,
  });

  const { data, isLoading, isError } = usePropertiesPGs(city, filters);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const handlePriceChange = (min, max) => {
    setFilters((prev) => ({ ...prev, minPrice: min, maxPrice: max, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sortByValue = useMemo(() => {
    if (filters.sortBy === 'price_asc') return 'Price: Low to High';
    if (filters.sortBy === 'price_desc') return 'Price: High to Low';
    return '';
  }, [filters.sortBy]);

  if (isLoading) return <CardSkeletonGrid count={8} />;
  if (isError) return <ErrorComponent />;

  const properties = data?.data?.pgs || data?.data || [];
  const pagination = data?.data?.pagination;

  return (
    <div className='wrapper'>
      <div className='flexColCenter p-6 innerWidth gap-8 properties-container'>
        <div className='flex w-full gap-x-10 gap-y-4 flex-wrap filters'>
          <div className='flex w-full gap-4 sm:gap-6 justify-center items-center flex-wrap'>
            <CheckBoxDropdown
              dropdownTitle='Preferred For'
              items={preferred_tennats}
              selectedItems={filters.preferredTennats}
              onItemsSelected={(value) => updateFilter('preferredTennats', value)}
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
              title='No PGs found'
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

export default PGProperties;
