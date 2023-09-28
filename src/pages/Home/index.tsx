import { Box } from "@mui/material";
import Title from "../../components/Title";
import { useEffect, useState } from "react";
import MercadoPagoBrick from "../../components/MercadoPagoBrick";

const Home = () => {
  useEffect(() => {
    // reload to prevent bug in login
    if(localStorage.getItem("dashboardFirstLoad") === "true") return;
    window.location.reload();
    localStorage.setItem("dashboardFirstLoad", "true");

  }
  , []);

  const [mercadoPagoBrickIsOpen, setMercadoPagoBrickIsOpen] = useState(true);
  const handleSuccessfulPayment = (paymentId: string) => {
    setMercadoPagoBrickIsOpen(false);
    console.log("🚀 ~ file: index.tsx:31 ~ onSubmit ~ payment:", paymentId)
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100%"
    >
      <Title firtLineTitle="HOME" />
      <MercadoPagoBrick isOpen={mercadoPagoBrickIsOpen} ownerId="64c3fa1e58d34d55ba344fdb" tenantId="64ac321b26c685de7deedc9c" isSubscription={true} amount={100} onSuccessfulPayment={handleSuccessfulPayment}/>
    </Box>
  );
};

export default Home;
