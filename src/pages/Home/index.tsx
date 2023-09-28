import { Box } from "@mui/material";
import Title from "../../components/Title";
import { useEffect } from "react";
import MercadoPagoBrick from "../../components/MercadoPagoBrick";

const Home = () => {
  useEffect(() => {
    // reload to prevent bug in login
    if(localStorage.getItem("dashboardFirstLoad") === "true") return;
    window.location.reload();
    localStorage.setItem("dashboardFirstLoad", "true");
  }
  , []);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100%"
    >
      <Title firtLineTitle="HOME" />
      <MercadoPagoBrick isOpen={true}/>
    </Box>
  );
};

export default Home;
