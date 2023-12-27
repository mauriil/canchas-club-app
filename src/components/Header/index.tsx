import { Box, Typography } from "@mui/material";
import TemporaryDrawer from "../Drawer";
import AvatarIcon from "../Avatar";
import { useAuth } from "../../customHooks/useAuth";
import { useNavigate } from "react-router-dom";
import canchasClubLogo from "../../assets/images/canchasCubLogo.png";

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate("/dashboard/miPerfil");
  };

  return (
    <Box
      width="100%"
      top="0px"
      position="fixed"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      padding="1rem 2rem"
      bgcolor={"#F5F5F5"}
      zIndex="10"
      borderBottom={"1px solid #E0E0E0"}
    >
      <Box width="33%">
        <TemporaryDrawer />
      </Box>
      <Box
        height="60px"
        component="img"
        alt="Logo Canchas Club"
        src={canchasClubLogo}
        className="logo"
        margin="auto"
      />
      <Box
        display="flex"
        width="33%"
        alignItems="center"
        justifyContent="flex-end"
        onClick={goToProfile}
        onPointerOver={(e) => {
          (e.target as HTMLDivElement).style.cursor = "pointer";
        }}
      >
        <Typography fontSize={"2rem"} marginRight="2rem">
          {user?.userName}
        </Typography>
        <AvatarIcon width="50px" height="50px" />
      </Box>
    </Box>
  );
};

export default Header;
