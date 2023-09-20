/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Alert, AlertColor, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Snackbar, TextField } from '@mui/material';

import { useState } from 'react';
import CanchasClubLoader from '../../Loader';
import { updateUserPassword } from '../../../api/users';
import { set } from 'date-fns';

interface ChangePasswordDialogProps {
    open: boolean;
    onClose: () => void;
}
const ChangePasswordDialog = ({ open, onClose }: ChangePasswordDialogProps) => {
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [snackBarSeverity, setSnackBarSeverity] = useState("success");
    const handelSnackClose = () => {
        setSnackBarOpen(false);
    }
    const [isLoading, setIsLoading] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        repeatNewPassword: '',
    });
    const [errors, setErrors] = useState({
        currentPassword: { error: false, message: '' },
        newPassword: { error: false, message: '' },
        repeatNewPassword: { error: false, message: '' }
    });

    const handlePasswordInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setPasswordData({
            ...passwordData,
            [name]: value,
        });
    };

    const handlePasswordChangeSubmit = async (passwordData: { currentPassword: string; newPassword: string; repeatNewPassword: string; }) => {
        setIsLoading(true);
        setErrors({
            currentPassword: { error: false, message: '' },
            newPassword: { error: false, message: '' },
            repeatNewPassword: { error: false, message: '' }
        });
        if (passwordData.newPassword !== passwordData.repeatNewPassword) {
            setErrors({
                ...errors,
                repeatNewPassword: { error: true, message: 'Las contraseñas no coinciden' },
            });
            return;
        }
        if (passwordData.newPassword.length < 8) {
            setErrors({
                ...errors,
                repeatNewPassword: { error: true, message: 'La contraseña debe tener al menos 8 caracteres' },
            });
            return;
        }
        const request = await updateUserPassword(passwordData.currentPassword, passwordData.newPassword);
        if (request.statusCode >= 400) {
            setSnackBarMessage(request.message);
            setSnackBarSeverity('error');
            setSnackBarOpen(true);
            setIsLoading(false);
            return;
        }
        setIsLoading(false);
        setSnackBarMessage('Contraseña cambiada con éxito')
        setSnackBarSeverity('success');
        setSnackBarOpen(true);
        setTimeout(() => {
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                repeatNewPassword: '',
            })
            setSnackBarOpen(false);
            onClose();
        }, 1500);
    };

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Cambiar Contraseña</DialogTitle>
            {isLoading ? (
                <CanchasClubLoader width='30%'/>
            ) : (
                <DialogContent>
                    <DialogContentText sx={{
                        marginBottom: '20px',
                    }}>
                        Complete los siguientes campos para cambiar su contraseña.
                    </DialogContentText>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Contraseña Actual"
                                name="currentPassword"
                                type="password"
                                value={passwordData.currentPassword}
                                onChange={handlePasswordInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Nueva Contraseña"
                                name="newPassword"
                                type="password"
                                value={passwordData.newPassword}
                                onChange={handlePasswordInputChange}
                                error={errors.repeatNewPassword.error}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Repetir Nueva Contraseña"
                                name="repeatNewPassword"
                                type="password"
                                value={passwordData.repeatNewPassword}
                                onChange={handlePasswordInputChange}
                                error={errors.repeatNewPassword.error}
                                helperText={errors.repeatNewPassword.message}
                            />
                        </Grid>
                    </Grid>
                    <DialogActions>
                        <Button onClick={onClose} color="primary">
                            Cancelar
                        </Button>
                        <Button type="submit" variant="contained" color="primary" onClick={() => handlePasswordChangeSubmit(passwordData)}>
                            Guardar
                        </Button>
                    </DialogActions>
                </DialogContent>
            )}
            <Snackbar open={snackBarOpen} autoHideDuration={5000} onClick={handelSnackClose} onClose={handelSnackClose}>
                <Alert severity={snackBarSeverity as AlertColor} sx={{ width: '100%', fontSize: '15px' }} onClose={handelSnackClose}>
                    {snackBarMessage}
                </Alert>
            </Snackbar>
        </Dialog>
    );
};

export default ChangePasswordDialog;
