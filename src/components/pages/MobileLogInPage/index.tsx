import { Box } from "@mui/material";
import Title from "../../Title";
import LogIn from "../../Login";
import logo from "../../../assets/logo1.png";

const MobileLoginPage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="100vh"
      width="100vw"
    >
      <Box
        // height="100%"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Title firtLineTitle="CANCHAS.club" />
        <Box
          component="img"
          marginBottom="2rem"
          sx={{ height: "auto", minWidth: "25%", maxWidth: "100px" }}
          src={logo}
          title="logo"
        />
      </Box>
      <Box>
        <LogIn />;
      </Box>
    </Box>
  );
};

export default MobileLoginPage;
