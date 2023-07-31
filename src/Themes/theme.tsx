import { createTheme } from "@mui/material";
import { light } from "@mui/material/styles/createPalette";

export const theme = createTheme({
  palette: {
    background: {
      default: "#F5F5F5",
    },
    text: {
      primary: "#283739",
    },
    action: {
      active: "#000000",
      focus: "#000000",
      hover: "#000000",
      selected: "#000000",
      disabled: "#000000",
    },
    primary: {
      main: "#228896",
    },
    secondary: {
      main: "#A9C52F",
    }
  },
  components: {
    MuiButton: {
        variants: [
          {
            props: { color: "primary" },
            style: {
              backgroundColor: "#228896",
              color: "black",
              borderRadius: `15px`,
              fontSize: "1.2rem",
              ":hover": {
                backgroundColor: "#228896",
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
