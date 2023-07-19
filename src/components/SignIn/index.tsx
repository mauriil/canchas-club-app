import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { NavLink } from "react-router-dom";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
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

export default function SignIn() {
  const [role, setRole] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      email: data.get("email"),
      password: data.get("password"),
      role: data.get("role"),
      name: data.get("name"),
    };
    console.log(user);

    const response = await fetch(`http://localhost:3000/auth/signUp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    console.log(response);
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
          backgroundColor: "#edebc9",
          boxShadow: "0px 0px 25px 1px rgb(0,0,0)",
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.dark" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name and lastname"
            name="name"
            autoComplete="name"
            autoFocus
            sx={{ background: "transparent" }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="phoneNumber"
            label="Phone Number"
            name="phoneNumber"
            autoComplete="phoneNumber"
            autoFocus
            sx={{ background: "transparent" }}
          />
          <Select
            color="primary"
            labelId="roleLabel"
            id="role"
            name="role"
            value={role}
            label="Role"
            onChange={handleChange}
          >
            <MenuItem value={"owner"}>Owner</MenuItem>
            <MenuItem value={"client"}>Client</MenuItem>
          </Select>
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
