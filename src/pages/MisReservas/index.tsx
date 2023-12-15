/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { getAllBookingsByUser } from "../../api/bookings";
import { Booking, BookingDetail } from "../../types/booking";
import CanchasClubLoader from "../../components/Loader";
import { Calendar, dateFnsLocalizer,  } from "react-big-calendar";
import moment from "moment";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import { es } from "date-fns/locale";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";

const locales = {
  "es-ES": es
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});
import "react-big-calendar/lib/css/react-big-calendar.css";


const MisReservas = () => {
  const [bookings, setBookings] = useState<BookingDetail[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      const response = await getAllBookingsByUser();
      const data: BookingDetail[] = await response.json();
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
      height="80%"
      display="flex"
      justifyContent="center"
      paddingLeft={1}
      paddingRight={1}
      paddingTop={1}
      marginTop={3}
      marginBottom={3}
    >
      {isLoading ? (
        <CanchasClubLoader width="80%" />
      ) : bookings.length > 0 ? (
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={
            bookings.map((booking, index) => ({
              start: moment(`${booking.time.day}T${booking.time.from}`).toDate(),
              end: moment(`${booking.time.day}T${booking.time.to}`).toDate(),
              title: booking.fieldId.name,
            }))
          }
          messages={{
            next: ">",
            previous: "<",
            today: "Hoy",
            month: "Mes",
            week: "Semana",
            day: "Día",
            agenda: "Agenda",
            date: "Fecha",
            time: "Hora",
            event: "Evento",
            noEventsInRange: "No hay eventos en este rango",
            showMore: (total) => `+ Ver más (${total})`,
            allDay: "Todo el día",
            tomorrow: "Mañana",
            work_week: "Semana laboral",
            yesterday: "Ayer",
          }}
          culture={"es-ES"}
          style={{
            height: "80vh",
            maxHeight: "700px",
            width: "100%",
            backgroundColor: "white",
            padding: "1rem",
            borderRadius: "1rem",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            gap: "1rem",
            fontSize: "1rem",
          }}
          formats={{
            monthHeaderFormat: (date, culture, localizer) => localizer.format(date, "MMMM", culture).charAt(0).toUpperCase() + localizer.format(date, "MMMM Y", culture).slice(1),
          }}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: "transparent",
              color: "black",
            },
          })}
          views={["month", "day", 'agenda']}
          components={{
            month: {
              event: ({ event, ...props }) => (
                  <Button variant="contained" color="primary" sx={{
                    width: "100%",
                    height: "10px",
                    textTransform: "none",
                    fontSize: "1rem",
                  }}>
                    {event.title}
                  </Button>
              ),
            },
            day: {
              event: ({ event, ...props }) => (
                  <Button variant="contained" color="primary" sx={{
                    width: "100%",
                    height: "10px",
                    textTransform: "none",
                    fontSize: "1rem",
                  }}>
                    {event.title}
                  </Button>
              ),
            },
          }}
        />
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
