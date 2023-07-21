import { Box } from "@mui/material";
import useScreenSize from "../../customHooks/screenSize";
import Title from "../../components/Title";
import logo from "../../assets/images/canchasCubLogo.png";
import { Outlet } from "react-router-dom";

const LogInPage = () => {
  const screenSize = useScreenSize().width;

  return (
    <Box
      sx={{
        flexDirection: { md: "row", xs: "column" },
      }}
      display="flex"
      justifyContent="space-around"
      bgcolor={"background.default"}
      alignItems="center"
      height="100vh"
      width="100vw"
    >
    </Box>
  );
};

export default LogInPage;
