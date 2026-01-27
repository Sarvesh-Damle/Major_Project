import { MapContainer, TileLayer } from 'react-leaflet';
// import "leaflet/dist/leaflet.css";

const Map = () => {
  const position = [19.076, 72.8777]; // Mumbai
  return (
    <MapContainer
      center={position}
      zoom={11}
      scrollWheelZoom={false}
      className='w-[100%] h-[100%] rounded-[20px] map'
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
    </MapContainer>
  );
};

export default Map;
