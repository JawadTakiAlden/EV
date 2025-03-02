import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import { adminMenuItems } from "../../menu-items";

const AdminLayout = () => {
  return (
    <Box>
      <DashboardLayout sidebarItems={adminMenuItems}>
        <Outlet />
      </DashboardLayout>
    </Box>
  );
};

export default AdminLayout;
