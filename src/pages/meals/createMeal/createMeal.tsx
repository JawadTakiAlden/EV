import React from "react";
import PopupButton from "../../../components/PopupButton";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import MealForm from "../components/MealForm";
import { useCreateMeal } from "../../../api/meals";
import { useTranslation } from "react-i18next";

const CreateMeal = () => {
  const createMeal = useCreateMeal();
  const { t } = useTranslation();
  return (
    <PopupButton
      title={t("createMeal.title")}
      DialogRender={({ props, handleClose }) => {
        return (
          <Dialog {...props}>
            <DialogTitle>{t("createMeal.title")}</DialogTitle>
            <DialogContent>
              <MealForm
                onSubmit={async (values) => {
                  const mutatedValues = {
                    ...values,
                    types: values.types.map((ty) => ty.id),
                    ingredients: values.ingredients.map((ty) => ({
                      id: ty.id,
                      quantity: ty.quantity,
                    })),
                  };
                  const mealFormData = new FormData();
                  mealFormData.append("name", mutatedValues.name);
                  mealFormData.append("description", mutatedValues.description);
                  mealFormData.append("name_ar", mutatedValues.name_ar);
                  mealFormData.append(
                    "description_ar",
                    mutatedValues.description_ar
                  );
                  mealFormData.append("carb", values.carb.toString());
                  mutatedValues.ingredients.map((ingre, i) =>
                    mealFormData.append(
                      `ingredients[${i}][ingredient_id]`,
                      JSON.stringify(ingre.id)
                    )
                  );
                  mutatedValues.ingredients.map((ingre, i) =>
                    mealFormData.append(
                      `ingredients[${i}][quantity]`,
                      JSON.stringify(+ingre.quantity)
                    )
                  );
                  mutatedValues.types.map((type, i) =>
                    mealFormData.append(`types[${i}]`, type.toString())
                  );
                  mealFormData.append(
                    "calories",
                    mutatedValues.calories.toString()
                  );
                  mealFormData.append("fats", mutatedValues.fats.toString());
                  mealFormData.append("fiber", mutatedValues.fiber.toString());
                  mealFormData.append(
                    "protein",
                    mutatedValues.protein.toString()
                  );
                  mutatedValues.images.map((image) =>
                    mealFormData.append("images", image)
                  );
                  await createMeal.mutateAsync(mealFormData);
                  handleClose();
                }}
                loadingButtonProps={{
                  loading: createMeal.isPending,
                }}
                initialValues={{
                  name: "",
                  name_ar: "",
                  description_ar: "",
                  types: [],
                  calories: 0,
                  description: "",
                  images: [],
                  fats: 0,
                  fiber: 0,
                  carb: 0,
                  ingredients: [],
                  protein: 0,
                }}
              />
            </DialogContent>
          </Dialog>
        );
      }}
    />
  );
};

export default CreateMeal;
