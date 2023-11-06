import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Title from "../../components/Title";
import { useAuth } from "../../customHooks/useAuth";
import { getPlanStatus } from "../../api/users";

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
  };
  useEffect(() => {
    void checkPremium();
  }, []);

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
            <Typography variant="h4">$1000</Typography>
            <Button variant="outlined" color="primary">
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
    </>
  );
};

export default Home;
