import { Box } from "@mui/material";
import React from "react";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import { Outlet } from "react-router";
import { kitchenItems } from "../../menu-items";

const KitchenLayout = () => {
  return (
    <Box>
      <DashboardLayout sidebarItems={kitchenItems}>
        <Outlet />
      </DashboardLayout>
    </Box>
  );
};

export default KitchenLayout;
