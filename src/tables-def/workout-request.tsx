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

export const workoutRequests: WorkoutRequest[] = [
  {
    user: {
      id: 1,
      name: "Alice Johnson",
    },
    package: {
      id: 101,
      name: "Personalized Fitness Plan",
    },
    created_at: "2024-12-01",
  },
  {
    user: {
      id: 2,
      name: "Bob Smith",
    },
    package: {
      id: 102,
      name: "Group Strength Training",
    },
    created_at: "2024-12-02",
  },
  {
    user: {
      id: 3,
      name: "Catherine Bell",
    },
    package: {
      id: 103,
      name: "Advanced Yoga Program",
    },
    created_at: "2024-12-03",
  },
  {
    user: {
      id: 4,
      name: "David Lee",
    },
    package: {
      id: 104,
      name: "Beginner's Cardio Plan",
    },
    created_at: "2024-12-04",
  },
  {
    user: {
      id: 5,
      name: "Evelyn Garcia",
    },
    package: {
      id: 105,
      name: "Marathon Prep Course",
    },
    created_at: "2024-12-05",
  },
];

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
