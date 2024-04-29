import { Controller, useFormContext } from "react-hook-form";
import { useState } from "react";
import { hostel_types, pg_amenities, room_types, rules, states } from "../../../data/Property";
import MultiSelect from "./MultiSelect";

const Hostels = () => {
  const { control, formState: { errors }, setValue } = useFormContext();
  const [imagesPreview, setImagesPreview] = useState([]);

  const [selectedHostelType, setSelectedHostelType] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImagesPreview(files.map(file => URL.createObjectURL(file)));
  };

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
          name="locality"
          defaultValue=""
          control={control}
          rules={{
            required: "Locality is required",
            pattern: {
              value: /^[A-Za-z0-9\s.,#-]+$/,
              message: "Locality can contain only letters, numbers and spaces"
            }
          }}
          render={({ field }) => (
            <>
              <label htmlFor="locality">Locality: </label>
              <input {...field} type="text" placeholder="Enter locality..." className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none" />
              {errors.locality && <p className='text-red-600'>{errors.locality.message}</p>}
            </>
          )}
        />
      </div>
      <div className="mb-6">
        <DropdownSelectOptions
          name={"state"}
          title={"State: "}
          dropdownTitle={"Select State"}
          options={states}
          selectedValue={selectedState}
          setSelectedValue={(setSelectedState)}
          errors={errors.state}
        />
      </div>
      <div className="mb-6">
        <Controller
          name="pincode"
          defaultValue=""
          control={control}
          rules={{
            required: "Pincode is required",
            minLength: {
              value: 6,
              message: "Pincode must be of only 6 digits"
            },
            maxLength: {
              value: 6,
              message: "Pincode must be of only 6 digits"
            }
          }}
          render={({ field }) => (
            <>
              <label htmlFor="pincode">Pincode: </label>
              <input {...field} type="number" placeholder="Enter Pincode..." className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none" />
              {errors.pincode && <p className='text-red-600'>{errors.pincode.message}</p>}
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
              <input {...field} type="text" placeholder="Enter Full Address..." className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none" />
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
          options={hostel_types}
          selectedValue={selectedHostelType}
          setSelectedValue={(setSelectedHostelType)}
          errors={errors.type_of_hostel}
        />
      </div>
      <div className="mb-6">
        <Controller
          name="room_type"
          defaultValue={[]}
          control={control}
          render={({ field }) => (
            <>
              <MultiSelect value={field.value} onChange={field.onChange} onBlur={field.onBlur} title="Select types of Rooms Provided" data={room_types} onSelect={value => setValue("room_type", value)} />
              {errors.room_type && <p className="text-red-600">{errors.room_type.message}</p>}
            </>
          )}
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
              <label htmlFor="distance_from_nearest_railway_station">Distance from nearest railway station: (in meters)</label>
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
              <label htmlFor="distance_from_bus_stop">Distance from nearest Bus stop: (in meters)</label>
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
              <label htmlFor="description">Description about the property: </label>
              <input {...field} type="text" placeholder="Enter Description..." className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none" />
              {errors.description && <p className='text-red-600'>{errors.description.message}</p>}
            </>
          )}
        />
      </div>
      <div className="mb-6">
        <Controller
          name="amenities"
          defaultValue={[]}
          control={control}
          render={({ field }) => (
            <>
              <MultiSelect value={field.value} onChange={field.onChange} onBlur={field.onBlur} title="Select Amenities" data={pg_amenities} onSelect={value => setValue("amenities", value)} />
              {errors.amenities && <p className="text-red-600">{errors.amenities.message}</p>}
            </>
          )}
        />
      </div>
      <div className="mb-6">
        <Controller
          name="rules"
          defaultValue={[]}
          control={control}
          render={({ field }) => (
            <>
              <MultiSelect value={field.value} onChange={field.onChange} onBlur={field.onBlur} title="Select Rules" data={rules} onSelect={value => setValue("rules", value)} />
              {errors.rules && <p className="text-red-600">{errors.rules.message}</p>}
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

      <div className="mb-6">
        <Controller
          name="property_photos"
          defaultValue={[]}
          control={control}
          rules={{
            required: "Property Photos are required",
          }}
          render={({ field }) => (
            <>
              <label htmlFor="property_photos">Upload Property Photos: </label>
              <div className="flex">
                <input
                  {...field}
                  type="file"
                  name="property_photos"
                  multiple
                  accept="image/*"
                  value=""
                  onChange={(e) => { field.onChange(Array.from(e.target.files)); createProductImagesChange(e); }}
                  className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
                />

              </div><div className="w-full my-2 overflow-auto flex gap-x-8">
                {imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt={`Property Preview ${index}`} className="w-40 h-40" />
                ))}
              </div>
              {errors.property_photos && <p className='text-red-600'>{errors.property_photos.message}</p>}
            </>
          )}
        />
      </div>
    </>
  )
};

export const DropdownSelectOptions = ({ name, options, title, dropdownTitle, selectedValue, setSelectedValue, errors }) => {
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
          className="text-white bg-blue-gradient bg-opacity-50 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
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