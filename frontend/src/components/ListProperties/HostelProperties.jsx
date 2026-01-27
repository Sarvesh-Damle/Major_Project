/* eslint-disable no-case-declarations */
import { usePropertiesHostels } from '../../hooks/useProperties.js';
import PropertiesCard from './PropertiesCard.jsx';
import { useState } from 'react';
import { CardSkeletonGrid } from '@/components/ui/CardSkeleton.jsx';
import ErrorComponent from '@/pages/ErrorComponent.jsx';
import { useLocation } from 'react-router-dom';
import { localities, sort } from '../../data/Property.js';
// import { CiCircleRemove } from "react-icons/ci";

const HostelProperties = () => {
  // const [filter, setFilter] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const city = queryParams.get('city') || '';
  const locality = queryParams.get('locality') || '';
  const { data, isLoading, isError, refetch } = usePropertiesHostels(city, locality);
  const items_type_of_hostels = ['Boys-Hostel', 'Girls-Hostel'];
  const items_sharingType = ['Single', 'Double-Sharing', 'Triple-Sharing', 'Four-Sharing'];
  const [filteredData, setFilteredData] = useState(null);
  const [dropdownValueSort, setDropdownValueSort] = useState('');
  const [dropdownValueLocality, setDropdownValueLocality] = useState('');
  const [typeOfHostel, setTypeOfHostel] = useState([]);
  const [sharingType, setSharingType] = useState([]);

  const handleSelectFilter = async (filterName, value) => {
    switch (filterName) {
      case 'Sort':
        if (value === 'Price: Low to High') {
          const sortingProducts = (a, b) => {
            return a.rent_amount - b.rent_amount;
          };
          newSortedData = sortedData.sort(sortingProducts);
        } else if (value === 'Price: High to Low') {
          const sortingProducts = (a, b) => {
            return b.rent_amount - a.rent_amount;
          };
          newSortedData = sortedData.sort(sortingProducts);
        }
        break;
      case 'Type of Hostel':
        break;
      case 'Sharing Type':
        if (sharingType.includes(value)) {
          setSharingType(sharingType.filter((item) => item !== value)); // Deselect
        } else {
          setSharingType([...sharingType, value]); // Select
        }
        break;
      case 'By Locality':
        newSortedData = newSortedData.filter((property) =>
          property.locality.toLowerCase().includes(value.toLowerCase())
        );
        break;
      default:
        break;
    }
    setFilteredData(newSortedData);
    await refetch();
  };

  if (isLoading) return <CardSkeletonGrid count={8} />;
  if (isError) return <ErrorComponent />;

  let sortedData = [...data.data];
  let newSortedData = sortedData;

  const propertiesData =
    filteredData ||
    data.data.filter(
      (property) =>
        property.city.toLowerCase().includes(city.toLowerCase()) ||
        property.locality.toLowerCase().includes(locality.toLowerCase())
    );

  return (
    <>
      <div className='wrapper'>
        <div className='flexColCenter p-6 innerWidth gap-8 properties-container'>
          {/* Filters */}
          <div className='flex w-full gap-x-10 gap-y-4 flex-wrap filters'>
            <div className='flex w-full gap-4 sm:gap-8 justify-center items-center flex-wrap'>
              <CheckBoxDropdown
                dropdownTitle='Type of Flats'
                items={items_type_of_hostels}
                selectedItems={typeOfHostel}
                onItemsSelected={(value) => {
                  setTypeOfHostel(value);
                  handleSelectFilter('Type of Hostel', value);
                }}
              />
              <CheckBoxDropdown
                dropdownTitle='Sharing Type'
                items={items_sharingType}
                selectedItems={sharingType}
                onItemsSelected={(value) => {
                  setSharingType(value);
                  handleSelectFilter('Sharing Type', value);
                }}
              />

              <DropdownSelect
                title='Sort'
                options={sort}
                onSelect={(title, value) => {
                  setDropdownValueSort(value);
                  handleSelectFilter(title, value);
                }}
                dropdownValue={dropdownValueSort}
                setDropdownValue={setDropdownValueSort}
              />
              <DropdownSelect
                title='By Locality'
                options={localities}
                onSelect={(title, value) => {
                  setDropdownValueLocality(value);
                  handleSelectFilter(title, value);
                }}
                dropdownValue={dropdownValueLocality}
                setDropdownValue={setDropdownValueLocality}
              />
            </div>
          </div>
          <div className='p-6 w-full flex justify-center items-center gap-y-8 gap-9 flex-wrap properties'>
            {propertiesData &&
              propertiesData
                // .filter(property =>
                //   property.pg_name.toLowerCase().includes(filter.toLowerCase()) ||
                //   property.locality.toLowerCase().includes(filter.toLowerCase()) ||
                //   property.city.toLowerCase().includes(filter.toLowerCase()) ||
                //   property.city.toLowerCase().includes(city.toLowerCase()) ||
                //   property.locality.toLowerCase().includes(locality.toLowerCase()) ||
                //   property.rent_amount.toString().includes(filter.toLowerCase())
                // )
                .map((card, index) => {
                  return <PropertiesCard card={card} key={index} />;
                })}
            {propertiesData.length === 0 && 'No results found!!'}
          </div>
        </div>
      </div>
    </>
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
        id='dropdownDefaultButton'
        className='bg-white border border-gray-500 hover:bg-blue-800 rounded-3xl font-medium px-6 py-3 text-center inline-flex items-center transition-all duration-200 ease-in hover:cursor-pointer transform hover:scale-95'
        type='button'
      >
        {dropdownValue || title}
        {isOpen ? (
          <svg
            className='w-2.5 h-2.5 ms-3'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 10 6'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M1 5 5 1 9 5'
            />
          </svg>
        ) : (
          <svg
            className='w-2.5 h-2.5 ms-3'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 10 6'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='m1 1 4 4 4-4'
            />
          </svg>
        )}
      </button>
      {isOpen && (
        <div className='absolute mt-1 w-44 bg-white divide-y divide-gray-100 rounded-lg font-medium shadow z-10'>
          <ul
            className='p-3 space-y-1 text-sm text-gray-700'
            aria-labelledby='dropdownDefaultButton'
          >
            {options &&
              options.map((option, index) => (
                <li
                  key={index}
                  className='hover:cursor-pointer p-2 hover:bg-gray-100 rounded-lg pl-4'
                  onClick={() => handleSelect(option)}
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
        id='dropdownBgHoverButton'
        className='bg-white border border-gray-500 hover:bg-blue-800 rounded-3xl font-medium px-6 py-3 text-center inline-flex items-center transition-all duration-200 ease-in hover:cursor-pointer transform hover:scale-95'
        type='button'
      >
        {dropdownTitle}
        {isOpen ? (
          <svg
            className='w-2.5 h-2.5 ms-3'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 10 6'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M1 5 5 1 9 5'
            />
          </svg>
        ) : (
          <svg
            className='w-2.5 h-2.5 ms-3'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 10 6'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='m1 1 4 4 4-4'
            />
          </svg>
        )}
      </button>
      {isOpen && (
        <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow z-10'>
          <ul className='p-3 space-y-1 text-sm text-gray-700'>
            {items.map((item) => (
              <li key={item}>
                <div className='flex items-center p-2 rounded hover:bg-gray-100'>
                  <input
                    id={`checkbox-item-${item}`}
                    type='checkbox'
                    value={item}
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded'
                    checked={selectedItems.includes(item)}
                    onChange={() => handleSelect(item)}
                  />
                  <label
                    htmlFor={`checkbox-item-${item}`}
                    className='ml-2 text-sm font-medium text-gray-900'
                  >
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
