import { Box } from "@mui/material";
import Title from "../../components/Title";
import { useEffect, useState } from "react";
import MercadoPagoBrick from "../../components/MercadoPagoBrick";
import BookingSteps from "../../components/BookingSteps";

const Home = () => {
  useEffect(() => {
    // reload to prevent bug in login
    if(localStorage.getItem("dashboardFirstLoad") === "true") return;
    window.location.reload();
    localStorage.setItem("dashboardFirstLoad", "true");

  }
  , []);

  const [mercadoPagoBrickIsOpen, setMercadoPagoBrickIsOpen] = useState(true);
  const handleSuccessfulBooking = (bookingId: string) => {
    setMercadoPagoBrickIsOpen(false);
    console.log("🚀 ~ file: index.tsx:31 ~ onSubmit ~ bookingId:", bookingId)
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
      {/* <MercadoPagoBrick isOpen={mercadoPagoBrickIsOpen} ownerId="64c3fa1e58d34d55ba344fdb" tenantId="64ac321b26c685de7deedc9c" isSubscription={true} amount={100} onSuccessfulPayment={handleSuccessfulPayment} title="RESERVA"/> */}
      <BookingSteps onSuccessfulBooking={handleSuccessfulBooking} isOpen={mercadoPagoBrickIsOpen} tenantId="64ac321b26c685de7deedc9c" fieldId="64c3fbfd6ff6d6503333e6da" time={{day: '2023-09-30', from: '10:00', to: '11:00'}} amount={100}/>
    </Box>
  );
};

export default Home;
