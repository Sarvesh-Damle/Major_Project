import React from 'react';
import useFetch from "../hooks/useFetch.js";
import { useNavigate } from 'react-router-dom';

const Featured = () => {
    const { data, loading, error } = useFetch("/api/apartments/countByAddress?address=Wadala,Dadar,Nerul");
    return (
        <>
            {loading ? ("Loading Please Wait") :
                (<div>
                    <h1 className="flex justify-center items-center text-3xl p-1 my-2">Featured Properties</h1>
                    <section className="pt-5 lg:pt-8 pb-5 lg:pb-8 h-full bg-[#F3F4F6]">
                        <div className="container grid sm:grid-cols-2 lg:grid-cols-3 gap-12 my-3">
                            <SingleCard
                                image="https://res.cloudinary.com/dmrz8k1os/image/upload/v1699075314/samples/ecommerce/wadala_image_wvpuys.jpg"
                                CardTitle="Wadala"
                                btnHref="/"
                                CardDescription={data[0] + " Properties"}
                                Button="View Details"
                            />
                            <SingleCard
                                image="https://res.cloudinary.com/dmrz8k1os/image/upload/v1699075314/samples/ecommerce/dadar_image_eiedvw.jpg"
                                CardTitle="Dadar"
                                btnHref="/"
                                CardDescription={data[1] + " Properties"}
                                Button="View Details"
                            />
                            <SingleCard
                                image="https://res.cloudinary.com/dmrz8k1os/image/upload/v1699075314/samples/ecommerce/nerul_image_eertt0.jpg"
                                CardTitle="Nerul"
                                btnHref="/"
                                CardDescription={data[2] + " Properties"}
                                Button="View Details"
                            />
                        </div>
                    </section>
                </div>)
            }
        </>
    )
}

export default Featured


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