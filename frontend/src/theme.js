import { createTheme } from "@mui/material/styles";

// const theme = createTheme({
//   typography: {
//     fontFamily: "Lato"
//   },
//   palette: {
//     primary: {
//       light: "#484848",
//       main: "#212121",
//       dark: "#000000",
//       contrastText: "#ffffff",
//     },
//   },
// });

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    // primary: "#212121",
    background: {
      default: "black",
      paper: "#212121",
    },
    text: {
      primary: '#fff',
      secondary: "grey",
    }
  }
});

export default darkTheme;