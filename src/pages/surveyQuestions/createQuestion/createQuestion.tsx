import React from "react";
import PopupButton from "../../../components/PopupButton";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import QuestionForm from "../components/QuestionForm";
import { useCreateQuestion } from "../../../api/surveys";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";

const CreateQuestion = () => {
  const { surveyId } = useParams();
  const createQuestion = useCreateQuestion();
  const { t } = useTranslation();
  return (
    <PopupButton
      title="create question"
      DialogRender={({ handleClose, props }) => {
        return (
          <Dialog {...props}>
            <DialogTitle>{t("createQuestion.button")}</DialogTitle>
            <DialogContent>
              <QuestionForm
                onSubmit={(values) => {
                  createQuestion.mutateAsync({
                    ...values,
                    survey_id: surveyId,
                  });
                  handleClose();
                }}
                loadingButtonProps={{
                  loading: createQuestion.isPending,
                }}
                initialValues={{
                  title: "",
                  title_ar: "",
                  image: null,
                  type: "normal",
                  choices: [],
                }}
              />
            </DialogContent>
          </Dialog>
        );
      }}
    />
  );
};

export default CreateQuestion;
