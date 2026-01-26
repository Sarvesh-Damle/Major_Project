import { useState } from 'react';
import { HiLocationMarker } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { searchData } from '../../data/Search.js';

function SearchBar() {
  const [isDropdownOpenCity, setIsDropdownOpenCity] = useState(false);
  const [searchValueCity, setSearchValueCity] = useState('');
  const [isDropdownOpenLocality, setIsDropdownOpenLocality] = useState(false);
  const [searchValueLocality, setSearchValueLocality] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [instituteName, setInstituteName] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const navigate = useNavigate();

  const toggleDropdownCity = () => {
    setIsDropdownOpenLocality(false);
    setIsDropdownOpen(false);
    setIsDropdownOpenCity(!isDropdownOpenCity);
  };

  const handleDropdownItemClickCity = (value) => {
    setSearchValueCity(value);
    toggleDropdownCity();
  };

  const toggleDropdownLocality = () => {
    setIsDropdownOpenCity(false);
    setIsDropdownOpen(false);
    setIsDropdownOpenLocality(!isDropdownOpenLocality);
  };

  const handleDropdownItemClickLocality = (value) => {
    setSearchValueLocality(value);
    toggleDropdownLocality();
  };

  const toggleDropdown = () => {
    setIsDropdownOpenCity(false);
    setIsDropdownOpenLocality(false);
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownItemClick = (value) => {
    setSearchValue(value);
    toggleDropdown();
  };
  // const toggleDropdownHostel = () => {
  //   setIsDropdownOpenHostel(!isDropdownOpenHostel);
  // };

  // const handleDropdownItemClickHostel = (value) => {
  //   setSearchValueHostel(value);
  //   toggleDropdownHostel();
  // };
  // const toggleDropdownPG = () => {
  //   setIsDropdownOpenPG(!isDropdownOpenPG);
  // };

  // const handleDropdownItemClickPG = (value) => {
  //   setSearchValuePG(value);
  //   toggleDropdownPG();
  // };
  // const toggleDropdownFlat = () => {
  //   setIsDropdownOpenFlat(!isDropdownOpenFlat);
  // };

  // const handleDropdownItemClickFlat = (value) => {
  //   setSearchValueFlat(value);
  //   toggleDropdownFlat();
  // };

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   const queryParams = new URLSearchParams();
  //   if (searchValue) {
  //     queryParams.append("type", searchValue);
  //   }
  //   if (searchValueLocality) {
  //     queryParams.append("locality", searchValueLocality);
  //   }
  //   navigate(`/search?${queryParams.toString()}`);
  // }
  const handleSearch = (e) => {
    e.preventDefault();
    let url = '';
    if (searchValue === 'Hostels') {
      url = '/hostels';
    }
    if (searchValue === 'PGs') {
      url = '/pgs';
    }
    if (searchValue === 'Flats') {
      url = '/flats';
    }
    if (!searchValue) {
      toast.error('Please select type!');
      return;
    }
    if (!searchValueCity) {
      toast.error('Please select city!');
      return;
    }
    url = url.concat(`?city=${searchValueCity.toLowerCase()}`);
    if (searchValueLocality) {
      url = url.concat(`&locality=${searchValueLocality.toLowerCase()}`);
    }
    navigate(url);
  };
  let lastSelectedLocality;
  const handleFilter = (e) => {
    const searchWord = e.target.value.toLowerCase();
    setInstituteName(searchWord);
    const newFilter = searchData.filter((value) => {
      return value.name.toLowerCase().includes(searchWord);
    });
    setFilteredData(newFilter);
    if (searchWord === '') {
      setShowResults(false);
    }
  };
  const handleSearchClick = (value) => {
    if (instituteName === 'None') {
      setShowResults(false);
      setInstituteName('');
    }
    if (instituteName === '') {
      setShowResults(false);
    }
    setInstituteName(value.name);
    setShowResults(true);
    lastSelectedLocality = value.name.split(',').pop().trim();
    setSearchValueLocality(lastSelectedLocality);
  };

  return (
    <form
      onSubmit={handleSearch}
      className='flex flex-col sm:flex-row sm:justify-center max-lg:flex-wrap mt-8 mb-14'
    >
      {/* city search */}
      <div className='relative max-sm:mb-4 max-sm:mx-8 max-sm:flex max-sm:flex-wrap'>
        <button
          className='w-full text-center inline-flex items-center font-medium px-6 py-3 text-white border-none rounded-lg transition-all duration-200 ease-in hover:cursor-pointer transform hover:scale-95 bg-blue-gradient'
          type='button'
          onClick={toggleDropdownCity}
        >
          {searchValueCity || 'Select city'}
          {isDropdownOpenCity ? (
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
        <div
          className={`absolute z-10 ${isDropdownOpenCity ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-56`}
          style={{ top: 'calc(100% + 5px)', left: '50%', transform: 'translateX(-50%)' }}
          onMouseLeave={() => setIsDropdownOpenCity(false)}
        >
          <ul className='py-2 text-sm text-gray-700 divide-y divide-gray-100 font-medium'>
            <li
              className='block px-4 py-2 cursor-pointer hover:bg-gray-100'
              onClick={() => handleDropdownItemClickCity('Mumbai')}
            >
              Mumbai
            </li>
            {/* <li className="block px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleDropdownItemClickCity("Pune")}>
              Pune
            </li>
            <li className="block px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleDropdownItemClickCity("Kota")}>
              Kota
            </li>
            <li className="block px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleDropdownItemClickCity("Nagpur")}>
              Nagpur
            </li> */}
          </ul>
        </div>
      </div>
      {/* locality search */}
      <div className='relative max-sm:mb-4 max-sm:mx-7 max-sm:flex max-sm:flex-wrap'>
        <button
          className='w-full text-center inline-flex items-center font-medium px-6 py-3 text-white border-none rounded-lg transition-all duration-200 ease-in hover:cursor-pointer transform hover:scale-95 bg-blue-gradient mx-1'
          type='button'
          onClick={toggleDropdownLocality}
        >
          {searchValueLocality || 'Select Locality'}
          {isDropdownOpenLocality ? (
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
        <div
          className={`absolute z-10 ${isDropdownOpenLocality ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-56`}
          style={{ top: 'calc(100% + 5px)', left: '50%', transform: 'translateX(-50%)' }}
          onMouseLeave={() => setIsDropdownOpenLocality(false)}
        >
          <ul className='py-2 text-sm text-gray-700 divide-y divide-gray-100 font-medium'>
            <li
              className='block px-4 py-2 cursor-pointer hover:bg-gray-100'
              onClick={() => handleDropdownItemClickLocality('Wadala')}
            >
              Wadala
            </li>
            <li
              className='block px-4 py-2 cursor-pointer hover:bg-gray-100'
              onClick={() => handleDropdownItemClickLocality('Dadar')}
            >
              Dadar
            </li>
            <li
              className='block px-4 py-2 cursor-pointer hover:bg-gray-100'
              onClick={() => handleDropdownItemClickLocality('Thane')}
            >
              Thane
            </li>
            <li
              className='block px-4 py-2 cursor-pointer hover:bg-gray-100'
              onClick={() => handleDropdownItemClickLocality('Andheri')}
            >
              Andheri
            </li>
            <li
              className='block px-4 py-2 cursor-pointer hover:bg-gray-100'
              onClick={() => handleDropdownItemClickLocality('Matunga')}
            >
              Matunga
            </li>
            <li
              className='block px-4 py-2 cursor-pointer hover:bg-gray-100'
              onClick={() => handleDropdownItemClickLocality('Vashi')}
            >
              Vashi
            </li>
          </ul>
        </div>
      </div>
      {/* type search */}
      <div className='relative max-sm:mb-4 max-sm:mx-6 max-sm:flex max-sm:flex-wrap'>
        <button
          className='w-full text-center inline-flex items-center font-medium px-6 py-3 text-white border-none rounded-lg transition-all duration-200 ease-in hover:cursor-pointer transform hover:scale-95 bg-blue-gradient mx-2'
          type='button'
          onClick={toggleDropdown}
        >
          {searchValue || 'Select type'}
          {isDropdownOpen ? (
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
        <div
          className={`absolute z-10 ${isDropdownOpen ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-56`}
          style={{ top: 'calc(100% + 5px)', left: '50%', transform: 'translateX(-50%)' }}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <ul className='py-2 text-sm text-gray-700 divide-y divide-gray-100 font-medium'>
            <li
              className='block px-4 py-2 cursor-pointer hover:bg-gray-100'
              onClick={() => handleDropdownItemClick('Hostels')}
            >
              Hostels
            </li>
            <li
              className='block px-4 py-2 cursor-pointer hover:bg-gray-100'
              onClick={() => handleDropdownItemClick('PGs')}
            >
              PGs
            </li>
            <li
              className='block px-4 py-2 cursor-pointer hover:bg-gray-100'
              onClick={() => handleDropdownItemClick('Flats')}
            >
              Flats
            </li>
          </ul>
        </div>
      </div>
      {/* Type of sub parts
      {searchValue === "Hostels" ? (
        <div className="relative mt-2 sm:mt-0 sm:ml-1">
          <button
            className="w-full text-center inline-flex items-center font-medium px-6 py-3 text-white border-none rounded-lg transition-all duration-200 ease-in hover:cursor-pointer transform hover:scale-95 bg-blue-gradient mx-1"
            type="button"
            onClick={toggleDropdownHostel}
          >
            {searchValueHostel || "Choose type of Hostels"}
            {isDropdownOpenHostel ?
              (<svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5 5 1 9 5"
                />
              </svg>) : (<svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>)}
          </button>
          <div
            className={`absolute z-10 ${isDropdownOpenHostel ? "block" : "hidden"} bg-white divide-y divide-gray-100 rounded-lg shadow w-56`}
            style={{ top: "calc(100% + 5px)", left: "50%", transform: "translateX(-50%)" }}
            onMouseLeave={() => setIsDropdownOpenHostel(false)}
          >
            <ul className="py-2 text-sm text-gray-700 divide-y divide-gray-100 font-medium">
              <li className="block px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleDropdownItemClickHostel("Boys-Hostel")}>
                Boys-Hostel
              </li>
              <li className="block px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleDropdownItemClickHostel("Girls-Hostel")}>
                Girls-Hostel
              </li>
            </ul>
          </div>
        </div>
      ) : null}
      {searchValue === "PGs" ? (
        <div className="relative mt-2 sm:mt-0 sm:ml-1">
          <button
            className="w-full text-center inline-flex items-center font-medium px-6 py-3 text-white border-none rounded-lg transition-all duration-200 ease-in hover:cursor-pointer transform hover:scale-95 bg-blue-gradient mx-1"
            type="button"
            onClick={toggleDropdownPG}
          >
            {searchValuePG || "Choose type of PGs"}
            {isDropdownOpenPG ?
              (<svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5 5 1 9 5"
                />
              </svg>) : (<svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>)}
          </button>
          <div
            className={`absolute z-10 ${isDropdownOpenPG ? "block" : "hidden"} bg-white divide-y divide-gray-100 rounded-lg shadow w-56`}
            style={{ top: "calc(100% + 5px)", left: "50%", transform: "translateX(-50%)" }}
            onMouseLeave={() => setIsDropdownOpenPG(false)}
          >
            <ul className="py-2 text-sm text-gray-700 divide-y divide-gray-100 font-medium">
              <li className="block px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleDropdownItemClickPG("A")}>
                A
              </li>
              <li className="block px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleDropdownItemClickPG("B")}>
                B
              </li>
              <li className="block px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleDropdownItemClickPG("C")}>
                C
              </li>
            </ul>
          </div>
        </div>) : null}
      {searchValue === "Flats" ? (<div className="relative mt-2 sm:mt-0 sm:ml-1">
        <button
          className="w-full text-center inline-flex items-center font-medium px-6 py-3 text-white border-none rounded-lg transition-all duration-200 ease-in hover:cursor-pointer transform hover:scale-95 bg-blue-gradient mx-1"
          type="button"
          onClick={toggleDropdownFlat}
        >
          {searchValueFlat || "Choose type of Flats"}
          {isDropdownOpenFlat ?
            (<svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5 5 1 9 5"
              />
            </svg>) : (<svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>)}
        </button>
        <div
          className={`absolute z-10 ${isDropdownOpenFlat ? "block" : "hidden"} bg-white divide-y divide-gray-100 rounded-lg shadow w-56`}
          style={{ top: "calc(100% + 5px)", left: "50%", transform: "translateX(-50%)" }}
          onMouseLeave={() => setIsDropdownOpenFlat(false)}
        >
          <ul className="py-2 text-sm text-gray-700 divide-y divide-gray-100 font-medium">
            <li className="block px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleDropdownItemClickFlat("1 BHK")}>
              1 BHK
            </li>
            <li className="block px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleDropdownItemClickFlat("2 BHK")}>
              2 BHK
            </li>
            <li className="block px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleDropdownItemClickFlat("3 BHK")}>
              3 BHK
            </li>
          </ul>
        </div>
      </div>) : null} */}
      <div className='w-1/3 flex max-sm:flex-col max-sm:flex-wrap max-sm:w-96 gap-0.5 max-sm:gap-3 max-sm:justify-center max-sm:items-center justify-center mx-1 ml-3'>
        {/* custom search bar */}
        <div className='w-full flex flex-col gap-0.5 search'>
          <div className='flex searchInputs'>
            <input
              type='search'
              placeholder='Search near your College, Company...'
              className='w-full max-sm:w-[250%] flex gap-y-8  bg-white rounded-lg border-2 border-solid border-gray-300 border-opacity-50 p-3 mx-0.5 justify-between'
              onChange={handleFilter}
              value={instituteName}
            />
          </div>
          {filteredData.length > 0 && (
            <div
              className={` w-[340px] h-[200px] bg-white shadow-gray-800 overflow-hidden overflow-y-auto no-scrollbar dataResult ${showResults ? 'hidden' : 'block'}`}
            >
              {filteredData.map((value, index) => {
                return (
                  <div
                    key={index}
                    className='w-[100%] h-[50px] flex text-black cursor-pointer hover:bg-gray-200 dataItem'
                    onClick={() => {
                      handleSearchClick(value);
                    }}
                  >
                    <p className='ml-[10px]'>{value.name}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
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
    <>
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
    </>
  );
};

export default SearchBar;
