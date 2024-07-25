import React from "react";

interface Props {
  question: {
    content: string;
    category: string;
  };
}

const Question = ({ question: { content, category } }: Props) => {
  return (
    <div className="my-4 grid gap-4 rounded-2xl md:flex">
      <div className="bg-yellow flex aspect-square w-12 items-center justify-center rounded-xl text-2xl opacity-70">
        <span>Q</span>
      </div>
      <p className="font-semibold">{content}</p>
    </div>
  );
};

export default Question;
