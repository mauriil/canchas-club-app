import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllBookingsByUser } from "../../api/bookings";
import { useAuth } from "../../customHooks/useAuth";

const MisReservas = () => {
  const [booking, setBooking] = useState({});
  const { user } = useAuth();

  const getBookings = async () => {
    const id = +user?.userId | 0;
    const bookingsOfUser = await getAllBookingsByUser(id);
    setBooking(bookingsOfUser);
  };

  useEffect(() => {
    void getBookings();
  }, []);

  return (
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
      {booking.map((booking) => {
        return (
          <Grid
            display="flex"
            justifyContent="center"
            alignItems="center"
            key={booking.id}
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
