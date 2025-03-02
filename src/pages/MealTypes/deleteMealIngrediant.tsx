import React from "react";
import PopupButton from "../../components/PopupButton";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import { MdDeleteSweep } from "react-icons/md";
import { MealIngreadiant } from "../../tables-def/meal-ingrediant";
import { useDeleteIngredient } from "../../api/ingredients";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import useGetTranslation from "../../utils/useGetTranslation";

const DeleteMealIngrediant = ({
  mealIngrediant,
}: {
  mealIngrediant: MealIngreadiant;
}) => {
  const deleteIngredient = useDeleteIngredient();
  const { t } = useTranslation();
  const { getTranslation2 } = useGetTranslation();
  return (
    <PopupButton
      title="delete meal ingrediant"
      ButtonComponentRender={({ handleOpen }) => {
        return (
          <IconButton onClick={handleOpen} color={"error"}>
            <MdDeleteSweep />
          </IconButton>
        );
      }}
      DialogRender={({ props, handleClose }) => {
        return (
          <Dialog {...props}>
            <DialogTitle>
              {t("delete_pop.title", {
                slug: t("slugs.ingredient"),
              })}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                {t("delete_pop.desc", {
                  slug: getTranslation2(mealIngrediant, "title"),
                })}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} variant="contained" color={"error"}>
                {t("delete_pop.cancel")}
              </Button>
              <LoadingButton
                onClick={async () => {
                  await deleteIngredient.mutateAsync(mealIngrediant.id);
                  handleClose();
                }}
                variant="outlined"
                color={"success"}
              >
                {t("delete_pop.confirm")}
              </LoadingButton>
            </DialogActions>
          </Dialog>
        );
      }}
    />
  );
};

export default DeleteMealIngrediant;
