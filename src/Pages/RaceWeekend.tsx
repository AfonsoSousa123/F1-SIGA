import { useEffect, useState } from "react";
import { Loader } from "../Components/Navigation/Loader.tsx";
import {
  dateFormater,
  timeFormater,
} from "../misc/date-formater/date -formater.ts";

interface raceProps {
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

export const RaceWeekend = () => {
  const [raceWeek, setRaceWeek] = useState<raceProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchLatestRace();
        setRaceWeek(data);
      } catch (error) {
        // @ts-ignore
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  async function fetchLatestRace(): Promise<raceProps[]> {
    const response = await fetch(
      "https://api.openf1.org/v1/meetings?meeting_key=latest",
    );
    const data = await response.json();
    return data;
  }

  return (
    <>
      {isLoading && <Loader></Loader>}
      <div>
        <h2>Race Weekend</h2>
        {raceWeek.map((track) => {
          return (
            <div className="card" key={track.id}>
              <div>
                <h3 className={"blue"}>{track.meeting_official_name}</h3>
              </div>
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
                <span className={"blue"}>{dateFormater(track.date_start)}</span>
                <span className={"blue"}>{timeFormater(track.date_start)}</span>
              </div>

              <div>
                GMT Offset:
                <span className={"blue"}>{track.gmt_offset}</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RaceWeekend;
