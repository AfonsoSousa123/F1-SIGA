import "./App.css";
import { TabsBar } from "./Components/Navigation/TabsBar.tsx";
import Footer from "./Components/Navigation/Footer.tsx";
import { Container } from "@mui/material";
import Hero from "./Components/Features/Hero.tsx";
// import Menu from "./Components/Navigation/Menu.tsx";

function App() {
  return (
    <>
      {/*Header Section*/}
      {/*<Menu></Menu>*/}
      {/*Main Content Section*/}
      <Container>
        <Hero />
        <br />
        <TabsBar></TabsBar>
      </Container>

      <Footer></Footer>
      {/*Footer Section*/}
    </>
  );
}

export default App;
