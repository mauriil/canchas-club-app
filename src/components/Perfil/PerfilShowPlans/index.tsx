import SubscriptionPriceCard from "../../SubscriptionPriceCard";
import {
  Alert,
  AlertColor,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useState } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CanchasClubLoader from "../../Loader";
import { updateUser } from "../../../api/users";

interface PerfiilShowPlansProps {
  onItemClick: (option: string) => void;
}

const PerfiilShowPlans = ({ onItemClick }: PerfiilShowPlansProps) => {
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarSeverity, setSnackBarSeverity] = useState("success");
  const handelSnackClose = () => {
    setSnackBarOpen(false);
  };

  const buySubscription = async () => {
    setLoading(false);
    const activatePremium = await updateUser({
      plan: {
        type: "premium3",
        status: "active",
      }
    })
    if (activatePremium.statusCode >= 400) {
      setSnackBarMessage(activatePremium.message);
      setSnackBarSeverity('error');
      setSnackBarOpen(true);
      return;
    }
    setSnackBarMessage("¡Panel dueño de club desbloqueado!");
    setSnackBarSeverity("success");
    setSnackBarOpen(true);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    window.location.reload();
  };
  const servicios = [
    {
      id: "premium3",
      icono: "Avanzado",
      nombre: "Dueño de club",
      items: [
        "Gestiona todas tus canchas desde una única plataforma de manera eficiente.",
        "Añade, edita y actualiza la información de tus instalaciones con facilidad.",
        "Utiliza herramientas avanzadas para promocionar tus canchas y llegar a un público más amplio.",
        "Optimiza tus horarios y maximiza la ocupación con nuestras funciones inteligentes.",
        "Aumenta tu visibilidad frente a posibles clientes.",
        "Destaca entre la competencia con una presencia premium en la plataforma.",
        "Recibe asesoramiento personalizado para impulsar tu negocio.",
        "Accede a orientación estratégica para mejorar tus operaciones y atraer a más clientes.",
        "Sin tarifas mensuales recurrentes.",
        "Realiza un único pago y disfruta de todas las ventajas de la suscripción premium.",
      ],
      precio: import.meta.env.VITE_PREMIUM_PASS_PRICE,
    },
  ];

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="auto"
      width="100%"
      borderRadius="15px"
      sx={{
        backgroundColor: { md: "background.paper" },
        boxShadow: { md: "0px 0px 25px 1px rgb(0,0,0)" },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#F5F5F5",
          borderBottom: "1px solid #E0E0E0",
          width: "100%",
          padding: "1rem",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
        }}
      >
        <IconButton onClick={() => onItemClick("menu")}>
          <ArrowBack />
        </IconButton>
      </Box>

      {loading ? (
        <CanchasClubLoader width="80%" />
      ) : (
        <Box
          sx={{
            padding: "1rem",
            margin: 1,
          }}
        >

          {loading ? (
            <CanchasClubLoader width="80%" />
          ) : (
            <Box
              sx={{
                paddingBottom: "10rem",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid2 container spacing={2}>
                {servicios.map((servicio) => (
                  <Grid2 xs={12} sm={4} key={servicio.id}>
                    <SubscriptionPriceCard
                      id={servicio.id}
                      icon={servicio.icono}
                      title={servicio.nombre}
                      items={servicio.items}
                      price={servicio.precio}
                      onSubscribeResolve={(buyStatus) => {
                        buySubscription();
                      }}
                    />
                  </Grid2>
                ))}
              </Grid2>
            </Box>
          )}
        </Box>
      )}

      <Box>
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>¡Pago exitoso!</DialogTitle>
          <DialogContent>
            <p>
              Tu pedido se ha realizado con éxito. Disfruta los beneficios que te ofece Canchas Club para dueños de clubes.
            </p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>

      <Snackbar
        open={snackBarOpen}
        autoHideDuration={5000}
        onClick={handelSnackClose}
        onClose={handelSnackClose}
      >
        <Alert
          severity={snackBarSeverity as AlertColor}
          sx={{ width: "100%", fontSize: "15px" }}
          onClose={handelSnackClose}
        >
          {snackBarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PerfiilShowPlans;
