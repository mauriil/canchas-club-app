/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ArrowBack } from '@mui/icons-material';
import { Alert, AlertColor, Box, Button, Card, CardActions, CardContent, CardHeader, Grid, IconButton, Snackbar, Typography } from '@mui/material';
import ConfirmationDialog from '../../ConfirmationDialog';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cancelPlan, getPlanStatus } from '../../../api/users';
import { PlanStatus } from '../../../types/users';
import Avanzado from '../../../assets/images/CanchasClub_Iconografia-AVANZADO.svg';
import Progresivo from '../../../assets/images/CanchasClub_Iconografia-PROGRESIV.svg';
import Essentials from '../../../assets/images/CanchasClub_Iconografia-ESSENTIAL.svg';
import CanchasClubLoader from '../../Loader';

interface UserProfilePlanStatusProps {
    onItemClick: (option: string) => void;
}
const UserProfilePlanStatus = ({ onItemClick }: UserProfilePlanStatusProps) => {
    const [logoUrl, setLogoUrl] = useState('');
    const [planTitle, setPlanTitle] = useState('');
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [snackBarSeverity, setSnackBarSeverity] = useState("success");
    const handelSnackClose = () => {
        setSnackBarOpen(false);
    }
    const [isLoading, setIsLoading] = useState(true);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [planStatus, setPlanStatus] = useState<PlanStatus | null>(null);
    const getPlanStatusRequest = async () => {
        try {
            const planStatusResponse: PlanStatus = await getPlanStatus();
            setPlanStatus(planStatusResponse);
            switch (planStatusResponse.type) {
                case 'premium1':
                    setLogoUrl(Essentials);
                    setPlanTitle('CanchaEssentials');
                    break;
                case 'premium2':
                    setLogoUrl(Progresivo);
                    setPlanTitle('CanchaProgresivo');
                    break;
                case 'premium3':
                    setLogoUrl(Avanzado);
                    setPlanTitle('Dueño de club');
                    break;
                default:
                    setLogoUrl(Essentials);
                    setPlanTitle('CanchaEssentials');
                    break;
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
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
            {isLoading ? (
                <Box sx={{
                    width: '100%',
                    height: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '1rem',
                }}>
                    <CanchasClubLoader width="80%" />
                </Box>
            ) : (
                <Card>
                    <Box sx={{
                        width: '100%',
                        height: 'auto',
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: '1rem',
                    }}>
                        <img src={logoUrl} alt="logo" width={'100px'} />
                        <Typography variant="body1" color="textSecondary" fontFamily="museo300" fontSize="1.5rem">
                            {planTitle}
                        </Typography>
                    </Box>
                    <CardContent>
                        <Grid container justifyContent="center" spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="h3" align="center" color={'primary'}>
                                    {planStatus?.clubsCreated}
                                </Typography>
                                <Typography variant="subtitle1" align="center">
                                    Clubes creados
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h3" align="center" color={'primary'}>
                                    {planStatus?.fieldsCreated}
                                </Typography>
                                <Typography variant="subtitle1" align="center">
                                    Canchas creadas
                                </Typography>
                            </Grid>
                        </Grid>
                        <Typography variant="h6" align="center" sx={{
                            color: 'primary.main',
                            fontWeight: 'bold',
                        }}>
                            Estado
                        </Typography>
                        <Typography variant="body1" align="center" >
                            {planStatus?.status}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button fullWidth variant="outlined" color="error" onClick={() => setOpenDeleteDialog(true)} sx={{
                            ":hover": {
                                color: 'white',
                            }
                        }}>
                            Solicitar Baja
                        </Button>
                    </CardActions>
                </Card>
            )}

            <ConfirmationDialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
                onConfirm={handleDelete}
                title="Baja de subscripción"
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
