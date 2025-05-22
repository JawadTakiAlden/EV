import { Link as BaseLink } from "react-router-dom";
import { Button, Link } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import { useAcceptChatRequest } from "../api/chat-requests";

export interface ChatRequest {
  id: number;
  user: {
    id: number;
    email: string;
    name: string;
  };
}

export const chatRequestColumns: MRT_ColumnDef<ChatRequest>[] = [
  {
    accessorKey: "user.name",
    header: "User Name",
  },
  {
    accessorKey: "user.email",
    header: "Email",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    Cell: ({ row }) => {
      const acceptRequest = useAcceptChatRequest();
      return (
        <Button
          loading={acceptRequest.isPending}
          variant="contained"
          size="small"
          color="secondary"
          onClick={() => {
            acceptRequest.mutate(row.original.id);
          }}
        >
          Accept
        </Button>
      );
    },
  },
];
