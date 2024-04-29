import { Link } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { FaRegBuilding } from "react-icons/fa";
import { BsBuildings } from "react-icons/bs";
import { IoHomeOutline } from "react-icons/io5";

const Sidebar = () => {
  return (
    <div
      className={
        "hidden lg:block  h-[90vh] w-[20%]   ease-in-out duration-500 overflow-y-scroll   bg-[#fbfbfb] z-20 left-[0px]  "
      }
    >
      <Link to="/dashboard">
        <div className="h-[40px] flex mt-3  w-[200px] pl-5 text-xl ">
          <MdOutlineDashboard size={30} />
          <div className="mx-5">Dashboard</div>
        </div>
      </Link>
      <hr className="text-black h-2" />

      <Link to="/dashboard/hostels">
        <div className="h-[40px] flex mt-3  w-[200px] pl-5 text-xl">
          <FaRegBuilding size={30} />
          <div className="mx-5">Hostels</div>
        </div>
      </Link>

      <hr className="text-black h-2" />
      <Link to="/dashboard/pgs">
        <div className="h-[40px] flex mt-3  w-[200px] pl-5 text-xl">
          <IoHomeOutline size={30} />
          <div className="mx-5">PGs</div>
        </div>
      </Link>
      <hr className="text-black h-2" />
      <Link to="/dashboard/flats">
        <div className="h-[40px] flex mt-3  w-[200px] pl-5 text-xl">
          <BsBuildings size={30} />
          <div className="mx-5">Flats</div>
        </div>
      </Link>
      <hr className="text-black h-2" />
      <Link to="/dashboard/users">
        <div className="h-[40px] flex my-3  w-[200px] pl-5 text-xl">
          <FiUsers size={30} />
          <div className="mx-5">Users</div>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;