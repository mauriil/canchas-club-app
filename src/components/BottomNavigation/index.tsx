/* eslint-disable @typescript-eslint/no-unsafe-argument */
import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import EventIcon from "@mui/icons-material/Event";
import BallotIcon from "@mui/icons-material/Ballot";
import { useAuth } from "../../customHooks/useAuth";
import AvatarIcon from "../Avatar";
import HomeIcon from "@mui/icons-material/Home";
import { NavLink } from "react-router-dom";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const { user } = useAuth();

  return (
    <Box sx={{ width: "100%" }}>
      <BottomNavigation
        showLabels
        value={value}
        sx={{
          position: "fixed",
          bottom: "0px",
          width: "100vw",
          zIndex: "100",
          marginTop: "calc(100vh - 300px)",
          backgroundColor: "primary.light",
        }}
          onChange={(event, newValue) => {
        setValue(newValue);
        }}
      >
      <BottomNavigationAction
        label="Home"
        icon={
          <NavLink to="home">
            <HomeIcon sx={{ fontSize: "35px" }} />
          </NavLink>
        }
      />

      <BottomNavigationAction
        label="Mis Reservas"
        icon={
          <NavLink to="misReservas">
            <EventIcon sx={{ fontSize: "35px" }} />
          </NavLink>
        }
      />

      <BottomNavigationAction
        label="Mis Clubes"
        icon={
          <NavLink to="miClub">
            <BallotIcon sx={{ fontSize: "35px" }} />
          </NavLink>
        }
      />

      <BottomNavigationAction
        label={user?.userName}
        icon={
          <NavLink to="miPerfil">
            <AvatarIcon width="35px" height="35px" />
          </NavLink>
        }
      />
    </BottomNavigation>
    </Box >
  );
}
