import { Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitch = () => {
  const { i18n } = useTranslation();
  return (
    <Typography
      sx={{
        cursor: "pointer",
        fontSize: "20px",
        fontWeight: "700",
        color: "secondary.main",
      }}
      onClick={() => {
        if (i18n.language === "ar") {
          i18n.changeLanguage("en");
        } else {
          i18n.changeLanguage("ar");
        }
      }}
    >
      {i18n.language === "ar" ? "En" : "AR"}
    </Typography>
  );
};

export default LanguageSwitch;
