import { useEffect, useState } from "react";

export interface TemperatureResponse {
  loading: boolean;
  error?: string;
  data?: {
    [name: string]: TemperatureDataItem[];
  };
}

export interface TemperatureDataItem {
  temp: string;
  timestamp: number;
}

const endpoint = "http://127.0.0.1:5000/api/temperatures";
export function useTemperature() {
  const [response, setResponse] = useState<TemperatureResponse>({
    loading: true,
  });

  useEffect(() => {
    async function fetchTemperatures() {
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        setResponse({
          loading: false,
          data: data,
        });
      } catch (error) {
        setResponse({
          loading: false,
          error: error.toString(),
        });
      }
    }

    fetchTemperatures();
  }, []);

  return response;
}
