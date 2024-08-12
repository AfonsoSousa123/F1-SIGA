import { useEffect, useState } from "react";
import { Loader } from "../Components/Navigation/Loader.tsx";
import { fullTimeFormater } from "../misc/date-formater/date -formater.ts";
import Box from "@mui/material/Box";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface weatherProps {
  id: number;
  date: string;
  air_temperature: number;
  humidity: number;
  pressure: number;
  rainfall: number;
  track_temperature: number;
  wind_direction: number;
  wind_speed: number;
  meeting_key: number;
  session_key: number;
}

export const Weather = () => {
  const [weather, setWeather] = useState<weatherProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sortType, setSortType] = useState("descending");

  useEffect(() => {
    fetchData();
  }, [sortType]);

  async function fetchData() {
    try {
      const data = await fetchWeather();
      sortData(data);
    } catch (error) {
      // @ts-ignore
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function sortData(data: weatherProps[]) {
    let sortedData;
    if (sortType === "descending") {
      // Sorts the data by date in descending order
      sortedData = [...data].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });
    } else if (sortType === "ascending") {
      // Sorts the data by date in ascending order
      sortedData = [...data].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
      });
    } else {
      return data;
    }

    setWeather(sortedData);
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  async function fetchWeather(): Promise<weatherProps[]> {
    const response = await fetch(
      "https://api.openf1.org/v1/weather?session_key=latest&meeting_key=latest",
    );
    return await response.json();
  }

  // handles the change of the select component
  const handleChange = (e: SelectChangeEvent) => {
    setSortType(e.target.value as string);
  };

  return (
    <>
      {(isLoading && <Loader></Loader>) || (
        <div>
          <h2>Weather Forecast</h2>

          <div className="wrapper">
            <Box sx={{ minWidth: 80 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  className={"select-sort"}
                  id="demo-simple-select"
                  value={sortType}
                  label="Sort by"
                  color={"primary"}
                  onChange={handleChange}
                >
                  <MenuItem value={"descending"}>Latest</MenuItem>
                  <MenuItem value={"ascending"}>Oldest</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>

          <br />

          {weather.map((weatherInfo) => {
            return (
              <div className="card" key={weatherInfo.id}>
                <div>
                  Air Temperature:
                  <span className={"blue"}>
                    {weatherInfo.air_temperature} ºC
                  </span>
                </div>
                <div>
                  Date:
                  <span className={"blue"}>
                    {fullTimeFormater(weatherInfo.date)}
                  </span>
                </div>

                <div>
                  Humidity:
                  <span className={"blue"}>{weatherInfo.humidity} %</span>
                </div>

                <div>
                  Pressure:
                  <span className={"blue"}>{weatherInfo.pressure} (mbar)</span>
                </div>

                <div>
                  Rainfall:
                  <span className={"blue"}>
                    {weatherInfo.rainfall == 1 ? "Yes" : "No"}
                  </span>
                </div>
                <div>
                  Track Temperature:
                  <span className={"blue"}>
                    {weatherInfo.track_temperature} ºC
                  </span>
                </div>

                <div>
                  Wind Direction:
                  <span className={"blue"}>{weatherInfo.wind_direction} º</span>
                </div>
                <div>
                  Wind Speed:
                  <span className={"blue"}>{weatherInfo.wind_speed} (m/s)</span>
                </div>

                {/*<div>*/}
                {/*  Session Key:*/}
                {/*  <span className={"blue"}>{weatherInfo.session_key}</span>*/}
                {/*</div>*/}

                {/*<div>*/}
                {/*  Meeting Key:*/}
                {/*  <span className={"blue"}>{weatherInfo.meeting_key}</span>*/}
                {/*</div>*/}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Weather;
