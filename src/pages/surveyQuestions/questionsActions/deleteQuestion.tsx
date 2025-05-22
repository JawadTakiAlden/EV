import { SurveyDataModel } from "../../../tables-def/surveyQuestions";
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
import { useDeleteQuestion } from "../../../api/surveys";

import { useTranslation } from "react-i18next";

const DeleteQuestion = ({ question }: { question: SurveyDataModel }) => {
  const deleteQuestion = useDeleteQuestion();
  const { t } = useTranslation();
  return (
    <PopupButton
      title="delete question"
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
                slug: t("slugs.qus"),
              })}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                {t("delete_pop.desc", {
                  slug: question.title,
                })}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} variant="contained" color={"error"}>
                {t("delete_pop.cancel")}
              </Button>
              <Button
                onClick={() => {
                  deleteQuestion.mutate(question.id);
                }}
                variant="outlined"
                color={"success"}
              >
                {t("delete_pop.confirm")}
              </Button>
            </DialogActions>
          </Dialog>
        );
      }}
    />
  );
};

export default DeleteQuestion;
