import './App.css'
import {useEffect, useState} from "react";

type driverProps = {
    driver_number: number;
    broadcast_name: string,
    full_name: string,
    name_acronym: string,
    team_name: string,
    team_colour: string,
    first_name: string,
    last_name: string,
    headshot_url: string,
    country_code: string,
    session_key: number,
    meeting_key: number
};

function App() {
    const [drivers, setDrivers] = useState<driverProps[]>([]);

    useEffect(() => {
        const CallDrivers = async () => {
            const data = await fetch("https://api.openf1.org/v1/drivers?session_key=7763", {
                method: "GET"
            });
            const jsonData = await data.json();
            setDrivers(jsonData.drivers);
            console.log(data.json());
        };

        CallDrivers();
    }, []);

  return (
    <>
      <h1>F1 SIGA</h1>
        <h3>Just a simple Formula One Wiki...</h3>

      <div className="card">
          {drivers.map((driver) => {
              return (
                  <div>
                      <div>{driver.driver_number}</div>
                      <div>{driver.broadcast_name}</div>
                      <div>{driver.full_name}</div>
                      <div>{driver.name_acronym}</div>
                      <div>{driver.team_name}</div>
                      <div>{driver.team_colour}</div>
                      <div>{driver.first_name}</div>
                      <div>{driver.last_name}</div>
                      <div>{driver.headshot_url}</div>
                      <div>{driver.country_code}</div>
                      <div>{driver.session_key}</div>
                  </div>
              );
          })}
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
