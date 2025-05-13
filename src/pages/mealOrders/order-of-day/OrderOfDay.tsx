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
import { useTranslation } from "react-i18next";

const TableComponent = Loadable(
  lazy(() => import("../../../components/Table"))
);

const OrderOfDay = () => {
  const orders = useGetMealOrders();
  const [searchParams] = useSearchParams();
  const orderSummaryDownload = usePrintMealOrdersInformationToPDF();
  const markAllOrdersAsDone = useMarkAllOrdersAsDone();
  const date = searchParams.get("date");
  const { t } = useTranslation();
  return (
    <Box>
      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        columnGap={2}
        mb={2}
        alignItems={"center"}
      >
        <LoadingButton
          variant="contained"
          color="secondary"
          onClick={() => {
            orderSummaryDownload.mutate(date);
          }}
          endIcon={<FaFilePdf />}
        >
          {t("orderSummary.donwload_order_summmary")}
        </LoadingButton>
        <LoadingButton
          variant="contained"
          onClick={() => {
            markAllOrdersAsDone.mutate(date);
          }}
        >
          {t("orderSummary.mark_all_done")}
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
