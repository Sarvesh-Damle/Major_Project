import { useState } from 'react';

const MultiSelect = ({ title, data, onSelect }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleItem = (item) => {
    let updatedItems;
    if (selectedItems.includes(item)) {
      updatedItems = selectedItems.filter((i) => i !== item);
    } else {
      updatedItems = [...selectedItems, item];
    }
    setSelectedItems(updatedItems);
    onSelect(updatedItems);
  };

  return (
    <>
      <div className='w-full flex flex-col items-center mx-auto'>
        <div className='w-full'>
          <div className='flex flex-col items-center relative'>
            <div className='w-full'>
              <div className='my-2 p-1 flex border border-gray-200 bg-white rounded'>
                <div className='flex flex-auto flex-wrap'>
                  {title}: &nbsp;
                  {data.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={`flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full text-teal-700 bg-teal-100 border border-teal-300 ${selectedItems.includes(item) ? 'bg-teal-300' : ''}`}
                      >
                        <div className='text-sm font-normal leading-none max-w-full flex-initial'>
                          {item}
                        </div>
                        <div className='flex flex-auto flex-row-reverse'>
                          <div onClick={() => toggleItem(item)}>
                            {selectedItems.includes(item) ? (
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='100%'
                                height='100%'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                className='feather feather-x cursor-pointer hover:text-teal-400 rounded-full w-4 h-4 ml-2'
                              >
                                <line x1='18' y1='6' x2='6' y2='18'></line>
                                <line x1='6' y1='6' x2='18' y2='18'></line>
                              </svg>
                            ) : (
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='100%'
                                height='100%'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                className='feather feather-plus cursor-pointer hover:text-teal-400 rounded-full w-4 h-4 ml-2'
                              >
                                <line x1='12' y1='5' x2='12' y2='19'></line>
                                <line x1='5' y1='12' x2='19' y2='12'></line>
                              </svg>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MultiSelect;
