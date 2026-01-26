import { useEffect, useState } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import * as ELG from 'esri-leaflet-geocoder';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

const GeoCoderMarker = ({ address }) => {
  const map = useMap();
  const [position, setPosition] = useState([19.2, 72.8]);

  useEffect(() => {
    ELG.geocode()
      .text(address)
      .run((err, results) => {
        if (err) {
          console.error('Error geocoding address:', err);
          return;
        }
        if (results && results.results && results.results.length > 0) {
          const latlng = results.results[0].latlng;
          if (latlng) {
            const { lat, lng } = latlng;
            map.flyTo([lat, lng], 13, { duration: 3 });
            setPosition([lat, lng]);
          }
        } else {
          console.warn('No results found for address:', address);
        }
      });
  }, [address, map]);

  return (
    <Marker position={position} icon={DefaultIcon}>
      <Popup />
    </Marker>
  );
};

export default GeoCoderMarker;
