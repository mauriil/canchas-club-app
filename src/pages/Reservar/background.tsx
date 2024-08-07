import { Box } from "@mui/material";
import useScreenSize from "../../customHooks/screenSize";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const screenWidth = useScreenSize().width;

  return (
    <Box
      bgcolor={"background.paper"}
      alignItems="center"
      height="100vh"
      width="100vw"
      paddingBottom={screenWidth < 900 ? "6rem" : "0"}
      paddingTop={screenWidth < 900 ? "0" : "7rem"}
      sx={{
        minHeight: '100vh',
        overflow: 'auto',
      }}
    >
      <Outlet />
    </Box>
  );
};

export default Dashboard;
