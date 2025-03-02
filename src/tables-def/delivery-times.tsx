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
  const { getTranslation } = useGetTranslation();
  const col: MRT_ColumnDef<DeliveryTime>[] = [
    {
      accessorKey: getTranslation("title"),
      header: t("table.title"),
    },
  ];

  return col;
};
