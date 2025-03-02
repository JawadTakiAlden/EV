import { MRT_ColumnDef } from "material-react-table";
import { UserModel } from "./users";
import { Chip, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { MealPlan } from "./meal-plans";
import { useTranslation } from "react-i18next";
import useGetTranslation from "../utils/useGetTranslation";

export interface MealSubscriptionModel {
  id: number;
  type: "weekly" | "monthly";
  meal_plan: MealPlan;
  user: UserModel;
  start_date: string;
  end_data: string;
  is_active: boolean;
}

export const MealSubscriptionColumns = () => {
  const { t } = useTranslation();
  const { getTranslation } = useGetTranslation();
  const col: MRT_ColumnDef<MealSubscriptionModel>[] = [
    {
      accessorKey: "id",
      header: t("table.id"),
      size: 50,
    },
    {
      accessorKey: "user.name",
      header: t("table.username"),
      size: 150,
      Cell: ({ row }) => (
        <Typography
          component={Link}
          variant="subtitle2"
          to={`/admin/dashboard/users/${row.original.user.id}`}
          sx={{
            textDecoration: "none",
            color: "text.primary",
            ":hover": {
              textDecoration: "underline",
            },
          }}
        >
          {row.original.user.name}
        </Typography>
      ),
    },
    {
      accessorKey: "meal_plan." + getTranslation("title"),
      header: t("table.mealTitle"),
      size: 200,
    },
    {
      accessorKey: "type",
      header: t("table.subType"),
      size: 120,
    },
    {
      accessorKey: "start_date",
      header: t("table.startDate"),
      size: 120,
      Cell: ({ cell }) =>
        new Date(cell.getValue() as string).toLocaleDateString(),
    },
    {
      accessorKey: "end_data",
      header: t("table.endDate"),
      size: 120,
      Cell: ({ cell }) =>
        new Date(cell.getValue() as string).toLocaleDateString(),
    },
    {
      accessorKey: "is_active",
      header: t("table.status"),
      size: 100,
      Cell: ({ cell }) => (
        <Chip
          sx={{
            width: "100px",
          }}
          color={cell.getValue() ? "secondary" : "warning"}
          label={cell.getValue() ? t("table.active") : t("table.notActive")}
        />
      ),
    },
  ];
  return col;
};
