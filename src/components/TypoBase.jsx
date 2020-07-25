import React from "react";
import { ThemeBase } from "../Theme";
import { Typography, ThemeProvider } from "@material-ui/core";

export default function TypoBase(props) {
  return (
    <ThemeProvider theme={ThemeBase}>
      <Typography {...props}>{props.children}</Typography>
    </ThemeProvider>
  )
};