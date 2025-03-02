import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import React, { lazy, useState } from "react";
import * as yup from "yup";
import DeliveryTimeForm, {
  DeliveryTimeValue,
} from "./components/DeliveryTimeForm";
import Loadable from "../../components/Loadable";
import { CiEdit } from "react-icons/ci";
import {
  useCreateDeliveryTime,
  useGetDeliveryTimes,
  useUpdateDeliveryTime,
} from "../../api/delivery-times";
import { DeliveryTimesColumns } from "../../tables-def/delivery-times";
import DeleteDeliveryTime from "./components/DeleteDeliveryTime";
import { useTranslation } from "react-i18next";

const TableComponent = Loadable(lazy(() => import("../../components/Table")));

const DeliveryTime = () => {
  const [initailValues, SetInitialValues] = useState<DeliveryTimeValue>({
    title: "",
    title_ar: "",
  });

  const [mode, setMode] = useState<"create" | "update">("create");
  const { t } = useTranslation();
  const deliveryTimes = useGetDeliveryTimes();
  const createDeliveryTimes = useCreateDeliveryTime();
  const updateDeliveryTimes = useUpdateDeliveryTime();
  return (
    <Box>
      <Typography variant="h4" mb={2} sx={{ textTransform: "capitalize" }}>
        {t("gbtn." + mode)} {t("deliveryTime.title")}
      </Typography>
      <DeliveryTimeForm
        task={mode}
        validationSchema={yup.object().shape({
          title: yup
            .string()
            .max(255)
            .required()
            .label(t("deliveryTime.form.title")),
        })}
        initialValues={initailValues}
        loadingButtonProps={{
          loading:
            createDeliveryTimes.isPending || updateDeliveryTimes.isPending,
        }}
        onSubmit={async (values) => {
          if (mode === "create") {
            await createDeliveryTimes.mutateAsync(values);
          } else if (mode === "update") {
            await updateDeliveryTimes.mutateAsync({
              data: values,
              id: values.id!,
            });
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
        data={deliveryTimes.data?.data || []}
        columns={DeliveryTimesColumns()}
        enableRowActions
        state={{
          isLoading: deliveryTimes.isLoading,
        }}
        renderRowActions={({ row }) => {
          return (
            <Stack flexDirection={"row"} gap={2}>
              <DeleteDeliveryTime deliveryTime={row.original} />
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
    </Box>
  );
};

export default DeliveryTime;
