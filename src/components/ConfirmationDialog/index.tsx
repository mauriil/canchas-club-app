import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const ConfirmationDialog = ({ open, onClose, onConfirm, message, title, onlyConfirmButton = false }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText style={{ whiteSpace: 'pre-line' }}>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {!onlyConfirmButton && <Button onClick={onClose} color="error">  Cancelar </Button>}
        <Button onClick={onConfirm} color="primary" autoFocus>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
