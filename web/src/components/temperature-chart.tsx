import { TemperatureDataItem } from "../hooks/use-temperatures";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import moment from "moment";

export interface TemperatureChartProps {
  location: string;
  temperatureData: TemperatureDataItem[];
}

export function getTick(unixTimestamp: number): string {
  const date = new Date(unixTimestamp * 1000);
  return moment(date).format("H:mm");
}

export function TemperatureChart(props: TemperatureChartProps) {
  return (
    <div>
      <h2 className="my-5">{props.location}</h2>

      <LineChart width={600} height={300} data={props.temperatureData}>
        <Line type="monotone" dataKey="temp" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis
          dataKey="timestamp"
          type="number"
          domain={["auto", "auto"]}
          scale="time"
          tickFormatter={getTick}
        />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );
}
