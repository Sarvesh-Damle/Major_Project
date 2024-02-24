import { useState } from "react";

function SearchBar() {
  const [isDropdownOpenCity, setIsDropdownOpenCity] = useState(false);
  const [searchValueCity, setSearchValueCity] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isDropdownOpenHostel, setIsDropdownOpenHostel] = useState(false);
  const [searchValueHostel, setSearchValueHostel] = useState("");
  const [isDropdownOpenPG, setIsDropdownOpenPG] = useState(false);
  const [searchValuePG, setSearchValuePG] = useState("");
  const [isDropdownOpenFlat, setIsDropdownOpenFlat] = useState(false);
  const [searchValueFlat, setSearchValueFlat] = useState("");
  const [instituteName, setInstituteName] = useState("");

  const toggleDropdownCity = () => {
    setIsDropdownOpenCity(!isDropdownOpenCity);
  };

  const handleDropdownItemClickCity = (value) => {
    setSearchValueCity(value);
    toggleDropdownCity();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownItemClick = (value) => {
    setSearchValue(value);
    toggleDropdown();
  };
  const toggleDropdownHostel = () => {
    setIsDropdownOpenHostel(!isDropdownOpenHostel);
  };

  const handleDropdownItemClickHostel = (value) => {
    setSearchValueHostel(value);
    toggleDropdownHostel();
  };
  const toggleDropdownPG = () => {
    setIsDropdownOpenPG(!isDropdownOpenPG);
  };

  const handleDropdownItemClickPG = (value) => {
    setSearchValuePG(value);
    toggleDropdownPG();
  };
  const toggleDropdownFlat = () => {
    setIsDropdownOpenFlat(!isDropdownOpenFlat);
  };

  const handleDropdownItemClickFlat = (value) => {
    setSearchValueFlat(value);
    toggleDropdownFlat();
  };

  return (
    <form className="flex flex-col items-center sm:flex-row sm:justify-center mt-8 mb-14">
      <div className="relative">
        <button
          className="w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
          type="button"
          onClick={toggleDropdownCity}
        >
          {searchValueCity || "Enter city, locality"}
          {isDropdownOpenCity ?
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
          className={`absolute z-10 ${isDropdownOpenCity ? "block" : "hidden"} bg-white divide-y divide-gray-100 rounded-lg shadow w-56`}
          style={{ top: "calc(100% + 5px)", left: "50%", transform: "translateX(-50%)" }}
          onMouseLeave={() => setIsDropdownOpenCity(false)}
        >
          <ul className="py-2 text-sm text-gray-700 divide-y divide-gray-100 font-medium">
            <li className="block px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleDropdownItemClickCity("Mumbai")}>
              Mumbai
            </li>
            <li className="block px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleDropdownItemClickCity("Pune")}>
              Pune
            </li>
            <li className="block px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleDropdownItemClickCity("Kota")}>
              Kota
            </li>
            <li className="block px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleDropdownItemClickCity("Nagpur")}>
              Nagpur
            </li>
          </ul>
        </div>
      </div>
      <div className="relative mt-2 sm:mt-0 sm:ml-1">
        <button
          className="w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
          type="button"
          onClick={toggleDropdown}
        >
          {searchValue || "Enter type"}
          {isDropdownOpen ?
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
          className={`absolute z-10 ${isDropdownOpen ? "block" : "hidden"} bg-white divide-y divide-gray-100 rounded-lg shadow w-56`}
          style={{ top: "calc(100% + 5px)", left: "50%", transform: "translateX(-50%)" }}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <ul className="py-2 text-sm text-gray-700 divide-y divide-gray-100 font-medium">
            <li className="block px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleDropdownItemClick("Hostels")}>
              Hostels
            </li>
            <li className="block px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleDropdownItemClick("PGs")}>
              PGs
            </li>
            <li className="block px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleDropdownItemClick("Flats")}>
              Flats
            </li>
          </ul>
        </div>
      </div>
      {searchValue === "Hostels" ? (
        <div className="relative mt-2 sm:mt-0 sm:ml-1">
          <button
            className="w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
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
              <li className="block px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleDropdownItemClickHostel("Co-ed")}>
                Co-ed
              </li>
            </ul>
          </div>
        </div>
      ) : null}
      {searchValue === "PGs" ? (
        <div className="relative mt-2 sm:mt-0 sm:ml-1">
          <button
            className="w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
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
          className="w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
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
            <li className="block px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleDropdownItemClickFlat("1 Bhk")}>
              1 Bhk
            </li>
            <li className="block px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleDropdownItemClickFlat("2 Bhk")}>
              2 Bhk
            </li>
            <li className="block px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleDropdownItemClickFlat("3 Bhk")}>
              3 Bhk
            </li>
          </ul>
        </div>
      </div>) : null}
      <div className="w-1/3 flex mt-2 sm:mt-0">
        <input
          type="search"
          className="w-full font-semibold p-2.5 pl-8 pr-2 ml-1 z-20 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search near your College, Company..."
          value={instituteName}
          onChange={(e) => setInstituteName(e.target.value)}
          required
        />
        <button
          type="submit"
          className="p-2.5 font-medium ml-0.5 text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </div>
    </form>
  );
}

export default SearchBar;