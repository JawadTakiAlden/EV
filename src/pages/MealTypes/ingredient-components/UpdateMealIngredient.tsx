import React from "react";
import { MealIngreadiant } from "../../../tables-def/meal-ingrediant";
import PopupButton from "../../../components/PopupButton";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import MealIngrediantForm from "../components/MealIngrediantForm";
import { useUpdateIngredient } from "../../../api/ingredients";
import { FaEdit } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const UpdateMealIngredient = ({
  mealIngrediant,
}: {
  mealIngrediant: MealIngreadiant;
}) => {
  const updateMealIngredient = useUpdateIngredient();
  const { t } = useTranslation();
  return (
    <PopupButton
      title="Create Meal Ingredient"
      ButtonComponentRender={({ handleOpen }) => {
        return (
          <IconButton color="warning" onClick={handleOpen}>
            <FaEdit />
          </IconButton>
        );
      }}
      DialogRender={({ props, handleClose }) => {
        return (
          <Dialog {...props}>
            <DialogTitle>
              {t("edit_pop.title", {
                slug: t("slugs.ingredient"),
              })}
            </DialogTitle>
            <DialogContent>
              <MealIngrediantForm
                onSubmit={async (values) => {
                  await updateMealIngredient.mutateAsync({
                    data: values,
                    id: mealIngrediant.id,
                  });
                  handleClose();
                }}
                loadingButtonProps={{
                  loading: updateMealIngredient.isPending,
                }}
                initialValues={mealIngrediant}
              />
            </DialogContent>
          </Dialog>
        );
      }}
    />
  );
};

export default UpdateMealIngredient;
