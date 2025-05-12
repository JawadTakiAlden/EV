import { Box, Stack } from "@mui/material";
import React, { lazy } from "react";
import { useGetMealOrders } from "../../../api/meal-orders";
import Loadable from "../../../components/Loadable";
import { orderColumns } from "../../../tables-def/orders";
import { LoadingButton } from "@mui/lab";
import {
  useMarkAllOrdersAsDone,
  usePrintMealOrdersInformationToPDF,
} from "../../../api/meal-orders/printMealOrdersINformation";
import { useSearchParams } from "react-router-dom";
import { FaFilePdf } from "react-icons/fa6";

const TableComponent = Loadable(
  lazy(() => import("../../../components/Table"))
);

const OrderOfDay = () => {
  const orders = useGetMealOrders();
  const [searchParams] = useSearchParams();
  const orderSummaryDownload = usePrintMealOrdersInformationToPDF();
  const markAllOrdersAsDone = useMarkAllOrdersAsDone();
  const date = searchParams.get("date");
  return (
    <Box>
      <Stack direction={"row"} gap={2} alignItems={"center"}>
        <LoadingButton
          variant="contained"
          color="secondary"
          onClick={() => {
            orderSummaryDownload.mutate(date);
          }}
          endIcon={<FaFilePdf />}
        >
          Download Order Summary
        </LoadingButton>
        <LoadingButton
          variant="contained"
          onClick={() => {
            markAllOrdersAsDone.mutate(date);
          }}
        >
          Mark All Orders As Done
        </LoadingButton>
      </Stack>
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
