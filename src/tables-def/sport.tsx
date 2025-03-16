import { Box, Stack } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import DeleteSport from "../pages/admin/sports/components/DeleteSport";
import UpdateSport from "../pages/admin/sports/components/UpdateSport";
import useGetTranslation from "../utils/useGetTranslation";
import { useTranslation } from "react-i18next";

export interface Sport {
  id: number;
  title: string;
  title_ar: string;
  createdAt: string;
  updatedAt: string;
  image: string;
}

export const SportColumns = () => {
  const { getTranslation2 } = useGetTranslation();
  const { t } = useTranslation();
  const col: MRT_ColumnDef<Sport>[] = [
    {
      accessorKey: "id",
      header: t("table.id"),
    },
    {
      accessorKey: "title",
      header: t("table.title"),
      Cell: ({ row }) => {
        return <span>{getTranslation2(row.original, "title")}</span>;
      },
    },
    {
      accessorKey: "createdAt",
      header: t("table.createdAt"),
      Cell: ({ cell }) => new Date(cell.getValue<string>()).toLocaleString(),
    },
    {
      accessorKey: "image",
      header: t("table.image"),
      Cell: ({ row }) => (
        <Box>
          <img
            width={"100px"}
            height={"100px"}
            alt={row.original.title}
            src={row.original.image}
            style={{
              borderRadius: "10px",
              objectFit: "cover",
            }}
          />
        </Box>
      ),
    },
    {
      accessorKey: "actions",
      header: t("table.actions"),
      Cell: ({ row }) => (
        <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
          <UpdateSport sport={row.original} />
          <DeleteSport sport={row.original} />
        </Stack>
      ),
    },
  ];

  return col;
};
