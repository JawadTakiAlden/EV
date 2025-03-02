import { Box } from "@mui/material";
import React from "react";
import Logo from "../Logo";

const SidebarHeader = () => {
  return (
    <Box
      sx={{
        height: "70px",
        display: "flex",
        alignItems: "center",
        pl: 1,
      }}
    >
      <Logo logoWidth="30px" sx={{ flexDirection: "row", gap: "10px" }} />
    </Box>
  );
};

export default SidebarHeader;
