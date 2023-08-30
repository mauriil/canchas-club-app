import BottomNavigation from "../../components/BottomNavigation";
import { Box } from "@mui/material";
import useScreenSize from "../../customHooks/screenSize";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

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
      {screenWidth < 900 ? <BottomNavigation /> : <Header />}
      <Outlet />
    </Box>
  );
};

export default Dashboard;
