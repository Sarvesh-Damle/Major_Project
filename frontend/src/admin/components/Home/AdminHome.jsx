import BarChart from "../Charts/BarChart";
import OrderStat from "./OrderStat";
import PieChartComponent from "../Charts/PieChart";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/Pages/Loader";
import ErrorComponent from "../../../components/Pages/ErrorComponent";
import axios from "axios";
import UnverifiedProperties from "./UnverifiedProperties";

const AdminHome = () => {
  const unverifiedProperties = UnverifiedProperties();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["Hostels-Count"],
    queryFn: async () => {
      const response = await axios.get("/api/v1/hostels/count-verified-hostels", { withCredentials: true });
      return response.data;
    }
  })
  const { data: data2, isLoading: isLoading2, isError: isError2 } = useQuery({
    queryKey: ["PGs-Count"],
    queryFn: async () => {
      const response = await axios.get("/api/v1/pgs/count-verified-pgs", { withCredentials: true });
      return response.data;
    }
  })
  const { data: data3, isLoading: isLoading3, isError: isError3 } = useQuery({
    queryKey: ["Flats-Count"],
    queryFn: async () => {
      const response = await axios.get("/api/v1/flats/count-verified-flats", { withCredentials: true });
      return response.data;
    }
  })

  if (isLoading || isLoading2 || isLoading3) return <div className="flex h-screen w-screen justify-center items-center"><Loader /></div>
  if (isError || isError2 || isError3) return <ErrorComponent />

  const totalProperties = (data?.data || 0) + (data2?.data || 0) + (data3?.data || 0);
  const hostelPercentage = ((data?.data || 0) / totalProperties) * 100;
  const pgPercentage = ((data2?.data || 0) / totalProperties) * 100;
  const flatPercentage = ((data3?.data || 0) / totalProperties) * 100;

  return (
    <div className="flex flex-col overflow-y-scroll no-scroll h-[90vh] w-[100%] lg:w-[80%]">
      <div className="flex flex-col lg:flex-row mx-3 mt-3 ">
        <div className="h-[100px] lg:ml-2 bg-[#f5dd90] w-full rounded-md flex flex-col justify-center  lg:w-[25%] mb-3  ">
          <div className="text-lg ml-5 ">Total Properties</div>
          <p className="font-bold text-xl ml-5">{totalProperties || 30}</p>
        </div>
        <div className="h-[100px] lg:ml-2 bg-[#aaa1c8] w-full rounded-md flex flex-col justify-center  lg:w-[25%] mb-3  ">
          <div className="text-lg ml-5 ">Total Hostel Properties</div>
          <p className="font-bold text-xl ml-5">{data.data || 10}</p>
        </div>
        <div className="h-[100px] lg:ml-2 bg-[#74c69d] w-full rounded-md flex flex-col justify-center  lg:w-[25%] mb-3  ">
          <div className="text-lg ml-5 ">Total PG Properties</div>
          <p className="font-bold text-xl ml-5">{data2.data || 10}</p>
        </div>
        <div className="h-[100px] lg:ml-2 bg-[#61a5c2] w-full rounded-md flex flex-col justify-center  lg:w-[25%] mb-3  ">
          <div className="text-lg ml-5 ">Total Flat Properties</div>
          <p className="font-bold text-xl ml-5">{data3.data || 10}</p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row w-full ">
        <div className="lg:w-[60%] lg:ml-4 ">
          <BarChart unverifiedProperties={unverifiedProperties} />
        </div>
        <div className="lg:w-[40%]">
          <PieChartComponent hostelPercentage={hostelPercentage} pgPercentage={pgPercentage} flatPercentage={flatPercentage} />
        </div>
      </div>
      <OrderStat unverifiedProperties={unverifiedProperties} />
    </div>
  );
};

export default AdminHome;