import BottomNavigation from "../../components/BottomNavigation";
import { Box } from "@mui/material";
import useScreenSize from "../../customHooks/screenSize";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const screenWidth = useScreenSize().width;

  return (
    <Box
      bgcolor={"primary.dark"}
      alignItems="center"
      height="100vh"
      width="100vw"
    >
      {screenWidth < 900 ? <BottomNavigation /> : <Header />}
      <Outlet />
    </Box>
  );
};

export default Dashboard;
