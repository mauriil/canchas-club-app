import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllBookingsByUser } from "../../api/bookings";
import { useAuth } from "../../customHooks/useAuth";
import BookingCard from "../../components/BookingCard";
import { Booking } from "../../types/booking";

const MisReservas = () => {
  const [booking, setBooking] = useState<Booking[]>([]);
  const { user } = useAuth();

  const getBookings = async () => {
    const req = await getAllBookingsByUser();
    const bookingsOfUser: [Booking] = await req.json();
    console.log(bookingsOfUser);
    setBooking(bookingsOfUser);
  };
  // 64fe68c0cbd250f517046850
  useEffect(() => {
    void getBookings();
  }, []);
  return (
    // <Box></Box>

    // <BookingCard booking={booking[0]} />
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
  );
};

export default MisReservas;
