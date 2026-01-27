import SearchBar from './SearchBar.jsx';
import Testimonials from './Testimonials/Testimonials.jsx';
import testimonialsData from './Testimonials/testimonialsData.js';
import Hero from './Hero.jsx';
import Value from './Value/Value.jsx';
import Featured from './Featured.jsx';
import Flatmates from './Flatmates.jsx';
import Map from '../Map/Map.jsx';
import RecentlyViewed from '@/components/ui/RecentlyViewed.jsx';

const Home = () => {
  return (
    <div>
      <Hero />
      <SearchBar />
      <div className='max-w-md mx-auto px-4 my-6'>
        <RecentlyViewed />
      </div>
      <Featured />
      <Value />
      <Flatmates />
      <div className='px-4 sm:px-8 py-12'>
        <h2 className='flex justify-center items-center text-2xl sm:text-3xl font-bold mb-6'>
          Explore Properties Near You
        </h2>
        <div className='h-[280px] sm:h-[400px] rounded-[20px] overflow-hidden'>
          <Map />
        </div>
      </div>
      <Testimonials testimonials={testimonialsData} />
    </div>
  );
};

export default Home;
