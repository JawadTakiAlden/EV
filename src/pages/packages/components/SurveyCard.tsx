import React from "react";
import { Survey } from "../../../tables-def/survey";
import MainCard from "../../../components/MainCard";
import { IconButton, Stack } from "@mui/material";
import { IoMdInformationCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import DeleteSurvey from "../../Survey/components/DeleteSurvey";
import UnderlineHeader from "../../../components/UnderlineHeader";
import useGetTranslation from "../../../utils/useGetTranslation";

const SurveyCard = ({
  survey,
  withActions = true,
}: {
  survey: Survey;
  withActions?: boolean;
}) => {
  const { getTranslation2 } = useGetTranslation();
  return (
    <MainCard>
      <UnderlineHeader>{getTranslation2(survey, "title")}</UnderlineHeader>
      <Stack flexDirection={"row"} gap={1}>
        <IconButton component={Link} to={`survey/${survey.id}`} color={"info"}>
          <IoMdInformationCircle />
        </IconButton>
        {withActions && <DeleteSurvey survey={survey} />}
      </Stack>
    </MainCard>
  );
};

export default SurveyCard;
