import SubscriptionPriceCard from '../../SubscriptionPriceCard';
import { Alert, AlertColor, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Snackbar } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useState } from 'react';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import CanchasClubLoader from '../../Loader';

interface PerfiilShowPlansProps {
    onItemClick: (option: string) => void;
}

const PerfiilShowPlans = ({ onItemClick }: PerfiilShowPlansProps) => {
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [snackBarSeverity, setSnackBarSeverity] = useState("success");
    const handelSnackClose = () => {
        setSnackBarOpen(false);
    }

    const buySubscription = (buyStatus: boolean) => {
        setLoading(false);
        if (buyStatus) {
            setSnackBarMessage("¡Suscripción en curso!");
            setSnackBarSeverity('success');
            setSnackBarOpen(true);
            setDialogOpen(true);
            return;
        }
        setSnackBarMessage("¡Suscripción fallida!");
        setSnackBarSeverity('error');
        setSnackBarOpen(true);
    }

    const handleDialogClose = () => {
        setDialogOpen(false);
        window.location.reload();
    }

    const servicios = [
        {
            id: 'premium1',
            icono: 'url1',
            nombre: 'Servicio 1',
            items: ['Item 1', 'Item 2', 'Item 3'],
            precio: 50,
        },
        {
            id: 'premium2',
            icono: 'url2',
            nombre: 'Servicio 2',
            items: ['Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8'],
            precio: 75,
        },
        {
            id: 'premium3',
            icono: 'url3',
            nombre: 'Servicio 3',
            items: ['Item 4', 'Item 5', 'Item 6', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8'],
            precio: 100,
        },
    ];


    return (
        <Box
            display="flex"
            flexDirection="column"
            height="auto"
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
                <IconButton onClick={() => onItemClick('menu')}  >
                    <ArrowBack />
                </IconButton>
            </Box>

            {loading ? (
                <CanchasClubLoader width='10%' />
            ) : (
                <Box sx={{
                    margin: 1,
                    paddingBottom: '10rem',
                }}>
                    <Grid2 container spacing={2}>
                        {servicios.map((servicio) => (
                            <Grid2 xs={12} sm={4} key={servicio.id}>
                                <SubscriptionPriceCard
                                    id={servicio.id}
                                    icon={servicio.icono}
                                    title={servicio.nombre}
                                    items={servicio.items}
                                    price={servicio.precio}
                                    onSubscribeClick={() => setLoading(true)}
                                    onSubscribeResolve={(buyStatus) => {
                                        buySubscription(buyStatus);
                                    }}
                                />
                            </Grid2>
                        ))}
                    </Grid2>
                </Box>
            )}


            <Box>
                <Dialog open={dialogOpen} onClose={handleDialogClose}>
                    <DialogTitle>¡Suscripción exitosa!</DialogTitle>
                    <DialogContent>
                        <p>Tu pedido de suscripción se ha realizado con éxito. Por favor revisa tu casilla de e-mail para seguir instrucciones</p>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose} color="primary">
                            Cerrar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>


            <Snackbar open={snackBarOpen} autoHideDuration={5000} onClick={handelSnackClose} onClose={handelSnackClose}>
                <Alert severity={snackBarSeverity as AlertColor} sx={{ width: '100%', fontSize: '15px' }} onClose={handelSnackClose}>
                    {snackBarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default PerfiilShowPlans;
