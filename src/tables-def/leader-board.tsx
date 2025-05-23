import { MRT_ColumnDef } from "material-react-table";
import { useTranslation } from "react-i18next";

export interface LeaderBoard {
  user: {
    id: number;
    name: string;
  };
  stats: {
    reps: number;
    weight: number;
  };
  rank: number;
}

export const LeaderBoardColumns = () => {
  const { t } = useTranslation();
  const col: MRT_ColumnDef<LeaderBoard>[] = [
    {
      accessorKey: "user.name",
      header: t("table.username"),
    },
    {
      accessorKey: "stats.reps",
      header: t("table.reps"),
    },
    {
      accessorKey: "stats.weight",
      header: t("table.weight"),
    },
    {
      accessorKey: "rank",
      header: t("table.rank"),
    },
  ];

  return col;
};
