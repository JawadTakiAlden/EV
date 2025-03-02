import { Box } from "@mui/material";
import React from "react";
import SurveyForm from "../components/SurveyForm";
import { useParams } from "react-router";
import { useCreateSurvey } from "../../../api/surveys";

const CreateSurvey = () => {
  const { packageId } = useParams();
  const createSurvey = useCreateSurvey();
  return (
    <Box>
      <SurveyForm
        task="create"
        dir="row"
        initialValues={{
          title: "",
          title_ar: "",
          package_id: parseInt(packageId!),
        }}
        loadingButtonProps={{
          loading: createSurvey.isPending,
        }}
        onSubmit={(values) => {
          createSurvey.mutate(values);
        }}
      />
    </Box>
  );
};

export default CreateSurvey;
