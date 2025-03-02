import {
  Card,
  CardContent,
  CardContentProps,
  CardHeader,
  CardHeaderProps,
  CardProps,
  Typography,
} from "@mui/material";
import React, { ReactNode } from "react";

interface MainCardProps {
  border?: boolean;
  cardTitle?: string;
  darkTitle?: boolean;
  cardHeaderProps?: CardHeaderProps;
  cardContent?: boolean;
  contentProps?: CardContentProps;
}

const MainCard = ({
  border = true,
  children,
  cardTitle,
  darkTitle = false,
  cardHeaderProps,
  cardContent = true,
  contentProps,
  ...cardProps
}: { children: ReactNode | ReactNode[] } & MainCardProps & CardProps) => {
  cardProps.sx = {
    p: "16px",
    border: border ? "1px solid" : "none",
    borderRadius: 2,
    borderColor: (theme) =>
      theme.palette.mode === "dark"
        ? theme.palette.divider
        : theme.palette.grey.A200,

    "& pre": {
      m: 0,
      p: "16px !important",
      fontFamily: (theme) => theme.typography.fontFamily,
      fontSize: "0.75rem",
    },
    ...cardProps.sx,
  };
  return (
    <Card elevation={0} {...cardProps}>
      {!darkTitle && cardTitle && (
        <CardHeader
          titleTypographyProps={{ variant: "subtitle1" }}
          title={cardTitle}
          {...cardHeaderProps}
        />
      )}
      {darkTitle && cardTitle && (
        <CardHeader
          title={<Typography variant="h3">{cardTitle}</Typography>}
          {...cardHeaderProps}
        />
      )}
      {cardContent && <CardContent {...contentProps}>{children}</CardContent>}
      {!cardContent && children}
    </Card>
  );
};

export default MainCard;
