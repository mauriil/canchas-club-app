import { createTheme } from "@mui/material";
import { light } from "@mui/material/styles/createPalette";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#00ccbe",
      dark: "#09a6a3",
      light: "#9dbfaf",
    },
    secondary: {
      main: "#edebc9",
      dark: "#9dbfaf",
      light: "#fcf9d8",
    },
  },
  components: {
    MuiButton: {
      //   variants: [
      //     {
      //       props: { color: "primary" },
      //       style: {
      //         backgroundColor: "#F7F0CA",
      //         color: "black",
      //         borderRadius: `15px`,
      //         fontFamily: '"Amatic SC", cursive',
      //         ":hover": {
      //           backgroundColor: "#f19ccc",
      //           boxShadow: "0px 0px 25px 1px rgb(0,0,0)",
      //           color: "#F7F0CA",
      //         },
      //       },
      //     },
      //     {
      //       props: { color: "primary", variant: "outlined" },
      //       style: {
      //         backgroundColor: "#F7F0CA",
      //         color: "black",
      //         borderRadius: `15px`,
      //         fontFamily: '"Amatic SC", cursive',
      //         ":hover": {
      //           backgroundColor: "#F7F0CA",
      //           boxShadow: "0px 0px 25px 1px rgb(0,0,0)",
      //         },
      //       },
      //     },
      //   ],
    },
  },
  typography: {},
});
