import { createMuiTheme } from "@material-ui/core";

export const ThemeBase = createMuiTheme({
  palette: {
    primary: {
      light: "#8248ff",
      main: "#3f10e5",
      dark: "#0000b1",
      contrastText: "#fff",
    },
    secondary: {
      light:    "#ffffff",
      main:     "#f9f9f9",
      dark:     "#c6c6c6",
      contrastText: "#000",
    },
  }
});