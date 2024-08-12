import { useEffect, useState } from "react";
import { Loader } from "../Components/Navigation/Loader.tsx";
import { timeFormater } from "../misc/date-formater/date -formater.ts";
import Box from "@mui/material/Box";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface positionsProps {
  id: number;
  date: string;
  driver_number: number;
  position: number;
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

export const Positions = () => {
  const [positions, setPositions] = useState<positionsProps[]>([]);
  const [sessions, setSession] = useState<sessionProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sortType, setSortType] = useState("descending");

  useEffect(() => {
    fetchData();
  }, [sortType]);

  async function fetchData() {
    try {
      const data = await fetchPositions();
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
  function sortData(data: positionsProps[]) {
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

    setPositions(sortedData);
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // fetches the race control data
  async function fetchPositions(): Promise<positionsProps[]> {
    const response = await fetch(
      "https://api.openf1.org/v1/position?session_key=latest&meeting_key=latest",
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
          <h2>Positions of the Cars</h2>

          <h4>From 1 to 20</h4>

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
                  <MenuItem value={"descending"}>Latest</MenuItem>
                  <MenuItem value={"ascending"}>Oldest</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>

          <br />

          <table className={"positions-table"}>
            <thead>
              <tr>
                <th className={"blue"}>Position</th>
                <th className={"blue"}>Driver Number</th>
                <th className={"blue"}>Date</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((position) => {
                return (
                  <tr key={position.id}>
                    <td>{position.position}</td>
                    <td>{position.driver_number}</td>
                    <td>{timeFormater(position.date)}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot></tfoot>
          </table>
        </div>
      )}
    </>
  );
};

export default Positions;
