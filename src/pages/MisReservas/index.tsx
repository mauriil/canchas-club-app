import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllBookingsByOwner, getAllBookingsByUser } from "../../api/bookings";
import BookingCard from "../../components/BookingCard";
import { Booking } from "../../types/booking";
import CanchasClubLoader from "../../components/Loader";

const MisReservas = () => {
  const [booking, setBooking] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getBookings = async () => {
    setIsLoading(true);
    const req = await getAllBookingsByUser();
    const bookingsOfUser: Booking[] = (await req.json()) as Array<Booking>;

    setBooking(bookingsOfUser);
    setIsLoading(false);
  };
  useEffect(() => {
    void getBookings();
  }, []);

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {isLoading ? <CanchasClubLoader width="80%" /> :

        booking.length > 0 ? (
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 0, sm: 2, md: 3 }}
            sx={{
              flexGrow: 1,
              paddingLeft: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
            {booking.map((booking, index) => {
              return (
                <Grid
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  key={index}
                  item
                  xs={12}
                  sm={6}
                  lg={4}
                  xl={3}
                >
                  <BookingCard booking={booking} />
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Typography variant="h3" color="primary">
            No tenés ninguna reserva de canchas realizada
          </Typography>
        )

      }

    </Box>
  );
};

export default MisReservas;
