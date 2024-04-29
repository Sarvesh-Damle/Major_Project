import React from "react";
import { useHistory } from "react-router-dom";

const Card = (props) => {
  return (
    <>
      <section className="pt-5 lg:pt-8 pb-5 lg:pb-8 h-full bg-[#F3F4F6]">
        <div className="container grid sm:grid-cols-2 lg:grid-cols-3 gap-12 my-3">
          {props.cardarray.map((i, key) => {
            return (
              <SingleCard
                key = {key}
                image={props.image}
                CardTitle={i.title}
                btnHref="/"
                CardDescription1={i.description1}
                CardDescription2={i.description2}
                CardDescription3={i.description3}
                Button="View Details"
              />
            )
          })}
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
}) => {
  const navigate = useHistory();
  return (
    <>
      {/*  */}
      <div className="overflow-hidden bg-white rounded-lg cursor-pointer" onClick={() => navigate("/product")}>
        <img src={image} alt="Room" className="w-full" />
        <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
          <p className="text-base leading-relaxed mb-3 text-body-color">
            {CardDescription1}
          </p>
          <h3>
            <div
              className="mb-4 block text-xl font-semibold text-dark hover:text-primary sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px] cursor-pointer"
            >
              {CardTitle}
            </div>
          </h3>
          <p className="text-base leading-relaxed mb-0 text-body-color">
            {CardDescription2}
          </p>
          <p className="text-base leading-relaxed mb-3 text-body-color">
            {CardDescription3}
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
