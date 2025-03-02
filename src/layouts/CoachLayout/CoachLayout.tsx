import React from "react";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import { Outlet } from "react-router";
import { Box } from "@mui/material";
import { coacheMenuItems } from "../../menu-items";

const CoachLayout = () => {
  return (
    <Box>
      <DashboardLayout sidebarItems={coacheMenuItems}>
        <Outlet />
      </DashboardLayout>
    </Box>
  );
};

export default CoachLayout;
