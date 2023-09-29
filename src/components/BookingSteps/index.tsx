/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { FormControl, InputLabel, MenuItem, Select, Typography, Button, Menu, Snackbar, Alert, AlertColor } from '@mui/material';
import { createSubscription } from '../../api/mercadoPago';
import { Field } from '../../types/fields';
import { getFieldById } from '../../api/fields';
import CanchasClubLoader from '../Loader';
import { User } from '../../types/users';
import { getUser } from '../../api/users';
import { createBooking } from '../../api/bookings';
import ConfirmationDialog from '../ConfirmationDialog';
import { useNavigate } from 'react-router-dom';

interface BookingStepsProps {
    isOpen: boolean;
    tenantId: string;
    fieldId: string;
    time: {
        from: string;
        to: string;
        day: string;
    };
    amount: number;
    onSuccessfulBooking: (bookingId: string) => void;
}

const BookingSteps: React.FC<BookingStepsProps> = ({
    isOpen,
    tenantId,
    amount,
    fieldId,
    onSuccessfulBooking,
    time,
}) => {
    const [bookingId, setBookingId] = useState<string>('');
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [snackBarSeverity, setSnackBarSeverity] = useState("success");
    const handelSnackClose = () => {
        setSnackBarOpen(false);
    }
    const [fieldData, setFieldData] = useState<Field | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSubscription, setIsSubscription] = useState<boolean>(false);
    const [tenantData, setTenantData] = useState<User>({} as User);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogDescription, setDialogDescription] = useState("");

    const handleConfirm = () => {
        setOpenDialog(false);
        onSuccessfulBooking(bookingId);
    }

    const fetchFieldData = async () => {
        try {
            const field = await getFieldById(fieldId);
            setFieldData(field);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchTenantData = async (tenantId: string) => {
        try {
            if (tenantId) {
                const user = await getUser(tenantId);
                setTenantData(user);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const parseDate = (date: string) => {
        const fecha: Date = new Date(date);
        fecha.setDate(fecha.getDate() + 1);
        const daysOfWeek: string[] = [
            'domingo',
            'lunes',
            'martes',
            'miércoles',
            'jueves',
            'viernes',
            'sábado',
        ];
        const months: string[] = [
            'enero',
            'febrero',
            'marzo',
            'abril',
            'mayo',
            'junio',
            'julio',
            'agosto',
            'septiembre',
            'octubre',
            'noviembre',
            'diciembre',
        ];
        const nombreDia: string = daysOfWeek[fecha.getDay()].charAt(0).toUpperCase() + daysOfWeek[fecha.getDay()].slice(1);
        const diaMes: number = fecha.getDate();
        const nombreMes: string = months[fecha.getMonth()].charAt(0).toUpperCase() + months[fecha.getMonth()].slice(1);

        return `${nombreDia} ${diaMes} de ${nombreMes}`;
    };

    useEffect(() => {
        void fetchFieldData();
        void fetchTenantData(tenantId);
    }, []);

    const closeModal = () => {
        // Agrega lógica para cerrar el modal si es necesario
        // Ejemplo: onClose();
    };

    const handleBooking = async () => {
        setIsLoading(true);
        //TODO: Agregar logica para crear cuenta express
        if (!tenantId) {
            alert('Cuenta express aun no implementada');
            return;
        }
        if (isSubscription) {
            const paymentReq = await createSubscription({
                amount,
                tenantId,
                ownerId: fieldData.clubId.userId,
                isSubscription,
                title: fieldData.name
            });
            const paymentId = paymentReq.paymentId;
            if (paymentReq.statusCode >= 400) {
                setSnackBarMessage(paymentReq.message);
                setSnackBarSeverity('error');
                setSnackBarOpen(true);
                setIsLoading(false);
                return;
            }

            const bookingReq = await createBooking({
                tenantId,
                ownerId: fieldData.clubId.userId,
                fieldId,
                time,
                paymentId,
                recurrent: isSubscription,
                status: 'pending',
            });

            console.log("🚀 ~ file: index.tsx:158 ~ handleBooking ~ bookingReq:", bookingReq)
            if (bookingReq.statusCode >= 400) {
                setSnackBarMessage(bookingReq.message);
                setSnackBarSeverity('error');
                setSnackBarOpen(true);
                setIsLoading(false);
                return;
            }

            setBookingId(bookingReq._id);
            setOpenDialog(true);
            setDialogTitle('Reserva creada');
            setDialogDescription(`Esta reserva se encuentra en estado "pendiente".
            por favor chequea tu correo para ver los pasos a seguir para confirmarla`);
        } else {
            // Realizar reserva simple
            // Luego, llamar a onSuccessfulBooking() con el ID de la reserva recurrente
            // Ejemplo: const recurrentReservationId = await createRecurrentReservation();
            // onSuccessfulBooking(recurrentReservationId);
            setIsLoading(false);
        }
    };

    return (
        <>
            <Modal open={isOpen} onClose={closeModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '80%',
                        maxWidth: 400,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 4,
                        textAlign: 'center', // Alineación del contenido
                    }}
                >
                    {isLoading ? (
                        <CanchasClubLoader width="10%" />
                    ) : (
                        <>
                            <Typography variant="h5" color="primary" gutterBottom>
                                {`${tenantData.name !== undefined ? tenantData.name + ', ' : ''} Estás por reservar ${fieldData.name}`}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Fecha:</strong> {parseDate(time.day)}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Hora:</strong> de {time.from} a {time.to} hs
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Monto a pagar:</strong> ${amount}
                            </Typography>
                            <FormControl sx={{ mt: 2, minWidth: '100%' }}>
                                <InputLabel>Tipo de Reserva</InputLabel>
                                <Select
                                    value={isSubscription ? 'recurrent' : 'simple'}
                                    onChange={(event) => setIsSubscription(event.target.value === 'recurrent')}
                                >
                                    <MenuItem value="simple">Turno simple</MenuItem>
                                    <MenuItem value="recurrent">Turno fijo</MenuItem>
                                </Select>
                            </FormControl>
                            {isSubscription && (
                                <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                                    Este tipo de reserva generará una reserva todas las semanas en el mismo día y horario.
                                </Typography>
                            )}
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2, width: '100%' }}
                                onClick={handleBooking}
                            >
                                Confirmar Reserva
                            </Button>
                        </>
                    )}
                </Box>
            </Modal>

            <ConfirmationDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                onConfirm={handleConfirm}
                title={dialogTitle}
                message={dialogDescription}
                onlyConfirmButton={true}
            />

            <Snackbar open={snackBarOpen} autoHideDuration={5000} onClick={handelSnackClose} onClose={handelSnackClose}>
                <Alert severity={snackBarSeverity as AlertColor} sx={{ width: '100%', fontSize: '15px' }} onClose={handelSnackClose}>
                    {snackBarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default BookingSteps;
