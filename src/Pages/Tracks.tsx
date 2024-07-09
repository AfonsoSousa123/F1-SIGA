import { useEffect, useState } from "react";

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

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchTracks();
        setTracks(data);
      } catch (error) {
        // @ts-ignore
        setError(error.message);
      }
    }

    fetchData();
  }, []);

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

  return (
    <>
      <div>
        <h2>Tracks</h2>
        {tracks.map((track) => {
          return (
            <div className="card" key={track.id}>
              <h2>
                <span className={"gray"}>{track.meeting_official_name}</span>
              </h2>
              <div>
                Year:
                <span className={"gray"}>{track.year}</span>
              </div>

              <div>
                Meeting Name:
                <span className={"gray"}>{track.meeting_name}</span>
              </div>
              <div>
                Circuit Short Name:
                <span className={"gray"}>{track.circuit_short_name}</span>
              </div>
              <div>
                Location:
                <span className={"gray"}>{track.location}</span>
              </div>
              <div>
                Country:
                <span className={"gray"}>{track.country_name}</span>
              </div>
              <div>
                Coutry Code:
                <span className={"gray"}>{track.country_code}</span>
              </div>

              <div>
                Date Start:
                <span className={"gray"}>{track.date_start}</span>
              </div>

              <div>
                GMT Offset:
                <span className={"gray"}>{track.gmt_offset}</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Tracks;
