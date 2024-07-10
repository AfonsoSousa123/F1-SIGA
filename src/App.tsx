import "./App.css";
import { TabsBar } from "./Components/Navigation/TabsBar.tsx";
import Footer from "./Components/Navigation/Footer.tsx";

function App() {
  return (
    <>
      {/*Header Section*/}
      {/*<Menu></Menu>*/}
      {/*Main Content Section*/}
      <h1>F1 SIGA</h1>
      <h3>Just a simple Formula One Wiki...</h3>

      <TabsBar></TabsBar>

      <Footer></Footer>
      {/*Footer Section*/}
    </>
  );
}

export default App;
