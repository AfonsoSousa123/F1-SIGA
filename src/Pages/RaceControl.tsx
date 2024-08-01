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

interface raceControlInfoProps {
  id: number;
  date: string;
  message: string;
  category: string;
  flag: string;
  sector: string;
  scope: string;
  lap_number: number;
  driver_number: number;
  meeting_key: number;
  session_key: number;
}

interface sessionProps {
  id: number;
  circuit_short_name: string;
  country_name: string;
  location: string;
  meeting_key: number;
  session_key: number;
  session_name: string;
  session_type: string;
}

export const RaceControl = () => {
  const [raceControlInfo, setRaceControl] = useState<raceControlInfoProps[]>(
    [],
  );
  const [sessions, setSession] = useState<sessionProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sortType, setSortType] = useState("descending");

  useEffect(() => {
    fetchData();
  }, [sortType]);

  async function fetchData() {
    try {
      const data = await fetchRaceControl();
      const sessionData = await fetchSession();
      setSession(sessionData);
      sortData(data);
    } catch (error) {
      // @ts-ignore
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  // using data from parameter instead of state
  function sortData(data: raceControlInfoProps[]) {
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

    setRaceControl(sortedData);
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // fetches the race control data
  async function fetchRaceControl(): Promise<raceControlInfoProps[]> {
    const response = await fetch(
      "https://api.openf1.org/v1/race_control?session_key=latest&meeting_key=latest",
    );
    return await response.json();
  }

  // fetches the session data
  async function fetchSession(): Promise<sessionProps[]> {
    const response = await fetch(
      "https://api.openf1.org/v1/sessions?session_key=latest&meeting_key=latest",
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
          <h2>Race Control</h2>

          {sessions.map((session) => {
            return (
              <div key={session.id}>
                <h2>
                  {session.circuit_short_name} {session.session_type}
                </h2>

                <h3>
                  {session.country_name} {session.location}
                </h3>
              </div>
            );
          })}

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

          {raceControlInfo.map((raceControl) => {
            return (
              <div className="card" key={raceControl.id}>
                <div>
                  <h3 className={"gray"}>{raceControl.message}</h3>
                </div>
                {raceControl.category == "Flag" && (
                  <>
                    <div>
                      Category:
                      <span className={"gray"}>{raceControl.category}</span>
                    </div>
                    <div>
                      Flag:
                      <span className={"gray"}>{raceControl.flag}</span>
                    </div>
                  </>
                )}
                {raceControl.scope == "Driver" && (
                  <>
                    <div>
                      Driver Number:
                      <span className={"gray"}>
                        {raceControl.driver_number}
                      </span>
                    </div>
                  </>
                )}

                {/*<div>*/}
                {/*  Type:*/}
                {/*  <span className={"gray"}>{raceControl.scope}</span>*/}
                {/*</div>*/}

                {raceControl.scope == "Sector" && (
                  <>
                    <div>
                      Sector:
                      <span className={"gray"}>{raceControl.sector}</span>
                    </div>
                  </>
                )}
                <div>
                  Lap Number:
                  <span className={"gray"}>{raceControl.lap_number}</span>
                </div>
                <div>
                  Date:
                  <span className={"gray"}>
                    {fullTimeFormater(raceControl.date)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default RaceControl;
