import SearchBar, { SearchBar2 } from "./SearchBar";
import { HiLocationMarker } from "react-icons/hi";
import CountUp from "react-countup";
import {motion} from "framer-motion";

const Hero = () => {
    return (
        <section className="text-white relative pb-8 bg-black hero-wrapper">
            <div className="flex flex-wrap gap-y-8 p-6 innerWidth justify-around items-end max-lg:pt-12 hero-container">
                {/* left side */}
                <div className="flex flex-col justify-center items-start gap-12 hero-left">
                    <div className="relative z-[1] hero-title">
                        <div className="h-16 w-16 bg-orange-gradient rounded-full absolute right-[28%] top-[-10%] z-[-1] orange-circle" />
                        <motion.h1 initial={{y: "2rem", opacity: 0}} animate={{y: 0, opacity: 1}} transition={{duration: 2, type: "spring"}} className="font-semibold text-6xl max-md:text-[2.5rem] max-md:leading-10 max-lg:text-5xl max-lg:leading-[3rem] leading-[4rem]">Discover <br /> Most Suitable <br /> Property</motion.h1>
                    </div>
                    <div className="flex flex-col justify-center gap-8 items-start text-xl text-gray-300 hero-des">
                        <span>
                            Need a <span>pg/hostel/flat</span> ?
                        </span>
                        <span>
                            Search one near your college/company/business!
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-y-8 items-center justify-start gap-8 w-[100%] max-lg:justify-center max-lg:gap-6 stats">
                        <div className="flexColCenter stat">
                            <span className="text-3xl"><CountUp end={40} duration={3} /><span className="text-orange-500">+</span></span>
                            <span className="text-gray-300">Total Properties</span>
                        </div>
                        <div className="flexColCenter stat">
                            <span className="text-3xl"><CountUp end={3} duration={3} /><span className="text-orange-500">+</span></span>
                            <span className="text-gray-300">Happy Customers</span>
                        </div>
                    </div>
                </div> 
                {/* right side */}
                <div className="flex justify-center items-center flex-wrap gap-y-8 hero-right">
                    <motion.div initial={{x: "7rem", opacity: 0}} animate={{x: 0, opacity: 1}} transition={{duration: 2, type: "spring"}} className="w-[30rem] h-[35rem] overflow-hidden rounded-t-full border-8 border-solid border-white border-opacity-10 max-lg:w-[95%] max-lg:h-[30rem] max-md:w-[95%] max-md:h-[25rem] image-container">
                        <img src="https://res.cloudinary.com/sarvesh-damle/image/upload/v1710397575/Buddies_MajorProject/logos/hero-image_fs2tsc.png" alt="image" className="w-[100%] h-[100%]" />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Hero