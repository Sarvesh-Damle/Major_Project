import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import "swiper/css";
import PropertiesCard from "../ListProperties/PropertiesCard.jsx";
import { useState } from "react";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";

const Profile = () => {
    const { pathname } = useLocation();
    const id = pathname.split("/").slice(-1)[0];
    const { data, isLoading, isError } = useQuery({
        queryKey: ["User_Details", id],
        queryFn: async () => {
            const response = await axios.get(`/api/v1/users/me`, { withCredentials: true });
            return response.data;
        }
    })
    const { data: favourites, isLoading: isLoading2, isError: isError2, refetch } = useQuery({
        queryKey: ["Favourites"],
        queryFn: async () => {
            const response = await axios.get(`/api/v1/favourites/get-favourite`, { withCredentials: true });
            return response.data;
        }
    })
    const [showFavourites, setShowFavourites] = useState(false);

    const removeFavouritesMutation = useMutation({
        mutationKey: ['remove favourites'],
        mutationFn: (propertyId) => {
            return axios.delete("/api/v1/favourites/delete-favourite", { data: { propertyId } });
        },
        onSuccess() {
            refetch();
            toast.success("Property removed from favourites");
        },
        onError() {
            toast.error("Failed to Remove Property from Favourites");
        }
    })

    if (isLoading || isLoading2) return <Loader />
    if (isError || isError2) return <ErrorComponent />

    return (
        <>
            <div className="flex flex-col justify-center items-center">
                Profile Page
                <div>Name: {data.data.name}</div>
                <div>Email: {data.data.email}</div>
                <div>Phone Number: {data.data.phoneNumber}</div>
                <button className="font-medium px-6 py-2 my-4 text-white border-none rounded-lg transition-all duration-200 ease-in hover:cursor-pointer transform hover:scale-105 bg-blue-gradient" onClick={() => setShowFavourites(prev => !prev)}>{showFavourites ? "Hide " : "Show "} Favourite Properties</button>
                {showFavourites && <div className="text-black">{((favourites?.data.hostel === undefined || favourites?.data.hostel.length === 0) && (favourites?.data.pg === undefined || favourites?.data.pg.length === 0) && (favourites?.data.flat === undefined || favourites?.data.flat.length === 0)) ? "Empty Favourites" : <>{showFavourites && <div className="p-6 w-full flex flex-col justify-center items-center gap-2 overflow-hidden r-container">
                    {favourites?.data.hostel.length !== 0 && <>
                        <div className="flex justify-center items-center mb-8 max-lg:items-center r-head">
                            <span className="primaryText max-md:text-2xl">Favourite Hostel Properties</span>
                        </div>
                        <div className="flex flex-wrap gap-x-12">
                            {
                                favourites?.data.hostel && favourites?.data.hostel.map((card, index) => {
                                    return (
                                        <div key={index} className="relative">
                                            <PropertiesCard card={card} />
                                            <button className="absolute top-0 right-0 py-2 pr-1 text-2xl font-bold transition-all duration-300 ease-in hover:scale-125 hover:cursor-pointer" onClick={() => removeFavouritesMutation.mutate(card._id)}><MdDelete/></button>
                                        </div>
                                    )
                                })
                            }
                        </div></>}
                    {favourites?.data.pg.length !== 0 && <><div className="flex justify-center items-center my-8 max-lg:items-center r-head">
                        <span className="primaryText max-md:text-2xl">Favourite PGs</span>
                    </div>
                        <div className="flex flex-wrap gap-x-12">
                            {
                                favourites?.data.pg && favourites?.data.pg.map((card, index) => {
                                    return (
                                        <div key={index} className="relative">
                                            <PropertiesCard card={card} />
                                            <button className="absolute top-0 right-0 pt-0.5 text-2xl font-bold transition-all duration-300 ease-in hover:scale-125 hover:cursor-pointer" onClick={() => removeFavouritesMutation.mutate(card._id)}><MdDelete/></button>
                                        </div>
                                    )
                                })
                            }
                        </div></>}
                    {favourites?.data.flat.length !== 0 && <><div className="flex justify-center items-center my-8 max-lg:items-center r-head">
                        <span className="primaryText max-md:text-2xl">Favourite Flats</span>
                    </div>
                        <div className="flex flex-wrap gap-x-12">
                            {
                                favourites?.data.flat && favourites?.data.flat.map((card, index) => {
                                    return (
                                        <div key={index} className="relative">
                                            <PropertiesCard card={card} />
                                            <button className="absolute top-0 right-0 py-2 pr-1 text-2xl font-bold transition-all duration-300 ease-in hover:scale-125 hover:cursor-pointer" onClick={() => removeFavouritesMutation.mutate(card._id)}><MdDelete/></button>
                                        </div>
                                    )
                                })
                            }
                        </div></>}
                </div>}</>}</div>}
            </div>
        </>
    )
}

export default Profile