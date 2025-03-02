import { SurveyQuestionModel } from "./surveyQuestions";

export interface Survey {
  id: number;
  title: string;
  title_ar: string;
  package_id: number;
  questions?: SurveyQuestionModel[];
}
