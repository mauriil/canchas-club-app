/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { initMercadoPago, CardPayment } from '@mercadopago/sdk-react';

interface MercadoPagoBrickProps {
    isOpen: boolean;
    // onClose: () => void;
}

const MercadoPagoBrick: React.FC<MercadoPagoBrickProps> = ({ isOpen }) => {
    initMercadoPago('TEST-1182f1bf-c98e-430c-964f-80d2d0b506cb');
    const initialization = {
        amount: 100,
    };

    const onSubmit = async (formData) => {
        console.log("🚀 ~ file: index.tsx:20 ~ onSubmit ~ formData:", formData)
        // callback called when clicking on the submit data button
        const mp = fetch('/process_payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })

        const resp = await mp.json()
        console.log("🚀 ~ file: index.tsx:29 ~ onSubmit ~ resp:", resp)
        return resp
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
                {/* Agrega aquí los pasos para pagar con Mercado Pago SDK */}
                {/* Por ejemplo, formularios y pasos de pago */}
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
