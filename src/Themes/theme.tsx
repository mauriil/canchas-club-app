import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    background: {
      default: "#F5F5F5",
      paper: "#f7f3f0",
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
            backgroundColor: "#00a6c0",
            color: "black",
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
            backgroundColor: "#A9C52F",
            color: "black",
            borderRadius: `15px`,
            fontSize: "1.2rem",
            ":hover": {
              backgroundColor: "#A9C52F",
              boxShadow: "0px 0px 25px 1px rgb(0,0,0)",
            },
          },
        },
      ],
    },
  },
  typography: {},
});
