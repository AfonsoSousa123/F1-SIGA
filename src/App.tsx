import "./App.css";
import { TabsBar } from "./Components/Navigation/TabsBar.tsx";
import Footer from "./Components/Navigation/Footer.tsx";
import IntroVideo from "./Components/Features/IntroVideo.tsx";

function App() {
  return (
    <>
      {/*Header Section*/}
      {/*<Menu></Menu>*/}
      {/*Main Content Section*/}
      <h1>F1 SIGA</h1>
      <h3>Just a simple Formula One Wiki...</h3>

      <IntroVideo></IntroVideo>
      <br />
      <TabsBar></TabsBar>

      <Footer></Footer>
      {/*Footer Section*/}
    </>
  );
}

export default App;
