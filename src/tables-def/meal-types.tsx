import { MRT_ColumnDef } from "material-react-table";
import useGetTranslation from "../utils/useGetTranslation";
import { useTranslation } from "react-i18next";
export interface MealType {
  id: number;
  title: string;
}

export const MealTypesColumns = () => {
  const { getTranslation } = useGetTranslation();
  const { t } = useTranslation();
  const col: MRT_ColumnDef<MealType>[] = [
    {
      accessorKey: getTranslation("title"),
      header: t("table.title"),
    },
  ];

  return col;
};
