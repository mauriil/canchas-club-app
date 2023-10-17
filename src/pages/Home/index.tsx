import { Box } from "@mui/material";
import Title from "../../components/Title";
import { useEffect, useState } from "react";
import MercadoPagoBrick from "../../components/MercadoPagoBrick";
import BookingSteps from "../../components/BookingSteps";

const Home = () => {
  useEffect(() => {
    // reload to prevent bug in login
    if (localStorage.getItem("dashboardFirstLoad") === "true") return;
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
      {/* <BookingSteps
        onSuccessfulBooking={handleSuccessfulBooking}
        isOpen={mercadoPagoBrickIsOpen}
        tenantId="64c01c2d09c55ac75bd60d7e"
        ownerId="64c3fa1e58d34d55ba344fdb"
        fieldId="64c3fbfd6ff6d6503333e6da"
        reservationMode="full"
        time={{ day: '2023-10-20', from: '14:00', to: '15:00' }}
        amount={50} /> */}
    </Box>
  );
};

export default Home;
