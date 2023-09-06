/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import mercadopago from 'mercadopago';

interface MercadoPagoStepsProps {
    isOpen: boolean;
    onClose: () => void;
}

const MercadoPagoSteps: React.FC<MercadoPagoStepsProps> = ({ isOpen, onClose }) => {
    mercadopago.configure({
        access_token: 'TU_ACCESS_TOKEN_AQUI',
    });

    return (
        <Modal open={isOpen} onClose={onClose}>
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
            </Box>
        </Modal>
    );
};

export default MercadoPagoSteps;
