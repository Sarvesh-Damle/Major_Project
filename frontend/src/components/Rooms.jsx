import React from 'react';
import useFetch from "../hooks/useFetch.js";
import { useNavigate } from 'react-router-dom';

const Rooms = () => {
    const { data, loading, error } = useFetch("/api/apartments/countByType");
    const images = ["https://res.cloudinary.com/dmrz8k1os/image/upload/v1696489671/samples/ecommerce/norbert-levajsics-oTJ92KUXHls-unsplash_1_ssb2ni.jpg", "https://res.cloudinary.com/dmrz8k1os/image/upload/v1696489671/samples/ecommerce/norbert-levajsics-oTJ92KUXHls-unsplash_1_ssb2ni.jpg", "https://res.cloudinary.com/dmrz8k1os/image/upload/v1696489671/samples/ecommerce/norbert-levajsics-oTJ92KUXHls-unsplash_1_ssb2ni.jpg", "https://res.cloudinary.com/dmrz8k1os/image/upload/v1696489671/samples/ecommerce/norbert-levajsics-oTJ92KUXHls-unsplash_1_ssb2ni.jpg", "https://res.cloudinary.com/dmrz8k1os/image/upload/v1696489671/samples/ecommerce/norbert-levajsics-oTJ92KUXHls-unsplash_1_ssb2ni.jpg"];
    return (
        <>
            {loading ? ("Loading Please Wait") :
                (<div>
                    <h1 className="flex justify-center items-center text-3xl p-1 my-2">Room Types</h1>
                    <section className="pt-5 lg:pt-8 pb-5 lg:pb-8 h-full bg-[#F3F4F6]">
                        <div className="container grid sm:grid-cols-2 lg:grid-cols-3 gap-12 my-3">
                            {data && images.map((i, index) => {
                                return (
                                    <SingleCard
                                        key={index}
                                        image={i}
                                        CardTitle={data[index].room_type}
                                        btnHref="/"
                                        CardDescription={data[index].count + " " + data[index].room_type}
                                        Button="View Details"
                                    />
                                )
                            })}
                        </div>
                    </section>
                </div>)
            }
        </>
    )
}

export default Rooms


const SingleCard = ({
    image,
    Button,
    CardDescription,
    CardTitle,
}) => {
    const navigate = useNavigate();
    return (
        <>
            {/*  */}
            <div className="overflow-hidden bg-white rounded-lg cursor-pointer" onClick={() => navigate("/product")}>
                <img src={image} alt="Room" className="w-full" />
                <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
                    <h3>
                        <div
                            className="mb-4 block text-xl font-semibold text-dark hover:text-primary sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px] cursor-pointer"
                        >
                            {CardTitle}
                        </div>
                    </h3>
                    <p className="text-base leading-relaxed mb-3 text-body-color">
                        {CardDescription}
                    </p>

                    {Button && (
                        <div
                            className="inline-block rounded-full border border-[#E5E7EB] py-2 px-7 text-base font-medium text-body-color transition hover:border-primary hover:bg-blue-50 hover:text-blue-500"
                        >
                            {Button}
                        </div>
                    )}
                </div>
            </div>
            {/*  */}
        </>
    );
};