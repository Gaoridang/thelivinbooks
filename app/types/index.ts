export interface Answer {
  id: string;
  title: string;
  answer: string;
  question: string;
}

export type Category = "과거" | "현재" | "미래";

export type CategoryAnswers = {
  [key in Category]: Answer[];
};

export type CategorizedAnswers = CategoryAnswers;

export type Question = {
  id: string;
  content: string;
  category: Category;
};
