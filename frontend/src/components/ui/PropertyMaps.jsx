import { MapContainer, TileLayer } from 'react-leaflet';
import GeoCoderMarker from '@/components/ListProperties/GeoCoderMarker/GeoCoderMarker.jsx';

/**
 * Shared map component for property detail pages
 * @param {{ address: string }} props
 */
const PropertyMaps = ({ address }) => {
  return (
    <MapContainer
      center={[28.61, 77.2]}
      zoom={4}
      scrollWheelZoom={false}
      style={{ height: '25rem', width: '30rem', marginTop: '20px', zIndex: 0 }}
    >
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      <GeoCoderMarker address={address} />
    </MapContainer>
  );
};

export default PropertyMaps;
