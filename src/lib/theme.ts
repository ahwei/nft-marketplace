import { createTheme, ThemeOptions } from "@mui/material/styles";
import { blue, purple, grey, blueGrey, deepPurple } from "@mui/material/colors";

export const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: "'Titillium Web', sans-serif",
  },

  palette: {
    primary: {
      main: deepPurple[500],
    },
    secondary: {
      main: "#FECB0F",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: 8,
        },
      },
    },
  },
};

export const theme = createTheme(themeOptions);
