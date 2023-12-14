/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Alert, AlertColor, Box, Button, Grid, Modal, Paper, Snackbar, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Title from "../../components/Title";
import { useAuth } from "../../customHooks/useAuth";
import { getPlanStatus, getUser, getUserStats, withdrawMoney } from "../../api/users";
import CanchasClubLoader from "../../components/Loader";
import { EditUser } from "../../types/users";
import { set } from "date-fns";
import { LineWave } from "react-loader-spinner";
import BookingCard from "../../components/BookingCard";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useScreenSize from "../../customHooks/screenSize";

const Home = () => {
  const { user } = useAuth();
  useEffect(() => {
    // Recargar para evitar errores en el inicio de sesión
    if (sessionStorage.getItem("dashboardFirstLoad") === "true") return;
    window.location.reload();
    sessionStorage.setItem("dashboardFirstLoad", "true");
  }, []);

  const [isPremium, setIsPremium] = useState(false);
  const [userStats, setUserStats] = useState({
    reservationsInProgress: 0,
    reservationsCanceled: 0,
    reservationsCompleted: 0,
    nextBookings: [],
  });
  const [loadingUserStats, setLoadingUserStats] = useState(false);

  const parseUsersStats = (stats: any) => {
    setUserStats({
      reservationsInProgress: stats.bookingStats.filter((stat: any) => stat.status === "approved - accredited").length > 0 ? stats.bookingStats.filter((stat: any) => stat.status === "approved - accredited")[0].count : 0,
      reservationsCanceled: stats.bookingStats.filter((stat: any) => stat.status === "canceled").length > 0 ? stats.bookingStats.filter((stat: any) => stat.status === "canceled")[0].count : 0,
      reservationsCompleted: stats.bookingStats.filter((stat: any) => stat.status === "completed").length > 0 ? stats.bookingStats.filter((stat: any) => stat.status === "completed")[0].count : 0,
      nextBookings: stats.nextBookings,
    });
  }

  const checkPremium = async () => {
    setLoadingUserStats(true);
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
    const userStats = await getUserStats();
    parseUsersStats(userStats);
    setLoadingUserStats(false);
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

  const screenWidth = useScreenSize().width;
  const nextBookingsSliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: screenWidth < 900 ? 1 : screenWidth < 1200 ? 2 : 3,
    slidesToScroll: 1,
    className: "center",
  };

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
        gap={2}
      >
        <Paper elevation={3} sx={{
          padding: 2, textAlign: "center", flex: 1, width: {
            xs: "100%",
            sm: "auto"
          },
          backgroundColor: 'white',
          height: '170px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Typography variant="h2">Reservas en Curso</Typography>
          <Typography variant="h1" sx={{ marginTop: { sm: loadingUserStats ? 0 : '40px', xs: loadingUserStats ? 0 : '15px' } }}>{
            loadingUserStats ?
              <LineWave
                height="100"
                width="100"
                color="#32d9cb"
                ariaLabel="line-wave"
                wrapperStyle={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBotton: '10px'
                }}
                visible={true}
              /> :
              userStats.reservationsInProgress
          }</Typography>
        </Paper>

        {isPremium && (
          <Paper elevation={3} sx={{
            padding: 2, textAlign: "center", flex: 1, width: {
              xs: "100%",
              sm: "auto"
            },
            backgroundColor: 'white',
            height: '170px',
          }}>
            <Typography variant="h2">Dinero Disponible</Typography>
            <Typography variant="h1">
              ${(
                (formData.bankAccount?.availableMoney ?? 0) -
                (formData.bankAccount?.withdrawProcessingMoney ?? 0)
              )}
            </Typography>
            {formData.bankAccount?.withdrawProcessingMoney > 0 && (
              <Typography variant="body1" color="info" sx={{
                textAlign: 'center',
                fontSize: '12px',
                marginTop: '10px',
                marginBottom: '10px'
              }}>
                *Hay un retiro de dinero en proceso por ${formData.bankAccount?.withdrawProcessingMoney}
              </Typography>
            )}
            <Button variant="outlined" color="primary" onClick={() => setIsOpen(true)} sx={{ marginTop: '5px' }}>
              Retirar
            </Button>
          </Paper>
        )}

        <Paper elevation={3} sx={{
          padding: 2, textAlign: "center", flex: 1, width: { xs: "100%", sm: "auto" }, backgroundColor: 'white', height: '170px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Typography variant="h2" sx={{ marginBottom: { sm: '30px', xs: '10px' }, marginTop: { xs: '10px' } }}>Reservas Totales</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={6}>
              <Typography variant="h3">Canceladas</Typography>
              <Typography variant="h1">{
                loadingUserStats ?
                  <LineWave
                    height="100"
                    width="100"
                    color="#32d9cb"
                    ariaLabel="line-wave"
                    wrapperStyle={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    visible={true}
                  /> :
                  userStats.reservationsCanceled
              }</Typography>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Typography variant="h3">Concretadas</Typography>
              <Typography variant="h1">{
                loadingUserStats ?
                  <LineWave
                    height="100"
                    width="100"
                    color="#32d9cb"
                    ariaLabel="line-wave"
                    wrapperStyle={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    visible={true}
                  /> :
                  userStats.reservationsCompleted
              }</Typography>
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
              <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
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

      <Box display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        padding={2}
        flexDirection={{ xs: "column", sm: "row" }}>
        <Paper elevation={3} sx={{
          padding: 2, textAlign: "center", width: {
            xs: "100%",
            sm: "100%"
          },
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Typography variant="h2" sx={{ marginBottom: '15px' }}>Próximos eventos</Typography>
          {
            loadingUserStats ?
              <LineWave
                height="100"
                width="100"
                color="#32d9cb"
                ariaLabel="line-wave"
                wrapperStyle={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBotton: '10px'
                }}
                visible={true}
              /> :
              userStats.nextBookings?.length > 0 ? (
                <Box sx={{ padding: 1, marginBottom: 2 }}>
                  <Slider {...nextBookingsSliderSettings} >
                    {userStats.nextBookings.map((booking) => <Box> <BookingCard booking={booking} /> </Box>)}
                  </Slider>
                </Box>
              )
                :
                <Typography variant="h4" color="primary">
                  No hay turnos reservados
                </Typography>
          }
        </Paper>
      </Box>

      <Snackbar open={snackBarOpen} autoHideDuration={5000} onClick={handelSnackClose} onClose={handelSnackClose}>
        <Alert severity={snackBarSeverity as AlertColor} sx={{ width: '100%', fontSize: '15px' }} onClose={handelSnackClose}>
          {snackBarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Home;
