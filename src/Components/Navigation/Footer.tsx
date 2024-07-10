import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";

export const Footer = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <h4>Developed by Afonso Sousa 2024</h4>
        </AppBar>
      </Box>
    </>
  );
};

export default Footer;
