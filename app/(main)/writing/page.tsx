import React from "react";
import WritingArea from "./_components/writingArea";
import { CategoryType } from "@/app/types";

interface Props {
  searchParams: { category: string };
}

const WritingPage = ({ searchParams }: Props) => {
  return (
    <div>
      <WritingArea category={searchParams.category as CategoryType} />
    </div>
  );
};

export default WritingPage;
