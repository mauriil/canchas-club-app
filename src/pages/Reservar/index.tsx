/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Alert, AlertColor, Box, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import MercadoPagoBrick from "../../components/MercadoPagoBrick";
import BookingSteps from "../../components/BookingSteps";
import Cookies from "js-cookie";
import { getFieldById } from "../../api/fields";
import { useNavigate } from "react-router-dom";
import { cancelBooking, getBooking } from "../../api/bookings";
import CanchasClubLoader from "../../components/Loader";


const Home = () => {
  const [loading, setLoading] = useState(true);
  const [field, setField] = useState<any>(null);
  const [day, setDay] = useState<any>(null);
  const [from, setFrom] = useState<any>(null);
  const [to, setTo] = useState<any>(null);
  const [ownerId, setOwnerId] = useState<any>(null);
  const [price, setPrice] = useState<any>(null);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarSeverity, setSnackBarSeverity] = useState("success");
  const handelSnackClose = () => {
    setSnackBarOpen(false);
  }
  const navigate = useNavigate();

  useEffect(() => {
    // reload to prevent bug in login
    if (localStorage.getItem("dashboardFirstLoad") === "true") return;
    window.location.reload();
    localStorage.setItem("dashboardFirstLoad", "true");

  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      const bookingId = window.location.pathname.split('/')[2];
      void cancelBooking(bookingId)
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const bookingId = window.location.pathname.split('/')[2];

    getBooking(bookingId)
      .then((bookingData) => {
        if (bookingData.statusCode >= 400) {
          setSnackBarMessage(bookingData.message);
          setSnackBarSeverity('error');
          setSnackBarOpen(true);
          setTimeout(() => {
            navigate(`/dashboard/home`);
          }, 3000);
          return;
        }

        setField(bookingData.fieldId);
        setDay(bookingData.time.day);
        setFrom(bookingData.time.from);
        setTo(bookingData.time.to);

        getFieldById(bookingData.fieldId._id)
          .then((fieldData) => {
            if (fieldData.statusCode >= 400) {
              setSnackBarMessage(fieldData.message);
              setSnackBarSeverity('error');
              setSnackBarOpen(true);
              setTimeout(() => {
                navigate(`/dashboard/home`);
              }, 3000);
              return;
            }
            setOwnerId(fieldData.clubId.userId);

            if (checkPrice) {
              checkPrice(fieldData, bookingData.time);
            }
            setLoading(false);
          })
          .catch((error) => {
            setSnackBarMessage('Error al obtener los datos del campo');
        setSnackBarSeverity('error');
        setSnackBarOpen(true);
        setTimeout(() => {
          navigate(`/dashboard/home`);
        }, 3000);
        return;
            console.error('Error al obtener los datos del campo:', error);
          });
      })
      .catch((error) => {
        setSnackBarMessage('Error al obtener los datos de la reserva');
        setSnackBarSeverity('error');
        setSnackBarOpen(true);
        setTimeout(() => {
          navigate(`/dashboard/home`);
        }, 3000);
        return;
        console.error('Error al obtener los datos de la reserva:', error);
      });

  }, []);


  const checkPrice = (field: any, timeOfPreBooking: any) => {
    const day = timeOfPreBooking.day;
    const from = timeOfPreBooking.from;
    const to = timeOfPreBooking.to;
    const parsedDate = new Date(day);
    parsedDate.setDate(parsedDate.getDate() + 1);
    const weekDay = parsedDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

    const hoursOfDay = field.availability[weekDay];

    if (hoursOfDay) {
      for (const horario of hoursOfDay) {
        const horaApertura = new Date(day + " " + horario.openHour);
        const horaCierre = new Date(day + " " + horario.closeHour);
        const horaInicioDate = new Date(day + " " + from);
        const horaFinDate = new Date(day + " " + to);

        if (horaInicioDate >= horaApertura && horaFinDate <= horaCierre) {
          // multiply price by amount of hours
          const hours = (horaFinDate.getTime() - horaInicioDate.getTime()) / 1000 / 60 / 60;
          const price = horario.price * hours;
          setPrice(price);
        }
      }
    } else {
      setSnackBarMessage("No hay horarios disponibles para el día seleccionado");
      setSnackBarSeverity("error");
      setSnackBarOpen(true);
      setTimeout(() => {
        navigate(`/dashboard/home`);
      }, 3000);
    }
  }

  const handleFailedBooking = () => {
    setSnackBarMessage("Hubo un error al crear la reserva");
    setSnackBarSeverity("error");
    setSnackBarOpen(true);
    setTimeout(() => {
      navigate(`/dashboard/home`);
    }, 3000);
  }

  const cookies: {
    [key: string]: string;
  } = Cookies.get();
  const token = cookies["access-token"];
  const tenantId = token ? JSON.parse(atob(token.split(".")[1])).sub : null;

  const [mercadoPagoBrickIsOpen, setMercadoPagoBrickIsOpen] = useState(true);
  const handleSuccessfulBooking = async (bookingId: string) => {
    const preBookingId = window.location.pathname.split('/')[2];
    void cancelBooking(preBookingId);
    setMercadoPagoBrickIsOpen(false);
    setTimeout(() => {
      navigate(`/dashboard/detalleReserva/${bookingId}`);
    }, 1000);
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100%"
    >

      {loading ? (
        <CanchasClubLoader width="80%" />
      ) :
        (
          <BookingSteps
            onSuccessfulBooking={handleSuccessfulBooking}
            onFailedBooking={() => { handleFailedBooking }}
            isOpen={mercadoPagoBrickIsOpen}
            tenantId={tenantId}
            ownerId={ownerId}
            fieldId={field?._id}
            reservationMode="full"
            time={{ day, from, to }}
            amount={price} />
        )
      }

      <Snackbar open={snackBarOpen} autoHideDuration={5000} onClick={handelSnackClose} onClose={handelSnackClose}>
        <Alert severity={snackBarSeverity as AlertColor} sx={{ width: '100%', fontSize: '15px' }} onClose={handelSnackClose}>
          {snackBarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Home;
