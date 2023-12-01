/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { FormControl, InputLabel, MenuItem, Select, Typography, Button, Menu, Snackbar, Alert, AlertColor, IconButton } from '@mui/material';
import { createSubscription, refundPayment, returnPayment } from '../../api/mercadoPago';
import { Field } from '../../types/fields';
import { getFieldById } from '../../api/fields';
import CanchasClubLoader from '../Loader';
import { User } from '../../types/users';
import { getUser } from '../../api/users';
import { createBooking } from '../../api/bookings';
import ConfirmationDialog from '../ConfirmationDialog';
import MercadoPagoBrick from '../MercadoPagoBrick';
import NewUserModal from '../NewUserAccount';
import { parseDate } from '../../helpers/dates/parseDate';
import CloseIcon from '@mui/icons-material/Close';

interface BookingStepsProps {
    walletBookingId?: string;
    isOpen: boolean;
    tenantId: string;
    fieldId: string;
    time: {
        from: string;
        to: string;
        day: string;
    };
    amount: number;
    ownerId: string;
    onSuccessfulBooking: (bookingId: string) => void;
    onFailedBooking: () => void;
    onCancelBooking: () => void;
    reservationMode: string;
}

const BookingSteps: React.FC<BookingStepsProps> = ({
    walletBookingId,
    isOpen,
    tenantId,
    amount,
    fieldId,
    onSuccessfulBooking,
    onFailedBooking,
    onCancelBooking,
    time,
    ownerId,
    reservationMode,
}) => {
    const [newUserModalIsOpen, setNewUserModalIsOpen] = useState<boolean>(false);
    const [bookingId, setBookingId] = useState<string>('');
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [snackBarSeverity, setSnackBarSeverity] = useState("success");
    const handelSnackClose = () => {
        setSnackBarOpen(false);
    }
    const [fieldData, setFieldData] = useState<Field | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [tenantData, setTenantData] = useState<User>({} as User);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogDescription, setDialogDescription] = useState("");
    const [mercadoPagoBrikIsOpen, setMercadoPagoBrikIsOpen] = useState(false);
    const [tenantIdForBooking, setTenantId] = useState(tenantId);

    const handleConfirm = () => {
        onSuccessfulBooking(bookingId);
        setOpenDialog(false);
    }

    const fetchFieldData = async (fieldId: string) => {
        try {
            const field = await getFieldById(fieldId);
            setFieldData(field);
            setIsLoading(false);
        } catch (error) {
            onFailedBooking();
            console.error(error);
        }
    };

    const fetchTenantData = async (tenantId: string) => {
        try {
            if (tenantId) {
                setIsLoading(true);
                const user = await getUser(tenantId);
                setTenantData(user);
                setTenantId(user._id as string);
                setIsLoading(false);
            }
        } catch (error) {
            onFailedBooking();
            console.error(error);
        }
    }

    useEffect(() => {
        void fetchFieldData(fieldId);
    }, [fieldId]);

    useEffect(() => {
        void fetchTenantData(tenantId);
    }, [tenantId]);

    const closeModal = () => {
        setOpenDialog(false);
        setMercadoPagoBrikIsOpen(false);
        onCancelBooking();
    };

    const handleSimpleBooking = async (paymentId: string, status: string) => {
        setMercadoPagoBrikIsOpen(false);
        const bookingReq = await createBooking({
            tenantId: tenantIdForBooking,
            ownerId: fieldData.clubId.userId,
            fieldId,
            time,
            paymentId,
            recurrent: false,
            status,
        });

        if (bookingReq.statusCode >= 400) {
            await refundPayment(paymentId);
            setSnackBarMessage('Algo salió mal, por favor intenta nuevamente');
            setSnackBarSeverity('error');
            setSnackBarOpen(true);
            setIsLoading(false);
            onFailedBooking();
            return;
        }
        if (status === 'approved - accredited') {
            setBookingId(bookingReq._id);
            setOpenDialog(true);
            setDialogTitle('Reserva creada');
            setDialogDescription(`Muchas gracias por tu reserva!`);
        }
    };

    const handleBooking = () => {
        setIsLoading(true);
        if (!tenantIdForBooking) {
            setNewUserModalIsOpen(true);
            return;
        }
        setMercadoPagoBrikIsOpen(true)
    };

    const handleMercadoPagoBrickClose = () => {
        setMercadoPagoBrikIsOpen(false);
        setIsLoading(false);
    }

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
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                        }}
                        onClick={closeModal}
                    >
                        <CloseIcon />
                    </IconButton>
                    {isLoading ? (
                        <CanchasClubLoader width="10%" />
                    ) : (
                        <>
                            <Typography variant="h5" color="primary" gutterBottom>
                                {`${tenantData.name !== undefined ? tenantData.name + ', ' : ''} Estás por reservar ${fieldData && fieldData.name}`}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Fecha:</strong> {parseDate(time.day)}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Hora:</strong> de {time.from} a {time.to} hs
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Valor del turno:</strong> ${parseFloat(amount.toFixed(2))}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Servicio de plataforma:</strong> ${parseFloat((amount * 0.05).toFixed(2))}
                            </Typography>
                            {reservationMode === 'partial' && (
                                <Typography variant="body1" gutterBottom>
                                    <strong>Total a pagar: </strong> ${parseFloat((amount / 2 + amount * 0.05).toFixed(2))}
                                    Este club solicita el pago de la mitad del turno para confirmar la reserva.
                                </Typography>
                            )}
                            {reservationMode === 'full' && (
                                <Typography variant="body1" gutterBottom>
                                    <strong>Total a pagar: </strong> ${amount + amount * 0.05}
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

            <MercadoPagoBrick
                walletBookingId={walletBookingId}
                isOpen={mercadoPagoBrikIsOpen}
                onSuccessfulPayment={handleSimpleBooking}
                amount={amount}
                fieldPrice={amount}
                tenantId={tenantIdForBooking}
                tenantEmail={tenantData.email}
                tenantName={tenantData.name}
                ownerId={ownerId}
                reservationMode={reservationMode}
                title={`Reserva ${fieldData?.name}`}
                onClose={handleMercadoPagoBrickClose}
            />

            <ConfirmationDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                onConfirm={handleConfirm}
                title={dialogTitle}
                message={dialogDescription}
                onlyConfirmButton={true}
            />

            <NewUserModal isOpen={newUserModalIsOpen} onClose={() => { setNewUserModalIsOpen(false); setIsLoading(false) }} onSuccessfulUserCreation={fetchTenantData} />

            <Snackbar open={snackBarOpen} autoHideDuration={5000} onClick={handelSnackClose} onClose={handelSnackClose}>
                <Alert severity={snackBarSeverity as AlertColor} sx={{ width: '100%', fontSize: '15px' }} onClose={handelSnackClose}>
                    {snackBarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default BookingSteps;
