/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Alert, AlertColor, Box, Snackbar } from "@mui/material";
import Title from "../../components/Title";
import { useEffect, useState } from "react";
import MercadoPagoBrick from "../../components/MercadoPagoBrick";
import BookingSteps from "../../components/BookingSteps";
import Cookies from "js-cookie";
import { getFieldById } from "../../api/fields";
import { useNavigate } from "react-router-dom";


const Home = () => {
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
    const day = window.location.pathname.split('/')[2];
    setDay(day);
    const from = window.location.pathname.split('/')[3];
    setFrom(from);
    const to = window.location.pathname.split('/')[4];
    setTo(to);
    const fieldId = window.location.pathname.split('/')[5];

    void getFieldById(fieldId).then((fieldData) => {
      if (fieldData.statusCode >= 400) {
        setSnackBarMessage(fieldData.message);
        setSnackBarSeverity('error');
        setSnackBarOpen(true);
        setTimeout(() => {
          navigate(`/dashboard/home`);
        }, 3000);
        return;
      }
      setField(fieldData);
      setOwnerId(fieldData.clubId.userId);

      checkPrice(fieldData)
    });
  }, []);

  const checkPrice = (field: any) => {
    const day = window.location.pathname.split('/')[2];
    const from = window.location.pathname.split('/')[3];
    const to = window.location.pathname.split('/')[4];
    const parsedDate = new Date(day);
    parsedDate.setDate(parsedDate.getDate() + 1);
    const weekDay = parsedDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

    // Obtener el objeto correspondiente al día de la semana
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
  console.log("🚀 ~ file: index.tsx:24 ~ Home ~ tenantId:", tenantId)

  const [mercadoPagoBrickIsOpen, setMercadoPagoBrickIsOpen] = useState(true);
  const handleSuccessfulBooking = (bookingId: string) => {
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

      <Snackbar open={snackBarOpen} autoHideDuration={5000} onClick={handelSnackClose} onClose={handelSnackClose}>
        <Alert severity={snackBarSeverity as AlertColor} sx={{ width: '100%', fontSize: '15px' }} onClose={handelSnackClose}>
          {snackBarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Home;
