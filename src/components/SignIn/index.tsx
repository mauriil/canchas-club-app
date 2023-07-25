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
import { User } from "../../contexts/userContext";
import { useEffect } from "react";

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

  const onSubmit = handleSubmit((values) => {
    signUp(values as User);
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
      }}
    >
      <Box
        padding="2rem"
        sx={{
          marginTop: "0px",
          backgroundColor: "#edebc9",
          boxShadow: "0px 0px 25px 1px rgb(0,0,0)",
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minWidth: "340px",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.dark" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={onSubmit}>
          <TextField
            type="text"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name and lastname"
            autoComplete="name"
            autoFocus
            sx={{ background: "transparent", minWidth: "340px" }}
            {...register("name", { required: true })}
          />
          {errors.name && (
            <Typography color="red"> Name is required </Typography>
          )}
          <TextField
            type="tel"
            margin="normal"
            required
            fullWidth
            id="phoneNumber"
            label="Phone Number"
            autoComplete="phoneNumber"
            autoFocus
            sx={{ background: "transparent" }}
            {...register("phoneNumber", { required: true })}
          />
          {errors.phoneNumber && (
            <Typography color="red"> Phone Number is required </Typography>
          )}
          <TextField
            required
            type="email"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            sx={{ background: "transparent" }}
            {...register("email", {
              required: true,
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            })}
          />
          {errors.email && (
            <Typography color="red"> Email is required </Typography>
          )}
          <TextField
            margin="normal"
            type="password"
            required
            fullWidth
            id="password"
            label="Password"
            autoComplete="current-password"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password && (
            <Typography color="red"> Password is required </Typography>
          )}
          <Button
            color="primary"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 0, mb: 1 }}
          >
            SignIn
          </Button>
          <Grid container sx={{ mt: 1, mb: 0 }}>
            <Grid item xs>
              <NavLink to={"/index/logIn"}>Do you have an account?</NavLink>
            </Grid>
          </Grid>
        </Box>
        <Copyright sx={{ mt: 4, mb: 3 }} />
      </Box>
    </Container>
  );
}
