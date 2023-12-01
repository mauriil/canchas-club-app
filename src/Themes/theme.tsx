import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    background: {
      default: "#F5F5F5",
      paper: "#ebedf0",
    },
    text: {
      primary: "#283739",
    },
    action: {
      active: "#000000",
      focus: "#000000",
      hover: "grey",
      selected: "#000000",
      disabled: "#000000",
    },
    primary: {
      main: "#00a6c0",
      dark: "#283739",
      light: "#6a888c",
    },
    secondary: {
      main: "#32d9cb",
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { color: "primary" },
          style: {
            color: "white",
            borderRadius: `15px`,
            fontSize: "1.2rem",
            ":hover": {
              backgroundColor: "#00a6c0",
              boxShadow: "0px 0px 25px 1px rgb(0,0,0)",
              color: "#ffffff",
            },
          },
        },
        {
          props: { color: "secondary", variant: "outlined" },
          style: {
            color: "black",
            borderRadius: `15px`,
            borderColor: "#A9C52F",
            fontSize: "1.2rem",
            ":hover": {
              backgroundColor: "#A9C52F",
              borderColor: "#A9C52F",
              boxShadow: "0px 0px 25px 1px rgb(0,0,0)",
            },
          },
        },
        {
          props: { color: "warning" },
          style: {
            color: "black",
            borderRadius: `15px`,
            fontSize: "1.2rem",
            ":hover": {
              backgroundColor: "#ff9800",
              boxShadow: "0px 0px 25px 1px rgb(0,0,0)",
            },
          },
        },
        {
          props: { color: "error" },
          style: {
            color: "black",
            borderRadius: `15px`,
            borderColor: "#f44336",
            fontSize: "1.2rem",
            ":hover": {
              backgroundColor: "#f44336",
              borderColor: "#f44336",
              boxShadow: "0px 0px 25px 1px rgb(0,0,0)",
              color: "#ffffff",
            },
          },
        },
        {
          props: { color: "success" },
          style: {
            backgroundColor: "#4caf50",
            color: "white",
            borderRadius: `15px`,
            fontSize: "1.2rem",
            ":hover": {
              backgroundColor: "#4caf50",
              boxShadow: "0px 0px 25px 1px rgb(0,0,0)",
            },
          },
        },
        {
          props: { color: "success", variant: "outlined" },
          style: {
            color: "black",
            borderRadius: `15px`,
            borderColor: "#4caf50",
            fontSize: "1.2rem",
            ":hover": {
              backgroundColor: "#4caf50",
              borderColor: "#4caf50",
              boxShadow: "0px 0px 25px 1px rgb(0,0,0)",
              color: "#ffffff",
            },
          },
        },
        {
          props: { color: "info" },
          style: {
            backgroundColor: "#2196f3",
            color: "black",
            borderRadius: `15px`,
            fontSize: "1.2rem",
            ":hover": {
              backgroundColor: "#2196f3",
              boxShadow: "0px 0px 25px 1px rgb(0,0,0)",
            },
          },
        },
      ],
    },
  },
  typography: {
    // fontFamily: "Roboto",
    h1: {
      fontSize: "3rem",
      fontWeight: "bold",
      color: "#283739",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#283739",
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#283739",
    },
    h4: {
      fontSize: "1.2rem",
      fontWeight: "bold",
      color: "#283739",
    },
    h5: {
      fontSize: "1rem",
      fontWeight: "bold",
      color: "#283739",
    },
    h6: {
      fontSize: "0.8rem",
      fontWeight: "bold",
      color: "#283739",
    },
    subtitle1: {
      fontSize: "1.2rem",
      color: "#283739",
    },
    subtitle2: {
      fontSize: "1rem",
      color: "#283739",
    },
    body1: {
      fontSize: "1.2rem",
      color: "#283739",
    },
    body2: {
      fontSize: "1rem",
      color: "#283739",
    },
    button: {
      fontSize: "1.2rem",
      fontWeight: "bold",
      color: "#283739",
    },
  },
});
