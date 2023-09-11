import { Box } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import BusinessIcon from "@mui/icons-material/Business";
import KeyIcon from "@mui/icons-material/Key";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import PerfilButton from "../PerfilButton";

interface UserProfileOptionsProps {
  isPremium: boolean;
  onItemClick: (option: string) => void;
}

const UserProfileOptions = ({
  isPremium,
  onItemClick,
}: UserProfileOptionsProps) => {
  const navigate = useNavigate();

  const logOut = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    Cookies.remove(
      "access-token",
      import.meta.env.VITE_ENV === "development"
        ? {}
        : { path: "/", domain: import.meta.env.VITE_COOKIE_DOMAIN }
    );
    navigate("/index/login");
  };

  return (
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
      marginTop={{ xs: "2rem" }}
      padding={{ md: "3rem" }}
    >
      <PerfilButton text="Editar Perfil" icon={<PersonOutlineIcon />} />
      {isPremium ? (
        <PerfilButton
          text="Mi plan"
          icon={<AccountBalanceWalletIcon />}
          onClick={() => onItemClick("myPlan")}
        />
      ) : (
        <PerfilButton
          text="Soy dueño de un club"
          icon={<BusinessIcon />}
          onClick={() => onItemClick("showPlans")}
        />
      )}
      <PerfilButton text="Mercado Pago token" icon={<KeyIcon />} />
      <PerfilButton
        onClick={logOut}
        text="Cerrar sesion"
        icon={<LogoutIcon />}
      />
    </Box>
  );
};

export default UserProfileOptions;
