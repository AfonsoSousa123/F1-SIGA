import { useEffect, useState } from "react";
import { Loader } from "../Components/Navigation/Loader.tsx";
import Image from "react-bootstrap/Image";

interface driverProps {
  id: number;
  driver_number: number;
  broadcast_name: string;
  full_name: string;
  name_acronym: string;
  team_name: string;
  team_colour: string;
  first_name: string;
  last_name: string;
  headshot_url: string;
  country_code: string;
  session_key: number;
  meeting_key: number;
}

export const Drivers = () => {
  const [drivers, setDrivers] = useState<driverProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchDrivers();
        setDrivers(data);
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

  async function fetchDrivers(): Promise<driverProps[]> {
    const response = await fetch(
      "https://api.openf1.org/v1/drivers?meeting_key=1229&session_key=9465",
    );
    const data = await response.json();
    return data;
  }

  return (
    <>
      {(isLoading && <Loader></Loader>) || (
        <div>
          <h2>Drivers</h2>
          {drivers.map((driver) => {
            return (
              <div className="card" key={driver.id}>
                <Image
                  alt={driver.name_acronym}
                  src={driver.headshot_url}
                  roundedCircle
                />
                <div>
                  Number:
                  <span className={"blue"}>{driver.driver_number}</span>
                </div>
                <div>
                  Full Name:
                  <span className={"blue"}>{driver.full_name}</span>
                </div>
                <div>
                  Broadcast Name:
                  <span className={"blue"}>{driver.broadcast_name}</span>
                </div>
                <div>
                  Shortname:
                  <span className={"blue"}>{driver.name_acronym}</span>
                </div>
                <div color={driver.team_colour}>
                  Team:
                  <span className={"blue"}>{driver.team_name}</span>
                </div>
                <div>
                  Country:
                  <span className={"blue"}>{driver.country_code}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Drivers;
