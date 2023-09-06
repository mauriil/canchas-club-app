import '../../App.css';
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import AvatarIcon from '../Avatar';

interface SubscriptionPriceProps {
  icon: string;
  title: string;
  items: string[];
  price: number;
  onBuyClick: () => void;
}

const SubscriptionPriceCard: React.FC<SubscriptionPriceProps> = ({
  icon,
  title,
  items,
  price,
  onBuyClick,
}) => {
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
          <Button variant="contained" onClick={onBuyClick} sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            width: '100%',
            marginTop: '1rem',
            marginBottom: '1rem',
          }}>
            Suscribirse
          </Button>
        </CardContent>
      </Card></>
  );
};

export default SubscriptionPriceCard;
