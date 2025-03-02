import { alpha, Typography, TypographyProps } from "@mui/material";
import React from "react";

const UnderlineHeader = ({ children, ...typographyProps }: TypographyProps) => {
  typographyProps = {
    sx: {
      mb: 2,
      py: 1,
      position: "relative",
      width: "fit-content",
      "::after": {
        content: "''",
        position: "absolute",
        width: "30%",
        left: "5px",
        height: "4px",
        borderRadius: "4px",
        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.2),
        bottom: 0,
      },
      ...typographyProps.sx,
    },
    variant: typographyProps.variant || "h4",
  };
  return <Typography {...typographyProps}>{children}</Typography>;
};

export default UnderlineHeader;
