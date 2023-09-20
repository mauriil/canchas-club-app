/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Alert, AlertColor, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Snackbar, TextField } from '@mui/material';

import { useEffect, useState } from 'react';
import CanchasClubLoader from '../../Loader';
import { ArrowBack, Refresh } from '@mui/icons-material';
import { checkMercadoPagoAccessToken } from '../../../api/mercadoPago';
import { getUser, updateUser } from '../../../api/users';

interface MercadoPagoTokenProps {
    onItemClick: (option: string) => void;
}
const MercadoPagoToken = ({ onItemClick }: MercadoPagoTokenProps) => {
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [snackBarSeverity, setSnackBarSeverity] = useState("success");
    const handelSnackClose = () => {
        setSnackBarOpen(false);
    }
    const [isLoading, setIsLoading] = useState(false);
    const [mercadoTokenData, setmercadoTokenData] = useState({
        accessToken: '',
    });
    const [errors, setErrors] = useState({
        accessToken: { error: false, message: '' },
    });
    const [integrationStatus, setIntegrationStatus] = useState('NO INTEGRADO');

    const mercadoPagoInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setmercadoTokenData({
            ...mercadoTokenData,
            [name]: value,
        });
    };

    const handleMercadoPagoTokenSubmit = async (mercadoTokenData: { accessToken: string; }) => {
        const isValid = await checkMercadoPagoToken(mercadoTokenData.accessToken)
        if (isValid) {
            setIsLoading(true);
            await updateUser({ mercadoPagoToken: mercadoTokenData.accessToken});
            setSnackBarMessage('Éxito al guardar el token')
            setSnackBarSeverity('success');
            setSnackBarOpen(true);
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }
    };

    const checkMercadoPagoToken =  async (accessToken: string): Promise<boolean> => {
        setErrors({
            accessToken: { error: false, message: '' },
        });
        if (!accessToken) {
            setErrors({
                accessToken: { error: true, message: 'Debe proveer un token válido' },
            });
            return false;
        }
        setIsLoading(true);
        const request = await checkMercadoPagoAccessToken(accessToken)
        if (request.statusCode >= 400) {
            setSnackBarMessage(request.message);
            setSnackBarSeverity('error');
            setSnackBarOpen(true);
            setIsLoading(false);
            return false;
        }
        setIsLoading(false);
        if (!request) {
            setIntegrationStatus('ERROR');
        } else {
            setIntegrationStatus('INTEGRADO');
        }
        return request as boolean;
    };

    const getUserData = async () => {
        try {
            const user = await getUser();
            if (user.mercadoPagoToken !== null) {
                setmercadoTokenData({
                    accessToken: user.mercadoPagoToken,
                });
                await checkMercadoPagoToken(user.mercadoPagoToken);
            }
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching plan status:", error);
            setIsLoading(false);
        }
    }

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
            {
                isLoading ? (
                    <CanchasClubLoader width='10%' />
                ) : (
                    <><>
                        <Grid container spacing={2} sx={{
                            padding: '1.5rem',
                        }}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Mercado Pago Access Token"
                                    name="accessToken"
                                    type="tet"
                                    value={mercadoTokenData.accessToken}
                                    error={errors.accessToken.error || integrationStatus === 'ERROR'}
                                    helperText={errors.accessToken.message}
                                    onChange={mercadoPagoInputChange} />
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Box
                                    sx={{
                                        border: '1px solid #ccc',
                                        borderRadius: '5px',
                                        padding: '1rem',
                                        marginTop: '1rem',
                                        color: integrationStatus === 'INTEGRADO' ? 'green' : integrationStatus === 'ERROR' ? 'red' : 'primary.main',
                                        display: 'flex',
                                        alignItems: 'center',
                                        ":hover": {
                                            cursor: 'pointer',
                                        }
                                    }}
                                    onClick={() => checkMercadoPagoToken(mercadoTokenData.accessToken)}
                                >
                                    <Refresh sx={{
                                        marginRight: '1rem',
                                    }} />
                                    ESTADO DE INTEGRACIÓN: {integrationStatus}
                                </Box>
                            </Grid>
                        </Grid>
                        <Button type="submit" variant="outlined"
                            sx={{
                                margin: '1rem',
                            }}
                            color="primary" onClick={() => handleMercadoPagoTokenSubmit(mercadoTokenData)}>
                            Guardar
                        </Button>
                    </><Snackbar open={snackBarOpen} autoHideDuration={5000} onClick={handelSnackClose} onClose={handelSnackClose}>
                            <Alert severity={snackBarSeverity as AlertColor} sx={{ width: '100%', fontSize: '15px' }} onClose={handelSnackClose}>
                                {snackBarMessage}
                            </Alert>
                        </Snackbar>
                    </>
                )
            }
        </Box>


    );
};

export default MercadoPagoToken;
