import { useState } from "react";
import { Link } from "react-router-dom";

const ListProperty = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    setIsHovered(!isHovered);
  };

  return (
    <div className="relative py-2">
      <button
        id="dropdownHoverButton"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className="inline-flex items-center font-medium px-6 py-2.5 text-white border-none rounded transition-all duration-200 ease-in hover:cursor-pointer transform hover:scale-110 z-10 bg-blue-gradient"
        type="button"
      >
        List Your Property 
        {isHovered ?
            (<svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5 5 1 9 5"
              />
            </svg>) : (<svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>)}
      </button>
      <div
        id="dropdownHover"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`absolute z-10 ${isHovered ? "block" : "hidden"} bg-white divide-y divide-gray-100 rounded-lg shadow w-56`}
        style={{left: "45%", transform: "translateX(-50%)" }}
      >
        <ul className="py-2 text-sm text-gray-700 divide-y divide-gray-100 font-medium" aria-labelledby="dropdownHoverButton">
          <li>
            <Link to="/students" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setIsHovered(!isHovered)}>
              For Students
            </Link>
          </li>
          <li>
            <Link to="/professionals" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setIsHovered(!isHovered)}>
              For Working Professionals
            </Link>
          </li>
          <li>
            <Link to="/owner" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setIsHovered(!isHovered)}>
              For Property Owner
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ListProperty;
