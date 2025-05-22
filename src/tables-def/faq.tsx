// FAQ Interface

import { Translation } from "./translationInterface";

export interface Faq extends Translation {
  id: number;
  question: string;
  question_ar: string;
  answer: string;
  answer_ar: string;
  createdAt: string;
  updatedAt: string;
}
