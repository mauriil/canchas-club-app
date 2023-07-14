import { Box } from "@mui/material";
import LogIn from "../../Login";
import Title from "../../Title";
import logo from "../../../assets/logo1.png";

const LogInPage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
    >
      <Box
        boxShadow="0px 0px 25px 1px rgb(0,0,0)"
        height="100%"
        width="40%"
        bgcolor="secondary.light"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Title firtLineTitle="CANCHAS" secondLineTitle=".club" />
        <Box
          component="img"
          sx={{ height: "auto", minWidth: "250px", maxWidth: "50%" }}
          src={logo}
          title="logo"
        />
      </Box>
      <Box width="50%">
        <LogIn />;
      </Box>
    </Box>
  );
};

export default LogInPage;
