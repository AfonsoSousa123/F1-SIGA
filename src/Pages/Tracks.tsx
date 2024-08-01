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

interface trackProps {
  id: number;
  location: string;
  country_key: number;
  country_code: string;
  country_name: string;
  circuit_key: number;
  circuit_short_name: string;
  date_start: string;
  gmt_offset: string;
  meeting_name: string;
  meeting_official_name: string;
  meeting_key: number;
  meeting_code: number;
  year: number;
}

export const Tracks = () => {
  const [tracks, setTracks] = useState<trackProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sortType, setSortType] = useState("descending");

  useEffect(() => {
    fetchData();
  }, [sortType]);

  async function fetchData() {
    try {
      const data = await fetchTracks();
      sortData(data);
    } catch (error) {
      // @ts-ignore
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function sortData(data: trackProps[]) {
    let sortedData;
    if (sortType === "descending") {
      // Sorts the data by date in descending order
      sortedData = [...data].sort((a, b) => {
        const dateA = new Date(a.date_start);
        const dateB = new Date(b.date_start);
        return dateB.getTime() - dateA.getTime();
      });
    } else if (sortType === "ascending") {
      // Sorts the data by date in ascending order
      sortedData = [...data].sort((a, b) => {
        const dateA = new Date(a.date_start);
        const dateB = new Date(b.date_start);
        return dateA.getTime() - dateB.getTime();
      });
    } else {
      return data;
    }

    setTracks(sortedData);
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  async function fetchTracks(): Promise<trackProps[]> {
    const response = await fetch(
      "https://api.openf1.org/v1/meetings?year=2024",
    );
    const data = await response.json();
    return data;
  }

  // handles the change of the select component
  const handleChange = (e: SelectChangeEvent) => {
    setSortType(e.target.value as string);
  };

  return (
    <>
      {(isLoading && <Loader></Loader>) || (
        <div>
          <h2>Tracks</h2>

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
                  <MenuItem value={"descending"}>Descending</MenuItem>
                  <MenuItem value={"ascending"}> Ascending</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>

          <br />

          {tracks.map((track) => {
            return (
              <div className="card" key={track.id}>
                <h3 className={"blue"}>{track.meeting_official_name}</h3>

                <div>
                  Year:
                  <span className={"blue"}>{track.year}</span>
                </div>

                <div>
                  Meeting Name:
                  <span className={"blue"}>{track.meeting_name}</span>
                </div>
                <div>
                  Circuit Short Name:
                  <span className={"blue"}>{track.circuit_short_name}</span>
                </div>
                <div>
                  Location:
                  <span className={"blue"}>{track.location}</span>
                </div>
                <div>
                  Country:
                  <span className={"blue"}>{track.country_name}</span>
                </div>
                <div>
                  Coutry Code:
                  <span className={"blue"}>{track.country_code}</span>
                </div>

                <div>
                  Date Start:
                  <span className={"blue"}>
                    {fullTimeFormater(track.date_start)}
                  </span>
                </div>

                <div>
                  GMT Offset:
                  <span className={"blue"}>{track.gmt_offset}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Tracks;
