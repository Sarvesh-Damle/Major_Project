import { usePropertiesPGs } from '../../hooks/useProperties.js';
import PropertiesCard from './PropertiesCard.jsx';
import { useState } from 'react';
import Loader from '@/pages/Loader.jsx';
import ErrorComponent from '@/pages/ErrorComponent.jsx';
import { useLocation } from 'react-router-dom';
import { CheckBoxDropdown, DropdownSelect } from './HostelProperties.jsx';
import { localities, sort } from '../../data/Property.js';

const PGProperties = () => {
  // const [filter, setFilter] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const city = queryParams.get('city') || '';
  const locality = queryParams.get('locality') || '';
  const { data, isLoading, isError, refetch } = usePropertiesPGs(city, locality);
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
        // const newTypeOfHostel = typeOfHostel.includes(value) ? typeOfHostel.filter((item) => item !== value) : [...typeOfHostel, value];
        // setTypeOfHostel(newTypeOfHostel)
        // console.log(typeOfHostel)
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

  if (isLoading) return <Loader />;
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
            <div className='flex w-full gap-8 justify-center items-center'>
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

export default PGProperties;
