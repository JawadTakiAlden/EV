import React from "react";
import { SurveyAnswer as SurveyAnswerModel } from "../../tables-def/user-profile";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import SectionTitle from "../../components/SectionTitle";
import { MdExpandMore } from "react-icons/md";
import { useTranslation } from "react-i18next";

const SurveyAnswer = ({
  surveyAnswers,
}: {
  surveyAnswers: SurveyAnswerModel[];
}) => {
  const [expanded, setExpanded] = React.useState<number | false>(1);
  const { t } = useTranslation();
  return (
    <Box>
      <SectionTitle>{t("userProfile.sur_ans.title")}</SectionTitle>
      <Stack
        sx={{
          maxHeight: "500px",
          overflowY: "auto",
        }}
      >
        {surveyAnswers.map((survey) => (
          <Accordion
            slotProps={{ transition: { unmountOnExit: true } }}
            expanded={expanded === survey.id}
            onChange={() => setExpanded(survey?.id || 0)}
          >
            <AccordionSummary
              expandIcon={<MdExpandMore />}
              aria-controls={`${survey?.id}`}
            >
              <Stack
                flexWrap={"wrap"}
                flexDirection={"row"}
                alignItems={"center"}
                gap={0.5}
              >
                <Typography component="span">
                  {survey?.question.title}
                </Typography>
                <Chip
                  color={
                    survey.question.type === "normal" ? "primary" : "secondary"
                  }
                  label={survey.question.type}
                />
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              {survey.question.type === "normal" ? (
                <Typography>{survey.answer}</Typography>
              ) : (
                <Typography>{survey.choice.text}</Typography>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    </Box>
  );
};

export default SurveyAnswer;
