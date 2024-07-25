import React from "react";
import ContentHeader from "./ContentHeader";
import ContentFooter from "./ContentFooter";

interface Props {
  title: string;
  content: string;
}

const Essay = ({ title, content }: Props) => {
  return (
    <div className="min-h-96">
      <h2 className="my-12 text-center text-4xl font-bold">{title}</h2>
      <div className="grid gap-6 rounded-lg bg-gray-100 p-4">
        <ContentHeader />
        <p className="flex-1 px-4">{content}</p>
        {/* <ContentFooter /> */}
      </div>
    </div>
  );
};

export default Essay;
