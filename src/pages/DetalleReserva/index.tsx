/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useEffect, useState } from 'react';
import {
    Typography,
    Grid,
    Paper,
    Button,
    Divider,
    Alert,
    Snackbar,
    AlertColor,
    Box,
} from '@mui/material';
import { Booking } from '../../types/booking';
import { cancelBooking, checkAvailability, checkWalletBooking, getBooking } from '../../api/bookings';
import TopBar from '../../components/TopBar';
import { useNavigate } from 'react-router-dom';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import CanchasClubLoader from '../../components/Loader';
import RoomIcon from "@mui/icons-material/Room";
import { parseDate } from '../../helpers/dates/parseDate';
import BookingSteps from '../../components/BookingSteps';
import { refundPayment } from '../../api/mercadoPago';


const BookingDetails = () => {
    const navigate = useNavigate();
    const [booking, setBooking] = useState({} as Booking);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [snackBarSeverity, setSnackBarSeverity] = useState('success');
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openRepeatDialog, setOpenRepeatDialog] = useState(false);
    const [loading, setLoading] = useState(true);
    const [mercadoPagoBrickIsOpen, setMercadoPagoBrickIsOpen] = useState(false);
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        // reload to prevent bug in login
        if (sessionStorage.getItem("detalleReservaFirstLoad") === "true") return;
        window.location.reload();
        sessionStorage.setItem("detalleReservaFirstLoad", "true");
    }, []);

    const handleSuccessfulBooking = (bookingId: string) => {
        setMercadoPagoBrickIsOpen(false);
        setTimeout(() => {
            navigate(`/dashboard/detalleReserva/${bookingId}`);
        }, 1000);
    }

    const refundPayment = async (paymentId: string) => {
        void await refundPayment(paymentId);
    }

    useEffect(() => {
        if (window.location.pathname.split('/')[2] === 'callback') {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const bookingId = urlParams.get('external_reference');

            void getBooking(bookingId as string).then((bookingData) => {
                setBooking(bookingData);
                setLoading(false);
            });
        } else {
            const bookingId = window.location.pathname.split('/')[3];
            void getBooking(bookingId).then((bookingData) => {
                setBooking(bookingData);
                setLoading(false);
            });
        }

    }, []);

    const cancelBookingRequest = async () => {
        setLoading(true);
        setOpenDeleteDialog(false);
        const bookingId = window.location.pathname.split('/')[3];
        const req = await cancelBooking(bookingId);
        if (req.statusCode >= 400) {
            setSnackBarMessage(req.message);
            setSnackBarSeverity('error');
            setSnackBarOpen(true);
            setLoading(false);
            return;
        }
        setLoading(false);
        setSnackBarMessage('Turno cancelado correctamente');
        setSnackBarSeverity('success');
        setSnackBarOpen(true);
        setTimeout(() => {
            navigate(`/dashboard/detalleReserva/${window.location.pathname.split('/')[3]}`);
        }, 1500);
        return;
    }

    const getNextSameBookingDay = () => {
        const numberDay = new Date(booking.time?.day).getDay();
        const nextWeekDate = new Date();
        nextWeekDate.setDate(nextWeekDate.getDate() + (7 - nextWeekDate.getDay() + numberDay) % 7 + 1);
        const nextWeekDay = nextWeekDate.getDate();
        const nextWeekMonth = nextWeekDate.getMonth() + 1;
        const nextWeekYear = nextWeekDate.getFullYear();
        const nextWeekDateString = `${nextWeekYear}-${nextWeekMonth < 10 ? nextWeekMonth.toString().padStart(2, '0') : nextWeekMonth}-${nextWeekDay < 10 ? nextWeekDay.toString().padStart(2, '0') : nextWeekDay}`;

        return {
            day: nextWeekDateString,
            from: booking.time?.from,
            to: booking.time?.to,
        }
    }

    const repeatBookingRequest = async () => {
        setOpenRepeatDialog(false);
        const newBookingDay = getNextSameBookingDay();

        const reqAvailability = await checkAvailability({ time: { ...newBookingDay }, fieldId: booking.fieldId?._id })
        if (reqAvailability.statusCode >= 400) {
            setSnackBarMessage(reqAvailability.message);
            setSnackBarSeverity('error');
            setSnackBarOpen(true);
            setLoading(false);
            return;
        }

        if (reqAvailability) {
            setAmount(reqAvailability.amount);
            setMercadoPagoBrickIsOpen(true);
        } else {
            setSnackBarMessage('Lo sentimmos. El turno no está disponible');
            setSnackBarSeverity('error');
            setSnackBarOpen(true);
            setLoading(false);
            return;
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

    const handleCancelBooking = () => {
        setSnackBarMessage("Se canceló repetir la reserva");
        setSnackBarSeverity("info");
        setSnackBarOpen(true);
        setOpenRepeatDialog(false);
        setMercadoPagoBrickIsOpen(false);
        setLoading(false);
    }

    return (
        <>
            <TopBar backUrl='/dashboard/misReservas' />

            {loading ?
                <Box
                    width="100vw"
                    height="100vh"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <CanchasClubLoader width="80%" />
                </Box>
                :
                <>
                    <Grid container spacing={3} sx={{ mt: 1 }}>
                        <Grid item xs={12} sm={6}>
                            <Paper elevation={3} sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#f5f5f5',
                            }}>
                                <Typography variant="h3" gutterBottom>
                                    Detalles
                                </Typography>
                                <Divider sx={{
                                    width: '100%',
                                    marginBottom: '1rem',
                                }} />
                                <Typography variant="body1" gutterBottom>
                                    {parseDate(booking.time?.day)}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    De {booking.time?.from} a {booking.time?.to}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {booking.fieldId?.name}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    Precio: ${booking.paymentId?.amount}
                                </Typography>
                                <Alert severity={
                                    booking.status === 'pending' ? 'info' :
                                        booking.status === 'approved - accredited' ? 'success' :
                                            booking.status === 'internal_booking' ? 'success' :
                                                booking.status === 'completed' ? 'success' :
                                                    booking.status === 'no-show' ? 'warning' :
                                                        booking.status === 'cancelled' ? 'error' : 'info'
                                } sx={{
                                    width: '100%',
                                    '& .MuiAlert-message': { textAlign: "center", width: "inherit" }
                                }}>
                                    {booking.status === 'pending' ? 'Pendiente' :
                                        booking.status === 'approved - accredited' ? 'Confirmado' :
                                            booking.status === 'internal_booking' ? 'Confirmado (reserva en club)' :
                                                booking.status === 'completed' ? 'Completado' :
                                                    booking.status === 'no-show' ? 'No se presento' :
                                                        booking.status === 'cancelled' ? 'Cancelado' : ''}
                                </Alert>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper elevation={3} sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: '1rem',
                                backgroundColor: '#f5f5f5',
                            }}>
                                <Typography variant="h3" gutterBottom>
                                    Cliente
                                </Typography>
                                <Divider sx={{
                                    width: '100%',
                                    marginBottom: '1rem',
                                }} />
                                <Typography variant="body1" gutterBottom>
                                    {booking.tenantId?.name}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {booking.tenantId?.email}
                                </Typography>
                            </Paper>

                            <Paper elevation={3} sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                margin: '0 auto',
                                marginBottom: '1rem',
                                backgroundColor: '#f5f5f5',
                            }}>
                                <Typography variant="h3" gutterBottom>
                                    Club
                                </Typography>
                                <Divider sx={{
                                    width: '100%',
                                    marginBottom: '1rem',
                                }} />
                                <Typography variant="body1" gutterBottom>
                                    {booking.fieldId?.clubId.name}
                                </Typography>
                                <Typography variant="body1" gutterBottom color='primary' fontWeight='bold'
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.cursor = 'pointer';
                                    }}
                                    onClick={() => {
                                        window.open(`https://www.google.com/maps/search/?api=1&query=${booking.fieldId?.clubId.location.coordinates[1]},${booking.fieldId?.clubId.location.coordinates[0]}`, '_blank');
                                    }}
                                    sx={{
                                        textAlign: 'center',
                                    }}>
                                    <RoomIcon fontSize="small" color="primary" /> {booking.fieldId?.clubId.address}
                                </Typography>
                            </Paper>
                        </Grid>
                        {booking.status === 'pending' || booking.status === 'approved - accredited' || booking.status === 'completed' ?
                            <Grid item xs={12}>
                                <Button variant="contained" sx={{ width: "100%", marginBottom: "2rem" }}
                                    size="large"
                                    color={booking.status === 'completed' ? 'success' : 'error'}
                                    onClick={() => {
                                        if (booking.status === 'completed') {
                                            setOpenRepeatDialog(true);
                                            return;
                                        }
                                        setOpenDeleteDialog(true);
                                    }}>
                                    {booking.status === 'completed' ? 'repetir turno' : 'cancelar'}
                                </Button>
                            </Grid>
                            :
                            <></>
                        }

                    </Grid>
                </>}



            <ConfirmationDialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
                onConfirm={cancelBookingRequest}
                title={`Cancelar turno`}
                message={`¿Estás seguro que querés cancelar el turno?`}
            />

            <ConfirmationDialog
                open={openRepeatDialog}
                onClose={() => setOpenRepeatDialog(false)}
                onConfirm={repeatBookingRequest}
                title={`Repetir turno`}
                message={`Vas a solicitar un nuevo turno para el mismo horario en el mismo día más próximo de la semana.
                ${parseDate(getNextSameBookingDay().day)} de ${booking.time?.from} a ${booking.time?.to}
                ¿Estás seguro?`}
            />

            <BookingSteps
                onFailedBooking={handleFailedBooking}
                onSuccessfulBooking={handleSuccessfulBooking}
                onCancelBooking={handleCancelBooking}
                isOpen={mercadoPagoBrickIsOpen}
                tenantId={booking.tenantId?._id}
                ownerId={booking.fieldId?.clubId.userId._id}
                fieldId={booking.fieldId?._id}
                reservationMode="full"
                time={{ day: getNextSameBookingDay().day, from: booking.time?.from, to: booking.time?.to }}
                amount={amount} />

            <Snackbar
                open={snackBarOpen}
                autoHideDuration={5000}
                onClose={() => setSnackBarOpen(false)}
            >
                <Alert severity={snackBarSeverity as AlertColor} onClose={() => setSnackBarOpen(false)} sx={{ width: '100%', fontSize: '15px' }} >
                    {snackBarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default BookingDetails;
