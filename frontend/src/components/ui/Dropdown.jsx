import { useState } from 'react';

const ChevronDown = () => (
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
);

const ChevronUp = () => (
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
);

const Dropdown = ({ value, placeholder, options, onChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        className='w-full text-center inline-flex items-center font-medium px-6 py-3 text-white border-none rounded-lg transition-all duration-200 ease-in hover:cursor-pointer transform hover:scale-95 bg-blue-gradient'
        type='button'
        onClick={() => setIsOpen(!isOpen)}
      >
        {value || placeholder}
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>
      <div
        className={`absolute z-10 ${isOpen ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-56`}
        style={{ top: 'calc(100% + 5px)', left: '50%', transform: 'translateX(-50%)' }}
        onMouseLeave={() => setIsOpen(false)}
      >
        <ul className='py-2 text-sm text-gray-700 divide-y divide-gray-100 font-medium'>
          {options.map((option) => (
            <li
              key={option.value}
              className='block px-4 py-2 cursor-pointer hover:bg-gray-100'
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
