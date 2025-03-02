import { alpha, Typography, TypographyProps } from "@mui/material";
import React, { ReactNode } from "react";

const DeleteTypography = ({
  color = "error",
  children,
  ...typographyProps
}: TypographyProps & {
  children: ReactNode | ReactNode[];
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
}) => {
  typographyProps.variant = typographyProps.variant || "h3";
  typographyProps.sx = {
    textTransform: "capitalize",
    borderLeftWidth: "3px",
    borderLeftStyle: "solid",
    borderLeftColor: (theme) => alpha(theme.palette[color].main, 0.3),
    pl: 2,
    ...typographyProps.sx,
  };

  return <Typography {...typographyProps}>{children}</Typography>;
};

export default DeleteTypography;
