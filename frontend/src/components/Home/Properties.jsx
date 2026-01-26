import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
// import { propertiesData } from "../../data/Property.js";
import { sliderSettings } from '../utils/common.js';
import PropertyCard from './PropertyCard.jsx';
import {
  usePropertiesFlats,
  usePropertiesHostels,
  usePropertiesPGs,
} from '../../hooks/useProperties.js';
import Loader from '@/pages/Loader.jsx';
import ErrorComponent from '@/pages/ErrorComponent.jsx';

const Properties = () => {
  const { data, isLoading, isError } = usePropertiesHostels();
  const { data: data2, isLoading: isLoading2, isError: isError2 } = usePropertiesPGs();
  const { data: data3, isLoading: isLoading3, isError: isError3 } = usePropertiesFlats();
  if (isLoading) return <Loader />;
  if (isError) return <ErrorComponent />;
  if (isLoading2) return <Loader />;
  if (isError2) return <ErrorComponent />;
  if (isLoading3) return <Loader />;
  if (isError3) return <ErrorComponent />;

  return (
    <section className='r-wrapper'>
      <div className='p-6 innerWidth overflow-hidden relative r-container'>
        <div className='flexColStart mb-8 max-lg:items-center r-head'>
          <span className='orangeText'>Best Choices</span>
          <span className='primaryText max-md:text-2xl'>Popular Hostel Properties</span>
        </div>
        {/* Hostel Properties: */}
        <Swiper {...sliderSettings}>
          <SliderButtons />
          {data &&
            data.data.slice(0, 8).map((card, index) => (
              <SwiperSlide key={index}>
                <PropertyCard card={card} />
              </SwiperSlide>
            ))}
        </Swiper>
        <div className='flexColStart mb-8 max-lg:items-center r-head'>
          <span className='primaryText max-md:text-2xl'>Popular PGs</span>
        </div>
        {/* PG Properties */}
        <Swiper {...sliderSettings}>
          <SliderButtons />
          {data2 &&
            data2.data.slice(0, 8).map((card, index) => (
              <SwiperSlide key={index}>
                <PropertyCard card={card} />
              </SwiperSlide>
            ))}
        </Swiper>
        <div className='flexColStart mb-8 max-lg:items-center r-head'>
          <span className='primaryText max-md:text-2xl'>Popular Flats</span>
        </div>
        {/* Flat Properties */}
        <Swiper {...sliderSettings}>
          <SliderButtons />
          {data3 &&
            data3.data.slice(0, 8).map((card, index) => (
              <SwiperSlide key={index}>
                <PropertyCard card={card} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
};

const SliderButtons = () => {
  const swiper = useSwiper();
  return (
    <div className='flex justify-center sticky gap-4 mb-4 mt-8 z-10 r-buttons'>
      <button
        onClick={() => swiper.slidePrev()}
        className='bg-[#EEEEFF] px-3 py-1 text-xl text-blue border-none rounded-lg shadow cursor-pointer'
      >
        &lt;
      </button>
      <button
        onClick={() => swiper.slideNext()}
        className='bg-white px-3 py-1 text-xl text-blue border-none rounded-lg shadow-md cursor-pointer'
      >
        &gt;
      </button>
    </div>
  );
};

export default Properties;
