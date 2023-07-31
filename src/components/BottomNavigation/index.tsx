/* eslint-disable @typescript-eslint/no-unsafe-argument */
import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import EventIcon from "@mui/icons-material/Event";
import BallotIcon from "@mui/icons-material/Ballot";
import SettingsIcon from "@mui/icons-material/Settings";
import { useAuth } from "../../customHooks/useAuth";
import { Avatar } from "@mui/material";
import AvatarIcon from "../Avatar";
import { NavLink } from "react-router-dom";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const { user } = useAuth();

  return (
    <Box sx={{ width: "100%" }}>
      <BottomNavigation
        showLabels
        value={value}
        sx={{ position: "fixed", bottom: "0px", width: "100vw" }}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <NavLink to="misReservas">
          <BottomNavigationAction
            label="Mis Reservas"
            icon={<EventIcon sx={{ fontSize: "35px" }} />}
          />
        </NavLink>
        <NavLink to="miClub">
          <BottomNavigationAction
            label="Mi Club"
            icon={<BallotIcon sx={{ fontSize: "35px" }} />}
          />
        </NavLink>
        <NavLink to="configuraciones">
          <BottomNavigationAction
            label="Configuracion"
            icon={<SettingsIcon sx={{ fontSize: "35px" }} />}
          />
        </NavLink>
        <BottomNavigationAction
          label={user?.userName}
          icon={<AvatarIcon width="35px" height="35px" />}
        />
      </BottomNavigation>
    </Box>
  );
}
