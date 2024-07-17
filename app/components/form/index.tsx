"use client";

import React, { useState } from "react";
import TextArea from "../textarea";
import { extractKeywords } from "@/app/actions/extractKeywords";

interface Source {
  title: string;
  author: string;
  year: string;
  type: string;
  description: string;
  link: string;
}

interface Recommendation {
  mainTopic: string;
  keywords: string[];
  sources: Source[];
}

const Form = () => {
  const [recommendations, setRecommendations] = useState<Recommendation>();
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    try {
      const response = await extractKeywords(formData);

      setRecommendations(response);
      setError("");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return (
    <form action={handleSubmit}>
      <TextArea name="article" />
      <button type="submit">추천받기</button>
      {recommendations && (
        <div>
          <h2>Recommendations:</h2>
        </div>
      )}
      {error && <p>{error}</p>}
    </form>
  );
};

export default Form;
