import { Box, Modal } from "@mui/material";

interface MercadoUserSubscriptionProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

const MercadoUserSubscription = ({ isOpen, onClose, url }: MercadoUserSubscriptionProps) => {

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          bgcolor: 'background.paper',
          border: '2px solid #00a6c0',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <iframe
          title="Suscripción a Canchas Club"
          src={url} // Reemplaza con la URL externa que deseas cargar
          width="100%"
          height="500px" // Ajusta la altura según tus necesidades
        />
      </Box>
    </Modal>
  );
};

export default MercadoUserSubscription;
