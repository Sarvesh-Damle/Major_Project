import { useContext, useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { loginContext } from '@/provider/authContext';
import { toast } from 'react-toastify';
// import axios from "axios"; // Unused
// import ErrorComponent from "./ErrorComponent.jsx"; // Unused
// import Loader from "./Loader.jsx"; // Unused
// import { updateFavourites } from "@/components/utils/common.js"; // Unused

const Heart = () => {
  // Removed props since they were unused in the current logic
  const [heartColor, setHeartColor] = useState('white');
  // const [liked, setLiked] = useState(false); // Unused state
  const { isLoggedIn } = useContext(loginContext);

  const handleLike = async () => {
    if (isLoggedIn.login) {
      setHeartColor((prev) => (prev === 'white' ? '#fa3e5f' : 'white'));
      // setLiked(prev => !prev);
      // liked===false ? await axios.post("/api/v1/favourites/add-favourites", {propertyId: id, propertyTag: propertyTag}, {withCredentials: true}) : null;
      // toast.success("Added property to favourites!!");
    } else {
      toast.error('Please login!!', { position: 'bottom-right' });
    }
  };
  return (
    <AiFillHeart
      size={24}
      className='absolute top-[25px] right-[30px] z-[1]'
      values='liked'
      style={{ color: heartColor }}
      onClick={(e) => {
        e.stopPropagation();
        handleLike();
      }}
    />
  );
};

export default Heart;
