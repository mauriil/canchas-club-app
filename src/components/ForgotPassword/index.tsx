/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../customHooks/useAuth";
import { ForgotPasswordRequestBody } from "../../types/users";
import { Alert, AlertColor, Snackbar } from "@mui/material";
import CanchasClubLoader from "../Loader";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://canchas.club/">
        canchas.club
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function ForgotPassword() {
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarSeverity, setSnackBarSeverity] = useState("success");
  const handelSnackClose = () => {
    setSnackBarOpen(false);
  }

  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { forgotPassword, isAuthenticated, errors: authErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(false);
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    setLoading(true);
    await forgotPassword(values as ForgotPasswordRequestBody);
    setSnackBarMessage("Se ha enviado un correo con las instrucciones para recuperar la contraseña");
    setSnackBarSeverity("success");
    setSnackBarOpen(true);
    setTimeout(() => {
      navigate("/index/login");
    }, 3000);
  });

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        marginBottom: { xs: "2rem" },
      }}
    >
      <Box
        padding="2rem"
        sx={{
          marginTop: "0px",
          backgroundColor: "background.default",
          boxShadow: "0px 0px 25px 1px rgb(0,0,0)",
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minWidth: "400px"
        }}
        width={"100%"}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Recupero de contraseña
        </Typography>

        {loading ? (
          <CanchasClubLoader width="50%" />
        ) : (
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }} width={"100%"}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              autoComplete="email"
              autoFocus
              type="email"
              sx={{ background: "transparent" }}
              error={errors.email ? true : false}
              {...register("email", { required: true })}
            />
            {errors.email && (
              <Typography color="red"> El email es requerido </Typography>
            )}
            <Button
              color="primary"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 0, mb: 1 }}
            >
              Recuperar
            </Button>
            <Grid container sx={{ mt: 1, mb: 0 }}>
              <Grid item xs>
                <NavLink to={"/index/login"}>Volver a login</NavLink>
              </Grid>
            </Grid>
          </Box>
        )}
        <Copyright sx={{ mt: 4, mb: 3 }} />
      </Box>
      <Snackbar open={snackBarOpen} autoHideDuration={5000} onClick={handelSnackClose} onClose={handelSnackClose}>
        <Alert severity={snackBarSeverity as AlertColor} sx={{ width: '100%', fontSize: '15px' }} onClose={handelSnackClose}>
          {snackBarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

