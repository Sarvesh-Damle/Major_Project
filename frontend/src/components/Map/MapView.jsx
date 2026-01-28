import { useState, useMemo } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useLocation } from 'react-router-dom';
import {
  usePropertiesHostels,
  usePropertiesPGs,
  usePropertiesFlats,
} from '@/hooks/useProperties.js';
import PropertyMarker from './PropertyMarker.jsx';
import { CardSkeletonGrid } from '@/components/ui/CardSkeleton.jsx';
import 'leaflet/dist/leaflet.css';

const MUMBAI_CENTER = [19.076, 72.8777];

const MapView = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const city = queryParams.get('city') || 'Mumbai';

  const [selectedTypes, setSelectedTypes] = useState(['hostel', 'pg', 'flat']);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });

  const filters = useMemo(
    () => ({
      minPrice: priceRange.min || null,
      maxPrice: priceRange.max < 100000 ? priceRange.max : null,
      limit: 50,
    }),
    [priceRange]
  );

  const { data: hostelsData, isLoading: hostelsLoading } = usePropertiesHostels(city, filters);
  const { data: pgsData, isLoading: pgsLoading } = usePropertiesPGs(city, filters);
  const { data: flatsData, isLoading: flatsLoading } = usePropertiesFlats(city, filters);

  const isLoading = hostelsLoading || pgsLoading || flatsLoading;

  const hostels = useMemo(
    () => hostelsData?.data?.hostels || hostelsData?.data || [],
    [hostelsData]
  );
  const pgs = useMemo(() => pgsData?.data?.pgs || pgsData?.data || [], [pgsData]);
  const flats = useMemo(() => flatsData?.data?.flats || flatsData?.data || [], [flatsData]);

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const totalCount = useMemo(() => {
    let count = 0;
    if (selectedTypes.includes('hostel')) count += hostels.length;
    if (selectedTypes.includes('pg')) count += pgs.length;
    if (selectedTypes.includes('flat')) count += flats.length;
    return count;
  }, [selectedTypes, hostels, pgs, flats]);

  const typeButtons = [
    { type: 'hostel', label: 'Hostels', color: 'bg-blue-500', count: hostels.length },
    { type: 'pg', label: 'PGs', color: 'bg-emerald-500', count: pgs.length },
    { type: 'flat', label: 'Flats', color: 'bg-amber-500', count: flats.length },
  ];

  return (
    <div className='h-[calc(100vh-80px)] flex flex-col'>
      {/* Filter Bar */}
      <div className='bg-white border-b px-4 py-3 flex flex-wrap items-center gap-4'>
        <div className='flex items-center gap-2'>
          <span className='text-sm font-medium text-gray-700'>Property Type:</span>
          <div className='flex gap-2'>
            {typeButtons.map(({ type, label, color, count }) => (
              <button
                key={type}
                onClick={() => toggleType(type)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedTypes.includes(type)
                    ? `${color} text-white`
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {label} ({count})
              </button>
            ))}
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <span className='text-sm font-medium text-gray-700'>Price:</span>
          <input
            type='number'
            placeholder='Min'
            value={priceRange.min || ''}
            onChange={(e) =>
              setPriceRange((prev) => ({ ...prev, min: Number(e.target.value) || 0 }))
            }
            className='w-24 px-2 py-1.5 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
          />
          <span className='text-gray-400'>-</span>
          <input
            type='number'
            placeholder='Max'
            value={priceRange.max < 100000 ? priceRange.max : ''}
            onChange={(e) =>
              setPriceRange((prev) => ({ ...prev, max: Number(e.target.value) || 100000 }))
            }
            className='w-24 px-2 py-1.5 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
          />
        </div>

        <div className='ml-auto text-sm text-gray-500'>
          {isLoading ? 'Loading...' : `${totalCount} properties in ${city}`}
        </div>
      </div>

      {/* Map */}
      <div className='flex-1 relative'>
        {isLoading && (
          <div className='absolute inset-0 bg-white/80 z-[1000] flex items-center justify-center'>
            <CardSkeletonGrid count={1} />
          </div>
        )}

        <MapContainer
          center={MUMBAI_CENTER}
          zoom={11}
          scrollWheelZoom={true}
          className='w-full h-full'
          style={{ zIndex: 1 }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />

          {selectedTypes.includes('hostel') &&
            hostels.map((property) => (
              <PropertyMarker key={`hostel-${property._id}`} property={property} type='hostel' />
            ))}

          {selectedTypes.includes('pg') &&
            pgs.map((property) => (
              <PropertyMarker key={`pg-${property._id}`} property={property} type='pg' />
            ))}

          {selectedTypes.includes('flat') &&
            flats.map((property) => (
              <PropertyMarker key={`flat-${property._id}`} property={property} type='flat' />
            ))}
        </MapContainer>

        {/* Legend */}
        <div className='absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 z-[1000]'>
          <p className='text-xs font-semibold text-gray-700 mb-2'>Legend</p>
          <div className='space-y-1'>
            <div className='flex items-center gap-2'>
              <div className='w-4 h-4 rounded-full bg-blue-500'></div>
              <span className='text-xs text-gray-600'>Hostels</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-4 h-4 rounded-full bg-emerald-500'></div>
              <span className='text-xs text-gray-600'>PGs</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-4 h-4 rounded-full bg-amber-500'></div>
              <span className='text-xs text-gray-600'>Flats</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
