import Card from '../Pages/Cards.jsx';
import Flatmates from '../Pages/Flatmates.jsx';
import Featured from '../Pages/Featured.jsx';
import Rooms from '../Pages/Rooms.jsx';
import { CardArray1, CardArray2 } from '../../data/CardData.js';
import { Outlet } from 'react-router-dom';
import SearchBar from '../Pages/SearchBar.jsx';
import Testimonials from '../Pages/Testimonials/Testimonials.jsx';
import testimonialsData from '../Pages/Testimonials/testimonialsData.js';

const Home = () => {
  return (
    <div>
      <SearchBar/>
      <Featured />
      <Rooms />
      <h1 className="flex justify-center items-center text-3xl p-1 my-2">Flats/Rooms</h1>
      <Card image="https://res.cloudinary.com/dmrz8k1os/image/upload/v1696489671/samples/ecommerce/norbert-levajsics-oTJ92KUXHls-unsplash_1_ssb2ni.jpg" cardarray={CardArray1} />
      <h1 className="flex justify-center items-center text-3xl p-1 my-2">Apartments/PG/Hostels</h1>
      <Card image="https://res.cloudinary.com/dmrz8k1os/image/upload/v1699037701/samples/ecommerce/hostel_image_sgsi52.jpg" cardarray={CardArray2} />
      <h1 className="flex justify-center items-center text-3xl p-1 my-2">Flatmates</h1>
      <Flatmates />
      <Testimonials testimonials={testimonialsData}/>
      <Outlet />
    </div>
  )
}

export default Home