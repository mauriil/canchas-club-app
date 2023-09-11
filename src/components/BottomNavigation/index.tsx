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
import { getPlanStatus } from "../../api/users";
import canchasClubLogo from "../../assets/images/canchasCubLogo.png";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const [isPremium, setIsPremium] = React.useState(false);
  const { user } = useAuth();

  const checkPremium = async () => {
    const planStatus = await getPlanStatus();
    setIsPremium(planStatus.type !== "free" && planStatus.status === "active");
  };
  React.useEffect(() => {
    void checkPremium();
  }, []);

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
          backgroundColor: "#F5F5F5",
          borderBottom: "1px solid #E0E0E0",
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
          icon={
            <NavLink to="home">
              <Box
                height="50px"
                component="img"
                alt="Logo Canchas Club"
                src={canchasClubLogo}
                className="logo"
              />
            </NavLink>
          }
        />
        {isPremium && (
          <BottomNavigationAction
            label="Mis Clubes"
            icon={
              <NavLink to="miClub">
                <BallotIcon sx={{ fontSize: "35px" }} />
              </NavLink>
            }
          />
        )}

        <BottomNavigationAction
          label={user?.userName}
          icon={
            <NavLink to="miPerfil">
              <AvatarIcon width="35px" height="35px" />
            </NavLink>
          }
        />
      </BottomNavigation>
    </Box>
  );
}
