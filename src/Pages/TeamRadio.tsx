import { useEffect, useState } from "react";
import { Loader } from "../Components/Navigation/Loader.tsx";
import { fullTimeFormater } from "../misc/date-formater/date -formater.ts";
import { Badge } from "react-bootstrap";
import Box from "@mui/material/Box";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface teamRadioProps {
  id: number;
  date: string;
  driver_number: number;
  meeting_key: number;
  session_key: number;
  recording_url: string;
}

export const TeamRadio = () => {
  const [teamRadios, setTeamRadio] = useState<teamRadioProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sortType, setSortType] = useState("descending");

  useEffect(() => {
    fetchData();
  }, [sortType]);

  async function fetchData() {
    try {
      const data = await fetchTeamRadio();
      sortData(data);
    } catch (error) {
      // @ts-ignore
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function sortData(data: teamRadioProps[]) {
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

    setTeamRadio(sortedData);
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  async function fetchTeamRadio(): Promise<teamRadioProps[]> {
    const response = await fetch(
      "https://api.openf1.org/v1/team_radio?session_key=latest&meeting_key=latest",
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
          <h2>Team Radio</h2>

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

          {teamRadios.map((teamRadio) => {
            return (
              <div className="card" key={teamRadio.id}>
                <div>
                  Driver Number:
                  <Badge bg="light" text="dark">
                    {teamRadio.driver_number}
                  </Badge>
                </div>
                <div>Audio:</div>
                <br></br>
                <audio controls>
                  <source src={teamRadio.recording_url} type="audio/mp3" />
                </audio>
                <div>
                  Date:
                  <span className={"gray"}>
                    {fullTimeFormater(teamRadio.date)}
                  </span>
                </div>
                <div>
                  Session Key:
                  <span className={"gray"}>{teamRadio.session_key}</span>
                </div>

                <div>
                  Meeting Key:
                  <span className={"gray"}>{teamRadio.meeting_key}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default TeamRadio;
