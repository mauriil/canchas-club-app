import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { getAllBookingsByUser } from "../../api/bookings";
import BookingCard from "../../components/BookingCard";
import { Booking } from "../../types/booking";
import CanchasClubLoader from "../../components/Loader";

const MisReservas = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      const response = await getAllBookingsByUser();
      const data: Booking[] = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchBookings();
  }, []);

  return (
    <Box
      width="100%"
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={3}
    >
      {isLoading ? (
        <CanchasClubLoader width="80%" />
      ) : bookings.length > 0 ? (
        <Grid
          container
          spacing={2}
          justifyContent="center"
        >
          {bookings.map((booking, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3} xl={3}>
              <BookingCard booking={booking} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h1" color="primary" sx={{
          textAlign: "center",
          fontSize: "3.5rem",
          fontWeight: "bold",
        }}>
          No tienes ninguna reserva de canchas realizada
        </Typography>
      )}
    </Box>
  );
};

export default MisReservas;
