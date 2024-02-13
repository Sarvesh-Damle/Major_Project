import React from 'react'
import Footer from '../Footer'
// import Hero from '../Hero'
import Card from '../Cards'
import Flatmates from '../Flatmates'
import { CardArray1, CardArray2 } from '../../data/CardData'
import Featured from '../Featured'
import Rooms from '../Rooms'

const Home = () => {
  
  return (
    <div>
        {/* <Hero/> */}
        <Featured />
        <Rooms />
        <h1 className="flex justify-center items-center text-3xl p-1 my-2">Flats/Rooms</h1>
        <Card image="https://res.cloudinary.com/dmrz8k1os/image/upload/v1696489671/samples/ecommerce/norbert-levajsics-oTJ92KUXHls-unsplash_1_ssb2ni.jpg" cardarray={CardArray1}/>
        <h1 className="flex justify-center items-center text-3xl p-1 my-2">Apartments/PG/Hostels</h1>
        <Card image="https://res.cloudinary.com/dmrz8k1os/image/upload/v1699037701/samples/ecommerce/hostel_image_sgsi52.jpg" cardarray={CardArray2}/>
        <h1 className="flex justify-center items-center text-3xl p-1 my-2">Flatmates</h1>
        <Flatmates />
        <Footer/>
    </div>
  )
}

export default Home