import { Box, IconButton, Stack } from "@mui/material";
import { Meal } from "./meals";
import { UserProfileModel } from "./user-profile";
import { MRT_ColumnDef } from "material-react-table";
import { CgInfo } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useAuthContext } from "../providers/AuthProvider";
import { LoadingButton } from "@mui/lab";
import { useChangeOrderStatus } from "../api/meal-orders";
import { mealOrderStatus } from "../pages/mealOrders/detail/MealOrderDetail";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export interface Order {
  id: number;
  user_id: number;
  meal_subscription_id: number;
  order_date: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  user: UserProfileModel;
  meals: Meal[];
}

export const orderColumns: MRT_ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
  },
  {
    accessorKey: "status",
    header: "Status",
    Cell: ({ row }) => {
      const chnageOrderStatus = useChangeOrderStatus();
      const { t } = useTranslation();
      console.log("rerender");
      return (
        <Stack
          flexDirection={"row"}
          flexWrap={"wrap"}
          alignItems={"center"}
          gap={"5px"}
        >
          {mealOrderStatus.map((statusButton) => (
            <LoadingButton
              key={statusButton.accessKey}
              size="small"
              onClick={() => {
                chnageOrderStatus.mutate({
                  orderId: row.original.id,
                  orderStatus: statusButton.accessKey,
                });
              }}
              disabled={chnageOrderStatus.isPending}
              color={
                row.original.status === statusButton.accessKey
                  ? "primary"
                  : "inherit"
              }
              variant={
                row.original.status === statusButton.accessKey
                  ? "contained"
                  : "outlined"
              }
              sx={{
                transition: "0.2s",
              }}
            >
              {t("mealOrderDetail." + statusButton.tranlsationKey)}
            </LoadingButton>
          ))}
        </Stack>
      );
    },
  },
  {
    accessorKey: "user.name",
    header: "User Name",
  },
  {
    accessorKey: "action",
    header: "User Name",
    Cell: ({ row }) => {
      const { base } = useAuthContext();
      return (
        <Box>
          <IconButton
            color="primary"
            component={Link}
            to={`/${base}/dashboard/orders/${row.original.id}`}
          >
            <CgInfo />
          </IconButton>
        </Box>
      );
    },
  },
];
