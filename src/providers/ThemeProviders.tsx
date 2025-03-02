import {
  ThemeProvider as BaseThemeProvider,
  CssBaseline,
  GlobalStyles,
  StyledEngineProvider,
} from "@mui/material";
import { theme } from "../themes";
import { ReactNode, useEffect, useState } from "react";
import { useTheme } from "../store/themeStore";
import { useTranslation } from "react-i18next";
import { setLocale } from "yup";
import {ar , en} from "yup-locales"




export interface BaseProviderInterface {
  children?: ReactNode | ReactNode[];
}

const ThemeProvider = ({ children }: BaseProviderInterface) => {
  const { mode } = useTheme((state) => state);
  const [dir , setDir] = useState<"ltr" | "rtl">("ltr")
  const {i18n} = useTranslation()

  
  useEffect(() => {
    if(i18n.language === "ar"){
      setDir("rtl")
      setLocale( ar )
      document.documentElement.setAttribute('dir', 'rtl');
    }else{
      setDir("ltr")
      setLocale( en )
      document.documentElement.setAttribute('dir', 'ltr');
    }
  }, [i18n.language])
  const appTheme = theme({ mode , dir});
  return (
    <StyledEngineProvider injectFirst>
      <BaseThemeProvider theme={appTheme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            ":fullscreen": {
              backgroundColor: appTheme.palette.background.default,
            },
            "*::-webkit-scrollbar": {
              width: "5px", // Width of the scrollbar
              height: "10px", // Height of the scrollbar for horizontal scrolling
            },
            "*::-webkit-scrollbar-track": {
              backgroundColor: "#f0f0f0", // Track color
              borderRadius: "10px",
            },
            "*::-webkit-scrollbar-thumb": {
              backgroundColor: "#888", // Scrollbar thumb color
              borderRadius: "10px",
              border: "2px solid #f0f0f0", // Optional: Add space around thumb
            },
            "*::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#555", // Scrollbar thumb hover color
            },
          }}
        />
        {children}
      </BaseThemeProvider>
    </StyledEngineProvider>
  );
};

export default ThemeProvider;
