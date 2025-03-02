import { Icon } from "@mui/material";
import React from "react";
import { GiBrassEye } from "react-icons/gi";

const EyeIcon = ({ show }: { show?: boolean }) => {
  return (
    <Icon color="primary">
      <GiBrassEye
        style={{
          transform: `rotate(${show ? "130deg" : "0"})`,
          transformOrigin: "center center",
          transition: "0.3s",
        }}
      />
    </Icon>
  );
};

export default EyeIcon;
