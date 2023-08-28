import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EventIcon from "@mui/icons-material/Event";
import MenuIcon from "@mui/icons-material/Menu";
import BallotIcon from "@mui/icons-material/Ballot";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import { NavLink } from "react-router-dom";

type Anchor = "left";

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <NavLink to="Home">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
        </NavLink>
        <NavLink to="misReservas">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary="Mis reservas" />
            </ListItemButton>
          </ListItem>
        </NavLink>
        <NavLink to="miClub">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <BallotIcon />
              </ListItemIcon>
              <ListItemText primary="Mis clubes" />
            </ListItemButton>
          </ListItem>
        </NavLink>
      </List>
      <Divider />
      <List>
        <NavLink to="miPerfil">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary="prueba" />
            </ListItemButton>
          </ListItem>
        </NavLink>
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Button
          color="primary"
          variant="outlined"
          sx={{ width: "5rem", height: "5rem" }}
          onClick={toggleDrawer("left", true)}
        >
          <MenuIcon sx={{ fontSize: "3rem" }} />
        </Button>
        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
