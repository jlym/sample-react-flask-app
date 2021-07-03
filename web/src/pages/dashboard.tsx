import { TopNav } from "../components/top-nav";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

export function DashboardPage() {
  const data = [
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 500, pv: 2400, amt: 2400 },
    { name: "Page C", uv: 300, pv: 2400, amt: 2400 },
    { name: "Page D", uv: 400, pv: 2400, amt: 2400 },
  ];

  return (
    <div>
      <TopNav />
      <div className="container-sm mt-5">
        <h1 className="mb-5">Dashboard</h1>

        <LineChart width={600} height={300} data={data}>
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
        </LineChart>
      </div>
    </div>
  );
}
