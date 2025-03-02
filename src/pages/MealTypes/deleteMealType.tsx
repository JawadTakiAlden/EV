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
import { MealType } from "../../tables-def/meal-types";
import useDeleteType from "../../api/type/useDeleteType";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import useGetTranslation from "../../utils/useGetTranslation";

const DeleteMealType = ({ mealType }: { mealType: MealType }) => {
  const deleteType = useDeleteType();
  const { t } = useTranslation();
  const { getTranslation2 } = useGetTranslation();
  return (
    <PopupButton
      title="delete meal type"
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
                slug: t("slugs.meal_type"),
              })}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                {t("delete_pop.desc", {
                  slug: getTranslation2(mealType, "title"),
                })}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} variant="contained" color={"error"}>
                {t("delete_pop.cancel")}
              </Button>
              <LoadingButton
                onClick={async () => {
                  await deleteType.mutateAsync(mealType.id);
                  handleClose();
                }}
                loading={deleteType.isPending}
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

export default DeleteMealType;
