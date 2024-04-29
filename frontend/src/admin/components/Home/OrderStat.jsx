const OrderStat = ({unverifiedProperties}) => {
  return (
    <div className="mx-3">
      <div className="flex flex-col lg:flex-row  mt-3 ">
        <div className="h-[90px] lg:ml-2 bg-white  w-full rounded-md flex flex-col justify-center  mb-3   shadow-md   ">
          <div className="text-xl pl-4 ">
            <b>Property Statistics</b>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-wrap lg:flex-row sm:flex-row ">
        <div className="h-[120px] lg:mx-auto bg-white  w-full lg:w-[49%] sm:ml-2 sm:w-[32%] rounded-md flex flex-col justify-center  mb-3   shadow-lg   ">
          <div className="text-xl pl-4 ">
            <h1>Total Pending Properties</h1>
            <h2 className="text-4xl ">{(unverifiedProperties.hostel + unverifiedProperties.pg + unverifiedProperties.flat) || 0}</h2>
          </div>
        </div>
        <div className="h-[120px] lg:mx-auto bg-white  w-full lg:w-[49%] sm:ml-2 sm:w-[32%] rounded-md flex flex-col justify-center  mb-3   shadow-lg   ">
          <div className="text-xl pl-4 ">
            <h1>Hostel Pending Properties</h1>
            <h2 className="text-4xl">{unverifiedProperties.hostel || 0}</h2>
          </div>
        </div>
        <div className="h-[120px] lg:mx-auto bg-white  w-full lg:w-[49%] sm:ml-2 sm:w-[32%] rounded-md flex flex-col justify-center  mb-3   shadow-lg   ">
          <div className="text-xl pl-4">
            <h1>PG Pending Properties</h1>
            <h2 className="text-4xl">{unverifiedProperties.pg || 0}</h2>
          </div>
        </div>
        <div className="h-[120px] lg:mx-auto bg-white  w-full lg:w-[49%] sm:ml-2 sm:w-[32%]  rounded-md flex flex-col justify-center  mb-3   shadow-lg   ">
          <div className="text-xl pl-4 ">
            <h1>Flat Pending Properties</h1>
            <h2 className="text-4xl ">{unverifiedProperties.flat || 0}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStat;