import Box from "@mui/material/Box";
import { Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import TabContent from "./TabContent.tsx";
import Drivers from "../../Pages/Drivers.tsx";
import Tracks from "../../Pages/Tracks.tsx";
import { TeamRadio } from "../../Pages/TeamRadio.tsx";
import RaceWeekend from "../../Pages/RaceWeekend.tsx";
import RaceControl from "../../Pages/RaceControl.tsx";
import Weather from "../../Pages/Weather.tsx";
import { Positions } from "../../Pages/Positions.tsx";

export const TabsBar = () => {
  const [value, setValue] = useState(0);

  // @ts-ignore
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function Props(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <>
      <Box sx={{ width: "100%", bgcolor: "darkgray" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Race Weekend" {...Props(0)} />
          <Tab label="Drivers" {...Props(1)} />
          <Tab label="Tracks" {...Props(2)} />
          <Tab label="Team Radios" {...Props(3)} />
          <Tab label="Race Control" {...Props(4)} />
          <Tab label="Weather" {...Props(5)} />
          <Tab label="Positions" {...Props(6)} />
        </Tabs>
      </Box>

      <TabContent index={0} value={value}>
        <RaceWeekend></RaceWeekend>
      </TabContent>
      <TabContent index={1} value={value}>
        <Drivers></Drivers>
      </TabContent>
      <TabContent index={2} value={value}>
        <Tracks></Tracks>
      </TabContent>
      <TabContent index={3} value={value}>
        <TeamRadio></TeamRadio>
      </TabContent>
      <TabContent index={4} value={value}>
        <RaceControl></RaceControl>
      </TabContent>
      <TabContent index={5} value={value}>
        <Weather></Weather>
      </TabContent>
      <TabContent index={6} value={value}>
        <Positions></Positions>
      </TabContent>
    </>
  );
};

export default TabsBar;
