/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Box, Typography } from "@mui/material";
import { useAuth } from "../../customHooks/useAuth";
import AvatarIcon from "../../components/Avatar";
import PerfilOptions from "../../components/Perfil/PerfilOptions";
import { getPlanStatus } from "../../api/users";
import { useEffect, useState } from "react";
import PerfilPlanStatus from "../../components/Perfil/PerfilPlanStatus";
import PerfilShowPlans from "../../components/Perfil/PerfilShowPlans";
import PerfilEdit from "../../components/Perfil/PerfilEdit";
import MercadoPagoToken from "../../components/Perfil/MercadoPagoToken";
import CanchasClubLoader from "../../components/Loader";
import fondoDeportesDesktop from "../../assets/images/canchasClubFondoDeportesDesktop.jpg";
import fondoDeportesMobile from "../../assets/images/canchasClubFondoDeportesMobile.jpg";
import PerfilBankAccount from "../../components/Perfil/PerfilBankAccount";

const Perfil = () => {
  const { user } = useAuth();
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("menu");
  const checkPremium = async () => {
    const planStatus = await getPlanStatus();
    setIsPremium(planStatus.type !== "free" && planStatus.type !== "");
    setIsLoading(false);
  };
  useEffect(() => {
    void checkPremium();
  }, []);

  const handleItemClick = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <Box
      sx={{
        flexDirection: { md: "row", xs: "column" },
        backgroundColor: { xs: "background.paper" },
        backgroundImage: {
          md: `url(${fondoDeportesDesktop})`,
        },
        backgroundSize: {
          md: "cover",
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
          backgroundImage: `url(${fondoDeportesMobile})`,
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
        paddingBottom={{ md: "0px", xs: "15rem" }}
        marginTop={{ md: "0px", xs: "1rem" }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "100%" },
            height: "auto",
            marginRight: { md: "5rem" },
            marginLeft: { md: "5rem" },
            backgroundColor: { md: "background.default" },
            borderRadius: "15px",
            boxShadow: isLoading
              ? { md: "0px 0px 25px 1px rgb(0,0,0)" }
              : "none",
          }}
        >
          {isLoading ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "1rem",
              }}
            >
              <CanchasClubLoader width="80%" />
            </Box>
          ) : selectedOption === "menu" ? (
            <PerfilOptions
              isPremium={isPremium}
              onItemClick={handleItemClick}
            />
          ) : selectedOption === "myPlan" ? (
            <PerfilPlanStatus onItemClick={handleItemClick} />
          ) : selectedOption === "showPlans" ? (
            <PerfilShowPlans onItemClick={handleItemClick} />
          ) : selectedOption === "editProfile" ? (
            <PerfilEdit onItemClick={handleItemClick} />
          ) : selectedOption === "mercadoPagoToken" ? (
            <MercadoPagoToken onItemClick={handleItemClick} />
          ) : selectedOption === "myAccountSettings" ? (
            <PerfilBankAccount onItemClick={handleItemClick} />
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default Perfil;
