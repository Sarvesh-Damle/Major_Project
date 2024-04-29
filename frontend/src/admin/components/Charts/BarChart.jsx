import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

function BarChart({unverifiedProperties}) {
  const hostel = unverifiedProperties.hostel;
  const pg = unverifiedProperties.pg;
  const flat = unverifiedProperties.flat;
  const data = [{name: "Hostel", "pending properties": hostel},{name: "PG", "pending properties": pg},{name: "Flat", "pending properties": flat}];

  return (
    <div className="w-[95%] lg:w-[98%] mx-auto">
      <div className="min-h-[90px] w-[100%] bg-white rounded-md flex flex-col justify-center mb-3 shadow-md">
        <div className="h-[333px] lg:min-h-[450px] rounded-md">
          <h1 className="ml-4 text-2xl font-bold my-2">Pending Properties</h1>
          <ResponsiveContainer>
            <LineChart
              data={data}
              margin={{
                top: 30,
                bottom: 70,
                right: 20,
              }}
            >
              <CartesianGrid />
              <XAxis dataKey="name" interval={"preserveStartEnd"} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line dataKey="pending properties" stroke="green" activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default BarChart;