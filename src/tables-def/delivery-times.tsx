import { MRT_ColumnDef } from "material-react-table";
import { Translation } from "./translationInterface";
import { useTranslation } from "react-i18next";
import useGetTranslation from "../utils/useGetTranslation";

export interface DeliveryTime extends Translation {
  id: number;
  title: string;
}

export const DeliveryTimesColumns = () => {
  const { t } = useTranslation();
  const { getTranslation2 } = useGetTranslation();
  const col: MRT_ColumnDef<DeliveryTime>[] = [
    {
      accessorKey: "title",
      header: t("table.title"),
      Cell: ({ row }) => {
        return <span>{getTranslation2(row.original, "title")}</span>;
      },
    },
  ];

  return col;
};
