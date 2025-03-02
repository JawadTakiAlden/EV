import { Button, IconButton, Stack, Typography } from "@mui/material";
import React, { lazy, useState } from "react";
import MealTypeForm, { MealTypeVlaue } from "./components/MealTypeForm";
import Loadable from "../../components/Loadable";
import { MealTypesColumns } from "../../tables-def/meal-types";
import DeleteMealType from "./deleteMealType";
import { CiEdit } from "react-icons/ci";
import * as yup from "yup";
import useGetTypes from "../../api/type/useGetTypes";
import useCreateType from "../../api/type/useCreateType";
import useUpdateType from "../../api/type/useUpdateType";
import { useTranslation } from "react-i18next";

const TableComponent = Loadable(lazy(() => import("../../components/Table")));

const MealType = () => {
  const [initailValues, SetInitialValues] = useState<MealTypeVlaue>({
    title: "",
    title_ar: "",
  });

  const [mode, setMode] = useState<"create" | "update">("create");

  const types = useGetTypes();
  const createType = useCreateType();
  const updateType = useUpdateType();

  const { t } = useTranslation();

  return (
    <>
      <Typography variant="h4" mb={2} sx={{ textTransform: "capitalize" }}>
        {t("gbtn." + mode)} {t("slugs.meal_type")}
      </Typography>
      <MealTypeForm
        task={mode}
        validationSchema={yup.object().shape({
          title: yup.string().max(255).required(),
        })}
        initialValues={initailValues}
        loadingButtonProps={{
          loading: createType.isPending || updateType.isPending,
        }}
        onSubmit={async (values) => {
          if (mode === "create") {
            await createType.mutateAsync(values);
          } else if (mode === "update") {
            await updateType.mutateAsync(values);
          }
          SetInitialValues({ title: "", title_ar: "" });
          setMode("create");
        }}
      />
      {mode === "update" && (
        <Button
          onClick={() => {
            SetInitialValues({ title: "", title_ar: "" });
            setMode("create");
          }}
          color="inherit"
          variant="outlined"
        >
          {t("gbtn.cancel")}
        </Button>
      )}
      <TableComponent
        data={types?.data?.data || []}
        columns={MealTypesColumns()}
        enableRowActions
        state={{
          isLoading: types.isLoading,
        }}
        renderRowActions={({ row }) => {
          return (
            <Stack flexDirection={"row"} gap={2}>
              <DeleteMealType mealType={row.original} />
              <IconButton
                onClick={() => {
                  setMode("update");
                  SetInitialValues(row.original);
                }}
                color="warning"
              >
                <CiEdit />
              </IconButton>
            </Stack>
          );
        }}
      />
    </>
  );
};

export default MealType;
