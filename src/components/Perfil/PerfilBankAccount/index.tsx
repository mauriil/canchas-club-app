/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ArrowBack } from '@mui/icons-material';
import { Alert, AlertColor, Box, Button, Card, CardContent, Grid, IconButton, Snackbar, TextField, Typography } from '@mui/material';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { getUser, updateUser } from '../../../api/users';
import { EditUser } from '../../../types/users';
import CanchasClubLoader from '../../Loader';

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
    const [isLoading, setIsLoading] = useState(true);


    const [formData, setFormData] = useState<EditUser>({
        bankAccount: {
            bank: '',
            cbu: '',
            alias: '',
            descriptiveName: '',
            ownerName: ' ',
        },
    });

    const getUserData = async () => {
        try {
            const user = await getUser();
            setFormData({
                bankAccount: {
                    bank: user.bankAccount?.bank,
                    cbu: user.bankAccount?.cbu,
                    alias: user.bankAccount?.alias,
                    descriptiveName: user.bankAccount?.descriptiveName,
                    ownerName: user.bankAccount?.ownerName,
                },
            });
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching plan status:", error);
            setIsLoading(false);
        }
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            bankAccount: {
                ...formData.bankAccount,
                [event.target.name]: event.target.value,
            },
        });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
        event.preventDefault();
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
                    <CardContent>
                        <Typography variant="h5" component="div" gutterBottom sx={{
                            fontWeight: 'bold',
                            fontSize: '1.5rem',
                            justifyContent: 'center',
                            display: 'flex',
                            margin: '1rem',
                        }}>
                            Editar Información Bancaria de Usuario
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Nombre descriptivo"
                                        name="descriptiveName"
                                        value={formData.bankAccount.descriptiveName}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="alias"
                                        name="alias"
                                        value={formData.bankAccount.alias}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Nombre del titular"
                                        name="ownerName"
                                        value={formData.bankAccount?.ownerName}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                </Grid>
                                <Grid item xs={12} sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Button type="submit" variant="outlined" color="primary" sx={{
                                        width: '100%',
                                    }} >
                                        Guardar Cambios
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            )}

            <Snackbar open={snackBarOpen} autoHideDuration={5000} onClick={handelSnackClose} onClose={handelSnackClose}>
                <Alert severity={snackBarSeverity as AlertColor} sx={{ width: '100%', fontSize: '15px' }} onClose={handelSnackClose}>
                    {snackBarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default UserProfileEdit;
