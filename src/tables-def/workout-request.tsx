import { Link as BaseLink } from "react-router-dom";
import { Link } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import { useAuthContext } from "../providers/AuthProvider";

export interface WorkoutRequest {
  user: {
    id: number;
    name: string;
  };
  package: {
    id: number;
    name: string;
  };
  created_at: string;
}

export const workoutRequestsColumns: MRT_ColumnDef<WorkoutRequest>[] = [
  {
    accessorKey: "user.name",
    header: "User Name",
    Cell: ({ row }) => {
      const { base } = useAuthContext();
      return (
        <Link
          component={BaseLink}
          to={`/${base}/dashboard/users/${row.original.user.id}?package_id=${row.original.package.id}`}
          style={{
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          {row.original.user.name}
        </Link>
      );
    },
  },
  {
    accessorKey: "package.name",
    header: "Package Name",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    Cell: ({ cell }) => new Date(cell.getValue<string>()).toLocaleDateString(),
  },
];
