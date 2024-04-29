import { truncate } from "lodash";
import { useHistory } from "react-router-dom";
import Heart from "../Pages/Heart";

const PropertyCard = ({ card }) => {
    let url = "hostels";
    let propertyTag = "hostel";
    const navigate = useHistory();
    if (card.flat_type) {
        url = "flats";
        propertyTag = "flat"
    }
    if (card.pg_name) {
        url = "pgs";
        propertyTag = "pg"
    }
    return (
        <>
            <div className="flexColStart gap-2 p-4 rounded-xl max-w-max m-auto transition-all duration-300 ease-in hover:scale-105 hover:cursor-pointer hover:bg-gradient-to-b from-[#ffffff] to-[#eeeef7] shadow hover:shadow-lg relative z-0 r-card"
                onClick={() => navigate.push(`/${url}`)}
            >
                <Heart id={card._id} propertyTag={propertyTag} />
                <img src={card.property_photos[0]} alt="property-image"
                    className="w-60 h-40 rounded-[10px]" />
                <span className="secondaryText text-xl font-semibold r-price">
                    <span className="text-orange-500">Rs. </span>
                    <span>{card.rent_amount}</span>
                </span>
                {card.hostel_name && <span className="primaryText max-sm:text-2xl">{card.hostel_name}</span>}
                {card.pg_name && <span className="primaryText max-sm:text-2xl">{card.pg_name}</span>}
                {card.description && <span className="secondaryText text-xs">{card.description}</span>}
                {card.flat_type && <span className="primaryText max-sm:text-2xl">{card.flat_type}</span>}
                <span className="secondaryText text-xs">{truncate(card.address, { length: 40 })}</span>
            </div>
        </>
    )
}

export default PropertyCard