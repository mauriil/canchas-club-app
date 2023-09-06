/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ArrowBack } from '@mui/icons-material';
import { Alert, AlertColor, Box, Button, IconButton, Snackbar } from '@mui/material';
import ConfirmationDialog from '../../ConfirmationDialog';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cancelPlan, getPlanStatus } from '../../../api/users';
import { PlanStatus } from '../../../types/users';

interface UserProfilePlanStatusProps {
    onItemClick: (option: string) => void;
}
const UserProfilePlanStatus = ({ onItemClick }: UserProfilePlanStatusProps) => {
    const navigate = useNavigate();
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [snackBarSeverity, setSnackBarSeverity] = useState("success");
    const handelSnackClose = () => {
        setSnackBarOpen(false);
    }
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [planStatus, setPlanStatus] = useState<PlanStatus | null>(null);
    const getPlanStatusRequest = async () => {
        try {
            const planStatusResponse: PlanStatus = await getPlanStatus();
            setPlanStatus(planStatusResponse);
        } catch (error) {
            console.error("Error fetching plan status:", error);
        }
    }

    useEffect(() => {
        void getPlanStatusRequest();
    }, []);


    const handleDelete = async () => {
        const req = await cancelPlan();
        if (req.statusCode >= 400) {
            setSnackBarMessage(req.message);
            setSnackBarSeverity('error');
            setSnackBarOpen(true);
            return;
        }
        setSnackBarMessage('Subscripción cancelada')
        setSnackBarSeverity('success');
        setSnackBarOpen(true);
        setTimeout(() => {
            window.location.reload();
        }, 1500);
        return;
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            height="100%"
            width="100%"
            borderRadius="15px"
            sx={{
                backgroundColor: { md: 'background.paper' },
                boxShadow: { md: '0px 0px 25px 1px rgb(0,0,0)' },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#F5F5F5",
                    borderBottom: "1px solid #E0E0E0",
                    width: "100%",
                    padding: "1rem",
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                }}
            >
                <IconButton onClick={() => onItemClick('menu')} >
                    <ArrowBack />
                </IconButton>
            </Box>
            <p>DESCRIPCION DEL PLAN EN CURSO</p>
            <p>Nombre: {planStatus?.type}</p>
            <p>Fecha de inicio: {
            new Date(planStatus?.date as string).toLocaleDateString("es-AR", {
                year: "numeric",
                month: "long",
                day: "numeric",
            })
            }</p>
            <p>Valor: {planStatus?.value}</p>
            <p>Estado: {planStatus?.status}</p>
            <p>Clubes creados: {planStatus?.clubsCreated}</p>
            <p>Clubes restantes: {planStatus?.remainingClubCreations}</p>
            <p>Canchas creadas: {planStatus?.fieldsCreated}</p>
            <p>Canchas restantes: {planStatus?.remainingFieldCreations}</p>

            <Button variant="contained" color="error" onClick={() => setOpenDeleteDialog(true)}>
                Cancelar plan
            </Button>
            <ConfirmationDialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
                onConfirm={handleDelete}
                message={`¿Estás seguro que querés dar de baja la subscripción?
                        Todos los datos se van a seguir guardando pero no vas a poder acceder a ellos.
                        Si tenés turnos agendados, se van a cancelar.
                        Esta acción no se puede deshacer.`}
            />
            <Snackbar open={snackBarOpen} autoHideDuration={5000} onClick={handelSnackClose} onClose={handelSnackClose}>
                <Alert severity={snackBarSeverity as AlertColor} sx={{ width: '100%', fontSize: '15px' }} onClose={handelSnackClose}>
                    {snackBarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default UserProfilePlanStatus;
