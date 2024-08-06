export interface Answer {
  id: string;
  title: string;
  content: string;
  question_content: string | null;
}

export type CategoryType = "과거" | "현재" | "미래" | "personal";

export type CategoryAnswers = {
  [key in CategoryType]: Answer[];
};

export type CategorizedAnswers = CategoryAnswers;

export type Question = {
  id: string;
  content: string;
  category: CategoryType;
};

export type AnswerType = "with_question" | "without_question";
export interface AnswerReturnType {
  answers: Answer[];
}
