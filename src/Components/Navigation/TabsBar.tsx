import Box from "@mui/material/Box";
import { Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import TabContent from "./TabContent.tsx";
import Drivers from "../../Pages/Drivers.tsx";
import Tracks from "../../Pages/Tracks.tsx";
import { TeamRadio } from "../../Pages/TeamRadio.tsx";

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
          <Tab label="Drivers" {...Props(0)} />
          <Tab label="Tracks" {...Props(1)} />
          <Tab label="Team Radios" {...Props(2)} />
        </Tabs>
      </Box>

      <TabContent index={0} value={value}>
        <Drivers></Drivers>
      </TabContent>
      <TabContent index={1} value={value}>
        <Tracks></Tracks>
      </TabContent>
      <TabContent index={2} value={value}>
        <TeamRadio></TeamRadio>
      </TabContent>
    </>
  );
};

export default TabsBar;
