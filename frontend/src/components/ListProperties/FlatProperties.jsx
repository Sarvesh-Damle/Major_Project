import { usePropertiesFlats } from '../../hooks/useProperties.js';
import PropertiesCard from './PropertiesCard.jsx';
import { useState, useMemo, useCallback } from 'react';
import { CardSkeletonGrid } from '@/components/ui/CardSkeleton.jsx';
import ErrorComponent from '@/pages/ErrorComponent.jsx';
import EmptyState from '@/components/ui/EmptyState.jsx';
import { useLocation } from 'react-router-dom';
import { CheckBoxDropdown, DropdownSelect } from './HostelProperties.jsx';
import { localities, flat_types, furnished_status } from '../../data/Property.js';
import PriceRangeSlider from '@/components/ui/PriceRangeSlider.jsx';
import Pagination from '@/components/ui/Pagination.jsx';
import useDebounce from '@/hooks/useDebounce.js';
import SaveSearchButton from '@/components/ui/SaveSearchButton.jsx';

const ITEMS_PER_PAGE = 12;

const FlatProperties = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const city = queryParams.get('city') || '';
  const initialLocality = queryParams.get('locality') || '';

  const [filters, setFilters] = useState({
    locality: initialLocality,
    flatType: [],
    furnishedStatus: [],
    minPrice: null,
    maxPrice: null,
    sortBy: null,
    page: 1,
    limit: ITEMS_PER_PAGE,
  });

  const debouncedFilters = useDebounce(filters, 300);
  const { data, isLoading, isError } = usePropertiesFlats(city, debouncedFilters);

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

  const properties = data?.data?.flats || data?.data || [];
  const pagination = data?.data?.pagination;

  return (
    <div className='wrapper'>
      <div className='flexColCenter p-6 innerWidth gap-8 properties-container'>
        <div className='flex w-full gap-x-10 gap-y-4 flex-wrap filters'>
          <div className='flex w-full gap-4 sm:gap-6 justify-center items-center flex-wrap'>
            <CheckBoxDropdown
              dropdownTitle='Flat Type'
              items={flat_types}
              selectedItems={filters.flatType}
              onItemsSelected={(value) => updateFilter('flatType', value)}
            />
            <CheckBoxDropdown
              dropdownTitle='Furnished Status'
              items={furnished_status}
              selectedItems={filters.furnishedStatus}
              onItemsSelected={(value) => updateFilter('furnishedStatus', value)}
            />
            <PriceRangeSlider
              minPrice={filters.minPrice}
              maxPrice={filters.maxPrice}
              onPriceChange={handlePriceChange}
              min={0}
              max={100000}
              step={1000}
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
            <SaveSearchButton
              propertyType='flat'
              filters={{
                city,
                locality: filters.locality,
                minPrice: filters.minPrice,
                maxPrice: filters.maxPrice,
                flatType: filters.flatType?.[0],
                furnishedStatus: filters.furnishedStatus?.[0],
              }}
            />
          </div>
        </div>

        <div className='p-6 w-full flex justify-center items-center gap-y-8 gap-4 flex-wrap properties'>
          {properties.length > 0 ? (
            properties.map((card) => <PropertiesCard card={card} key={card._id} />)
          ) : (
            <EmptyState
              icon='search'
              title='No flats found'
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

export default FlatProperties;
