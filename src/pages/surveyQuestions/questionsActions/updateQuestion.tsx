import React from "react";
import { SurveyDataModel } from "../../../tables-def/surveyQuestions";
import PopupButton from "../../../components/PopupButton";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import QuestionForm from "../components/QuestionForm";
import { CiEdit } from "react-icons/ci";
import { useUpdateQuestion } from "../../../api/surveys";
import { useTranslation } from "react-i18next";

const UpdateQuestion = ({ question }: { question: SurveyDataModel }) => {
  const updateQuestion = useUpdateQuestion();
  const { t } = useTranslation();
  return (
    <PopupButton
      title="Delete question"
      ButtonComponentRender={({ handleOpen }) => {
        return (
          <IconButton onClick={handleOpen} color="warning">
            <CiEdit />
          </IconButton>
        );
      }}
      DialogRender={({ props, handleClose }) => {
        return (
          <Dialog {...props}>
            <DialogTitle>
              {t("edit_pop.title", {
                slug: t("slugs.qus"),
              })}
            </DialogTitle>
            <DialogContent>
              <QuestionForm
                task="update"
                onSubmit={(values) => {
                  updateQuestion.mutateAsync({ id: question.id, data: values });
                  handleClose();
                }}
                initialValues={{
                  ...question,
                  choices: question.choices?.map((choice) => choice.text),
                }}
              />
            </DialogContent>
          </Dialog>
        );
      }}
    />
  );
};

export default UpdateQuestion;
