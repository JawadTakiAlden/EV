import { MRT_ColumnDef } from "material-react-table";
import { useTranslation } from "react-i18next";
import { Translation } from "./translationInterface";

const roleMapper: { [key: string]: string } = {
  admin: "Admin",
  coach: "Coach",
  kitchen_staff: "Kitchen",
  consumer: "Consumer",
};

export interface UserModel extends Translation {
  id: number;

  name: string;

  email: string;

  phone: string;

  role: string;
}

export const UserTableColumns = () => {
  const { t } = useTranslation();
  const col: MRT_ColumnDef<UserModel, any>[] = [
    {
      accessorKey: "id",
      header: t("table.id"),
      size: 50,
    },
    {
      accessorKey: "name",
      header: t("table.name"),
      maxSize: 150,
    },
    {
      accessorKey: "phone",
      header: t("table.phone"),
      maxSize: 150,
    },
    {
      accessorKey: "email",
      header: t("table.email"),
      maxSize: 250,
    },
    {
      accessorFn: (row) => roleMapper[row.role],
      header: t("table.role"),
      maxSize: 250,
    },
  ];

  return col;
};
