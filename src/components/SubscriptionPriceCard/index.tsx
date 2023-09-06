/* eslint-disable @typescript-eslint/no-unsafe-call */
import '../../App.css';
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Alert, AlertColor, Box, Snackbar, Typography } from '@mui/material';
import AvatarIcon from '../Avatar';
import { createPremiumSubscription } from '../../api/users';

interface SubscriptionPriceProps {
  id: string;
  icon: string;
  title: string;
  items: string[];
  price: number;
}

const SubscriptionPriceCard: React.FC<SubscriptionPriceProps> = ({
  id,
  icon,
  title,
  items,
  price,
}) => {
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarSeverity, setSnackBarSeverity] = useState("success");
  const handelSnackClose = () => {
    setSnackBarOpen(false);
  }
  const handleBuyClick = async (id: string) => {
    const req = await createPremiumSubscription(id);
    if (req.statusCode !== undefined && req.statusCode >= 400) {
      setSnackBarMessage(req.message);
      setSnackBarSeverity('error');
      setSnackBarOpen(true);
      return;
    }
    window.open(req.paymentUrl);
  };

  return (
    <>
      <Typography variant="body1" color="textSecondary" fontFamily="museo300" fontSize="1.5rem" sx={{
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'primary.main',
        fontFamily: 'museo700',
        fontSize: '2rem',
        minHeight: '4rem', // Establecer una altura fija para el CardHeader
      }} >
        {title}
      </Typography>
      <Card variant="outlined" sx={{
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        overflowY: 'auto',
      }}>
        <Box sx={{
          width: '100%',
          height: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '1rem',
        }}>
          <AvatarIcon width="35px" height="35px" />
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
          <Typography variant="h6" fontFamily="museo700" fontSize="2rem" sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            textAlign: 'center',
          }}>
            ${price}
          </Typography>
          <Button variant="contained" onClick={() => handleBuyClick(id)} sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            width: '100%',
            marginTop: '1rem',
            marginBottom: '1rem',
          }}>
            Suscribirse
          </Button>
        </CardContent>

        <Snackbar open={snackBarOpen} autoHideDuration={5000} onClick={handelSnackClose} onClose={handelSnackClose}>
          <Alert severity={snackBarSeverity as AlertColor} sx={{ width: '100%', fontSize: '15px' }} onClose={handelSnackClose}>
            {snackBarMessage}
          </Alert>
        </Snackbar>
      </Card></>
  );
};

export default SubscriptionPriceCard;
