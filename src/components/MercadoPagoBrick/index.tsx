/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { initMercadoPago, Payment, Wallet } from '@mercadopago/sdk-react';
import { createPayment, createPreference } from '../../api/mercadoPago';

interface MercadoPagoBrickProps {
    walletBookingId?: string;
    isOpen: boolean;
    // onClose: () => void;
    ownerId: string;
    tenantId: string;
    tenantName: string;
    tenantEmail: string;
    amount: number;
    fieldPrice: number;
    title: string;
    reservationMode: string;
    onSuccessfulPayment: (paymentId: string, status: string) => void;
}

const MercadoPagoBrick: React.FC<MercadoPagoBrickProps> = ({ walletBookingId, isOpen, ownerId, tenantId, tenantName, tenantEmail, onSuccessfulPayment, amount, fieldPrice, title, reservationMode }) => {
    initMercadoPago(import.meta.env.VITE_MERCADO_PAGO_ACCESS_TOKEN);
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
        const paymentPayload = { ...formData.formData, ownerId, tenantId, amount, fieldPrice, title, reservationMode }
        const payment = await createPayment(paymentPayload);
        void onSuccessfulPayment(payment.paymentId, payment.status)
    }

    const onSubmitWallet = async () => {
        const preference = await createPreference({
                    title,
                    amount,
                    email: tenantEmail,
                    external_reference: walletBookingId,
        });

        return preference.body.id;
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
        return new Promise((resolve, reject) => {
            fetch('/create_preference', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items: [
                        {
                            id: '202809963',
                            title: 'Dummy title',
                            description: 'Dummy description',
                            quantity: 1,
                            unit_price: 10,
                        },
                    ],
                    purpose: 'wallet_purchase',
                }),
            })
                .then((response) => response.json())
                .then((response) => {
                    resolve(response.preference_id);
                })
                .catch((error) => {
                    reject();
                });
        });
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
                    maxHeight: '90vh',
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                    overflow: 'auto',
                    WebkitOverflowScrolling: 'touch',
                }}
            >
                <Wallet
                    onSubmit={onSubmitWallet}
                    onReady={onReady}
                    onError={onError}
                    locale='es-AR'
                />
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
                            mercadoPago: ['onboarding_credits', 'wallet_purchase'],
                        }
                    }}
                />
            </Box>
        </Modal>
    );
};

export default MercadoPagoBrick;
