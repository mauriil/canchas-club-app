/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
import { useForm } from "react-hook-form";
import { useAuth } from "../../customHooks/useAuth";
import { useEffect, useState } from "react";
import { User } from "../../types/users";
import { ThreeDots } from "react-loader-spinner";
import { Alert, AlertColor, Snackbar } from "@mui/material";

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

export default function SignIn() {
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
  const { signUp, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    setLoading(true);
    const registerResponse = await signUp(values as User);
    setLoading(false);
    if (!registerResponse.status) {
      setSnackBarMessage(registerResponse.errors[0]);
      setSnackBarSeverity("error");
      setSnackBarOpen(true);
    }

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
        sx={{
          padding: { xs: "1rem", md: "2rem" },
          marginTop: "0px",
          backgroundColor: "background.default",
          boxShadow: "0px 0px 25px 1px rgb(0,0,0)",
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minWidth: "340px",
        }}
        width={"100%"}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registro
        </Typography>

        {loading ? (
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#9dbfaf"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass="spinner-wrapper"
          />
        ) : (
          <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={onSubmit} width={"100%"}>
            <TextField
              type="text"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nombre completo"
              autoComplete="name"
              autoFocus
              sx={{ background: "transparent", minWidth: "340px" }}
              {...register("name", { required: true })}
            />
            {errors.name && (
              <Typography color="red"> El nombre es requerido </Typography>
            )}
            <TextField
              type="tel"
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Teléfono"
              autoComplete="phone"
              autoFocus
              sx={{ background: "transparent" }}
              {...register("phone", { required: true })}
            />
            {errors.phone && (
              <Typography color="red"> El teléfono es requerido </Typography>
            )}
            <TextField
              required
              type="email"
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              autoComplete="email"
              autoFocus
              sx={{ background: "transparent" }}
              {...register("email", {
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              })}
            />
            {errors.email && (
              <Typography color="red"> El email es requerido </Typography>
            )}
            <TextField
              margin="normal"
              type="password"
              required
              fullWidth
              id="password"
              label="Contraseña"
              autoComplete="current-password"
              {...register("password", { required: true, minLength: 6 })}
            />
            {errors.password && (
              <Typography color="red"> La contraseña es requerida </Typography>
            )}
            <Button
              color="primary"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 0, mb: 1 }}
            >
              Registrarme
            </Button>
            <Grid container sx={{ mt: 1, mb: 0 }}>
              <Grid item xs>
                <NavLink to={"/index/logIn"}>Ya tengo una cuenta</NavLink>
              </Grid>
            </Grid>
          </Box>
        )}

        <Snackbar open={snackBarOpen} autoHideDuration={5000} onClick={handelSnackClose} onClose={handelSnackClose}>
          <Alert severity={snackBarSeverity as AlertColor} sx={{ width: '100%', fontSize: '15px' }} onClose={handelSnackClose}>
            {snackBarMessage}
          </Alert>
        </Snackbar>

        <Copyright sx={{ mt: 4, mb: 3 }} />
      </Box>
    </Container>
  );
}
