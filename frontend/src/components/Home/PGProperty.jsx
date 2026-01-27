import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Loader from '@/pages/Loader.jsx';
import ErrorComponent from '@/pages/ErrorComponent.jsx';
import Slider from './Slider.jsx';
import PropertyMaps from '@/components/ui/PropertyMaps.jsx';
import useFavorite from '@/hooks/useFavorite.js';
import { HiLocationMarker } from 'react-icons/hi';
import { ImProfile, ImSpoonKnife } from 'react-icons/im';
import { MdDirectionsRailway, MdDriveFileRenameOutline, MdEmail, MdOutlineNoFood } from 'react-icons/md';
import { FaPhoneAlt, FaParking } from 'react-icons/fa';
import { TbHexagonLetterA } from 'react-icons/tb';
import { FcRules } from 'react-icons/fc';
import { FaBus, FaIndianRupeeSign } from 'react-icons/fa6';
import { IoMdPeople } from 'react-icons/io';

const PGProperty = () => {
  const { pathname } = useLocation();
  const id = pathname.split('/').slice(-1)[0];
  const { liked, toggleFavorite } = useFavorite(id, 'pg');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['PG_Property', id],
    queryFn: async () => {
      const response = await axios.get(`/api/v1/pgs/find-pg?id=${id}`, { withCredentials: true });
      return response.data;
    },
  });

  if (isLoading) return <Loader />;
  if (isError) return <ErrorComponent />;

  const property = data?.data;

  return (
    <div className='flex justify-center w-full h-full my-8 singlePage'>
      <div className='w-1/2 details'>
        <div className='pr-[50px] wrapper'>
          <Slider images={property.property_photos} />
          <div className='mt-12 info'>
            <div className='flex justify-between top'>
              <div className='flex flex-col gap-5 post'>
                <h1 className='font-semibold text-2xl'>{property.pg_name}</h1>
                <div className='flex gap-[5px] items-center text-[#888] text-sm address'>
                  <HiLocationMarker className='text-blue' size={25} />
                  <span>{property.address}</span>
                </div>
                <div className='p-1 bg-orange-200 rounded-[5px] opacity-40 w-max text-xl font-light price'>
                  Rs. {property.rent_amount}
                </div>
              </div>
              <div className='flex justify-center flex-col items-center gap-5 px-12 py-2 rounded-[10px] bg-yellow-200 opacity-35 font-semibold user'>
                <div className='flex gap-5 items-center'>
                  <ImProfile />
                  <h3> Owner Info</h3>
                </div>
                <div className='flex items-center gap-5'>
                  <MdDriveFileRenameOutline />
                  <span>{property.owner_name}</span>
                </div>
                <div className='flex gap-5 items-center'>
                  <FaPhoneAlt />
                  <span>{property.owner_phoneNumber}</span>
                </div>
                <div className='flex gap-5 items-center'>
                  <MdEmail />
                  <span>{property.owner_email}</span>
                </div>
              </div>
            </div>
            <div className='mt-12 text-[#555] leading-5 bottom'>{property.description}</div>
            <button
              className='font-medium px-6 py-2 text-white border-none rounded-lg transition-all duration-200 ease-in hover:cursor-pointer transform hover:scale-105 bg-blue-gradient mt-10'
              value={liked}
              onClick={toggleFavorite}
            >
              {liked ? 'Remove from Favourites' : 'Add Property to Favourites'}
            </button>
          </div>
        </div>
      </div>
      <div className='bg-[#fcf5f3] w-1/3 features'>
        <div className='py-5 flex flex-col gap-5 wrapper'>
          <p className='font-bold text-lg mb-[10px] flex justify-center title'>General</p>
          <div className='flex flex-col gap-5 py-5 px-2 mx-3 bg-white rounded-[10px] listVertical'>
            <div className='flex items-center gap-[10px] feature'>
              <TbHexagonLetterA />
              <div className='featureText'>
                <span className='font-bold'>Amenities</span>
                <div className='flex gap-5'>
                  {property.amenities.map((amenity, index) => (
                    <p key={index} className='text-sm'>
                      {amenity}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div className='flex items-center gap-[10px] feature'>
              <FcRules />
              <div className='featureText'>
                <span className='font-bold'>Rules</span>
                <div className='flex gap-5'>
                  {property.rules.map((rule, index) => (
                    <p key={index} className='text-sm'>
                      {rule}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div className='flex items-center gap-[10px] feature'>
              <FaIndianRupeeSign />
              <div className='featureText'>
                <span className='font-bold'>Deposit</span>
                <p className='text-sm'>{property.security_deposit}</p>
              </div>
            </div>
          </div>
          <p className='font-bold text-lg mb-[10px] flex justify-center title'>Room Details</p>
          <div className='flex gap-5 py-5 px-2 mx-3 bg-white rounded-[10px] rooms'>
            <div className='flex items-center gap-[10px] room'>
              <MdOutlineNoFood />
              <p>Food Included: {property.food_included ? 'Yes' : 'No'}</p>
              <FaParking />
              <p>Parking Available: {property.parking_availability ? 'Yes' : 'No'}</p>
              <IoMdPeople />
              <p>Preferred Tenants: {property.preferred_tennats}</p>
            </div>
            {property.food_availability && (
              <div className='flex items-center gap-[10px] room'>
                {property.food_included ? <ImSpoonKnife /> : null}
                <div className='flex gap-5'>
                  {property.food_availability.map((type, index) => (
                    <p key={index}>{type}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
          <p className='font-bold text-lg mb-[10px] flex justify-center title'>Near By Places</p>
          <div className='flex gap-5 py-5 px-2 mx-3 bg-white rounded-[10px] listHorizontal'>
            <div className='flex items-center gap-[10px] feature'>
              <MdDirectionsRailway />
              <div className='featureText'>
                <span>Railway Station</span>
                <p>{property.distance_from_nearest_railway_station}m away</p>
              </div>
            </div>
            <div className='flex items-center gap-[10px] feature'>
              <FaBus />
              <div className='featureText'>
                <span>Bus Stop</span>
                <p>{property.distance_from_bus_stop}m away</p>
              </div>
            </div>
          </div>
          <p className='font-bold text-lg mb-[10px] flex justify-center title'>Location</p>
          <div className='mapContainer'>
            <PropertyMaps address={property.address} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PGProperty;
