import { useEffect, useState, memo } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import * as ELG from 'esri-leaflet-geocoder';
import { getOptimizedUrl } from '@/utils/cloudinaryUrl.js';

// Custom marker icons for different property types
const createIcon = (color) =>
  L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });

const markerColors = {
  hostel: '#4066ff',
  pg: '#10b981',
  flat: '#f59e0b',
};

const PropertyMarker = memo(({ property, type }) => {
  const navigate = useNavigate();
  const [position, setPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const name = type === 'hostel' ? property.hostel_name : type === 'pg' ? property.pg_name : `${property.flat_type} Flat`;
  const url = type === 'hostel' ? `/hostels/${property._id}` : type === 'pg' ? `/pgs/${property._id}` : `/flats/${property._id}`;

  useEffect(() => {
    if (!property.address) {
      setIsLoading(false);
      return;
    }

    ELG.geocode()
      .text(property.address)
      .run((err, results) => {
        setIsLoading(false);
        if (err) return;
        if (results?.results?.length > 0) {
          const latlng = results.results[0].latlng;
          if (latlng) {
            setPosition([latlng.lat, latlng.lng]);
          }
        }
      });
  }, [property.address]);

  if (isLoading || !position) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Marker position={position} icon={createIcon(markerColors[type])}>
      <Popup>
        <div className='w-56'>
          {property.property_photos?.[0] && (
            <img
              src={getOptimizedUrl(property.property_photos[0], { width: 200 })}
              alt={name}
              className='w-full h-28 object-cover rounded-t-lg'
            />
          )}
          <div className='p-2'>
            <h3 className='font-semibold text-sm truncate'>{name}</h3>
            <p className='text-xs text-gray-500 truncate'>{property.locality}, {property.city}</p>
            <p className='text-sm font-bold text-blue-600 mt-1'>{formatPrice(property.rent_amount)}/month</p>
            <button
              onClick={() => navigate(url)}
              className='w-full mt-2 px-3 py-1.5 text-xs text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors'
            >
              View Details
            </button>
          </div>
        </div>
      </Popup>
    </Marker>
  );
});

PropertyMarker.displayName = 'PropertyMarker';

export default PropertyMarker;
