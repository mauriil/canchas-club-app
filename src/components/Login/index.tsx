import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { NavLink } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { ThreeDots } from "react-loader-spinner"
import { useState } from "react";

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

export default function LogIn() {
  const [loading, setLoading] = useState(false);
  interface LoginResponse {
    access_token: string;
    statusCode: number;
  }
  interface DecodedToken {
    username: string;
    sub: string;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      email: data.get("email"),
      password: data.get("password"),
    };
    
    const response = await fetch(`http://localhost:3000/auth/signIn`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    
    void response.json().then((data: LoginResponse) => {
      setLoading(false);
      if (data.statusCode === 400) {
        alert("Usuario o contraseña incorrectos");
        return;
      } else {
        const decoded: DecodedToken = jwt_decode(data.access_token);
        localStorage.setItem("userToken", data.access_token);
        localStorage.setItem("userName", decoded.username);
        localStorage.setItem("userId", decoded.sub);
        window.location.href = "/dashboard";        
      }
    });

  };

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
          backgroundColor: "background.default",
          boxShadow: "0px 0px 25px 1px rgb(0,0,0)",
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>

        {loading ?
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#9dbfaf"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass="spinner-wrapper"
          />
          :
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              sx={{ background: "transparent" }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              autoComplete="current-password"
              type="password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              color="primary"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 0, mb: 1 }}
            >
              LogIn
            </Button>
            <NavLink to={"/index/signIn"}>
              <Button
                color="primary"
                type="button"
                fullWidth
                variant="outlined"
                sx={{ mt: 1, mb: 0 }}
              >
                Sign In
              </Button>
            </NavLink>
            <Grid container sx={{ mt: 1, mb: 0 }}>
              <Grid item xs>
                <NavLink to={"/index/forgotPassword"}>Forgot password?</NavLink>
              </Grid>
            </Grid>
          </Box>
        }
        <Copyright sx={{ mt: 4, mb: 3 }} />
      </Box>
    </Container>
  );
}
