/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Box, Typography } from "@mui/material";
import { useAuth } from "../../customHooks/useAuth";
import AvatarIcon from "../../components/Avatar";
import PerfilOptions from "../../components/Perfil/PerfilOptions";
import { getPlanStatus } from "../../api/users";
import { useEffect, useState } from "react";
import PerfilPlanStatus from "../../components/Perfil/PerfilPlanStatus";
import PerfilShowPlans from "../../components/Perfil/PerfilShowPlans";

const Perfil = () => {
  const { user } = useAuth();
  const [isPremium, setIsPremium] = useState(false);
  const [selectedOption, setSelectedOption] = useState("menu");

  const checkPremium = async () => {
    const planStatus = await getPlanStatus();
    setIsPremium(planStatus.type !== "free");
  }
  useEffect(() => {
    void checkPremium();
  }, []);

  const handleItemClick = (option: string) => {
    switch (option) {
      case 'editProfile':
        // Lógica para "Editar Perfil"
        // ...
        break;
      case 'myPlan':
        setSelectedOption('myPlan')
        break;
      case 'showPlans':
        setSelectedOption('showPlans')
        break;
      case 'mercadoPagoToken':
        // Lógica para "Mercado Pago token"
        // ...
        break;
      default:
        setSelectedOption('menu')
        break;
    }
  };

  return (
    <Box
      sx={{
        flexDirection: { md: "row", xs: "column" },
        backgroundColor: { xs: "background.paper" },
        backgroundImage: {
          md: `url(https://canchas-club.s3.amazonaws.com/CanchasClub_IdentidadMarca/FONDO+DEPORTES/CanchasClub_FondoDeportes_EDITABLE-01.jpg)`,
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
        height="25%"
        sx={{
          top: "0px",
          marginTop: { md: "0px" },
          display: { xs: "flex", md: "none" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
          boxShadow: "0px 0px 25px 1px rgb(0,0,0)",
          backgroundImage: `url(https://canchas-club.s3.amazonaws.com/CanchasClub_IdentidadMarca/FONDO+DEPORTES/CanchasClub_FondoDeportes_EDITABLE-02.jpg)`,
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
        height="75%"
        width="100vw"
        paddingBottom={
          { md: "0px", xs: "15rem" }
        }
        marginTop={
          { md: "0px", xs: "1rem" }
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
            height: "auto",
            marginRight: { md: "3rem" },
          }}
        >
          {
            selectedOption === 'menu' ? (
              <PerfilOptions isPremium={isPremium} onItemClick={handleItemClick}/>
            ) :
            selectedOption === 'myPlan' ? (
              <PerfilPlanStatus onItemClick={handleItemClick} />
            ) :
            selectedOption === 'showPlans' ? (
              <PerfilShowPlans onItemClick={handleItemClick}/>
            ) : null
          }
        </Box>
      </Box>
    </Box>
  );
};

export default Perfil;
