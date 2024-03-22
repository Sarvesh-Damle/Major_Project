import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import { propertiesData } from "../../data/Property.js";
import { sliderSettings } from "../utils/common.js";

const Properties = () => {
    return (
        <section className="r-wrapper">
            <div className="p-6 innerWidth overflow-hidden relative r-container">
                <div className="flexColStart mb-8 max-lg:items-center r-head">
                    <span className="orangeText">Best Choices</span>
                    <span className="primaryText max-md:text-2xl">Popular Properties</span>
                </div>
                <Swiper {...sliderSettings}>
                    <SliderButtons />
                    {propertiesData && propertiesData.map((card, index) => (
                        <SwiperSlide key={index}>
                            <div className="flexColStart gap-2 p-4 rounded-xl max-w-max m-auto transition-all duration-300 ease-in hover:scale-105 hover:cursor-pointer hover:bg-gradient-to-b from-[#ffffff] to-[#eeeef7] shadow hover:shadow-lg r-card ">
                                <img src={card.image} alt="property-image"
                                    className="w-[100%] max-sm:w-[95%]" />
                                <span className="secondaryText text-xl font-semibold r-price">
                                    <span className="text-orange-500">Rs. </span>
                                    <span>{card.price}</span>
                                </span>
                                <span className="primaryText max-sm:text-2xl">{card.name}</span>
                                <span className="secondaryText text-xs">{card.detail}</span>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}

const SliderButtons = () => {
    const swiper = useSwiper();
    return (
        <div className="flex justify-center sticky gap-4 my-4 z-10 r-buttons">
            <button onClick={() => swiper.slidePrev()} className="bg-[#EEEEFF] px-3 py-1 text-xl text-blue border-none rounded-lg shadow cursor-pointer">&lt;</button>
            <button onClick={() => swiper.slideNext()} className="bg-white px-3 py-1 text-xl text-blue border-none rounded-lg shadow-md cursor-pointer">&gt;</button>
        </div>
    )
}

export default Properties