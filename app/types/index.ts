export interface Answer {
  id: string;
  title: string;
  answer: string;
  question: string;
}

export interface CategoryAnswers {
  [category: string]: Answer[];
}

export type CategorizedAnswers = CategoryAnswers;
