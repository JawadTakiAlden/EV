import { Box, Link, Typography } from "@mui/material";
import dayjs from "dayjs";
import { MRT_ColumnDef } from "material-react-table";

import { Link as BaseLink } from "react-router";
import DeleteButton from "../pages/coupons/components/DeleteButton";
import UpdateButton from "../pages/coupons/components/UpdateButton";
import { useTranslation } from "react-i18next";

export type CreateCoupon = {
  code: string;
  discount_type: "percentage";
  discount_value: number;
  expiry_date: dayjs.Dayjs;
  usage_limit: number;
  is_active: boolean;
  package_id?: number | string;
  meal_plan_id?: number | string;
};

export type Coupon = {
  id: number;
  code: string;
  discount_type: "percentage";
  discount_value: number;
  expiry_date: string;
  usage_limit: number;
  used_count: number;
  is_active: boolean;
  package_id: null | number;
  meal_plan_id: null | number;
  createdAt: string;
  updatedAt: string;
};

export const CouponsColumns = (): MRT_ColumnDef<Coupon>[] => {
  const { t } = useTranslation();
  return [
    {
      accessorKey: "id",
      header: t("table.id"),
      size: 50,
    },
    {
      accessorKey: "code",
      header: t("table.code"),
    },
    {
      header: t("table.specfication"),
      Cell: ({ row }) => {
        if (!row.original.package_id && !row.original.meal_plan_id) {
          return t("table.global_specfic");
        }
        if (row.original.package_id) {
          return (
            <Link
              component={BaseLink}
              to={`/admin/dashboard/packages/${row.original.package_id}`}
            >
              {t("table.package_specific")}
            </Link>
          );
        }
        if (row.original.meal_plan_id) {
          return (
            <Link
              to={`/admin/dashboard/meal-plans/${row.original.meal_plan_id}`}
              component={BaseLink}
            >
              {t("table.meal_plan_specific")}
            </Link>
          );
        }
      },
    },
    {
      accessorKey: "discount_type",
      header: t("table.discount_type"),
    },
    {
      accessorKey: "discount_value",
      header: t("table.discount_value"),
    },
    {
      accessorKey: "is_active",
      header: t("table.active"),
      Cell: ({ cell }) => `${cell.getValue()}`,
    },
    {
      accessorKey: "usage_limit",
      header: t("table.usage_limit"),
    },
    {
      accessorKey: "used_count",
      header: t("table.used_count"),
    },
    {
      accessorKey: "expiry_date",
      header: t("table.expiry_date"),
    },
    {
      header: "Actions",
      Cell: ({ row }) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <DeleteButton coupon={row.original} />
            <UpdateButton coupon={row.original} />
          </Box>
        );
      },
    },
  ];
};
