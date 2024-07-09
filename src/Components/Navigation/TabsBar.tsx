import Box from "@mui/material/Box";
import { Tab, Tabs } from "@mui/material";
import { useState } from "react";

class SyntheticEvent {}

export const TabsBar = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%", bgcolor: "darkgray" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Drivers" />
          <Tab label="Tracks" />
          <Tab label="Team Radios" />
        </Tabs>
      </Box>
    </>
  );
};
