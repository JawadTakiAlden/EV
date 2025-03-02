import { Box, Button, IconButton, Tooltip } from "@mui/material";
import React, { lazy } from "react";
import { UserTableColumns } from "../../../tables-def/users";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useGetUsers } from "../../../api/users";
import Loadable from "../../../components/Loadable";
import { useAuthContext } from "../../../providers/AuthProvider";
import { useTranslation } from "react-i18next";

const Table = Loadable(lazy(() => import("../../../components/Table")));

const AllUsers = () => {
  const users = useGetUsers();
  const { base, user } = useAuthContext();
  const { t } = useTranslation();
  const addUserShow = user?.role === "admin";
  return (
    <Box>
      {addUserShow && (
        <Button
          variant="contained"
          component={Link}
          to={`/${base}/dashboard/users/create`}
        >
          {t("all_users.create_user")}
        </Button>
      )}

      <Table
        withExport
        enableRowActions
        state={{
          isLoading: users.isLoading,
        }}
        enableTopToolbar
        renderRowActions={({ row }) => {
          return (
            <IconButton color="info" component={Link} to={`${row.original.id}`}>
              <CgProfile />
            </IconButton>
          );
        }}
        data={users?.data?.data?.users || []}
        columns={UserTableColumns()}
      />
    </Box>
  );
};

export default AllUsers;
