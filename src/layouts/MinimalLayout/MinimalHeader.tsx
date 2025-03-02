import { Box, BoxProps } from "@mui/material";
import React from "react";
import Logo from "../../components/Logo";

const MinimalHeader = ({ ...props }: BoxProps) => {
  props.sx = {
    width: "100%",
    height: "70px",
    display: "flex",
    alignItems: "center",
    mx: "auto",
    justifyContent: "space-between",
    px: 4,
    ...props.sx,
  };
  return (
    <Box {...props}>
      <Logo
        sx={{ flexDirection: "row", zIndex: "3" }}
        logoWidth="30px"
        textLogowidth="100px"
      />
    </Box>
  );
};

export default MinimalHeader;
