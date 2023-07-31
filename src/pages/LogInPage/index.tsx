import { Box } from "@mui/material";
import logo from "../../assets/images/canchasCubLogo.png";
import { Outlet } from "react-router-dom";

const LogInPage = () => {
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
          animation: { md: "fadeIn 1s ease-in-out" },
          width: { md: "40%", xs: "100%" },
          backgroundColor: { md: "background.default" },
          height: { md: "100%" },
        }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Box
          component="img"
          sx={{
            marginBottom: { xs: "0rem", md: "0rem" },
            height: "auto",
            minWidth: { xs: "40%", md: "400px" },
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
