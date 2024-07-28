import React from "react";
import WritingArea from "./_components/writingArea";
import { Category } from "@/app/types";

interface Props {
  searchParams: { category: string };
}

const WritingPage = ({ searchParams }: Props) => {
  return (
    <div className="relative mx-4 mt-8 max-w-2xl md:mx-auto">
      <WritingArea category={searchParams.category as Category} />
    </div>
  );
};

export default WritingPage;
