import { useState, useCallback } from 'react';

const SearchInput = ({ data, placeholder, onSelect, className = '' }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleFilter = useCallback(
    (e) => {
      const searchWord = e.target.value.toLowerCase();
      setInputValue(e.target.value);

      if (searchWord === '') {
        setFilteredData([]);
        setShowResults(false);
        return;
      }

      const filtered = data.filter((item) => item.name.toLowerCase().includes(searchWord));
      setFilteredData(filtered);
      setShowResults(false);
    },
    [data]
  );

  const handleSelect = (item) => {
    setInputValue(item.name);
    setShowResults(true);
    setFilteredData([]);
    onSelect(item);
  };

  return (
    <div className={`relative flex flex-col gap-0.5 ${className}`}>
      <div className='flex'>
        <input
          type='search'
          placeholder={placeholder}
          className='w-full flex gap-y-8 bg-white rounded-lg border-2 border-solid border-gray-300 border-opacity-50 p-3 mx-0.5 justify-between'
          onChange={handleFilter}
          value={inputValue}
        />
      </div>
      {filteredData.length > 0 && !showResults && (
        <div className='w-full max-h-[200px] bg-white shadow-lg rounded-lg overflow-hidden overflow-y-auto no-scrollbar absolute top-full z-20'>
          {filteredData.map((item, index) => (
            <div
              key={index}
              className='w-full py-3 px-3 flex text-black cursor-pointer hover:bg-gray-200'
              onClick={() => handleSelect(item)}
            >
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
