import { Box } from "@mui/material";
import useScreenSize from "../../../customHooks/screenSize";
import Title from "../../Title";
import logo from "../../../assets/logo1.png";
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
      alignItems="center"
      height="100vh"
      width="100vw"
    >
      <Box
        sx={{
          boxShadow: { md: "0px 0px 25px 1px rgb(0,0,0)" },
          width: { md: "40%", xs: "100%" },
          backgroundColor: { md: "secondary.light" },
          height: { md: "100%" },
        }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        {screenSize > 900 ? (
          <Title firtLineTitle="CANCHAS" secondLineTitle=".club" />
        ) : (
          <Title firtLineTitle="CANCHAS.club" />
        )}
        <Box
          component="img"
          sx={{
            marginBottom: { xs: "2rem", md: "0rem" },
            height: "auto",
            minWidth: { xs: "25%", md: "250px" },
            maxWidth: { xs: "100px", md: "50%" },
          }}
          src={logo}
          title="logo"
        />
      </Box>
      <Box sx={{ width: { md: "50%" } }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default LogInPage;
