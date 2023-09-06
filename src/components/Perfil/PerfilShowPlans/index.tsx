import SubscriptionPriceCard from '../../SubscriptionPriceCard';
import { Alert, AlertColor, Box, IconButton, Snackbar } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useState } from 'react';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

interface PerfiilShowPlansProps {
    onItemClick: (option: string) => void;
}

const PerfiilShowPlans = ({ onItemClick }: PerfiilShowPlansProps) => {
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [snackBarSeverity, setSnackBarSeverity] = useState("success");
    const handelSnackClose = () => {
        setSnackBarOpen(false);
    }

    const servicios = [
        {
            id: 1,
            icono: 'url1',
            nombre: 'Servicio 1',
            items: ['Item 1', 'Item 2', 'Item 3'],
            precio: 50,
        },
        {
            id: 2,
            icono: 'url2',
            nombre: 'Servicio 2',
            items: ['Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8'],
            precio: 75,
        },
        {
            id: 3,
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
                <IconButton onClick={() => onItemClick('menu')}  >
                    <ArrowBack />
                </IconButton>
            </Box>

            <Box sx={{
                margin: 1,
                paddingBottom: '10rem',
            }}>
                <Grid2 container spacing={2}>
                    {servicios.map((servicio) => (
                        <Grid2  xs={12} sm={4} key={servicio.id}>
                            <SubscriptionPriceCard
                                icon={servicio.icono}
                                title={servicio.nombre}
                                items={servicio.items}
                                price={servicio.precio}
                                onBuyClick={() => alert(`Compraste ${servicio.nombre}`)}
                            />
                        </Grid2>
                    ))}
                </Grid2>
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
