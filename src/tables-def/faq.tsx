// FAQ Interface

import { Translation } from "./translationInterface";

export interface Faq extends Translation {
  id: number;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
}
