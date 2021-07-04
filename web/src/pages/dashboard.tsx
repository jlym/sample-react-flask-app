import { TopNav } from "../components/top-nav";
import { TemperatureChart } from "../components/temperature-chart";
import { useTemperature } from "../hooks/use-temperatures";

export function DashboardPage() {
  // Fetch temperatures from the API.
  const tempResponse = useTemperature();

  // Prep a div that contains whether we're still waiting for a response, or the request failed.
  let requestStatus;
  if (tempResponse.loading) {
    requestStatus = <div>loading</div>;
  } else if (tempResponse.error) {
    requestStatus = <div>{tempResponse.error}</div>;
  }

  // Create the charts from the response data.
  let charts = [];
  if (tempResponse.data) {
    for (let location in tempResponse.data) {
      const tempData = tempResponse.data[location];
      const chart = (
        <TemperatureChart
          location={location}
          temperatureData={tempData}
          key={location}
        />
      );
      charts.push(chart);
    }
  }

  return (
    <div>
      <TopNav />
      <div className="container-sm mt-5">
        <h1 className="mb-5">Dashboard</h1>
        {requestStatus}
        {charts}
      </div>
    </div>
  );
}
