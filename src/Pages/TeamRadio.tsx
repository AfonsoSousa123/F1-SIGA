import { useEffect, useState } from "react";
import { Loader } from "../Components/Navigation/Loader.tsx";
import { fullTimeFormater } from "../misc/date-formater/date -formater.ts";

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

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchTeamRadio();
        setTeamRadio(data);
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

  async function fetchTeamRadio(): Promise<teamRadioProps[]> {
    const response = await fetch(
      "https://api.openf1.org/v1/team_radio?session_key=9465&meeting_key=1229",
    );
    const data = await response.json();
    return data;
  }

  return (
    <>
      {isLoading && <Loader></Loader>}
      <div>
        <h2>Team Radio</h2>
        {teamRadios.map((teamRadio) => {
          return (
            <div className="card" key={teamRadio.id}>
              <div>
                Driver Number:
                <span className={"gray"}>{teamRadio.driver_number}</span>
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
    </>
  );
};

export default TeamRadio;
