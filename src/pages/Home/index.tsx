import { Alert, AlertColor, Box, Button, Grid, Modal, Paper, Snackbar, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Title from "../../components/Title";
import { useAuth } from "../../customHooks/useAuth";
import { getPlanStatus, getUser, withdrawMoney } from "../../api/users";
import CanchasClubLoader from "../../components/Loader";
import { EditUser } from "../../types/users";

const Home = () => {
  const { user } = useAuth();
  useEffect(() => {
    // Recargar para evitar errores en el inicio de sesión
    if (localStorage.getItem("dashboardFirstLoad") === "true") return;
    window.location.reload();
    localStorage.setItem("dashboardFirstLoad", "true");
  }, []);

  const [isPremium, setIsPremium] = useState(false);

  const checkPremium = async () => {
    const planStatus = await getPlanStatus();
    setIsPremium(planStatus.type !== "free" && planStatus.status === "active");
    const user = await getUser();
    setFormData({
      bankAccount: {
        bank: user.bankAccount?.bank,
        cbu: user.bankAccount?.cbu,
        alias: user.bankAccount?.alias,
        descriptiveName: user.bankAccount?.descriptiveName,
        availableMoney: user.bankAccount?.availableMoney,
        ownerName: user.bankAccount?.ownerName,
        withdrawProcessingMoney: user.bankAccount?.withdrawProcessingMoney,
      },
    });
  };
  useEffect(() => {
    void checkPremium();
  }, []);

  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarSeverity, setSnackBarSeverity] = useState("success");
  const handelSnackClose = () => {
    setSnackBarOpen(false);
  }
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [formData, setFormData] = useState<EditUser>({
    bankAccount: {
      bank: '',
      cbu: '',
      alias: '',
      descriptiveName: '',
      availableMoney: 0,
      ownerName: '',
      withdrawProcessingMoney: 0,
    },
  });
  const closeModal = () => {
    setIsOpen(false);
  }

  const handleWithdrawal = async () => {
    setIsLoading(true);
    const req = await withdrawMoney(withdrawalAmount);
    if (req.statusCode >= 400) {
      setSnackBarMessage(req.message);
      setSnackBarSeverity('error');
      setSnackBarOpen(true);
      return;
    }
    setSnackBarMessage('Solicitud de retiro realizada con éxito')
    setSnackBarSeverity('success');
    setSnackBarOpen(true);
    setTimeout(() => {
      window.location.reload();
    }, 1500);
    return;
  }

  return (
    <>
      <Box padding={2}>
        <Title firtLineTitle="Bienvenid@" secondLineTitle={user?.userName} />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        padding={2}
        flexDirection={{ xs: "column", sm: "row" }}
      >
        <Paper elevation={3} sx={{
          padding: 2, textAlign: "center", marginBottom: { xs: 2, sm: 0 }, flex: 1, width: {
            xs: "100%",
            sm: "auto"
          }
        }}>
          <Typography variant="h6">Reservas en Curso</Typography>
          <Typography variant="h4">5</Typography>
        </Paper>

        {isPremium && (
          <Paper elevation={3} sx={{
            padding: 2, textAlign: "center", marginLeft: { xs: 0, sm: 2 }, flex: 1, width: {
              xs: "100%",
              sm: "auto"
            }
          }}>
            <Typography variant="h6">Dinero Disponible</Typography>
            <Typography variant="h4">${formData.bankAccount?.availableMoney - formData.bankAccount?.withdrawProcessingMoney}</Typography>
            {formData.bankAccount?.withdrawProcessingMoney > 0 && (
              <Typography variant="body1" color="info">*Hay un retiro de dinero en proceso por ${formData.bankAccount?.withdrawProcessingMoney}</Typography>
            )}
            <Button variant="outlined" color="primary" onClick={() => setIsOpen(true)}>
              Retirar
            </Button>
          </Paper>
        )}

        <Paper elevation={3} sx={{ padding: 2, textAlign: "center", marginLeft: { xs: 0, sm: 2 }, marginTop: 2, width: { xs: "100%", sm: "auto" } }}>
          <Typography variant="h6">Reservas Totales</Typography>
          <Grid container spacing={2}>
            <Grid item xs={4} sm={4}>
              <Typography variant="h6">Canceladas</Typography>
              <Typography variant="h4">2</Typography>
            </Grid>
            <Grid item xs={4} sm={4}>
              <Typography variant="h6">Concretadas</Typography>
              <Typography variant="h4">10</Typography>
            </Grid>
            <Grid item xs={4} sm={4}>
              <Typography variant="h6">En Curso</Typography>
              <Typography variant="h4">3</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      <Modal open={isOpen} onClose={closeModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            textAlign: 'center',
          }}
        >
          {isLoading ? (
            <CanchasClubLoader width="10%" />
          ) : (
            <>
              <Typography variant="h2" color="primary" gutterBottom>
                Retiro de dinero
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Cuenta destino :</strong> {formData.bankAccount?.descriptiveName}
              </Typography>
              <Typography variant="body1" gutterBottom sx={{mb: 2}}>
                <strong>Titular :</strong> {formData.bankAccount?.ownerName}
              </Typography>
              <TextField
                fullWidth
                label="Monto a retirar"
                name="amount"
                value={withdrawalAmount}
                type="number"
                required
                InputProps={{
                  inputProps: {
                    min: 0,
                    max: formData.bankAccount?.availableMoney - formData.bankAccount?.withdrawProcessingMoney,
                  },
                }}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const isValidPrice = /^\d*\.?\d*$/.test(inputValue);
                  if (isValidPrice || inputValue !== "") {
                    setWithdrawalAmount(parseFloat(inputValue));
                  }
                }}
                error={withdrawalAmount > formData.bankAccount?.availableMoney - formData.bankAccount?.withdrawProcessingMoney}
                helperText={
                  withdrawalAmount > formData.bankAccount?.availableMoney - formData.bankAccount?.withdrawProcessingMoney
                    ? 'No puede retirar más dinero del que tiene disponible'
                    : ''
                }
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2, width: '100%' }}
                onClick={handleWithdrawal}
                disabled={withdrawalAmount > formData.bankAccount?.availableMoney - formData.bankAccount?.withdrawProcessingMoney || isNaN(withdrawalAmount) || withdrawalAmount === 0}
              >
                Confirmar Retiro
              </Button>
            </>
          )}
        </Box>
      </Modal>
      <Snackbar open={snackBarOpen} autoHideDuration={5000} onClick={handelSnackClose} onClose={handelSnackClose}>
        <Alert severity={snackBarSeverity as AlertColor} sx={{ width: '100%', fontSize: '15px' }} onClose={handelSnackClose}>
          {snackBarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Home;
