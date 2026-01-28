import { useState, useEffect } from 'react';

const PriceRangeSlider = ({
  minPrice,
  maxPrice,
  onPriceChange,
  min = 0,
  max = 50000,
  step = 500,
}) => {
  const [localMin, setLocalMin] = useState(minPrice || min);
  const [localMax, setLocalMax] = useState(maxPrice || max);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setLocalMin(minPrice || min);
    setLocalMax(maxPrice || max);
  }, [minPrice, maxPrice, min, max]);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), localMax - step);
    setLocalMin(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), localMin + step);
    setLocalMax(value);
  };

  const handleApply = () => {
    onPriceChange(localMin, localMax);
    setIsOpen(false);
  };

  const handleReset = () => {
    setLocalMin(min);
    setLocalMax(max);
    onPriceChange(null, null);
    setIsOpen(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const hasActiveFilter = minPrice || maxPrice;
  const displayText = hasActiveFilter
    ? `${formatPrice(minPrice || min)} - ${formatPrice(maxPrice || max)}`
    : 'Price Range';

  return (
    <div className='relative inline-block text-left'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-white border hover:bg-blue-800 rounded-3xl font-medium px-6 py-3 text-center inline-flex items-center transition-all duration-200 ease-in hover:cursor-pointer transform hover:scale-95 ${hasActiveFilter ? 'border-blue-500 text-blue-600' : 'border-gray-500'}`}
        type='button'
        aria-expanded={isOpen}
        aria-haspopup='dialog'
      >
        {displayText}
        <svg
          className={`w-2.5 h-2.5 ms-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
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
      </button>

      {isOpen && (
        <div
          className='absolute mt-2 w-72 bg-white rounded-lg shadow-lg z-20 p-4'
          role='dialog'
          aria-label='Price range filter'
        >
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Price Range</label>
            <div className='flex items-center justify-between text-sm text-gray-600 mb-2'>
              <span>{formatPrice(localMin)}</span>
              <span>{formatPrice(localMax)}</span>
            </div>
          </div>

          <div className='relative h-2 mb-6'>
            <div className='absolute w-full h-2 bg-gray-200 rounded-full' />
            <div
              className='absolute h-2 bg-blue-500 rounded-full'
              style={{
                left: `${((localMin - min) / (max - min)) * 100}%`,
                right: `${100 - ((localMax - min) / (max - min)) * 100}%`,
              }}
            />
            <input
              type='range'
              min={min}
              max={max}
              step={step}
              value={localMin}
              onChange={handleMinChange}
              className='absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-blue-600 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0'
              aria-label='Minimum price'
            />
            <input
              type='range'
              min={min}
              max={max}
              step={step}
              value={localMax}
              onChange={handleMaxChange}
              className='absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-blue-600 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0'
              aria-label='Maximum price'
            />
          </div>

          <div className='flex items-center gap-2 mb-4'>
            <div className='flex-1'>
              <label htmlFor='min-price-input' className='block text-xs text-gray-500 mb-1'>
                Min
              </label>
              <input
                id='min-price-input'
                type='number'
                value={localMin}
                onChange={handleMinChange}
                min={min}
                max={localMax - step}
                step={step}
                className='w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500'
              />
            </div>
            <span className='text-gray-400 mt-5'>-</span>
            <div className='flex-1'>
              <label htmlFor='max-price-input' className='block text-xs text-gray-500 mb-1'>
                Max
              </label>
              <input
                id='max-price-input'
                type='number'
                value={localMax}
                onChange={handleMaxChange}
                min={localMin + step}
                max={max}
                step={step}
                className='w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500'
              />
            </div>
          </div>

          <div className='flex gap-2'>
            <button
              onClick={handleReset}
              className='flex-1 px-3 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors'
              type='button'
            >
              Reset
            </button>
            <button
              onClick={handleApply}
              className='flex-1 px-3 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors'
              type='button'
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceRangeSlider;
