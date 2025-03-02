import { Stack } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import UpdatePriceButton from "../pages/packages/components/UpdatePriceButton";
import DeletePriceButton from "../pages/packages/components/DeletePriceButton";
import useGetTranslation from "../utils/useGetTranslation";
import { useTranslation } from "react-i18next";

export interface Pricing {
  id: number;
  title: string;
  title_ar: string;
  price: number;
  number_of_days: number;
  package_id: number;
}

export interface Package {
  id?: number;
  name: string;
  description?: string;
  type: "group" | "personalized";
  pricings?: Pricing[];
}

export const PricingColumns = (withActions = true) => {
  const { getTranslation } = useGetTranslation();
  const { t } = useTranslation();
  let pricingColumns: MRT_ColumnDef<Pricing>[] = [
    {
      accessorKey: getTranslation("title"),
      header: t("table.title"),
    },
    {
      accessorKey: "price",
      header: t("table.price"),
      Cell: ({ cell }) => `SAR${cell.getValue<number>().toFixed(2)}`,
    },
    {
      accessorKey: "number_of_days",
      header: t("table.numberOfDays"),
    },
  ];

  if (withActions) {
    pricingColumns = [
      ...pricingColumns,
      {
        id: "actions",
        header: t("table.actions"),
        Cell: ({ row }) => (
          <Stack flexDirection={"row"} gap={1}>
            <UpdatePriceButton price={row.original} />
            <DeletePriceButton price={row.original} />
          </Stack>
        ),
      },
    ];
  }

  return pricingColumns;
};
