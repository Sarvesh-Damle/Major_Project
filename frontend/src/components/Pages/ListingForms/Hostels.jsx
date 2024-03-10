import { Controller, useFormContext } from "react-hook-form";
import { useState } from "react";

const Hostels = () => {
  const { control, formState: { errors } } = useFormContext();

  const [selectedHostelType, setSelectedHostelType] = useState("");
  const [selectedRoomType, setSelectedRoomType] = useState("");

  return (
    <>
      <div className="mb-6">
        <Controller
          name="hostel_name"
          defaultValue=""
          control={control}
          rules={{
            required: "Hostel Name is required",
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: "Name must contain only letters and spaces"
            }
          }}
          render={({ field }) => (
            <>
              <label htmlFor="hostel_name">Hostel Name: </label>
              <input {...field} type="text" placeholder="Enter Hostel name..." className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none" />
              {errors.hostel_name && <p className='text-red-600'>{errors.hostel_name.message}</p>}
            </>
          )}
        />
      </div>
      <div className="mb-6">
        <Controller
          name="city"
          defaultValue=""
          control={control}
          rules={{
            required: "City is required",
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: "City must contain only letters and spaces"
            }
          }}
          render={({ field }) => (
            <>
              <label htmlFor="city">City: </label>
              <input {...field} type="text" placeholder="Enter City..." className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none" />
              {errors.city && <p className='text-red-600'>{errors.city.message}</p>}
            </>
          )}
        />
      </div>
      <div className="mb-6">
        <Controller
          name="address"
          defaultValue=""
          control={control}
          rules={{
            required: "Address is required",
            pattern: {
              value: /^[A-Za-z0-9\s.,#-]+$/,
              message: "Address can contain only letters, numbers and spaces"
            }
          }}
          render={({ field }) => (
            <>
              <label htmlFor="address">Address: </label>
              <input {...field} type="text" placeholder="Enter Address..." className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none" />
              {errors.address && <p className='text-red-600'>{errors.address.message}</p>}
            </>
          )}
        />
      </div>
      <div className="mb-6">
        <DropdownSelectOptions
          name={"type_of_hostel"}
          title={"Hostel Type: "}
          dropdownTitle={"Select Type of Hostel"}
          options={["Boys-Hostel", "Girls-Hostel"]}
          selectedValue={selectedHostelType}
          setSelectedValue={(setSelectedHostelType)}
          errors={errors.type_of_hostel}
        />
      </div>
      <div className="mb-6">
        <DropdownSelectOptions
          name={"room_type"}
          title="Type of Room: "
          dropdownTitle="Select Type of Room"
          options={["Single", "Double-Sharing", "Triple-Sharing", "Four-Sharing"]}
          selectedValue={selectedRoomType}
          setSelectedValue={setSelectedRoomType}
          errors={errors.room_type}
        />
      </div>
      <div className="mb-6">
        <Controller
          name="rent_amount"
          defaultValue=""
          control={control}
          rules={{
            required: "Rent Amount is required",
            min: {
              value: 0,
              message: "Rent Amount must be valid"
            }
          }}
          render={({ field }) => (
            <>
              <label htmlFor="rent_amount">Rent Amount: </label>
              <input {...field} type="number" placeholder="Enter rent amount..." className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none" />
              {errors.rent_amount && <p className='text-red-600'>{errors.rent_amount.message}</p>}
            </>
          )}
        />
      </div>
      <div className="mb-6">
        <Controller
          name="distance_from_nearest_railway_station"
          defaultValue=""
          control={control}
          rules={{
            required: "Distance from nearest railway station is mandatory",
            min: {
              value: 0,
              message: "Distance must be valid"
            }
          }}
          render={({ field }) => (
            <>
              <label htmlFor="distance_from_nearest_railway_station">Distance from nearest railway station: </label>
              <input {...field} type="number" placeholder="Enter distance from station..." className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none" />
              {errors.distance_from_nearest_railway_station && <p className='text-red-600'>{errors.distance_from_nearest_railway_station.message}</p>}
            </>
          )}
        />
      </div>
      <div className="mb-6">
        <Controller
          name="distance_from_bus_stop"
          defaultValue=""
          control={control}
          rules={{
            required: "Distance from Bus stop is mandatory",
            min: {
              value: 0,
              message: "Distance must be valid"
            }
          }}
          render={({ field }) => (
            <>
              <label htmlFor="distance_from_bus_stop">Distance from Bus stop: </label>
              <input {...field} type="number" placeholder="Enter distance from bus stop..." className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none" />
              {errors.distance_from_bus_stop && <p className='text-red-600'>{errors.distance_from_bus_stop.message}</p>}
            </>
          )}
        />
      </div>
      <div className="mb-6">
        <Controller
          name="description"
          defaultValue=""
          control={control}
          rules={{
            required: "Description is required",
            pattern: {
              value: /^[A-Za-z0-9\s.,#-]+$/,
              message: "Description can contain only letters, numbers and spaces"
            }
          }}
          render={({ field }) => (
            <>
              <label htmlFor="description">Description: </label>
              <input {...field} type="text" placeholder="Enter Description..." className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none" />
              {errors.description && <p className='text-red-600'>{errors.description.message}</p>}
            </>
          )}
        />
      </div>
      <div className="mb-6">
        <Controller
          name="security_deposit"
          defaultValue=""
          control={control}
          rules={{
            required: "Security Deposit Amount is required",
            min: {
              value: 0,
              message: "Deposit Amount must be valid"
            }
          }}
          render={({ field }) => (
            <>
              <label htmlFor="security_deposit">Security Deposit Amount: </label>
              <input {...field} type="number" placeholder="Enter security deposit amount..." className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none" />
              {errors.security_deposit && <p className='text-red-600'>{errors.security_deposit.message}</p>}
            </>
          )}
        />
      </div>
      {/* facilities */}
      {/* rules */}
      {/* amenities */}
      <div className="mb-6 flex gap-1.5">
        <Controller
          name="featured"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <>
              <label htmlFor="featured">Do you want your property in featured section: </label>
              <input {...field} type="radio" id="featured-yes" value="Yes" />
              <label htmlFor="featured-yes">Yes</label>
              <input {...field} type="radio" id="featured-no" value="No" />
              <label htmlFor="featured-no">No</label>
            </>
          )}
        />
      </div>
      {/* photos */}
      <div className="mb-6">
        <Controller
          name="property_photos"
          defaultValue=""
          control={control}
          rules={{
            required: "Property Photos are required"
          }}
          render={({ field }) => (
            <>
              <label htmlFor="property_photos">Upload Property Photos: </label>
              <input {...field} type="file" name="propertyImage" multiple accept="image/*" className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none" />
              {errors.property_photos && <p className='text-red-600'>{errors.property_photos.message}</p>}
            </>
          )}
        />
      </div>
    </>
  )
};

const DropdownSelectOptions = ({ name, options, title, dropdownTitle, selectedValue, setSelectedValue, errors }) => {
  const { setValue } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedValue(option);
    setIsOpen(false);
    setValue(name, option);
  }

  return (
    <>
      <label htmlFor={name}>{title}</label>
      <div className="relative inline-block text-left ml-2.5 mt-1">
        <button
          type="button"
          onClick={toggleDropdown}
          className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
          aria-haspopup="true"
          aria-expanded={isOpen ? 'true' : 'false'}
        >
          {selectedValue || dropdownTitle}
          {isOpen ?
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
        {isOpen && (
          <div id="dropdown" className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44" aria-labelledby="dropdownDefaultButton">
            <ul className="py-2 text-sm text-gray-700">
              {options.map((option, index) => (
                <li key={index}>
                  <button onClick={() => handleOptionSelect(option)} className="block px-4 py-2 hover:bg-gray-100 w-full text-left" type="button">{option}</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {errors && <p className='text-red-600'>{errors.message}</p>}
    </>
  );
};

export default Hostels