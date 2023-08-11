import { Box, Typography } from "@mui/material";
import TemporaryDrawer from "../Drawer";
import AvatarIcon from "../Avatar";
import { useAuth } from "../../customHooks/useAuth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate("/dashboard/configuraciones");
  };

  return (
    <Box
      width="100%"
      top="0px"
      position="fixed"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      boxShadow="0px 0px 25px 0px"
      padding="1rem 2rem"
      bgcolor={"ButtonShadow"}
      zIndex="10"
    >
      <TemporaryDrawer />
      <Box display="flex" alignItems="center" justifyContent="flex-end" onClick={goToProfile} onPointerOver={
        (e) => {
          (e.target as HTMLDivElement).style.cursor = "pointer";
        }
      }>
        <Typography fontSize={"2rem"} marginRight="2rem">
          {user?.userName}
        </Typography>
        <AvatarIcon width="50px" height="50px" />
      </Box>
    </Box>
  );
};

export default Header;
