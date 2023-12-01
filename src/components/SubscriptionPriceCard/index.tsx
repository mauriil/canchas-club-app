/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import '../../App.css';
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Alert, AlertColor, Box, Modal, Snackbar, Typography } from '@mui/material';
import Avanzado from '../../assets/images/CanchasClub_Iconografia-AVANZADO.svg';
import Progresivo from '../../assets/images/CanchasClub_Iconografia-PROGRESIV.svg';
import Essentials from '../../assets/images/CanchasClub_Iconografia-ESSENTIAL.svg';
import { createPremiumSubscription } from '../../api/users';
import { Payment, initMercadoPago } from '@mercadopago/sdk-react';
import { useAuth } from '../../customHooks/useAuth';
import { createOwnerPayment } from '../../api/mercadoPago';

interface SubscriptionPriceProps {
  id: string;
  icon: string;
  title: string;
  items: string[];
  price: number;
  onSubscribeResolve: (buyStatus: boolean) => void;
}

const SubscriptionPriceCard: React.FC<SubscriptionPriceProps> = ({
  id,
  icon,
  title,
  items,
  price,
  onSubscribeResolve,

}) => {
  const { user } = useAuth();
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarSeverity, setSnackBarSeverity] = useState("success");
  const handelSnackClose = () => {
    setSnackBarOpen(false);
  }
  const [logoUrl, setLogoUrl] = useState('');
  const [mercadoPagoBrikOpen, setMercadoPagoBrikOpen] = useState(false);

  initMercadoPago(import.meta.env.VITE_MERCADO_PAGO_ACCESS_TOKEN);
  const initialization = {
    amount: price,
    payer: {
      firstName: user?.userName,
    },
    description: 'Canchas Club - Acceso dueño de club',
  };

  const handleBuyClick = () => {
    setMercadoPagoBrikOpen(true);
  };

  const onSubmit = async (formData: any) => {
    const paymentPayload = { ...formData.formData, title: 'Canchas Club - Acceso dueño de club' }
    const payment = await createOwnerPayment(paymentPayload);
    void onSubscribeResolve(payment);
  }

  const onError = async (error) => {
    // callback called for all Brick error cases
    console.log(error);
  };


  const onReady = async () => {
    /*
      Callback called when Brick is ready.
      Here you can hide loadings from your site, for example.
    */
  };

  const onClose = () => {
    setMercadoPagoBrikOpen(false);
  };

  useEffect(() => {
    switch (icon) {
      case 'Essentials':
        setLogoUrl(Essentials);
        break;
      case 'Progresivo':
        setLogoUrl(Progresivo);
        break;
      case 'Avanzado':
        setLogoUrl(Avanzado);
        break;
      default:
        setLogoUrl(Essentials);
        break;
    }
  }, [icon]);

  return (
    <Box sx={{
      width: '500px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: '20rem',
    }}>
      <Card variant="outlined" sx={{
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        overflowY: 'auto',
        backgroundColor: 'white',
        boxShadow: '0px 0px 5px 1px rgb(0,0,0)',
        width: '100%',
        maxWidth: { xs: '340px', sm: '100%' },
      }}>
        <Box sx={{
          width: '100%',
          height: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          marginTop: '1rem',
        }}>
          <Typography variant="body1" color="textSecondary" fontFamily="museo300" fontSize="1.5rem" sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: 'primary.main',
            fontFamily: 'museo700',
            fontSize: '2rem',
            minHeight: '4rem',
          }} >
            {title}
          </Typography>
          <img src={logoUrl} alt={icon} width={'50px'} />
        </Box>
        <CardContent>
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                <Typography variant="body1" color="textSecondary" fontFamily="museo300" fontSize="1.5rem">
                  {item}
                </Typography>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardContent>
          <Typography variant="h1" fontFamily="museo700" fontSize="2rem" sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            textAlign: 'center',
            marginBottom: '1rem',
          }}>
            ${price}
          </Typography>
          <Button variant="contained" onClick={() => handleBuyClick()} sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            width: '100%',
          }}>
            Comprar pase
          </Button>
        </CardContent>

        <Snackbar open={snackBarOpen} autoHideDuration={5000} onClick={handelSnackClose} onClose={handelSnackClose}>
          <Alert severity={snackBarSeverity as AlertColor} sx={{ width: '100%', fontSize: '15px' }} onClose={handelSnackClose}>
            {snackBarMessage}
          </Alert>
        </Snackbar>
      </Card>

      <Modal
        open={mercadoPagoBrikOpen}
        onClose={onClose}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            maxHeight: '90vh',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <Payment
            initialization={initialization}
            onSubmit={onSubmit}
            onReady={onReady}
            onError={onError}
            locale='es-AR'
            customization={{
              paymentMethods: {
                creditCard: "all",
                debitCard: "all",
                mercadoPago: "all",
              }
            }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default SubscriptionPriceCard;
