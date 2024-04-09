import { Controller, useFormContext } from "react-hook-form";
import { useState } from "react";
import MultiSelect from "./MultiSelect";
import { pg_amenities, rules, states } from "../../../data/Property.js";
import { DropdownSelectOptions } from "./Hostels.jsx";

const PGs = () => {
  const { control, formState: { errors }, setValue } = useFormContext();

  const [foodIncluded, setFoodIncluded] = useState(false);
  const [selectedState, setSelectedState] = useState("");

  return (
    <>
      {/* pg_name */}
      <div className="mb-6">
        <Controller
          name="pg_name"
          defaultValue=""
          control={control}
          rules={{
            required: "PG Name is required",
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: "Name must contain only letters and spaces"
            }
          }}
          render={({ field }) => (
            <>
              <label htmlFor="pg_name">PG Name: </label>
              <input {...field} type="text" placeholder="Enter PG name..." className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none" />
              {errors.pg_name && <p className='text-red-600'>{errors.pg_name.message}</p>}
            </>
          )}
        />
      </div>
      {/* city */}
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
      {/* address */}
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
      {/* description */}
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
      {/* distance_from_nearest_railway_station */}
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
      {/* distance_from_bus_stop */}
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
              <label htmlFor="distance_from_bus_stop">Distance from Bus stop: (in meters)</label>
              <input {...field} type="number" placeholder="Enter distance from bus stop..." className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none" />
              {errors.distance_from_bus_stop && <p className='text-red-600'>{errors.distance_from_bus_stop.message}</p>}
            </>
          )}
        />
      </div>
      {/* rent_amount */}
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
      {/* security_deposit */}
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
      {/* food_included */}
      <div className="mb-6 flex gap-1.5">
        <Controller
          name="food_included"
          defaultValue=""
          control={control}
          rules={{
            required: "Is Food included information is required"
          }}
          render={({ field }) => (
            <>
              <label htmlFor="food_included">Food Included: </label>
              <input {...field} type="radio" id="food_included_yes" value="Yes" onClick={() => setFoodIncluded(true)} />
              <label htmlFor="food_included_yes">Yes</label>
              <input {...field} type="radio" id="food_included_no" value="No" onClick={() => setFoodIncluded(false)} />
              <label htmlFor="food_included_no">No</label>
              {errors.food_included && <p className='text-red-600'>{errors.food_included.message}</p>}
            </>
          )}
        />
      </div>
      {/* food_availability */}
      <div className="mb-6">
        <Controller
          name="food_availability"
          defaultValue={[]}
          control={control}
          render={({ field }) => (
            <>
              {foodIncluded && (
                <div className="flex gap-1.5 mt-1">
                  <label>Select food availability: </label>
                  <input
                    type="checkbox"
                    id="food_options_breakfast"
                    value="Breakfast"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (e.target.checked) {
                        const updatedValue = [...field.value, value];
                        field.onChange(updatedValue);
                      } else {
                        const updatedValue = field.value.filter((item) => item !== value);
                        field.onChange(updatedValue);
                      }
                    }}
                  />
                  <label htmlFor="food_options_breakfast">Breakfast</label>
                  <input
                    type="checkbox"
                    id="food_options_lunch"
                    value="Lunch"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (e.target.checked) {
                        const updatedValue = [...field.value, value];
                        field.onChange(updatedValue);
                      } else {
                        const updatedValue = field.value.filter((item) => item !== value);
                        field.onChange(updatedValue);
                      }
                    }}
                  />
                  <label htmlFor="food_options_lunch">Lunch</label>
                  <input
                    type="checkbox"
                    id="food_options_dinner"
                    value="Dinner"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (e.target.checked) {
                        const updatedValue = [...field.value, value];
                        field.onChange(updatedValue);
                      } else {
                        const updatedValue = field.value.filter((item) => item !== value);
                        field.onChange(updatedValue);
                      }
                    }}
                  />
                  <label htmlFor="food_options_dinner">Dinner</label>
                </div>
              )}
              {foodIncluded && errors.food_availability && (
                <p className="text-red-600">{errors.food_availability.message}</p>
              )}
            </>
          )}
        />
      </div>
      {/* parking_availability */}
      <div className="mb-6 flex gap-1.5">
        <Controller
          name="parking_availability"
          defaultValue=""
          control={control}
          rules={{
            required: "Parking Availability information is required"
          }}
          render={({ field }) => (
            <>
              <label htmlFor="parking_availability">Is Parking Available: </label>
              <input {...field} type="radio" id="parking_availability_yes" value="Yes" />
              <label htmlFor="parking_availability_yes">Yes</label>
              <input {...field} type="radio" id="parking_availability_no" value="No" />
              <label htmlFor="parking_availability_no">No</label>
              {errors.parking_availability && <p className='text-red-600'>{errors.parking_availability.message}</p>}
            </>
          )}
        />
      </div>
      {/* preferred_tennats */}
      <div className="mb-6">
        <Controller
          name="preferred_tennats"
          defaultValue=""
          control={control}
          rules={{
            required: "Please provide information about type of tennats you want"
          }}
          render={({ field }) => (
            <>
              <div className="flex gap-1.5 mt-1"><label htmlFor="preferred_tennats">Preferred Tenants: </label>
                <input {...field} type="radio" id="preferred_tennats_girls" value="Girls" />
                <label htmlFor="preferred_tennats_girls">Girls</label>
                <input {...field} type="radio" id="preferred_tennats_boys" value="Boys" />
                <label htmlFor="preferred_tennats_boys">Boys</label>
                {errors.preferred_tennats && <p className='text-red-600'>{errors.preferred_tennats.message}</p>}
              </div>
            </>
          )}
        />
      </div>
      {/* amenities */}
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
      {/* rules */}
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
      {/* featured */}
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
      {/* property_photos */}
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
}

export default PGs;