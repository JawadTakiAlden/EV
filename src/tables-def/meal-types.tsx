import { MRT_ColumnDef } from "material-react-table";
import useGetTranslation from "../utils/useGetTranslation";
import { useTranslation } from "react-i18next";
export interface MealType {
  id: number;
  title: string;
}

export const MealTypesColumns = () => {
  const { getTranslation2 } = useGetTranslation();
  const { t } = useTranslation();
  const col: MRT_ColumnDef<MealType>[] = [
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
