import { useLoadScript } from "@react-google-maps/api";

const Map = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,

    });
    if (!isLoaded) {
        return <div>Loading...</div>
    }
    return (
        <div>Map</div>
    )
}

export default Map