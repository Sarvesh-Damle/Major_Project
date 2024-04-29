import { useContext, useState } from "react"
import { AiFillHeart } from "react-icons/ai"
import { useMutation, useQuery } from "@tanstack/react-query";
import { loginContext } from "../../provider/authContext";
import { toast } from "react-toastify";
import axios from "axios";
import ErrorComponent from "./ErrorComponent.jsx";
import Loader from "./Loader.jsx";
import { updateFavourites } from "../utils/common.js";

const Heart = ({id, propertyTag}) => {
  const [heartColor, setHeartColor] = useState("white");
  const [liked, setLiked] = useState(false);
  const { isLoggedIn } = useContext(loginContext);

  const handleLike = async () => {
    if (isLoggedIn.login) {
      setHeartColor((prev) => prev === "white" ? "#fa3e5f" : "white")
      setLiked(prev => !prev);
      // liked===false ? await axios.post("/api/v1/favourites/add-favourites", {propertyId: id, propertyTag: propertyTag}, {withCredentials: true}) : null;
      // toast.success("Added property to favourites!!");
    } else {
      toast.error("Please login!!", { position: "bottom-right" })
    }
  }
  return (
    <AiFillHeart size={24} className="absolute top-[25px] right-[30px] z-[1]" values="liked" style={{ color: heartColor }} onClick={e => {
      e.stopPropagation();
      handleLike()
    }} />
  )
}

export default Heart