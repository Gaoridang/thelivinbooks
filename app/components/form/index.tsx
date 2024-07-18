"use client";

import { getFeedbackByClaude } from "@/app/actions/getFeedbackByClaude";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import TextArea from "../textarea";

const Form = () => {
  const [feedback, setFeedback] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    try {
      setLoading(true);
      const response = await getFeedbackByClaude(formData);

      setFeedback(response);
      setError("");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form action={handleSubmit}>
      <TextArea name="article" />
      <Button disabled={isLoading} type="submit">
        {isLoading ? "답변 생성 중..." : "추천받기"}
      </Button>
      {feedback && (
        <Card className="mx-auto w-full max-w-2xl">
          <CardHeader>
            <CardTitle>피드백</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {feedback.split(/(?<=[.!?])\s+/).map((sentence, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 font-bold">•</span>
                  <p>{sentence}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
      {error && <p>{error}</p>}
    </form>
  );
};

export default Form;
