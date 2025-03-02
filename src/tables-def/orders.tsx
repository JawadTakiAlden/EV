import { Box, IconButton } from "@mui/material";
import { Meal } from "./meals";
import { UserProfileModel } from "./user-profile";
import { MRT_ColumnDef } from "material-react-table";
import { CgInfo } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useAuthContext } from "../providers/AuthProvider";

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
