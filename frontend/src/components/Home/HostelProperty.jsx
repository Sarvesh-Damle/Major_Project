import { MapContainer, TileLayer } from "react-leaflet"
import GeoCoderMarker from "../ListProperties/GeoCoderMarker/GeoCoderMarker.jsx"
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "../Pages/Loader.jsx";
import ErrorComponent from "../Pages/ErrorComponent.jsx";
import Slider from "./Slider.jsx";
import { HiLocationMarker } from "react-icons/hi";
import { FcRules } from "react-icons/fc";
import { FaIndianRupeeSign, FaBus } from "react-icons/fa6";
import { FaBuilding, FaPhoneAlt } from "react-icons/fa";
import { IoBed } from "react-icons/io5";
import { MdDirectionsRailway, MdEmail, MdDriveFileRenameOutline } from "react-icons/md";
import { TbHexagonLetterA } from "react-icons/tb";
import { ImProfile } from "react-icons/im";
import { useContext, useState } from "react";
import { loginContext } from "../../provider/authContext.js";
import { toast } from "react-toastify";

const HostelProperty = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];
  const { isLoggedIn } = useContext(loginContext);
  const [liked, setLiked] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["Hostel_Property", id],
    queryFn: async () => {
      const response = await axios.get(`/api/v1/hostels/find-hostel?id=${id}`, { withCredentials: true });
      return response.data;
    }
  })
  const handleLike = async () => {
    if (isLoggedIn.login) {
      setLiked(prev => !prev);
      liked===false ? await axios.post("/api/v1/favourites/add-favourites", {propertyId: id, propertyTag: "hostel"}, {withCredentials: true}) : null;
      toast.success("Added property to favourites!!");
    } else {
      toast.error("Please login!!", { position: "bottom-right" })
    }
  }

  if (isLoading) return <Loader />
  if (isError) return <ErrorComponent />

  return (
    <div className="flex justify-center w-full h-full my-8 singlePage">
      <div className="w-1/2 details">
        <div className="pr-[50px] wrapper">
          <Slider images={data?.data.property_photos} />
          <div className="mt-12 info">
            <div className="flex justify-between top">
              <div className="flex flex-col gap-5 post">
                <h1 className="font-semibold text-2xl">{data?.data.hostel_name}</h1>
                <div className="flex gap-[5px] items-center text-[#888] text-sm address">
                  <HiLocationMarker className="text-blue" size={25} />
                  <span>{data?.data.address}</span>
                </div>
                <div className="p-1 bg-orange-200 rounded-[5px] opacity-40 w-max text-xl font-light price">
                  Rs. {data?.data.rent_amount}
                </div>
              </div>
              <div className="flex justify-center flex-col items-center gap-5 px-12 py-2 rounded-[10px] bg-yellow-200 opacity-35 font-semibold user">
                <div className="flex gap-5 items-center">
                  <ImProfile />
                  <h3> Owner Info</h3>
                </div>
                <div className="flex items-center gap-5">
                  <MdDriveFileRenameOutline />
                  <span>{data?.data.owner_name}</span>
                </div>
                <div className="flex gap-5 items-center">
                  <FaPhoneAlt />
                  <span>{data?.data.owner_phoneNumber}</span>
                </div>
                <div className="flex gap-5 items-center">
                  <MdEmail />
                  <span>{data?.data.owner_email}</span>
                </div>
              </div>
            </div>
            <div className="mt-12 text-[#555] leading-5 bottom">
              {data?.data.description}
            </div>
            <button className="font-medium px-6 py-2 text-white border-none rounded-lg transition-all duration-200 ease-in hover:cursor-pointer transform hover:scale-105 bg-blue-gradient mt-10" value={liked} onClick={handleLike}>
              Add Property to Favourites
            </button>
          </div>
        </div>
      </div>
      <div className="bg-[#fcf5f3] w-1/3 features">
        <div className="py-5 flex flex-col gap-5 wrapper">
          <p className="font-bold text-lg mb-[10px] flex justify-center title">General</p>
          <div className="flex flex-col gap-5 py-5 px-2 mx-3 bg-white rounded-[10px] listVertical">
            <div className="flex items-center gap-[10px] feature">
              <TbHexagonLetterA />
              <div className="featureText">
                <span className="font-bold">Amenities</span>
                <div className="flex gap-5">
                  {data?.data.amenities.map((amenity, index) => (
                    <p key={index} className="text-sm">{amenity}</p>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-[10px] feature">
              <FcRules />
              <div className="featureText">
                <span className="font-bold">Rules</span>
                <div className="flex gap-5">
                  {data?.data.rules.map((rule, index) => (
                    <p key={index} className="text-sm">{rule}</p>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-[10px] feature">
              <FaIndianRupeeSign />
              <div className="featureText">
                <span className="font-bold">Deposit</span>
                <p className="text-sm">{data?.data.security_deposit}</p>
              </div>
            </div>
          </div>
          <p className="font-bold text-lg mb-[10px] flex justify-center title">Room Details</p>
          <div className="flex gap-5 py-5 px-2 mx-3 bg-white rounded-[10px] rooms">
            <div className="flex items-center gap-[10px] room">
              <FaBuilding />
              <p>{data?.data.type_of_hostel}</p>
            </div>
            <div className="flex items-center gap-[10px] room">
              <IoBed />
              <div className="flex gap-5">{data?.data.room_type.map((type, index) => (
                <p key={index}>{type}</p>
              ))}</div>
            </div>
          </div>
          <p className="font-bold text-lg mb-[10px] flex justify-center title">Near By Places</p>
          <div className="flex gap-5 py-5 px-2 mx-3 bg-white rounded-[10px] listHorizontal">
            <div className="flex items-center gap-[10px] feature">
              <MdDirectionsRailway />
              <div className="featureText">
                <span>Railway Station</span>
                <p>{data?.data.distance_from_nearest_railway_station}m away</p>
              </div>
            </div>
            <div className="flex items-center gap-[10px] feature">
              <FaBus />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{data?.data.distance_from_bus_stop}m away</p>
              </div>
            </div>
          </div>
          <p className="font-bold text-lg mb-[10px] flex justify-center title">Location</p>
          <div className="mapContainer">
            <Maps address={data?.data.address} />
          </div>
          {/* <div className="buttons">
              <button>
                chatIcon
                <p>Send a Message</p>
              </button>
              <button>
                saveIcon
                <p>Save the Place</p>
              </button>
          </div> */}
        </div>
      </div>
    </div>
  )
}

const Maps = ({ address }) => {
  return (
    <MapContainer center={[28.61, 77.20]} zoom={4} scrollWheelZoom={false} style={{ height: "25rem", width: "30rem", marginTop: "20px", zIndex: 0 }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <GeoCoderMarker address={address} />
    </MapContainer>
  )
}

export default HostelProperty