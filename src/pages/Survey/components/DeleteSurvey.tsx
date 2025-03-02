import React from "react";
import PopupButton from "../../../components/PopupButton";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { MdDeleteSweep } from "react-icons/md";
import { Survey } from "../../../tables-def/survey";
import { useDeleteSurvey } from "../../../api/surveys";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";

const DeleteSurvey = ({ survey }: { survey: Survey }) => {
  const deleteSurvey = useDeleteSurvey();

  const { t } = useTranslation();

  return (
    <PopupButton
      title="delete Survey"
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
                slug: t("slugs.survey"),
              })}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                {t("delete_pop.desc", {
                  slug: t("slugs.survey"),
                })}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} variant="contained" color={"error"}>
                {t("delete_pop.cancel")}
              </Button>
              <LoadingButton
                onClick={() => {
                  deleteSurvey.mutate(survey.id);
                }}
                variant="outlined"
                color={"success"}
                loading={deleteSurvey.isPending}
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

export default DeleteSurvey;
