import React, { lazy } from "react";
import {
  SurveyQuestionModel,
  SurveyQuestionsColumns,
} from "../../tables-def/surveyQuestions";
import { Box, Stack } from "@mui/material";
import DeleteQuestion from "./questionsActions/deleteQuestion";
import UpdateQuestion from "./questionsActions/updateQuestion";
import CreateQuestion from "./createQuestion/createQuestion";
import Loadable from "../../components/Loadable";

const Table = Loadable(lazy(() => import("../../components/Table")));

const SurveyQuestions = ({
  questions = [],
  withActions = true,
}: {
  questions?: SurveyQuestionModel[];
  withActions?: boolean;
}) => {
  return (
    <Box>
      {withActions && <CreateQuestion />}
      <Table
        data={questions}
        columns={SurveyQuestionsColumns()}
        enableRowActions={withActions}
        renderRowActions={({ row }) => {
          return (
            <Stack flexDirection={"row"} gap={1}>
              <DeleteQuestion question={row.original} />
              <UpdateQuestion question={row.original} />
            </Stack>
          );
        }}
      />
    </Box>
  );
};

export default SurveyQuestions;
