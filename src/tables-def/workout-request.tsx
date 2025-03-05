import { Link as BaseLink } from "react-router-dom";
import { Link } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";

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
    Cell: ({ row }) => (
      <Link
        component={BaseLink}
        to={`/coach/dashboard/users/${row.original.user.id}?package_id=${row.original.package.id}&day=Saturday`}
        style={{
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >
        {row.original.user.name}
      </Link>
    ),
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
