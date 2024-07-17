import React from "react";
import Form from "../components/form";

const DashboardPage = () => {
  return (
    <div className="mx-auto max-w-3xl p-8">
      <h1>In-k-spire</h1>
      <p>나의 첫 글을 쓰고</p>
      <p>다음 글감을 추천 받으세요.</p>
      <Form />
    </div>
  );
};

export default DashboardPage;
