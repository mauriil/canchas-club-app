/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { initMercadoPago, CardPayment } from '@mercadopago/sdk-react';
import { createPayment, createSubscription } from '../../api/mercadoPago';

interface MercadoPagoBrickProps {
    isOpen: boolean;
    // onClose: () => void;
    ownerId: string;
    tenantId: string;
    isSubscription: boolean;
    amount: number;
    onSuccessfulPayment: (paymentId: string) => void;
}

const MercadoPagoBrick: React.FC<MercadoPagoBrickProps> = ({ isOpen, ownerId, tenantId, isSubscription,  onSuccessfulPayment, amount }) => {
    initMercadoPago('TEST-1182f1bf-c98e-430c-964f-80d2d0b506cb');
    const initialization = {
        amount,
        payer: {
            firstName: "NOMBREDDELALQUILANTE",
            email: "EMAILDELALQUILANTE@hotmail.com",
        },
    };

    const onSubmit = async (formData: any) => {
        console.log("🚀 ~ file: index.tsx:20 ~ onSubmit ~ formData:", formData)
        const paymentPayload = { ...formData, ownerId, tenantId, isSubscription, amount, title: 'Reserva en NOMBREDECANCHA' }
        // const payment = await createPayment(paymentPayload);
        const payment = await createSubscription(paymentPayload);
        console.log("🚀 ~ file: index.tsx:31 ~ onSubmit ~ payment:", payment)
        void onSuccessfulPayment(payment.paymentId)
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

    return (
        <Modal
            open={isOpen}
            //onClose={onClose}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #00a6c0',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <CardPayment
                    initialization={initialization}
                    onSubmit={onSubmit}
                    onReady={onReady}
                    onError={onError}
                    locale='es-AR'
                />
            </Box>
        </Modal>
    );
};

export default MercadoPagoBrick;
