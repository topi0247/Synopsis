"use client";

import { Theme, createTheme } from "@mui/material";
import { useEffect, useState } from "react";

export default function useTheme() {
  const [theme, setTheme] = useState<Theme>();

  useEffect(() => {
    const muiTheme = createTheme({
      palette: {
        primary: {
          main: "#4ADE80",
        },
        secondary: {
          main: "#FF0000",
        },
      },
    });

    setTheme(muiTheme);
  }, []);

  return theme;
}
