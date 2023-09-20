/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ArrowBack } from '@mui/icons-material';
import { Alert, AlertColor, Box, Button, Card, CardActions, CardContent, Checkbox, FormControlLabel, Grid, IconButton, Snackbar, TextField, Typography } from '@mui/material';
import ConfirmationDialog from '../../ConfirmationDialog';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { cancelPlan, getPlanStatus, getUser, updateUser } from '../../../api/users';
import { EditUser } from '../../../types/users';
import CanchasClubLoader from '../../Loader';
import ChangePasswordDialog from '../ChangePasswordDialog';
import { Lock } from '@mui/icons-material';

interface UserProfileEditProps {
    onItemClick: (option: string) => void;
}
const UserProfileEdit = ({ onItemClick }: UserProfileEditProps) => {
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [snackBarSeverity, setSnackBarSeverity] = useState("success");
    const handelSnackClose = () => {
        setSnackBarOpen(false);
    }
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isChangePasswordDialogOpen, setChangePasswordDialogOpen] = useState(false);


    const handleOpenChangePasswordDialog = () => {
        setChangePasswordDialogOpen(true);
    };
    const handleCloseChangePasswordDialog = () => {
        setChangePasswordDialogOpen(false);
    };


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

    const [formData, setFormData] = useState<EditUser>({
        name: '',
        phone: '',
    });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const getUserData = async () => {
        try {
            const user = await getUser();
            setFormData({
                name: user.name,
                password: '',
                phone: user.phone,
            });
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching plan status:", error);
            setIsLoading(false);
        }
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formData.password === '') delete formData.password;
        console.log('Datos enviados:', formData);
        await updateUser(formData);
        setSnackBarMessage('Datos actualizados');
        setSnackBarSeverity('success');
        setSnackBarOpen(true);
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    };

    useEffect(() => {
        void getUserData();
    }, []);

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
                <CanchasClubLoader width="10%" />
            ) : (
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="div" gutterBottom sx={{
                            fontWeight: 'bold',
                            fontSize: '1.5rem',
                            justifyContent: 'center',
                            display: 'flex',
                            margin: '1rem',
                        }}>
                            Editar Información de Usuario
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Nombre"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Teléfono"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Button
                                        variant="outlined"
                                        color="warning"
                                        startIcon={<Lock />}
                                        onClick={handleOpenChangePasswordDialog}
                                    >
                                        Cambiar Contraseña
                                    </Button>
                                    <ChangePasswordDialog
                                        open={isChangePasswordDialogOpen}
                                        onClose={handleCloseChangePasswordDialog}
                                    />
                                </Grid>
                            </Grid>
                            <CardActions sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Button type="submit" variant="outlined" color="primary" >
                                    Guardar Cambios
                                </Button>
                            </CardActions>
                        </form>
                    </CardContent>
                </Card>
            )}

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

export default UserProfileEdit;
