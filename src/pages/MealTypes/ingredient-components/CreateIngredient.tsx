import React from "react";
import PopupButton from "../../../components/PopupButton";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import MealIngrediantForm from "../components/MealIngrediantForm";
import { useCreateIngredient } from "../../../api/ingredients";
import { useTranslation } from "react-i18next";

const CreateIngredient = () => {
  const createIngredient = useCreateIngredient();
  const { t } = useTranslation();
  return (
    <PopupButton
      title={t("createIngredient.title")}
      DialogRender={({ props, handleClose }) => {
        return (
          <Dialog {...props}>
            <DialogTitle>{t("createIngredient.title")}</DialogTitle>
            <DialogContent>
              <MealIngrediantForm
                onSubmit={(values) => {
                  createIngredient.mutateAsync(values);
                  handleClose();
                }}
                loadingButtonProps={{
                  loading: createIngredient.isPending,
                }}
                initialValues={{
                  title: "",
                  unit: "kg",
                  title_ar: "",
                  stock: 0,
                  image: null,
                }}
              />
            </DialogContent>
          </Dialog>
        );
      }}
    />
  );
};

export default CreateIngredient;
