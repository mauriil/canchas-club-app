/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { initMercadoPago, CardPayment, Payment } from '@mercadopago/sdk-react';
import { createPayment } from '../../api/mercadoPago';

interface MercadoPagoBrickProps {
    isOpen: boolean;
    // onClose: () => void;
    ownerId: string;
    tenantId: string;
    tenantName: string;
    tenantEmail: string;
    amount: number;
    title: string;
    reservationMode: string;
    onSuccessfulPayment: (paymentId: string, status: string) => void;
}

const MercadoPagoBrick: React.FC<MercadoPagoBrickProps> = ({ isOpen, ownerId, tenantId, tenantName, tenantEmail, onSuccessfulPayment, amount, title, reservationMode }) => {
    initMercadoPago('APP_USR-08595a8c-9d17-41db-b547-a6831dbd72e6');
    amount = reservationMode === "full" ? (amount + amount * 0.05) : reservationMode === "partial" ? (amount / 2 + amount * 0.05) : 0;
    const initialization = {
        amount,
        payer: {
            firstName: tenantName,
            email: tenantEmail,
        },
        description: title,
    };

    const onSubmit = async (formData: any) => {
        const paymentPayload = { ...formData.formData, ownerId, tenantId, amount, title, reservationMode }
        const payment = await createPayment(paymentPayload);
        void onSuccessfulPayment(payment.paymentId, payment.status)
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

    const handleNoBoostPayment = async () => {
        const paymentPayload = { ownerId, tenantId, amount, title, reservationMode }
        const payment = await createPayment(paymentPayload);
        void onSuccessfulPayment(payment.paymentId, payment.status)
    }

    if (isOpen && reservationMode === "withoutGuarantee") {
        void handleNoBoostPayment();
    }

    return (
        <Modal
            open={isOpen && reservationMode !== "withoutGuarantee"}
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
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
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
    );
};

export default MercadoPagoBrick;
