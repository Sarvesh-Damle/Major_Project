// import Card from './Cards.jsx';
// import Flatmates from './Flatmates.jsx';
// import Featured from './Featured.jsx';
// import Rooms from './Rooms.jsx';
import SearchBar from './SearchBar.jsx';
import Testimonials from './Testimonials/Testimonials.jsx';
import testimonialsData from './Testimonials/testimonialsData.js';
import Hero from './Hero.jsx';
// import Properties from './Properties.jsx';
import Value from './Value/Value.jsx';
// import Map from '../Map/Map.jsx';

const Home = () => {
  return (
    <div>
      <Hero />
      <SearchBar />
      {/* <Properties/> */}
      <Value />
      {/* <Featured /> */}
      {/* <Rooms /> */}
      {/* <h1 className="flex justify-center items-center text-3xl p-1 my-2">Flats/Rooms</h1>
      <Card image="https://res.cloudinary.com/sarvesh-damle/image/upload/v1696489671/Buddies_MajorProject/property_images/norbert-levajsics-oTJ92KUXHls-unsplash_1_ssb2ni.jpg" cardarray={CardArray1} />
      <h1 className="flex justify-center items-center text-3xl p-1 my-2">Apartments/PG/Hostels</h1>
      <Card image="https://res.cloudinary.com/sarvesh-damle/image/upload/v1699037701/Buddies_MajorProject/property_images/hostel_image_sgsi52.jpg" cardarray={CardArray2} />
      <h1 className="flex justify-center items-center text-3xl p-1 my-2">Flatmates</h1>
      <Flatmates /> */}
      <Testimonials testimonials={testimonialsData} />
    </div>
  );
};

export default Home;
