import { Box, Typography } from "@mui/material";
import React from "react";
import AddUser from "./AddUser";
import { useTranslation } from "react-i18next";

const CreateUser = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Typography variant="h3" mb={2}>
        {t("createUser.title")}
      </Typography>
      <AddUser />
    </Box>
  );
};

export default CreateUser;
