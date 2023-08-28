/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Box, Typography } from "@mui/material";
import { useAuth } from "../../customHooks/useAuth";
import AvatarIcon from "../../components/Avatar";
import PerfilButton from "../../components/PerfilButton";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyIcon from "@mui/icons-material/Key";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import useCheckOrientation from "../../customHooks/checkOrientation";

const Perfil = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const logOut = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    Cookies.remove("access-token", import.meta.env.VITE_ENV === "development" ? {} : { path: "/", domain: import.meta.env.VITE_COOKIE_DOMAIN });
    navigate("/index/login");
  };

  const orientation = useCheckOrientation();

  return (
    <Box
      sx={{
        flexDirection: { md: "row", xs: "column" },
        backgroundColor: { xs: "background.paper" },
        backgroundImage: {
          md: `url(https://canchas-club-space.nyc3.cdn.digitaloceanspaces.com/identidad-marca/FONDO%20DEPORTES/CanchasClub_FondoDeportes_EDITABLE-01.jpg)`,
        },
        backgroundSize:{
          md: "cover"
        },
      }}
      display="flex"
      justifyContent="space-around"
      alignItems="center"
      height="100vh"
      width="100vw"
    >
      <Box
        width="100%"
        height="45%"
        sx={{
          top: "0px",
          marginTop: { md: "0px", xs: orientation === 'landscape' ? "15rem" : "0px" },
          display: { xs: "flex", md: "none" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
          boxShadow: "0px 0px 25px 1px rgb(0,0,0)",
          backgroundImage: `url(https://canchas-club-space.nyc3.cdn.digitaloceanspaces.com/identidad-marca/FONDO%20DEPORTES/CanchasClub_FondoDeportes_EDITABLE-02.jpg)`,
          backgroundSize: "cover",
        }}
      >
        <AvatarIcon width="8rem" height="8rem" />
        <Typography component="h2" fontSize="2rem">
          {user?.userName}
        </Typography>
      </Box>
      <Box
        sx={{
          flexDirection: { md: "row", xs: "column" },
        }}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        height="100vh"
        width="100vw"
        paddingBottom={
          { md: "0px", xs: "15rem" }
        }
        marginTop={
          { md: "0px", xs: "6rem" }
        }
      >
        <Box
          sx={{
            boxShadow: { md: "0px 0px 25px 1px rgb(0,0,0)" },
            animation: { md: "fadeIn 1s ease-in-out" },
            width: { md: "40%", xs: "100%" },
            backgroundColor: { md: "background.default" },
            height: { md: "60%" },
            display: { xs: "none", md: "flex" },
          }}
          marginLeft="3rem"
          borderRadius="15px"
          justifyContent="space-around"
          alignItems="center"
          flexDirection="column"
        >
          <Box
            sx={{
              width: "100%",
              backgroundColor: { md: "background.default" },
              height: "23%",
              display: "flex",
              flexDirection: "column",
            }}
            padding="10rem"
            borderRadius="15px"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <AvatarIcon width="8rem" height="8rem" />
            <Typography component="h2" fontSize="2rem">
              {user?.userName}
            </Typography>
          </Box>
          <Box
            padding="3rem"
            width="100%"
            height="100%"
            display="flex"
            justifyContent="space-around"
            flexDirection="column"
          >
            <Typography component="h2" fontSize="2rem">
              {user?.userName}
            </Typography>
            <Typography component="h2" fontSize="2rem">
              {user?.userName}
            </Typography>
            <Typography component="h2" fontSize="2rem">
              {user?.userName}
            </Typography>
            <Typography component="h2" fontSize="2rem">
              {user?.userName}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            height: "60%",
            marginRight: { md: "3rem" },
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-around"
            height="100%"
            width="100%"
            borderRadius="15px"
            sx={{
              backgroundColor: { md: "background.paper" },
              boxShadow: { md: "0px 0px 25px 1px rgb(0,0,0)" },
            }}
          >
            <PerfilButton text="Editar Perfil" icon={<PersonOutlineIcon />} />
            <PerfilButton text="Editar Perfil" icon={<PersonOutlineIcon />} />
            <PerfilButton text="Mercado Pago token" icon={<KeyIcon />} />
            <PerfilButton
              onClick={logOut}
              text="Cerrar sesion"
              icon={<LogoutIcon />}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Perfil;
