import { MRT_ColumnDef } from "material-react-table";
import { PriceModel } from "./price";
import { UserModel } from "./users";
import { Chip, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Package } from "./packages";
import { useTranslation } from "react-i18next";
import useGetTranslation from "../utils/useGetTranslation";

export interface SubscriptionModel {
  id: number;
  user: UserModel;
  package: Package;
  pricing: PriceModel;
  start_date: string;
  end_date: string;
  is_active: boolean;
  subscription_type: "group" | "personalized";
}

export const SubscriptionsColumns = () => {
  const { t } = useTranslation();
  const { getTranslation2 } = useGetTranslation();
  const col: MRT_ColumnDef<SubscriptionModel, any>[] = [
    {
      accessorKey: "id",
      header: t("table.id"),
      size: 50,
    },
    {
      accessorKey: "user.name",
      header: t("table.username"),
      maxSize: 150,
      Cell: ({ row }) => (
        <Typography
          component={Link}
          variant="subtitle2"
          to={`/dashboard/users/${row.original.user.id}`}
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
      accessorKey: "package.name",
      header: t("table.packageName"),
      maxSize: 150,
      Cell: ({ row }) => {
        return <span>{getTranslation2(row.original.package, "name")}</span>;
      },
    },
    {
      accessorKey: "pricing.title",
      header: t("table.priceName"),
      maxSize: 150,
      Cell: ({ row }) => {
        return <span>{getTranslation2(row.original.pricing, "title")}</span>;
      },
    },
    {
      accessorKey: "package.type",
      header: t("table.type"),
      maxSize: 150,
      enableColumnFilter: true,
      filterVariant: "select",
      enableColumnActions: true,
      filterSelectOptions: [
        {
          value: "group",
          label: t("table.groupCoaching"),
        },
        {
          value: "personalized",
          label: t("table.personCoaching"),
        },
      ],
    },
    {
      accessorKey: "start_date",
      header: t("table.startDate"),
      maxSize: 150,
    },
    {
      accessorKey: "end_date",
      header: t("table.endDate"),
      maxSize: 150,
    },
    {
      accessorKey: "is_active",
      header: t("table.status"),
      enableColumnActions: true,
      enableColumnFilter: true,
      filterVariant: "checkbox",
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
