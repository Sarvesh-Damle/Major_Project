import { Controller, useFormContext } from 'react-hook-form';
import MultiSelect from './MultiSelect';
import { flat_amenities, flat_types, furnished_status, rules, states } from '@/data/Property';
import { DropdownSelectOptions } from './Hostels';
import { useState } from 'react';

const Flats = () => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext();
  const [selectedFlatType, setSelectedFlatType] = useState('');
  const [selectedFurnishedType, setSelectedFurnishedType] = useState('');
  const [selectedState, setSelectedState] = useState('');

  return (
    <>
      {/* city */}
      <div className='mb-6'>
        <Controller
          name='city'
          defaultValue=''
          control={control}
          rules={{
            required: 'City is required',
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: 'City must contain only letters and spaces',
            },
          }}
          render={({ field }) => (
            <>
              <label htmlFor='city'>City: </label>
              <input
                {...field}
                type='text'
                placeholder='Enter City...'
                className='border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none'
              />
              {errors.city && <p className='text-red-600'>{errors.city.message}</p>}
            </>
          )}
        />
      </div>
      <div className='mb-6'>
        <Controller
          name='locality'
          defaultValue=''
          control={control}
          rules={{
            required: 'Locality is required',
            pattern: {
              value: /^[A-Za-z0-9\s.,#-]+$/,
              message: 'Locality can contain only letters, numbers and spaces',
            },
          }}
          render={({ field }) => (
            <>
              <label htmlFor='locality'>Locality: </label>
              <input
                {...field}
                type='text'
                placeholder='Enter locality...'
                className='border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none'
              />
              {errors.locality && <p className='text-red-600'>{errors.locality.message}</p>}
            </>
          )}
        />
      </div>
      <div className='mb-6'>
        <DropdownSelectOptions
          name={'state'}
          title={'State: '}
          dropdownTitle={'Select State'}
          options={states}
          selectedValue={selectedState}
          setSelectedValue={setSelectedState}
          errors={errors.state}
        />
      </div>
      <div className='mb-6'>
        <Controller
          name='pincode'
          defaultValue=''
          control={control}
          rules={{
            required: 'Pincode is required',
            minLength: {
              value: 6,
              message: 'Pincode must be of only 6 digits',
            },
            maxLength: {
              value: 6,
              message: 'Pincode must be of only 6 digits',
            },
          }}
          render={({ field }) => (
            <>
              <label htmlFor='pincode'>Pincode: </label>
              <input
                {...field}
                type='number'
                placeholder='Enter Pincode...'
                className='border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none'
              />
              {errors.pincode && <p className='text-red-600'>{errors.pincode.message}</p>}
            </>
          )}
        />
      </div>
      {/* address */}
      <div className='mb-6'>
        <Controller
          name='address'
          defaultValue=''
          control={control}
          rules={{
            required: 'Address is required',
            pattern: {
              value: /^[A-Za-z0-9\s.,#-]+$/,
              message: 'Address can contain only letters, numbers and spaces',
            },
          }}
          render={({ field }) => (
            <>
              <label htmlFor='address'>Address: </label>
              <input
                {...field}
                type='text'
                placeholder='Enter Address...'
                className='border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none'
              />
              {errors.address && <p className='text-red-600'>{errors.address.message}</p>}
            </>
          )}
        />
      </div>
      {/* flat_type */}
      <div className='mb-6'>
        <DropdownSelectOptions
          name={'flat_type'}
          title='Type of Flat: '
          dropdownTitle='Select Type of Flat'
          options={flat_types}
          selectedValue={selectedFlatType}
          setSelectedValue={setSelectedFlatType}
          errors={errors.room_type}
        />
      </div>
      {/* rent_amount */}
      <div className='mb-6'>
        <Controller
          name='rent_amount'
          defaultValue=''
          control={control}
          rules={{
            required: 'Rent Amount is required',
            min: {
              value: 0,
              message: 'Rent Amount must be valid',
            },
          }}
          render={({ field }) => (
            <>
              <label htmlFor='rent_amount'>Rent Amount: </label>
              <input
                {...field}
                type='number'
                placeholder='Enter rent amount...'
                className='border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none'
              />
              {errors.rent_amount && <p className='text-red-600'>{errors.rent_amount.message}</p>}
            </>
          )}
        />
      </div>
      {/* distance_from_nearest_railway_station */}
      <div className='mb-6'>
        <Controller
          name='distance_from_nearest_railway_station'
          defaultValue=''
          control={control}
          rules={{
            required: 'Distance from nearest railway station is mandatory',
            min: {
              value: 0,
              message: 'Distance must be valid',
            },
          }}
          render={({ field }) => (
            <>
              <label htmlFor='distance_from_nearest_railway_station'>
                Distance from nearest railway station: (in meters)
              </label>
              <input
                {...field}
                type='number'
                placeholder='Enter distance from station...'
                className='border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none'
              />
              {errors.distance_from_nearest_railway_station && (
                <p className='text-red-600'>
                  {errors.distance_from_nearest_railway_station.message}
                </p>
              )}
            </>
          )}
        />
      </div>
      {/* distance_from_bus_stop */}
      <div className='mb-6'>
        <Controller
          name='distance_from_bus_stop'
          defaultValue=''
          control={control}
          rules={{
            required: 'Distance from Bus stop is mandatory',
            min: {
              value: 0,
              message: 'Distance must be valid',
            },
          }}
          render={({ field }) => (
            <>
              <label htmlFor='distance_from_bus_stop'>Distance from Bus stop: (in meters)</label>
              <input
                {...field}
                type='number'
                placeholder='Enter distance from bus stop...'
                className='border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none'
              />
              {errors.distance_from_bus_stop && (
                <p className='text-red-600'>{errors.distance_from_bus_stop.message}</p>
              )}
            </>
          )}
        />
      </div>
      {/* description */}
      <div className='mb-6'>
        <Controller
          name='description'
          defaultValue=''
          control={control}
          rules={{
            required: 'Description is required',
            pattern: {
              value: /^[A-Za-z0-9\s.,#-]+$/,
              message: 'Description can contain only letters, numbers and spaces',
            },
          }}
          render={({ field }) => (
            <>
              <label htmlFor='description'>Description: </label>
              <input
                {...field}
                type='text'
                placeholder='Enter Description...'
                className='border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none'
              />
              {errors.description && <p className='text-red-600'>{errors.description.message}</p>}
            </>
          )}
        />
      </div>
      {/* furnished_status */}
      <div className='mb-6'>
        <DropdownSelectOptions
          name={'furnished_status'}
          title='Furnished Status: '
          dropdownTitle='Select status'
          options={furnished_status}
          selectedValue={selectedFurnishedType}
          setSelectedValue={setSelectedFurnishedType}
          errors={errors.room_type}
        />
      </div>
      {/* flat_area */}
      <div className='mb-6'>
        <Controller
          name='flat_area'
          defaultValue=''
          control={control}
          rules={{
            required: 'Flat area in sqft is required',
            min: {
              value: 0,
              message: 'Area must be valid',
            },
          }}
          render={({ field }) => (
            <>
              <label htmlFor='flat_area'>Area of Flat: (in sqft)</label>
              <input
                {...field}
                type='number'
                placeholder='Enter flat area...'
                className='border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none'
              />
              {errors.flat_area && <p className='text-red-600'>{errors.flat_area.message}</p>}
            </>
          )}
        />
      </div>
      {/* flat_floor_number */}
      <div className='mb-6'>
        <Controller
          name='flat_floor_number'
          defaultValue=''
          control={control}
          rules={{
            required: 'Flat floor number is required',
            min: {
              value: 0,
              message: 'Floor Number must be valid',
            },
          }}
          render={({ field }) => (
            <>
              <label htmlFor='flat_floor_number'>Floor Number: </label>
              <input
                {...field}
                type='number'
                placeholder='Enter floor number...'
                className='border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none'
              />
              {errors.flat_floor_number && (
                <p className='text-red-600'>{errors.flat_floor_number.message}</p>
              )}
            </>
          )}
        />
      </div>
      {/* parking_availability */}
      <div className='mb-6 flex gap-1.5'>
        <Controller
          name='parking_availability'
          defaultValue=''
          control={control}
          rules={{
            required: 'Parking Availability information is required',
          }}
          render={({ field }) => (
            <>
              <label htmlFor='parking_availability'>Is Parking Available: </label>
              <input {...field} type='radio' id='parking_availability_yes' value='Yes' />
              <label htmlFor='parking_availability_yes'>Yes</label>
              <input {...field} type='radio' id='parking_availability_no' value='No' />
              <label htmlFor='parking_availability_no'>No</label>
              {errors.parking_availability && (
                <p className='text-red-600'>{errors.parking_availability.message}</p>
              )}
            </>
          )}
        />
      </div>
      {/* security_deposit */}
      <div className='mb-6'>
        <Controller
          name='security_deposit'
          defaultValue=''
          control={control}
          rules={{
            required: 'Security Deposit Amount is required',
            min: {
              value: 0,
              message: 'Deposit Amount must be valid',
            },
          }}
          render={({ field }) => (
            <>
              <label htmlFor='security_deposit'>Security Deposit Amount: </label>
              <input
                {...field}
                type='number'
                placeholder='Enter security deposit amount...'
                className='border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none'
              />
              {errors.security_deposit && (
                <p className='text-red-600'>{errors.security_deposit.message}</p>
              )}
            </>
          )}
        />
      </div>
      {/* preferred_tennats */}
      <div className='mb-6'>
        <Controller
          name='preferred_tennats'
          defaultValue=''
          control={control}
          rules={{
            required: 'Please provide information about type of tennats you want',
          }}
          render={({ field }) => (
            <>
              <div className='flex gap-1.5 mt-1'>
                <label htmlFor='preferred_tennats'>Preferred Tenants: </label>
                <input {...field} type='radio' id='preferred_tennats_family' value='Family' />
                <label htmlFor='preferred_tennats_family'>Family</label>
                <input {...field} type='radio' id='preferred_tennats_students' value='Students' />
                <label htmlFor='preferred_tennats_students'>Students</label>
                <input {...field} type='radio' id='preferred_tennats_bachelors' value='Bachelors' />
                <label htmlFor='preferred_tennats_bachelors'>Bachelors</label>
                {errors.preferred_tennats && (
                  <p className='text-red-600'>{errors.preferred_tennats.message}</p>
                )}
              </div>
            </>
          )}
        />
      </div>
      {/* amenities */}
      <div className='mb-6'>
        <Controller
          name='amenities'
          defaultValue={[]}
          control={control}
          render={({ field }) => (
            <>
              <MultiSelect
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                title='Select Amenities'
                data={flat_amenities}
                onSelect={(value) => setValue('amenities', value)}
              />
              {errors.amenities && <p className='text-red-600'>{errors.amenities.message}</p>}
            </>
          )}
        />
      </div>
      {/* rules */}
      <div className='mb-6'>
        <Controller
          name='rules'
          defaultValue={[]}
          control={control}
          render={({ field }) => (
            <>
              <MultiSelect
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                title='Select Rules'
                data={rules}
                onSelect={(value) => setValue('rules', value)}
              />
              {errors.rules && <p className='text-red-600'>{errors.rules.message}</p>}
            </>
          )}
        />
      </div>
      {/* featured */}
      <div className='mb-6 flex gap-1.5'>
        <Controller
          name='featured'
          defaultValue=''
          control={control}
          render={({ field }) => (
            <>
              <label htmlFor='featured'>Do you want your property in featured section: </label>
              <input {...field} type='radio' id='featured-yes' value='Yes' />
              <label htmlFor='featured-yes'>Yes</label>
              <input {...field} type='radio' id='featured-no' value='No' />
              <label htmlFor='featured-no'>No</label>
            </>
          )}
        />
      </div>
      {/* property_photos */}
      <div className='mb-6'>
        <Controller
          name='property_photos'
          defaultValue=''
          control={control}
          rules={{
            required: 'Property Photos are required',
          }}
          render={({ field }) => (
            <>
              <label htmlFor='property_photos'>Upload Property Photos: </label>
              <input
                {...field}
                type='file'
                name='propertyImage'
                multiple
                accept='image/*'
                className='border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none'
              />
              {errors.property_photos && (
                <p className='text-red-600'>{errors.property_photos.message}</p>
              )}
            </>
          )}
        />
      </div>
    </>
  );
};

export default Flats;
