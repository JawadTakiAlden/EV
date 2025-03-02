import { Box } from "@mui/material";
import React, { lazy } from "react";
import { useGetMealOrders } from "../../../api/meal-orders";
import Loadable from "../../../components/Loadable";
import { orderColumns } from "../../../tables-def/orders";

const TableComponent = Loadable(
  lazy(() => import("../../../components/Table"))
);

const OrderOfDay = () => {
  const orders = useGetMealOrders();
  return (
    <Box>
      <TableComponent
        state={{
          isLoading: orders.isLoading,
        }}
        columns={orderColumns}
        data={orders.data?.data || []}
      />
    </Box>
  );
};

export default OrderOfDay;
