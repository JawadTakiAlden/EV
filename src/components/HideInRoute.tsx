import { Box, IconButton, Tooltip } from "@mui/material";
import React, { ReactNode } from "react";
import { FaBackward } from "react-icons/fa";
import { useLocation, useNavigate, To } from "react-router-dom";

interface HideInRouteProps {
  children: ReactNode;
  excludedRoutes?: string[];
}

const HideInRoute: React.FC<HideInRouteProps> = ({
  children,
  excludedRoutes = [],
}) => {
  const location = useLocation();

  if (excludedRoutes.includes(location.pathname)) {
    return undefined;
  }

  return <>{children}</>;
};

export default HideInRoute;
