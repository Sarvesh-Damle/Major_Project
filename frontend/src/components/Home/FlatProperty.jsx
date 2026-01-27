import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Loader from '@/pages/Loader.jsx';
import ErrorComponent from '@/pages/ErrorComponent.jsx';
import Slider from './Slider.jsx';
import PropertyMaps from '@/components/ui/PropertyMaps.jsx';
import useFavorite from '@/hooks/useFavorite.js';
import { useTrackPropertyView } from '@/hooks/useRecentlyViewed.js';
import ShareButtons from '@/components/ui/ShareButtons.jsx';
import ReviewList from '@/components/ui/ReviewList.jsx';
import { HiLocationMarker } from 'react-icons/hi';
import { ImProfile } from 'react-icons/im';
import { MdDirectionsRailway, MdDriveFileRenameOutline, MdEmail } from 'react-icons/md';
import { FaBus, FaPhoneAlt, FaParking } from 'react-icons/fa';
import { TbHexagonLetterA } from 'react-icons/tb';
import { FcRules } from 'react-icons/fc';
import { FaIndianRupeeSign, FaBuilding } from 'react-icons/fa6';
import { GiSofa } from 'react-icons/gi';
import { RxDimensions } from 'react-icons/rx';

const FlatProperty = () => {
  const { pathname } = useLocation();
  const id = pathname.split('/').slice(-1)[0];
  const { liked, toggleFavorite } = useFavorite(id, 'flat');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['Flat_Property', id],
    queryFn: async () => {
      const response = await axios.get(`/api/v1/flats/find-flat?id=${id}`, {
        withCredentials: true,
      });
      return response.data;
    },
  });

  const property = data?.data;
  useTrackPropertyView(property, 'flat');

  if (isLoading) return <Loader />;
  if (isError) return <ErrorComponent />;

  return (
    <div className='flex flex-wrap justify-center w-full h-full my-8 singlePage'>
      <div className='w-1/2 max-lg:w-full details'>
        <div className='pr-[50px] wrapper'>
          <Slider images={property.property_photos} />
          <div className='mt-12 info'>
            <div className='flex justify-between top'>
              <div className='flex flex-col gap-5 post'>
                <h1 className='font-semibold text-2xl'>{property.flat_type}</h1>
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
            <div className='flex items-center gap-4 mt-10'>
              <button
                className='btn-primary'
                value={liked}
                onClick={toggleFavorite}
              >
                {liked ? 'Remove from Favourites' : 'Add Property to Favourites'}
              </button>
              <ShareButtons
                title={`${property.flat_type} Flat`}
                text={`Check out this ${property.flat_type} Flat - Rs. ${property.rent_amount}/month at ${property.address}`}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='bg-[#fcf5f3] w-1/3 max-lg:w-full features'>
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
              <GiSofa />
              <p>{property.furnished_status}</p>
              <RxDimensions />
              <p>{property.flat_area} sqft</p>
              <FaBuilding />
              <p>Floor Number: {property.flat_floor_number}</p>
              <FaParking />
              <p>Parking Available: {property.parking_availability ? 'Yes' : 'No'}</p>
            </div>
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
      <div className='w-full px-8 pb-8'>
        <ReviewList propertyId={id} propertyType='flat' />
      </div>
    </div>
  );
};

export default FlatProperty;
