import "./App.css";
import Drivers from "./Pages/Drivers.tsx";
import Tracks from "./Pages/Tracks.tsx";
import { Tab } from "@mui/material";
import { TabsBar } from "./Components/Navigation/TabsBar.tsx";

function App() {
  return (
    <>
      {/*<Menu></Menu>*/}
      <h1>F1 SIGA</h1>
      <h3>Just a simple Formula One Wiki...</h3>
      <TabsBar></TabsBar>

      <Drivers></Drivers>
      <Tracks></Tracks>

      <Tab></Tab>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
