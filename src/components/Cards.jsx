import React from "react";

const Card = () => {
  return (
    <>
      <section className="pt-20 lg:pt-[120px] pb-10 lg:pb-20 h-full bg-[#F3F4F6]">
        <div className="container grid sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-12">
          <SingleCard
            image="https://res.cloudinary.com/dmrz8k1os/image/upload/v1696489613/samples/ecommerce/norbert-levajsics-oTJ92KUXHls-unsplash_pnutu0.jpg"
            CardTitle="Rs. 20,000 | 550 sqft"
            titleHref="/"
            btnHref="/"
            CardDescription1="1 BHK Flat"
            CardDescription2="Wadala East, Mumbai"
            CardDescription3="Ready to move"
            Button="View Details"
          />
          <SingleCard
            image="https://res.cloudinary.com/dmrz8k1os/image/upload/v1696489671/samples/ecommerce/norbert-levajsics-oTJ92KUXHls-unsplash_1_ssb2ni.jpg"
            CardTitle="Rs. 32,000 | 730 sqft"
            CardDescription1="2 BHK Flat"
            CardDescription2="Andheri East, Mumbai"
            CardDescription3="Ready to move"
            Button="View Details"
          />
          <SingleCard
            image="https://res.cloudinary.com/dmrz8k1os/image/upload/v1696489671/samples/ecommerce/norbert-levajsics-oTJ92KUXHls-unsplash_1_ssb2ni.jpg"
            CardTitle="Rs. 56,000 | 950 sqft"
            CardDescription1="3 BHK Flat"
            CardDescription2="Mulund West, Mumbai"
            CardDescription3="Ready to move"
            Button="View Details"
          />
        </div>
      </section>
    </>
  );
};

export default Card;

const SingleCard = ({
  image,
  Button,
  CardDescription1,
  CardDescription2,
  CardDescription3,
  CardTitle,
  titleHref,
  btnHref,
}) => {
  return (
    <>
      {/*  */}
      <div className="overflow-hidden bg-white rounded-lg ">
        <img src={image} alt="Room" className="w-full" />
        <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
          <p className="text-base leading-relaxed mb-3 text-body-color">
            {CardDescription1}
          </p>
          <h3>
            <a
              href={titleHref ? titleHref : "/"}
              className="mb-4 block text-xl font-semibold text-dark hover:text-primary sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
            >
              {CardTitle}
            </a>
          </h3>
          <p className="text-base leading-relaxed mb-0 text-body-color">
            {CardDescription2}
          </p>
          <p className="text-base leading-relaxed mb-3 text-body-color">
            {CardDescription3}
          </p>

          {Button && (
            <a
              href={btnHref ? btnHref : "/"}
              className="inline-block rounded-full border border-[#E5E7EB] py-2 px-7 text-base font-medium text-body-color transition hover:border-primary hover:bg-blue-50 hover:text-blue-500"
            >
              {Button}
            </a>
          )}
        </div>
      </div>
      {/*  */}
    </>
  );
};
