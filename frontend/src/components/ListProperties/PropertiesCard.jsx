import { useHistory } from "react-router-dom";
import {truncate} from "lodash";
import { useContext } from "react";
import { loginContext } from "../../provider/authContext";
import { toast } from "react-toastify";

const PropertiesCard = ({card}) => {
    const navigate = useHistory();
  const { isLoggedIn } = useContext(loginContext);
    let url = "hostels"
    if (card.pg_name) {
        url = "pgs"
    }
    if (card.flat_type) {
        url = "flats"
    }
    const handleClick = () => {
        if (isLoggedIn.login) {
            navigate.push(`/${url}/${card._id}`)
          } else {
            toast.error("Please login!!", { position: "bottom-right" })
          }
    }
    return (
        <>
            <div className="flex flex-col w-72 h-96 gap-2 p-4 m-auto rounded-xl max-w-max max-h-max transition-all duration-300 ease-in hover:scale-105 hover:cursor-pointer hover:bg-gradient-to-b from-[#ffffff] to-[#eeeef7] shadow hover:shadow-lg r-card"
            onClick={handleClick}
            >
                {card.property_photos.length > 0 && <img src={card.property_photos[0]} alt="property-image"
                    className="w-60 h-40 rounded-[10px]" />}
                <span className="secondaryText text-xl font-semibold r-price">
                    <span className="text-orange-500">Rs. </span>
                    <span>{card.rent_amount}</span>
                </span>
                {card.hostel_name && <span className="primaryText max-sm:text-2xl">{truncate(card.hostel_name, {length: 25})}</span>}
                {card.pg_name && <span className="primaryText max-sm:text-2xl">{truncate(card.pg_name, {length: 25})}</span>}
                {card.flat_type && <span className="primaryText max-sm:text-2xl">{card.flat_type}</span>}
                <span className="secondaryText">{truncate(card.description, {length: 80})}</span>
                <span className="text-base text-gray-500">{truncate(card.address, {length: 35})}</span>
            </div>
        </>
    )
}

export default PropertiesCard